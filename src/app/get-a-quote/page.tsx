import type { Metadata } from "next";
import { Section, SectionHeading, SectionSubheading } from "@/components/section";
import { QuoteForm } from "@/components/quote-form";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Request a custom packaging quote for boxes, mylar bags, or paper cups. Response targeted within 24 hours.",
  alternates: { canonical: "https://universalpackaginggroup.com/get-a-quote" },
  openGraph: {
    type: "website",
    title: "Get a Quote | UPG",
    description:
      "Request a custom packaging quote for boxes, mylar bags, or paper cups. Response targeted within 24 hours.",
    url: "https://universalpackaginggroup.com/get-a-quote",
  },
};

export default function GetAQuotePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-olive px-6 pt-32 pb-16 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading className="text-offwhite">
            Get a Quote
          </SectionHeading>
          <SectionSubheading className="text-offwhite/60">
            Tell us what you need and where it is shipping. We review structure,
            printing, quantity, and end use before sending pricing.
          </SectionSubheading>
        </div>
      </section>

      {/* Form */}
      <Section variant="surface">
        <div className="mx-auto max-w-3xl">
          <QuoteForm />
        </div>
      </Section>
    </>
  );
}
