import { HeroSection } from "@/components/hero-section";
import { Section, SectionHeading, SectionSubheading } from "@/components/section";
import { ProductCard } from "@/components/product-card";
import { CtaBanner } from "@/components/cta-banner";
import { FaqAccordion } from "@/components/faq-accordion";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site";
import { faqItems } from "@/data/faq";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Stats strip */}
      <section className="border-y border-gold/20 bg-cream px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {siteConfig.trustStrip.map((item) => (
              <div key={item.title} className="text-center">
                <span className="font-serif text-4xl font-bold text-gold">
                  {item.stat}
                </span>
                <p className="mt-1.5 text-xs font-medium uppercase tracking-widest text-charcoal/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Products grid */}
      <Section variant="surface" id="products">
        <SectionHeading>Our Products</SectionHeading>
        <SectionSubheading>
          Custom boxes, mylar bags, and paper cups — all quoted through one
          streamlined process.
        </SectionSubheading>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      {/* 4. How it works */}
      <Section variant="olive">
        <SectionHeading className="text-offwhite">How It Works</SectionHeading>
        <SectionSubheading className="text-offwhite/60">
          From first request to landed delivery — a clear path with no
          surprises.
        </SectionSubheading>
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.howItWorks.map((item) => (
            <div key={item.step}>
              <span className="font-serif text-5xl font-bold text-gold">
                {String(item.step).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold text-offwhite">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-offwhite/60">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Why UPG */}
      <Section variant="cream">
        <SectionHeading>Why UPG</SectionHeading>
        <SectionSubheading>
          One packaging partner for boxes, pouches, and cups — with clarity
          built into every step.
        </SectionSubheading>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.whyUpg.map((item) => (
            <div
              key={item.title}
              className="rounded-sm border border-charcoal/5 bg-surface p-6"
            >
              <h3 className="font-serif text-lg font-semibold text-charcoal">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. Social proof — TODO: replace placeholder testimonials with real customer quotes */}
      <Section variant="surface">
        <SectionHeading>What Brands Say</SectionHeading>
        <SectionSubheading>
          Feedback from brands that have sourced packaging through UPG.
        </SectionSubheading>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* TODO: Replace with real testimonials from customers. Do not use fake names or companies. */}
          {[
            {
              id: "PLACEHOLDER_TESTIMONIAL_1",
              quote:
                "PLACEHOLDER — replace with a real customer quote once available.",
              name: "PLACEHOLDER_NAME",
              role: "PLACEHOLDER_ROLE",
              company: "PLACEHOLDER_COMPANY",
            },
            {
              id: "PLACEHOLDER_TESTIMONIAL_2",
              quote:
                "PLACEHOLDER — replace with a real customer quote once available.",
              name: "PLACEHOLDER_NAME",
              role: "PLACEHOLDER_ROLE",
              company: "PLACEHOLDER_COMPANY",
            },
            {
              id: "PLACEHOLDER_TESTIMONIAL_3",
              quote:
                "PLACEHOLDER — replace with a real customer quote once available.",
              name: "PLACEHOLDER_NAME",
              role: "PLACEHOLDER_ROLE",
              company: "PLACEHOLDER_COMPANY",
            },
          ].map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between rounded-sm border border-charcoal/8 bg-cream p-8"
            >
              <p className="text-sm leading-relaxed text-charcoal/70 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-charcoal/8 pt-5">
                <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                <p className="mt-0.5 text-xs text-charcoal/50">
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. Industries */}
      <Section variant="olive" id="industries">
        <SectionHeading className="text-offwhite">
          Industries We Serve
        </SectionHeading>
        <SectionSubheading className="text-offwhite/60">
          Custom packaging solutions for brands across key product categories.
        </SectionSubheading>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {siteConfig.industries.map((industry) => (
            <div
              key={industry.name}
              className="rounded-sm border border-offwhite/10 bg-olive-muted/20 p-8"
            >
              <h3 className="font-serif text-xl font-semibold text-offwhite">
                {industry.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-offwhite/60">
                {industry.description}
              </p>
              <Link
                href="/get-a-quote"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold transition-colors hover:text-gold-dark"
              >
                Get a quote
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. FAQ */}
      <Section variant="surface">
        <div className="mx-auto max-w-3xl">
          <SectionHeading>Common Questions</SectionHeading>
          <SectionSubheading>
            Quick answers about ordering, MOQs, and working with UPG.
          </SectionSubheading>
          <div className="mt-10">
            <FaqAccordion items={faqItems.slice(0, 6)} />
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="text-sm font-medium text-gold hover:text-gold-dark"
            >
              View all frequently asked questions →
            </Link>
          </div>
        </div>
      </Section>

      {/* 8. CTA Banner */}
      <CtaBanner
        heading="Need a packaging partner who delivers with fewer surprises?"
        description="Start your project with UPG. Fast quotes, clear communication, and production follow-through."
      />
    </>
  );
}
