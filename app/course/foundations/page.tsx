import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import ChapterLayout from "@/components/ChapterLayout";
import { getChapter } from "@/lib/chapters";
import { chapterMdxComponents } from "@/lib/mdx-components";

// First fully-worked chapter template (Phase 3). Content is a placeholder
// (frontmatter status: draft) pending Asad Zaman's Week 1 source material.
export default function FoundationsPage() {
  const chapter = getChapter("foundations");
  if (!chapter) notFound();

  return (
    <ChapterLayout frontmatter={chapter.frontmatter}>
      <MDXRemote source={chapter.content} components={chapterMdxComponents} />
    </ChapterLayout>
  );
}
