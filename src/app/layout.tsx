import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { LeadAttributionCapture } from "@/components/lead-attribution-capture";
import { CORE_KEYWORDS, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Universal Packaging Group",
  authors: [{ name: "Universal Packaging Group", url: SITE_URL }],
  creator: "Universal Packaging Group",
  publisher: "Universal Packaging Group",
  category: "Custom packaging",
  keywords: CORE_KEYWORDS,
  title: {
    default: "Custom Cosmetic Packaging for Beauty Brands | UPG",
    template: "%s | UPG",
  },
  description:
    "Custom cosmetic packaging for beauty brands in the United States and Canada. Plan folding cartons, rigid boxes, PR kits, mailers, and inserts with guided quoting and production coordination.",
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
    siteName: "Universal Packaging Group",
    locale: "en_US",
    title: "Custom Cosmetic Packaging for Beauty Brands | UPG",
    description:
      "Guided custom packaging for skincare, cosmetics, PR launches, and growing product brands in the United States and Canada.",
    url: SITE_URL,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Cosmetic Packaging for Beauty Brands | UPG",
    description:
      "Folding cartons, rigid boxes, mailers, PR kits, and inserts with guided quoting and production coordination.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Universal Packaging Group",
      alternateName: "UPG",
      url: SITE_URL,
      email: "quotes@universalpackaginggroup.com",
      description:
        "A quote-led custom packaging sourcing and project-coordination company for beauty and product brands in the United States and Canada.",
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "quotes@universalpackaginggroup.com",
        areaServed: ["US", "CA"],
        availableLanguage: ["English"],
      },
      knowsAbout: [
        "Custom cosmetic packaging",
        "Folding cartons",
        "Rigid boxes",
        "Custom mailer boxes",
        "PR packaging kits",
        "Packaging inserts",
        "Artwork and dieline review",
        "Packaging production coordination",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Custom packaging services",
        itemListElement: [
          "Custom folding cartons",
          "Custom rigid boxes",
          "Custom mailer boxes",
          "Cosmetics PR kits",
          "Custom packaging inserts",
          "Custom pouches",
          "Custom paper cups",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Universal Packaging Group",
      alternateName: "UPG Custom Packaging",
      description:
        "Custom cosmetic packaging guidance, quoting, and production coordination for brands in the United States and Canada.",
      inLanguage: "en-US",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased">
        <LeadAttributionCapture />
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
