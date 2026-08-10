import Link from "next/link"
import { ArrowRight, MapPin, Phone } from "lucide-react"
import { contractor } from "@/lib/site-config"
import { SiteHeader } from "@/components/site-header"

export const metadata = { title: "Service Areas | " + contractor.business.name, description: contractor.location.serviceAreaLabel }

export default function ServiceAreasPage() {
  return <main><SiteHeader/><section className="hero"><div className="container"><p className="eyebrow"><MapPin size={15}/> Service area</p><h1>{contractor.location.serviceAreaLabel}</h1><p className="hero-copy">Confirm availability for your address before scheduling service.</p><div className="actions"><a className="button" href={contractor.business.phoneHref}><Phone size={18}/> Call {contractor.business.phone}</a><a className="button secondary" href="/#quote">Request service <ArrowRight size={18}/></a></div></div></section><section className="section"><div className="container"><h2>Communities served</h2><div className="pill-list area-grid">{contractor.location.cities.map(city => <Link key={city} href={"/#service-area"}>{city}</Link>)}</div></div></section><footer className="footer"><div className="container"><div className="brand"><span className="brand-mark">{contractor.business.logoText}</span><span>{contractor.business.name}</span></div></div></footer></main>
}
