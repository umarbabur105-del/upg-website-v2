"use client";

import { useEffect, useState } from "react";
import {
  sampleKitShippingCountries,
  type SampleKit,
  type SampleKitShippingCountryCode,
} from "@/data/sample-kit";
import { getLeadAttribution } from "@/lib/lead-attribution";
import { defaultSampleKitShippingCountry } from "@/lib/sample-kit-checkout-country";

type CheckoutResponse = {
  checkoutUrl?: string;
  error?: string;
};

export function EmbeddedSampleKitCheckout({
  kit,
  initialShippingCountry = defaultSampleKitShippingCountry,
}: {
  kit: SampleKit;
  initialShippingCountry?: SampleKitShippingCountryCode;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shippingCountry, setShippingCountry] = useState(initialShippingCountry);

  useEffect(() => {
    function restoreCheckout(event: PageTransitionEvent) {
      if (event.persisted) setLoading(false);
    }
    window.addEventListener("pageshow", restoreCheckout);
    return () => window.removeEventListener("pageshow", restoreCheckout);
  }, []);

  async function continueToCheckout() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/sample-kit/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: kit.sku,
          shipping_country: shippingCountry,
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

      const returnUrl = new URL(window.location.href);
      returnUrl.searchParams.set("country", shippingCountry);
      window.history.replaceState(window.history.state, "", returnUrl);
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
      <div className="mx-auto mt-6 w-full max-w-xs text-left">
        <label
          htmlFor="sample-kit-delivery-country"
          className="mb-2 block text-sm font-semibold text-foreground"
        >
          Deliver to
        </label>
        <select
          id="sample-kit-delivery-country"
          value={shippingCountry}
          onChange={(event) => {
            setShippingCountry(event.target.value as SampleKitShippingCountryCode);
            setError(null);
          }}
          disabled={loading}
          className="w-full rounded-lg border border-border bg-surface px-3 py-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-70"
        >
          {sampleKitShippingCountries
            .filter(({ code }) => kit.shippingCountries.includes(code))
            .map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
        </select>
      </div>
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
