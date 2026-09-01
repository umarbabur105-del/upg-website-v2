import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { OrganicIntentBridge } from "@/components/organic-intent-bridge";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { getComparisonGuidesByStyle } from "@/data/comparison-guides";
import { getIndustryGuidesByStyleSlug } from "@/data/industry-guides";
import {
  getRelatedProductStyles,
  type ProductStyleGuide,
} from "@/data/product-styles";
import { getProductBySlug } from "@/data/products";
import { getOrganicIntentRoute } from "@/data/organic-intent-routes";
import { siteConfig } from "@/data/site";
import { getIndustryLinkVisual } from "@/lib/industry-visuals";
import { SITE_URL } from "@/lib/seo";

interface ProductStyleGuidePageProps {
  guide: ProductStyleGuide;
}

export function ProductStyleGuidePage({ guide }: ProductStyleGuidePageProps) {
  const parentProduct = getProductBySlug(guide.parentProductSlug);

  if (!parentProduct) {
    return null;
  }

  const related = getRelatedProductStyles(guide);
  const comparisonGuides = getComparisonGuidesByStyle(guide.slug);
  const industryApplications = getIndustryGuidesByStyleSlug(guide.slug);
  const pageUrl = `${SITE_URL}/packaging-styles/${guide.slug}`;
  const intentRoute = getOrganicIntentRoute(`/packaging-styles/${guide.slug}`);
  const sampleKit =
    guide.family === "Mylar Bags"
      ? {
          href: "/samples/mylar-bag-sample-kit",
          label: "Compare the Mylar Bag Sample Kit",
          note: "The focused flexible-packaging kit includes finished pouch formats and one printed film-on-roll sample.",
        }
      : {
          href: "/samples/box-sample-kit",
          label: "Compare the Box Sample Kit",
          note: "The focused box kit includes finished custom box samples rather than loose material swatches.",
        };
  const quoteHref = `/get-a-quote?product=${encodeURIComponent(
    guide.family
  )}&style=${encodeURIComponent(guide.quoteStyle)}&builder_note=${encodeURIComponent(
    `Packaging style: ${guide.shortName}.`
  )}`;
  const faqItems = [
    {
      question: `What is the planning MOQ for ${guide.shortName.toLowerCase()}?`,
      answer: parentProduct.sizes,
    },
    {
      question: `Can UPG quote ${guide.shortName.toLowerCase()} from a name alone?`,
      answer:
        "No. The style name is a starting point. Useful pricing requires the finished dimensions, quantity, material and print direction, finishes, intended use, delivery destination, and any structural or compatibility requirements that apply.",
    },
    {
      question: `What should I send for a ${guide.shortName.toLowerCase()} enquiry?`,
      answer: guide.projectInputs.join("; ") + ".",
    },
    {
      question: `How do I confirm whether ${guide.shortName.toLowerCase()} is the right format?`,
      answer: `${guide.selectionNote} UPG confirms the final structure after project review.`,
    },
  ];

  if (guide.complianceNote) {
    faqItems.push({
      question: "What compatibility or compliance check is required?",
      answer: guide.complianceNote,
    });
  }

  if (guide.buyerGuide) {
    faqItems.push({
      question: guide.buyerGuide.faqQuestion,
      answer: `${guide.buyerGuide.intro} ${guide.buyerGuide.options
        .map((option) => `${option.title}: ${option.description}`)
        .join(" ")}`,
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
        mainEntity: { "@id": `${pageUrl}#service` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: guide.name,
        description: guide.quickAnswer,
        serviceType: `${guide.name} manufacturing`,
        category: guide.family,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: siteConfig.market,
      },
      ...(industryApplications.length > 0
        ? [
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#industry-applications`,
              name: `Industry applications using ${guide.shortName}`,
              numberOfItems: industryApplications.length,
              itemListElement: industryApplications.map((application, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: application.name,
                url: `${SITE_URL}/industries/${application.slug}`,
              })),
            },
          ]
        : []),
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
          {
            "@type": "ListItem",
            position: 3,
            name: guide.shortName,
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
            <Link href="/products" className="hover:text-foreground">
              Products
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/packaging-styles" className="hover:text-foreground">
              Packaging styles
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-foreground">
              {guide.shortName}
            </span>
          </nav>

          <div className="max-w-5xl">
            <div className="eyebrow mb-5">{guide.category}</div>
            <h1 className="display-1 text-balance">{guide.name}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {guide.quickAnswer}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href={quoteHref}
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
              >
                Quote this style
              </Link>
              <Link
                href={`/products/${guide.parentProductSlug}`}
                className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
              >
                View {guide.parentProductName}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {intentRoute ? <OrganicIntentBridge route={intentRoute} /> : null}

      <section className="border-y border-border bg-moss text-primary-foreground">
        <div className="container-editorial grid gap-px bg-white/15 sm:grid-cols-3">
          {[
            ["Product family", guide.family],
            ["Planning MOQ", parentProduct.moq],
            ["Pricing", "Project-specific written quote"],
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

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Selection guidance"
              title="Use the style name as the start of the brief."
              intro={guide.selectionNote}
            />
            <p className="mt-7 text-base leading-relaxed text-muted-foreground">
              Final pricing and production timing are confirmed only after the
              structure, dimensions, material, printing, finishes, quantity,
              proofing requirements, and destination have been reviewed.
            </p>
            {guide.complianceNote ? (
              <div className="mt-7 border-l-2 border-gold bg-cream p-6 text-sm leading-relaxed text-foreground/85">
                <strong className="block text-foreground">Required project check</strong>
                <span className="mt-2 block">{guide.complianceNote}</span>
              </div>
            ) : null}
          </div>

          <aside className="surface-card p-7 lg:col-span-5 lg:p-9">
            <div className="eyebrow mb-5">Exact MOQ guidance</div>
            <p className="text-sm leading-relaxed text-foreground/85">
              {parentProduct.sizes}
            </p>
            <Link
              href={`/get-a-quote?product=${encodeURIComponent(
                guide.family
              )}&style=${encodeURIComponent(guide.quoteStyle)}`}
              className="mt-7 inline-flex border-b border-foreground/20 pb-0.5 text-sm text-foreground"
            >
              Send this format for project review →
            </Link>
            <div className="mt-7 border-t border-border pt-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {sampleKit.note}
              </p>
              <Link
                href={sampleKit.href}
                className="mt-4 inline-flex border-b border-foreground/20 pb-0.5 text-sm text-foreground"
              >
                {sampleKit.label} →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {guide.buyerGuide ? (
        <section className="section-shell bg-cream">
          <div className="container-editorial">
            <SectionHeading
              eyebrow={guide.buyerGuide.eyebrow}
              title={guide.buyerGuide.title}
              intro={guide.buyerGuide.intro}
            />
            <div
              className={`mt-10 grid gap-6 md:grid-cols-2 ${
                guide.buyerGuide.options.length > 2 ? "lg:grid-cols-3" : ""
              }`}
            >
              {guide.buyerGuide.options.map((option) => (
                <article key={option.title} className="surface-card flex flex-col p-7 md:p-9">
                  <h2 className="font-serif text-3xl text-foreground">
                    {option.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {option.description}
                  </p>
                  <Link
                    href={option.href}
                    className="mt-auto inline-flex pt-7 text-sm font-semibold text-foreground"
                  >
                    {option.linkLabel} →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {comparisonGuides.length > 0 ? (
        <section className="section-shell">
          <div className="container-editorial">
            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Dedicated comparison"
                title="See this format inside a side-by-side buying decision."
                intro="Use the full comparison before the final structure, artwork template, or production quote is approved."
              />
              <Link
                href="/compare"
                className="inline-flex border-b border-foreground/20 pb-0.5 text-sm text-foreground"
              >
                Browse all comparisons →
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {comparisonGuides.map((comparison) => (
                <Link
                  key={comparison.slug}
                  href={`/compare/${comparison.slug}`}
                  className="surface-card group flex min-h-56 flex-col p-7 hover:-translate-y-1 hover:shadow-card"
                >
                  <span className="eyebrow">Buyer decision guide</span>
                  <h2 className="mt-5 font-serif text-3xl text-foreground">
                    {comparison.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {comparison.quickAnswer}
                  </p>
                  <span className="mt-auto pt-6 text-sm text-foreground">
                    Compare the two paths →
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
            eyebrow="Quote-ready inputs"
            title="What to send before UPG prices the project."
            intro="A useful enquiry does not need to be perfect, but these inputs reduce avoidable questions and help the correct structure reach review sooner."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {guide.projectInputs.map((item, index) => (
              <div key={item} className="surface-card flex gap-5 p-6">
                <span className="font-serif text-2xl text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-foreground/85">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Available production range"
              title="Materials, print, and finish options."
              intro={`These are the approved core options for the parent ${parentProduct.shortName.toLowerCase()} family. Final suitability is confirmed for this style and project.`}
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            <div className="surface-card p-6">
              <div className="eyebrow mb-4">Materials and structure</div>
              <ul className="space-y-3 text-sm leading-relaxed text-foreground/82">
                {parentProduct.materials.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="surface-card p-6">
              <div className="eyebrow mb-4">Print and finishes</div>
              <ul className="space-y-3 text-sm leading-relaxed text-foreground/82">
                {[...parentProduct.prints, ...parentProduct.finishes].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Buyer questions"
              title={`Plan ${guide.shortName.toLowerCase()} with clear boundaries.`}
              intro="These answers separate a useful planning page from an instant-price or automatic-approval promise."
            />
          </div>
          <div className="surface-card p-6 sm:p-8 lg:col-span-8 lg:p-10">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {industryApplications.length > 0 ? (
        <section
          id="industry-applications"
          className="section-shell scroll-mt-24 bg-stone"
        >
          <div className="container-editorial">
            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Style-led industry paths"
                title={`See where ${guide.shortName.toLowerCase()} is used.`}
                intro="The style page remains the structural source of truth. These industry pages apply that approved format to a specific buyer need and keyword theme without creating a different product specification."
              />
              <Link
                href="/industries"
                className="inline-flex border-b border-foreground/20 pb-0.5 text-sm text-foreground"
              >
                Browse all industries →
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {industryApplications.map((application) => {
                const href = `/industries/${application.slug}`;
                const visual = getIndustryLinkVisual(href);

                return (
                  <Link
                    key={application.slug}
                    href={href}
                    className="surface-card group flex min-h-[24rem] flex-col overflow-hidden hover:-translate-y-1 hover:shadow-card"
                  >
                    <span className="relative aspect-[16/10] overflow-hidden bg-stone">
                      <Image
                        src={visual.src}
                        alt={visual.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </span>
                    <span className="flex flex-1 flex-col p-6">
                      <span className="eyebrow">Industry application</span>
                      <span className="mt-4 font-serif text-2xl text-foreground">
                        {application.shortName}
                      </span>
                      <span className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {application.metaDescription}
                      </span>
                      <span className="mt-auto pt-6 text-sm text-foreground">
                        Review this industry path →
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-shell">
        <div className="container-editorial">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Related real formats"
              title="Compare the closest approved styles."
              intro="Every linked page represents a format inside UPG's current product range."
            />
            <Link
              href="/packaging-styles"
              className="inline-flex border-b border-foreground/20 pb-0.5 text-sm text-foreground"
            >
              Browse the full style library →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/packaging-styles/${item.slug}`}
                className="surface-card group flex min-h-52 flex-col p-6 hover:-translate-y-1 hover:shadow-card"
              >
                <span className="eyebrow">{item.category}</span>
                <h2 className="mt-5 font-serif text-2xl text-foreground">
                  {item.shortName}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.metaDescription}
                </p>
                <span className="mt-auto pt-6 text-sm text-foreground">
                  Review this format →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuoteCta
        title={`Start a ${guide.shortName.toLowerCase()} project.`}
        intro="Send the known product, dimensions, quantity, print, finish, and destination details. UPG will review the structure and prepare project-specific pricing."
        href={quoteHref}
      />
    </>
  );
}
