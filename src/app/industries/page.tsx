import type { Metadata } from "next";
import Link from "next/link";
import { QuoteCta } from "@/components/quote-cta";
import { industryGuides } from "@/data/industry-guides";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Industries We Serve",
  description:
    "Browse custom packaging guides for cereal, supplements, soap, candles, retail, apparel, jewelry, electronics, food, beverage, gifting, and cosmetics.",
  path: "/industries",
  keywords: [
    "custom packaging by industry",
    "custom product packaging",
    "custom retail boxes",
    "custom food pouches",
  ],
});

export default function IndustriesPage() {
  return (
    <>
      <section className="bg-background">
        <div className="container-editorial pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-4xl">
            <div className="eyebrow mb-5">Industries</div>
            <h1 className="display-1 text-balance">
              Custom packaging made for your product and its market.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Explore buyer-focused guides across UPG&apos;s five approved product
              families. Every page leads back to a real packaging format, clear
              project inputs, and a human-reviewed quote.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial">
          <div className="mb-6 surface-card p-7 md:p-9">
            <div className="eyebrow mb-3">Dedicated category hub</div>
            <h2 className="font-serif text-3xl text-foreground">
              Cosmetic boxes and outer packaging
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Explore the established beauty cluster for skincare, serum, cream,
              lipstick, mascara, perfume, PR kits, and cosmetic subscription boxes.
            </p>
            <Link
              href="/cosmetics"
              className="mt-6 inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
            >
              Browse cosmetic packaging guides <span>→</span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industryGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/industries/${guide.slug}`}
                className="surface-card group flex min-h-72 flex-col p-7 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="eyebrow mb-3">Application guide</div>
                <h2 className="font-serif text-2xl text-foreground">
                  {guide.shortName}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {guide.metaDescription}
                </p>
                <div className="mt-auto pt-6 text-xs text-muted-foreground">
                  Primary family: {guide.primaryFamily}
                </div>
                <span className="mt-3 text-sm text-foreground">
                  Read guide <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuoteCta
        title="Not sure which packaging format fits your product?"
        intro="Tell us the product, intended use, quantity, and destination. We will review the requirements and recommend the right structure."
      />
    </>
  );
}
