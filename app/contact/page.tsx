import { Phone } from "lucide-react"
import { contractor } from "@/lib/site-config"
import { SiteHeader } from "@/components/site-header"

export const metadata = { title: "Contact | " + contractor.business.name, description: "Contact " + contractor.business.name + " for service." }

export default function ContactPage() {
  return <main><SiteHeader/><section className="hero"><div className="container"><p className="eyebrow">Contact</p><h1>Tell us what you need.</h1><p className="hero-copy">{contractor.business.description}</p><div className="actions"><a className="button" href={contractor.business.phoneHref}><Phone size={18}/> Call {contractor.business.phone}</a><a className="button secondary" href="/#quote">Request service</a></div></div></section><section className="section"><div className="container narrow"><h2>Contact details</h2><p>{contractor.location.serviceAreaLabel}</p>{contractor.business.email && <p><a className="text-link" href={"mailto:" + contractor.business.email}>{contractor.business.email}</a></p>}</div></section><footer className="footer"><div className="container"><div className="brand"><span className="brand-mark">{contractor.business.logoText}</span><span>{contractor.business.name}</span></div></div></footer></main>
}
