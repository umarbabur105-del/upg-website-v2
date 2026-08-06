import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/data/products";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Boxes & Flexible Packaging Products",
  description:
    "Compare custom tuck boxes, corrugated mailer boxes, magnetic boxes, collapsible magnetic boxes, and Mylar bags with planning MOQs based on product and size.",
  path: "/products",
  keywords: [
    "custom packaging products",
    "custom packaging boxes",
    "custom printed packaging",
  ],
});

const groups = [
  {
    label: "Tuck & rigid boxes",
    categories: ["Tuck Boxes", "Rigid Boxes"] as const,
  },
  {
    label: "Corrugated mailers & flexible packaging",
    categories: ["Corrugated Mailers", "Flexible Packaging"] as const,
  },
];

export default function ProductsPage() {
  return (
    <>
      <section className="bg-background">
        <div className="container-editorial pt-12 pb-8 md:pt-16 md:pb-10">
          <div className="max-w-4xl">
            <div className="eyebrow mb-5">The catalog</div>
            <h1 className="display-1 text-balance">Custom packaging formats for product brands.</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              Compare tuck boxes, magnetic presentation boxes, corrugated
              mailer boxes, collapsible magnetic boxes, and Mylar bags. Every
              project is manufactured around the required structure, material,
              intended use, quantity, and destination.
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
                  intro="Choose a starting format, then confirm the structure, specifications, artwork, and production fit with our team."
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
              intro="If you are deciding between tuck boxes, corrugated mailers, magnetic boxes, or flexible packaging, share your product details and we will recommend the right format."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/cosmetics"
                className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
              >
                Explore cosmetics
              </Link>
              <Link
                href="/get-a-quote"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <QuoteCta />
    </>
  );
}
