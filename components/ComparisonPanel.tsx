// Two-column display: ABM outcome vs. standard theory result.
export default function ComparisonPanel({
  abm,
  theory,
  abmLabel = "ABM Outcome",
  theoryLabel = "Standard Theory",
}: {
  abm: React.ReactNode;
  theory: React.ReactNode;
  abmLabel?: string;
  theoryLabel?: string;
}) {
  return (
    <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded border border-border bg-paper-raised p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          {abmLabel}
        </p>
        {abm}
      </div>
      <div className="rounded border border-border bg-paper-raised p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          {theoryLabel}
        </p>
        {theory}
      </div>
    </div>
  );
}
