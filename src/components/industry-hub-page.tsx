import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import type { IndustryHub } from "@/data/industry-hubs";
import { getProductBySlug } from "@/data/products";
import { siteConfig } from "@/data/site";
import { SITE_URL } from "@/lib/seo";

interface IndustryHubPageProps {
  hub: IndustryHub;
}

export function IndustryHubPage({ hub }: IndustryHubPageProps) {
  const products = hub.productSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((product) => product !== undefined);
  const pageUrl = `${SITE_URL}/industries/${hub.slug}`;
  const quoteHref = `/get-a-quote?builder_note=${encodeURIComponent(
    `Industry: ${hub.shortName}. Please recommend the right packaging format.`
  )}`;
  const faqItems = [
    ...hub.faqs,
    {
      question: `What packaging formats can UPG quote for ${hub.shortName.toLowerCase()}?`,
      answer: `${products
        .map((product) => product.name)
        .join(", ")} are the current starting product families on this page. The final structure and specification require project review.`,
    },
    {
      question: `What are the planning minimums for ${hub.shortName.toLowerCase()} packaging?`,
      answer: products
        .map((product) => `${product.shortName}: ${product.moq}`)
        .join("; "),
    },
    {
      question: "Can UPG publish one fixed price for these custom formats?",
      answer:
        "No. Custom-production pricing depends on the approved structure, dimensions, material or film specification, printing, finishes, quantity, proofing requirements, and delivery destination. UPG prepares a project-specific written quote after review.",
    },
    {
      question: "What should I send for the first review?",
      answer: hub.projectInputs.join("; "),
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: hub.name,
        description: hub.metaDescription,
        dateModified: hub.reviewedAt,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        mainEntity: { "@id": `${pageUrl}#guides` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#guides`,
        name: `${hub.shortName} packaging guides`,
        numberOfItems: hub.guideLinks.length,
        itemListElement: hub.guideLinks.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          url: `${SITE_URL}${item.href}`,
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
            name: "Industries",
            item: `${SITE_URL}/industries`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: hub.shortName,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
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

      <section className="bg-background">
        <div className="container-editorial pt-10 pb-20 md:pt-16 md:pb-28">
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
          >
            <Link href="/industries" className="hover:text-foreground">
              Industries
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-foreground">
              {hub.shortName}
            </span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="eyebrow mb-5">Packaging by industry</div>
              <h1 className="display-1 text-balance">{hub.heroTitle}</h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {hub.heroDescription}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href={quoteHref}
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
                >
                  Start this project
                </Link>
                <Link
                  href="#choose-a-format"
                  className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
                >
                  Compare formats
                </Link>
              </div>
            </div>

            <figure className="lg:col-span-6">
              <div className="relative aspect-[5/4] overflow-hidden bg-stone shadow-lift">
                <Image
                  src={hub.image.src}
                  alt={hub.image.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Representative packaging concept. Final construction, dimensions,
                color, print, insert, and finish are confirmed for each project.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-moss text-primary-foreground">
        <div className="container-editorial grid gap-px bg-white/15 sm:grid-cols-3">
          {[
            ["Current product families", String(products.length)],
            ["Specific buyer paths", String(hub.guideLinks.length)],
            ["Markets served", siteConfig.market],
          ].map(([label, value]) => (
            <div key={label} className="bg-moss px-6 py-7">
              <div className="text-[10px] font-semibold tracking-[0.14em] text-primary-foreground/80 uppercase">
                {label}
              </div>
              <div className="mt-2 text-sm leading-relaxed">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="choose-a-format" className="section-shell scroll-mt-24">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Choose a starting format"
            title="Start from what the packaging must do."
            intro={hub.quickAnswer}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {hub.selectionGuide.map((item, index) => (
              <Link
                key={item.need}
                href={item.href}
                className="surface-card group grid gap-5 p-6 hover:-translate-y-1 hover:shadow-card sm:grid-cols-[3rem_1fr] md:p-8"
              >
                <span className="font-serif text-3xl text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="eyebrow">{item.need}</span>
                  <span className="mt-3 block font-serif text-2xl text-foreground">
                    {item.startingPoint}
                  </span>
                  <span className="mt-3 block text-sm leading-relaxed text-muted-foreground">
                    {item.reason}
                  </span>
                  <span className="mt-5 block text-sm text-foreground">
                    Review this path →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Current UPG range"
            title={`Product families used for ${hub.shortName.toLowerCase()} projects.`}
            intro="These are current UPG product families, not extra styles created for SEO. The final structure is selected from the actual project brief."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="surface-card group flex min-h-60 flex-col p-6 hover:-translate-y-1 hover:shadow-card"
              >
                <span className="eyebrow">{product.category}</span>
                <h2 className="mt-5 font-serif text-2xl text-foreground">
                  {product.shortName}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {product.summary}
                </p>
                <div className="mt-auto border-t border-border pt-5 text-sm text-foreground">
                  MOQ {product.moq.toLowerCase()} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Specific buyer paths"
              title={`Go deeper into ${hub.shortName.toLowerCase()} packaging.`}
              intro="Choose the closest product or application. Each page connects to a current UPG format and a project-specific quote path."
            />
            <Link
              href="/industries"
              className="inline-flex shrink-0 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
            >
              Browse all industries →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hub.guideLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="surface-card group flex min-h-56 flex-col p-6 hover:-translate-y-1 hover:shadow-card"
              >
                <span className="eyebrow">Buying guide</span>
                <h2 className="mt-5 font-serif text-2xl text-foreground">
                  {item.label}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <span className="mt-auto pt-6 text-sm text-foreground">
                  Open guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone">
        <div className="container-editorial grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="First project review"
              title="Send enough detail for a useful recommendation."
              intro="A complete specification is not required. Share the known facts and keep unknown items clearly marked for review."
            />
            <div className="mt-7 border-l-2 border-gold bg-cream p-6 text-sm leading-relaxed text-foreground/85">
              <strong className="block text-foreground">Product scope</strong>
              <span className="mt-2 block">{hub.scopeNote}</span>
            </div>
            <div className="mt-5 border-l-2 border-primary bg-surface p-6 text-sm leading-relaxed text-foreground/85">
              <strong className="block text-foreground">Required project check</strong>
              <span className="mt-2 block">{hub.compatibilityNote}</span>
            </div>
          </div>
          <div className="surface-card p-6 md:p-8 lg:col-span-7">
            <ol className="space-y-5">
              {hub.projectInputs.map((input, index) => (
                <li
                  key={input}
                  className="flex gap-4 border-b border-border pb-5 last:border-0 last:pb-0"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-sm leading-relaxed text-foreground/85">
                    {input}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Buyer questions"
              title={`Plan ${hub.shortName.toLowerCase()} packaging with clear boundaries.`}
              intro="Quick answers cover format choice, scope, minimum quantities, quote logic, and the first project review."
            />
          </div>
          <div className="surface-card p-6 sm:p-8 lg:col-span-8 lg:p-10">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      <QuoteCta
        title={`Start a custom packaging project for ${hub.shortName.toLowerCase()}.`}
        intro="Send the product, intended use, dimensions or fill, quantity, artwork status, and destination. UPG will review the correct format and prepare project-specific pricing."
        href={quoteHref}
      />
    </>
  );
}
