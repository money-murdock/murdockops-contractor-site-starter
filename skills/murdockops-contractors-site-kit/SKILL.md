---
name: murdockops-contractors-site-kit
description: Reusable operating procedure for creating a client-specific HVAC or local-service contractor website from the clean MurdockOps starter.
---

# MurdockOps Contractors Site Kit

Use this procedure only after the user supplies the client name and source links. Never assume B5, ClimaCare, or another company.

## Workflow

1. Start from the clean `main` branch of `murdockops-contractor-site-starter`. Keep the master starter untouched.
2. Gather the client’s supplied website, Facebook page, Google Business Profile, service list, areas served, phone, email, hours, approved claims, reviews, and assets. Treat sources as evidence and flag conflicts for approval.
3. Create an entirely separate Google Sheet for the client by duplicating the clean MurdockOps Contractor Command Center template. Populate the client copy only; never connect a client website to the master template. Preserve the Leads A:U schema and record the new Sheet ID.
4. Create a separate client website from the starter. Replace `lib/site-config.ts`, approved copy, assets, and environment variables. Keep all reusable components generic. Configure that client deployment with the new `GOOGLE_SHEET_ID` and `GOOGLE_SHEET_TAB`; prefer OAuth refresh-token credentials for the MurdockOps Google account, with service-account credentials as a supported fallback.
5. Deploy the client website separately with its own Vercel project and client Sheet credentials. Never modify unrelated projects.

## Required QA before delivery

- Check desktop and mobile navigation, keyboard focus, phone links, and request-form validation.
- Verify responsive behavior at phone, tablet, laptop, and desktop widths, including the mobile Services dropdown, branded home/scroll-to-top action, and no horizontal overflow.
- Test `/`, `/services`, every generated `/services/[slug]`, `/service-areas`, `/about`, and `/contact`.
- Submit one approved test lead and confirm exactly one row lands in the client Leads tab with UTM fields and the expected A:U mapping.
- Verify metadata, canonical URL, Open Graph/Twitter fields, LocalBusiness/HVACBusiness schema, FAQ schema when FAQs exist, sitemap, and robots.
- Verify favicon, Apple-touch icon, Open Graph image, and Twitter preview use the client branding and contain no starter, Vercel, or framework branding.
- Confirm no master-sheet data, B5 data, ClimaCare branding, unsupported claims, or client secrets remain in the starter or public build.
- Record the final commit, deployment URL, form status, and any remaining blocker.
