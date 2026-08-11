import { ImageResponse } from "next/og"
import { contractor } from "@/lib/site-config"
import { localBrandAsset } from "@/lib/local-brand-asset"

export const dynamic = "force-static"

export function GET() {
  const asset = contractor.business.brandAssets?.appleTouchIcon || contractor.business.brandAssets?.logo
  const brandedIcon = localBrandAsset(asset)
  if (brandedIcon) return new Response(brandedIcon.data, { headers: { "Content-Type": brandedIcon.contentType, "Cache-Control": "public, max-age=31536000, immutable" } })

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: contractor.theme.primary, color: "white", borderRadius: 34, fontSize: 72, fontWeight: 800 }}>
      {contractor.business.logoText}
    </div>,
    { width: 180, height: 180 },
  )
}
