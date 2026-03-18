import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center bg-olive px-6 pt-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
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
        </div>
      </div>

      {/* Decorative gold line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </section>
  );
}
