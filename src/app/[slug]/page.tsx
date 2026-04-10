import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProductBySlug } from "@/data/products";
import { ProductPageTemplate } from "@/components/product-page-template";

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

  const url = `https://universalpackaginggroup.com/products/${slug}`;

  const titleMap: Record<string, string> = {
    "custom-mailer-boxes": "Custom Corrugated Mailer Boxes — UPG",
    "custom-rigid-boxes": "Custom Magnetic Closure Rigid Boxes — UPG",
    "custom-mylar-bags": "Custom Stand Up Mylar Pouches — UPG",
    "custom-folding-cartons": "Custom Folding Cartons — UPG",
    "custom-coffee-cups": "Custom Printed Paper Cups — UPG",
  };

  const descMap: Record<string, string> = {
    "custom-mailer-boxes": "Custom corrugated mailer boxes from 500 units. Full-color print, e-commerce ready. Quote in 24 hours.",
    "custom-rigid-boxes": "Premium rigid boxes with magnetic closure for luxury brands. Custom sizing and finishes. Quote in 24 hours.",
    "custom-mylar-bags": "Custom printed stand-up mylar pouches for supplements, food, and personal care. From 1,000 units.",
    "custom-folding-cartons": "Reverse tuck end folding cartons for retail and cosmetics. Custom sizes and full-color print from 1,000 units.",
    "custom-coffee-cups": "Custom single-wall paper cups for cafes and beverage brands. Branded print from 1,000 units.",
  };

  const title = titleMap[slug] ?? `${product.name} — Custom ${product.family} | UPG`;
  const description = descMap[slug] ?? product.summary;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productUrl = `https://universalpackaginggroup.com/products/${slug}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    sku: product.sku,
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: "Universal Packaging Group",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Universal Packaging Group",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://universalpackaginggroup.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.family,
        item: `https://universalpackaginggroup.com/#products`,
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
