# Buyer-Guide Authority Batch — 2026-09-01

## Purpose

This batch grows Universal Packaging Group's owned-site topical authority using
truthful buyer education that UPG can publish now. It does not depend on Google
Merchant Center and does not create customer evidence that does not exist.

The approved boundary is explicit:

- no public or generic dieline downloads;
- no fabricated reviews, ratings, testimonials, client stories, or results;
- no instant custom-production price or production-time promise;
- no new calculator or interactive tool;
- no product family outside UPG's current public scope.

## Content architecture

The resource hub now contains ten visual buyer guides across four distinct
decision clusters:

1. Project Planning
   - Custom Packaging Quote Checklist: What to Send
   - How to Measure a Product for Custom Packaging
   - Custom Packaging Production Process, Step by Step
   - What Is MOQ in Custom Packaging?
2. Structure & Delivery
   - How Custom Packaging Ships: Flat, Folded, or Assembled
   - Corrugated Mailer vs. Magnetic Boxes
3. Artwork & Print
   - Packaging Proof vs. Sample
   - CMYK vs. Pantone for Custom Packaging Printing
   - How to Prepare Artwork for Custom Packaging
4. Materials & Finishes
   - Custom Packaging Finishes: A Buyer Decision Guide

Seven guides are new. The three existing articles were upgraded into the same
visual and answer-first system.

## Page system

Every guide now includes:

- a visible category and reading-time label;
- one visual hero with descriptive alternative text;
- a direct answer that works without surrounding copy;
- three compact decision cards;
- concise sections, comparison tables, or checklist cards;
- three visible frequently asked questions;
- a visible image-policy disclosure;
- two commercial or planning next steps;
- three related guides;
- BlogPosting, FAQPage, and BreadcrumbList JSON-LD;
- visible editorial responsibility and last-reviewed date.

The hub uses CollectionPage, ItemList, and BreadcrumbList schema and groups the
ten guides by buyer decision rather than publishing a flat text-heavy archive.

## Reciprocal internal linking

The guides are connected back into the commercial website:

- Pricing & MOQ links to the quote checklist and measurement guide.
- Samples links to the proof-versus-sample guide.
- Materials & Finishes links to the finish and CMYK-versus-Pantone guides.
- About links to the full production-process guide.
- The footer labels the section as Buyer Guides.
- Every guide is linked from the hub and from three related guides.

No rendered sitemap route has fewer than two separate inbound sitemap pages.

## AI-readable sources

`llms.txt`, `llms-full.txt`, `agents.md`, and `product-catalog.json` now expose
the buyer-guide cluster. Product catalog schema version 2.8 publishes each
guide's category, direct answer, search terms, buyer decisions, questions
answered, review date, canonical URL, and next sources.

The CMYK-versus-Pantone guide cites primary Pantone and Adobe documentation.
Both source URLs returned HTTP 200 during local verification.

## Local production proof

The production candidate passed:

- ESLint;
- TypeScript;
- 4 MOQ tests, 5 form tests, and 3 organic-report tests;
- Next.js production build with 111 generated pages;
- rendered SEO audit for 90 canonical static pages plus one runtime sitemap page;
- 10/10 buyer-guide contracts, including metadata uniqueness, one H1,
  canonical URL, image alternatives, BlogPosting, FAQPage, breadcrumbs, direct
  answers, visual disclosures, related guides, and sitewide inbound links;
- local runtime crawl: 91/91 sitemap URLs returned HTTP 200;
- `llms.txt`, `llms-full.txt`, `agents.md`, and `product-catalog.json` returned
  HTTP 200 with buyer-guide discovery data;
- desktop and 375-pixel browser review of the guide hub and representative
  shipping guide, with no horizontal overflow and no browser warnings or errors;
- representative mobile Lighthouse: performance 99, accessibility 100, best
  practices 100, SEO 100, agentic browsing 100, LCP 2.2 seconds, CLS 0, TBT 10
  milliseconds, and Speed Index 1.2 seconds.

## Release boundary

Local proof does not establish production deployment, indexing, ranking, AI
citation, recommendation, or lead generation. Exact remote-main, Vercel, live
URL, sitemap, schema, and AI-source verification are required before this batch
is described as live.
