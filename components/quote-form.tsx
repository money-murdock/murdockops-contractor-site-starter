"use client"

import { FormEvent, useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import type { Service } from "@/lib/site-config"

export function QuoteForm({ phone, services }: { phone: string; services: Service[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [error, setError] = useState("")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")
    setError("")
    const form = event.currentTarget
    const data = new FormData(form)
    const params = new URLSearchParams(window.location.search)
    const payload = {
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      postalCode: String(data.get("postalCode") || ""),
      propertyType: String(data.get("propertyType") || ""),
      service: String(data.get("service") || ""),
      urgency: String(data.get("urgency") || ""),
      notes: String(data.get("notes") || ""),
      smsConsent: data.get("smsConsent") === "on",
      pageUrl: window.location.href,
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
      website: String(data.get("website") || ""),
    }
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(typeof result.error === "string" ? result.error : "Please call " + phone + ".")
      setStatus("success")
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please call " + phone + ".")
      setStatus("error")
    }
  }

  if (status === "success") return <div className="form-success" role="status"><CheckCircle2 size={42}/><h3>Request received.</h3><p>The team will follow up shortly.</p><a href={"tel:" + phone.replace(/\D/g, "")}>Call {phone}</a></div>

  return <form onSubmit={submit} aria-describedby="quote-form-help">
    <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <p id="quote-form-help" className="form-help">Required fields are checked before the request is sent.</p>
    <div className="form-grid"><label>Name<input required name="name" autoComplete="name" maxLength={100} placeholder="Your name"/></label><label>Phone<input required name="phone" type="tel" autoComplete="tel" maxLength={25} placeholder="(555) 555-0100"/></label></div>
    <div className="form-grid"><label>ZIP Code<input required name="postalCode" inputMode="numeric" pattern="[0-9]{5}(-[0-9]{4})?" autoComplete="postal-code" placeholder="74055"/></label><label>Customer Type<select required name="propertyType" defaultValue=""><option value="" disabled>Select one...</option><option>Homeowner / Residential</option><option>Business / Commercial</option><option>Builder / General Contractor</option><option>Property Manager / Landlord</option><option>Other</option></select></label></div>
    <div className="form-grid"><label>Service<select required name="service" defaultValue=""><option value="" disabled>Select a service...</option>{services.map(service => <option key={service.slug} value={service.name}>{service.name}</option>)}<option>Other / Not sure</option></select></label><label>Urgency<select required name="urgency" defaultValue=""><option value="" disabled>Select timing...</option><option>Emergency / No heating or cooling</option><option>Today</option><option>This week</option><option>Planning ahead</option></select></label></div>
    <label>What can we help with?<textarea required name="notes" rows={3} minLength={5} maxLength={1000} placeholder="Describe the issue or project"/></label>
    <label className="checkbox"><input type="checkbox" name="smsConsent"/> I agree to receive text messages about my request.</label>
    {status === "error" && <p className="form-error" role="alert">{error}</p>}
    <button className="button" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : <>Send request <ArrowRight size={18}/></>}</button>
  </form>
}
