import type { Metadata } from "next";
import Link from "next/link";
import { QuoteCta } from "@/components/quote-cta";
import { getIndustryGuideBySlug } from "@/data/industry-guides";
import { industryNavigationGroups } from "@/data/navigation";
import { SITE_URL, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Packaging by Industry",
  description:
    "Browse custom packaging by industry for beauty, food, beverage, coffee, supplements, fashion, jewelry, electronics, gifts, toys, and pet products.",
  path: "/industries",
  keywords: [
    "custom packaging by industry",
    "custom product packaging",
    "custom retail boxes",
    "custom food pouches",
    "custom pet food packaging",
    "custom snack packaging",
    "custom toy packaging",
  ],
});

interface IndustryNavigationLink {
  readonly label: string;
  readonly href: string;
  readonly kind: string;
}

const industryLinks = industryNavigationGroups.reduce<
  IndustryNavigationLink[]
>(
  (items, group) => [
    ...items,
    ...(group.href.includes("#")
      ? []
      : [
          {
            label: `${group.label} Packaging`,
            href: group.href,
            kind: "Industry hub",
          },
        ]),
    ...group.links,
  ],
  []
);

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/industries#page`,
      name: "UPG Custom Packaging by Industry",
      url: `${SITE_URL}/industries`,
      description:
        "Industry-led custom packaging paths across UPG's five current product families.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "ItemList",
      name: "UPG packaging industry guides",
      numberOfItems: industryLinks.length,
      itemListElement: industryLinks.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        url: `${SITE_URL}${item.href}`,
      })),
    },
  ],
};

function getLinkDescription(href: string) {
  if (href === "/cosmetics") {
    return "Dedicated packaging guidance for skincare, makeup, perfume, PR kits, and related beauty products.";
  }

  if (href === "/packaging-styles/coffee-bags") {
    return "Review UPG's current coffee-bag format, planning inputs, MOQ, and project boundaries.";
  }

  const slug = href.split("/").at(-1);
  return slug ? getIndustryGuideBySlug(slug)?.metaDescription : undefined;
}

export default function IndustriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-background">
        <div className="container-editorial pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-4xl">
            <div className="eyebrow mb-5">By industry</div>
            <h1 className="display-1 text-balance">
              Find the right packaging path for your market.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Explore packaging for beauty, food, supplements, fashion,
              electronics, gifts, and pet products. Every path connects to a
              current UPG box or bag format.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {industryNavigationGroups.map((group) => (
                <Link
                  key={group.id}
                  href={group.href}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground hover:bg-stone"
                >
                  {group.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-cream">
        <div className="container-editorial">
          {industryNavigationGroups.map((group, groupIndex) => (
            <div
              key={group.id}
              id={group.id}
              className="scroll-mt-28 border-b border-border py-14 last:border-0 md:py-20"
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <div className="eyebrow">
                    {String(groupIndex + 1).padStart(2, "0")} / Industry group
                  </div>
                  <h2 className="mt-4 font-serif text-3xl text-foreground md:text-4xl">
                    {group.label}
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {group.description}
                  </p>
                  {!group.href.includes("#") ? (
                    <Link
                      href={group.href}
                      className="mt-5 inline-flex border-b border-foreground/20 pb-0.5 text-sm text-foreground"
                    >
                      View {group.label} overview →
                    </Link>
                  ) : null}
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                  {group.links.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="surface-card group flex min-h-52 flex-col p-6 hover:-translate-y-1 hover:shadow-card"
                    >
                      <span className="eyebrow">{item.kind}</span>
                      <h3 className="mt-4 font-serif text-2xl text-foreground">
                        {item.label}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {getLinkDescription(item.href) ?? group.description}
                      </p>
                      <span className="mt-auto pt-6 text-sm text-foreground">
                        Explore <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <QuoteCta
        title="Not sure which packaging format fits your product?"
        intro="Tell us the product, intended use, quantity, and destination. We will review the requirements and recommend the right structure."
      />
    </>
  );
}
