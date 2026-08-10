"use client"

import Link from "next/link"
import { Menu, Phone, X } from "lucide-react"
import { useState } from "react"
import { contractor } from "@/lib/site-config"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const links = [
    { label: "Services", href: "/services" },
    { label: "Service Areas", href: "/service-areas" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">{contractor.business.logoText}</span>
          <span>{contractor.business.name}</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          <a className="button small" href="#quote">Request Service</a>
        </nav>
        <div className="mobile-actions">
          <a className="icon-link" href={contractor.business.phoneHref} aria-label={"Call " + contractor.business.name}><Phone size={20}/></a>
          <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(value => !value)}>
            {open ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">
        {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
        <a className="button" href="#quote" onClick={() => setOpen(false)}>Request Service</a>
      </nav>}
    </header>
  )
}
