import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { contractor } from "@/lib/site-config"
import { SiteHeader } from "@/components/site-header"
import { SiteBrand } from "@/components/site-brand"

export const metadata = { title: "Services | " + contractor.business.name, description: contractor.business.description }

export default function ServicesPage() {
  return <main><SiteHeader/><section className="hero"><div className="container"><p className="eyebrow">Services</p><h1>Heating and cooling help for the work in front of you.</h1><p className="hero-copy">{contractor.business.description}</p><div className="actions"><a className="button" href={contractor.business.phoneHref}><Phone size={18}/> Call {contractor.business.phone}</a><Link className="button secondary" href="/#quote">Request service <ArrowRight size={18}/></Link></div></div></section><section className="section"><div className="container"><div className="cards">{contractor.services.map(service => <article className="card" key={service.slug}><h2>{service.name}</h2><p>{service.shortDescription}</p><ul>{service.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul><Link className="text-link" href={"/services/" + service.slug}>Learn more <ArrowRight size={16}/></Link></article>)}</div></div></section><footer className="footer"><div className="container"><SiteBrand/></div></footer></main>
}
