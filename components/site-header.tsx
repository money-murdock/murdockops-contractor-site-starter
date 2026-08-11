"use client"

import Link from "next/link"
import { ChevronDown, Menu, Phone, X } from "lucide-react"
import { useState } from "react"
import { contractor } from "@/lib/site-config"
import { SiteBrand } from "@/components/site-brand"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const links = [
    { label: "Services", href: "/services" },
    { label: "Service Areas", href: "/service-areas" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header className="site-header">
      <div className="header-inner">
        <SiteBrand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <div className="nav-services">
            <Link href="/services">Services <ChevronDown size={15}/></Link>
            <div className="nav-services-menu">
              {contractor.services.map(service => <Link key={service.slug} href={`/services/${service.slug}`}>{service.name}</Link>)}
            </div>
          </div>
          {links.filter(link => link.href !== "/services").map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          <a className="button small" href="/#quote">Request Service</a>
        </nav>
        <div className="mobile-actions">
          <a className="icon-link" href={contractor.business.phoneHref} aria-label={"Call " + contractor.business.name}><Phone size={20}/></a>
          <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(value => !value)}>
            {open ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">
        <Link href="/" onClick={() => setOpen(false)}>Home</Link>
        <div className="mobile-nav-group">
          <button className="mobile-nav-toggle" type="button" aria-expanded={servicesOpen} onClick={() => setServicesOpen(value => !value)}>
            <span>Services</span><ChevronDown size={18}/>
          </button>
          {servicesOpen && <div className="mobile-subnav">
            <Link href="/services" onClick={() => setOpen(false)}>All services</Link>
            {contractor.services.map(service => <Link key={service.slug} href={`/services/${service.slug}`} onClick={() => setOpen(false)}>{service.name}</Link>)}
          </div>}
        </div>
        {links.filter(link => link.href !== "/services").map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
        <a className="button" href="/#quote" onClick={() => setOpen(false)}>Request Service</a>
      </nav>}
    </header>
  )
}
