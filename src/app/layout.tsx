import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://universalpackaginggroup.com"),
  title: {
    default: "Premium Custom Packaging for Beauty and Product Brands | UPG",
    template: "%s",
  },
  description:
    "Custom packaging for beauty and product brands in the United States and Canada. Explore mailer boxes, rigid boxes, folding cartons, mylar pouches, and paper cups.",
  openGraph: {
    type: "website",
    siteName: "Universal Packaging Group",
    title: "Premium Custom Packaging for Beauty and Product Brands | UPG",
    description:
      "Cosmetics-first packaging with all day-one product formats visible from launch: rigid boxes, folding cartons, mailers, pouches, and cups.",
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
    "Premium quote-led custom packaging for beauty and product brands in the United States and Canada.",
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
      <body className={`${fraunces.variable} ${inter.variable} font-sans antialiased`}>
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
