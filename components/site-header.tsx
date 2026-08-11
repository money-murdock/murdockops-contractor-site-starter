"use client"

import Link from "next/link"
import { ChevronDown, Menu, Phone, X } from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { contractor } from "@/lib/site-config"
import { SiteBrand } from "@/components/site-brand"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const links = [
    { label: "Services", href: "/services" },
    { label: "Service Areas", href: "/service-areas" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)

  useEffect(() => {
    setOpen(false)
    setServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }
    const desktopQuery = window.matchMedia("(min-width: 961px)")

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", closeOnEscape)
    desktopQuery.addEventListener("change", closeAtDesktop)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
      desktopQuery.removeEventListener("change", closeAtDesktop)
    }
  }, [open])

  const closeMenu = () => {
    setOpen(false)
    setServicesOpen(false)
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <SiteBrand onActivate={closeMenu} />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/" className={isActive("/") ? "active" : undefined} aria-current={isActive("/") ? "page" : undefined}>Home</Link>
          <div className={`nav-services${isActive("/services") ? " active" : ""}`}>
            <Link href="/services" aria-current={isActive("/services") ? "page" : undefined}>Services <ChevronDown size={15}/></Link>
            <div className="nav-services-menu">
              {contractor.services.map(service => <Link key={service.slug} href={`/services/${service.slug}`}>{service.name}</Link>)}
            </div>
          </div>
          {links.filter(link => link.href !== "/services").map(link => <Link key={link.href} href={link.href} className={isActive(link.href) ? "active" : undefined} aria-current={isActive(link.href) ? "page" : undefined}>{link.label}</Link>)}
          <Link className="button small" href="/#quote">Request Service</Link>
        </nav>
        <div className="mobile-actions">
          <a className="icon-link" href={contractor.business.phoneHref} aria-label={"Call " + contractor.business.name}><Phone size={20}/></a>
          <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(value => !value)}>
            {open ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
      </div>
      {open && <>
        <button className="mobile-nav-backdrop" type="button" aria-label="Close menu" onClick={closeMenu}/>
        <nav className="mobile-nav" aria-label="Mobile navigation">
        <Link href="/" onClick={closeMenu} className={isActive("/") ? "active" : undefined} aria-current={isActive("/") ? "page" : undefined}>Home</Link>
        <div className={`mobile-nav-group${isActive("/services") ? " active" : ""}`}>
          <button className="mobile-nav-toggle" type="button" aria-expanded={servicesOpen} onClick={() => setServicesOpen(value => !value)}>
            <span>Services</span><ChevronDown size={18}/>
          </button>
          {servicesOpen && <div className="mobile-subnav">
            <Link href="/services" onClick={closeMenu}>All services</Link>
            {contractor.services.map(service => <Link key={service.slug} href={`/services/${service.slug}`} onClick={closeMenu}>{service.name}</Link>)}
          </div>}
        </div>
        {links.filter(link => link.href !== "/services").map(link => <Link key={link.href} href={link.href} onClick={closeMenu} className={isActive(link.href) ? "active" : undefined} aria-current={isActive(link.href) ? "page" : undefined}>{link.label}</Link>)}
        <div className="mobile-nav-actions">
          <a className="button" href={contractor.business.phoneHref} onClick={closeMenu}><Phone size={17}/> Call Now</a>
          <Link className="button secondary" href="/#quote" onClick={closeMenu}>Request Service</Link>
        </div>
      </nav></>}
    </header>
  )
}
