import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://universalpackaginggroup.com"),
  title: {
    default: "Custom Packaging for Brands — UPG",
    template: "%s",
  },
  description:
    "Custom boxes, mylar bags, and paper cups for US and Canada brands. Fast quotes, free design support, low MOQs.",
  openGraph: {
    type: "website",
    siteName: "Universal Packaging Group",
    title: "Custom Packaging for Brands — UPG",
    description:
      "Custom boxes, mylar bags, and paper cups for US and Canada brands. Fast quotes, free design support, low MOQs.",
    url: "https://universalpackaginggroup.com",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Universal Packaging Group",
  alternateName: "UPG",
  url: "https://universalpackaginggroup.com",
  email: "quotes@universalpackaginggroup.com",
  description:
    "Custom boxes, mylar bags, and paper cups for brands in the United States and Canada.",
  areaServed: ["US", "CA"],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
