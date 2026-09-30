import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { finishGuides, materialGuides, materialFinishFaqs, productLibrarySelections } from "@/data/materials-library";

const textLink = "inline-flex min-h-11 items-center text-sm font-semibold text-gold-dark underline decoration-gold/50 underline-offset-4 hover:text-foreground";
const summaryClass = "cursor-pointer py-4 text-sm font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

export function MaterialLibrary() {
  return (
    <section id="materials" className="section-shell scroll-mt-24 border-y border-border bg-cream">
      <div className="container-editorial">
        <SectionHeading eyebrow="Material library" title="Start with what the package needs to do." intro="Compare the print surface, structure, and feel. A retail carton, corrugated mailer, rigid presentation box, and flexible pouch each need a different material approach." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {materialGuides.map((material) => (
            <article key={material.id} id={material.id} className="scroll-mt-28 overflow-hidden border border-border bg-surface">
              <div className="relative aspect-[4/3]">
                <Image src={material.image} alt={material.imageAlt} fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" className="object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-dark">{material.label}</p>
                <h3 className="mt-3 font-serif text-2xl text-foreground">{material.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{material.summary}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground"><strong className="font-semibold text-foreground">Common uses: </strong>{material.bestFor}</p>
                <details className="mt-5 border-t border-border">
                  <summary className={summaryClass}>Print &amp; selection notes</summary>
                  <p className="text-sm leading-relaxed text-muted-foreground">{material.printNote}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{material.selectionNote}</p>
                </details>
                <Link href={material.productHref} className={`${textLink} mt-2`}>{material.productLabel} →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinishLibrary() {
  return (
    <section id="finishes" className="section-shell scroll-mt-24">
      <div className="container-editorial">
        <SectionHeading eyebrow="Finish library" title="See the difference. Choose the effect." intro="Gloss catches light. Foil adds reflection. Embossing changes the paper surface. Compare the effects below, then choose a combination around your material and box structure." />
        <div className="mt-7 flex flex-wrap gap-2" aria-label="Jump to a finish">
          {finishGuides.map((finish) => <a key={finish.id} href={`#${finish.id}`} className="rounded-full border border-border bg-cream px-4 py-3 text-sm font-medium text-foreground hover:border-olive">{finish.name}</a>)}
        </div>
        <div className="mt-10 grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
          {finishGuides.map((finish) => (
            <article id={finish.id} key={finish.id} className="scroll-mt-28 overflow-hidden border border-border bg-surface">
              <div className="relative aspect-[4/3]">
                <Image src={finish.image} alt={finish.imageAlt} fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" className="object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-dark">{finish.effect}</p>
                <h3 className="mt-3 font-serif text-2xl text-foreground">{finish.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{finish.summary}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground"><strong className="font-semibold text-foreground">Consider for: </strong>{finish.bestFor}</p>
                <details className="mt-5 border-t border-border">
                  <summary className={summaryClass}>Artwork, cost &amp; practical notes</summary>
                  <dl className="space-y-4 pb-2 text-sm leading-relaxed">
                    {[['Artwork', finish.artwork], ['Cost factors', finish.cost], ['Before you choose', finish.watch]].map(([label, value]) => (
                      <div key={label}><dt className="font-semibold text-foreground">{label}</dt><dd className="mt-1 text-muted-foreground">{value}</dd></div>
                    ))}
                  </dl>
                </details>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 border-l-2 border-gold bg-cream p-6">
          <h3 className="text-lg font-semibold text-foreground">Choose the stock and finish together.</h3>
          <p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted-foreground">Surface treatments affect printing, folding, gluing, and handling. We review the combination for your packaging and confirm the specification in your quote. Share a reference for the effect you want; you do not need to choose every technical detail before contacting us.</p>
        </div>
        <Link href="/blog/packaging-finishes-guide" className={`${textLink} mt-5`}>Read the packaging finishes guide →</Link>
      </div>
    </section>
  );
}

export function MaterialsFaq() {
  return (
    <section id="material-questions" className="section-shell scroll-mt-24">
      <div className="container-editorial grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <SectionHeading eyebrow="Buyer questions" title="The details worth getting right." intro="Clear answers before you choose a stock, prepare the artwork, or compare quotes." />
        <div>
          {materialFinishFaqs.map((faq) => (
            <details key={faq.question} className="border-b border-border py-2">
              <summary className={`${summaryClass} text-base`}>{faq.question}</summary>
              <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
          <Link href="/blog/how-to-prepare-artwork-for-custom-packaging" className={`${textLink} mt-5`}>Prepare your packaging artwork →</Link>
        </div>
      </div>
    </section>
  );
}

export function ProductMaterialFinishLinks({ slug }: { slug: string }) {
  const selection = productLibrarySelections[slug];
  if (!selection) return null;
  return (
    <div className="mt-10 border-t border-border pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-serif text-2xl text-foreground">Explore the material and finish.</h2>
        <Link href="/materials-finishes" className={textLink}>View the materials &amp; finishes library →</Link>
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{selection.intro}</p>
      <div className={`mt-6 grid gap-5 ${selection.options.length > 1 ? "md:grid-cols-3" : "max-w-2xl"}`}>
        {selection.options.map(({ id, note }) => {
          const option = [...materialGuides, ...finishGuides].find((entry) => entry.id === id);
          if (!option) return null;
          return (
            <Link key={id} href={`/materials-finishes#${id}`} className={`group overflow-hidden border border-border bg-surface hover:border-olive ${selection.options.length === 1 ? "sm:grid sm:grid-cols-2" : ""}`}>
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={option.image} alt={option.imageAlt} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
              </div>
              <div className="p-5"><h3 className="font-serif text-xl text-foreground">{option.name} →</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{note}</p></div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
