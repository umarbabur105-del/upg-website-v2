import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { FinishLibrary, MaterialLibrary, MaterialsFaq } from "@/components/materials-library";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Packaging Materials & Finishes",
  description:
    "Compare packaging materials, embossing, debossing, spot UV, foil, and lamination with visual examples, artwork tips, and cost factors.",
  path: "/materials-finishes",
  keywords: [
    "custom packaging materials",
    "paperboard thickness guide",
    "corrugated flute guide",
    "packaging finishes",
    "embossed packaging",
    "spot UV packaging",
    "foil stamping boxes",
    "matte vs gloss lamination",
  ],
});

const paperboardRows = [
  [
    "8 PT",
    "0.2032 mm",
    "177 GSM",
    "Light printed cards, tags, insert cards, or sleeves",
  ],
  [
    "10 PT",
    "0.2540 mm",
    "195–202 GSM",
    "Light printed cards, tags, insert cards, or sleeves",
  ],
  ["12 PT", "0.3048 mm", "227–250 GSM", "Light cartons or sleeves"],
  ["14 PT", "0.3556 mm", "255–275 GSM", "Light cartons or sleeves"],
  ["16 PT", "0.4064 mm", "284–300 GSM", "Retail product cartons"],
  ["18 PT", "0.4572 mm", "311–350 GSM", "Retail product cartons"],
  [
    "20 PT",
    "0.5080 mm",
    "335–345 GSM",
    "Thicker folding board; review creases and structure",
  ],
  [
    "24 PT",
    "0.6096 mm",
    "396–407 GSM",
    "Thicker folding board; review creases and structure",
  ],
  [
    "28 PT",
    "0.7112 mm",
    "462–527 GSM",
    "Thicker folding board; review creases and structure",
  ],
] as const;

const formations = [
  {
    title: "Single face",
    detail: "1 liner + 1 flute",
    layers: ["liner", "flute"],
  },
  {
    title: "Single wall",
    detail: "2 liners + 1 flute",
    layers: ["liner", "flute", "liner"],
  },
  {
    title: "Double wall",
    detail: "3 liners + 2 flutes",
    layers: ["liner", "flute", "liner", "flute", "liner"],
  },
  {
    title: "Triple wall",
    detail: "4 liners + 3 flutes",
    layers: ["liner", "flute", "liner", "flute", "liner", "flute", "liner"],
  },
] as const;
const flutes = [
  [
    "F flute",
    "approx. 0.8 mm",
    "Compact retail boxes and fine print details.",
  ],
  [
    "E flute",
    "approx. 1.6 mm",
    "Printed mailers, retail packaging, and inserts.",
  ],
  [
    "B flute",
    "approx. 3.2 mm",
    "Corrugated packs and displays needing more depth than E flute.",
  ],
  [
    "C flute",
    "approx. 4.0 mm",
    "Shipping packs where cushioning and stacking need review.",
  ],
  [
    "A flute",
    "approx. 4.8 mm",
    "Cushioning around fragile products, with room for a deeper wall.",
  ],
] as const;
function CorrugatedDiagram() {
  return (
    <svg
      viewBox="0 0 420 195"
      className="h-auto w-full"
      role="img"
      aria-labelledby="corrugated-title corrugated-desc"
    >
      <title id="corrugated-title">Liner and flute layers in corrugated board</title>
      <desc id="corrugated-desc">
        A wavy fluted medium joined to the outer and inner flat liners forms a single-wall board.
      </desc>
      <rect x="24" y="40" width="360" height="10" fill="#5a6545" />
      <path
        d="M24 90 q18 -72 36 0 t36 0 t36 0 t36 0 t36 0 t36 0 t36 0 t36 0 t36 0 t36 0"
        fill="none"
        stroke="#c69b45"
        strokeWidth="8"
      />
      <rect x="24" y="130" width="360" height="10" fill="#5a6545" />
      <g fill="#263122" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="600">
        <text x="24" y="25">Outer liner</text>
        <text x="24" y="181">Fluted medium</text>
        <text x="250" y="181">Inner liner</text>
      </g>
      <g fill="none" stroke="#263122" strokeWidth="1.5">
        <path d="M78 122 V159" />
        <path d="M324 140 V159" />
      </g>
    </svg>
  );
}

