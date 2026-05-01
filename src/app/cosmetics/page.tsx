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

export const metadata: Metadata = {
  title: "Cosmetics Packaging Hub | UPG",
  description:
    "Explore skincare, serum, lipstick, perfume, PR box, and subscription-box packaging built around cosmetics-first buying journeys.",
  alternates: { canonical: "https://universalpackaginggroup.com/cosmetics" },
  openGraph: {
    type: "website",
    title: "Cosmetics Packaging Hub | UPG",
    description:
      "A cosmetics-first packaging hub for skincare, serum, lipstick, perfume, PR, and subscription launches.",
    url: "https://universalpackaginggroup.com/cosmetics",
  },
};

const productTypeRecs = [
  {
    type: "Skincare bottles & jars",
    structure: "Reverse tuck end carton",
    finish: "Soft-touch + foil or deboss",
  },
  {
    type: "Serums & droppers",
    structure: "Tall folding carton",
    finish: "Foil stamp + insert support",
  },
  {
    type: "Lipstick & lip products",
    structure: "Slim carton or premium set",
    finish: "Spot UV + foil",
  },
  {
    type: "Perfume bottles",
    structure: "Magnetic rigid box",
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
    ["Rigid", "Cartons", "Mailers"].includes(product.category)
  );

  return (
    <>
      <section className="bg-gradient-warm">
        <div className="container-editorial pt-12 pb-14 md:pt-16 md:pb-18">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="eyebrow mb-5">Cosmetics packaging hub</div>
              <h1 className="display-1 text-balance">
                Packaging for beauty brands that take presentation seriously.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Whether you are launching your first skincare SKU or scaling a
                hero serum, this hub is built around the structures, finishes,
                and insert systems cosmetics buyers actually need.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/get-a-quote"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
                >
                  Get a cosmetics quote
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
            title="Subcategories built for how beauty actually launches."
            intro="Each subcategory points to the packaging structures, finishes, and insert routes that make the most sense for that product family."
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
                  Not sure which cosmetic format fits best?
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
                  Get a Quote
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
              intro="This is a starting point for discussions, not a rigid rulebook."
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
              title="A capability set tuned to beauty."
              intro="The finishes and insert options here are the ones most likely to matter to cosmetic founders and product teams."
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
              eyebrow="Most-used by beauty"
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
        title="Quote your cosmetics packaging."
        intro="Tell us about the SKU, launch quantity, structure, and finish direction. We will come back with a practical next step."
      />
    </>
  );
}
