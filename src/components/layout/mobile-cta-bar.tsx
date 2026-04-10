import Link from "next/link";

export function MobileCtaBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="border-t border-charcoal/10 bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <Link
          href="/get-a-quote"
          className="block w-full rounded-sm bg-gold py-3.5 text-center text-sm font-semibold text-charcoal transition-colors hover:bg-gold-dark"
        >
          Get a Quote →
        </Link>
      </div>
    </div>
  );
}
