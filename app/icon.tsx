import { ImageResponse } from "next/og"
import { contractor } from "@/lib/site-config"

export const size = { width: 64, height: 64 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: contractor.theme.primary, color: "white", borderRadius: 14, fontSize: 28, fontWeight: 800 }}>
      {contractor.business.logoText}
    </div>,
    { ...size },
  )
}
