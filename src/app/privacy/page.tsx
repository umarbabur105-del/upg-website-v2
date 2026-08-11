import type { Metadata } from "next";
import { Section, SectionHeading, SectionSubheading } from "@/components/section";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "How Universal Packaging Group collects, uses, stores, and handles information submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-olive px-6 pt-32 pb-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading as="h1" className="text-offwhite">Privacy Policy</SectionHeading>
          <SectionSubheading className="text-offwhite/70">
            Effective August 6, 2026. This policy explains how information submitted
            through universalpackaginggroup.com is handled.
          </SectionSubheading>
        </div>
      </section>
      <Section variant="cream">
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-7 text-charcoal/75">
          <div>
            <h2 className="font-serif text-2xl text-charcoal">Information we collect</h2>
            <p className="mt-3">When you contact us, submit a project enquiry, request a sample, or purchase a sample kit, we collect the information you provide, such as your name, business contact details, company, packaging requirements, intended use, quantity, delivery location, and order reference. Payment details are collected and processed by our payment provider; UPG does not intentionally store full payment-card numbers. When you submit a form, we may also retain the landing page, referring page, and campaign parameters associated with that request so we can understand how the enquiry reached us. Standard hosting logs may record technical information needed for security and operation.</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-charcoal">How we use it</h2>
            <p className="mt-3">We use submitted information to evaluate your requirements, prepare pricing, communicate about the project, coordinate production and delivery, protect the website, and meet legal obligations. We do not sell personal information.</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-charcoal">Service providers and retention</h2>
            <p className="mt-3">Website hosting, Google Workspace, Stripe, email delivery, and related business-productivity providers may process information on our behalf. Submitted enquiries and sample order records are stored in access-controlled business systems and used by authorized personnel for project handling and fulfillment. We retain information only as long as reasonably needed for pricing, order and project records, security, and legal requirements.</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-charcoal">Analytics and consent choices</h2>
            <p className="mt-3">We use Google Analytics to understand website visits, traffic sources, page interactions, contact-link use, and whether an enquiry was successfully submitted. We do not intentionally send names, email addresses, phone numbers, project notes, or other form contents to Google Analytics. Analytics storage is enabled by default. Advertising storage, advertising user data, and advertising personalization remain disabled. You can opt out or change your choice at any time through the Privacy choices control in the website footer.</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-charcoal">Your choices</h2>
            <p className="mt-3">You may ask us to access, correct, or delete information associated with your request, subject to applicable legal and recordkeeping requirements. Email <a className="underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-charcoal">Updates</h2>
            <p className="mt-3">We may update this policy when our practices or legal requirements change. The effective date above identifies the current published version.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
