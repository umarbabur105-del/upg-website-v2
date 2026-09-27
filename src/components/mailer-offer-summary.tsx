import Link from "next/link";
import { mailerOffer } from "@/data/mailer-offer";

export function MailerOfferSummary({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-labelledby="mailer-order-heading" className="border-y border-border bg-cream py-10 md:py-12">
      <div className="container-editorial">
        <div className="mb-7 max-w-3xl">
          <div className="eyebrow mb-3">Ordering custom mailer boxes</div>
          <h2 id="mailer-order-heading" className="scroll-mt-28 text-3xl font-light tracking-[-0.025em] text-balance sm:text-4xl">
            {mailerOffer.heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{mailerOffer.summary}</p>
        </div>
        <dl className={`grid gap-x-8 gap-y-6 sm:grid-cols-2 ${compact ? "" : "lg:grid-cols-3"}`}>
          {(compact ? mailerOffer.facts.filter((fact) => ["response", "artwork", "schedule", "shipping"].includes(fact.key)) : mailerOffer.facts).map((fact) => (
            <div key={fact.key} className={`border-t border-border pt-4 ${fact.key === "sample" ? "sm:col-span-2 lg:col-span-3" : ""}`}>
              <dt className="eyebrow mb-2">{fact.label}</dt>
              <dd>
                <p className="text-base font-semibold text-foreground">{fact.value}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fact.detail}</p>
                {fact.key === "sample" ? (
                  <Link href="/samples/box-sample-kit" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">
                    Explore the Box Sample Kit →
                  </Link>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
        {compact ? (
          <Link href="/products/custom-mailer-boxes#mailer-order-heading" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">
            Mailer pricing, samples &amp; timing →
          </Link>
        ) : null}
      </div>
    </section>
  );
}
