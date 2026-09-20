// Numbered, scroll-revealed arithmetic/spreadsheet step within the By-Hand Walkthrough.
// TODO (Phase 3): Framer Motion scroll-reveal; step number auto-increment within a chapter.
export default function WalkthroughStep({ children }: { children: React.ReactNode }) {
  return <div className="my-4 border-l-2 border-gray-200 pl-4">{children}</div>;
}
