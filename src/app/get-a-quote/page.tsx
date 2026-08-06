import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote-form";
import { SectionHeading } from "@/components/section-heading";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Get a Custom Packaging Quote",
  description:
    "Start a worldwide custom packaging project for tuck boxes, corrugated mailers, magnetic boxes, collapsible magnetic boxes, or Mylar bags.",
  path: "/get-a-quote",
  keywords: [
    "custom packaging quote",
    "custom box quote",
    "corrugated box quote",
  ],
});

interface PageProps {
  searchParams: Promise<{ product?: string }>;
}

export default async function GetAQuotePage({ searchParams }: PageProps) {
  const { product } = await searchParams;

  return (
    <>
      <section className="bg-background">
        <div className="container-editorial pt-12 pb-8 md:pt-16 md:pb-10">
          <SectionHeading
            as="h1"
            eyebrow="Project enquiry"
            title="Tell us what you want to manufacture."
            intro="Start with the product family, quantity, intended use, destination, and contact details. Dimensions, artwork, and finish details can be added when available."
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
