// Inline SVG wrapper for rule -> outcome flow diagrams. Vector only.
// TODO (Phase 3+): same pattern as AgentDiagram.
export default function FlowDiagram({ children }: { children: React.ReactNode }) {
  return <figure className="my-6">{children}</figure>;
}
