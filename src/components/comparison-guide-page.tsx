import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import {
  getRelatedComparisonGuides,
  type ComparisonGuide,
  type ComparisonOption,
} from "@/data/comparison-guides";
import { SITE_URL } from "@/lib/seo";

interface ComparisonGuidePageProps {
  guide: ComparisonGuide;
}

function OptionCard({ option, number }: { option: ComparisonOption; number: string }) {
  return (
    <article className="surface-card flex h-full flex-col p-7 md:p-9">
      <div className="flex items-center justify-between gap-4">
        <span className="eyebrow">Option {number}</span>
        <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-dark">
          {option.label}
        </span>
      </div>
      <h2 className="mt-7 font-serif text-3xl text-foreground md:text-4xl">
        {option.title}
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {option.summary}
      </p>
      <div className="mt-7 rounded-2xl bg-cream p-5">
        <div className="eyebrow mb-2">Planning MOQ</div>
        <p className="font-serif text-2xl text-foreground">{option.planningMoq}</p>
      </div>
      <div className="mt-7">
        <div className="eyebrow mb-4">Choose this path when</div>
        <ul className="space-y-3 text-sm leading-relaxed text-foreground/82">
          {option.chooseWhen.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-gold" aria-hidden="true">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      {option.availabilityNote ? (
        <div className="mt-7 border-l-2 border-gold bg-stone p-5 text-sm leading-relaxed text-foreground/85">
          {option.availabilityNote}
        </div>
      ) : null}
      <div className="mt-auto flex flex-wrap gap-3 pt-8">
        {option.quoteHref ? (
          <Link
            href={option.quoteHref}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
          >
            Start this path
          </Link>
        ) : null}
        {option.href ? (
          <Link
            href={option.href}
            className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-stone"
          >
            Review details
          </Link>
        ) : null}
      </div>
    </article>
  );
}
export function ComparisonGuidePage({ guide }: ComparisonGuidePageProps) {
  const related = getRelatedComparisonGuides(guide);
  const pageUrl = `${SITE_URL}/compare/${guide.slug}`;
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
        mainEntity: { "@id": `${pageUrl}#comparison` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#comparison`,
        name: guide.name,
        numberOfItems: 2,
        itemListElement: [guide.first, guide.second].map((option, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: option.title,
          ...(option.href ? { url: `${SITE_URL}${option.href}` } : {}),
          description: option.summary,
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
            item: `${SITE_URL}/compare`,
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
        mainEntity: guide.faqs.map((item) => ({
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

  const defaultQuoteHref = guide.first.quoteHref ?? "/get-a-quote";

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
            <Link href="/compare" className="hover:text-foreground">
              Compare
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-foreground">
              {guide.shortName}
            </span>
          </nav>

          <div className="max-w-5xl">
            <div className="eyebrow mb-5">{guide.eyebrow}</div>
            <h1 className="display-1 text-balance">{guide.heroTitle}</h1>
            <p className="mt-7 max-w-4xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {guide.heroDescription}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#comparison-table"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
              >
                Compare the decision
              </a>
              <Link
                href="/tools/packaging-format-finder"
                className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
              >
                Use the Format Finder
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-moss text-primary-foreground">
        <div className="container-editorial grid gap-px bg-white/15 sm:grid-cols-3">
          {[
            ["Decision", guide.shortName],
            ["Pricing", "Project-specific written quote"],
            ["Status", `Reviewed ${guide.reviewedAt}`],
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
          <div className="lg:col-span-8">
            <SectionHeading
              eyebrow="Quick answer"
              title="Choose the purchasing path before final artwork."
              intro={guide.quickAnswer}
            />
          </div>
          <aside className="surface-card p-7 lg:col-span-4 lg:p-9">
            <div className="eyebrow mb-4">Comparison boundary</div>
            <p className="text-sm leading-relaxed text-foreground/85">
              {guide.scopeNote}
            </p>
          </aside>
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Two clear routes"
            title="Compare the actual UPG paths."
            intro="Each option carries the correct product or style into a prefilled enquiry. Final structure and production details still require review."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <OptionCard option={guide.first} number="01" />
            <OptionCard option={guide.second} number="02" />
          </div>
        </div>
      </section>

      <section id="comparison-table" className="section-shell scroll-mt-28">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Side-by-side comparison"
            title="The factors that change the brief."
            intro="Use this table to organize the first decision. It is not a substitute for a dieline, compatibility review, or written production quote."
          />
          <div className="mt-10 grid gap-4 md:hidden">
            {guide.rows.map((row) => (
              <article key={row.criterion} className="border border-border bg-surface">
                <h3 className="bg-moss px-5 py-4 text-sm font-semibold text-primary-foreground">
                  {row.criterion}
                </h3>
                <div className="p-5">
                  <div className="eyebrow mb-2">{guide.first.title}</div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {row.first}
                  </p>
                </div>
                <div className="border-t border-border p-5">
                  <div className="eyebrow mb-2">{guide.second.title}</div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {row.second}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 hidden overflow-x-auto border border-border bg-surface md:block">
            <table className="w-full min-w-[840px] border-collapse text-left text-sm">
              <thead className="bg-moss text-primary-foreground">
                <tr>
                  <th className="w-1/5 px-5 py-4 font-semibold">Decision factor</th>
                  <th className="w-2/5 px-5 py-4 font-semibold">{guide.first.title}</th>
                  <th className="w-2/5 px-5 py-4 font-semibold">{guide.second.title}</th>
                </tr>
              </thead>
              <tbody>
                {guide.rows.map((row) => (
                  <tr key={row.criterion} className="border-t border-border first:border-t-0">
                    <th className="bg-cream/60 px-5 py-5 align-top font-semibold text-foreground">
                      {row.criterion}
                    </th>
                    <td className="px-5 py-5 align-top leading-relaxed text-muted-foreground">
                      {row.first}
                    </td>
                    <td className="px-5 py-5 align-top leading-relaxed text-muted-foreground">
                      {row.second}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone">
        <div className="container-editorial grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Decision checklist"
              title="Answer the questions that separate the two routes."
              intro="These questions are designed to move an enquiry into the correct product family before detailed pricing begins."
            />
          </div>
          <div className="grid gap-5 lg:col-span-8">
            {guide.decisionQuestions.map((question, index) => (
              <article key={question.title} className="surface-card flex gap-5 p-6 md:p-8">
                <span className="font-serif text-3xl text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-serif text-2xl text-foreground">
                    {question.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {question.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Quote-ready comparison brief"
              title="Send enough detail for a useful human review."
              intro="Unknown items can remain open. Clear product facts and the intended use are more useful than a guessed structure."
            />
            <Link
              href={defaultQuoteHref}
              className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
            >
              Start with option one
            </Link>
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

      <section className="section-shell bg-cream">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Buyer questions"
              title="Comparison answers with clear limits."
              intro="These answers are included in the page's machine-readable FAQ data as well as the visible buyer guide."
            />
          </div>
          <div className="surface-card p-6 sm:p-8 lg:col-span-8 lg:p-10">
            <FaqAccordion items={guide.faqs} />
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section-shell">
          <div className="container-editorial">
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Related buying decisions"
                title="Continue through the closest comparison paths."
                intro="Every guide stays inside UPG's current product range or clearly filters an unavailable product."
              />
              <Link
                href="/compare"
                className="inline-flex border-b border-foreground/20 pb-0.5 text-sm text-foreground"
              >
                View all comparisons →
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/compare/${item.slug}`}
                  className="surface-card group flex min-h-56 flex-col p-6 hover:-translate-y-1 hover:shadow-card"
                >
                  <span className="eyebrow">Decision guide</span>
                  <h2 className="mt-5 font-serif text-2xl text-foreground">
                    {item.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.quickAnswer}
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

      <QuoteCta
        title="Still deciding between the two packaging routes?"
        intro="Send the product, dimensions, intended use, quantity, artwork status, and destination. UPG will review the brief and confirm the correct starting structure."
        href={defaultQuoteHref}
      />
    </>
  );
}
