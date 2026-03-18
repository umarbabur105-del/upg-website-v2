import Link from "next/link";

interface CtaBannerProps {
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function CtaBanner({
  heading = "Ready to start your packaging project?",
  description = "Get a quote tailored to your product, quantity, and delivery needs.",
  ctaText = "Get a Quote",
  ctaHref = "/get-a-quote",
}: CtaBannerProps) {
  return (
    <section className="bg-olive px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-3xl font-semibold leading-tight text-offwhite md:text-4xl lg:text-5xl">
          {heading}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-offwhite/70">
          {description}
        </p>
        <Link
          href={ctaHref}
          className="mt-8 inline-block rounded-sm bg-gold px-10 py-4 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-dark"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}
