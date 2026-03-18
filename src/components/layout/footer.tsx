import Link from "next/link";
import { siteConfig } from "@/data/site";
import { products } from "@/data/products";

export function Footer() {
  return (
    <footer className="bg-charcoal text-offwhite">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-2xl font-semibold tracking-wide text-offwhite">
              {siteConfig.shortName}
            </Link>
            <p className="mt-1 font-serif text-sm tracking-widest text-offwhite/60">
              Universal Packaging Group
            </p>
            <p className="mt-4 text-sm leading-relaxed text-offwhite/60">
              {siteConfig.description}
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">
              Products
            </h4>
            <ul className="mt-4 space-y-3">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/${product.slug}`}
                    className="text-sm text-offwhite/60 transition-colors hover:text-gold"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-offwhite/60 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">
              Get in Touch
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-offwhite/60 transition-colors hover:text-gold"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
            <div className="mt-8">
              <Link
                href="/get-a-quote"
                className="inline-block rounded-sm border border-gold px-6 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-charcoal"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-offwhite/10 pt-8">
          <p className="text-center text-xs text-offwhite/40">
            &copy; {new Date().getFullYear()} Universal Packaging Group. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