function FormationDiagram({ layers }: { layers: readonly string[] }) {
  return (
    <svg viewBox="0 0 288 76" className="mb-4 h-20 w-full" aria-hidden="true">
      {layers.map((layer, index) => {
        const y = layers.slice(0, index).reduce((offset, item) => offset + (item === "liner" ? 4 : 20), 0);
        return layer === "liner" ? (
          <rect key={index} x="0" y={y} width="288" height="4" fill="#5a6545" />
        ) : (
          <path
            key={index}
            d={`M0 ${y + 10} q12 -16 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0`}
            fill="none"
            stroke="#c69b45"
            strokeWidth="4"
          />
        );
      })}
    </svg>
  );
}

export default function MaterialsFinishesPage() {
  return (
    <>
      <section className="bg-background">
        <div className="container-editorial pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="eyebrow mb-5">Materials library</div>
              <h1 className="display-1 text-balance">
                Materials that protect. Finishes that stand out.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Explore the surfaces, structures, and finishing details behind
                custom packaging. See what each option adds, where it works,
                and what to consider before you choose.
              </p>
              <nav
                aria-label="Materials guide sections"
                className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-gold-dark underline decoration-gold/50 underline-offset-4"
              >
                <a href="#materials">Materials</a>
                <a href="#finishes">Finishes</a>
                <a href="#paperboard">PT &amp; GSM</a>
                <a href="#corrugated">Corrugated layers</a>
                <a href="#packaging-features">Windows &amp; inserts</a>
                <a href="#material-questions">Questions</a>
              </nav>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[5/4] overflow-hidden shadow-lift">
                <Image
                  src="/images/redesign/hero/materials-hero.jpg"
                  alt="Packaging materials and finish details"
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

      <MaterialLibrary />
      <FinishLibrary />

      <section
        id="paperboard"
        className="section-shell scroll-mt-24 border-y border-border bg-cream"
      >
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Paperboard"
            title="Compare paperboard thickness."
            intro="PT describes thickness. GSM describes weight per area. Choose the board family first, then compare a caliper that suits the carton dimensions and contents."
          />
          <div className="mt-14 hidden overflow-x-auto border border-border bg-surface md:block">
            <table className="min-w-[700px] w-full text-left text-sm">
              <caption className="px-5 py-4 text-left font-semibold text-foreground">
                Paperboard caliper comparison
              </caption>
              <thead className="border-y border-border bg-olive text-white">
                <tr>
                  <th className="px-5 py-3">Caliper</th>
                  <th className="px-5 py-3">Nominal thickness</th>
                  <th className="px-5 py-3">Published GSM examples</th>
                  <th className="px-5 py-3">Starting use</th>
                </tr>
              </thead>
              <tbody>
                {paperboardRows.map(([pt, mm, gsm, use]) => (
                  <tr key={pt} className="border-b border-border last:border-0">
                    <th
                      scope="row"
                      className="px-5 py-4 font-semibold text-foreground"
                    >
                      {pt}
                    </th>
                    <td className="px-5 py-4 text-muted-foreground">{mm}</td>
                    <td className="px-5 py-4 text-muted-foreground">{gsm}</td>
                    <td className="px-5 py-4 text-muted-foreground">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 grid gap-3 md:hidden" aria-label="Paperboard caliper comparison">
            {paperboardRows.map(([pt, mm, gsm, use]) => (
              <article key={pt} className="border border-border bg-surface p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-2xl text-olive">{pt}</h3>
                  <span className="text-sm text-muted-foreground">{mm}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">GSM reference: {gsm.replace(" GSM", "")}</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground">{use}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground">
            One paperboard point is 0.001 inch, or 0.0254 mm. GSM varies by
            board grade; the table uses published stock examples from Sappi
            Spectro C1S, Smurfit Westrock PrintKote, and the PakFactory nominal
            stock guide. Confirm the selected stock with your quote.
          </p>
          <Link
            href="/blog/packaging-material-thickness-guide"
            className="mt-6 inline-flex min-h-11 items-center font-semibold text-gold-dark underline decoration-gold/50 underline-offset-4 hover:text-foreground"
          >
            Read the paperboard thickness guide →
          </Link>
        </div>
      </section>

      <section id="corrugated" className="section-shell scroll-mt-24">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Corrugated board"
              title="Board construction and flute size."
              intro="Corrugated board combines flat liner sheets with a fluted medium. Formation tells you the layer count; flute profile affects board depth, face quality, and cushioning."
            />
            <div className="mt-8 border border-border bg-cream p-5">
              <CorrugatedDiagram />
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                A single-wall board uses an outer liner, fluted medium, and
                inner liner.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {formations.map(({ title, detail, layers }) => (
                <article key={title} className="surface-card p-5">
                  <FormationDiagram layers={layers} />
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
                    {detail}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl text-foreground">
                    {title}
                  </h2>
                </article>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              A larger flute is not the same thing as a double wall. Choose
              formation and flute with the complete pack, its dimensions,
              fragility, handling, and transit conditions.
            </p>
          </div>
        </div>
        <div className="container-editorial mt-12">
          <h2 className="font-serif text-3xl text-foreground">
            Common flute profiles, from thinner to deeper
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {flutes.map(([title, depth, detail]) => (
              <article
                key={title}
                className="border border-border bg-cream p-5"
              >
                <p className="font-semibold text-gold-dark">{depth}</p>
                <h3 className="mt-2 font-serif text-2xl text-olive">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {detail}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Dimensions are approximate reference values, rounded from published
            flute-depth tables. They are not universal calipers or load ratings.
          </p>
        </div>
      </section>

      <section id="packaging-features" className="section-shell scroll-mt-24 bg-cream">
        <div id="rigid-flexible" className="container-editorial scroll-mt-24">
          <SectionHeading eyebrow="Beyond the surface" title="Plan the view, the fit, and the opening." intro="Windows and inserts change how customers see and handle the product. Specify them with the material and structure, before the artwork is finalized." />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="border border-border bg-surface p-6 md:p-8">
              <h3 className="font-serif text-3xl text-foreground">Windows &amp; cutouts</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">A die-cut opening reveals part of the product. A film patch can cover a carton window; a clear area in a pouch is part of its film construction. These are different specifications.</p>
              <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
                <li>Choose the window position around the product and insert.</li>
                <li>Keep enough material around edges, folds, and glue panels.</li>
                <li>Review visibility alongside protection and barrier requirements.</li>
              </ul>
              <Link href="/products/custom-tuck-boxes" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-gold-dark underline underline-offset-4">Explore carton options →</Link>
            </article>
            <article className="border border-border bg-surface p-6 md:p-8">
              <h3 className="font-serif text-3xl text-foreground">Inserts &amp; interior fit</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">An insert positions the product and helps control movement. Paperboard and corrugated inserts can divide sets or hold an item within a mailer or presentation box.</p>
              <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
                <li>Share the product dimensions, weight, and fragile areas.</li>
                <li>Allow space for easy removal as well as a secure fit.</li>
                <li>Review the complete pack for transit; a snug fit alone is not a shipping test.</li>
              </ul>
              <Link href="/products/custom-mailer-boxes" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-gold-dark underline underline-offset-4">Explore mailers with inserts →</Link>
            </article>
          </div>
          <div className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">For rigid boxes and pouches: </strong>
            <a href="#rigid-grayboard" className="text-gold-dark underline underline-offset-4">compare core and wrap</a> for presentation boxes, or
            {" "}<a href="#flexible-films" className="text-gold-dark underline underline-offset-4">review the film structure</a> for flexible packaging. Choose the decorative surface after the protective structure is clear.
          </div>
        </div>
      </section>
      <MaterialsFaq />

      <section className="section-shell border-y border-border bg-cream">
        <div className="container-editorial grid gap-6 md:grid-cols-2">
          <Link href="/products/custom-tuck-boxes" className="surface-card p-6">
            <div className="eyebrow">Folding cartons</div>
            <h2 className="mt-3 font-serif text-2xl text-foreground">
              Explore custom tuck boxes
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              See a carton structure alongside material, print, and finish
              considerations.
            </p>
          </Link>
          <Link
            href="/products/custom-mailer-boxes"
            className="surface-card p-6"
          >
            <div className="eyebrow">Corrugated mailers</div>
            <h2 className="mt-3 font-serif text-2xl text-foreground">
              Explore custom mailer boxes
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Review ear-lock mailers around the packed product, insert, and
              delivery need.
            </p>
          </Link>
        </div>
      </section>
      <QuoteCta
        title="Need help selecting the material and finish?"
        intro="Share the product, dimensions, quantity, target look, and intended use. We will review a proposed structure and material combination for the project."
      />
    </>
  );
}
