"use client";

import { useEffect } from "react";
import type { SampleKit } from "@/data/sample-kit";
import { trackAnalyticsEvent } from "@/lib/analytics";

export function SampleKitPurchaseTracker({
  transactionId,
  kit,
}: {
  transactionId: string;
  kit: SampleKit;
}) {
  useEffect(() => {
    trackAnalyticsEvent("purchase", {
      transaction_id: transactionId,
      currency: kit.currency,
      value: kit.price,
      item_id: kit.sku,
      item_name: kit.name,
    });
  }, [transactionId, kit]);

  return null;
}
