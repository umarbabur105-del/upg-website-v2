import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import {
  cosmeticsSubcategories,
  materialsHighlights,
  sampleHighlights,
} from "@/data/catalog";
import { products } from "@/data/products";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Cosmetic Packaging for Beauty Brands",
  description:
    "Custom cosmetic packaging manufactured for skincare, serum, lipstick, perfume, PR kits, and subscription launches with worldwide delivery.",
  path: "/cosmetics",
  keywords: [
    "cosmetic packaging boxes",
    "skincare packaging boxes",
    "beauty product packaging",
    "custom PR boxes",
  ],
});

const cosmeticsServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/cosmetics#service`,
  name: "Custom cosmetic packaging manufacturing",
  serviceType: "Custom cosmetic packaging",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "Place", name: "Worldwide" },
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Beauty, skincare, cosmetics, fragrance, and personal-care brands",
  },
  description:
    "Custom manufacturing, proofing, and worldwide delivery for cosmetic tuck boxes, magnetic boxes, corrugated mailers, PR kits, and inserts.",
};

const productTypeRecs = [
  {
    type: "Skincare bottles & jars",
    structure: "Reverse tuck end box",
    finish: "Soft-touch + foil or deboss",
  },
  {
    type: "Serums & droppers",
    structure: "Tall tuck box",
    finish: "Foil stamp + insert support",
  },
  {
    type: "Lipstick & lip products",
    structure: "Slim carton or premium set",
    finish: "Spot UV + foil",
  },
  {
    type: "Perfume bottles",
    structure: "Magnetic box",
    finish: "Wrap stock + emboss or foil",
  },
  {
    type: "PR & influencer kits",
    structure: "Rigid or premium mailer",
    finish: "Soft-touch + interior print",
  },
];

export default function CosmeticsPage() {
  const cosmeticFriendlyProducts = products.filter((product) =>
    ["Tuck Boxes", "Rigid Boxes", "Corrugated Mailers"].includes(product.category)
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cosmeticsServiceSchema) }}
      />
      <section className="bg-gradient-warm">
        <div className="container-editorial pt-12 pb-14 md:pt-16 md:pb-18">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="eyebrow mb-5">Custom cosmetic packaging</div>
              <h1 className="display-1 text-balance">
                Cosmetic packaging built around the product inside.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Create tuck boxes, magnetic presentation boxes, corrugated mailers, PR
                kits, and inserts for skincare, serum, lipstick, and fragrance
                launches. Every project is developed around the product, quantity,
                finish, intended use, and delivery destination.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/get-a-quote"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
                >
                  Start Your Cosmetics Project
                </Link>
                <Link
                  href="/samples"
                  className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
                >
                  See sample directions
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[5/4] overflow-hidden shadow-lift">
                <Image
                  src="/images/redesign/hero/cosmetics-hub.jpg"
                  alt="Cosmetics packaging hero"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-10 pb-16 md:pt-14 md:pb-20">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="By product type"
            title="Packaging by beauty product type."
            intro="Each subcategory outlines packaging structures, finishes, and insert options that can be evaluated for that product family."
          />
          <div className="mt-12 grid auto-rows-fr gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {cosmeticsSubcategories.map((subcategory) => (
              <Link
                key={subcategory.slug}
                href={`/cosmetics/${subcategory.slug}`}
                className="group block h-full bg-surface p-8 hover:bg-cream"
              >
                <h3 className="font-serif text-2xl text-foreground">
                  {subcategory.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {subcategory.intro}
                </p>
                <div className="mt-6 inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground">
                  Explore <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
            <div className="flex h-full flex-col justify-between bg-stone p-8 lg:col-span-2">
              <div>
                <div className="eyebrow mb-4">Need guidance?</div>
                <h3 className="font-serif text-2xl text-foreground">
                  Not sure which cosmetic format is right?
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Start with your SKU, quantity, and packaging goal. We can help
                  you choose the right structure before the spec is fully locked.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/get-a-quote"
                  className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
                >
                  Start Your Project
                </Link>
                <Link
                  href="/products"
                  className="rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground hover:bg-cream"
                >
                  View all products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Recommendations"
              title="Structures matched to product type."
              intro="These are starting recommendations. Final structure depends on product dimensions, quantity, intended use, and presentation requirements."
            />
          </div>
          <div className="lg:col-span-8">
            <div className="border-t border-border">
              {productTypeRecs.map((row) => (
                <div
                  key={row.type}
                  className="grid grid-cols-12 gap-4 border-b border-border py-6"
                >
                  <div className="col-span-12 font-serif text-lg text-foreground md:col-span-4">
                    {row.type}
                  </div>
                  <div className="col-span-12 text-sm text-muted-foreground md:col-span-4">
                    {row.structure}
                  </div>
                  <div className="col-span-12 text-sm text-muted-foreground md:col-span-4">
                    {row.finish}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden shadow-soft">
            <Image
              src={sampleHighlights[1].image}
              alt={sampleHighlights[1].title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Materials & finishes"
              title="Materials, finishes, and inserts for beauty packaging."
              intro="Available options depend on the selected structure, material, quantity, and artwork requirements."
            />
            <ul className="mt-8 space-y-3">
              {materialsHighlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-foreground">
                  <span className="mt-1 text-gold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/materials-finishes"
              className="mt-8 inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
            >
              Full materials & finishes <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Beauty packaging formats"
              title="Cosmetic-friendly product families."
            />
            <Link
              href="/products"
              className="inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
            >
              All products <span>→</span>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cosmeticFriendlyProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <QuoteCta
        title="Create custom packaging for your cosmetics line."
        intro="Tell us about the SKU, quantity, structure, and finish direction. We will help define the specification, pricing, and production details."
      />
    </>
  );
}
