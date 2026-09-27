import assert from "node:assert/strict";
import test from "node:test";
import { commercialTerms } from "../src/data/commercial-terms.ts";
import {
  getMailerApplicationBySlug,
  getMailerApplicationQuoteHref,
} from "../src/data/mailer-applications.ts";
import { getBlogPostBySlug } from "../src/data/blog-posts.ts";
import { organicIntentRoutes } from "../src/data/organic-intent-routes.ts";
import { productStyles } from "../src/data/packaging-spec.ts";

const quoteUrl = (href) => new URL(href, "https://example.com");

test("application intent actions use styles accepted by the quote form", () => {
  for (const route of organicIntentRoutes.filter((route) => route.path.startsWith("/applications/"))) {
    for (const option of route.options) {
      if (!option.href?.startsWith("/get-a-quote")) continue;
      const params = quoteUrl(option.href).searchParams;
      const family = params.get("product");
      const style = params.get("style");
      assert.ok(family && productStyles[family], `${route.path} family`);
      if (style) assert.ok(productStyles[family].includes(style), `${route.path}: ${style}`);
      assert.ok(params.get("builder_note"), `${route.path} context`);
    }
  }
});

test("commercial comparison task keeps the review context and destination", () => {
  const comparisonUrl = quoteUrl(commercialTerms.quoteComparison.specificationHref);

  assert.equal(comparisonUrl.pathname, "/get-a-quote");
  assert.equal(
    comparisonUrl.searchParams.get("builder_note"),
    "I am requesting a like-for-like comparison against one specified packaging brief.",
  );
  assert.equal(
    commercialTerms.quoteComparison.checklistHref,
    "/blog/custom-packaging-quote-checklist",
  );
  assert.equal(commercialTerms.quoteComparison.checklist.length, 6);
});

test("PR and subscription mailer paths preserve product, style, use, and source note", () => {
  const expectedApplications = [
    [
      "custom-pr-boxes",
      "PR / Presentation Mailer",
      "Launch, press/editorial, media kit, event, or branded gifting presentation",
      "Mailer application: PR Boxes.",
    ],
    [
      "custom-subscription-boxes",
      "Subscription Mailer",
      "Recurring assortment, membership, discovery program, or repeat branded delivery",
      "Mailer application: Subscription Boxes.",
    ],
  ];

  for (const [slug, style, use, builderNote] of expectedApplications) {
    const application = getMailerApplicationBySlug(slug);
    assert.ok(application, `missing ${slug}`);
    const href = quoteUrl(getMailerApplicationQuoteHref(application));

    assert.equal(href.pathname, "/get-a-quote");
    assert.equal(href.searchParams.get("product"), "Mailer Boxes");
    assert.equal(href.searchParams.get("style"), style);
    assert.equal(href.searchParams.get("use"), use);
    assert.equal(href.searchParams.get("builder_note"), builderNote);
    assert.equal(
      application.decisionGuide?.options[0]?.useApplicationQuoteHref,
      true,
      `${slug} direct decision action uses the shared quote context`,
    );
  }

  const ecommerceApplication = getMailerApplicationBySlug(
    "branded-ecommerce-mailer-boxes",
  );
  assert.ok(ecommerceApplication, "missing ecommerce application");
  const ecommerceHref = quoteUrl(
    getMailerApplicationQuoteHref(ecommerceApplication),
  );
  assert.equal(ecommerceHref.searchParams.get("product"), "Mailer Boxes");
  assert.equal(ecommerceHref.searchParams.get("style"), "Ear-Lock Mailer Box");
  assert.equal(ecommerceHref.searchParams.get("use"), null);
  assert.equal(
    ecommerceHref.searchParams.get("builder_note"),
    "Mailer application: Ecommerce Mailers.",
  );
});

test("task guides preserve their explicit quote context only on the matching action", () => {
  const productionPost = getBlogPostBySlug("custom-packaging-production-process");
  const proofPost = getBlogPostBySlug("packaging-proof-vs-sample");

  for (const [post, quoteContext] of [
    [
      productionPost,
      "I need project-specific feasibility and timing review for a fixed target date.",
    ],
    [
      proofPost,
      "I need the project-specific proof or sample path confirmed before the next approval.",
    ],
  ]) {
    assert.ok(post && quoteContext, "task guide quote context is required");
    const href = post.resources.find((resource) => resource.href.startsWith("/get-a-quote"));
    assert.ok(href, `${post.slug} needs a task-specific quote route`);
    assert.equal(quoteUrl(href.href).searchParams.get("builder_note"), quoteContext);
  }
});
