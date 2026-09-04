import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/data/products";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Packaging Boxes, Mailers & Mylar Bags",
  description:
    "Compare custom printed boxes, corrugated mailers, magnetic rigid boxes, and Mylar pouches. 250-unit planning MOQ with worldwide delivery.",
  path: "/products",
  keywords: [
    "custom packaging products",
    "custom packaging boxes",
    "custom boxes",
    "custom printed boxes",
    "custom product boxes",
    "custom printed packaging",
  ],
});

const PRODUCTS_REVIEWED_AT = "2026-09-04";

const productsCollectionSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/products#collection`,
      url: `${SITE_URL}/products`,
      name: "Custom Packaging Boxes, Mailers, and Mylar Bags",
      description:
        "Five made-to-spec custom packaging families covering printed boxes, corrugated mailers, magnetic rigid boxes, and Mylar bags and pouches.",
      dateModified: PRODUCTS_REVIEWED_AT,
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

const formatDecisionRows = [
  {
    name: "Custom tuck boxes",
    structure: "Printed folding carton",
    description:
      "Choose for individual retail products, cosmetics, supplements, soap, food cartons, and other secondary packaging.",
    href: "/products/custom-tuck-boxes",
  },
  {
    name: "Custom mailer boxes",
    structure: "Corrugated ear-lock mailer",
    description:
      "Choose for PR kits, subscription programs, ecommerce presentation, influencer mailers, and product launches.",
    href: "/products/custom-mailer-boxes",
  },
  {
    name: "Custom magnetic boxes",
    structure: "Assembled rigid presentation box",
    description:
      "Choose when a premium gift, beauty, apparel, electronics, or launch set needs an assembled rigid structure.",
    href: "/products/custom-magnetic-boxes",
  },
  {
    name: "Collapsible magnetic boxes",
    structure: "Fold-flat rigid presentation box",
    description:
      "Compare this route when premium presentation is required with a structure that ships or stores flat before assembly.",
    href: "/products/custom-collapsible-magnetic-boxes",
  },
  {
    name: "Custom Mylar bags and printed pouches",
    structure: "Flexible packaging",
    description:
      "Choose for finished stand-up, flat-bottom, three-side-seal, spout, coffee, or child-resistant bags, or review printed rollstock separately.",
    href: "/products/custom-mylar-bags",
  },
] as const;

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
            <h1 className="display-1 text-balance">
              Compare custom packaging boxes and Mylar bags.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              Review custom printed tuck boxes, corrugated ear-lock mailers,
              magnetic rigid boxes, collapsible magnetic boxes, and custom
              Mylar bags and pouches. Every project is reviewed around the
              structure, dimensions, material, print, finish, quantity,
              intended use, and delivery destination.
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

      <section
        id="packaging-format-decisions"
        className="border-y border-border bg-cream py-16 md:py-20"
      >
        <div className="container-editorial">
          <div className="mb-10 max-w-4xl">
            <SectionHeading
              eyebrow="Custom boxes by format"
              title="Match the packaging structure to the product and program."
              intro="The same artwork can require a different physical format depending on the product, packing method, presentation, order quantity, and delivery plan. Start with the closest construction, then confirm the specification with UPG."
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {formatDecisionRows.map((item) => (
              <article key={item.href} className="surface-card flex h-full flex-col p-6">
                <div className="eyebrow mb-3">{item.structure}</div>
                <h3 className="font-serif text-2xl leading-tight text-foreground">
                  {item.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex w-fit border-b border-foreground/20 pb-0.5 text-sm font-semibold text-foreground"
                >
                  Review this format →
                </Link>
              </article>
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
            </div>
          </div>
        </div>
      </section>

      <QuoteCta />
    </>
  );
}
