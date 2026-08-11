"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { MouseEvent } from "react"
import { contractor } from "@/lib/site-config"

export function SiteBrand({ className = "brand", onActivate }: { className?: string; onActivate?: () => void }) {
  const pathname = usePathname()

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onActivate?.()
    if (pathname === "/") {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return <Link href="/" className={className} onClick={handleClick} aria-label={`${contractor.business.name} home`}>
    <span className="brand-mark" aria-hidden="true">{contractor.business.logoText}</span>
    <span>{contractor.business.name}</span>
  </Link>
}
