import { sampleKits } from "@/data/sample-kit";
import { siteConfig } from "@/data/site";
import { discoveryTextResponse } from "@/lib/discovery-response";

export const dynamic = "force-static";

function tsvValue(value: string) {
  return value.replaceAll("\t", " ").replaceAll("\r", " ").replaceAll("\n", " ");
}

export function GET() {
  const header = [
    "id",
    "title",
    "description",
    "link",
    "image_link",
    "availability",
    "price",
    "brand",
    "condition",
    "identifier_exists",
    "is_bundle",
    "product_type",
    "custom_label_0",
  ];
  const rows = sampleKits.map((kit) => [
    kit.merchantId,
    kit.name,
    `${kit.description} ${kit.selectionNote} ${kit.productBoundary}`,
    `${kit.url}?utm_source=google&utm_medium=organic_shopping&utm_campaign=merchant_free_listings`,
    `${siteConfig.url}${kit.image}`,
    kit.availability,
    `${kit.price.toFixed(2)} ${kit.currency}`,
    siteConfig.shortName,
    kit.condition,
    "no",
    "yes",
    kit.merchantProductType,
    kit.merchantLabel,
  ]);

  const body = [header, ...rows]
    .map((values) => values.map((value) => tsvValue(value)).join("\t"))
    .join("\n");

  return discoveryTextResponse(`${body}\n`, "text/tab-separated-values");
}
