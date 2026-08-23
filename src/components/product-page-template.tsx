import Image from "next/image";
import Link from "next/link";
import { OrganicIntentBridge } from "@/components/organic-intent-bridge";
import { ProductCard } from "@/components/product-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { getComparisonGuidesByProduct } from "@/data/comparison-guides";
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
  const applicationGuides =
    product.slug === "custom-mailer-boxes" ? mailerApplications : [];
  const comparisonGuides = getComparisonGuidesByProduct(product.slug);
  const intentRoute = getOrganicIntentRoute(`/products/${product.slug}`);

  return (
    <>
      <section className="bg-background">
        <div className="container-editorial pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="eyebrow mb-5">{product.category}</div>
              <h1 className="display-1 text-balance">{product.name}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {product.longSummary}
              </p>
              <div className="mt-8 grid max-w-md grid-cols-2 gap-5 border-t border-border pt-6 text-sm">
                <div>
                  <div className="eyebrow mb-1">Planning MOQ</div>
                  <div className="text-foreground">{product.moq}</div>
                </div>
                <div>
                  <div className="eyebrow mb-1">Production planning</div>
                  <div className="text-foreground">{product.leadTime}</div>
                </div>
              </div>
              <p className="mt-4 max-w-xl text-xs leading-relaxed text-muted-foreground">
                Final pricing and production timing are confirmed after dimensions,
                materials, finishes, proofing, and destination are reviewed.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/get-a-quote?product=${encodeURIComponent(product.family)}`}
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
                >
                  {product.quoteCta}
                </Link>
                <Link
                  href={`/tools/packaging-spec-builder?product=${encodeURIComponent(product.family)}`}
                  className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
                >
                  Check MOQ &amp; Build a Spec
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[5/4] overflow-hidden shadow-lift">
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

      {intentRoute ? <OrganicIntentBridge route={intentRoute} /> : null}

      <section className="section-shell">
        <div className="container-editorial">
          <div className="mb-14">
            <SectionHeading
              eyebrow="Overview"
              title="Built around the product, structure, and brand experience."
              intro={product.summary}
            />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Common applications", value: product.bestFor },
              { label: "Size range", value: product.sizes },
              { label: "Custom sizing", value: product.sizeFlexibility },
              { label: "Material options", value: product.materialOptions },
              { label: "Print options", value: product.printOptions },
              { label: "Finish options", value: product.finishOptions },
            ].map((item) => (
              <div key={item.label} className="surface-card p-6">
                <div className="eyebrow mb-3">{item.label}</div>
                <p className="text-sm leading-relaxed text-foreground/82">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone">
        <div className="container-editorial">
          <div className="mb-10">
            <SectionHeading
              eyebrow="Product views"
              title={`Explore ${product.shortName.toLowerCase()} in more detail.`}
              intro="Representative product renderings show possible structures and configurations. Final construction, color, print, and finish are confirmed for each project."
            />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {product.galleryImages.map((image) => (
              <figure key={image.src} className="overflow-hidden bg-surface shadow-soft">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.02]"
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

      <section className="section-shell bg-cream">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Industries"
              title="Industries and product applications."
              intro="The right structure starts with how the packaging will be filled, presented, stored, and delivered."
            />
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {product.industries.map((industry) => (
                <div key={industry} className="surface-card p-5 text-sm text-foreground">
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Production details"
              title="Materials, print, and finish options."
              intro="The right combination depends on the structure, quantity, and finish requirements. This page shows the core available options."
            />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
            <div className="surface-card p-6">
              <div className="eyebrow mb-4">Materials</div>
              <ul className="space-y-3 text-sm leading-relaxed text-foreground/80">
                {product.materials.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="surface-card p-6">
              <div className="eyebrow mb-4">Print options</div>
              <ul className="space-y-3 text-sm leading-relaxed text-foreground/80">
                {product.prints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="surface-card p-6 sm:col-span-2">
              <div className="eyebrow mb-4">Finishes</div>
              <div className="grid gap-3 sm:grid-cols-2">
                {product.finishes.map((item) => (
                  <div key={item} className="border border-border bg-cream px-4 py-3 text-sm text-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Use cases"
              title="Common ways brands use this format."
              intro="Each use case brings different structural, presentation, and delivery requirements."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {product.useCases.map((item) => (
              <div key={item} className="surface-card p-5 text-sm text-foreground">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {product.styleDecisionGuide ? (
        <section id="style-decision-guide" className="section-shell scroll-mt-28">
          <div className="container-editorial">
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow={product.styleDecisionGuide.eyebrow}
                title={product.styleDecisionGuide.title}
                intro={product.styleDecisionGuide.intro}
              />
              <div className="flex flex-wrap gap-x-5 gap-y-3">
                <Link
                  href="/packaging-styles"
                  className="inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
                >
                  Browse the style library <span>→</span>
                </Link>
                <Link
                  href={`/get-a-quote?product=${encodeURIComponent(
                    product.family
                  )}&style=${encodeURIComponent(
                    "Not sure — recommend"
                  )}&builder_note=${encodeURIComponent(
                    product.styleDecisionGuide.quoteNote
                  )}`}
                  className="inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
                >
                  Ask UPG to review the structure <span>→</span>
                </Link>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {styleDecisionGroups.map((group) => (
                <article key={group.title} className="surface-card flex flex-col p-7 md:p-8">
                  <h2 className="font-serif text-3xl text-foreground">
                    {group.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {group.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-x-5 gap-y-3 pt-7">
                    {group.styles.map((style) => (
                      <Link
                        key={style.slug}
                        href={`/packaging-styles/${style.slug}`}
                        className="border-b border-foreground/20 pb-0.5 text-sm text-foreground"
                      >
                        Review {style.shortName} →
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {styleGuides.length > 0 && !product.styleDecisionGuide ? (
        <section id="available-styles" className="section-shell scroll-mt-28 bg-cream">
          <div className="container-editorial">
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Available styles"
                title={`Explore real ${product.shortName.toLowerCase()} formats.`}
                intro="Each guide covers one available format, the approved planning MOQ, the project inputs needed before pricing, and a prefilled quote path."
              />
              <Link
                href="/packaging-styles"
                className="inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
              >
                Browse the style library <span>→</span>
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {styleGuides.map((guide, index) => (
                <Link
                  key={guide.slug}
                  href={`/packaging-styles/${guide.slug}`}
                  className="surface-card group flex min-h-60 flex-col p-6 hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="flex items-center justify-between">
                    <span className="eyebrow">{guide.category}</span>
                    <span className="font-serif text-2xl text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-serif text-2xl text-foreground">
                    {guide.shortName}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {guide.selectionNote}
                  </p>
                  <span className="mt-auto pt-6 text-sm text-foreground">
                    Review this format →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {applicationGuides.length > 0 ? (
        <section className="section-shell bg-cream">
          <div className="container-editorial">
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Corrugated mailer applications"
                title="Choose the mailer path that matches the program."
                intro="All four guides stay inside UPG's custom ear-lock corrugated mailer offer. Choose the closest program first; the final structure, insert, print, quantity, and destination remain subject to project review."
              />
              <Link
                href="/get-a-quote?product=Mailer%20Boxes&style=Not%20sure%20%E2%80%94%20recommend&builder_note=Please%20review%20the%20program%20and%20recommend%20the%20right%20ear-lock%20mailer%20path."
                className="inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
              >
                Start a mailer project <span>→</span>
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {applicationGuides.map((application, index) => (
                <Link
                  key={application.slug}
                  href={`/applications/${application.slug}`}
                  className="surface-card group flex min-h-64 flex-col p-6 hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="eyebrow">Guide</span>
                    <span className="font-serif text-2xl text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-foreground">
                    {application.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {application.selectionNote}
                  </p>
                  <span className="mt-auto pt-6 text-sm text-foreground">
                    Compare this application{" "}
                    <span className="inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {comparisonGuides.length > 0 ? (
        <section className="section-shell">
          <div className="container-editorial">
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Buyer decision guides"
                title={`Compare ${product.shortName.toLowerCase()} with the closest alternatives.`}
                intro="These pages answer distinct format-selection searches and carry the selected route into a prefilled project enquiry."
              />
              <Link
                href="/compare"
                className="inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
              >
                Browse all comparisons <span>→</span>
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {comparisonGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/compare/${guide.slug}`}
                  className="surface-card group flex min-h-60 flex-col p-6 hover:-translate-y-1 hover:shadow-card"
                >
                  <span className="eyebrow">Compare</span>
                  <h3 className="mt-6 font-serif text-2xl text-foreground">
                    {guide.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {guide.metaDescription}
                  </p>
                  <span className="mt-auto pt-6 text-sm text-foreground">
                    Review the buying decision →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {industryGuides.length > 0 ? (
        <section className="section-shell bg-stone">
          <div className="container-editorial">
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Industry and product guides"
                title={`Explore ${product.shortName.toLowerCase()} by buyer intent.`}
                intro="Each page starts from a real product or industry brief, keeps technical approval inside project review, and carries the selected application into the enquiry form."
              />
              <Link
                href="/industries"
                className="inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
              >
                Browse all guides <span>→</span>
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {industryGuides.map((guide, index) => (
                <Link
                  key={guide.slug}
                  href={`/industries/${guide.slug}`}
                  className="surface-card group flex min-h-64 flex-col p-6 hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="flex items-center justify-between">
                    <span className="eyebrow">Application guide</span>
                    <span className="font-serif text-2xl text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-serif text-2xl text-foreground">
                    {guide.shortName}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {guide.metaDescription}
                  </p>
                  <span className="mt-auto pt-6 text-sm text-foreground">
                    Read guide{" "}
                    <span className="inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Artwork & proofing"
              title="What we need before production."
              intro="Clear files and structure notes make specification, proofing, and production more efficient."
            />
          </div>
          <div className="grid gap-6 lg:col-span-8">
            <div className="surface-card p-6">
              <div className="eyebrow mb-3">Artwork requirements</div>
              <p className="text-sm leading-relaxed text-foreground/82">
                {product.artworkRequirements}
              </p>
            </div>
            <div className="surface-card p-6">
              <div className="eyebrow mb-3">Important note</div>
              <p className="text-sm leading-relaxed text-foreground/82">
                {product.screeningNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Product questions"
              title={`Plan ${product.shortName.toLowerCase()} with clear facts.`}
              intro="Concise answers cover the planning minimum, best-fit applications, quote inputs, and the checks required before production."
            />
          </div>
          <div className="surface-card p-6 sm:p-8 lg:col-span-8 lg:p-10">
            <FaqAccordion items={productFaqs} />
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Related products"
              title="Other packaging formats worth comparing."
              intro="Compare related formats before confirming the final specification."
            />
            <Link
              href="/products"
              className="inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
            >
              See all products <span>→</span>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((relatedProduct) => (
              <ProductCard key={relatedProduct.slug} product={relatedProduct} />
            ))}
          </div>
        </div>
      </section>

      <QuoteCta
        title={`Start your ${product.name.toLowerCase()} project.`}
        intro="Send the product type, quantity, dimensions, and delivery destination. We will develop the structure, specification, and pricing."
        href={`/get-a-quote?product=${encodeURIComponent(product.family)}`}
      />
    </>
  );
}
