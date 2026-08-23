import type { Metadata } from "next";
import { SampleKitProductPage } from "@/components/sample-kit-product-page";
import { boxSampleKit } from "@/data/sample-kit";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Box Samples & Sample Kit",
  description:
    "Order custom box samples in a $19.99 finished-box kit with shipping included, 3–7 business-day delivery, and full credit toward a first production order.",
  path: boxSampleKit.path,
  keywords: [
    "custom box sample kit",
    "custom box sample",
    "box samples",
    "sample packaging boxes",
    "finished packaging samples",
    "custom box samples",
    "printed box sample kit",
    "custom box sample pack",
  ],
});

export default function BoxSampleKitPage() {
  return <SampleKitProductPage kit={boxSampleKit} />;
}
