import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react"
import { notFound } from "next/navigation"
import { contractor } from "@/lib/site-config"

export function generateStaticParams() { return contractor.services.map(service => ({ slug: service.slug })) }

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = contractor.services.find(item => item.slug === slug)
  if (!service) notFound()
  return <main>
    <header className="site-header"><Link href="/" className="brand"><span className="brand-mark">{contractor.business.logoText}</span><span>{contractor.business.name}</span></Link><nav><Link href="/">Home</Link><Link href="/#quote" className="button small">Request Service</Link></nav></header>
    <section className="hero"><div className="container"><Link href="/" className="back-link"><ArrowLeft size={16}/> Back home</Link><p className="eyebrow">{contractor.location.serviceAreaLabel}</p><h1>{service.name}</h1><p className="hero-copy">{service.shortDescription}</p><div className="actions"><a className="button" href={contractor.business.phoneHref}><Phone size={18}/> Call {contractor.business.phone}</a><a className="button secondary" href="/#quote">Request service <ArrowRight size={18}/></a></div></div></section>
    <section className="section"><div className="container split"><div><p className="eyebrow">What to expect</p><h2>Useful information before the appointment.</h2><p>We start by understanding the situation, confirm what is needed, and explain the available next steps before work begins.</p></div><div className="card"><h3>Service highlights</h3><ul>{service.benefits.map(item => <li key={item}><Check size={16}/>{item}</li>)}</ul></div></div></section>
    <section className="section tinted"><div className="container narrow"><p className="eyebrow">Need help now?</p><h2>Tell us what is happening.</h2><p>Use the request form on the homepage or call the business directly to confirm availability for your address.</p><a className="button" href="/#quote">Request service <ArrowRight size={18}/></a></div></section>
    <footer className="footer"><div className="container"><div className="brand"><span className="brand-mark">{contractor.business.logoText}</span><span>{contractor.business.name}</span></div></div></footer>
  </main>
}
