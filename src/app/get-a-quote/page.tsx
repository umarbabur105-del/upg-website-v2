import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote-form";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Get a Packaging Quote | UPG",
  description:
    "Request a quote for rigid boxes, folding cartons, mailers, mylar pouches, or paper cups. We respond with a structured next step.",
  alternates: { canonical: "https://universalpackaginggroup.com/get-a-quote" },
  openGraph: {
    type: "website",
    title: "Get a Packaging Quote | UPG",
    description:
      "Tell us about the product, quantity, and finish direction. We will come back with a structured quote response.",
    url: "https://universalpackaginggroup.com/get-a-quote",
  },
};

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
            eyebrow="Get a quote"
            title="Tell us about your packaging project."
            intro="Fast start: product family, quantity, contact details, and a short note are enough. Shipping, artwork, and finish details can be added if you already have them."
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
