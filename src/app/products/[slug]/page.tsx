import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageTemplate } from "@/components/product-page-template";
import { getProductBySlug, products } from "@/data/products";
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

  const title = `Custom ${product.name}`;
  const description = product.longSummary;
  return createPageMetadata({
    title,
    description,
    path: `/products/${slug}`,
    keywords: [product.name, product.shortName, ...product.industries],
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productUrl = `${SITE_URL}/products/${slug}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    sku: product.sku,
    url: productUrl,
    image: `${SITE_URL}${product.heroImage}`,
    brand: {
      "@type": "Brand",
      name: "Universal Packaging Group",
    },
    category: product.category,
    material: product.materials,
    audience: {
      "@type": "BusinessAudience",
      audienceType: product.industries.join(", "),
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Planning MOQ",
        value: product.moq,
      },
      {
        "@type": "PropertyValue",
        name: "Typical production planning",
        value: product.leadTime,
      },
    ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductPageTemplate product={product} />
    </>
  );
}
