import type { Metadata } from "next";
import { SampleKitProductPage } from "@/components/sample-kit-product-page";
import { boxSampleKit } from "@/data/sample-kit";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Box Sample Kit",
  description:
    "Order the $19.99 UPG Custom Box Sample Kit with finished branded box samples, shipping included, and estimated delivery in 3–7 business days.",
  path: boxSampleKit.path,
  keywords: [
    "custom box sample kit",
    "finished packaging samples",
    "custom box samples",
    "printed box sample kit",
    "custom box sample pack",
  ],
});

export default function BoxSampleKitPage() {
  return <SampleKitProductPage kit={boxSampleKit} />;
}
