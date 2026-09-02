import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { industryNavigationGroups } from "@/data/navigation";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site";
import { getIndustryLinkVisual } from "@/lib/industry-visuals";
import { SITE_URL, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Packaging Manufacturer: Boxes & Mylar Bags",
  description:
    "Custom printed tuck boxes, corrugated ear-lock mailers, magnetic boxes, collapsible magnetic boxes, and Mylar bags manufactured for brands worldwide.",
  path: "/",
  keywords: [
    "custom packaging manufacturer",
    "custom printed cardboard boxes",
    "custom boxes manufacturer",
    "custom flexible packaging",
  ],
});

const buyerProof = [
  { value: "5", label: "focused product families", href: "/products" },
  {
    value: "250 units",
    label: "planning MOQ for every product family",
    href: "/custom-packaging-pricing",
  },
  { value: "Worldwide", label: "production and delivery" },
  { value: "1 business day", label: "target for an initial reply" },
];

const simpleProcess = [
  {
    number: "01",
    title: "Share the basics",
    description:
      "Tell us the packaging family, quantity, and how to reach you. References and technical details can follow.",
  },
  {
    number: "02",
    title: "Confirm the project",
    description:
      "We review the structure, dimensions, material, print, finish, pricing, and delivery requirements with you.",
  },
  {
    number: "03",
    title: "Approve and produce",
    description:
      "Dielines, artwork, proofing, manufacturing, and delivery move forward after the project details are approved.",
  },
];

const finishHighlights = [
  "Interior and exterior printing",
  "Foil stamping",
  "Spot UV",
  "Embossing and debossing",
  "Custom inserts",
  "Matte, gloss, and soft-touch finishes",
];

const homepageIndustryPaths = industryNavigationGroups.map((group) => {
  const representativeHref = group.href.includes("#")
    ? group.links[0]?.href ?? "/industries"
    : group.href;

  return {
    ...group,
    representativeHref,
    visual: getIndustryLinkVisual(representativeHref),
  };
});

