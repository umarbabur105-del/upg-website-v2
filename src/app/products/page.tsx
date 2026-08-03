import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/data/products";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Packaging Products",
  description:
    "Compare custom folding cartons, rigid boxes, mailer boxes, mylar pouches, and paper cups. MOQ, timing, and material paths are confirmed after specification review.",
  path: "/products",
  keywords: [
    "custom packaging products",
    "custom packaging boxes",
    "custom printed packaging",
  ],
});

const groups = [
  {
    label: "Cartons & rigid",
    categories: ["Cartons", "Rigid"] as const,
  },
  {
    label: "Mailers & flexible",
    categories: ["Mailers", "Flexible"] as const,
  },
  {
    label: "Foodservice",
    categories: ["Foodservice"] as const,
  },
];

export default function ProductsPage() {
  return (
    <>
      <section className="bg-gradient-warm">
        <div className="container-editorial pt-12 pb-8 md:pt-16 md:pb-10">
          <div className="max-w-4xl">
            <div className="eyebrow mb-5">The catalog</div>
            <h1 className="display-1 text-balance">Custom packaging formats for product brands.</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              Compare cartons, rigid presentations, ecommerce mailers, flexible
              pouches, and paper cups. Beauty packaging is our primary focus;
              every project is reviewed for structure, material, intended use,
              quantity, and destination before MOQ or timing is confirmed.
            </p>
          </div>
        </div>
      </section>

      {groups.map((group) => {
        const groupProducts = products.filter((product) =>
          group.categories.some((category) => category === product.category)
        );

        return (
          <section
            key={group.label}
            className="py-12 first:pt-10 first:pb-16 md:py-16 md:first:pt-14 md:first:pb-20"
          >
            <div className="container-editorial">
              <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
                <SectionHeading
                  eyebrow="Product group"
                  title={group.label}
                  intro="Choose a starting format, then use the quote process to confirm structure, specifications, and production fit."
                />
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {groupProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="pb-24">
        <div className="container-editorial">
          <div className="surface-card p-10 md:p-14">
            <SectionHeading
              eyebrow="Need a recommendation?"
              title="Not sure which structure is right?"
              intro="If you are deciding between cartons, rigid boxes, mailers, or a more premium kit presentation, start with a quote request and we will point you to the right path."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/cosmetics"
                className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
              >
                Start with cosmetics
              </Link>
              <Link
                href="/get-a-quote"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <QuoteCta />
    </>
  );
}
