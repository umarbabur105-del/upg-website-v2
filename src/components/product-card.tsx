import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden border border-border bg-surface transition-transform hover:-translate-y-0.5 hover:shadow-card"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-stone">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>
      <div className="p-6">
        <div className="eyebrow mb-3">{product.category}</div>
        <h3 className="font-serif text-2xl text-foreground">{product.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {product.summary}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-5 text-sm text-foreground/80">
          <div>
            <div className="eyebrow mb-1">MOQ</div>
            <div>{product.moq}</div>
          </div>
          <div>
            <div className="eyebrow mb-1">Lead time</div>
            <div>{product.leadTime}</div>
          </div>
        </div>
        <div className="mt-5 inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground">
          View product
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}
