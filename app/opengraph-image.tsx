import { ImageResponse } from "next/og"
import { contractor } from "@/lib/site-config"

export const alt = `${contractor.business.name} website preview`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  const siteUrl = contractor.business.siteUrl || "https://example.com"
  const assets = contractor.business.brandAssets
  const socialPhotoPath = assets?.socialPhoto || assets?.truckPhoto
  const socialPhoto = socialPhotoPath ? new URL(socialPhotoPath, siteUrl).toString() : null
  const logo = assets?.logo ? new URL(assets.logo, siteUrl).toString() : null

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: contractor.theme.primary, color: "white" }}>
      {socialPhoto && <img src={socialPhoto} alt="" width="1200" height="630" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
      {socialPhoto && <div style={{ position: "absolute", inset: 0, display: "flex", background: "linear-gradient(90deg, rgba(5,20,35,.94) 0%, rgba(5,20,35,.78) 52%, rgba(5,20,35,.18) 100%)" }} />}
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", flexDirection: "column", justifyContent: "center", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 32, fontWeight: 800 }}>
          <div style={{ width: 84, height: 84, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: 18, background: logo ? "white" : contractor.theme.accent }}>
            {logo ? <img src={logo} alt="" width="84" height="84" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 7 }} /> : contractor.business.logoText}
          </div>
          <div>{contractor.business.name}</div>
        </div>
        <div style={{ marginTop: 42, fontSize: 68, lineHeight: 1.05, fontWeight: 800, maxWidth: 900 }}>{contractor.business.tagline}</div>
        <div style={{ marginTop: 26, fontSize: 28, color: "#dce8f2", maxWidth: 900 }}>{contractor.business.description}</div>
      </div>
    </div>,
    { ...size },
  )
}
