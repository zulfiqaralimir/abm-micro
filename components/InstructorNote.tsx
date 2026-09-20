// Collapsible weekly note: expected vs. actual vs. what changed. Accepts
// either structured props (preferred, sourced from a chapter's weekly note)
// or free-form children as a fallback.
export default function InstructorNote({
  expected,
  actual,
  changed,
  children,
}: {
  expected?: React.ReactNode;
  actual?: React.ReactNode;
  changed?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const structured = expected ?? actual ?? changed;

  return (
    <details className="my-6 rounded border border-border bg-paper-raised p-4">
      <summary className="cursor-pointer font-semibold text-ink">Instructor's Notes</summary>
      <div className="mt-3 space-y-2 text-sm">
        {structured ? (
          <>
            {expected && (
              <p>
                <span className="font-semibold text-ink-muted">Expected: </span>
                {expected}
              </p>
            )}
            {actual && (
              <p>
                <span className="font-semibold text-ink-muted">Actual: </span>
                {actual}
              </p>
            )}
            {changed && (
              <p>
                <span className="font-semibold text-ink-muted">What changed: </span>
                {changed}
              </p>
            )}
          </>
        ) : (
          children
        )}
      </div>
    </details>
  );
}
