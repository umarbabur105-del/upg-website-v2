import assert from "node:assert/strict";
import test from "node:test";
import { resolveSampleKitShippingCountry } from "../src/lib/sample-kit-checkout-country.ts";

test("checkout defaults an older request without a country to the United States", () => {
  assert.equal(resolveSampleKitShippingCountry(undefined, ["AT", "US", "CA"]), "US");
});

test("an international buyer can select an eligible destination", () => {
  for (const country of ["CA", "AT", "GB"]) {
    assert.equal(resolveSampleKitShippingCountry(country, ["US", "CA", "AT", "GB"]), country);
  }
  assert.equal(resolveSampleKitShippingCountry(" ca ", ["US", "CA"]), "CA");
});

test("invalid or unsupported destinations cannot silently create a US checkout", () => {
  for (const value of ["", "  ", "ZZ", "PK", "USA", 1, null, {}, ["US"]]) {
    assert.equal(resolveSampleKitShippingCountry(value, ["US", "CA"]), null);
  }
});

test("country validation respects the selected kit's shipping eligibility", () => {
  assert.equal(resolveSampleKitShippingCountry("CA", ["US"]), null);
  assert.equal(resolveSampleKitShippingCountry(undefined, ["CA"]), null);
});