export default function HomePage() {
  const featuredMailer = products.find(
    (product) => product.slug === "custom-mailer-boxes"
  );
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Custom Packaging Manufacturer: Boxes & Mylar Bags",
        description:
          "Custom printed tuck boxes, corrugated ear-lock mailers, magnetic boxes, collapsible magnetic boxes, and Mylar bags manufactured for brands worldwide.",
        dateModified: siteConfig.contentReviewedAt,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: featuredMailer
          ? {
              "@type": "ImageObject",
              url: `${SITE_URL}${featuredMailer.heroImage}`,
              caption: "Custom corrugated ear-lock mailer boxes",
            }
          : undefined,
        mainEntity: [
          { "@id": `${SITE_URL}/#product-families` },
          { "@id": `${SITE_URL}/#industry-paths` },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#product-families`,
        name: "UPG custom packaging product families",
        numberOfItems: products.length,
        itemListElement: products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            "@id": `${SITE_URL}/products/${product.slug}#service`,
            name: product.name,
            url: `${SITE_URL}/products/${product.slug}`,
            image: `${SITE_URL}${product.heroImage}`,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: siteConfig.market,
            additionalProperty: {
              "@type": "PropertyValue",
              name: "Planning MOQ",
              value: product.moq,
            },
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#industry-paths`,
        name: "UPG custom packaging industry paths",
        numberOfItems: homepageIndustryPaths.length,
        itemListElement: homepageIndustryPaths.map((group, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "WebPage",
            name: `${group.label} Packaging`,
            url: `${SITE_URL}${group.representativeHref}`,
            description: group.description,
            image: `${SITE_URL}${group.visual.src}`,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="overflow-hidden bg-background">
        <div className="container-editorial py-10 md:py-14 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="eyebrow mb-5">
                Custom packaging manufacturer • Worldwide delivery
              </div>
              <h1 className="max-w-3xl text-5xl leading-[0.98] font-light tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl">
                Custom boxes and Mylar bags, made to your specifications.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
                Tuck boxes, corrugated ear-lock mailer boxes, magnetic boxes,
                collapsible magnetic boxes, and printed Mylar bags for brands
                worldwide.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/get-a-quote"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
                >
                  Get a Quote
                </Link>
                <Link
                  href="#products"
                  className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
                >
                  View 5 Products
                </Link>
              </div>
              {siteConfig.whatsappUrl ? (
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex border-b border-foreground/20 pb-0.5 text-sm text-foreground"
                >
                  Prefer a quick conversation? WhatsApp UPG →
                </a>
              ) : null}
            </div>

            {featuredMailer ? (
              <Link
                href={`/products/${featuredMailer.slug}`}
                className="group relative overflow-hidden border border-border bg-surface shadow-soft lg:col-span-6"
              >
                <div className="relative aspect-[6/5] overflow-hidden">
                  <Image
                    src={featuredMailer.heroImage}
                    alt="Custom corrugated ear-lock mailer boxes"
                    fill
                    priority
                    fetchPriority="high"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex items-center justify-between gap-5 border-t border-border px-5 py-4">
                  <div>
                    <div className="eyebrow mb-1">Featured format</div>
                    <div className="text-sm font-medium text-foreground">
                      Corrugated ear-lock mailer boxes
                    </div>
                  </div>
                  <span className="text-sm text-foreground">View →</span>
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section id="buyer-proof" className="border-y border-border bg-cream">
        <div className="container-editorial grid grid-cols-2 gap-x-6 gap-y-7 py-7 lg:grid-cols-4">
          {buyerProof.map((item) => (
            <div key={item.label}>
              <div className="text-lg font-semibold text-foreground">{item.value}</div>
              <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {item.label}
              </div>
              {item.href ? (
                <Link
                  href={item.href}
                  className="mt-2 inline-flex border-b border-foreground/20 pb-0.5 text-xs text-foreground"
                >
                  View details →
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="scroll-mt-24 py-16 md:py-20">
        <div className="container-editorial">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="What we manufacture"
              title="Choose your packaging format."
              intro="Start with the closest product family. If you are not sure, select ‘Not sure yet’ when requesting a quote."
              headingClassName="text-4xl font-light tracking-[-0.03em] text-balance md:text-5xl"
            />
            <Link
              href="/products"
              className="inline-flex w-fit border-b border-foreground/20 pb-0.5 text-sm text-foreground"
            >
              Compare all product details →
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group overflow-hidden border border-border bg-surface hover:-translate-y-0.5 hover:shadow-card"
              >
                <div className="relative aspect-square overflow-hidden bg-stone">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-medium leading-tight text-foreground">
                    {product.shortName}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {product.bestFor}
                  </p>
                  <div className="mt-4 border-t border-border pt-4 text-xs text-foreground/80">
                    <span className="font-semibold">MOQ:</span> {product.moq}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="industry-paths" className="border-y border-border bg-stone py-16 md:py-20">
        <div className="container-editorial">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Packaging by market"
              title="Start from your industry, then choose the format."
              intro="Each market path connects the buyer to current UPG products, visual format guides, planning questions, and a project-specific quote."
              headingClassName="text-4xl font-light tracking-[-0.03em] text-balance md:text-5xl"
            />
            <Link
              href="/industries"
              className="inline-flex w-fit border-b border-foreground/20 pb-0.5 text-sm text-foreground"
            >
              Browse every industry guide →
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {homepageIndustryPaths.map((group) => (
              <Link
                key={group.id}
                href={group.href}
                className="surface-card group flex min-h-[23rem] flex-col overflow-hidden hover:-translate-y-1 hover:shadow-card"
              >
                <span className="relative aspect-[16/10] overflow-hidden bg-cream">
                  <Image
                    src={group.visual.src}
                    alt={group.visual.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="eyebrow">Industry path</span>
                  <h2 className="mt-4 font-serif text-2xl text-foreground">
                    {group.label}
                  </h2>
                  <span className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {group.description}
                  </span>
                  <span className="mt-auto pt-6 text-sm text-foreground">
                    Explore products and guides →
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-7 text-xs leading-relaxed text-muted-foreground">
            Industry guidance was reviewed {siteConfig.contentReviewedAt}. Final
            structure, materials, compatibility, pricing, production timing, and
            delivery terms remain project specific.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-cream py-16 md:py-20">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="A clear manufacturing process"
              title="Enough information to start. Expert review before production."
              intro="You do not need a finished specification to contact UPG. Start with what you know, and we will identify what needs to be confirmed."
              headingClassName="text-4xl font-light tracking-[-0.03em] text-balance md:text-5xl"
            />
            <div className="mt-8 flex flex-wrap gap-2">
              {finishHighlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-surface px-3 py-2 text-xs text-foreground/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:col-span-7 lg:grid-cols-3">
            {simpleProcess.map((step) => (
              <div key={step.number} className="border-t border-border pt-5">
                <div className="text-sm font-semibold text-gold-dark">{step.number}</div>
                <h2 className="mt-3 text-xl font-semibold text-foreground">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteCta
        title="Tell us what you need. We will take it from there."
        intro="Send the product family, quantity, and your contact details. Technical specifications can follow after the first review."
      />
    </>
  );
}
