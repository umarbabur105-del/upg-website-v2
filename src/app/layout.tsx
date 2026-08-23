import type { Metadata } from "next";
import Script from "next/script";
import { AnalyticsRuntime } from "@/components/analytics-runtime";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { LeadAttributionCapture } from "@/components/lead-attribution-capture";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site";
import { CORE_KEYWORDS, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";
import "@fontsource-variable/inter";
import "./globals.css";

const rawGaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
const gaMeasurementId = /^G-[A-Z0-9]+$/.test(rawGaMeasurementId)
  ? rawGaMeasurementId
  : undefined;

const analyticsConsentBootstrap = `
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
  var upgAnalyticsChoice;
  try {
    upgAnalyticsChoice = window.localStorage.getItem("upg_analytics_consent_v1");
  } catch (error) {
    upgAnalyticsChoice = null;
  }
  window.gtag("consent", "default", {
    analytics_storage: upgAnalyticsChoice === "granted" ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500
  });
  window.gtag("set", "ads_data_redaction", true);
`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: SITE_URL }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Custom packaging",
  keywords: CORE_KEYWORDS,
  title: {
    default: "Custom Packaging Manufacturer | UPG",
    template: "%s | UPG",
  },
  description:
    "Custom tuck boxes, corrugated mailer boxes, magnetic boxes, collapsible magnetic boxes, and Mylar bags manufactured for brands worldwide.",
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    title: "Custom Packaging Manufacturer | UPG",
    description:
      "Custom boxes and flexible packaging manufactured for brands worldwide.",
    url: SITE_URL,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Packaging Manufacturer | UPG",
    description:
      "Tuck boxes, corrugated mailers, magnetic boxes, collapsible magnetic boxes, and Mylar bags.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: siteConfig.name,
      alternateName: siteConfig.shortName,
      url: SITE_URL,
      email: siteConfig.email,
      telephone: siteConfig.phoneNumber,
      description:
        "A custom packaging manufacturer producing custom boxes and flexible packaging for brands worldwide.",
      areaServed: { "@type": "Place", name: siteConfig.market },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.email,
        telephone: siteConfig.phoneNumber,
        url: siteConfig.whatsappUrl,
        areaServed: siteConfig.market,
        availableLanguage: ["English"],
      },
      hasMerchantReturnPolicy: {
        "@id": siteConfig.merchantReturnPolicyId,
      },
      knowsAbout: [
        "Custom boxes",
        "Custom tuck boxes",
        "Corrugated boxes",
        "Ear-lock mailer boxes",
        "Magnetic rigid boxes",
        "Collapsible magnetic boxes",
        "Custom Mylar bags",
        "PR packaging kits",
        "Packaging inserts",
        "Artwork and dieline review",
        "Custom packaging manufacturing",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Custom packaging products",
        itemListElement: products.map((product) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            "@id": `${SITE_URL}/products/${product.slug}#service`,
            name: product.name,
            serviceType: `${product.name} manufacturing`,
            url: `${SITE_URL}/products/${product.slug}`,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: siteConfig.market,
          },
        })),
      },
    },
    {
      "@type": "MerchantReturnPolicy",
      "@id": siteConfig.merchantReturnPolicyId,
      merchantReturnLink: siteConfig.merchantReturnPolicyUrl,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: siteConfig.name,
      alternateName: "UPG Custom Packaging",
      description:
        "Custom boxes and flexible packaging manufacturing for brands worldwide.",
      inLanguage: siteConfig.language,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {gaMeasurementId ? (
          <script
            id="google-analytics-consent-default"
            dangerouslySetInnerHTML={{ __html: analyticsConsentBootstrap }}
          />
        ) : null}
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="UPG concise machine-readable reference"
        />
        <link
          rel="alternate"
          type="application/json"
          href="/product-catalog.json"
          title="UPG machine-readable product catalog"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased">
        <LeadAttributionCapture />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCtaBar />
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics-config" strategy="afterInteractive">
              {`
                window.gtag("js", new Date());
                window.gtag("config", "${gaMeasurementId}", {
                  allow_google_signals: false,
                  allow_ad_personalization_signals: false
                });
              `}
            </Script>
            <AnalyticsRuntime />
          </>
        ) : null}
      </body>
    </html>
  );
}
