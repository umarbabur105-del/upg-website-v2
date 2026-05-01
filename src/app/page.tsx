import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { FaqAccordion } from "@/components/faq-accordion";
import {
  cosmeticsSolutions,
  finishFeatures,
  howItWorksSteps,
  industries,
  sampleHighlights,
  trustPoints,
} from "@/data/catalog";
import { faqItems } from "@/data/faq";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-warm overflow-hidden">
        <div className="container-editorial pt-12 pb-20 md:pt-20 md:pb-28">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="eyebrow mb-6">Custom Packaging • US & Canada</div>
              <h1 className="display-1 text-balance">
                Premium packaging
                <br />
                for beauty brands
                <span className="text-gold"> built to be opened.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">
                Custom rigid boxes, folding cartons, mailers, mylar pouches, and
                paper cups. Cosmetics leads the buying journey, but every
                day-one format is visible from launch.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/get-a-quote"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
                >
                  Get a Quote
                </Link>
                <Link
                  href="/products"
                  className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
                >
                  View Products
                </Link>
              </div>
              {siteConfig.whatsappNumber ? (
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  Or start a conversation on WhatsApp
                </a>
              ) : null}
            </div>

            <div className="relative lg:col-span-6">
              <div className="relative aspect-[5/4] overflow-hidden shadow-lift">
                <Image
                  src="/images/redesign/hero/hero-cosmetics.jpg"
                  alt="Premium cosmetics packaging arrangement"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-1 hidden max-w-xs border border-border bg-cream p-5 shadow-soft md:block">
                <div className="eyebrow mb-2">Cosmetics-first</div>
                <div className="font-serif text-lg leading-snug text-foreground">
                  Engineered for skincare, serums, lipstick, perfume, and PR
                  launches.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-cream">
        <div className="container-editorial py-7">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5 md:gap-4">
            {trustPoints.map((point) => (
              <div key={point.label} className="text-sm text-foreground">
                {point.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Cosmetics-first"
              title="Built around how beauty brands actually launch."
              intro="From a single hero serum to a full PR seeding round, the strongest buying path is designed around cosmetics."
            />
            <div className="mt-8">
              <Link
                href="/cosmetics"
                className="inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
              >
                Explore the cosmetics hub <span>→</span>
              </Link>
            </div>
          </div>

          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:col-span-8">
            {cosmeticsSolutions.map((solution) => (
              <Link
                key={solution.href}
                href={solution.href}
                className="group block bg-surface p-7 hover:bg-cream"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl text-foreground">
                      {solution.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {solution.note}
                    </p>
                  </div>
                  <span className="text-muted-foreground transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone">
        <div className="container-editorial">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="The product range"
              title="Five formats, every one production-ready."
              intro="Cosmetics is the primary buying journey, but every day-one format is visible from launch and ready to quote."
            />
            <Link
              href="/products"
              className="inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
            >
              See all products <span>→</span>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial">
          <div className="mb-14 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Capabilities"
                title="The finish detail that separates a box from a brand."
                intro="Foil, soft-touch, deboss, spot UV, custom inserts, and interior print. The details that make packaging feel premium and product-ready."
              />
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <Link
                href="/materials-finishes"
                className="inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
              >
                Browse materials & finishes <span>→</span>
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {finishFeatures.map((finish) => (
              <div key={finish.title} className="group">
                <div className="relative aspect-[5/4] overflow-hidden bg-stone">
                  <Image
                    src={finish.image}
                    alt={finish.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl text-foreground">
                      {finish.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {finish.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial">
          <div className="mb-14">
            <SectionHeading
              eyebrow="How it works"
              title="A quote-led process with fewer surprises."
              intro="Built for fast outreach follow-up, consultative quoting, and structured production planning."
            />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((step) => (
              <div key={step.number}>
                <div className="font-serif text-5xl text-gold">{step.number}</div>
                <h3 className="mt-4 font-serif text-2xl text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Samples & portfolio"
              title="Proof points you can actually send to prospects."
              intro="Visual packaging references for skincare, gifting, PR kits, and launch-led presentation."
            />
            <Link
              href="/samples"
              className="inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
            >
              View samples <span>→</span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {sampleHighlights.map((sample) => (
              <div key={sample.title} className="overflow-hidden border border-border bg-surface">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={sample.image}
                    alt={sample.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <div className="eyebrow mb-3">{sample.category}</div>
                  <h3 className="font-serif text-2xl text-foreground">
                    {sample.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {sample.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone">
        <div className="container-editorial">
          <div className="mb-14">
            <SectionHeading
              eyebrow="Industries"
              title="Day-one capability beyond cosmetics."
              intro="Cosmetics leads the strategy, but the site still makes the full product range and adjacent use cases clear from launch."
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {industries.map((industry) => (
              <div key={industry.slug} className="surface-card p-7">
                <div className="eyebrow mb-3">
                  {industry.slug === "cosmetic-packaging" ? "Primary focus" : "Secondary industry"}
                </div>
                <h3 className="font-serif text-2xl text-foreground">
                  {industry.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {industry.description}
                </p>
                <Link
                  href={industry.slug === "cosmetic-packaging" ? "/cosmetics" : "/industries"}
                  className="mt-5 inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
                >
                  Explore <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial max-w-4xl">
          <SectionHeading
            eyebrow="Common questions"
            title="Fast answers before you request a quote."
            intro="Quick answers on MOQ, lead time, cosmetics packaging, samples, and how the process works."
          />
          <div className="mt-10">
            <FaqAccordion items={faqItems.slice(0, 6)} />
          </div>
          <div className="mt-8">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
            >
              View all frequently asked questions <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <QuoteCta
        title="Need a packaging partner who can quote quickly and guide the spec?"
        intro="Use the site as a starting point, then bring the project into a real quote conversation. We will help you choose the right format, finish, and next step."
      />
    </>
  );
}
