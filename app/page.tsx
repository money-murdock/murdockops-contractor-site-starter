import Link from "next/link"
import { ArrowRight, Check, ChevronDown, Phone, Star } from "lucide-react"
import { contractor } from "@/lib/site-config"
import { QuoteForm } from "@/components/quote-form"
import { SiteHeader } from "@/components/site-header"
import { SiteBrand } from "@/components/site-brand"
import { BackToTop } from "@/components/back-to-top"

export default function Home() {
  const { business, location } = contractor
  return <main>
    <SiteHeader/>
    <section className="hero"><div className="container hero-grid"><div><p className="eyebrow">{location.serviceAreaLabel}</p><h1>{business.tagline}</h1><p className="hero-copy">{business.description}</p><div className="actions"><a className="button" href={business.phoneHref}><Phone size={18}/> Call {business.phone}</a><a className="button secondary" href="#quote">Request service <ArrowRight size={18}/></a></div><div className="trust-row">{contractor.trustItems.map(item => <span key={item}><Check size={16}/>{item}</span>)}</div></div><div className="quote-card" id="quote"><p className="eyebrow">Get started</p><h2>Tell us what you need.</h2><p>Share a few details and the business can follow up with the right next step.</p><QuoteForm phone={business.phone} services={contractor.services}/></div></div></section>
    <section className="section"><div className="container"><p className="eyebrow">Services</p><h2>Help for the work in front of you.</h2><div className="cards">{contractor.services.map(service => <article className="card" id={service.slug} key={service.slug}><h3>{service.name}</h3><p>{service.shortDescription}</p><ul>{service.benefits.map(b => <li key={b}><Check size={16}/>{b}</li>)}</ul><Link href={"/services/" + service.slug}>Learn more <ArrowRight size={16}/></Link></article>)}</div><div className="section-action"><Link className="button secondary" href="/services">View all services <ArrowRight size={18}/></Link></div></div></section>
    <section className="section tinted"><div className="container process"><div><p className="eyebrow">The process</p><h2>A clear next step, from first contact to finished work.</h2></div><ol><li><b>01</b><span>Contact the team</span></li><li><b>02</b><span>Confirm the situation</span></li><li><b>03</b><span>Review the options</span></li><li><b>04</b><span>Move forward with clarity</span></li></ol></div></section>
    <section className="section" id="service-area"><div className="container split"><div><p className="eyebrow">Service area</p><h2>Serving {location.primaryCity} and nearby communities.</h2><p>Use the verified service-area list for each client before publishing.</p><Link className="text-link" href="/service-areas">See service areas <ArrowRight size={16}/></Link></div><div className="pill-list">{location.cities.map(city => <span key={city}>{city}</span>)}</div></div></section>
    {contractor.reviews.length > 0 && <section className="section tinted"><div className="container"><p className="eyebrow">Customer feedback</p><h2>What customers are saying.</h2><div className="cards">{contractor.reviews.map(review => <article className="card review-card" key={review.name + review.quote}><div className="stars" aria-label="5 out of 5 stars">{[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor"/> )}</div><p>&quot;{review.quote}&quot;</p><strong>{review.name}</strong>{review.location && <span>{review.location}</span>}{review.source && <small>{review.source}</small>}</article>)}</div></div></section>}
    <section className="section faq"><div className="container narrow"><p className="eyebrow">Questions</p><h2>Good information before you call.</h2>{contractor.faqs.map(faq => <details key={faq.question}><summary>{faq.question}<ChevronDown size={18}/></summary><p>{faq.answer}</p></details>)}</div></section>
    <footer className="footer"><div className="container footer-grid"><div><SiteBrand/><p>{location.serviceAreaLabel}</p><BackToTop/></div><div><b>Contact</b><a href={business.phoneHref}>{business.phone}</a>{business.email && <a href={"mailto:" + business.email}>{business.email}</a>}</div></div></footer>
  </main>
}
