import { google } from "googleapis"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body || body.website) return NextResponse.json({ error: "Unable to submit request." }, { status: 400 })
  const required = ["name", "phone", "postalCode", "propertyType", "service", "urgency", "notes"]
  if (required.some(key => !String(body[key] || "").trim())) return NextResponse.json({ error: "Please complete every required field." }, { status: 400 })
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY
  const spreadsheetId = process.env.GOOGLE_SHEET_ID
  const sheetTab = process.env.GOOGLE_SHEET_TAB || "Leads"
  if (!email || !privateKey || !spreadsheetId) return NextResponse.json({ error: "Lead storage is not configured." }, { status: 500 })
  try {
    const auth = new google.auth.JWT({ email, key: privateKey.replace(/\\n/g, "\n"), scopes: ["https://www.googleapis.com/auth/spreadsheets"] })
    const sheets = google.sheets({ version: "v4", auth })
    const now = new Date()
    const timestamp = now.toLocaleString("en-US", { timeZone: "America/Chicago" })
    const date = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,"0")}${String(now.getDate()).padStart(2,"0")}`
    const leadId = `LD-${date}-${Math.random().toString(36).slice(2,8).toUpperCase()}`
    const existing = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${sheetTab}!B6:B` })
    const rows = existing.data.values || []
    let last = -1
    for (let i=rows.length-1;i>=0;i--) if (String(rows[i]?.[0] || "").trim()) { last=i; break }
    const targetRow = last === -1 ? 6 : last + 7
    const digits = String(body.phone).replace(/\D/g, "")
    const phone = digits.length === 10 ? `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}` : String(body.phone).trim()
    const row = [timestamp, leadId, String(body.name).trim(), phone, String(body.service).trim(), String(body.postalCode).trim(), String(body.propertyType).trim(), String(body.urgency).trim(), body.smsConsent ? "Yes" : "No", String(body.pageUrl || "").trim(), "Website", "", "", "", "New", "", "", "", String(body.notes).trim(), "", false]
    await sheets.spreadsheets.values.update({ spreadsheetId, range: `${sheetTab}!A${targetRow}:U${targetRow}`, valueInputOption: "USER_ENTERED", requestBody: { values: [row] } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Lead write failed", error)
    return NextResponse.json({ error: "We could not save the request. Please call the business directly." }, { status: 500 })
  }
}
