import type { Metadata } from "next"
import { contractor } from "@/lib/site-config"
import "./globals.css"

export const metadata: Metadata = {
  title: `${contractor.business.name} | HVAC Services in ${contractor.location.primaryCity}`,
  description: contractor.business.description,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
