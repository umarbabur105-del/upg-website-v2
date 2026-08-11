"use client";

import type { SampleKit } from "@/data/sample-kit";
import { trackAnalyticsEvent } from "@/lib/analytics";

export function SampleKitCheckout({ kit }: { kit: SampleKit }) {
  async function beginCheckout() {
    trackAnalyticsEvent("begin_checkout", {
      currency: kit.currency,
      value: kit.price,
      item_id: kit.sku,
      item_name: kit.name,
    });
    window.location.assign(
      `/samples/checkout?sku=${encodeURIComponent(kit.sku)}`
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={beginCheckout}
        className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
      >
        Buy {kit.shortName} — ${kit.price.toFixed(2)}
      </button>
      <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
        Secure checkout. {kit.deliveryEstimate}. The kit price is credited toward
        your first UPG production order.
      </p>
    </div>
  );
}
