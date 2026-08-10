# MurdockOps Contractor Site Starter

Neutral, client-agnostic starter for HVAC and other local-service contractor websites.

## Operating rule

Replace lib/site-config.ts with the new client profile. Keep reusable components generic. Add only client-approved services, service areas, reviews, credentials, financing, warranties, photos, and claims.

## Reusable baseline

The master starter includes the patterns selected from the ClimaCare build:

- Conversion-first hero with phone and request-service CTAs
- Responsive navigation with mobile menu
- Config-driven service cards, service routes, and service index
- Config-driven service-area page
- Process section, FAQ section, and optional reviews
- Google Sheets lead form with UTM capture, honeypot protection, atomic append writes, and OAuth/service-account support
- Exact Leads A-U mapping expected by the MurdockOps command center
- Metadata, canonical URLs, Open Graph, robots, sitemap, and HVACBusiness/WebSite schema
- Separate About and Contact routes
- Vercel-compatible Next.js structure

## New client setup

1. Replace lib/site-config.ts with the client profile.
2. Add client assets under public and reference them from the profile/components.
3. Configure the client Google Sheet ID/tab and either the MurdockOps Google OAuth refresh-token variables or a service account in Vercel. OAuth is preferred when the Sheet belongs to a Google user account.
4. Run the build and verify every generated service route.
5. Test one form submission and confirm exactly one row writes to the client Leads tab.
6. Run visual QA on desktop and mobile before launch.

## Reusable operating procedure

See `skills/murdockops-contractors-site-kit/SKILL.md` for the client intake, command-center duplication, separate deployment, and final QA workflow. The master starter and master Google Sheet are never populated with client-specific data.
