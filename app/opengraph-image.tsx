import { ImageResponse } from "next/og"
import { contractor } from "@/lib/site-config"

export const alt = `${contractor.business.name} website preview`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 72, background: contractor.theme.primary, color: "white" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 32, fontWeight: 800 }}>
        <div style={{ width: 76, height: 76, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 18, background: contractor.theme.accent }}>{contractor.business.logoText}</div>
        <div>{contractor.business.name}</div>
      </div>
      <div style={{ marginTop: 42, fontSize: 68, lineHeight: 1.05, fontWeight: 800, maxWidth: 1000 }}>{contractor.business.tagline}</div>
      <div style={{ marginTop: 26, fontSize: 28, color: "#dce8f2" }}>{contractor.business.description}</div>
    </div>,
    { ...size },
  )
}
