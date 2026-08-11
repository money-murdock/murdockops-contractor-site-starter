# Brand asset intake

## Source priority

1. Use client-supplied originals first.
2. Inspect the official website for the logo, favicon, truck, team, completed-work, and facility photos.
3. Inspect the official Facebook page profile image, cover image, About information, and photo albums for higher-quality or newer business-owned assets.
4. Use the official Google Business Profile only when ownership and relevance are clear.

Do not bypass logins, private pages, download restrictions, or other access controls. Do not reuse stock photos, manufacturer artwork, map tiles, customer-uploaded photos, social-network interface graphics, or another company’s assets. Treat visible faces, addresses, and license plates as privacy-sensitive and crop or redact them when appropriate.

## Recovery workflow

1. Capture the source URL, page title, retrieval date, visible context, and intended use before downloading.
2. Prefer the highest-resolution original served by the official source. Avoid screenshots when an original image URL or download is available.
3. Compare duplicate assets by dimensions, sharpness, current branding, and visible ownership. Keep the best original without destructive edits.
4. Store provenance in a non-public `brand-assets.json` file with `sourceUrl`, `retrievedAt`, `originalFilename`, `use`, and `notes` for each asset.
5. Normalize approved files into `public/brand` using descriptive names:
   - `logo.png` or `logo.svg`
   - `favicon.png` as a square 48×48-or-larger mark
   - `apple-touch-icon.png` at 180×180
   - `truck-hero.jpg` at least 1600px wide when the source allows
   - `social-share.jpg` at exactly 1200×630
6. Preserve aspect ratios. Never stretch a logo or photo. Keep a clean master copy before cropping, compression, background removal, or redaction.

## Social preview composition

- Prefer a company-branded truck as the primary visual when a suitable business-owned truck photo exists; otherwise use the strongest relevant business-owned photo.
- Include the real company logo and company name with enough contrast to remain legible in Facebook, Messenger, SMS, and other link cards.
- Keep critical branding away from the outer 40px safe area.
- Do not include Vercel, v0, framework, starter, previous-client, or stock-provider branding.
- Do not generate or fabricate a fake company truck, logo, certification, uniform, employee, or completed project.

## Configuration

Populate `business.brandAssets` in `lib/site-config.ts`:

```ts
brandAssets: {
  logo: "/brand/logo.png",
  favicon: "/brand/favicon.png",
  appleTouchIcon: "/brand/apple-touch-icon.png",
  socialPhoto: "/brand/best-company-photo.jpg",
  truckPhoto: "/brand/truck-hero.jpg",
  socialImage: "/brand/social-share.jpg",
}
```

If `socialImage` is omitted, the starter generates an Open Graph image from the available business-owned photo, the logo, and approved company copy. Client production builds must not rely on initials or starter fallbacks.

## Verification gate

Before launch, verify every configured file exists, has the expected dimensions, and returns HTTP 200 on the final domain. Inspect `/icon`, `/apple-icon`, `/opengraph-image`, the configured `socialImage`, and the page source. Fail delivery if any client-facing surface contains placeholder, Vercel, v0, starter, or previous-client branding.
