---
name: murdockops-contractors-site-kit
description: Reusable operating procedure for creating a client-specific HVAC or local-service contractor website from the clean MurdockOps starter.
---

# MurdockOps Contractors Site Kit

Use this procedure only after the user supplies the client name and source links. Never assume B5, ClimaCare, or another company.

## Workflow

1. Start from the clean `main` branch of `murdockops-contractor-site-starter`. Keep the master starter untouched.
2. Gather the client’s supplied website, Facebook page, Google Business Profile, service list, areas served, phone, email, hours, approved claims, reviews, and assets. Treat sources as evidence and flag conflicts for approval.
3. Duplicate the clean MurdockOps Contractor Command Center Google Sheet for the client. Populate the duplicate only; do not edit the master template. Preserve the Leads A:U schema.
4. Create a separate client website from the starter. Replace `lib/site-config.ts`, approved copy, assets, and environment variables. Keep all reusable components generic.
5. Deploy the client website separately with its own Vercel project and client Sheet credentials. Never modify unrelated projects.

## Required QA before delivery

- Check desktop and mobile navigation, keyboard focus, phone links, and request-form validation.
- Test `/`, `/services`, every generated `/services/[slug]`, `/service-areas`, `/about`, and `/contact`.
- Submit one approved test lead and confirm exactly one row lands in the client Leads tab with UTM fields and the expected A:U mapping.
- Verify metadata, canonical URL, Open Graph/Twitter fields, LocalBusiness/HVACBusiness schema, FAQ schema when FAQs exist, sitemap, and robots.
- Confirm no master-sheet data, B5 data, ClimaCare branding, unsupported claims, or client secrets remain in the starter or public build.
- Record the final commit, deployment URL, form status, and any remaining blocker.
