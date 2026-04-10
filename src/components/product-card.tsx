import Link from "next/link";
import type { Product } from "@/data/products";

function BoxSvg() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      {/* Main box body */}
      <rect x="40" y="60" width="120" height="80" rx="2" stroke="#3C4A2E" strokeWidth="1.5" fill="none" />
      {/* Box top flap open */}
      <path d="M40 60 L100 35 L160 60" stroke="#3C4A2E" strokeWidth="1.5" fill="none" />
      {/* Box interior depth line */}
      <line x1="40" y1="60" x2="60" y2="75" stroke="#3C4A2E" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="160" y1="60" x2="140" y2="75" stroke="#3C4A2E" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="60" y1="75" x2="140" y2="75" stroke="#3C4A2E" strokeWidth="1" strokeDasharray="3 2" />
      {/* Fold lines on flap */}
      <line x1="100" y1="35" x2="100" y2="60" stroke="#B8963E" strokeWidth="1" strokeDasharray="4 3" />
      {/* Small accent dot */}
      <circle cx="100" cy="100" r="3" fill="#B8963E" opacity="0.4" />
    </svg>
  );
}

function MagneticBoxSvg() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      {/* Lid */}
      <rect x="35" y="30" width="130" height="45" rx="2" stroke="#3C4A2E" strokeWidth="1.5" fill="none" />
      {/* Lid inner offset */}
      <rect x="41" y="36" width="118" height="33" rx="1" stroke="#3C4A2E" strokeWidth="0.75" fill="none" opacity="0.4" />
      {/* Base */}
      <rect x="40" y="80" width="120" height="50" rx="2" stroke="#3C4A2E" strokeWidth="1.5" fill="none" />
      {/* Magnet dots */}
      <circle cx="65" cy="75" r="3.5" stroke="#B8963E" strokeWidth="1.2" fill="none" />
      <circle cx="135" cy="75" r="3.5" stroke="#B8963E" strokeWidth="1.2" fill="none" />
      {/* Ribbon */}
      <line x1="100" y1="80" x2="100" y2="130" stroke="#B8963E" strokeWidth="1" opacity="0.5" />
      <line x1="85" y1="130" x2="115" y2="130" stroke="#B8963E" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function MylarbagSvg() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      {/* Bag body */}
      <path d="M55 130 Q50 90 48 55 L75 42 L125 42 L152 55 Q150 90 145 130 Z" stroke="#3C4A2E" strokeWidth="1.5" fill="none" />
      {/* Zipper line */}
      <line x1="58" y1="55" x2="142" y2="55" stroke="#3C4A2E" strokeWidth="1.5" />
      {/* Zipper teeth */}
      <path d="M65 55 L65 60 M75 55 L75 60 M85 55 L85 60 M95 55 L95 60 M105 55 M115 55 L115 60 M125 55 L125 60 M135 55 L135 60" stroke="#3C4A2E" strokeWidth="1" />
      {/* Seal area top */}
      <line x1="75" y1="42" x2="75" y2="32" stroke="#3C4A2E" strokeWidth="1" />
      <line x1="125" y1="42" x2="125" y2="32" stroke="#3C4A2E" strokeWidth="1" />
      <path d="M75 32 Q100 24 125 32" stroke="#3C4A2E" strokeWidth="1.5" fill="none" />
      {/* Bottom gusset */}
      <path d="M55 130 Q100 118 145 130" stroke="#3C4A2E" strokeWidth="1" fill="none" />
      {/* Label area */}
      <rect x="68" y="68" width="64" height="38" rx="1" stroke="#B8963E" strokeWidth="1" fill="none" opacity="0.5" />
      <line x1="75" y1="80" x2="125" y2="80" stroke="#B8963E" strokeWidth="0.75" opacity="0.4" />
      <line x1="75" y1="88" x2="118" y2="88" stroke="#B8963E" strokeWidth="0.75" opacity="0.4" />
    </svg>
  );
}

function FoldingCartonSvg() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      {/* Main panel front */}
      <rect x="55" y="35" width="90" height="110" rx="1" stroke="#3C4A2E" strokeWidth="1.5" fill="none" />
      {/* Top tuck flap */}
      <path d="M55 35 Q100 18 145 35" stroke="#3C4A2E" strokeWidth="1.2" fill="none" />
      {/* Bottom tuck flap */}
      <path d="M55 145 Q100 162 145 145" stroke="#3C4A2E" strokeWidth="1.2" fill="none" />
      {/* Side panel */}
      <rect x="145" y="45" width="18" height="90" rx="1" stroke="#3C4A2E" strokeWidth="1" fill="none" opacity="0.5" />
      {/* Fold score lines */}
      <line x1="55" y1="50" x2="145" y2="50" stroke="#3C4A2E" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />
      <line x1="55" y1="130" x2="145" y2="130" stroke="#3C4A2E" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />
      {/* Label area */}
      <rect x="68" y="62" width="64" height="55" rx="1" stroke="#B8963E" strokeWidth="1" fill="none" opacity="0.5" />
      <line x1="75" y1="78" x2="125" y2="78" stroke="#B8963E" strokeWidth="0.75" opacity="0.4" />
      <line x1="75" y1="88" x2="118" y2="88" stroke="#B8963E" strokeWidth="0.75" opacity="0.4" />
    </svg>
  );
}

function CupSvg() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      {/* Cup body — tapered */}
      <path d="M65 35 L75 135 L125 135 L135 35 Z" stroke="#3C4A2E" strokeWidth="1.5" fill="none" />
      {/* Rim */}
      <ellipse cx="100" cy="35" rx="35" ry="8" stroke="#3C4A2E" strokeWidth="1.5" fill="none" />
      {/* Base */}
      <ellipse cx="100" cy="133" rx="25" ry="5" stroke="#3C4A2E" strokeWidth="1" fill="none" />
      {/* Sleeve */}
      <path d="M69 80 L72 108 L128 108 L131 80 Z" stroke="#B8963E" strokeWidth="1" fill="none" opacity="0.6" />
      {/* Seam line */}
      <line x1="100" y1="35" x2="100" y2="135" stroke="#3C4A2E" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.3" />
      {/* Lid hint */}
      <ellipse cx="100" cy="30" rx="35" ry="7" stroke="#3C4A2E" strokeWidth="0.75" fill="none" opacity="0.3" />
      <path d="M88 30 Q100 22 112 30" stroke="#3C4A2E" strokeWidth="1" fill="none" opacity="0.4" />
    </svg>
  );
}

const familySvgMap: Record<Product["family"], () => React.ReactElement> = {
  Boxes: BoxSvg,
  "Mylar Bags": MylarbagSvg,
  "Paper Cups": CupSvg,
};

const slugSvgMap: Record<string, () => React.ReactElement> = {
  "custom-mailer-boxes": BoxSvg,
  "custom-rigid-boxes": MagneticBoxSvg,
  "custom-folding-cartons": FoldingCartonSvg,
  "custom-mylar-bags": MylarbagSvg,
  "custom-coffee-cups": CupSvg,
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const SvgComponent = slugSvgMap[product.slug] ?? familySvgMap[product.family] ?? BoxSvg;

  return (
    <Link
      href={`/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm bg-cream shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Product visual */}
      <div className="flex h-56 items-center justify-center bg-surface p-8">
        <SvgComponent />
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
