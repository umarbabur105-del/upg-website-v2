import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/data/products";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Packaging Products | Boxes, Mailers & Mylar",
  description:
    "Compare custom tuck boxes, corrugated mailers, magnetic and collapsible magnetic boxes, plus printed Mylar bags. Worldwide made-to-spec manufacturing.",
  path: "/products",
  keywords: [
    "custom packaging products",
    "custom packaging boxes",
    "custom printed packaging",
  ],
});

const productsCollectionSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/products#collection`,
      url: `${SITE_URL}/products`,
      name: "Custom Packaging Products",
      description:
        "Five made-to-spec custom packaging product families manufactured for brands worldwide.",
      dateModified: "2026-08-23",
      mainEntity: { "@id": `${SITE_URL}/products#core-product-catalog` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/products#core-product-catalog`,
      name: "UPG core packaging products",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          "@id": `${SITE_URL}/products/${product.slug}#service`,
          name: product.name,
          description: product.summary,
          url: `${SITE_URL}/products/${product.slug}`,
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: "Worldwide",
        },
      })),
    },
  ],
};

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsCollectionSchema) }}
      />
      <section className="bg-background">
        <div className="container-editorial pt-12 pb-8 md:pt-16 md:pb-10">
          <div className="max-w-4xl">
            <div className="eyebrow mb-5">Five core product families</div>
            <h1 className="display-1 text-balance">Custom packaging manufactured around the product.</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              Compare custom tuck boxes, corrugated ear-lock mailers, magnetic
              boxes, collapsible magnetic boxes, and Mylar bags. Every project
              is reviewed around the structure, dimensions, material, print,
              finish, quantity, intended use, and delivery destination.
            </p>
          </div>
        </div>
      </section>

      <section id="core-product-catalog" className="section-shell scroll-mt-28">
        <div className="container-editorial">
          <div className="mb-10 max-w-4xl">
            <SectionHeading
              eyebrow="Core manufacturing routes"
              title="Choose the physical packaging format first."
              intro="Each product page separates the available structure from adjacent searches, shows the planning minimum, and connects the project to the relevant style, application, comparison, sample, or enquiry path."
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

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
                href="/packaging-styles"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
              >
                Browse Packaging Styles
              </Link>
              <Link
                href="/tools/packaging-format-finder"
                className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
              >
                Find the Right Format
              </Link>
              <Link
                href="/compare"
                className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
              >
                Compare Packaging Formats
              </Link>
              <Link
                href="/get-a-quote"
                className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
              >
                Start Your Project
              </Link>
              <Link
                href="/cosmetics"
                className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
              >
                Explore cosmetics
              </Link>
              <Link
                href="/get-a-quote"
                className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
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
