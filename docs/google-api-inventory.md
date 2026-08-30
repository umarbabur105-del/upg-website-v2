# Google API Inventory

Last verified: 2026-08-30

This inventory describes the Google access used to operate the UPG website and its connected business tools. It intentionally contains no credential values, refresh tokens, client secrets, or API key strings.

## Google Cloud project

| Item | Value |
| --- | --- |
| Project ID | `upg-leads-crm` |
| Project number | `624595446838` |
| Workspace operator | `umar@universalpackaginggroup.com` |
| OAuth app | `UPG Automation` (Internal) |
| Desktop OAuth client | `UPG Codex Automation` |

## Authentication boundaries

### Codex/operator access

The desktop OAuth credential is for private operator automation on Umar's Mac. It has the broad access explicitly approved for operating the business:

- Google Cloud: `cloud-platform`
- Merchant Center: `content`
- Search Console: `webmasters`
- Google Analytics reporting: `analytics`
- Google Analytics administration: `analytics.edit`
- Google Drive: `drive`
- Gmail: `https://mail.google.com/`
- Google Sheets: `spreadsheets`

Local credential files are stored under `~/.config/gcloud/upg-automation/` with owner-only permissions. They must never be copied into this repository, committed to Git, exposed in browser code, or uploaded to Vercel.

### Production website access

The live website continues to use keyless Workload Identity Federation for its narrow Sheets lead-writing flow:

| Item | Value |
| --- | --- |
| Workload Identity pool | `vercel-production` |
| Provider | `website-v2` |
| Service account | `upg-leads-writer@upg-leads-crm.iam.gserviceaccount.com` |
| Service-account keys | None |

Do not replace this production identity with the broad desktop OAuth credential.

### PageSpeed and CrUX key

PageSpeed Insights and Chrome UX Report use a dedicated API key named `upg-readonly-web-data`. The key is restricted at Google Cloud to:

- `pagespeedonline.googleapis.com`
- `chromeuxreport.googleapis.com`

Its key string exists only in `~/.config/gcloud/upg-automation/web_data_api_key.json`.

## Connected resources

| Product | Resource |
| --- | --- |
| Merchant Center | Account `5837241168` (`Universal Packaging Group`) |
| Google Analytics | Account `403775469`; GA4 property `548846712`; measurement ID `G-G1L3B11JX5` |
| Search Console | `sc-domain:universalpackaginggroup.com` |
| Google Sheets CRM | `UPG Leads CRM`; tabs: Dashboard, Leads, Activity Log, Lists, Guide, Organic Weekly, Backlink Outreach |

## Enabled and verified APIs

| API | Service name | Latest recorded proof |
| --- | --- | --- |
| Merchant API | `merchantapi.googleapis.com` | Project registered to Merchant account; account read succeeded; 2 processed products returned and both are approved for Free Listings in all 32 configured countries; GA4 property `548846712` is linked as an active conversion source |
| Search Console API | `searchconsole.googleapis.com` | Domain property returned with `siteOwner` permission; fresh URL Inspection on 2026-08-30 reported 83 of 85 live sitemap URLs indexed. `/industries/beauty-personal-care-packaging` was unknown to Google and `/industries/supplement-packaging` was discovered but not indexed; both live URLs returned HTTP 200 and were allowed for indexing. |
| Google Analytics Data API | `analyticsdata.googleapis.com` | GA4 channel and event-funnel reports read succeeded; the aggregate report now includes form starts, submitted leads, checkout starts, purchases, and tool handoffs |
| Google Analytics Admin API | `analyticsadmin.googleapis.com` | Target account and property both returned |
| Google Drive API | `drive.googleapis.com` | Workspace account and CRM spreadsheet search succeeded |
| Gmail API | `gmail.googleapis.com` | Workspace mailbox profile read succeeded |
| Google Sheets API | `sheets.googleapis.com` | CRM title and all seven tabs returned |
| PageSpeed Insights API | `pagespeedonline.googleapis.com` | Credential accepted and the 2026-08-21 mobile diagnostic completed with a performance score of 83. Earlier successful snapshots included 84 and 97. |
| Chrome UX Report API | `chromeuxreport.googleapis.com` | Authenticated API-key request reached CrUX; Google returned `data not found` for the UPG origin |
| API Keys API | `apikeys.googleapis.com` | Restricted PageSpeed/CrUX key created and recovered through API |

The CrUX `data not found` response means the origin does not currently meet Google's field-data availability threshold. It is not an authentication or API-connection failure.

Merchant BusinessInfo also returned the configured customer-service URL, email, and phone. Its separate business `phone` is absent and `phoneVerificationState` is `UNVERIFIED`; Google documents that field as output-only, so that final verification remains a Merchant Center UI task rather than an API write.

The desktop OAuth refresh token required interactive reauthentication on 2026-08-21 after Google returned `invalid_grant` with an `invalid_rapt` reauthentication reason. The credential was renewed through the existing local OAuth flow, and the subsequent core health check passed for Cloud, Merchant, Search Console, Analytics, Drive, Gmail, and Sheets.

## Health check

Run the repository wrapper:

```bash
./scripts/google-api-health
```

The wrapper calls the owner-only local health script. Its default mode is read-only. It refreshes the OAuth access token and probes Cloud API enablement, Merchant, Search Console, Analytics, Drive, Gmail, Sheets, PageSpeed, and CrUX.

The local script also has a `--register-merchant` option. That option changes Merchant developer registration and is not part of normal health checks.

## Expansion rule

New Google APIs can reuse the same Cloud project and desktop OAuth client. Enabling a new API does not normally require creating another OAuth client. A product that needs a new Google user-data scope may still require adding that scope and completing Google consent once.

The website runtime should receive only the minimum credential and permission required for each production feature. Broad operator access stays local.
