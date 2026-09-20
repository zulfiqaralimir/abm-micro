import ProgressTracker from "./ProgressTracker";
import type { ChapterFrontmatter } from "@/lib/chapters";

// Wraps every course chapter with the fixed 6-part structure defined in
// CLAUDE.md §4: Setup -> By-Hand Walkthrough -> Standard Theory Comparison ->
// Where Assumptions Break -> Instructor's Notes -> See Also. The six named
// sections themselves live in the chapter's MDX body (as headings + the
// WalkthroughStep/ComparisonPanel/AssumptionBreak/InstructorNote
// components) — this shell provides the sidebar, header, and draft banner.
export default function ChapterLayout({
  frontmatter,
  children,
}: {
  frontmatter: ChapterFrontmatter;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-5xl gap-12 px-6 py-16">
      <aside className="hidden w-48 shrink-0 md:block">
        <div className="sticky top-24">
          <ProgressTracker />
        </div>
      </aside>
      <article className="chapter-walkthrough prose prose-lg max-w-3xl font-serif prose-headings:font-serif">
        <header className="not-prose mb-8 border-b border-border pb-6">
          {frontmatter.status === "draft" && (
            <p className="mb-3 inline-block rounded bg-assumption-bg px-2 py-1 text-xs font-semibold uppercase tracking-wide text-assumption">
              Draft — placeholder content, pending source material
            </p>
          )}
          <h1 className="font-serif text-3xl font-bold text-ink">{frontmatter.title}</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Week {frontmatter.week} · {frontmatter.economicResult}
          </p>
        </header>
        {children}
      </article>
    </div>
  );
}
