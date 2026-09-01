import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/data/blog-posts";
import { createPageMetadata, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.metaTitle ?? post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    type: "article",
    keywords: ["custom packaging guide", post.title],
  });
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const articleResources: Record<
  string,
  Array<{ title: string; description: string; href: string }>
> = {
  "what-is-moq-custom-packaging": [
    {
      title: "Custom packaging pricing and MOQ guide",
      description:
        "Review the current 250-unit planning MOQ, quote inputs, price factors, and the terms controlled by the final written quote.",
      href: "/custom-packaging-pricing",
    },
    {
      title: "Packaging Spec & MOQ Builder",
      description:
        "Choose the product family, add known dimensions and requirements, and prepare a brief for project review.",
      href: "/tools/packaging-spec-builder",
    },
  ],
  "corrugated-vs-rigid-boxes": [
    {
      title: "Corrugated mailer vs magnetic box comparison",
      description:
        "Use the full side-by-side guide for construction, presentation, packing, project inputs, and scope boundaries.",
      href: "/compare/mailer-boxes-vs-magnetic-boxes",
    },
    {
      title: "Compare all packaging buyer decisions",
      description:
        "Browse the comparison library for box structures, tuck directions, flexible formats, and rollstock decisions.",
      href: "/compare",
    },
  ],
};

/** Render plain markdown subset: ## headings, **bold**, bullet lists, tables, paragraphs */
function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={key++}
          className="mt-10 mb-4 font-serif text-2xl font-semibold text-charcoal"
        >
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // Table — collect rows until blank line
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const [headerRow, , ...bodyRows] = tableLines;
      const headers = headerRow
        .split("|")
        .filter((c) => c.trim() !== "")
        .map((c) => c.trim());
      elements.push(
        <div key={key++} className="my-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/20">
                {headers.map((h, idx) => (
                  <th
                    key={idx}
                    className="py-2 pr-4 text-left text-xs font-semibold uppercase tracking-widest text-gold"
                  >
                    <span dangerouslySetInnerHTML={{ __html: parseBold(h) }} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, rIdx) => {
                const cells = row
                  .split("|")
                  .filter((c) => c.trim() !== "")
                  .map((c) => c.trim());
                return (
                  <tr key={rIdx} className="border-b border-charcoal/8">
                    {cells.map((cell, cIdx) => (
                      <td key={cIdx} className="py-2 pr-4 text-charcoal/70">
                        <span
                          dangerouslySetInnerHTML={{ __html: parseBold(cell) }}
                        />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Bullet list — collect consecutive items
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-4 space-y-2 pl-5">
          {items.map((item, idx) => (
            <li key={idx} className="list-disc text-sm leading-relaxed text-charcoal/70">
              <span dangerouslySetInnerHTML={{ __html: parseBold(item) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Blank line — skip
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p
        key={key++}
        className="my-4 text-base leading-relaxed text-charcoal/70"
        dangerouslySetInnerHTML={{ __html: parseBold(line) }}
      />
    );
    i++;
  }

  return elements;
}

function parseBold(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();
  const relatedPosts = blogPosts.filter((candidate) => candidate.slug !== post.slug);
  const resources = articleResources[post.slug] ?? [];
  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        image: [DEFAULT_OG_IMAGE.url],
        datePublished: post.date,
        dateModified: post.updatedAt ?? post.date,
        inLanguage: "en-US",
        mainEntityOfPage: { "@id": postUrl },
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Packaging Guides",
            item: `${SITE_URL}/blog`,
          },
          { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Hero */}
      <section className="bg-olive px-6 pt-32 pb-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-gold/80 transition-colors hover:text-gold"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            All articles
          </Link>
          <time
            dateTime={post.date}
            className="mt-6 block text-xs font-medium uppercase tracking-widest text-gold"
          >
            {formatDate(post.date)}
          </time>
          <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-offwhite md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-offwhite/70">
            {post.excerpt}
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-offwhite/65">
            <span>Prepared by Universal Packaging Group</span>
            <span>
              Last reviewed {formatDate(post.updatedAt ?? post.date)}
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-surface px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="prose-custom">{renderContent(post.content)}</div>

          {resources.length > 0 ? (
            <section className="mt-10 border-t border-charcoal/10 pt-8" aria-labelledby="article-resources-heading">
              <h2
                id="article-resources-heading"
                className="font-serif text-2xl font-semibold text-charcoal"
              >
                Continue with the matching planning source.
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {resources.map((resource) => (
                  <Link
                    key={resource.href}
                    href={resource.href}
                    className="border border-charcoal/10 bg-cream p-5 hover:border-gold/50"
                  >
                    <h3 className="font-serif text-lg font-semibold text-charcoal">
                      {resource.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
                      {resource.description}
                    </p>
                    <span className="mt-4 inline-flex text-sm font-semibold text-gold-dark">
                      Open source →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {post.slug === "how-to-prepare-artwork-for-custom-packaging" ? (
            <div className="mt-10 border border-charcoal/10 bg-cream p-6 md:p-8">
              <div className="text-xs font-semibold uppercase tracking-widest text-gold">
                Free preparation tool
              </div>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-charcoal">
                Turn the guide into an artwork readiness summary.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                Work through eight preparation checks and carry confirmed and open items into your UPG project enquiry. No artwork file is uploaded or automatically approved.
              </p>
              <Link
                href="/tools/packaging-artwork-preflight"
                className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
              >
                Check artwork readiness
              </Link>
            </div>
          ) : null}

          <section className="mt-12 border-t border-charcoal/10 pt-8" aria-labelledby="related-articles-heading">
            <h2
              id="related-articles-heading"
              className="font-serif text-2xl font-semibold text-charcoal"
            >
              Related packaging guides
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="border border-charcoal/10 bg-surface p-5 hover:border-gold/50"
                >
                  <h3 className="font-serif text-lg font-semibold text-charcoal">
                    {relatedPost.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Back link */}
          <div className="mt-16 border-t border-charcoal/10 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm font-semibold text-gold transition-colors hover:text-gold-dark"
            >
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
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Back to all articles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-olive px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl font-semibold text-offwhite md:text-3xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-offwhite/70">
            Tell us about your project. We target an initial response within one
            business day and confirm pricing after the required specifications are clear.
          </p>
          <Link
            href="/get-a-quote"
            className="mt-8 inline-block rounded-sm bg-gold px-8 py-3.5 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-dark"
          >
            Start Your Project →
          </Link>
        </div>
      </section>
    </>
  );
}
