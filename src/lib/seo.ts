import type { Metadata } from "next";

export const SITE_URL = "https://universalpackaginggroup.com";

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/images/redesign/hero/hero-cosmetics.jpg`,
  width: 1920,
  height: 1080,
  alt: "Custom boxes and flexible packaging by Universal Packaging Group",
};

export const CORE_KEYWORDS = [
  "custom boxes",
  "custom packaging",
  "corrugated boxes",
  "custom tuck boxes",
  "custom folding cartons",
  "custom corrugated mailer boxes",
  "ear lock mailer boxes",
  "custom magnetic boxes",
  "custom collapsible magnetic boxes",
  "custom mylar bags",
  "custom cosmetic packaging",
];

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
}: PageMetadataInput): Metadata {
  const url = new URL(path, SITE_URL).toString();

  return {
    title,
    description,
    keywords: [...new Set([...CORE_KEYWORDS, ...keywords])],
    alternates: { canonical: url },
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: "Universal Packaging Group",
      locale: "en_US",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}
