// Inline SVG wrapper for agent-interaction diagrams. Vector only — no raster screenshots.
// TODO (Phase 3+): accept SVG source or structured diagram data, render responsively.
export default function AgentDiagram({ children }: { children: React.ReactNode }) {
  return <figure className="my-6">{children}</figure>;
}
