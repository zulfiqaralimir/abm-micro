import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type AnnouncementFrontmatter = {
  title: string;
  date: string; // ISO yyyy-mm-dd
  source: "email" | "notice" | "update";
  summary: string;
};

export type Announcement = {
  slug: string;
  frontmatter: AnnouncementFrontmatter;
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "announcements");

// Reverse-chronological — newest first.
export function listAnnouncements(): Announcement[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        frontmatter: data as AnnouncementFrontmatter,
        content,
      };
    })
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}
