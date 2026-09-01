# Archived planning tools

## Tool release policy

- No new or restored interactive tool may be merged to `main` or deployed to
  production until Umar has tested its exact preview URL and explicitly approved
  it to go live.
- A successful build, automated test, or SEO audit is required evidence, but it
  is not owner approval.
- Tool work must remain local or on a preview deployment until that approval is
  recorded.
- The Packaging Format Finder is the only interactive planning tool retained on
  production as of 2026-09-01.

The SEO quality audit enforces the current production tool allowlist. Adding a
new route under `/tools/` fails the release gate until the allowlist is changed
after explicit preview-test approval.

## Packaging Spec & MOQ Builder

- **Archived:** 2026-09-01
- **Former route:** `/tools/packaging-spec-builder`
- **Current route behavior:** permanent redirect to `/tools`
- **Last complete implementation:** Git commit `ddaf04b`

Retired at the owner's request. The page, interactive component, sitemap entry,
internal links, and machine-readable discovery references were removed. Its
implementation remains recoverable from Git history and must remain preview-only
unless Umar explicitly approves it after testing.

## Packaging Artwork Preflight Checker

- **Archived:** 2026-09-01
- **Former route:** `/tools/packaging-artwork-preflight`
- **Current route behavior:** permanent redirect to `/tools`
- **Last complete implementation:** Git commit `ddaf04b`

Retired at the owner's request. The page, interactive component, dedicated data,
sitemap entry, internal links, and machine-readable discovery references were
removed. Its implementation remains recoverable from Git history and must remain
preview-only unless Umar explicitly approves it after testing.

## Packing CBM & Weight Calculator

- **Archived:** 2026-09-01
- **Former route:** `/tools/packing-cbm-weight-calculator`
- **Current route behavior:** permanent redirect to `/tools`
- **Last complete implementation:** Git commit `5a59467`

The calculator was retired because UPG packaging products are commonly supplied
flat, folded, collapsed, or nested. Its carton-count and CBM model depended on an
assembled packed-item footprint and a buyer-supplied master-carton arrangement.
That assumption does not reliably represent the shipped form of the current UPG
product range and could create a misleading freight-planning estimate.

The retired route is excluded from the tools hub, pricing page, XML sitemap,
machine-readable discovery files, and product catalog. The implementation remains
recoverable from Git history; it must not be restored without an approved
flat-pack or product-family-specific shipping model backed by real packing data.
