import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductStyleGuidePage } from "@/components/product-style-guide-page";
import {
  getProductStyleGuide,
  productStyleGuides,
} from "@/data/product-styles";
import { createPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return productStyleGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getProductStyleGuide(slug);

  if (!guide) return {};

  return createPageMetadata({
    title: guide.name,
    description: guide.metaDescription,
    path: `/packaging-styles/${guide.slug}`,
    keywords: [
      ...guide.searchTerms,
      guide.name.toLowerCase(),
      `custom printed ${guide.shortName.toLowerCase()}`,
      guide.family.toLowerCase(),
    ],
  });
}

export default async function PackagingStylePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getProductStyleGuide(slug);

  if (!guide) {
    notFound();
  }

  return <ProductStyleGuidePage guide={guide} />;
}
