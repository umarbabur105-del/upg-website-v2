import "server-only";

import { timingSafeEqual } from "node:crypto";
import Stripe from "stripe";

export type StripeMode = "live" | "test";

const stripeClients: Record<StripeMode, Stripe | null> = {
  live: null,
  test: null,
};

function getSecretKey(mode: StripeMode) {
  const secretKey = (
    mode === "test"
      ? process.env.STRIPE_TEST_SECRET_KEY
      : process.env.STRIPE_SECRET_KEY
  )?.trim();

  return secretKey && new RegExp(`^sk_${mode}_[A-Za-z0-9]+$`).test(secretKey)
    ? secretKey
    : null;
}

export function getStripeClient(mode: StripeMode = "live") {
  const secretKey = getSecretKey(mode);
  if (!secretKey) {
    return null;
  }

  if (!stripeClients[mode]) {
    stripeClients[mode] = new Stripe(secretKey, {
      appInfo: {
        name: "UPG Sample Kit Checkout",
        version: "1.0.0",
      },
    });
  }

  return stripeClients[mode];
}

export function getStripeWebhookSecret(mode: StripeMode = "live") {
  const secret = (
    mode === "test"
      ? process.env.STRIPE_TEST_WEBHOOK_SECRET
      : process.env.STRIPE_WEBHOOK_SECRET
  )?.trim();
  return secret && /^whsec_[A-Za-z0-9]+$/.test(secret) ? secret : null;
}

export function hasValidStripeTestAccessToken(candidate: string | null) {
  const expected = process.env.STRIPE_TEST_ACCESS_TOKEN?.trim();
  if (!candidate || !expected || candidate.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(candidate), Buffer.from(expected));
}
