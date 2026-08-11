import { ImageResponse } from "next/og"
import { contractor } from "@/lib/site-config"
import { localBrandAsset } from "@/lib/local-brand-asset"

export const dynamic = "force-static"

export function GET() {
  const socialImage = localBrandAsset(contractor.business.brandAssets?.socialImage)
  if (socialImage) return new Response(socialImage.data, { headers: { "Content-Type": socialImage.contentType, "Cache-Control": "public, max-age=31536000, immutable" } })

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: contractor.theme.primary, color: "white" }}>
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 32, fontWeight: 800 }}>
          <div style={{ width: 84, height: 84, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 18, background: contractor.theme.accent }}>
            {contractor.business.logoText}
          </div>
          <div>{contractor.business.name}</div>
        </div>
        <div style={{ marginTop: 42, fontSize: 68, lineHeight: 1.05, fontWeight: 800, maxWidth: 900 }}>{contractor.business.tagline}</div>
        <div style={{ marginTop: 26, fontSize: 28, color: "#dce8f2", maxWidth: 900 }}>{contractor.business.description}</div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  )
}
