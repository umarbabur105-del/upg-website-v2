import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqAccordion } from "@/components/faq-accordion";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import {
  getMailerApplicationBySlug,
  mailerApplications,
} from "@/data/mailer-applications";
import { siteConfig } from "@/data/site";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const applicationHeadingClassName =
  "application-heading text-3xl font-medium leading-[1.08] tracking-[-0.035em] text-balance md:text-[2.75rem]";

export function generateStaticParams() {
  return mailerApplications.map((application) => ({
    slug: application.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const application = getMailerApplicationBySlug(slug);

  if (!application) return {};

  return createPageMetadata({
    title: application.title,
    description: application.metaDescription,
    path: `/applications/${application.slug}`,
    keywords: application.keywords,
  });
}

export default async function MailerApplicationPage({ params }: PageProps) {
  const { slug } = await params;
  const application = getMailerApplicationBySlug(slug);

  if (!application) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/applications/${application.slug}`;
  const relatedApplications = mailerApplications
    .filter((item) => item.slug !== application.slug)
    .slice(0, 3);

  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: application.title,
        description: application.metaDescription,
        dateModified: application.reviewedAt,
        mainEntity: { "@id": `${pageUrl}#service` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: application.title,
        description: application.heroDescription,
        url: pageUrl,
        serviceType: "Custom corrugated ear-lock mailer box manufacturing",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "Worldwide",
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
            name: "Corrugated Mailer Boxes",
            item: `${SITE_URL}/products/custom-mailer-boxes`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: application.title,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: application.faqs.map((item) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <section className="bg-background">
        <div className="container-editorial pt-10 pb-20 md:pt-14 md:pb-28">
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
          >
            <Link href="/products" className="hover:text-foreground">
              Products
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/products/custom-mailer-boxes"
              className="hover:text-foreground"
            >
              Corrugated mailer boxes
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-foreground">
              {application.shortName}
            </span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="eyebrow mb-5">Mailer application guide</div>
              <h1 className="application-heading text-[clamp(2.5rem,4.5vw,4.25rem)] font-medium leading-[1.04] tracking-[-0.045em] text-balance">
                {application.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {application.heroDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/get-a-quote?product=Mailer%20Boxes"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
                >
                  Start a mailer project
                </Link>
                <Link
                  href="/products/custom-mailer-boxes"
                  className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
                >
                  View mailer specifications
                </Link>
              </div>
            </div>

            <figure className="lg:col-span-6">
              <div className="relative aspect-[5/4] overflow-hidden bg-stone shadow-lift">
                <Image
                  src={application.image.src}
                  alt={application.image.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Representative packaging concept. Final construction, color, print,
                and finish are confirmed for each project.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-5">Quick answer</div>
            <h2 className={applicationHeadingClassName}>
              What buyers should know first.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/82">
              {application.quickAnswer}
            </p>
          </div>
          <aside className="surface-card p-6 md:p-8 lg:col-span-5">
            <div className="eyebrow mb-4">Planning MOQ by finished size</div>
            <dl className="space-y-5 text-sm">
              <div className="flex items-start justify-between gap-5 border-b border-border pb-5">
                <dt className="text-muted-foreground">Every dimension 5 in or less</dt>
                <dd className="font-semibold text-foreground">1,000 units</dd>
              </div>
              <div className="flex items-start justify-between gap-5 border-b border-border pb-5">
                <dt className="text-muted-foreground">
                  Largest dimension over 5 through 10 in
                </dt>
                <dd className="font-semibold text-foreground">500 units</dd>
              </div>
              <div className="flex items-start justify-between gap-5">
                <dt className="text-muted-foreground">Largest dimension over 10 in</dt>
                <dd className="font-semibold text-foreground">250 units</dd>
              </div>
            </dl>
            <p className="mt-6 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
              Final dimensions remain subject to structural feasibility. Production
              timing is confirmed after specification review.
            </p>
          </aside>
        </div>
      </section>

      <section className="section-shell bg-stone">
        <div className="container-editorial">
          <div className="mb-12">
            <SectionHeading
              eyebrow="Best fit"
              title={`Where ${application.shortName.toLowerCase()} fit best.`}
              intro="Start with the campaign or program goal, then develop the mailer around the products, presentation, quantity, and destination."
              headingClassName={applicationHeadingClassName}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {application.bestFor.map((item, index) => (
              <div key={item} className="surface-card p-6">
                <div className="mb-5 font-serif text-2xl text-gold">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="text-sm leading-relaxed text-foreground/85">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Planning priorities"
              title="Shape the brief before the artwork."
              intro="A clear product and presentation plan helps the structure, insert, and artwork move in the same direction."
              headingClassName={applicationHeadingClassName}
            />
          </div>
          <div className="grid gap-6 lg:col-span-8">
            {application.planningPriorities.map((priority) => (
              <div key={priority.title} className="surface-card p-6 md:p-8">
                <h3 className="font-serif text-2xl text-foreground">
                  {priority.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {priority.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Presentation options"
              title="Coordinate the box, print, and product arrangement."
              intro="These options are reviewed against the approved ear-lock structure, project quantity, and presentation goal."
              headingClassName={applicationHeadingClassName}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {application.presentationOptions.map((option) => (
              <div key={option} className="surface-card p-6 text-sm leading-relaxed text-foreground/85">
                {option}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Project brief"
              title="What to send for a useful first review."
              intro="You do not need a finished specification to start. Share the facts and files already available, and UPG will review the next structural and commercial steps."
              headingClassName={applicationHeadingClassName}
            />
          </div>
          <div className="surface-card p-6 md:p-8 lg:col-span-7">
            <ol className="space-y-5">
              {application.projectInputs.map((input, index) => (
                <li key={input} className="flex gap-4 border-b border-border pb-5 last:border-0 last:pb-0">
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

      <section className="bg-gradient-moss text-primary-foreground">
        <div className="container-editorial py-16 md:py-20">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <div className="eyebrow mb-4 text-gold-soft">Product scope</div>
              <h2 className={applicationHeadingClassName}>
                Ear-lock mailers, clearly qualified.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-primary-foreground/72">
                {siteConfig.scopeBoundary} Delivery and transport requirements are
                reviewed for each project before final specifications, pricing, and
                timing are confirmed.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                href="/products/custom-mailer-boxes"
                className="inline-flex rounded-full border border-primary-foreground/20 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-white/6"
              >
                Review the mailer product
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Common questions"
              title={`Plan ${application.shortName.toLowerCase()} with clear facts.`}
              intro="These answers cover structure, minimum quantity, project inputs, and the boundaries that matter before production."
              headingClassName={applicationHeadingClassName}
            />
            {application.relatedCosmeticsGuide ? (
              <Link
                href={application.relatedCosmeticsGuide.href}
                className="mt-7 inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
              >
                {application.relatedCosmeticsGuide.label} <span>→</span>
              </Link>
            ) : null}
          </div>
          <div className="surface-card p-6 sm:p-8 lg:col-span-8 lg:p-10">
            <FaqAccordion items={application.faqs} />
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Related applications"
              title="Compare other ways to use an ear-lock mailer."
              intro="Each guide focuses on a different campaign, program, or presentation brief while staying within the same approved mailer product family."
              headingClassName={applicationHeadingClassName}
            />
            <Link
              href="/products/custom-mailer-boxes"
              className="inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
            >
              Mailer product overview <span>→</span>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedApplications.map((item) => (
              <Link
                key={item.slug}
                href={`/applications/${item.slug}`}
                className="surface-card group block p-6 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="eyebrow mb-4">Application guide</div>
                <h3 className="font-serif text-2xl text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.metaDescription}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm text-foreground">
                  Read guide <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuoteCta
        title={`Start your ${application.projectName} project.`}
        intro="Share the product dimensions, quantity, intended arrangement, delivery country, and target date. UPG will review the structure, specification, pricing, and production plan."
      />
    </>
  );
}
