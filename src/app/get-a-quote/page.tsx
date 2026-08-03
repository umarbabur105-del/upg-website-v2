import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote-form";
import { SectionHeading } from "@/components/section-heading";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Get a Custom Packaging Quote",
  description:
    "Request a custom packaging quote for folding cartons, rigid boxes, mailers, inserts, pouches, or paper cups for delivery in the US or Canada.",
  path: "/get-a-quote",
  keywords: [
    "custom packaging quote",
    "cosmetic packaging quote",
    "custom box quote",
  ],
});

interface PageProps {
  searchParams: Promise<{ product?: string }>;
}

export default async function GetAQuotePage({ searchParams }: PageProps) {
  const { product } = await searchParams;

  return (
    <>
      <section className="bg-gradient-warm">
        <div className="container-editorial pt-12 pb-8 md:pt-16 md:pb-10">
          <SectionHeading
            as="h1"
            eyebrow="Get a quote"
            title="Tell us about your packaging project."
            intro="Start with the product family, quantity, intended use, delivery country, and contact details. Dimensions, artwork, and finish details can be added when available."
            className="max-w-4xl"
          />
        </div>
      </section>

      <section className="pt-6 pb-16 md:pt-8 md:pb-20">
        <div className="container-editorial">
          <QuoteForm preselectedFamily={product} />
        </div>
      </section>
    </>
  );
}
