import type { Metadata } from "next";
import Link from "next/link";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import {
  productStyleGroups,
  productStyleGuides,
} from "@/data/product-styles";
import { SITE_URL, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Packaging Styles & Box Formats",
  description:
    "Browse UPG's real tuck box and Mylar bag formats, compare exact planning MOQ rules, and carry the selected style into a project-specific quote.",
  path: "/packaging-styles",
  keywords: [
    "custom packaging styles",
    "custom box styles",
    "types of tuck boxes",
    "types of Mylar bags",
    "custom pouch formats",
  ],
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/packaging-styles#page`,
      name: "UPG Custom Packaging Style Library",
      url: `${SITE_URL}/packaging-styles`,
      description:
        "A browsable library of real tuck box and flexible-packaging formats available from UPG.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "ItemList",
      name: "UPG packaging styles",
      numberOfItems: productStyleGuides.length,
      itemListElement: productStyleGuides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.name,
        url: `${SITE_URL}/packaging-styles/${guide.slug}`,
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
          name: "Packaging Styles",
          item: `${SITE_URL}/packaging-styles`,
        },
      ],
    },
  ],
};

export default function PackagingStylesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-background">
        <div className="container-editorial pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="max-w-5xl">
            <div className="eyebrow mb-5">Custom packaging style library</div>
            <h1 className="display-1 text-balance">
              Start with a real format, then build the specification.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Explore the tuck box styles and Mylar bag formats inside UPG&apos;s
              current product range. Each page carries the approved MOQ, project
              inputs, production boundaries, and a prefilled quote path.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/tools/packaging-format-finder"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
            >
              Find the right product family
            </Link>
            <Link
              href="/tools/packaging-spec-builder"
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
            >
              Check MOQ and build a spec
            </Link>
            <Link
              href="/compare"
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
            >
              Compare similar formats
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-cream">
        <div className="container-editorial grid gap-8 py-10 md:grid-cols-3 md:py-12">
          {[
            ["12", "Real available formats"],
            ["5", "Focused product families"],
            ["0", "Instant-price or automatic-approval claims"],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="font-serif text-4xl text-gold">{value}</div>
              <div className="mt-2 text-sm text-foreground/80">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {productStyleGroups.map((group, groupIndex) => {
        const guides = productStyleGuides.filter(
          (guide) => guide.family === group.family
        );

        return (
          <section
            key={group.family}
            className={`section-shell ${groupIndex % 2 === 1 ? "bg-stone" : ""}`}
          >
            <div className="container-editorial">
              <SectionHeading
                eyebrow="Product style group"
                title={group.title}
                intro={group.description}
              />
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {guides.map((guide, index) => (
                  <Link
                    key={guide.slug}
                    href={`/packaging-styles/${guide.slug}`}
                    className="surface-card group flex min-h-72 flex-col p-7 hover:-translate-y-1 hover:shadow-card"
                  >
                    <div className="flex items-center justify-between">
                      <span className="eyebrow">{guide.category}</span>
                      <span className="font-serif text-2xl text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="mt-7 font-serif text-3xl text-foreground">
                      {guide.shortName}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {guide.quickAnswer}
                    </p>
                    <span className="mt-auto pt-7 text-sm text-foreground">
                      Review style, MOQ, and quote inputs →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section-shell bg-cream">
        <div className="container-editorial grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <SectionHeading
              eyebrow="Scope boundary"
              title="A searchable style library, not a generic everything-catalog."
              intro="UPG is starting with five focused product families. Corrugated content covers branded ear-lock mailer boxes and approved corrugated tuck-box applications—not standard shipping cartons, master cartons, or RSC cases."
            />
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/products"
              className="inline-flex rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
            >
              Compare all five families
            </Link>
          </div>
        </div>
      </section>

      <QuoteCta
        title="Know the style? Carry it into a real manufacturing brief."
        intro="Choose the closest format page, review its planning inputs, then submit the known dimensions, quantity, artwork, and destination for project-specific pricing."
      />
    </>
  );
}
