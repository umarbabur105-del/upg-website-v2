import assert from "node:assert/strict";
import test from "node:test";
import {
  combineQuoteNotes,
  formatQuoteContext,
  QUICK_QUANTITIES,
} from "../src/lib/quote-form-ux.ts";

test("offers practical one-tap quantities from the 250-unit MOQ", () => {
  assert.deepEqual([...QUICK_QUANTITIES], [250, 500, 1000, 2500]);
});

test("turns a picker handoff into customer-friendly summary text", () => {
  assert.equal(
    formatQuoteContext(
      "Packaging picker answers: A box for a kit or unboxing; A firm, luxury gift-box feel. Suggested starting point: Magnetic Boxes."
    ),
    "A box for a kit or unboxing • A firm, luxury gift-box feel."
  );
});

test("preserves non-picker source context", () => {
  assert.equal(
    formatQuoteContext("Comparison path: Tuck Boxes vs Mailer Boxes."),
    "Comparison path: Tuck Boxes vs Mailer Boxes."
  );
});

test("merges source context and customer notes without blank sections", () => {
  assert.equal(
    combineQuoteNotes("Buyer intent: custom mailer.", "Please include an insert."),
    "Buyer intent: custom mailer.\n\nPlease include an insert."
  );
  assert.equal(combineQuoteNotes("", "Customer note"), "Customer note");
  assert.equal(combineQuoteNotes(undefined, undefined), "");
});
