import type { Metadata } from "next";
import { SampleKitProductPage } from "@/components/sample-kit-product-page";
import { mylarBagSampleKit } from "@/data/sample-kit";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Mylar Bag Sample Kit",
  description:
    "Order the $19.99 UPG Mylar Bag Sample Kit with five finished flexible-packaging formats, shipping included, and estimated delivery in 3–7 business days.",
  path: mylarBagSampleKit.path,
  keywords: [
    "mylar bag sample kit",
    "custom pouch samples",
    "flexible packaging sample kit",
    "stand up pouch samples",
    "printed pouch sample kit",
  ],
});

export default function MylarBagSampleKitPage() {
  return <SampleKitProductPage kit={mylarBagSampleKit} />;
}
