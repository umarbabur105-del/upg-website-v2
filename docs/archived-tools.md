# Archived planning tools

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

