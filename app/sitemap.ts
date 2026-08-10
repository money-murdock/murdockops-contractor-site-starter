import type { MetadataRoute } from "next"
import { contractor } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = contractor.business.siteUrl || "https://example.com"
  const routes = ["/", "/services", "/service-areas", "/about", "/contact", ...contractor.services.map(service => "/services/" + service.slug)]
  return routes.map(path => ({ url: base + path, lastModified: new Date(), changeFrequency: path === "/" ? "weekly" : "monthly", priority: path === "/" ? 1 : 0.7 }))
}
