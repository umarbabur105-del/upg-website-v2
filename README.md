# Universal Packaging Group website

Next.js website for Universal Packaging Group, including public quote/contact lead capture and a private Google Sheets CRM.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and provide the applicable values. Google authentication settings are server-only and must never use a `NEXT_PUBLIC_` variable.

## Leads CRM

- Public submissions are validated, appended to the private `Leads` tab, and sent as email notifications through Resend.
- Google Sheets authentication uses Vercel OIDC and Google Workload Identity Federation to impersonate a dedicated service account with short-lived tokens. No private service-account key is stored in Vercel or the repository.
- Each submission includes a unique `submission_id`, timestamp, form source, contact details, project requirements, and campaign attribution.
- Email and Google authentication start together; the row is appended with the final notification status once Resend responds.
- A successful Sheet write or email notification is treated as an accepted submission so one provider outage does not discard the enquiry.
- `/crm` redirects authorized Google Workspace users to the private Sheet. Drive sharing remains the access-control boundary.
- CRM users can assign owners, set priority/status, schedule follow-ups, add internal notes, and review dashboard totals.

The `Leads` header row is the website integration contract. Do not rename, reorder, or delete its columns without updating `src/lib/google-sheets.ts`.

## Google operations

See [`docs/google-api-inventory.md`](docs/google-api-inventory.md) for the Google Cloud project, authentication boundaries, connected resources, enabled APIs, and current verification evidence. See [`docs/google-merchant-expansion-plan.md`](docs/google-merchant-expansion-plan.md) for the audited Merchant Center state, policy boundaries, five-family sample-product plan, conversion connection, and release gates.

Run the owner-local read-only API health check with:

```bash
./scripts/google-api-health
```

## Verification

```bash
npm run lint
npx tsc --noEmit
npm run build
npm audit
git diff --check
```
