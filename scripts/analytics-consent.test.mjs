import assert from "node:assert/strict";
import test from "node:test";
import {
  ANALYTICS_CONSENT_REQUIRED_COUNTRIES,
  getAnalyticsConsentRegion,
  normalizeAnalyticsCountryCode,
} from "../src/lib/analytics-consent.ts";

test("keeps the consent-required country list scoped to the EEA, UK, and Switzerland", () => {
  assert.equal(ANALYTICS_CONSENT_REQUIRED_COUNTRIES.size, 32);
  for (const country of ["GB", "DE", "FR", "NO", "CH"]) {
    assert.equal(getAnalyticsConsentRegion(country).requiresConsent, true);
  }
});

test("allows analytics without opening the banner in resolved non-consent regions", () => {
  for (const country of ["US", "PK", "CA", "AE"]) {
    assert.deepEqual(getAnalyticsConsentRegion(country), {
      resolved: true,
      requiresConsent: false,
    });
  }
});

test("fails closed when the visitor country cannot be resolved", () => {
  for (const country of [null, "", "unknown", "1", "XX", "ZZ"]) {
    assert.deepEqual(getAnalyticsConsentRegion(country), {
      resolved: false,
      requiresConsent: true,
    });
  }
});

test("normalizes lowercase country codes and the UK alias", () => {
  assert.equal(normalizeAnalyticsCountryCode(" de "), "DE");
  assert.equal(normalizeAnalyticsCountryCode("uk"), "GB");
});
