import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { OrganicIntentBridge } from "@/components/organic-intent-bridge";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { getComparisonGuidesByProduct } from "@/data/comparison-guides";
import { getIndustryHubsByProduct } from "@/data/industry-hubs";
import { getIndustryGuidesByProduct } from "@/data/industry-guides";
import { mailerApplications } from "@/data/mailer-applications";
import { getOrganicIntentRoute } from "@/data/organic-intent-routes";
import { getProductStylesByParent } from "@/data/product-styles";
import {
  getProductFaqs,
  getRelatedProducts,
  type Product,
} from "@/data/products";

interface ProductPageTemplateProps {
  product: Product;
}

const disclosureClass =
  "group scroll-mt-24 border border-border bg-surface px-5 py-1 sm:px-6";
const summaryClass =
  "flex cursor-pointer list-none items-center justify-between gap-5 py-5 marker:content-none";

export function ProductPageTemplate({ product }: ProductPageTemplateProps) {
  const related = getRelatedProducts(product.slug);
  const productFaqs = getProductFaqs(product);
  const styleGuides = getProductStylesByParent(product.slug);
  const styleDecisionGroups = (product.styleDecisionGuide?.groups ?? []).map(
    (group) => ({
      ...group,
      styles: group.styleSlugs
        .map((slug) => styleGuides.find((guide) => guide.slug === slug))
        .filter((guide) => guide !== undefined),
    })
  );
  const industryGuides = getIndustryGuidesByProduct(product.slug);
  const industryHubs = getIndustryHubsByProduct(product.slug);
  const applicationGuides =
    product.slug === "custom-mailer-boxes" ? mailerApplications : [];
  const comparisonGuides = getComparisonGuidesByProduct(product.slug);
  const intentRoute = getOrganicIntentRoute(`/products/${product.slug}`);

  return (
    <>
      <section className="bg-background">
        <div className="container-editorial py-10 md:py-14 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="eyebrow mb-5">{product.category}</div>
              <h1 className="text-5xl leading-[0.98] font-light tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl">
                {product.name}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {product.longSummary}
              </p>

              <div className="mt-7 grid max-w-2xl gap-5 border-y border-border py-5 text-sm sm:grid-cols-2">
                <div>
                  <div className="eyebrow mb-1">Planning MOQ</div>
                  <div className="text-foreground">{product.moq}</div>
                </div>
                <div>
                  <div className="eyebrow mb-1">Best for</div>
                  <div className="text-foreground">{product.bestFor}</div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/get-a-quote?product=${encodeURIComponent(product.family)}`}
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
                >
                  Get a Quote
                </Link>
                <Link
                  href="#product-options"
                  className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
                >
                  See Options
                </Link>
                <Link
                  href="/custom-packaging-pricing"
                  className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
                >
                  Pricing &amp; MOQ Guide
                </Link>
              </div>
              {product.reviewedAt ? (
                <p className="mt-5 text-xs text-muted-foreground">
                  Product facts reviewed {product.reviewedAt}. Final written
                  project terms control pricing and production.
                </p>
              ) : null}
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[5/4] overflow-hidden border border-border bg-stone shadow-soft">
                <Image
                  src={product.heroImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-cream">
        <div className="container-editorial grid gap-6 py-6 sm:grid-cols-3">
          <div>
            <div className="eyebrow mb-2">Custom made</div>
            <p className="text-sm text-foreground">Sizes and specifications reviewed per project</p>
          </div>
          <div>
            <div className="eyebrow mb-2">Worldwide</div>
            <p className="text-sm text-foreground">Production and delivery planning</p>
          </div>
          <div>
            <div className="eyebrow mb-2">You can start early</div>
            <p className="text-sm text-foreground">Incomplete briefs are welcome</p>
          </div>
        </div>
      </section>

      <section id="product-options" className="scroll-mt-24 py-16 md:py-20">
        <div className="container-editorial">
          <div className="mb-10">
            <SectionHeading
              eyebrow="Product options"
              title="What can be customized."
              intro={product.summary}
              headingClassName="text-4xl font-light tracking-[-0.03em] text-balance md:text-5xl"
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { label: "Structure and size", value: product.sizes },
              { label: "Materials", value: product.materialOptions },
              { label: "Printing", value: product.printOptions },
              { label: "Finishes", value: product.finishOptions },
            ].map((item) => (
              <div key={item.label} className="border-t border-border pt-5">
                <h2 className="text-lg font-semibold text-foreground">
                  {item.label}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <div className="eyebrow mb-4">Common uses</div>
            <div className="flex flex-wrap gap-2">
              {product.useCases.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-surface px-3 py-2 text-xs text-foreground/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section className="border-y border-border bg-cream py-14 md:py-16">
        <div className="container-editorial">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="eyebrow mb-3">Product views</div>
              <h2 className="text-3xl font-light tracking-[-0.025em] text-foreground sm:text-4xl">
                See the format from more than one angle.
              </h2>
            </div>
            <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">
              Representative concepts. Final construction, color, print, and
              finish are confirmed for each project.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {product.galleryImages.map((image) => (
              <figure key={image.src} className="overflow-hidden border border-border bg-surface">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <figcaption className="border-t border-border px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                  {image.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-editorial max-w-5xl">
          <SectionHeading
            eyebrow="More guidance, when you need it"
            title="Open only the details relevant to your project."
            intro="Structure guides, applications, comparisons, and artwork notes stay available without blocking the quote path."
            headingClassName="text-4xl font-light tracking-[-0.03em] text-balance md:text-5xl"
          />

          <div className="mt-9 space-y-3">
            {product.styleDecisionGuide ? (
              <details id="style-decision-guide" className={disclosureClass}>
                <summary className={summaryClass}>
                  <div>
                    <div className="eyebrow mb-2">Structure selection</div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {product.styleDecisionGuide.title}
                    </h2>
                  </div>
                  <span className="text-2xl text-gold-dark transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pb-5 text-sm leading-relaxed text-muted-foreground">
                  {product.styleDecisionGuide.intro}
                </p>
                <div className="grid gap-5 border-t border-border py-6 md:grid-cols-3">
                  {styleDecisionGroups.map((group) => (
                    <div key={group.title}>
                      <h3 className="text-lg font-semibold text-foreground">
                        {group.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {group.description}
                      </p>
                      <div className="mt-3 flex flex-col items-start gap-2">
                        {group.styles.map((style) => (
                          <Link
                            key={style.slug}
                            href={`/packaging-styles/${style.slug}`}
                            className="border-b border-foreground/20 pb-0.5 text-sm text-foreground"
                          >
                            {style.shortName} →
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            ) : styleGuides.length > 0 ? (
              <details id="available-styles" className={disclosureClass}>
                <summary className={summaryClass}>
                  <div>
                    <div className="eyebrow mb-2">Available formats</div>
                    <h2 className="text-xl font-semibold text-foreground">
                      View {product.shortName.toLowerCase()} styles
                    </h2>
                  </div>
                  <span className="text-2xl text-gold-dark transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="grid gap-3 border-t border-border py-6 sm:grid-cols-2">
                  {styleGuides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/packaging-styles/${guide.slug}`}
                      className="border-b border-border py-3 text-sm text-foreground"
                    >
                      {guide.shortName} →
                    </Link>
                  ))}
                </div>
              </details>
            ) : null}

            {applicationGuides.length > 0 ? (
              <details className={disclosureClass}>
                <summary className={summaryClass}>
                  <div>
                    <div className="eyebrow mb-2">Applications</div>
                    <h2 className="text-xl font-semibold text-foreground">
                      PR, influencer, subscription, and ecommerce mailers
                    </h2>
                  </div>
                  <span className="text-2xl text-gold-dark transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="grid gap-3 border-t border-border py-6 sm:grid-cols-2">
                  {applicationGuides.map((application) => (
                    <Link
                      key={application.slug}
                      href={`/applications/${application.slug}`}
                      className="border-b border-border py-3 text-sm text-foreground"
                    >
                      {application.title} →
                    </Link>
                  ))}
                </div>
              </details>
            ) : null}

            {comparisonGuides.length > 0 ? (
              <details className={disclosureClass}>
                <summary className={summaryClass}>
                  <div>
                    <div className="eyebrow mb-2">Comparisons</div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Compare with the closest packaging alternatives
                    </h2>
                  </div>
                  <span className="text-2xl text-gold-dark transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="grid gap-3 border-t border-border py-6 sm:grid-cols-2">
                  {comparisonGuides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/compare/${guide.slug}`}
                      className="border-b border-border py-3 text-sm text-foreground"
                    >
                      {guide.name} →
                    </Link>
                  ))}
                </div>
              </details>
            ) : null}

            {industryHubs.length > 0 || industryGuides.length > 0 ? (
              <details className={disclosureClass}>
                <summary className={summaryClass}>
                  <div>
                    <div className="eyebrow mb-2">Industry uses</div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Packaging guides by product and industry
                    </h2>
                  </div>
                  <span className="text-2xl text-gold-dark transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="grid gap-3 border-t border-border py-6 sm:grid-cols-2">
                  {industryHubs.map((hub) => (
                    <Link
                      key={hub.slug}
                      href={`/industries/${hub.slug}`}
                      className="border-b border-border py-3 text-sm font-semibold text-foreground"
                    >
                      {hub.shortName} packaging overview →
                    </Link>
                  ))}
                  {industryGuides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/industries/${guide.slug}`}
                      className="border-b border-border py-3 text-sm text-foreground"
                    >
                      {guide.shortName} →
                    </Link>
                  ))}
                </div>
              </details>
            ) : null}

            <details className={disclosureClass}>
              <summary className={summaryClass}>
                <div>
                  <div className="eyebrow mb-2">Artwork and production</div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Files and details needed before manufacturing
                  </h2>
                </div>
                <span className="text-2xl text-gold-dark transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="grid gap-5 border-t border-border py-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-base font-semibold text-foreground">Artwork</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {product.artworkRequirements}
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Project review</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {product.screeningNote}
                  </p>
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      {intentRoute ? <OrganicIntentBridge route={intentRoute} compact /> : null}

      <section className="py-16 md:py-20">
        <div className="container-editorial grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Common questions"
              title={`Plan ${product.shortName.toLowerCase()} with clear facts.`}
              intro="Quick answers cover minimum quantities, product fit, and the information needed for a quote."
              headingClassName="text-4xl font-light tracking-[-0.03em] text-balance"
            />
          </div>
          <div className="surface-card p-6 sm:p-8 lg:col-span-8">
            <FaqAccordion items={productFaqs} />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-cream py-8">
        <div className="container-editorial flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="eyebrow mb-2">Other packaging formats</div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {related.map((relatedProduct) => (
                <Link
                  key={relatedProduct.slug}
                  href={`/products/${relatedProduct.slug}`}
                  className="border-b border-foreground/20 pb-0.5 text-sm text-foreground"
                >
                  {relatedProduct.shortName}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/products" className="text-sm text-foreground">
            View all five products →
          </Link>
        </div>
      </section>

      <QuoteCta
        title={`Request a quote for ${product.name.toLowerCase()}.`}
        intro="Start with the product family, quantity, and your contact details. Technical specifications can follow after the first review."
        href={`/get-a-quote?product=${encodeURIComponent(product.family)}`}
      />
    </>
  );
}
