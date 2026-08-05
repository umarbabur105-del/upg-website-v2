import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import {
  cosmeticsSubcategories,
  getCosmeticsSubcategoryBySlug,
} from "@/data/catalog";
import { getProductBySlug } from "@/data/products";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return cosmeticsSubcategories.map((subcategory) => ({
    slug: subcategory.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const subcategory = getCosmeticsSubcategoryBySlug(slug);

  if (!subcategory) return {};

  const title = `Custom ${subcategory.title}`;
  const description = subcategory.heroDescription;
  return createPageMetadata({
    title,
    description,
    path: `/cosmetics/${slug}`,
    keywords: [
      subcategory.title,
      `${subcategory.title.toLowerCase()} manufacturer`,
      `${subcategory.title.toLowerCase()} custom packaging`,
    ],
  });
}

export default async function CosmeticSubcategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const subcategory = getCosmeticsSubcategoryBySlug(slug);

  if (!subcategory) {
    notFound();
  }

  const recommendedProducts = subcategory.recommended
    .map((item) => ({
      ...item,
      product: getProductBySlug(item.productSlug),
    }))
    .filter((item) => item.product);

  const pageUrl = `${SITE_URL}/cosmetics/${slug}`;
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `Custom ${subcategory.title}`,
        description: subcategory.heroDescription,
        url: pageUrl,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "Worldwide",
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
          {
            "@type": "ListItem",
            position: 3,
            name: subcategory.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <section className="bg-gradient-warm">
        <div className="container-editorial pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-4xl">
            <div className="eyebrow mb-5">Cosmetics subcategory</div>
            <h1 className="display-1 text-balance">{subcategory.heroTitle}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {subcategory.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/get-a-quote"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
              >
                Start Your Project
              </Link>
              <Link
                href="/cosmetics"
                className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
              >
                Back to cosmetics hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Recommended structures"
              title={`Recommended packaging for ${subcategory.title.toLowerCase()}.`}
              intro={subcategory.intro}
            />
          </div>
          <div className="grid gap-6 lg:col-span-8 md:grid-cols-2">
            {recommendedProducts.map((item) =>
              item.product ? (
                <div key={item.product.slug} className="surface-card p-6">
                  <div className="eyebrow mb-3">Recommended option</div>
                  <h3 className="font-serif text-2xl text-foreground">
                    {item.product.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.note}
                  </p>
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="mt-5 inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
                  >
                    View product <span>→</span>
                  </Link>
                </div>
              ) : null
            )}
          </div>
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Spec guidance"
              title="Materials, finishes, and inserts to think through."
            />
          </div>
          <div className="grid gap-6 lg:col-span-8 md:grid-cols-3">
            <div className="surface-card p-6">
              <div className="eyebrow mb-4">Materials</div>
              <ul className="space-y-3 text-sm text-foreground/82">
                {subcategory.materials.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="surface-card p-6">
              <div className="eyebrow mb-4">Finishes</div>
              <ul className="space-y-3 text-sm text-foreground/82">
                {subcategory.finishes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="surface-card p-6">
              <div className="eyebrow mb-4">Inserts</div>
              <ul className="space-y-3 text-sm text-foreground/82">
                {subcategory.inserts.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Common applications"
              title="Common product applications."
            />
          </div>
          <div className="grid gap-4 lg:col-span-8 sm:grid-cols-2">
            {subcategory.idealFor.map((item) => (
              <div key={item} className="surface-card p-5 text-sm text-foreground">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone">
        <div className="container-editorial grid gap-6 md:grid-cols-3">
          <div className="surface-card p-6">
            <div className="eyebrow mb-3">MOQ note</div>
            <p className="text-sm leading-relaxed text-foreground/82">
              {subcategory.moqNote}
            </p>
          </div>
          <div className="surface-card p-6">
            <div className="eyebrow mb-3">Lead time note</div>
            <p className="text-sm leading-relaxed text-foreground/82">
              {subcategory.leadTimeNote}
            </p>
          </div>
          <div className="surface-card p-6">
            <div className="eyebrow mb-3">Artwork note</div>
            <p className="text-sm leading-relaxed text-foreground/82">
              {subcategory.artworkNote}
            </p>
          </div>
        </div>
      </section>

      {recommendedProducts.length > 0 ? (
        <section className="section-shell">
          <div className="container-editorial">
            <div className="mb-10">
              <SectionHeading
                eyebrow="Related products"
                title="Start with the structure, then shape the finish."
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {recommendedProducts.map((item) =>
                item.product ? (
                  <ProductCard key={item.product.slug} product={item.product} />
                ) : null
              )}
            </div>
          </div>
        </section>
      ) : null}

      <QuoteCta
        title={`Ready to create ${subcategory.title.toLowerCase()}?`}
        intro="Tell us the SKU, quantity, and finish direction. We will help define the structure, specification, pricing, and production details."
      />
    </>
  );
}
