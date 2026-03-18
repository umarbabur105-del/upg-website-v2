import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading, SectionSubheading } from "@/components/section";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to UPG about your next packaging run. Get guidance or submit a quote request.",
};

const contactPrompts = [
  "What are you packaging?",
  "Which country will it ship to?",
  "What quantity range are you targeting?",
  "Do you have artwork ready?",
  "Does the packaging involve food or beverage contact?",
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-olive px-6 pt-32 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading className="text-offwhite">
            Talk to UPG about your next packaging run
          </SectionHeading>
          <SectionSubheading className="text-offwhite/60">
            If you already know the product family, quantity, and target timing,
            the fastest path is the quote form. If you still need guidance, use
            the prompts below or email us directly.
          </SectionSubheading>
        </div>
      </section>

      {/* Contact content */}
      <Section variant="cream">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left - Prompts */}
          <div>
            <h3 className="font-serif text-2xl font-semibold text-charcoal">
              Things to think about before reaching out
            </h3>
            <ul className="mt-8 space-y-4">
              {contactPrompts.map((prompt) => (
                <li key={prompt} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-base text-charcoal/70">{prompt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Actions */}
          <div className="space-y-8">
            <div className="rounded-sm border border-charcoal/5 bg-surface p-8">
              <h3 className="font-serif text-xl font-semibold text-charcoal">
                Ready to quote?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                Submit product details, quantity, dimensions, and delivery info
                for a tailored response.
              </p>
              <Link
                href="/get-a-quote"
                className="mt-6 inline-block rounded-sm bg-gold px-8 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-dark"
              >
                Go to Quote Form
              </Link>
            </div>

            <div className="rounded-sm border border-charcoal/5 bg-surface p-8">
              <h3 className="font-serif text-xl font-semibold text-charcoal">
                Need guidance first?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                Email us with a description of your product, target market, and
                packaging goals. We will help you narrow down the right path.
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-6 inline-block rounded-sm border border-gold px-8 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-charcoal"
              >
                Email UPG
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
