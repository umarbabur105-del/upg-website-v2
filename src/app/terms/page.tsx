import type { Metadata } from "next";
import { PublicEmail } from "@/components/public-email";
import { Section, SectionHeading, SectionSubheading } from "@/components/section";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Website Terms",
  description: "Terms governing use of the Universal Packaging Group website and project information.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <section className="bg-olive px-6 pt-32 pb-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading as="h1" className="text-offwhite">Website Terms</SectionHeading>
          <SectionSubheading className="text-offwhite/70">Effective August 24, 2026.</SectionSubheading>
        </div>
      </section>
      <Section variant="cream">
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-7 text-charcoal/75">
          <div>
            <h2 className="font-serif text-2xl text-charcoal">Business entities</h2>
            <p className="mt-3">Universal Packaging Group operates through {siteConfig.legalEntities.uk} and {siteConfig.legalEntities.us}. The seller and payment-processing entity for fixed-price sample kits purchased through this website is {siteConfig.legalEntities.sampleKitSeller}. The accepted written quote or agreement for a custom packaging project identifies the entity and terms governing that project.</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-charcoal">Website information</h2>
            <p className="mt-3">Website content, representative images, planning MOQs, materials, finishes, and production information are general guidance, not a binding offer or guarantee. Final appearance, construction, suitability, availability, pricing, and timing depend on the confirmed specification and production review.</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-charcoal">Quotes and projects</h2>
            <p className="mt-3">Only an accepted written quote or agreement controls price, scope, minimum quantity, production timing, freight, duties, taxes, testing, documentation, payment terms, and delivery terms. Changes to specifications may change price and timing.</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-charcoal">Fixed-price sample kits</h2>
            <p className="mt-3">The UPG Box Sample Kit and Mylar Bag Sample Kit are separate fixed-price physical products governed by their individual product-page descriptions, checkout information, and published Sample Kit Shipping & Returns policy. Box and flexible-packaging samples are not combined into one kit. Purchasing a kit does not create or price a custom production order. The published kit-price credit applies when the customer places a first custom packaging production order with UPG.</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-charcoal">Artwork and intended use</h2>
            <p className="mt-3">You are responsible for having rights to submitted artwork and content and for providing accurate intended-use information. Regulatory, food-contact, cosmetic-contact, barrier, labeling, and market requirements must be confirmed for the specific product and jurisdiction.</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-charcoal">Acceptable use</h2>
            <p className="mt-3">Do not misuse the website, attempt unauthorized access, submit unlawful content, or interfere with normal operation. Site content may not be copied or represented as another company&apos;s work without permission.</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-charcoal">Questions</h2>
            <p className="mt-3">Questions about these terms may be sent to <PublicEmail className="underline" />.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
