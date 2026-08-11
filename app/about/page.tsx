import { Check } from "lucide-react"
import { contractor } from "@/lib/site-config"
import { SiteHeader } from "@/components/site-header"
import { SiteBrand } from "@/components/site-brand"

export const metadata = { title: "About | " + contractor.business.name, description: contractor.business.description }

export default function AboutPage() {
  return <main><SiteHeader/><section className="hero"><div className="container"><p className="eyebrow">About the business</p><h1>{contractor.business.tagline}</h1><p className="hero-copy">{contractor.business.description}</p></div></section><section className="section"><div className="container split"><div><p className="eyebrow">Why customers call</p><h2>A clear, professional next step.</h2><p>Use this section for the client&apos;s approved story, experience, team, or operating principles.</p></div><div className="card"><ul>{contractor.trustItems.map(item => <li key={item}><Check size={16}/>{item}</li>)}</ul></div></div></section><footer className="footer"><div className="container"><SiteBrand/></div></footer></main>
}
