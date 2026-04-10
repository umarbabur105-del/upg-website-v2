import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/data/blog-posts";

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

  return {
    title: `${post.title} — UPG`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://universalpackaginggroup.com/blog/${slug}`,
      type: "article",
    },
    alternates: {
      canonical: `https://universalpackaginggroup.com/blog/${slug}`,
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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

  return (
    <>
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
        </div>
      </section>

      {/* Article body */}
      <section className="bg-surface px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="prose-custom">{renderContent(post.content)}</div>

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
            Tell us about your project and we will send detailed pricing within
            24 hours.
          </p>
          <Link
            href="/get-a-quote"
            className="mt-8 inline-block rounded-sm bg-gold px-8 py-3.5 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-dark"
          >
            Get a Quote →
          </Link>
        </div>
      </section>
    </>
  );
}
