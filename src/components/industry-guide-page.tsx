import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { getIndustryHubForGuideSlug } from "@/data/industry-hubs";
import {
  industryGuides,
  type IndustryGuide,
} from "@/data/industry-guides";
import { getProductStyleGuide } from "@/data/product-styles";
import { getProductBySlug } from "@/data/products";
import { siteConfig } from "@/data/site";
import { getIndustryLinkVisual } from "@/lib/industry-visuals";
import { SITE_URL } from "@/lib/seo";

interface IndustryGuidePageProps {
  guide: IndustryGuide;
}

export function IndustryGuidePage({ guide }: IndustryGuidePageProps) {
  const products = guide.productSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((product) => product !== undefined);
  const formatGuides = (guide.formatSlugs ?? [])
    .map((slug) => getProductStyleGuide(slug))
    .filter((format) => format !== undefined);
  const industryHub = getIndustryHubForGuideSlug(guide.slug);
  const related = industryHub
    ? industryHub.childGuideSlugs
        .filter((slug) => slug !== guide.slug)
        .map((slug) => industryGuides.find((candidate) => candidate.slug === slug))
        .filter((candidate) => candidate !== undefined)
        .slice(0, 3)
    : industryGuides
        .filter(
          (candidate) =>
            candidate.slug !== guide.slug &&
            candidate.productSlugs.some((slug) =>
              guide.productSlugs.includes(slug)
            )
        )
        .slice(0, 3);
  const heroCompanionVisuals = (
    guide.heroCompanionImages ?? [
      ...products.flatMap((product) => [
        {
          src: product.heroImage,
          alt: `${product.shortName} packaging concept for ${guide.shortName.toLowerCase()}`,
        },
        ...product.galleryImages,
      ]),
      ...formatGuides.map((format) =>
        getIndustryLinkVisual(`/packaging-styles/${format.slug}`)
      ),
      ...related.map((item) => item.image),
    ]
  )
    .filter(
      (visual, index, visuals) =>
        visual.src !== guide.image.src &&
        visuals.findIndex((candidate) => candidate.src === visual.src) === index
    )
    .slice(0, 2);
  const pageUrl = `${SITE_URL}/industries/${guide.slug}`;
  const quoteNote = `Industry or application: ${guide.shortName}.`;
  const quoteHref = `/get-a-quote?product=${encodeURIComponent(
    guide.primaryFamily
  )}&builder_note=${encodeURIComponent(quoteNote)}`;
  const moqAnswer = products
    .map((product) => `${product.shortName}: ${product.moq}`)
    .join("; ");
  const faqItems = [
    {
      question: `What packaging formats can UPG quote for ${guide.shortName.toLowerCase()}?`,
      answer: `${products
        .map((product) => product.name)
        .join(", ")} are the approved starting product families on this page. The final structure requires project review.`,
    },
    {
      question: `What is the minimum order for ${guide.shortName.toLowerCase()}?`,
      answer: `${moqAnswer}. Every UPG custom product family uses the same 250-unit planning MOQ; finished dimensions remain part of feasibility and specification review.`,
    },
    {
      question: "Can UPG publish an instant price from this guide?",
      answer:
        "No. Custom-production pricing depends on the approved structure, dimensions, material or film specification, printing, finishes, quantity, proofing requirements, and delivery destination. UPG prepares a project-specific written quote after review.",
    },
    {
      question: "What should I send for the first review?",
      answer: `${guide.projectInputs.join("; ")}.`,
    },
  ];

  if (guide.compatibilityNote) {
    faqItems.push({
      question: "What compatibility or market check is required?",
      answer: guide.compatibilityNote,
    });
  }

  if (formatGuides.length > 0) {
    faqItems.push({
      question: `Which packaging formats should I compare for ${guide.shortName.toLowerCase()}?`,
      answer: `${formatGuides
        .map((format) => format.shortName)
        .join(", ")} are relevant starting formats in UPG's current range. The product, filling process, dimensions, closure, compatibility requirements, quantity, and destination still determine the final specification.`,
    });
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: guide.name,
        description: guide.metaDescription,
        dateModified: guide.reviewedAt,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}${guide.image.src}`,
          caption: guide.image.alt,
        },
        mainEntity: { "@id": `${pageUrl}#service` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: guide.name,
        description: guide.quickAnswer,
        serviceType: `${guide.name} manufacturing`,
        category: products.map((product) => product.name).join(", "),
        image: `${SITE_URL}${guide.image.src}`,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: siteConfig.market,
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#formats`,
        name: `Approved starting formats for ${guide.shortName}`,
        numberOfItems: products.length + formatGuides.length,
        itemListElement: [
          ...products.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Service",
              name: product.name,
              url: `${SITE_URL}/products/${product.slug}`,
              image: `${SITE_URL}${product.heroImage}`,
            },
          })),
          ...formatGuides.map((format, index) => {
            const visual = getIndustryLinkVisual(
              `/packaging-styles/${format.slug}`
            );
            return {
              "@type": "ListItem",
              position: products.length + index + 1,
              item: {
                "@type": "Service",
                name: format.name,
                url: `${SITE_URL}/packaging-styles/${format.slug}`,
                image: `${SITE_URL}${visual.src}`,
              },
            };
          }),
        ],
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
            name: industryHub?.shortName ?? guide.shortName,
            item: industryHub
              ? `${SITE_URL}/industries/${industryHub.slug}`
              : pageUrl,
          },
          ...(industryHub
            ? [
                {
                  "@type": "ListItem",
                  position: 4,
                  name: guide.shortName,
                  item: pageUrl,
                },
              ]
            : []),
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
            {industryHub ? (
              <>
                <span aria-hidden="true">/</span>
                <Link
                  href={`/industries/${industryHub.slug}`}
                  className="hover:text-foreground"
                >
                  {industryHub.shortName}
                </Link>
              </>
            ) : null}
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-foreground">
              {guide.shortName}
            </span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="eyebrow mb-5">Packaging application guide</div>
              <h1 className="text-balance font-serif text-[clamp(2.55rem,3.9vw,4rem)] leading-[0.98] font-light tracking-[-0.035em]">
                {guide.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {guide.heroDescription}
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link
                  href={quoteHref}
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
                >
                  Start this project
                </Link>
                <Link
                  href="#approved-formats"
                  className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
                >
                  Compare source styles
                </Link>
              </div>
            </div>

            <figure className="lg:col-span-6">
              <div className="grid grid-cols-5 gap-3">
                <div className="relative col-span-5 aspect-[16/10] overflow-hidden bg-stone shadow-lift sm:col-span-4 sm:row-span-2 sm:aspect-auto sm:min-h-[31rem]">
                  <Image
                    src={guide.image.src}
                    alt={guide.image.alt}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 40vw"
                  />
                </div>
                {heroCompanionVisuals.map((visual) => (
                  <div
                    key={visual.src}
                    className="relative col-span-1 hidden min-h-60 overflow-hidden bg-stone sm:block"
                  >
                    <Image
                      src={visual.src}
                      alt={visual.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 20vw, 10vw"
                    />
                  </div>
                ))}
              </div>
              <figcaption className="mt-3 flex flex-col gap-1 text-xs leading-relaxed text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <span>
                  Representative packaging concepts. Final construction,
                  dimensions, color, print, insert, and finish are confirmed for
                  each project.
                </span>
                <span className="shrink-0">Reviewed {guide.reviewedAt}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-moss text-primary-foreground">
        <div className="container-editorial grid gap-px bg-white/15 sm:grid-cols-3">
          {[
            ["Primary product family", guide.primaryFamily],
            ["Pricing", "Project-specific written quote"],
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

      <section id="approved-formats" className="section-shell scroll-mt-24">
        <div className="container-editorial grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Quick answer"
              title="Start with the real product and project brief."
              intro={guide.quickAnswer}
            />
            <div className="mt-7 border-l-2 border-gold bg-cream p-6 text-sm leading-relaxed text-foreground/85">
              <strong className="block text-foreground">Product scope</strong>
              <span className="mt-2 block">{guide.scopeNote}</span>
            </div>
            {guide.compatibilityNote ? (
              <div className="mt-5 border-l-2 border-primary bg-stone p-6 text-sm leading-relaxed text-foreground/85">
                <strong className="block text-foreground">Required project check</strong>
                <span className="mt-2 block">{guide.compatibilityNote}</span>
              </div>
            ) : null}
          </div>

          <aside className="surface-card p-5 lg:col-span-5 lg:p-7">
            <div className="eyebrow mb-5">Canonical product sources</div>
            <div className="space-y-4">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group grid grid-cols-[6rem_1fr] overflow-hidden border border-border bg-background"
                >
                  <span className="relative min-h-32 overflow-hidden bg-stone">
                    <Image
                      src={product.heroImage}
                      alt={`${product.shortName} representative packaging concept`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="96px"
                    />
                  </span>
                  <span className="p-4">
                    <span className="block font-serif text-xl text-foreground">
                      {product.shortName}
                    </span>
                    <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                      Planning MOQ: {product.moq}
                    </span>
                    <span className="mt-3 block text-xs text-foreground">
                      Review specifications →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {formatGuides.length > 0 ? (
        <section className="section-shell bg-cream">
          <div className="container-editorial">
            <SectionHeading
              eyebrow="Source-of-truth styles"
              title={`Compare approved styles for ${guide.shortName.toLowerCase()}.`}
              intro={`These styles come from UPG's current ${guide.primaryFamily.toLowerCase()} library. This industry page adds buyer context and industry keyword relevance; it does not create a separate structure or automatic suitability claim.`}
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {formatGuides.map((format) => (
                <Link
                  key={format.slug}
                  href={`/packaging-styles/${format.slug}`}
                  className="surface-card group flex min-h-[25rem] flex-col overflow-hidden hover:-translate-y-1 hover:shadow-card"
                >
                  <span className="relative aspect-[16/10] overflow-hidden bg-stone">
                    <Image
                      src={
                        getIndustryLinkVisual(
                          `/packaging-styles/${format.slug}`
                        ).src
                      }
                      alt={
                        getIndustryLinkVisual(
                          `/packaging-styles/${format.slug}`
                        ).alt
                      }
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </span>
                  <span className="flex flex-1 flex-col p-6">
                    <span className="eyebrow">{format.category}</span>
                    <h2 className="mt-4 font-serif text-2xl text-foreground">
                      {format.shortName}
                    </h2>
                    <span className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {format.selectionNote}
                    </span>
                    <span className="mt-auto pt-6 text-sm text-foreground">
                      Review format and quote inputs →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-shell bg-stone">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Best fit"
            title={`Where ${guide.shortName.toLowerCase()} fit the brief.`}
            intro="Use these as planning scenarios, then confirm the exact structure and specification from the products and project requirements."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {guide.bestFor.map((item, index) => (
              <div key={item} className="surface-card p-6">
                <div className="font-serif text-2xl text-gold">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-foreground/85">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Planning decisions"
              title="Resolve the questions that change the specification."
              intro="These are the highest-value decisions to make before final artwork and project pricing."
            />
          </div>
          <div className="grid gap-6 lg:col-span-8">
            {guide.planningQuestions.map((question) => (
              <div key={question.title} className="surface-card p-6 md:p-8">
                <h2 className="font-serif text-2xl text-foreground">
                  {question.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {question.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Quote-ready brief"
              title="What to send for the first useful review."
              intro="You do not need a perfect specification. Send the facts and files already available, and keep unknown items clearly marked for review."
            />
          </div>
          <div className="surface-card p-6 md:p-8 lg:col-span-7">
            <ol className="space-y-5">
              {guide.projectInputs.map((input, index) => (
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
              title={`Plan ${guide.shortName.toLowerCase()} with clear boundaries.`}
              intro="These answers explain the product range, planning MOQ, quote model, and information needed before production."
            />
          </div>
          <div className="surface-card p-6 sm:p-8 lg:col-span-8 lg:p-10">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section-shell bg-stone">
          <div className="container-editorial">
            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Related applications"
                title="Explore nearby buyer intents in the same product range."
                intro="Each linked guide maps back to a real UPG product family and a human-reviewed enquiry."
              />
              <Link
                href={
                  industryHub
                    ? `/industries/${industryHub.slug}`
                    : "/industries"
                }
                className="inline-flex border-b border-foreground/20 pb-0.5 text-sm text-foreground"
              >
                {industryHub
                  ? `Back to ${industryHub.shortName} packaging →`
                  : "Browse all industry guides →"}
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/industries/${item.slug}`}
                  className="surface-card group flex min-h-[25rem] flex-col overflow-hidden hover:-translate-y-1 hover:shadow-card"
                >
                  <span className="relative aspect-[16/10] overflow-hidden bg-stone">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </span>
                  <span className="flex flex-1 flex-col p-6">
                    <span className="eyebrow">Application guide</span>
                    <h2 className="mt-4 font-serif text-2xl text-foreground">
                      {item.shortName}
                    </h2>
                    <span className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.metaDescription}
                    </span>
                    <span className="mt-auto pt-6 text-sm text-foreground">
                      Read this guide →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <QuoteCta
        title={`Start a custom packaging project for ${guide.shortName.toLowerCase()}.`}
        intro="Send the known product, dimensions, quantity, artwork, intended use, and destination. UPG will review the correct structure and prepare project-specific pricing."
        href={quoteHref}
      />
    </>
  );
}
