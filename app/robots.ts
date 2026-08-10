import type { MetadataRoute } from "next"
import { contractor } from "@/lib/site-config"

export default function robots(): MetadataRoute.Robots {
  const base = contractor.business.siteUrl || "https://example.com"
  return { rules: { userAgent: "*", allow: "/" }, sitemap: base + "/sitemap.xml" }
}
