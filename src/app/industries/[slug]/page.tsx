import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryGuidePage } from "@/components/industry-guide-page";
import {
  getIndustryGuideBySlug,
  industryGuides,
} from "@/data/industry-guides";
import { createPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return industryGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getIndustryGuideBySlug(slug);

  if (!guide) return {};

  return createPageMetadata({
    title: guide.name,
    description: guide.metaDescription,
    path: `/industries/${guide.slug}`,
    keywords: guide.keywords,
  });
}

export default async function IndustryApplicationPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getIndustryGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return <IndustryGuidePage guide={guide} />;
}
