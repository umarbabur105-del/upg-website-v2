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
    siteName: "Universal Packaging Group",
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
      name: "Universal Packaging Group",
      alternateName: "UPG",
      url: SITE_URL,
      email: "quotes@universalpackaginggroup.com",
      description:
        "A custom packaging manufacturer producing custom boxes and flexible packaging for brands worldwide.",
      areaServed: { "@type": "Place", name: "Worldwide" },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "quotes@universalpackaginggroup.com",
        areaServed: "Worldwide",
        availableLanguage: ["English"],
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
        itemListElement: [
          "Custom tuck boxes",
          "Custom corrugated mailer boxes",
          "Custom magnetic boxes",
          "Custom collapsible magnetic boxes",
          "Custom Mylar bags",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Product", name },
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
        "Custom boxes and flexible packaging manufacturing for brands worldwide.",
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
