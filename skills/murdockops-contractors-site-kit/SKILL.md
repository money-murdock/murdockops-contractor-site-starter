---
name: murdockops-contractors-site-kit
description: Create client-specific HVAC and local-service contractor websites from the MurdockOps starter, including evidence-based business intake, automatic recovery of business-owned logos and photos from official Facebook pages or existing websites, branded social previews and favicons, a separate Google Sheet, deployment, and responsive launch QA.
---

# MurdockOps Contractors Site Kit

Use this procedure after receiving the client name and at least one official source. Never assume B5, ClimaCare, or another company.

## Workflow

1. Start from the clean `main` branch of `murdockops-contractor-site-starter`. Keep the master starter untouched.
2. Gather the official website, Facebook page, Google Business Profile, services, areas, phone, email, hours, approved claims, reviews, logo, truck photos, team photos, and work photos. Treat sources as evidence and flag conflicts.
3. Read and follow [references/brand-assets.md](references/brand-assets.md). Recover the best business-owned originals available from official sources, normalize them into `public/brand`, record provenance, and populate `business.brandAssets` in `lib/site-config.ts`. Never bypass access controls or use third-party stock, social-interface, map, manufacturer, or competitor imagery.
4. Create an entirely separate Google Sheet by duplicating the clean MurdockOps Contractor Command Center template. Populate the client copy only; preserve Leads A:U and record the new Sheet ID.
5. Create a separate client website from the starter. Replace configuration, approved copy, assets, and environment variables while keeping reusable components generic. Configure the new Sheet ID/tab and OAuth refresh-token credentials for the MurdockOps Google account, with service-account credentials as a supported fallback.
6. Deploy the client website separately with its own Vercel project and Sheet credentials. Connect the client’s production custom domain and set `business.siteUrl` to that exact HTTPS origin before launch. Never modify unrelated projects.
7. Generate the non-public asset provenance manifest after placing approved files in `public/brand`: `node skills/murdockops-contractors-site-kit/scripts/brand-manifest.mjs --project <client-project> --sources <source-map.json>`. Correct every missing `sourceUrl` or `retrievedAt` entry; never place the manifest in `public`.
8. Run `npm run lint`, `npm run preflight:client`, and `npm run build`. Fix every failure. After deployment, rerun preflight with `node skills/murdockops-contractors-site-kit/scripts/preflight.mjs --mode client --project <client-project> --url https://client-domain.example`.

## Required QA before delivery

- Treat a missing client logo, square favicon, Apple icon, or 1200×630 company-branded social preview as a launch blocker. Do not silently ship initials or starter placeholders on a client site.
- Confirm the header, footer, favicon, Apple icon, Open Graph image, Twitter image, structured data, and visible site use the client’s real identity.
- Fetch the production HTML and verify canonical, `og:*`, `twitter:*`, and icon URLs resolve on the final client domain. Open the resolved images and visually inspect them.
- Check the social preview at 1200×630. Use the company logo/name and the strongest suitable business-owned photo; prefer a branded truck when one is available. Never invent a truck, logo, employee, project, or credential.
- Search source files and the production HTML/assets for `v0`, `Vercel`, starter names, previous clients, placeholder domains, and placeholder logos. Permit Vercel only as hosting infrastructure; never expose its branding in page content or preview assets.
- Treat a public `*.vercel.app` client URL as a launch blocker. Verify the client-owned custom domain is primary and all canonical, Open Graph, Twitter, sitemap, and structured-data URLs use it.
- Account for Facebook, Messenger, Google, and browser caching. Use each platform’s refresh/inspection tool after launch when an old preview persists; do not mistake a cached card for current metadata.
- Check the sticky header after scrolling on every route. Verify active-page navigation, keyboard focus, phone links, and request-form validation.
- Verify the mobile/tablet menu opens below the sticky header, expands Services, exposes Call and Request actions, locks background scrolling, and closes from Escape, outside click, route change, and the close button.
- Verify the branded logo returns interior routes to `/` and scrolls the homepage to the top without reloading.
- Verify responsive behavior at 320px, 390px, 768px, phone landscape, 1024px, laptop, and wide-desktop widths. Confirm sensible form columns, readable spacing, no clipped controls, and no horizontal overflow.
- Test `/`, `/services`, every generated `/services/[slug]`, `/service-areas`, `/about`, and `/contact`.
- Submit one approved test lead and confirm exactly one row lands in the client Leads tab with UTM fields and the expected A:U mapping.
- Verify metadata, canonical URL, Open Graph/Twitter fields, LocalBusiness/HVACBusiness schema, FAQ schema when FAQs exist, sitemap, and robots.
- Confirm no master-sheet data, ClimaCare branding, unsupported claims, or client secrets remain in the starter or public build.
- Record the final commit, deployment URL, form status, and any remaining blocker.

## Deterministic gates

- Run `npm run preflight:template` on the untouched master starter. This is the required repository/CI baseline.
- Run `npm run preflight:client` on every client copy. It must fail while placeholders, a `*.vercel.app` production URL, missing branded assets, invalid favicon/social dimensions, exposed secrets, or forbidden branding remain.
- Treat a nonzero result from the manifest generator, client preflight, lint, build, production route check, or approved lead submission as a launch blocker. Do not waive a gate silently.
