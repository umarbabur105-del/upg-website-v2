import Link from "next/link";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm bg-cream shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Image placeholder */}
      <div className="flex h-56 items-center justify-center bg-olive/10">
        <div className="text-center">
          <span className="font-serif text-lg font-medium text-olive-muted">
            {product.family}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-semibold text-charcoal">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/60">
          {product.summary}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs font-medium text-charcoal/40">
            MOQ: {product.moq}
          </span>
          <span className="text-charcoal/20">|</span>
          <span className="text-xs font-medium text-charcoal/40">
            {product.leadTime}
          </span>
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold transition-colors group-hover:text-gold-dark">
          Learn more
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
