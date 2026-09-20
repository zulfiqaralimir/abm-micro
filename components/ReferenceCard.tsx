// Single bibliography entry for the Reference Section (CLAUDE.md §5).
// Also reused for announcements (see components/../content/announcements)
// via the optional `date` prop, which renders a date badge in place of tags,
// and `size="comfortable"` for larger, easier-to-read body text there.
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
  size = "compact",
}: {
  entry: ReferenceEntry;
  date?: string;
  size?: "compact" | "comfortable";
}) {
  const comfortable = size === "comfortable";

  return (
    <div
      className={`my-4 rounded border border-border bg-paper-raised ${
        comfortable ? "p-6" : "p-4"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className={`font-semibold text-ink ${comfortable ? "text-xl" : ""}`}
        >
          {entry.url ? (
            <a href={entry.url} target="_blank" rel="noreferrer">
              {entry.title}
            </a>
          ) : (
            entry.title
          )}
        </h3>
        {date && (
          <span
            className={`shrink-0 whitespace-nowrap rounded bg-paper px-2 py-0.5 font-medium text-ink-muted ${
              comfortable ? "text-sm" : "text-xs"
            }`}
          >
            {formatDate(date)}
          </span>
        )}
      </div>
      {entry.citation && (
        <p className={comfortable ? "text-base text-ink-muted" : "text-sm text-ink-muted"}>
          {entry.citation}
        </p>
      )}
      <div className={comfortable ? "mt-3 text-lg text-ink" : "mt-2 text-sm text-ink"}>
        {entry.relevance}
      </div>
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
