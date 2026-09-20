import { MDXRemote } from "next-mdx-remote/rsc";
import ReferenceCard from "@/components/ReferenceCard";
import { listAnnouncements } from "@/lib/announcements";

// Reverse-chronological course-wide announcements (CLAUDE.md addendum).
// A dedicated /announcements/[slug] route is deferred until an entry is
// long enough to need one — for v1, everything renders inline here.
export default function AnnouncementsPage() {
  const announcements = listAnnouncements();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl font-bold text-ink">Announcements</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Course-wide updates from Asad Zaman — emails, notices, and deadline
        changes.
      </p>

      {announcements.length === 0 ? (
        <p className="mt-8 text-sm text-ink-muted">No announcements yet.</p>
      ) : (
        <div className="mt-8">
          {announcements.map((announcement) => (
            <ReferenceCard
              key={announcement.slug}
              date={announcement.frontmatter.date}
              entry={{
                title: announcement.frontmatter.title,
                relevance: <MDXRemote source={announcement.content} />,
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}
