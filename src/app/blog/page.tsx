import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import { CtaBanner } from "@/components/cta-banner";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Packaging Guides & Resources",
  description:
    "Practical custom packaging guides covering MOQs, materials, artwork preparation, cosmetic boxes, mailers, rigid boxes, and manufacturing decisions.",
  path: "/blog",
  keywords: ["custom packaging guide", "packaging MOQ", "packaging artwork guide"],
});

const resourcePaths = [
  {
    title: "Check pricing and the 250-unit MOQ",
    description:
      "Use the commercial guide for the current planning minimum, quote inputs, price factors, and written-term boundaries.",
    href: "/custom-packaging-pricing",
  },
  {
    title: "Compare packaging formats",
    description:
      "Review side-by-side guides for box structures, tuck directions, pouches, rollstock, and the corrugated-mailer boundary.",
    href: "/compare",
  },
  {
    title: "Prepare a clearer project brief",
    description:
      "Use the format, specification, artwork, and packing tools before sending the known details for human review.",
    href: "/tools",
  },
];

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
            prepare, and how to make better packaging decisions.
          </p>
        </div>
      </section>

      <section className="border-b border-charcoal/8 bg-cream px-6 py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-gold">
              Start with a buyer decision
            </div>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal">
              Use the source that matches the question in front of you.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/65">
              These guides separate general planning information from project-specific decisions. Final structure, pricing, production timing, and delivery terms are confirmed during review.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {resourcePaths.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="rounded-sm border border-charcoal/8 bg-surface p-6 hover:-translate-y-0.5 hover:shadow-card"
              >
                <h3 className="font-serif text-xl font-semibold text-charcoal">
                  {resource.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
                  {resource.description}
                </p>
                <span className="mt-5 inline-flex text-sm font-semibold text-gold-dark">
                  Open resource →
                </span>
              </Link>
            ))}
          </div>
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
                    Read {post.title}
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
        description="Tell us what you need. We target an initial response within one business day and confirm pricing once the required specifications are clear."
        ctaText="Start Your Project"
        ctaHref="/get-a-quote"
      />
    </>
  );
}
