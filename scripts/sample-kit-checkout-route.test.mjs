import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import test from "node:test";

// Exercise the real route without creating Stripe sessions or using credentials.
const stripeStub = `data:text/javascript,${encodeURIComponent(`
  export const sessions = [];
  export function hasValidStripeTestAccessToken(token) {
    return token === "checkout-contract-test";
  }
  export function getStripeClient(mode) {
    return { checkout: { sessions: { async create(params) {
      sessions.push({ mode, params });
      return { url: "https://checkout.stripe.com/c/pay/contract-test" };
    } } } };
  }
`)}`;

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "@/lib/stripe") {
      return { url: stripeStub, shortCircuit: true };
    }
    if (specifier === "next/server") {
      return nextResolve("next/server.js", context);
    }
    if (specifier.startsWith("@/")) {
      return nextResolve(new URL(`../src/${specifier.slice(2)}.ts`, import.meta.url).href, context);
    }
    return nextResolve(specifier, context);
  },
});

const { POST } = await import("../src/app/api/sample-kit/checkout/route.ts");
const { boxSampleKit, mylarBagSampleKit } = await import("../src/data/sample-kit.ts");
const { sessions } = await import(stripeStub);

async function request(body, headers = {}) {
  return POST(new Request("https://universalpackaginggroup.com/api/sample-kit/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  }));
}

test("both kits default to US, preserving server-owned price and payment settings", async () => {
  for (const kit of [boxSampleKit, mylarBagSampleKit]) {
    const response = await request({ sku: kit.sku, price: 1, priceCents: 1, currency: "eur", quantity: 9 });
    assert.equal(response.status, 200);
    const { mode, params } = sessions.at(-1);
    assert.equal(mode, "live");
    assert.deepEqual(params.shipping_address_collection.allowed_countries, ["US"]);
    assert.equal(params.line_items[0].price_data.unit_amount, 1999);
    assert.equal(params.line_items[0].price_data.currency, "usd");
    assert.equal(params.line_items[0].quantity, 1);
    assert.equal(params.shipping_options[0].shipping_rate_data.fixed_amount.amount, 0);
    assert.equal(params.adaptive_pricing.enabled, false);
    assert.equal(params.metadata.sku, kit.sku);
  }
});

test("all existing eligible countries work for both kits and survive the Stripe return link", async () => {
  for (const kit of [boxSampleKit, mylarBagSampleKit]) {
    assert.equal(kit.shippingCountries.length, 32);
    for (const country of kit.shippingCountries) {
      const response = await request({ sku: kit.sku, shipping_country: country });
      assert.equal(response.status, 200);
      const { params } = sessions.at(-1);
      assert.deepEqual(params.shipping_address_collection.allowed_countries, [country]);
      const returnUrl = new URL(params.cancel_url);
      assert.equal(returnUrl.origin, "https://universalpackaginggroup.com");
      assert.equal(returnUrl.pathname, "/samples/checkout");
      assert.equal(returnUrl.searchParams.get("sku"), kit.sku);
      assert.equal(returnUrl.searchParams.get("country"), country);
    }
  }
});

test("invalid destinations fail before Stripe is called", async () => {
  const callsBefore = sessions.length;
  for (const country of ["", "ZZ", "PK", "USA", null, ["US"], {}, 1]) {
    const response = await request({ sku: boxSampleKit.sku, shipping_country: country });
    assert.equal(response.status, 400);
  }
  assert.equal(sessions.length, callsBefore);
});

test("existing origin, SKU and test-mode guards still reject bad requests before Stripe", async () => {
  const callsBefore = sessions.length;
  assert.equal((await request({ sku: boxSampleKit.sku }, { Origin: "https://untrusted.example" })).status, 403);
  assert.equal((await request({ sku: "UNKNOWN" })).status, 400);
  assert.equal((await request({ sku: boxSampleKit.sku }, { "x-upg-stripe-test-token": "invalid" })).status, 403);
  assert.equal(sessions.length, callsBefore);
});
