import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { blogPosts } from "../src/data/blog-posts.ts";

const output = ".next/server/app";

test("built buyer-guide references include the same complete answers as public FAQ markup", async () => {
  const catalog = JSON.parse(await readFile(`${output}/product-catalog.json.body`, "utf8"));
  const fullText = await readFile(`${output}/llms-full.txt.body`, "utf8");
  assert.equal(catalog.schemaVersion, "3.3");
  assert.equal(catalog.buyerGuides.length, blogPosts.length);

  for (const post of blogPosts) {
    const guide = catalog.buyerGuides.find((item) => item.slug === post.slug);
    assert.ok(guide, post.slug);
    assert.deepEqual(guide.faq, post.faqs, `${post.slug} catalog answers`);
    assert.ok(fullText.includes(post.content), `${post.slug} full guide`);
    for (const faq of post.faqs) {
      assert.ok(fullText.includes(`Q: ${faq.question}\nA: ${faq.answer}`), `${post.slug}: ${faq.question}`);
    }

    const html = await readFile(`${output}/blog/${post.slug}.html`, "utf8");
    const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
      .flatMap((match) => {
        const schema = JSON.parse(match[1]);
        return schema["@graph"] ?? [schema];
      });
    const faqSchema = schemas.find((schema) => schema["@type"] === "FAQPage");
    assert.ok(faqSchema, `${post.slug} public FAQ markup`);
    assert.deepEqual(
      faqSchema.mainEntity.map((item) => ({question: item.name, answer: item.acceptedAnswer.text})),
      guide.faq,
      `${post.slug} page-to-catalog parity`,
    );
  }
});
