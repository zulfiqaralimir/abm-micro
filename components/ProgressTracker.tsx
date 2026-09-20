"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Placeholder chapter list — replace with real chapters as they're supplied
// in Phase 4 (content/course/*.mdx frontmatter, ordered by `week`).
const chapters = [
  { slug: "foundations", title: "Foundations" },
];

const STORAGE_KEY = "abm-micro:read-chapters";

export default function ProgressTracker() {
  const pathname = usePathname();
  const [readSlugs, setReadSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setReadSlugs(JSON.parse(stored));
    } catch {
      // localStorage unavailable — progress just won't persist.
    }
  }, []);

  function toggleRead(slug: string) {
    setReadSlugs((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  return (
    <nav aria-label="Chapter progress" className="text-sm">
      <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-wide text-ink-muted">
        <span>Chapters</span>
        <span>
          {readSlugs.length} / {chapters.length}
        </span>
      </div>
      <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{
            width: chapters.length
              ? `${(readSlugs.length / chapters.length) * 100}%`
              : "0%",
          }}
        />
      </div>
      <ul className="space-y-1">
        {chapters.map((chapter) => {
          const href = `/course/${chapter.slug}`;
          const active = pathname === href;
          const read = readSlugs.includes(chapter.slug);
          return (
            <li key={chapter.slug} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={read}
                onChange={() => toggleRead(chapter.slug)}
                className="h-3.5 w-3.5 accent-accent"
                aria-label={`Mark "${chapter.title}" as read`}
              />
              <Link
                href={href}
                className={`no-underline ${active ? "text-accent" : "text-ink-muted hover:text-ink"}`}
              >
                {chapter.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
