import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageTemplate } from "@/components/product-page-template";
import { getProductBySlug, getProductFaqs, products } from "@/data/products";
import { siteConfig } from "@/data/site";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return {};

  const title = product.name;
  return createPageMetadata({
    title,
    description: product.metaDescription,
    path: `/products/${slug}`,
    keywords: [
      product.name,
      product.shortName,
      ...product.industries,
      ...(product.searchTerms ?? []),
    ],
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productUrl = `${SITE_URL}/products/${slug}`;
  const productFaqs = getProductFaqs(product);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${productUrl}#service`,
    name: product.name,
    description: product.summary,
    url: productUrl,
    image: `${SITE_URL}${product.heroImage}`,
    serviceType: `${product.name} manufacturing`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: siteConfig.market,
    category: product.category,
    audience: {
      "@type": "BusinessAudience",
      audienceType: product.industries.join(", "),
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Available materials",
        value: product.materials.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "Planning MOQ",
        value: product.moq,
      },
      {
        "@type": "PropertyValue",
        name: "Production planning status",
        value: product.leadTime,
      },
      {
        "@type": "PropertyValue",
        name: "Product scope and qualification",
        value: product.screeningNote,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: productFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${SITE_URL}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ProductPageTemplate product={product} />
    </>
  );
}
