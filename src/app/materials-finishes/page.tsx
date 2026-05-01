import type { Metadata } from "next";
import Image from "next/image";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { finishFeatures, materialsHighlights } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Materials & Finishes | UPG",
  description:
    "Explore paperboard, corrugated, rigid wraps, pouches, cup structures, and premium finishing options like foil, embossing, and spot UV.",
  alternates: {
    canonical: "https://universalpackaginggroup.com/materials-finishes",
  },
};

const materialGroups = [
  {
    title: "Paperboard & cartons",
    items: ["SBS C1S", "Kraft paperboard", "Recycled board", "Retail carton stocks"],
  },
  {
    title: "Corrugated & mailers",
    items: ["E-flute", "F-flute", "White liner", "Kraft liner"],
  },
  {
    title: "Rigid structures",
    items: ["Chipboard cores", "Art paper wraps", "Textured wraps", "Premium specialty papers"],
  },
  {
    title: "Flexible pouch films",
    items: ["PET / VMPET / PE", "Kraft laminates", "Matte films", "Window structures on review"],
  },
  {
    title: "Cup structures",
    items: ["Food-grade cup stock", "Lining options", "Standard cup formats"],
  },
];

export default function MaterialsFinishesPage() {
  return (
    <>
      <section className="bg-gradient-warm">
        <div className="container-editorial pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="eyebrow mb-5">Capabilities</div>
              <h1 className="display-1 text-balance">
                Materials and finishes that make packaging feel considered.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                This page is built as a decision-support resource. Use it to
                understand the material families, wrap stocks, and finish options
                most relevant to your launch.
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

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Material groups"
              title="Start with the right substrate."
              intro="The wrong structure creates cost and quality problems later. This is the first commercial decision, not just a production detail."
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
              title="The detail that shifts packaging from functional to premium."
              intro="These are the finish directions most likely to matter for cosmetics, gifting, PR, and launch-oriented presentation."
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
            eyebrow="Most-requested capability stack"
            title="The premium options buyers ask about most."
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

      <QuoteCta
        title="Need help choosing the right finish stack?"
        intro="Tell us the product type, target look, and quantity. We will guide you toward the most practical material and finish route."
      />
    </>
  );
}
