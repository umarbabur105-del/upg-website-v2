import { getIndustryHubBySlug } from "@/data/industry-hubs";
import { getIndustryGuideBySlug } from "@/data/industry-guides";
import { getProductStyleGuide } from "@/data/product-styles";
import { getProductBySlug, products } from "@/data/products";

export interface IndustryVisual {
  src: string;
  alt: string;
}

const cosmeticsVisuals: Record<string, IndustryVisual> = {
  cosmetics: {
    src: "/images/redesign/hero/cosmetics-hub.jpg",
    alt: "Representative custom cosmetic outer packaging presentation",
  },
  "skincare-boxes": {
    src: "/images/redesign/samples/sample-skincare.jpg",
    alt: "Representative skincare outer packaging and presentation set",
  },
  "serum-boxes": {
    src: "/images/redesign/samples/sample-skincare.jpg",
    alt: "Representative printed serum outer packaging concept",
  },
  "cream-boxes": {
    src: "/images/redesign/samples/sample-skincare.jpg",
    alt: "Representative cream and lotion outer packaging concept",
  },
  "pr-boxes": {
    src: "/images/redesign/samples/sample-pr-kit.jpg",
    alt: "Representative custom cosmetics PR kit presentation",
  },
};

function stableIndex(value: string, length: number) {
  if (length === 0) return 0;
  const total = [...value].reduce(
    (sum, character) => sum + character.charCodeAt(0),
    0
  );
  return total % length;
}

function productVisual(productSlug: string, variationKey = productSlug) {
  const product = getProductBySlug(productSlug);
  if (!product) return undefined;

  const visualPool = [
    { src: product.heroImage, alt: `${product.shortName} packaging concept` },
    ...product.galleryImages,
  ];

  return visualPool[stableIndex(variationKey, visualPool.length)];
}

export function getIndustryLinkVisual(href: string): IndustryVisual {
  const pathname = href.split("?")[0].split("#")[0];
  const slug = pathname.split("/").filter(Boolean).at(-1) ?? "";

  if (pathname === "/cosmetics") return cosmeticsVisuals.cosmetics;

  if (pathname.startsWith("/cosmetics/")) {
    return (
      cosmeticsVisuals[slug] ??
      productVisual("custom-tuck-boxes", pathname) ??
      cosmeticsVisuals.cosmetics
    );
  }

  if (pathname.startsWith("/industries/")) {
    const hub = getIndustryHubBySlug(slug);
    if (hub) return hub.image;

    const guide = getIndustryGuideBySlug(slug);
    if (guide) return guide.image;
  }

  if (pathname.startsWith("/products/")) {
    const visual = productVisual(slug, pathname);
    if (visual) return visual;
  }

  if (pathname.startsWith("/packaging-styles/")) {
    const style = getProductStyleGuide(slug);
    if (style) {
      const visual = productVisual(style.parentProductSlug, pathname);
      if (visual) return visual;
    }
  }

  if (pathname.startsWith("/compare/")) {
    const product = products.find((candidate) =>
      pathname.includes(candidate.slug.replace("custom-", "").replace("-boxes", ""))
    );
    if (product) {
      const visual = productVisual(product.slug, pathname);
      if (visual) return visual;
    }
  }

  return {
    src: "/images/redesign/hero/materials-hero.jpg",
    alt: "Representative custom packaging materials and print finishes",
  };
}
