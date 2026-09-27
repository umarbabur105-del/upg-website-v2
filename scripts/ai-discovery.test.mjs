import assert from "node:assert/strict";
import test from "node:test";
import { access } from "node:fs/promises";
import {
  getProductBuyerGuide,
  productBriefComparisonNote,
  productBriefHref,
} from "../src/data/product-buyer-guides.ts";
import { getProductFaqs, products } from "../src/data/products.ts";

const guideSlugs = [
  "custom-tuck-boxes",
  "custom-mailer-boxes",
  "custom-magnetic-boxes",
  "custom-collapsible-magnetic-boxes",
  "custom-mylar-bags",
];

test("all five core product buyer guides match product galleries and buyer data", async () => {
  for (const slug of guideSlugs) {
    const product = products.find((candidate) => candidate.slug === slug);
    const guide = getProductBuyerGuide(slug);

    assert.ok(product, `missing product ${slug}`);
    assert.ok(guide, `missing buyer guide ${slug}`);
    assert.equal(guide.pricingFactors.length, 4, `${slug} pricing factors`);
    assert.equal(guide.briefChecklist.length, 3, `${slug} quote inputs`);
    assert.equal(guide.examples.length, 3, `${slug} gallery examples`);
    assert.deepEqual(
      guide.examples.map((example) => example.image),
      product.galleryImages.map((image) => image.src),
      `${slug} example images`,
    );
    assert.ok(
      getProductFaqs(product).length >= 5,
      `${slug} requires buyer-facing FAQs`,
    );
    assert.ok(
      (product.buyerFaqs?.length ?? 0) >= 3,
      `${slug} requires family-specific buyer FAQs`,
    );
    if (slug === "custom-mylar-bags") {
      assert.equal(
        guide.quantityLabel,
        "For finished bag and pouch enquiries",
      );
    }
    for (const example of guide.examples) {
      await access(`public${example.image}`);
      assert.ok(example.quoteNote.length > 0, `${slug} example quote note`);
    }
  }
});

test("buyer-guide quote links preserve quantity and comparison context", () => {
  for (const slug of guideSlugs) {
    const product = products.find((candidate) => candidate.slug === slug);
    const guide = getProductBuyerGuide(slug);

    assert.ok(product && guide, `missing source ${slug}`);
    for (const quantity of [250, 500, 1000]) {
      const url = new URL(
        productBriefHref(product.family, guide.quoteNote, quantity),
        "https://example.com",
      );
      assert.equal(url.pathname, "/get-a-quote", `${slug} quote route`);
      assert.equal(url.searchParams.get("product"), product.family);
      assert.equal(url.searchParams.get("builder_note"), guide.quoteNote);
      assert.equal(url.searchParams.get("quantity"), String(quantity));
    }

    const comparisonNote = productBriefComparisonNote(guide.quoteNote);
    const comparisonUrl = new URL(
      productBriefHref(product.family, comparisonNote, 250),
      "https://example.com",
    );
    assert.equal(comparisonUrl.searchParams.get("product"), product.family);
    assert.equal(comparisonUrl.searchParams.get("quantity"), "250");
    assert.equal(comparisonUrl.searchParams.get("builder_note"), comparisonNote);
    assert.match(comparisonNote, /500 and 1,000 units/);
  }
});
