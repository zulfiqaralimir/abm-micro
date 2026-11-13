import ProgressTracker from "./ProgressTracker";
import Toc from "./lesson/Toc";
import Icon from "./lesson/Icon";
import type { ChapterFrontmatter } from "@/lib/chapters";
import type { TocItem } from "@/lib/slug";

// Wraps every course chapter with the fixed 6-part structure defined in
// CLAUDE.md §4. The named sections live in the chapter's MDX body — this shell
// provides the hero header, the left "on this page" nav, the right info rail
// and the draft banner.
export default function ChapterLayout({
  frontmatter,
  children,
  toc,
  minutes,
}: {
  frontmatter: ChapterFrontmatter;
  children: React.ReactNode;
  toc?: TocItem[];
  minutes?: number;
}) {
  return (
    <div className="mx-auto max-w-[88rem] px-4 pb-8 pt-8 sm:px-6">
      {/* hero header */}
      <header className="hero-mesh relative mb-10 overflow-hidden rounded-3xl border border-border bg-paper-raised px-6 py-12 shadow-xl shadow-accent/5 sm:px-12 sm:py-16">
        <div className="grid-dots pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative">
          {frontmatter.status === "draft" && (
            <p className="mb-4 inline-block rounded bg-assumption-bg px-2 py-1 text-xs font-semibold uppercase tracking-wide text-assumption">
              Draft — placeholder content, pending source material
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.18em]">
            <span className="rounded-full bg-accent px-3.5 py-1.5 text-white shadow-md shadow-accent/30">
              Week {frontmatter.week}
            </span>
            {minutes ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-paper-raised/80 px-3.5 py-1.5 text-ink-muted">
                <Icon name="clock" className="h-3.5 w-3.5" /> {minutes} min read
              </span>
            ) : null}
          </div>
          <h1 className="shimmer-text mt-5 max-w-4xl bg-gradient-to-r from-accent via-[#4b8ea3] to-assumption bg-clip-text font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-transparent sm:text-7xl">
            {frontmatter.title}
          </h1>
          <p className="mt-5 max-w-3xl font-display text-xl italic leading-snug text-ink-muted sm:text-2xl">
            {frontmatter.economicResult}
          </p>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_16rem]">
        <aside className="hidden lg:block">
          <div className="sticky top-28">{toc?.length ? <Toc items={toc} /> : <ProgressTracker />}</div>
        </aside>

        <article className="chapter-walkthrough min-w-0 font-serif">{children}</article>

        <aside className="hidden xl:block">
          <div className="sticky top-28 space-y-4">
            <div className="rounded-2xl border border-border bg-gradient-to-br from-paper-raised to-accent/5 p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-faint">At a glance</p>
              <ul className="mt-3 space-y-3 text-sm text-ink/85">
                <li className="flex gap-2.5">
                  <Icon name="map" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  A model is a simplified version of reality, made for a purpose.
                </li>
                <li className="flex gap-2.5">
                  <Icon name="scale" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  Judge a model by its purpose: prediction or understanding.
                </li>
                <li className="flex gap-2.5">
                  <Icon name="target" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  Three tests: sufficiency, reproduction, plausibility.
                </li>
              </ul>
            </div>
            <a
              href={frontmatter.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-2xl border border-border bg-paper-raised p-4 text-sm font-semibold text-ink no-underline shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <Icon name="link" className="h-4 w-4" />
              </span>
              Original source
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
