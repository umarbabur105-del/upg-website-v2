import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { OrganicIntentBridge } from "@/components/organic-intent-bridge";
import { SampleKitCheckout } from "@/components/sample-kit-checkout";
import { SampleRequestForm } from "@/components/sample-request-form";
import {
  sampleKitDeliveryEstimate,
  sampleKitShippingRegionLabel,
  type SampleKit,
} from "@/data/sample-kit";
import { siteConfig } from "@/data/site";
import { getOrganicIntentRoute } from "@/data/organic-intent-routes";

function getSampleKitFaqs(kit: SampleKit) {
  return [
    {
      question: `What is included in the ${kit.shortName}?`,
      answer: `${kit.selectionNote} ${kit.productBoundary}`,
    },
    {
      question: `How much does the ${kit.shortName} cost?`,
      answer: `The kit costs $${kit.price.toFixed(2)} USD with shipping included to ${sampleKitShippingRegionLabel}. ${kit.creditText}`,
    },
    {
      question: `How long does ${kit.shortName.toLowerCase()} delivery take?`,
      answer: `Estimated delivery is ${sampleKitDeliveryEstimate} to an eligible checkout destination.`,
    },
    {
      question: "Does the sample kit define my final production specification?",
      answer:
        "No. The samples support physical comparison and planning. Final structure, dimensions, material, print, finish, quantity, pricing, proofing, and delivery are confirmed for the production project.",
    },
  ];
}

