// Amber-bordered callout: assumptions required for the result, and what happens when they fail.
// Visually distinct from all other callouts per CLAUDE.md §6 — amber reserved for this only.
export default function AssumptionBreak({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 border-l-4 border-assumption bg-assumption-bg p-4">
      {children}
    </div>
  );
}
