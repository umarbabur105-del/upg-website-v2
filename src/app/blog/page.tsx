import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import { CtaBanner } from "@/components/cta-banner";

export const metadata: Metadata = {
  title: "Packaging Resources & Guides — UPG Blog",
  description:
    "Practical guides on custom packaging — MOQ, materials, artwork prep, and choosing the right box for your brand.",
  openGraph: {
    title: "Packaging Resources & Guides — UPG Blog",
    description:
      "Practical guides on custom packaging — MOQ, materials, artwork prep, and choosing the right box for your brand.",
    url: "https://universalpackaginggroup.com/blog",
  },
  alternates: {
    canonical: "https://universalpackaginggroup.com/blog",
  },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-olive px-6 pt-32 pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Resources
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-offwhite md:text-5xl">
            Packaging Guides & Insights
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-offwhite/70">
            Practical guides on custom packaging — what to expect, how to
            prepare, and how to make better sourcing decisions.
          </p>
        </div>
      </section>

      {/* Articles grid */}
      <section className="bg-surface px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col rounded-sm border border-charcoal/8 bg-cream"
              >
                <div className="flex flex-1 flex-col p-8">
                  <time
                    dateTime={post.date}
                    className="text-xs font-medium uppercase tracking-widest text-gold"
                  >
                    {formatDate(post.date)}
                  </time>
                  <h2 className="mt-3 font-serif text-xl font-semibold leading-snug text-charcoal">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/60">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold transition-colors hover:text-gold-dark"
                  >
                    Read more
                    <svg
                      className="h-4 w-4"
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
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Ready to start your packaging project?"
        description="Tell us what you need and we will send detailed pricing within 24 hours."
        ctaText="Get a Quote"
        ctaHref="/get-a-quote"
      />
    </>
  );
}
