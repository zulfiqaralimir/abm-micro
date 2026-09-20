// Collapsible weekly note: expected vs. actual vs. what changed.
// TODO (Phase 3): make collapsible (details/summary or headless UI), source from chapter frontmatter.
export default function InstructorNote({ children }: { children: React.ReactNode }) {
  return (
    <details className="my-6 rounded border border-gray-200 p-4">
      <summary className="cursor-pointer font-semibold">Instructor's Notes</summary>
      <div className="mt-2">{children}</div>
    </details>
  );
}
