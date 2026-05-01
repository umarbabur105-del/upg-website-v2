import type { Metadata } from "next";
import Link from "next/link";
import { QuoteCta } from "@/components/quote-cta";
import { industries } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Industries We Serve | UPG",
  description:
    "UPG supports cosmetics, ecommerce, coffee and beverage, and selected specialty product categories with quote-led custom packaging.",
  alternates: { canonical: "https://universalpackaginggroup.com/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <section className="bg-gradient-warm">
        <div className="container-editorial pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-4xl">
            <div className="eyebrow mb-5">Industries</div>
            <h1 className="display-1 text-balance">
              Broad capability, with cosmetics as the strongest launch path.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              The site is built around cosmetics first because that is the
              clearest and strongest early positioning. But the product range and
              structure logic can still support adjacent industries from day one.
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
        title="Need help choosing the right category page for outreach?"
        intro="Cosmetics should be the strongest landing path, but the catalog still supports adjacent use cases. Start with a quote if you want us to point prospects to the right format."
      />
    </>
  );
}
