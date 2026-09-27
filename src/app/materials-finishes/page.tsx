import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { finishFeatures } from "@/data/catalog";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Packaging Materials & Finishes",
  description:
    "Compare paperboard, corrugated board, rigid-box cores, flexible packaging, and print finishes for custom packaging projects.",
  path: "/materials-finishes",
  keywords: [
    "custom packaging materials",
    "paperboard thickness guide",
    "corrugated flute guide",
    "packaging finishes",
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

const paperboardFamilies = [
  [
    "SBS C1S",
    "Solid bleached board with one coated print face. Use it when the outside graphic needs a bright, crisp surface.",
  ],
  [
    "SBS C2S",
    "Solid bleached board coated on both faces. It suits projects that need a clean printed surface inside and out.",
  ],
  [
    "CCNB / duplex",
    "Clay-coated newsback has a white printing face and a gray or brown reverse. Compare it for retail cartons with an unprinted interior.",
  ],
  [
    "Kraft board",
    "Natural brown board that makes the paper color part of the design. Review a printed sample when color accuracy matters.",
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
const finishDetails = [
  [
    "Matte, gloss & soft-touch",
    "Matte reduces sheen; gloss adds reflection; soft-touch creates a velvety feel. These effects can use a coating or laminated film, depending on the project.",
  ],
  [
    "Foil & spot UV",
    "Foil adds a metallic decorative area. Spot UV adds selected gloss contrast, often over a matte surface.",
  ],
  [
    "Emboss & deboss",
    "Embossing raises a detail; debossing presses it inward. Board, artwork, panel position, and registration affect the result.",
  ],
  [
    "Windows & inserts",
    "A window reveals the product through a die-cut opening; an insert controls presentation and fit. Both depend on the selected structure.",
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
                Find the right material and finish.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Compare paperboard thicknesses, corrugated layers, and print
                finishes to match your product, presentation, and delivery needs.
              </p>
              <nav
                aria-label="Materials guide sections"
                className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-gold-dark underline decoration-gold/50 underline-offset-4"
              >
                <a href="#paperboard">Paperboard</a>
                <a href="#corrugated">Corrugated board</a>
                <a href="#rigid-flexible">Rigid & flexible</a>
                <a href="#finishes">Finishes</a>
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

      <section
        id="paperboard"
        className="section-shell scroll-mt-24 border-y border-border bg-cream"
      >
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Paperboard"
            title="Choose the surface first, then the caliper."
            intro="C1S and C2S describe coated faces; PT describes nominal thickness. Plan exterior, interior, or two-sided printing with the selected board and finish."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {paperboardFamilies.map(([title, detail]) => (
              <article
                key={title}
                className="border border-border bg-surface p-5"
              >
                <h2 className="font-serif text-2xl text-olive">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {detail}
                </p>
              </article>
            ))}
          </div>
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

      <section id="rigid-flexible" className="section-shell scroll-mt-24 bg-cream">
        <div className="container-editorial grid gap-7 md:grid-cols-2">
          <article>
            <div className="eyebrow">Rigid structures</div>
            <h2 className="mt-4 font-serif text-3xl text-foreground">
              Core plus wrap
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              A rigid presentation box uses a structural grayboard core with a
              separate printed or textured wrap. A 1.5 mm or 2.0 mm core is a
              useful project discussion point; the finished wall also includes
              the wrap and lining; an insert supports the product inside.
            </p>
          </article>
          <article>
            <div className="eyebrow">Flexible packaging</div>
            <h2 className="mt-4 font-serif text-3xl text-foreground">
              Format drives the material system
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              Mylar bags, pouches, coffee bags, spout bags, and rollstock film
              each need their own barrier, seal, fill, and machine requirements
              reviewed. Depending on the format, options include resealable
              zippers, coffee degassing valves, and product windows.
            </p>
          </article>
        </div>
      </section>

      <section id="finishes" className="section-shell scroll-mt-24">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Finishes"
            title="Choose the look and feel."
            intro="Coatings and laminations change the overall surface. Foil, spot UV, embossing, and windows draw attention to selected details."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {finishFeatures.map((finish) => (
              <article
                key={finish.title}
                className="overflow-hidden border border-border bg-surface"
              >
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
                  <h2 className="font-serif text-2xl text-foreground">
                    {finish.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {finish.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {finishDetails.map(([title, detail]) => (
              <article key={title} className="surface-card p-5">
                <h2 className="font-serif text-2xl text-olive">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {detail}
                </p>
              </article>
            ))}
          </div>
          <Link
            href="/blog/packaging-finishes-guide"
            className="mt-7 inline-flex min-h-11 items-center font-semibold text-gold-dark underline decoration-gold/50 underline-offset-4 hover:text-foreground"
          >
            Read the packaging finishes guide →
          </Link>
        </div>
      </section>

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
