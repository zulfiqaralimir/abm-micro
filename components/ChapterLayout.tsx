// Wraps every course chapter with the fixed 6-part structure defined in CLAUDE.md §4:
// Setup -> WalkthroughStep(s) -> ComparisonPanel -> AssumptionBreak -> InstructorNote -> See Also
// TODO (Phase 3): accept MDX children + frontmatter, lay out sections, wire ProgressTracker.
export default function ChapterLayout({ children }: { children: React.ReactNode }) {
  return <article className="prose prose-lg mx-auto max-w-3xl px-6 py-16">{children}</article>;
}
