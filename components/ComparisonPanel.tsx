// Two-column display: ABM outcome vs. standard theory result.
// TODO (Phase 3): responsive two-column grid, labeled headers.
export default function ComparisonPanel({
  abm,
  theory,
}: {
  abm: React.ReactNode;
  theory: React.ReactNode;
}) {
  return (
    <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded border border-gray-200 p-4">{abm}</div>
      <div className="rounded border border-gray-200 p-4">{theory}</div>
    </div>
  );
}
