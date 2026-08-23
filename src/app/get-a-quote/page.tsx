import type { Metadata } from "next";
import { QuoteForm, type QuoteFormPrefill } from "@/components/quote-form";
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
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function GetAQuotePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const readParam = (key: string) => {
    const value = params[key];
    return (Array.isArray(value) ? value[0] : value)?.slice(0, 500);
  };
  const prefill: QuoteFormPrefill = {
    productFamily: readParam("product"),
    productStyle: readParam("style"),
    quantity: readParam("quantity"),
    intendedEndUse: readParam("use"),
    shippingCountry: readParam("destination"),
    dimensions: readParam("dimensions"),
    materialPreference: readParam("material"),
    finishPreference: readParam("finishes"),
    artworkStatus: readParam("artwork"),
    notes: readParam("preflight_note") ?? readParam("builder_note"),
  };

  return (
    <>
      <section className="bg-background">
        <div className="container-editorial pt-9 pb-5 md:pt-11 md:pb-6">
          <SectionHeading
            as="h1"
            eyebrow="Custom packaging quote"
            title="Get a custom packaging quote."
            intro="Product family, quantity, and contact details are enough to start. Technical specifications can follow."
            className="mx-auto max-w-4xl text-center"
            headingClassName="text-4xl font-light tracking-[-0.03em] text-balance sm:text-5xl"
          />
        </div>
      </section>

      <section className="pt-4 pb-16 md:pt-5 md:pb-20">
        <div className="container-editorial">
          <QuoteForm prefill={prefill} />
        </div>
      </section>
    </>
  );
}
