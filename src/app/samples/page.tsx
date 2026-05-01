import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { sampleHighlights } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Samples & Packaging Directions | UPG",
  description:
    "Visual sample directions for skincare packaging, PR kits, launch-led presentation, and cosmetics-first packaging references.",
  alternates: { canonical: "https://universalpackaginggroup.com/samples" },
};

const sampleCategories = [
  {
    title: "Skincare presentation",
    description:
      "Presentation systems for jars, bottles, and routine-led skincare kits where the packaging still needs clean retail discipline.",
  },
  {
    title: "PR and influencer kits",
    description:
      "Insert-led boxes and premium mailers designed for seeding, content, and campaign launches.",
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
      <section className="bg-gradient-warm">
        <div className="container-editorial pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-4xl">
            <div className="eyebrow mb-5">Samples & portfolio direction</div>
            <h1 className="display-1 text-balance">
              Visual references built for outreach, quoting, and early-stage trust.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              These sample directions help prospects see the kind of finish,
              insert, and presentation logic that can be built into a real
              project. They are useful when your first touch comes from outreach,
              not paid ads.
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
                  <div className="eyebrow mb-3">{sample.category}</div>
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
            eyebrow="Use these when selling"
            title="How these references support social-first outreach."
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
        title="Need a sample path or a quote-ready direction?"
        intro="Use the quote form to tell us the product, finish target, and quantity. We will point you to the right next step."
      />
    </>
  );
}
