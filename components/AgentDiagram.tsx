// Inline SVG wrapper for agent-interaction diagrams. Vector only — no raster
// screenshots, no logos/branding per CLAUDE.md §6. Pass hand-authored or
// generated inline <svg> as children; it's scaled responsively to the column.
export default function AgentDiagram({
  children,
  caption,
}: {
  children: React.ReactNode;
  caption?: string;
}) {
  return (
    <figure className="my-6">
      <div className="rounded border border-border p-4 [&>svg]:h-auto [&>svg]:w-full">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-ink-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
