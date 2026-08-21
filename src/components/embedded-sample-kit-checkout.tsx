"use client";

import { useState } from "react";
import type { SampleKit } from "@/data/sample-kit";
import { getLeadAttribution } from "@/lib/lead-attribution";

type CheckoutResponse = {
  checkoutUrl?: string;
  error?: string;
};

export function EmbeddedSampleKitCheckout({ kit }: { kit: SampleKit }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function continueToCheckout() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/sample-kit/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: kit.sku,
          attribution: getLeadAttribution(),
        }),
      });
      const result = (await response.json()) as CheckoutResponse;

      if (!response.ok || !result.checkoutUrl) {
        throw new Error(
          result.error ??
            "Checkout is temporarily unavailable. Please request a free sample review."
        );
      }

      const checkoutUrl = new URL(result.checkoutUrl);
      if (
        checkoutUrl.protocol !== "https:" ||
        !(
          checkoutUrl.hostname === "checkout.stripe.com" ||
          checkoutUrl.hostname.endsWith(".stripe.com")
        )
      ) {
        throw new Error("Checkout returned an invalid secure-payment address.");
      }

      window.location.assign(checkoutUrl.toString());
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Checkout is temporarily unavailable. Please try again."
      );
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-64 flex-col justify-center border border-border bg-cream p-6 text-center md:p-10">
      <h3 className="font-serif text-3xl text-foreground">
        Continue to secure payment.
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Stripe will collect your payment and delivery details on its secure
        hosted checkout. UPG does not store your full card number.
      </p>
      <button
        type="button"
        onClick={continueToCheckout}
        disabled={loading}
        className="mx-auto mt-7 inline-flex min-w-56 items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-moss-deep disabled:cursor-wait disabled:opacity-70"
      >
        {loading ? "Opening Stripe…" : `Pay $${kit.price.toFixed(2)} securely`}
      </button>
      {error ? (
        <p role="alert" className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
