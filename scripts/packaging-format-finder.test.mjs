import assert from "node:assert/strict";
import test from "node:test";
import {
  buildFormatFinderQuoteNote,
  formatFinderFollowUps,
  formatFinderGoals,
  getFormatFinderRecommendation,
} from "../src/data/packaging-format-finder.ts";

test("keeps the picker to two decisions", () => {
  assert.equal(formatFinderGoals.length, 5);

  for (const goal of formatFinderGoals) {
    assert.ok(formatFinderFollowUps[goal.id]);
    assert.ok(formatFinderFollowUps[goal.id].options.length >= 3);
  }
});

test("maps the main visual paths to the correct product families", () => {
  assert.equal(
    getFormatFinderRecommendation("one-product", "individual-carton")?.primaryFamily,
    "Tuck Boxes"
  );
  assert.equal(
    getFormatFinderRecommendation("kit-or-unboxing", "corrugated-unboxing")
      ?.primaryFamily,
    "Mailer Boxes"
  );
  assert.equal(
    getFormatFinderRecommendation("premium-presentation", "assembled-rigid")
      ?.primaryFamily,
    "Magnetic Boxes"
  );
  assert.equal(
    getFormatFinderRecommendation("premium-presentation", "stores-flat")
      ?.primaryFamily,
    "Collapsible Magnetic Boxes"
  );
  assert.equal(
    getFormatFinderRecommendation("flexible-packaging", "finished-pouch")
      ?.primaryFamily,
    "Mylar Bags"
  );
});

test("shows the right alternate when the choice remains genuinely close", () => {
  const premium = getFormatFinderRecommendation(
    "premium-presentation",
    "premium-unsure"
  );
  assert.equal(premium?.primaryFamily, "Magnetic Boxes");
  assert.equal(premium?.alternateFamily, "Collapsible Magnetic Boxes");
  assert.equal(premium?.resultType, "comparison");

  const kit = getFormatFinderRecommendation("kit-or-unboxing", "kit-unsure");
  assert.equal(kit?.primaryFamily, "Mailer Boxes");
  assert.equal(kit?.alternateFamily, "Magnetic Boxes");
});

test("does not invent a recommendation when the visitor still cannot tell", () => {
  const result = getFormatFinderRecommendation("not-sure", "still-unsure");
  assert.equal(result?.primaryFamily, null);
  assert.equal(result?.resultType, "human-review");
});

test("does not return a result for incomplete or mismatched answers", () => {
  assert.equal(getFormatFinderRecommendation(null, null), null);
  assert.equal(getFormatFinderRecommendation("one-product", null), null);
  assert.equal(
    getFormatFinderRecommendation("one-product", "assembled-rigid"),
    null
  );
});

test("builds a short quote handoff note from both visitor choices", () => {
  const result = getFormatFinderRecommendation(
    "premium-presentation",
    "stores-flat"
  );
  assert.ok(result);

  const note = buildFormatFinderQuoteNote(
    "premium-presentation",
    "stores-flat",
    result
  );
  assert.match(note, /premium gift or presentation box/i);
  assert.match(note, /folds flat before setup/i);
  assert.match(note, /Collapsible Magnetic Boxes/);
  assert.ok(note.length < 500);
});
