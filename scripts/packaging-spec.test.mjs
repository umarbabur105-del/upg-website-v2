import assert from "node:assert/strict";
import test from "node:test";
import {
  formatFinishedDimensions,
  getPlanningMoq,
  productFamilies,
} from "../src/data/packaging-spec.ts";
import { products } from "../src/data/products.ts";

test("requires a product family before returning a planning MOQ", () => {
  assert.deepEqual(getPlanningMoq(""), {
    units: null,
    label: "Choose a product family",
    note: "Select a product family to see its planning MOQ.",
    needsDimensions: false,
  });
});

test("returns 250 units for every custom product family without dimensions", () => {
  for (const family of productFamilies) {
    const result = getPlanningMoq(family);
    assert.equal(result.units, 250, family);
    assert.equal(result.label, "250 units", family);
    assert.equal(result.needsDimensions, false, family);
  }
});

test("publishes the same exact MOQ on every core product", () => {
  for (const product of products) {
    assert.equal(product.moq, "250 units", product.name);
  }
});

test("keeps valid dimensions in the planning brief", () => {
  assert.equal(
    formatFinishedDimensions({ length: 10, width: 8, height: 3 }, "in"),
    "10 × 8 × 3 in"
  );
  assert.equal(
    formatFinishedDimensions({ length: 0, width: 8, height: 3 }, "in"),
    ""
  );
});
