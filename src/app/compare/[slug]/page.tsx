import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComparisonGuidePage } from "@/components/comparison-guide-page";
import {
  comparisonGuides,
  getComparisonGuide,
} from "@/data/comparison-guides";
import { createPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return comparisonGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getComparisonGuide(slug);

  if (!guide) return {};

  return createPageMetadata({
    title: guide.name,
    description: guide.metaDescription,
    path: `/compare/${guide.slug}`,
    keywords: guide.keywords,
  });
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getComparisonGuide(slug);

  if (!guide) {
    notFound();
  }

  return <ComparisonGuidePage guide={guide} />;
}
