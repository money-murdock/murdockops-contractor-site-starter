# MurdockOps Contractor Site Starter

Neutral, client-agnostic starter for HVAC and other local-service contractor websites.

## Operating rule

Replace lib/site-config.ts with the new client profile. Keep reusable components generic. Add only client-approved services, service areas, reviews, credentials, financing, warranties, photos, and claims.

## Reusable baseline

The master starter includes the patterns selected from the ClimaCare build:

- Conversion-first hero with phone and request-service CTAs
- Sticky, page-aware navigation with active states and a responsive mobile/tablet menu
- Mobile Services accordion, Call/Request actions, Escape/outside-click dismissal, branded home/scroll-to-top behavior, and breakpoint-safe layouts from 320px through wide desktop
- Config-driven service cards, service routes, and service index
- Config-driven service-area page
- Process section, FAQ section, and optional reviews
- Google Sheets lead form with UTM capture, honeypot protection, atomic append writes, and OAuth/service-account support
- Exact Leads A-U mapping expected by the MurdockOps command center
- Metadata, canonical URLs, Open Graph, robots, sitemap, and HVACBusiness/WebSite schema
- Config-driven real logo, favicon, Apple icon, truck photo, and Open Graph/Twitter preview image with no framework branding
- Separate About and Contact routes
- Vercel-compatible Next.js structure

## New client setup

1. Replace lib/site-config.ts with the client profile.
2. Recover or receive verified business-owned assets, store normalized files under `public/brand`, and populate `business.brandAssets`. Client launches require a real logo, square favicon, Apple icon, and 1200×630 company-branded social image; use a branded truck when a suitable source photo exists.
3. Duplicate the master Google Sheet into an entirely new client Sheet. Configure the client Sheet ID/tab and either the MurdockOps Google OAuth refresh-token variables or a service account in Vercel. Never use the master template as a production destination.
4. Run the build and verify every generated service route.
5. Test one form submission and confirm exactly one row writes to the client Leads tab.
6. Run interaction and visual QA at 320px, 390px, 768px, phone landscape, 1024px, laptop, and wide-desktop widths before launch.

## Reusable operating procedure

See `skills/murdockops-contractors-site-kit/SKILL.md` for the client intake, command-center duplication, separate deployment, and final QA workflow. The master starter and master Google Sheet are never populated with client-specific data.
