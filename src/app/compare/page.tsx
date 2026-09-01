import type { Metadata } from "next";
import Link from "next/link";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { comparisonGuides } from "@/data/comparison-guides";
import { SITE_URL, createPageMetadata } from "@/lib/seo";

const pagePath = "/compare";
const pageUrl = `${SITE_URL}${pagePath}`;

export const metadata: Metadata = createPageMetadata({
  title: "Custom Packaging Comparison Guides",
  description:
    "Compare tuck, mailer, magnetic, collapsible magnetic, pouch, rollstock, and corrugated packaging paths before requesting a custom quote.",
  path: pagePath,
  keywords: [
    "custom packaging comparison",
    "types of custom packaging",
    "which custom box should I use",
    "packaging buying guides",
  ],
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "UPG Custom Packaging Comparison Guides",
      description:
        "Buyer decision guides comparing real packaging paths inside UPG's focused custom packaging range.",
      dateModified: "2026-08-23",
      mainEntity: { "@id": `${pageUrl}#guides` },
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#guides`,
      name: "Custom packaging comparison guides",
      numberOfItems: comparisonGuides.length,
      itemListElement: comparisonGuides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.name,
        url: `${pageUrl}/${guide.slug}`,
        description: guide.quickAnswer,
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
          name: "Packaging Comparisons",
          item: pageUrl,
        },
      ],
    },
  ],
};

export default function ComparisonHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-background">
        <div className="container-editorial pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-5xl">
            <div className="eyebrow mb-5">Custom packaging comparison guides</div>
            <h1 className="display-1 text-balance">
              Compare packaging formats before you lock the structure.
            </h1>
            <p className="mt-7 max-w-4xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Use side-by-side buyer guides to separate product families, style
              directions, quote inputs, MOQ rules, and scope boundaries before
              artwork or production pricing begins.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/tools/packaging-format-finder"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
              >
                Use the Format Finder
              </Link>
              <Link
                href="/products"
                className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
              >
                Browse all products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-cream">
        <div className="container-editorial grid gap-8 py-10 sm:grid-cols-3 md:py-12">
          {[
            [String(comparisonGuides.length), "Buyer decision guides"],
            ["5", "Focused product families"],
            ["1", "Human-reviewed quote path"],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="font-serif text-4xl text-gold">{value}</div>
              <div className="mt-2 text-sm text-foreground/80">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Buyer decisions"
            title="Choose the closest comparison."
            intro="Each page answers one distinct purchasing question, links to the real product or format, and carries the selected route into a prefilled enquiry."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {comparisonGuides.map((guide, index) => (
              <Link
                key={guide.slug}
                href={`/compare/${guide.slug}`}
                className="surface-card group flex min-h-80 flex-col p-7 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="eyebrow">Decision guide</span>
                  <span className="font-serif text-2xl text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-7 font-serif text-3xl text-foreground">
                  {guide.name}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {guide.quickAnswer}
                </p>
                <div className="mt-auto pt-7 text-xs text-muted-foreground">
                  {guide.first.label} · {guide.second.label}
                </div>
                <span className="mt-3 text-sm text-foreground">
                  Compare the two paths →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone">
        <div className="container-editorial grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <SectionHeading
              eyebrow="How to use the library"
              title="Decision first, specification second, quote third."
              intro="Use a comparison to choose the closest route, continue to the product or style page, then send the known dimensions, product details, quantity, artwork status, and destination for review."
            />
          </div>
          <div className="flex flex-wrap gap-4 lg:col-span-4 lg:justify-end">
            <Link
              href="/get-a-quote?product=Not%20sure%20yet"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
            >
              Send the known details
            </Link>
            <Link
              href="/get-a-quote"
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-cream"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>

      <QuoteCta
        title="Need UPG to compare the options for you?"
        intro="Share the product, intended use, dimensions, quantity, artwork status, and destination. Keep any unknown structure clearly marked for review."
        href="/get-a-quote?product=Not%20sure%20yet&builder_note=Please%20compare%20the%20available%20UPG%20packaging%20routes%20for%20this%20project."
      />
    </>
  );
}
