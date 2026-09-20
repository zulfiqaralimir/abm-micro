// Single bibliography entry for the Reference Section (CLAUDE.md §5).
// Also reused for announcements (see components/../content/announcements)
// via the optional `date` prop, which renders a date badge in place of tags.
// TODO (Phase 6): tag-based filtering, distinguish Q1 papers / books / articles / other resources.
export type ReferenceEntry = {
  type?: "paper" | "book" | "article" | "resource";
  title: string;
  citation?: string;
  url?: string;
  relevance: React.ReactNode;
  tags?: string[];
};

export default function ReferenceCard({
  entry,
  date,
}: {
  entry: ReferenceEntry;
  date?: string;
}) {
  return (
    <div className="my-4 rounded border border-border bg-paper-raised p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-ink">
          {entry.url ? (
            <a href={entry.url} target="_blank" rel="noreferrer">
              {entry.title}
            </a>
          ) : (
            entry.title
          )}
        </h3>
        {date && (
          <span className="shrink-0 whitespace-nowrap rounded bg-paper px-2 py-0.5 text-xs font-medium text-ink-muted">
            {formatDate(date)}
          </span>
        )}
      </div>
      {entry.citation && <p className="text-sm text-ink-muted">{entry.citation}</p>}
      <div className="mt-2 text-sm text-ink">{entry.relevance}</div>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
