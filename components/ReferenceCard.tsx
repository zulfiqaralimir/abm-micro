// Single bibliography entry for the Reference Section (CLAUDE.md §5).
// TODO (Phase 6): tag-based filtering, link out, distinguish Q1 papers / books / articles / other resources.
export type ReferenceEntry = {
  type: "paper" | "book" | "article" | "resource";
  title: string;
  citation: string;
  url?: string;
  relevance: string;
  tags: string[];
};

export default function ReferenceCard({ entry }: { entry: ReferenceEntry }) {
  return (
    <div className="my-4 rounded border border-gray-200 p-4">
      <h3 className="font-semibold">{entry.title}</h3>
      <p className="text-sm text-gray-500">{entry.citation}</p>
      <p className="mt-2 text-sm">{entry.relevance}</p>
    </div>
  );
}
