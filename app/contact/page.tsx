import { Phone } from "lucide-react"
import { contractor } from "@/lib/site-config"
import { SiteHeader } from "@/components/site-header"
import { QuoteForm } from "@/components/quote-form"
import { SiteBrand } from "@/components/site-brand"

export const metadata = { title: "Contact | " + contractor.business.name, description: "Contact " + contractor.business.name + " for service." }

export default function ContactPage() {
  return <main><SiteHeader/><section className="hero"><div className="container"><p className="eyebrow">Contact</p><h1>Tell us what you need.</h1><p className="hero-copy">{contractor.business.description}</p><div className="actions"><a className="button" href={contractor.business.phoneHref}><Phone size={18}/> Call {contractor.business.phone}</a><a className="button secondary" href="#contact-form">Request service</a></div></div></section><section className="section"><div className="container split"><div><h2>Contact details</h2><p>{contractor.location.serviceAreaLabel}</p>{contractor.business.email && <p><a className="text-link" href={"mailto:" + contractor.business.email}>{contractor.business.email}</a></p>}</div><div className="quote-card contact-form-card" id="contact-form"><p className="eyebrow">Request service</p><h2>Start with a few details.</h2><QuoteForm phone={contractor.business.phone} services={contractor.services}/></div></div></section><footer className="footer"><div className="container"><SiteBrand/></div></footer></main>
}
