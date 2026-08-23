import type { Metadata } from "next";
import { SampleKitProductPage } from "@/components/sample-kit-product-page";
import { mylarBagSampleKit } from "@/data/sample-kit";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Mylar Bag & Flexible Packaging Sample Kit",
  description:
    "Order five Mylar bag and flexible packaging samples for $19.99 with shipping included, 3–7 business-day delivery, and full first-production-order credit.",
  path: mylarBagSampleKit.path,
  keywords: [
    "mylar bag sample kit",
    "mylar bag samples",
    "flexible packaging samples",
    "custom pouch samples",
    "flexible packaging sample kit",
    "stand up pouch samples",
    "printed pouch sample kit",
  ],
});

export default function MylarBagSampleKitPage() {
  return <SampleKitProductPage kit={mylarBagSampleKit} />;
}
