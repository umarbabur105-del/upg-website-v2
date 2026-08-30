import assert from "node:assert/strict";
import test from "node:test";
import {
  calculatePackingEstimate,
  kilogramsToPounds,
} from "../src/lib/packing-cbm.ts";

function assertClose(actual, expected) {
  assert.ok(Math.abs(actual - expected) < 1e-12);
}

test("calculates carton count, packed dimensions, CBM, and weight", () => {
  const result = calculatePackingEstimate({
    unitDimensions: { length: 10, width: 5, height: 2 },
    dimensionUnit: "cm",
    quantity: 101,
    layout: { length: 2, width: 2, height: 5 },
    outerAllowance: 2,
    unitWeight: 50,
    cartonTareWeight: 500,
    weightUnit: "g",
    dimensionalWeightDivisor: 5000,
  });

  assert.ok(result);
  assert.equal(result.unitsPerCarton, 20);
  assert.equal(result.cartonCount, 6);
  assert.equal(result.lastCartonUnits, 1);
  assert.deepEqual(result.cartonDimensions, {
    length: 22,
    width: 12,
    height: 12,
  });
  assertClose(result.cbmPerCarton, 0.003168);
  assertClose(result.totalCbm, 0.019008);
  assertClose(result.netWeightKg, 5.05);
  assertClose(result.grossWeightKg, 8.05);
  assertClose(result.dimensionalWeightPerCartonKg, 0.6336);
  assertClose(result.totalDimensionalWeightKg, 3.8016);
});

test("converts inch dimensions before calculating CBM", () => {
  const result = calculatePackingEstimate({
    unitDimensions: { length: 10, width: 10, height: 10 },
    dimensionUnit: "in",
    quantity: 1,
    layout: { length: 1, width: 1, height: 1 },
    outerAllowance: 0,
    weightUnit: "oz",
    dimensionalWeightDivisor: 6000,
  });

  assert.ok(result);
  assert.equal(result.cartonCount, 1);
  assertClose(result.totalCbm, 0.016387064);
  assert.equal(result.netWeightKg, null);
  assert.equal(result.grossWeightKg, null);
});

test("requires positive dimensions, quantity, and whole-number layout", () => {
  const base = {
    unitDimensions: { length: 10, width: 5, height: 2 },
    dimensionUnit: "cm",
    quantity: 100,
    layout: { length: 2, width: 2, height: 5 },
    outerAllowance: 2,
    weightUnit: "g",
    dimensionalWeightDivisor: 5000,
  };

  assert.equal(
    calculatePackingEstimate({
      ...base,
      unitDimensions: { ...base.unitDimensions, height: 0 },
    }),
    null
  );
  assert.equal(calculatePackingEstimate({ ...base, quantity: 10.5 }), null);
  assert.equal(
    calculatePackingEstimate({
      ...base,
      layout: { ...base.layout, width: 1.5 },
    }),
    null
  );
  assert.equal(
    calculatePackingEstimate({ ...base, outerAllowance: -1 }),
    null
  );
});

test("converts kilograms to pounds", () => {
  assertClose(kilogramsToPounds(1), 2.2046226218);
});
