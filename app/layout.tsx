import type { Metadata } from "next"
import { contractor } from "@/lib/site-config"
import "./globals.css"

const siteUrl = contractor.business.siteUrl || "https://example.com"
const siteDescription = contractor.business.description
const businessId = siteUrl + "/#business"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: contractor.business.name + " | " + contractor.location.primaryCity + " HVAC Services",
  description: siteDescription,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: contractor.business.name,
    title: contractor.business.name + " | HVAC Services",
    description: siteDescription,
  },
  twitter: { card: "summary_large_image", title: contractor.business.name, description: siteDescription },
}

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "@id": businessId,
  name: contractor.business.name,
  description: siteDescription,
  url: siteUrl,
  telephone: contractor.business.phone,
  areaServed: contractor.location.cities.map(name => ({ "@type": "City", name })),
  sameAs: contractor.business.sameAs || [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: contractor.business.name + " Services",
    itemListElement: contractor.services.map(service => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.name, url: siteUrl + "/services/" + service.slug },
    })),
  },
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": siteUrl + "/#website",
  url: siteUrl,
  name: contractor.business.name,
  publisher: { "@id": businessId },
  inLanguage: "en-US",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
