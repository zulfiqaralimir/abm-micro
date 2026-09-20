import ProgressTracker from "./ProgressTracker";

// Base visual shell for every course chapter: sidebar (ProgressTracker) +
// prose column. Wraps every course chapter with the fixed 6-part structure
// defined in CLAUDE.md §4: Setup -> WalkthroughStep(s) -> ComparisonPanel ->
// AssumptionBreak -> InstructorNote -> See Also.
// TODO (Phase 3): accept MDX children + frontmatter, lay out the 6 named sections.
export default function ChapterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-5xl gap-12 px-6 py-16">
      <aside className="hidden w-48 shrink-0 md:block">
        <div className="sticky top-24">
          <ProgressTracker />
        </div>
      </aside>
      <article className="prose prose-lg max-w-3xl font-serif prose-headings:font-serif">
        {children}
      </article>
    </div>
  );
}
