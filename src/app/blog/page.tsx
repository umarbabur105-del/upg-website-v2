import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBanner } from "@/components/cta-banner";
import { blogCategories, blogPosts } from "@/data/blog-posts";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Packaging Guides & Buyer Resources",
  description:
    "Visual custom packaging guides for quotes, dimensions, MOQ, artwork, proofs, print color, finishes, structures, packing, and production planning.",
  path: "/blog",
  keywords: [
    "custom packaging guide",
    "custom packaging buyer guide",
    "custom box planning",
  ],
});

const categoryDetails = {
  "Project Planning": {
    number: "01",
    summary: "Build a clear brief, quantity, measurement, and approval path.",
  },
  "Structure & Delivery": {
    number: "02",
    summary: "Compare presentation structures and real packing assumptions.",
  },
  "Artwork & Print": {
    number: "03",
    summary: "Prepare artwork, color, proof, and production callouts.",
  },
  "Materials & Finishes": {
    number: "04",
    summary: "Choose surfaces and accents by the job they need to do.",
  },
} as const;

function categoryId(category: string) {
  return category.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-");
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/blog#page`,
      name: "UPG Custom Packaging Guides",
      url: `${SITE_URL}/blog`,
      description:
        "Buyer-first guides for custom packaging planning, structures, artwork, print, materials, finishes, packing, and production.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      mainEntity: { "@id": `${SITE_URL}/blog#guides` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/blog#guides`,
      name: "Custom packaging buyer guides",
      numberOfItems: blogPosts.length,
      itemListElement: blogPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: `${SITE_URL}/blog/${post.slug}`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Packaging Guides",
          item: `${SITE_URL}/blog`,
        },
      ],
    },
  ],
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="overflow-hidden bg-olive px-6 pt-28 pb-16 lg:px-8 lg:pt-32 lg:pb-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-offwhite/90">
              Buyer resource center
            </span>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-offwhite md:text-5xl lg:text-6xl">
              Packaging decisions, made easier to understand.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-offwhite/72">
              Ten visual guides for the questions that come before a useful
              custom packaging quote: format, fit, MOQ, artwork, proofing,
              color, finish, packing, and production.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-xs text-offwhite/70">
              <span className="border border-offwhite/20 px-4 py-2">10 guides</span>
              <span className="border border-offwhite/20 px-4 py-2">250-unit planning MOQ</span>
              <span className="border border-offwhite/20 px-4 py-2">Human-reviewed decisions</span>
            </div>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden lg:col-span-6">
            <Image
              src="/images/redesign/hero/materials-hero.jpg"
              alt="Custom packaging materials, print surfaces, and finishes"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent" />
            <p className="absolute right-4 bottom-4 left-4 text-xs leading-relaxed text-offwhite/82">
              Representative packaging concepts and capability references, not customer work.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-charcoal/8 bg-cream px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {blogCategories.map((category) => (
              <Link
                key={category}
                href={`#${categoryId(category)}`}
                className="group border border-charcoal/10 bg-surface p-5 transition hover:-translate-y-0.5 hover:border-gold/55 hover:shadow-card"
              >
                <span className="font-serif text-3xl text-gold">
                  {categoryDetails[category].number}
                </span>
                <h2 className="mt-5 font-serif text-xl font-semibold text-charcoal">
                  {category}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/62">
                  {categoryDetails[category].summary}
                </p>
                <span className="mt-5 inline-flex text-sm font-semibold text-gold-dark">
                  Explore guides ↓
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl space-y-20">
          {blogCategories.map((category) => {
            const categoryPosts = blogPosts.filter(
              (post) => post.category === category
            );

            return (
              <section key={category} id={categoryId(category)} className="scroll-mt-28">
                <div className="grid gap-6 border-b border-charcoal/10 pb-7 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-gold">
                      {categoryDetails[category].number} · {categoryPosts.length} guide{categoryPosts.length === 1 ? "" : "s"}
                    </div>
                    <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal md:text-4xl">
                      {category}
                    </h2>
                  </div>
                  <p className="max-w-md text-sm leading-relaxed text-charcoal/62 md:text-right">
                    {categoryDetails[category].summary}
                  </p>
                </div>

                <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                  {categoryPosts.map((post) => (
                    <article
                      key={post.slug}
                      className="group flex flex-col overflow-hidden border border-charcoal/10 bg-cream transition hover:-translate-y-0.5 hover:shadow-card"
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        aria-label={`Read ${post.title}`}
                        className="relative aspect-[16/10] overflow-hidden"
                      >
                        <Image
                          src={post.heroImage}
                          alt={post.heroAlt}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.025]"
                          style={{ objectPosition: post.heroPosition }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col p-7">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-widest text-gold-dark">
                          <span>{post.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="mt-4 font-serif text-2xl font-semibold leading-snug text-charcoal">
                          <Link href={`/blog/${post.slug}`} className="hover:text-gold-dark">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="mt-4 flex-1 text-sm leading-relaxed text-charcoal/64">
                          {post.excerpt}
                        </p>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark"
                        >
                          Open buyer guide <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="border-t border-charcoal/8 bg-cream px-6 py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold uppercase tracking-widest text-gold">
              Continue with a commercial source
            </div>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal">
              Move from learning to a clearer packaging brief.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-charcoal/65">
              Guides explain the decision. Product, comparison, pricing, and
              quote pages carry the current UPG scope and project handoff.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <Link href="/products" className="rounded-full border border-charcoal/15 bg-surface px-5 py-3 text-sm font-semibold text-charcoal hover:border-gold">
              Browse products
            </Link>
            <Link href="/compare" className="rounded-full border border-charcoal/15 bg-surface px-5 py-3 text-sm font-semibold text-charcoal hover:border-gold">
              Compare formats
            </Link>
            <Link href="/custom-packaging-pricing" className="rounded-full border border-charcoal/15 bg-surface px-5 py-3 text-sm font-semibold text-charcoal hover:border-gold">
              Pricing &amp; MOQ
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Ready to start your packaging project?"
        description="Send what you know. UPG targets an initial response within one business day and confirms pricing after the required specifications are clear."
        ctaText="Start Your Project"
        ctaHref="/get-a-quote"
      />
    </>
  );
}
