// Dynamic chapter route — Phase 3+.
// TODO: load MDX from /content/course/[chapter].mdx, render via <ChapterLayout>.
export default function ChapterPage({ params }: { params: { chapter: string } }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      Chapter: {params.chapter} — TODO
    </div>
  );
}
