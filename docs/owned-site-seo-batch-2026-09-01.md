# Owned-Site SEO Batch — 2026-09-01

## Purpose

This batch strengthens Universal Packaging Group's own crawlable website. It does not depend on Google Merchant Center, paid media, or a third-party product feed. Merchant remains a separate acquisition lane for the two real fixed-price sample kits.

## Current owned-site baseline

The source and rendered-site audit found a healthy technical foundation:

- 84 canonical sitemap routes: 83 statically rendered routes and 1 runtime route;
- exactly one H1, a self-referencing canonical URL, metadata, and JSON-LD on every statically rendered sitemap page;
- no orphaned rendered sitemap pages and at least two separate sitemap pages linking to every non-home rendered route;
- 627 rendered images across the audited pages, with no missing or empty `alt` attributes;
- explicit crawler access for OpenAI, Anthropic, Perplexity, Google, and Bing search systems while private API and CRM paths remain blocked;
- published `llms.txt`, `llms-full.txt`, `agents.md`, `product-catalog.json`, sitemap, and Markdown pricing source;
- native quote and contact handoffs with human review rather than autonomous pricing, ordering, payment, or production commitments.

Search-engine result copies still showed older homepage and MOQ wording during the audit. Those snippets are stale copies rather than current live-page truth: the current product and pricing sources publish a 250-unit planning MOQ, and `www` permanently redirects to the canonical apex host. Recrawl notifications can request faster discovery but cannot guarantee refresh, indexing, ranking, citations, or leads.

The third-party `is-agentic` scan returned `scan_failed`, so this batch does not claim an external agent-readiness score.

## Changes in this batch

1. The homepage becomes a visual level-zero industry-discovery hub with seven market paths. It links buyers to the six existing commercial industry hubs and the existing Pet Products guide without creating duplicate keyword pages.
2. Homepage WebPage and ItemList structured data describe the five approved product families, their visible 250-unit planning MOQ, and the seven visible industry paths.
3. The homepage response advertises the existing AI-readable references through HTTP `Link` headers for `llms.txt`, `llms-full.txt`, `agents.md`, and `product-catalog.json`.
4. The rendered SEO gate now protects image alternative text, homepage industry discovery, homepage schema, links to all six commercial hubs, at least two separate inbound sitemap pages per rendered route, and the homepage AI-discovery headers.
5. The hero image has an explicit high fetch priority because it is the mobile largest-contentful element.

The new homepage block reuses approved product and industry visuals and keeps the copy compact. No calculator, interactive tool, new product family, unsupported review, invented credential, fixed custom-production price, or unapproved external action is introduced.

## Candidate verification

The local production candidate passed:

- ESLint;
- TypeScript;
- the Next.js production build with 104 generated pages;
- the strengthened rendered SEO audit for 83 canonical static sitemap pages plus 1 runtime sitemap route;
- 4 MOQ tests, 5 form tests, and 3 organic-report tests;
- desktop and 375-pixel mobile browser review, including 7 visible industry cards, one H1, no missing image alternative text, and zero horizontal overflow;
- local production Lighthouse: performance 96, accessibility 100, best practices 100, SEO 100, LCP 2.7 seconds, CLS 0, TBT 20 ms, and a confirmed high-priority LCP image request.

Release, exact remote commit, production deployment, live route checks, and IndexNow acceptance must be recorded only after each is proven.

## Measurement boundary

This release improves crawlability, internal relevance, source clarity, buyer discovery, and machine-readable context. It does not prove Google indexing, a ranking increase, an AI citation, a recommendation, or a lead. Search Console and GA4 should be compared over a full 28-day window before the homepage is materially rewritten again.
