import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ChapterFrontmatter = {
  title: string;
  slug: string;
  week: number;
  economicResult: string;
  status: "draft" | "published";
  sourceUrl: string;
};

export type Chapter = {
  frontmatter: ChapterFrontmatter;
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "course");

export function getChapter(slug: string): Chapter | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as ChapterFrontmatter, content };
}

export function listChapters(): Chapter[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => getChapter(file.replace(/\.mdx$/, "")))
    .filter((chapter): chapter is Chapter => chapter !== null)
    .sort((a, b) => a.frontmatter.week - b.frontmatter.week);
}
