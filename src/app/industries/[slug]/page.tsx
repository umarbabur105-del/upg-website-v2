import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryGuidePage } from "@/components/industry-guide-page";
import { IndustryHubPage } from "@/components/industry-hub-page";
import {
  getIndustryHubBySlug,
  industryHubs,
} from "@/data/industry-hubs";
import {
  getIndustryGuideBySlug,
  industryGuides,
} from "@/data/industry-guides";
import { createPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [...industryHubs, ...industryGuides].map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const hub = getIndustryHubBySlug(slug);
  const guide = getIndustryGuideBySlug(slug);

  if (hub) {
    return createPageMetadata({
      title: hub.name,
      description: hub.metaDescription,
      path: `/industries/${hub.slug}`,
      keywords: hub.keywords,
    });
  }

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
  const hub = getIndustryHubBySlug(slug);
  const guide = getIndustryGuideBySlug(slug);

  if (hub) {
    return <IndustryHubPage hub={hub} />;
  }

  if (!guide) {
    notFound();
  }

  return <IndustryGuidePage guide={guide} />;
}
