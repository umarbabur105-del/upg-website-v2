import Link from "next/link";
import {
  mailerBoxDecisionLinks,
  mailerBoxSizeComparisons,
} from "@/data/mailer-box-guide";

export function MailerBuyingGuide() {
  return (
    <section
      aria-labelledby="mailer-buying-guide-heading"
      className="border-b border-border bg-cream py-12 md:py-14"
    >
      <div className="container-editorial">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="eyebrow mb-3">Mailer box planning</div>
            <h2
              id="mailer-buying-guide-heading"
              className="text-3xl font-light tracking-[-0.025em] text-balance sm:text-4xl"
            >
              Choose your size, board, and printing.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Start with the packed product, then review the corrugated construction,
              printing, insert, and delivery conditions as one specification.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
            <div className="border-t border-border pt-4">
              <h3 className="text-base font-semibold text-foreground">Size and clearance</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Measure the packed product&apos;s outside dimensions, then specify the mailer&apos;s
                requested inside length, width, and height. Confirm clearance with the approved sample.
              </p>
            </div>
            <div className="border-t border-border pt-4">
              <h3 className="text-base font-semibold text-foreground">Board and printing</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Review corrugated formation and flute profile around the complete packout.
                Exterior-only or inside-and-outside print can be compared on the same brief.
              </p>
            </div>
            <div className="border-t border-border pt-4">
              <h3 className="text-base font-semibold text-foreground">Insert and delivery</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                An insert changes fit and presentation. A larger finished parcel can also
                affect dimensional billing, which your actual carrier and service must confirm.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-9 border-t border-border pt-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Compare mailer box sizes</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Use these inside dimensions as a starting point, then confirm your packed product, insert, and clearance.
              </p>
            </div>
            <Link
              href="/blog/mailer-box-size-guide"
              className="border-b border-foreground/20 pb-0.5 text-sm font-semibold text-foreground"
            >
              Read the 5-minute sizing guide →
            </Link>
          </div>

          <div className="mt-5 grid gap-3 md:hidden" aria-label="Mailer box size comparisons">
            {mailerBoxSizeComparisons.map((comparison) => (
              <article key={comparison.internalSize} className="border border-border bg-surface p-5">
                <h4 className="text-base font-semibold text-foreground">{comparison.internalSize}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{comparison.layout}</p>
                <p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-muted-foreground">{comparison.review}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 hidden overflow-x-auto border border-border bg-surface md:block">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th scope="col" className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest">Inside dimensions</th>
                  <th scope="col" className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest">Possible layout</th>
                  <th scope="col" className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest">What to confirm</th>
                </tr>
              </thead>
              <tbody>
                {mailerBoxSizeComparisons.map((comparison) => (
                  <tr key={comparison.internalSize} className="border-t border-border align-top">
                    <th scope="row" className="px-5 py-4 text-left font-semibold text-foreground">{comparison.internalSize}</th>
                    <td className="px-5 py-4 leading-relaxed text-muted-foreground">{comparison.layout}</td>
                    <td className="px-5 py-4 leading-relaxed text-muted-foreground">{comparison.review}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {mailerBoxDecisionLinks.map((link) => (
            <Link key={link.href} href={link.href} className="group border-t border-border pt-4">
              <h3 className="text-base font-semibold text-foreground group-hover:text-gold-dark">{link.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{link.description}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-foreground">Learn more →</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <div className="eyebrow mb-3">Choose by application</div>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-foreground">
            <Link href="/applications/custom-pr-boxes" className="border-b border-foreground/20 pb-0.5">PR and launch kits</Link>
            <Link href="/applications/influencer-kits" className="border-b border-foreground/20 pb-0.5">Influencer kits</Link>
            <Link href="/applications/custom-subscription-boxes" className="border-b border-foreground/20 pb-0.5">Subscription boxes</Link>
            <Link href="/applications/branded-ecommerce-mailer-boxes" className="border-b border-foreground/20 pb-0.5">Ecommerce mailers</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
