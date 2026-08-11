import type { Metadata } from "next"
import { contractor } from "@/lib/site-config"
import "./globals.css"
import "./responsive.css"

const siteUrl = contractor.business.siteUrl || "https://example.com"
const siteDescription = contractor.business.description
const businessId = siteUrl + "/#business"
const assets = contractor.business.brandAssets
const socialImage = assets?.socialImage || "/opengraph-image"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: contractor.business.name + " | " + contractor.location.primaryCity + " HVAC Services",
  description: siteDescription,
  alternates: { canonical: "/" },
  icons: {
    icon: assets?.favicon || "/icon",
    apple: assets?.appleTouchIcon || "/apple-icon",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: contractor.business.name,
    title: contractor.business.name + " | HVAC Services",
    description: siteDescription,
    images: [{ url: socialImage, width: 1200, height: 630, alt: `${contractor.business.name} branded website preview` }],
  },
  twitter: { card: "summary_large_image", title: contractor.business.name, description: siteDescription, images: [socialImage] },
  category: "HVAC Services",
}

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "@id": businessId,
  name: contractor.business.name,
  description: siteDescription,
  url: siteUrl,
  telephone: contractor.business.phone,
  priceRange: "$$",
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
  ...(contractor.reviews.length > 0 ? { review: contractor.reviews.map(review => ({ "@type": "Review", reviewBody: review.quote, author: { "@type": "Person", name: review.name }, reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 } })) } : {}),
}

const faqSchema = contractor.faqs.length > 0 ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: contractor.faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) } : null

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
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      </head>
      <body>{children}</body>
    </html>
  )
}
