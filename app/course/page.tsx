import Link from "next/link";
import { listChapters } from "@/lib/chapters";
import Reveal from "@/components/Reveal";

// Main course table of contents, built from content/course/*.mdx frontmatter
// and ordered by `week`.
export default function CoursePage() {
  const chapters = listChapters();

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">Main Course</p>
        <h1 className="mt-2 font-display text-5xl font-extrabold tracking-tight">Contents</h1>
        <p className="mt-4 max-w-[40rem] text-lg text-ink-muted">
          Chapters are added as the course material is posted.
        </p>
      </Reveal>

      <ol className="mt-10 space-y-5">
        {chapters.map((c, i) => (
          <li key={c.frontmatter.slug}>
            <Reveal delay={i * 0.08}>
              <Link
                href={`/course/${c.frontmatter.slug}`}
                className="group flex items-start gap-5 rounded-2xl border border-border bg-paper-raised p-6 no-underline shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 font-display text-2xl font-extrabold text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  {c.frontmatter.week}
                </span>
                <span className="block">
                  <span className="block font-display text-2xl font-bold text-ink">{c.frontmatter.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                    {c.frontmatter.economicResult}
                  </span>
                  {c.frontmatter.status === "draft" && (
                    <span className="mt-2 inline-block rounded bg-assumption-bg px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-assumption">
                      Draft
                    </span>
                  )}
                </span>
                <span className="ml-auto self-center text-xl text-accent transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ol>
    </main>
  );
}
