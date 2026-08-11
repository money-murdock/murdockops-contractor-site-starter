import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { contractor } from "@/lib/site-config"
import { SiteHeader } from "@/components/site-header"
import { SiteBrand } from "@/components/site-brand"

export function generateStaticParams() { return contractor.services.map(service => ({ slug: service.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = contractor.services.find(item => item.slug === slug)
  return {
    title: service ? service.name + " | " + contractor.business.name : "Service | " + contractor.business.name,
    description: service?.shortDescription || contractor.business.description,
    alternates: { canonical: "/services/" + slug },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = contractor.services.find(item => item.slug === slug)
  if (!service) notFound()
  const relatedServices = contractor.services.filter(item => item.slug !== service.slug)
  return <main>
    <SiteHeader/>
    <section className="hero"><div className="container"><Link href="/" className="back-link"><ArrowLeft size={16}/> Back home</Link><p className="eyebrow">{contractor.location.serviceAreaLabel}</p><h1>{service.name}</h1><p className="hero-copy">{service.shortDescription}</p><div className="actions"><a className="button" href={contractor.business.phoneHref}><Phone size={18}/> Call {contractor.business.phone}</a><a className="button secondary" href="/#quote">Request service <ArrowRight size={18}/></a></div></div></section>
    <section className="section"><div className="container split"><div><p className="eyebrow">What to expect</p><h2>Useful information before the appointment.</h2><p>We start by understanding the situation, confirm what is needed, and explain the available next steps before work begins.</p></div><div className="card"><h3>Service highlights</h3><ul>{service.benefits.map(item => <li key={item}><Check size={16}/>{item}</li>)}</ul></div></div></section>
    <section className="section tinted"><div className="container narrow"><p className="eyebrow">Need help now?</p><h2>Tell us what is happening.</h2><p>Use the request form on the homepage or call the business directly to confirm availability for your address.</p><a className="button" href="/#quote">Request service <ArrowRight size={18}/></a></div></section>
    <section className="section"><div className="container narrow"><p className="eyebrow">Common questions</p><h2>Before you schedule.</h2>{contractor.faqs.map(faq => <details key={faq.question}><summary>{faq.question}<ArrowRight size={18}/></summary><p>{faq.answer}</p></details>)}</div></section>
    {relatedServices.length > 0 && <section className="section tinted"><div className="container"><p className="eyebrow">Related services</p><h2>More ways we can help.</h2><div className="cards">{relatedServices.map(item => <Link className="card related-card" key={item.slug} href={`/services/${item.slug}`}><h3>{item.name}</h3><p>{item.shortDescription}</p><span className="text-link">Learn more <ArrowRight size={16}/></span></Link>)}</div></div></section>}
    <footer className="footer"><div className="container"><SiteBrand/></div></footer>
  </main>
}
