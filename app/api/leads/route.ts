import { google } from "googleapis"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

const requiredFields = ["name", "phone", "postalCode", "propertyType", "service", "urgency", "notes"] as const

function getSheetsClient() {
  const oauthClientId = process.env.GOOGLE_OAUTH_CLIENT_ID
  const oauthClientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET
  const oauthRefreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN

  if (oauthClientId && oauthClientSecret && oauthRefreshToken) {
    const oauth2Client = new google.auth.OAuth2(oauthClientId, oauthClientSecret)
    oauth2Client.setCredentials({ refresh_token: oauthRefreshToken })
    return google.sheets({ version: "v4", auth: oauth2Client })
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY
  if (email && privateKey) {
    const auth = new google.auth.JWT({
      email,
      key: privateKey.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })
    return google.sheets({ version: "v4", auth })
  }

  throw new Error("Google Sheets credentials are not configured")
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body || body.website) return NextResponse.json({ error: "Unable to submit request." }, { status: 400 })
  if (requiredFields.some(key => !String(body[key] || "").trim())) return NextResponse.json({ error: "Please complete every required field." }, { status: 400 })
  const spreadsheetId = process.env.GOOGLE_SHEET_ID
  const sheetTab = process.env.GOOGLE_SHEET_TAB || "Leads"
  if (!spreadsheetId) return NextResponse.json({ error: "Lead storage is not configured." }, { status: 500 })
  try {
    const sheets = getSheetsClient()
    const now = new Date()
    const dateTimeParts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).formatToParts(now)
    const part = (type: string) => dateTimeParts.find(value => value.type === type)?.value || ""
    const timestamp = `${part("month")}/${part("day")}/${part("year")} ${part("hour")}:${part("minute")} ${part("dayPeriod")}`
    const dateParts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now)
    const date = `${dateParts.find(part => part.type === "year")?.value}${dateParts.find(part => part.type === "month")?.value}${dateParts.find(part => part.type === "day")?.value}`
    const leadId = `LD-${date}-${Math.random().toString(36).slice(2,8).toUpperCase()}`
    const digits = String(body.phone).replace(/\D/g, "")
    const phone = digits.length === 10 ? `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}` : String(body.phone).trim()
    const row = [timestamp, leadId, String(body.name).trim(), phone, String(body.service).trim(), String(body.postalCode).trim(), String(body.propertyType).trim(), String(body.urgency).trim(), body.smsConsent ? "Yes" : "No", String(body.pageUrl || "").trim(), "Website", String(body.utmSource || "").trim(), String(body.utmMedium || "").trim(), String(body.utmCampaign || "").trim(), "New", "", "", "", String(body.notes).trim(), "", false]
    await sheets.spreadsheets.values.append({ spreadsheetId, range: `${sheetTab}!A:U`, valueInputOption: "USER_ENTERED", insertDataOption: "INSERT_ROWS", requestBody: { values: [row] } })
    return NextResponse.json({ ok: true, leadId })
  } catch (error) {
    console.error("Lead write failed", error)
    return NextResponse.json({ error: "We could not save the request. Please call the business directly." }, { status: 500 })
  }
}
