import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { sampleHighlights } from "@/data/catalog";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Packaging Samples & Concept Directions",
  description:
    "Explore representative concept directions for custom skincare boxes, PR kits, mailers, inserts, and cosmetic packaging finishes, plus physical sample availability.",
  path: "/samples",
  keywords: ["custom packaging samples", "cosmetic packaging concepts", "PR box samples"],
});

const sampleCategories = [
  {
    title: "Skincare presentation",
    description:
      "Presentation concepts for jars, bottles, and multi-product skincare kits with clear product organization and retail branding.",
  },
  {
    title: "PR and influencer kits",
    description:
      "Insert-led boxes and presentation mailers for influencer outreach, content, and campaign launches.",
  },
  {
    title: "Gift and subscription directions",
    description:
      "Packaging setups for recurring drops, launch collections, and brand-led unboxing moments.",
  },
];

export const dynamic = "force-static";

export default function SamplesPage() {
  return (
    <>
      <section className="bg-background">
        <div className="container-editorial pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-4xl">
            <div className="eyebrow mb-5">Samples & concept directions</div>
            <h1 className="display-1 text-balance">
              Explore a packaging direction before production begins.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              These concept images illustrate possible finish, insert, and
              presentation directions. They are not represented as completed
              client work. Physical sample options are confirmed for each project.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial">
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
                  <div className="eyebrow mb-3">Concept direction · {sample.category}</div>
                  <h2 className="font-serif text-2xl text-foreground">
                    {sample.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {sample.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Concepts by application"
            title="Explore packaging directions by project type."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {sampleCategories.map((item) => (
              <div key={item.title} className="surface-card p-6">
                <h3 className="font-serif text-2xl text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/cosmetics"
              className="inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
            >
              Go to cosmetics hub <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <QuoteCta
        title="Need to evaluate a concept or physical sample?"
        intro="Tell us the product, finish target, quantity, and what you need to evaluate. We will confirm the available sample or pre-production option, cost, and timing."
      />
    </>
  );
}
