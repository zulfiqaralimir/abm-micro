import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import ChapterLayout from "@/components/ChapterLayout";
import { getChapter } from "@/lib/chapters";
import { chapterMdxComponents } from "@/lib/mdx-components";
import { extractToc, readingMinutes } from "@/lib/slug";

// Generic chapter route — loads content/course/[chapter].mdx as it's added
// through Phase 4. /course/foundations has its own static route and takes
// precedence over this one.
export default function ChapterPage({ params }: { params: { chapter: string } }) {
  const chapter = getChapter(params.chapter);
  if (!chapter) notFound();

  return (
    <ChapterLayout
      frontmatter={chapter.frontmatter}
      toc={extractToc(chapter.content)}
      minutes={readingMinutes(chapter.content)}
    >
      <MDXRemote source={chapter.content} components={chapterMdxComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </ChapterLayout>
  );
}
