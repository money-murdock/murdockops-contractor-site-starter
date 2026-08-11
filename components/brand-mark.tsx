import { contractor } from "@/lib/site-config"

export function BrandMark() {
  const logo = contractor.business.brandAssets?.logo

  return (
    <span className="brand-mark" aria-hidden="true">
      {logo ? <img src={logo} alt="" width="38" height="38" /> : contractor.business.logoText}
    </span>
  )
}