function buildStructuredData(kit: SampleKit) {
  const faqItems = getSampleKitFaqs(kit);
  const product = {
    "@type": "Product",
    "@id": `${kit.url}#product`,
    name: kit.name,
    description: `${kit.description} ${kit.selectionNote} ${kit.productBoundary}`,
    image: `${siteConfig.url}${kit.image}`,
    sku: kit.sku,
    brand: {
      "@type": "Brand",
      name: siteConfig.shortName,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Kit contents",
        value: kit.selectionNote,
      },
      {
        "@type": "PropertyValue",
        name: "Production-order credit",
        value: `$${kit.price.toFixed(2)} credited toward the first UPG production order`,
      },
      {
        "@type": "PropertyValue",
        name: "Product boundary",
        value: kit.productBoundary,
      },
    ],
    offers: {
      "@type": "Offer",
      url: kit.url,
      priceCurrency: kit.currency,
      price: kit.price.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${siteConfig.url}/#organization` },
      hasMerchantReturnPolicy: {
        "@id": siteConfig.merchantReturnPolicyId,
      },
      shippingDetails: kit.shippingCountries.map((country) => ({
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0.00",
          currency: kit.currency,
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: country,
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 6,
            unitCode: "DAY",
          },
        },
      })),
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${kit.url}#webpage`,
        url: kit.url,
        name: kit.name,
        description: kit.description,
        mainEntity: { "@id": `${kit.url}#product` },
      },
      product,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Packaging Samples",
            item: `${siteConfig.url}/samples`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: kit.shortName,
            item: kit.url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function SampleKitProductPage({ kit }: { kit: SampleKit }) {
  const faqItems = getSampleKitFaqs(kit);
  const intentRoute = getOrganicIntentRoute(kit.path);
  const quoteProduct = kit.kind === "box" ? "Tuck Boxes" : "Mylar Bags";
  const steps = [
    {
      number: "01",
      title: `Order the ${kit.shortName}`,
      description: `Complete the secure $${kit.price.toFixed(2)} checkout and provide one eligible delivery address.`,
    },
    {
      number: "02",
      title: "Receive it in 3–7 business days",
      description: kit.evaluationDescription,
    },
    {
      number: "03",
      title: "Apply the full credit",
      description: kit.creditText,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildStructuredData(kit)),
        }}
      />

      <section className="bg-cream">
        <div className="container-editorial grid gap-12 py-14 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
            >
              <Link href="/samples" className="hover:text-foreground">
                Packaging samples
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-foreground">
                {kit.shortName}
              </span>
            </nav>
            <div className="eyebrow mb-5">{kit.heroEyebrow}</div>
            <h1 className="text-balance font-serif text-[clamp(3rem,5vw,5rem)] font-light leading-[0.98] tracking-[-0.035em]">
              {kit.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {kit.heroDescription}
            </p>

            <div
              id="sample-kit-checkout"
              className="mt-8 scroll-mt-28 border border-border bg-surface p-6 shadow-soft"
            >
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="eyebrow">One {kit.shortName}</div>
                  <div className="mt-2 text-4xl font-semibold tracking-tight text-foreground">
                    ${kit.price.toFixed(2)} USD
                  </div>
                </div>
                <div className="text-right text-sm leading-relaxed text-muted-foreground">
                  <div>Shipping included</div>
                  <div>Estimated delivery in {sampleKitDeliveryEstimate}</div>
                  <div>Available to order</div>
                  <div>Full kit price credited to first order</div>
                </div>
              </div>
              <div className="mt-6">
                <SampleKitCheckout kit={kit} />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span>Checkout: {sampleKitShippingRegionLabel}</span>
              <span>One-time purchase</span>
              <span>{kit.kind === "box" ? "Box samples only" : "Flexible-packaging samples only"}</span>
              <Link href="/shipping-returns" className="underline hover:text-foreground">
                Shipping & returns
              </Link>
            </div>
          </div>

          <div>
            <div className="relative aspect-[4/3] overflow-hidden border border-border bg-stone shadow-card">
              <Image
                src={kit.image}
                alt={kit.imageAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {kit.imageDisclosure}
            </p>
          </div>
        </div>
      </section>

      {intentRoute ? <OrganicIntentBridge route={intentRoute} /> : null}

      <section className="section-shell bg-background">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <div className="eyebrow mb-4">{kit.contentsEyebrow}</div>
            <h2 className="display-2 text-balance">{kit.contentsTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {kit.selectionNote} The kit is for evaluation and does not promise
              an identical production specification.
            </p>
            <p className="mt-4 border-l-2 border-gold pl-5 text-sm leading-relaxed text-muted-foreground">
              {kit.productBoundary}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {kit.includedDirections.map((item) => (
              <article key={item.title} className="surface-card p-7">
                <h3 className="font-serif text-2xl text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <div className="eyebrow mb-4">How it works</div>
              <h2 className="display-2 text-balance">One kit. One clear credit.</h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {kit.creditText} Custom production remains separately specified
                and quoted around dimensions, material, print, finish, quantity,
                and delivery destination.
              </p>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {steps.map((step) => (
                <div key={step.number} className="grid gap-4 py-7 sm:grid-cols-[4rem_1fr]">
                  <div className="text-sm font-semibold text-gold-dark">{step.number}</div>
                  <div>
                    <h3 className="font-serif text-2xl text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-background">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <div className="eyebrow mb-4">Production paths</div>
            <h2 className="display-2 text-balance">
              Move from samples to the relevant custom packaging format.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Use the physical samples for comparison, then open the production
              family or format closest to your project before requesting pricing.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {kit.relatedProductionLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="surface-card group flex min-h-52 flex-col p-6 hover:-translate-y-1 hover:shadow-card"
              >
                <h3 className="font-serif text-2xl text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <span className="mt-auto pt-6 text-sm text-foreground">
                  Review production options →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="eyebrow mb-4">Sample kit questions</div>
            <h2 className="display-2 text-balance">Know exactly what you are ordering.</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              The kit is a fixed-price physical product. Custom production is a
              separate, project-specific process.
            </p>
          </div>
          <div className="surface-card p-6 sm:p-8 lg:col-span-8 lg:p-10">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      <section id="free-sample-request" className="section-shell scroll-mt-24 bg-background">
        <div className="container-editorial grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <div className="eyebrow mb-4">Qualified project option</div>
            <h2 className="display-2 text-balance">Request a free sample review.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Brands with an active packaging project can request a free sample
              review. UPG checks product fit, expected quantity, destination, and
              available physical samples before confirming shipment.
            </p>
            <div className="mt-8 border-l-2 border-gold pl-5 text-sm leading-relaxed text-muted-foreground">
              A request is not an automatic order. UPG will confirm what is
              available, whether any delivery cost applies, and the expected
              timing before anything is shipped.
            </div>
          </div>
          <div className="border border-border bg-surface p-6 shadow-soft md:p-8">
            <SampleRequestForm />
          </div>
        </div>
      </section>

      <section className="section-shell bg-gradient-moss text-primary-foreground">
        <div className="container-editorial text-center">
          <div className="eyebrow mb-4 text-primary-foreground/65">
            Ready for production planning?
          </div>
          <h2 className="mx-auto max-w-4xl font-serif text-4xl leading-tight md:text-6xl">
            Turn the sample direction into a custom packaging specification.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/75">
            Share the structure, size, material, print, finish, quantity, and
            delivery destination. UPG will build the project-specific quote.
          </p>
          <Link
            href={`/get-a-quote?product=${encodeURIComponent(quoteProduct)}&builder_note=${encodeURIComponent(
              `Sample kit reviewed: ${kit.shortName}.`
            )}`}
            className="mt-8 inline-flex rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-stone"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </>
  );
}
