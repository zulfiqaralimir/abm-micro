// Inline SVG wrapper for rule -> outcome flow diagrams. Vector only, same
// pattern as AgentDiagram.
export default function FlowDiagram({
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
