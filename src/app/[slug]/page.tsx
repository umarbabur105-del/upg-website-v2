import { permanentRedirect, notFound } from "next/navigation";
import { products } from "@/data/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const isProductSlug = products.some((product) => product.slug === slug);

  if (!isProductSlug) {
    notFound();
  }

  permanentRedirect(`/products/${slug}`);
}
