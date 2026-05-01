import Link from "next/link";
import { siteConfig } from "@/data/site";

const WHATSAPP_URL = `https://wa.me/${siteConfig.whatsappNumber}`;
const HAS_WHATSAPP = Boolean(siteConfig.whatsappNumber);

export function Footer() {
  return (
    <footer className="border-t border-border bg-cream">
      <div className="container-editorial py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-2xl text-foreground">
              Universal
              <span className="text-gold"> Packaging</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
              <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                {siteConfig.email}
              </a>
              {HAS_WHATSAPP ? (
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  Chat on WhatsApp
                </a>
              ) : null}
            </div>
          </div>

          <div>
            <div className="eyebrow mb-4">Products</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {siteConfig.footerColumns.productLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-4">Cosmetics</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {siteConfig.footerColumns.cosmeticsLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-4">Company</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[...siteConfig.navigation, ...siteConfig.utilityNavigation].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={siteConfig.cta.href}
              className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
            >
              Request a Quote
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Universal Packaging Group. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/about" className="hover:text-foreground">
              About
            </Link>
            <Link href="/faq" className="hover:text-foreground">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
