import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteCta } from "@/components/quote-cta";
import { getIndustryGuideBySlug } from "@/data/industry-guides";
import { industryNavigationGroups } from "@/data/navigation";
import { getIndustryLinkVisual } from "@/lib/industry-visuals";
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
const industryHeroVisuals = industryNavigationGroups.slice(0, 4).map((group) =>
  getIndustryLinkVisual(
    group.href.includes("#") ? group.links[0]?.href ?? "/industries" : group.href
  )
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
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}${industryHeroVisuals[0].src}`,
        caption: industryHeroVisuals[0].alt,
      },
    },
    {
      "@type": "ItemList",
      name: "UPG packaging industry guides",
      numberOfItems: industryLinks.length,
      itemListElement: industryLinks.map((item, index) => {
        const visual = getIndustryLinkVisual(item.href);
        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "WebPage",
            "@id": `${SITE_URL}${item.href}`,
            url: `${SITE_URL}${item.href}`,
            name: item.label,
            image: `${SITE_URL}${visual.src}`,
          },
        };
      }),
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
          name: "Industries",
          item: `${SITE_URL}/industries`,
        },
      ],
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
        <div className="container-editorial pt-12 pb-20 md:pt-16 md:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="eyebrow mb-5">By industry</div>
              <h1 className="text-balance font-serif text-[clamp(2.8rem,5.4vw,5.2rem)] leading-[0.98] font-light tracking-[-0.035em]">
                Find the right packaging path for your market.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
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

            <div className="grid grid-cols-2 gap-3 lg:col-span-5">
              {industryHeroVisuals.map((visual, index) => (
                <div
                  key={`${visual.src}-${index}`}
                  className={`relative overflow-hidden bg-stone ${
                    index === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                  } ${index === 3 ? "hidden" : ""}`}
                >
                  <Image
                    src={visual.src}
                    alt={visual.alt}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes={index === 0 ? "(max-width: 1024px) 100vw, 42vw" : "(max-width: 1024px) 50vw, 21vw"}
                  />
                </div>
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
                  <div className="relative mb-7 aspect-[16/10] overflow-hidden bg-stone">
                    <Image
                      src={
                        getIndustryLinkVisual(
                          group.href.includes("#")
                            ? group.links[0]?.href ?? "/industries"
                            : group.href
                        ).src
                      }
                      alt={
                        getIndustryLinkVisual(
                          group.href.includes("#")
                            ? group.links[0]?.href ?? "/industries"
                            : group.href
                        ).alt
                      }
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
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
                      className="surface-card group flex min-h-[22rem] flex-col overflow-hidden hover:-translate-y-1 hover:shadow-card"
                    >
                      <span className="relative aspect-[16/9] overflow-hidden bg-stone">
                        <Image
                          src={getIndustryLinkVisual(item.href).src}
                          alt={getIndustryLinkVisual(item.href).alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </span>
                      <span className="flex flex-1 flex-col p-6">
                        <span className="eyebrow">{item.kind}</span>
                        <h3 className="mt-4 font-serif text-2xl text-foreground">
                          {item.label}
                        </h3>
                        <span className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {getLinkDescription(item.href) ?? group.description}
                        </span>
                        <span className="mt-auto pt-6 text-sm text-foreground">
                          Explore <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </span>
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
