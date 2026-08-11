import { ImageResponse } from "next/og"
import { contractor } from "@/lib/site-config"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  const siteUrl = contractor.business.siteUrl || "https://example.com"
  const asset = contractor.business.brandAssets?.appleTouchIcon || contractor.business.brandAssets?.logo
  const icon = asset ? new URL(asset, siteUrl).toString() : null

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: icon ? "white" : contractor.theme.primary, color: "white", borderRadius: 34, fontSize: 72, fontWeight: 800 }}>
      {icon ? <img src={icon} alt="" width="180" height="180" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 12 }} /> : contractor.business.logoText}
    </div>,
    { ...size },
  )
}
