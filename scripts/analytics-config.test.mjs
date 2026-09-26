import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import { buildGoogleAnalyticsConfigScript } from "../src/lib/analytics-config.ts";

function configFor(referrer) {
  const calls = [];
  vm.runInNewContext(buildGoogleAnalyticsConfigScript("G-TEST123"), {
    URL, document: { referrer }, window: { gtag: (...args) => calls.push(args) },
  });
  assert.deepEqual(calls.map((args) => args[0]), ["js", "config"]);
  return calls[1][2];
}

test("ignores only the exact Stripe checkout host as an acquisition referrer", () => {
  assert.equal(configFor("https://checkout.stripe.com/c/pay/cs_example").ignore_referrer, true);
  for (const referrer of ["", "invalid", "https://google.com/", "https://chatgpt.com/",
    "https://withupg.com/", "https://stripe.com/", "https://checkout.stripe.com.example.org/"]) {
    assert.equal(configFor(referrer).ignore_referrer, undefined);
  }
});

test("preserves privacy defaults and rejects script injection in measurement IDs", () => {
  const config = configFor("https://checkout.stripe.com/");
  assert.equal(config.allow_google_signals, false);
  assert.equal(config.allow_ad_personalization_signals, false);
  assert.throws(() => buildGoogleAnalyticsConfigScript('G-TEST";alert(1)'));
});
