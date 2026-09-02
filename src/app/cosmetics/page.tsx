import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OrganicIntentBridge } from "@/components/organic-intent-bridge";
import { ProductCard } from "@/components/product-card";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import {
  cosmeticsPackagingScope,
  cosmeticsSubcategories,
  materialsHighlights,
  sampleHighlights,
} from "@/data/catalog";
import { products } from "@/data/products";
import { getOrganicIntentRoute } from "@/data/organic-intent-routes";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Cosmetic Boxes & Outer Packaging Manufacturer",
  description:
    "Custom cosmetic boxes and printed outer packaging for beauty products, including tuck cartons, magnetic boxes, PR mailers, and inserts. Worldwide delivery.",
  path: "/cosmetics",
  keywords: [
    "custom cosmetic boxes",
    "printed cosmetic cartons",
    "skincare boxes",
    "beauty outer packaging",
    "custom PR boxes",
  ],
});

const cosmeticsPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/cosmetics#webpage`,
      url: `${SITE_URL}/cosmetics`,
      name: "Custom Cosmetic Boxes & Beauty Packaging",
      description:
        "Custom printed outer packaging for beauty, skincare, cosmetics, fragrance, and personal-care brands worldwide.",
      dateModified: "2026-08-23",
      mainEntity: { "@id": `${SITE_URL}/cosmetics#services` },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/cosmetics#service`,
      name: "Custom cosmetic boxes and outer packaging manufacturing",
      serviceType: "Custom printed cosmetic boxes and secondary packaging",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Place", name: "Worldwide" },
      audience: {
        "@type": "BusinessAudience",
        audienceType:
          "Beauty, skincare, cosmetics, fragrance, and personal-care brands",
      },
      description:
        `${cosmeticsPackagingScope.included} ${cosmeticsPackagingScope.excluded}`,
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/cosmetics#services`,
      itemListElement: cosmeticsSubcategories.map((subcategory, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: subcategory.title,
        url: `${SITE_URL}/cosmetics/${subcategory.slug}`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Cosmetic Packaging",
          item: `${SITE_URL}/cosmetics`,
        },
      ],
    },
  ],
};

const cosmeticsBuyingPaths = [
  {
    title: "Lipstick outer boxes",
    href: "/cosmetics/lipstick-boxes",
    note: "Plan individual tuck cartons or premium presentation sets around the finished lip product.",
  },
  {
    title: "Serum outer boxes",
    href: "/cosmetics/serum-boxes",
    note: "Develop narrow tuck cartons or presentation boxes around bottles, droppers, and treatment sets.",
  },
  {
    title: "Influencer mailer boxes",
    href: "/applications/influencer-kits",
    note: "Build ear-lock corrugated mailers and inserts for creator seeding and launch campaigns.",
  },
  {
    title: "Custom tuck boxes",
    href: "/products/custom-tuck-boxes",
    note: "Review the parent carton family, approved materials, print options, finishes, and 250-unit planning MOQ.",
  },
] as const;

const cosmeticsIntentRoute = getOrganicIntentRoute("/cosmetics");

const productTypeRecs = [
  {
    type: "Outer boxes for skincare bottles & jars",
    structure: "Reverse tuck end box",
    finish: "Soft-touch + foil or deboss",
  },
  {
    type: "Outer boxes for serums & droppers",
    structure: "Tall tuck box",
    finish: "Foil stamp + insert support",
  },
  {
    type: "Outer boxes for lipstick & lip products",
    structure: "Slim carton or premium set",
    finish: "Spot UV + foil",
  },
  {
    type: "Outer boxes for perfume bottles",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cosmeticsPageSchema) }}
      />
      <section className="bg-background">
        <div className="container-editorial pt-12 pb-14 md:pt-16 md:pb-18">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="eyebrow mb-5">Custom printed outer packaging</div>
              <h1 className="display-1 text-balance">
                Custom cosmetic boxes and outer packaging for beauty products.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                UPG manufactures tuck boxes, magnetic presentation boxes,
                collapsible magnetic boxes, corrugated ear-lock mailers, PR kits,
                and inserts for skincare, serum, lipstick, and fragrance launches.
                Every box is developed around the customer&apos;s finished beauty
                product, quantity, finish, intended use, and delivery destination.
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

      {cosmeticsIntentRoute ? (
        <OrganicIntentBridge route={cosmeticsIntentRoute} />
      ) : null}

      <section className="section-shell">
        <div className="container-editorial grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-5">Quick answer</div>
            <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
              UPG manufactures the printed box around the cosmetic product.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/82">
              Beauty packaging can begin with a tuck carton for an individual
              retail product, a magnetic box for a premium set, or an ear-lock
              corrugated mailer for PR, creator, subscription, and ecommerce
              presentation. The final structure is reviewed from the finished
              product dimensions, quantity, artwork, intended use, and delivery
              destination.
            </p>
          </div>
          <aside className="surface-card p-6 md:p-8 lg:col-span-5">
            <div className="eyebrow mb-4">Start with these details</div>
            <ul className="space-y-4 text-sm leading-relaxed text-foreground/85">
              <li>Finished product dimensions and product count</li>
              <li>Required packaging quantity</li>
              <li>Retail, gifting, PR, subscription, or ecommerce use</li>
              <li>Artwork status, reference images, and delivery country</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="border-y border-border bg-cream">
        <div className="container-editorial grid gap-8 py-10 md:grid-cols-2 md:py-12">
          <div>
            <div className="eyebrow mb-3">What UPG manufactures</div>
            <h2 className="font-serif text-2xl text-foreground">
              The custom printed box around your beauty product.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {cosmeticsPackagingScope.included}
            </p>
          </div>
          <div>
            <div className="eyebrow mb-3">Outside this offer</div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {cosmeticsPackagingScope.excluded}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              <Link
                href="/products"
                className="border-b border-foreground/20 pb-0.5 text-sm text-foreground"
              >
                View approved product families →
              </Link>
              <Link
                href="/tools/packaging-format-finder"
                className="border-b border-foreground/20 pb-0.5 text-sm text-foreground"
              >
                Find a packaging format →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-10 pb-16 md:pt-14 md:pb-20">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Outer packaging by product type"
            title="Choose the box that surrounds the beauty product."
            intro="Each subcategory maps a beauty product to UPG's relevant tuck, magnetic, collapsible magnetic, or ear-lock mailer formats."
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
                  Start with the finished product dimensions, quantity, and
                  presentation goal. The Format Finder can identify the closest UPG
                  box family before the specification is locked.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/tools/packaging-format-finder"
                  className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
                >
                  Use the Format Finder
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
        <div className="container-editorial">
          <div className="mb-10 max-w-3xl">
            <SectionHeading
              eyebrow="Popular buying paths"
              title="Move from the beauty product to the right packaging brief."
              intro="Use the closest product or campaign path, then carry the selected structure into a project enquiry."
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {cosmeticsBuyingPaths.map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="surface-card group flex h-full flex-col p-6 hover:-translate-y-1 hover:shadow-card"
              >
                <h3 className="font-serif text-2xl text-foreground">
                  {path.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {path.note}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm text-foreground">
                  Review path{" "}
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
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
        title="Create the custom printed boxes for your cosmetics line."
        intro="Tell us about the finished beauty product, quantity, box structure, and finish direction. UPG will help define the outer-packaging specification, pricing, and production details."
      />
    </>
  );
}
