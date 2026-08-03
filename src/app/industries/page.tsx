import type { Metadata } from "next";
import Link from "next/link";
import { QuoteCta } from "@/components/quote-cta";
import { industries } from "@/data/catalog";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Industries We Serve",
  description:
    "UPG focuses on custom beauty and cosmetic packaging, with reviewed packaging routes for ecommerce, specialty products, coffee, and beverage brands.",
  path: "/industries",
  keywords: ["cosmetic packaging supplier", "ecommerce packaging", "beauty packaging"],
});

export default function IndustriesPage() {
  return (
    <>
      <section className="bg-gradient-warm">
        <div className="container-editorial pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-4xl">
            <div className="eyebrow mb-5">Industries</div>
            <h1 className="display-1 text-balance">
              Packaging routes shaped around the product and its market.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Cosmetics and beauty are our primary focus. Adjacent categories are
              reviewed against the product, intended use, material requirements,
              quantity, and delivery destination before a route is recommended.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial">
          <div className="grid gap-6 md:grid-cols-2">
            {industries.map((industry) => (
              <div key={industry.slug} className="surface-card p-7">
                <div className="eyebrow mb-3">
                  {industry.slug === "cosmetic-packaging" ? "Primary focus" : "Industry"}
                </div>
                <h2 className="font-serif text-2xl text-foreground">
                  {industry.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {industry.description}
                </p>
                <div className="mt-6">
                  <Link
                    href={industry.slug === "cosmetic-packaging" ? "/cosmetics" : "/products"}
                    className="inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
                  >
                    Explore <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteCta
        title="Not sure which packaging route fits your product?"
        intro="Tell us the product, intended use, quantity, and destination. We will review the structure and documentation needs before recommending a route."
      />
    </>
  );
}
