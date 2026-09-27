import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { finishFeatures, materialsHighlights } from "@/data/catalog";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Packaging Materials & Finishes",
  description:
    "Compare SBS, kraft, CCNB, chipboard, corrugated board, flexible films, foil, embossing, debossing, windows, and spot UV for custom packaging.",
  path: "/materials-finishes",
  keywords: [
    "custom packaging materials",
    "packaging finishes",
    "foil stamped packaging",
    "embossed cosmetic boxes",
  ],
});

const materialGroups = [
  {
    title: "Paperboard & cartons",
    items: ["SBS C1S", "SBS C2S", "Brown, white, or black kraft", "CCNB", "Chipboard"],
  },
  {
    title: "Corrugated & mailers",
    items: ["Flute selected for the structure", "Corrugated tuck boxes", "Ear-lock mailer boxes", "Custom inserts"],
  },
  {
    title: "Rigid structures",
    items: ["Chipboard cores", "Art paper wraps", "Textured wraps", "Premium specialty papers"],
  },
  {
    title: "Flexible packaging",
    items: ["Mylar bags", "Pouches", "Coffee bags", "Spout bags", "Rollstock film"],
  },
];

export default function MaterialsFinishesPage() {
  return (
    <>
      <section className="bg-background">
        <div className="container-editorial pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="eyebrow mb-5">Capabilities</div>
              <h1 className="display-1 text-balance">
                Materials and finishes selected for structure, print, and presentation.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Use this guide to understand common material families, wrap
                stocks, and finishes. Final suitability depends on structure,
                print process, intended use, testing, and production documentation.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[5/4] overflow-hidden shadow-lift">
                <Image
                  src="/images/redesign/hero/materials-hero.jpg"
                  alt="Packaging materials and finish hero"
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

      <section className="section-shell border-y border-border bg-cream">
        <div className="container-editorial grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <div className="eyebrow">Material thickness guide</div>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground md:text-4xl">
              How thick should your packaging be?
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Compare 16 PT and 18 PT paperboard for product cartons, explore
              lighter and thicker options, and find materials suited to your
              packaging. The guide covers thickness, GSM, rigid board, and corrugated flutes.
            </p>
            <Link
              href="/blog/packaging-material-thickness-guide"
              className="mt-6 inline-flex min-h-11 items-center font-semibold text-gold-dark underline decoration-gold/50 underline-offset-4 hover:text-foreground"
            >
              Compare 14–24 PT paperboard and uses →
            </Link>
          </div>
          <dl className="grid gap-3 sm:grid-cols-3">
            {[
              { unit: "PT", label: "Paperboard thickness", detail: "Compare carton-board thicknesses, including 16 PT and 18 PT." },
              { unit: "mm", label: "Metric thickness", detail: "16 PT equals 0.4064 mm. One point is 0.0254 mm." },
              { unit: "GSM", label: "Paperboard weight", detail: "Weight per square meter varies with the board grade, even at the same PT." },
            ].map((item) => (
              <div key={item.unit} className="border border-border bg-surface p-5">
                <dt className="font-serif text-3xl text-olive">{item.unit}</dt>
                <dd className="mt-4 text-sm font-semibold text-foreground">{item.label}</dd>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Material groups"
              title="Start with the right substrate."
              intro="Material selection starts with the structure, intended use, print method, finish requirements, and product compatibility."
            />
          </div>
          <div className="grid gap-6 lg:col-span-8 md:grid-cols-2">
            {materialGroups.map((group) => (
              <div key={group.title} className="surface-card p-6">
                <h2 className="font-serif text-2xl text-foreground">{group.title}</h2>
                <ul className="mt-4 space-y-3 text-sm text-foreground/82">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial">
          <div className="mb-12">
            <SectionHeading
              eyebrow="Finishes"
              title="Finish options for visual and tactile detail."
              intro="These options can be specified for cosmetics, gifting, PR, retail, and other presentation-led packaging."
            />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {finishFeatures.map((finish) => (
              <div key={finish.title} className="overflow-hidden border border-border bg-surface">
                <div className="relative aspect-[5/4]">
                  <Image
                    src={finish.image}
                    alt={finish.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-foreground">
                    {finish.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {finish.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Specialty options"
            title="Print, finish, and structural details available by format."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {materialsHighlights.map((item) => (
              <div key={item} className="surface-card p-5 text-sm text-foreground">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell border-y border-border bg-cream">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Buyer guides"
            title="Turn material and finish options into a focused decision."
            intro="Use the visual guides for surface hierarchy and print-color planning, then confirm the final combination against the selected structure and production method."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Link
              href="/blog/packaging-finishes-guide"
              className="group grid overflow-hidden border border-border bg-surface sm:grid-cols-[0.85fr_1.15fr]"
            >
              <div className="relative min-h-56">
                <Image
                  src="/images/redesign/finishes/finish-spotuv.jpg"
                  alt="Selective spot UV finish on printed packaging"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.025]"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="p-6">
                <div className="eyebrow">Finish decision</div>
                <h2 className="mt-3 font-serif text-2xl text-foreground">
                  Compare matte, gloss, foil, spot UV, and tactile detail.
                </h2>
                <span className="mt-5 inline-flex text-sm font-semibold text-gold-dark">
                  Open finish guide →
                </span>
              </div>
            </Link>
            <Link
              href="/blog/cmyk-vs-pantone-packaging-printing"
              className="group grid overflow-hidden border border-border bg-surface sm:grid-cols-[0.85fr_1.15fr]"
            >
              <div className="relative min-h-56">
                <Image
                  src="/images/redesign/finishes/finish-foil.jpg"
                  alt="Controlled printed color and metallic detail on packaging"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.025]"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="p-6">
                <div className="eyebrow">Print-color decision</div>
                <h2 className="mt-3 font-serif text-2xl text-foreground">
                  Understand CMYK process color and Pantone spot color.
                </h2>
                <span className="mt-5 inline-flex text-sm font-semibold text-gold-dark">
                  Open color guide →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <QuoteCta
        title="Need help choosing materials and finishes?"
        intro="Tell us the product type, target look, and quantity. We will recommend a material and finish combination for the proposed structure."
      />
    </>
  );
}
