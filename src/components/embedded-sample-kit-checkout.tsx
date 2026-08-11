"use client";

import { useCallback, useMemo } from "react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type { SampleKit } from "@/data/sample-kit";
import { getLeadAttribution } from "@/lib/lead-attribution";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

type CheckoutResponse = {
  clientSecret?: string;
  error?: string;
};

export function EmbeddedSampleKitCheckout({ kit }: { kit: SampleKit }) {
  const fetchClientSecret = useCallback(async () => {
    const response = await fetch("/api/sample-kit/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sku: kit.sku,
        attribution: getLeadAttribution(),
      }),
    });
    const result = (await response.json()) as CheckoutResponse;

    if (!response.ok || !result.clientSecret) {
      throw new Error(
        result.error ??
          "Checkout is temporarily unavailable. Please request a free sample review."
      );
    }

    return result.clientSecret;
  }, [kit.sku]);

  const options = useMemo(() => ({ fetchClientSecret }), [fetchClientSecret]);

  if (!stripePromise) {
    return (
      <div role="alert" className="border border-gold/30 bg-cream p-6 text-sm leading-relaxed text-foreground">
        Secure checkout is not connected yet. Please return to the sample page
        and request a free sample review.
      </div>
    );
  }

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
