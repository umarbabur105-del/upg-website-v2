import "server-only";

import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secretKey || !/^sk_(test|live)_[A-Za-z0-9]+$/.test(secretKey)) {
    return null;
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey, {
      appInfo: {
        name: "UPG Sample Kit Checkout",
        version: "1.0.0",
      },
    });
  }

  return stripeClient;
}

export function getStripeWebhookSecret() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  return secret && /^whsec_[A-Za-z0-9]+$/.test(secret) ? secret : null;
}
