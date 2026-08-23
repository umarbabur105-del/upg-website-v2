import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";
import { cosmeticsSubcategories } from "@/data/catalog";
import { industryGuides } from "@/data/industry-guides";
import { mailerApplications } from "@/data/mailer-applications";
import { productStyleGuides } from "@/data/product-styles";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site";
import { SITE_URL } from "@/lib/seo";

const CONTENT_UPDATED_AT = new Date(`${siteConfig.contentReviewedAt}T00:00:00.000Z`);
const COSMETICS_UPDATED_AT = new Date("2026-08-13T00:00:00.000Z");
const STYLE_LIBRARY_UPDATED_AT = new Date("2026-08-13T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/get-a-quote`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/packaging-styles`,
      lastModified: STYLE_LIBRARY_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 0.92,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: new Date("2026-08-12T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/tools/packaging-format-finder`,
      lastModified: new Date("2026-08-12T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/packaging-artwork-preflight`,
      lastModified: new Date("2026-08-13T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/packaging-spec-builder`,
      lastModified: new Date("2026-08-12T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/cosmetics`,
      lastModified: COSMETICS_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/industries`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/materials-finishes`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/samples`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/samples/box-sample-kit`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/samples/mylar-bag-sample-kit`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 0.78,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/shipping-returns`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: product.reviewedAt
      ? new Date(`${product.reviewedAt}T00:00:00.000Z`)
      : CONTENT_UPDATED_AT,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const cosmeticsRoutes: MetadataRoute.Sitemap = cosmeticsSubcategories.map(
    (subcategory) => ({
      url: `${SITE_URL}/cosmetics/${subcategory.slug}`,
      lastModified: subcategory.reviewedAt
        ? new Date(`${subcategory.reviewedAt}T00:00:00.000Z`)
        : COSMETICS_UPDATED_AT,
      changeFrequency: "monthly" as const,
      priority: 0.82,
    })
  );

  const applicationRoutes: MetadataRoute.Sitemap = mailerApplications.map(
    (application) => ({
      url: `${SITE_URL}/applications/${application.slug}`,
      lastModified: new Date(`${application.reviewedAt}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.78,
    })
  );

  const industryRoutes: MetadataRoute.Sitemap = industryGuides.map((guide) => ({
    url: `${SITE_URL}/industries/${guide.slug}`,
    lastModified: new Date(`${guide.reviewedAt}T00:00:00.000Z`),
    changeFrequency: "monthly" as const,
    priority: 0.82,
  }));

  const productStyleRoutes: MetadataRoute.Sitemap = productStyleGuides.map(
    (guide) => ({
      url: `${SITE_URL}/packaging-styles/${guide.slug}`,
      lastModified: new Date(`${guide.reviewedAt}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...productStyleRoutes,
    ...applicationRoutes,
    ...industryRoutes,
    ...cosmeticsRoutes,
    ...blogRoutes,
  ];
}
