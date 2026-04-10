import Link from "next/link";

const heroMetrics = [
  { label: "Quote in 24hrs" },
  { label: "US & Canada delivery" },
  { label: "100-unit MOQ" },
  { label: "Free design support" },
];

function HeroProductGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Box illustration */}
      <div className="flex aspect-square items-center justify-center rounded-sm bg-offwhite/5 p-5">
        <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full opacity-70">
          <rect x="10" y="28" width="80" height="52" rx="1" stroke="#F5F0E8" strokeWidth="1.2" fill="none" />
          <path d="M10 28 L50 12 L90 28" stroke="#F5F0E8" strokeWidth="1.2" fill="none" />
          <line x1="50" y1="12" x2="50" y2="28" stroke="#B8963E" strokeWidth="1" strokeDasharray="3 2" />
        </svg>
      </div>
      {/* Rigid box illustration */}
      <div className="flex aspect-square items-center justify-center rounded-sm bg-offwhite/5 p-5">
        <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full opacity-70">
          <rect x="10" y="10" width="80" height="28" rx="1" stroke="#F5F0E8" strokeWidth="1.2" fill="none" />
          <rect x="14" y="14" width="72" height="20" rx="1" stroke="#F5F0E8" strokeWidth="0.6" fill="none" opacity="0.4" />
          <rect x="12" y="42" width="76" height="32" rx="1" stroke="#F5F0E8" strokeWidth="1.2" fill="none" />
          <circle cx="34" cy="37" r="2.5" stroke="#B8963E" strokeWidth="1" fill="none" />
          <circle cx="66" cy="37" r="2.5" stroke="#B8963E" strokeWidth="1" fill="none" />
        </svg>
      </div>
      {/* Mylar bag illustration */}
      <div className="flex aspect-square items-center justify-center rounded-sm bg-offwhite/5 p-5">
        <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full opacity-70">
          <path d="M25 70 Q22 44 20 22 L38 14 L62 14 L80 22 Q78 44 75 70 Z" stroke="#F5F0E8" strokeWidth="1.2" fill="none" />
          <line x1="27" y1="26" x2="73" y2="26" stroke="#F5F0E8" strokeWidth="1.2" />
          <rect x="32" y="36" width="36" height="22" rx="1" stroke="#B8963E" strokeWidth="0.8" fill="none" opacity="0.5" />
        </svg>
      </div>
      {/* Cup illustration */}
      <div className="flex aspect-square items-center justify-center rounded-sm bg-offwhite/5 p-5">
        <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full opacity-70">
          <path d="M28 12 L34 72 L66 72 L72 12 Z" stroke="#F5F0E8" strokeWidth="1.2" fill="none" />
          <ellipse cx="50" cy="12" rx="22" ry="5" stroke="#F5F0E8" strokeWidth="1.2" fill="none" />
          <ellipse cx="50" cy="70" rx="16" ry="3.5" stroke="#F5F0E8" strokeWidth="0.8" fill="none" />
          <path d="M30 44 L32 57 L68 57 L70 44 Z" stroke="#B8963E" strokeWidth="0.8" fill="none" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center bg-olive px-6 pt-20 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text content */}
          <div>
            <h1 className="font-serif text-5xl font-semibold leading-[1.1] tracking-tight text-offwhite md:text-6xl lg:text-7xl">
              Custom packaging for brands that need it done right
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-offwhite/70">
              UPG helps brands in the United States and Canada source custom
              boxes, mylar bags, and paper cups with clear quoting, design
              support, and reliable production follow-through.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/get-a-quote"
                className="rounded-sm bg-gold px-8 py-3.5 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-dark"
              >
                Get a Quote
              </Link>
              <Link
                href="/#products"
                className="rounded-sm border border-gold px-8 py-3.5 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-charcoal"
              >
                Explore Products
              </Link>
            </div>

            {/* Metrics strip */}
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2">
              {heroMetrics.map((metric, i) => (
                <span key={metric.label} className="flex items-center gap-2 text-sm text-offwhite/60">
                  {i > 0 && (
                    <span className="hidden text-gold/40 sm:inline">|</span>
                  )}
                  {metric.label}
                </span>
              ))}
            </div>
          </div>

          {/* Product visual grid — desktop only */}
          <div className="hidden lg:block">
            <HeroProductGrid />
          </div>
        </div>
      </div>

      {/* Decorative gold line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </section>
  );
}
