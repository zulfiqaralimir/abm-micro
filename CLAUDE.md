# CLAUDE.md — ABM Micro

This file is the working specification for Claude Code. Read it fully before generating code. Follow the phased build order at the bottom — do not skip ahead to later phases.

## 1. Project Summary

**ABM Micro** is a web book presenting Asad Zaman's agent-based modeling (ABM) microeconomics course (Ibn Haldun University, Istanbul, Sep–Dec). The course rebuilds standard microeconomic results — demand curve, market equilibrium, welfare theorems, rent control, minimum wage — from small, hand-computable agent-based models, with no calculus/stats/programming prerequisites.

The site has two parts that must stay visually and structurally distinct:
1. **Main Course** — the book itself, chapter by chapter, faithful to the source material.
2. **Applications** — standalone tracks (Programming, DSA, LeetCode, System Design, LLD, Reference) that are cross-linked *from* course chapters where a real connection exists, never forced.

## 2. Tech Stack

- **Framework:** Next.js 14 (App Router), TypeScript
- **Content:** MDX (`.mdx`) for all chapters and articles — enables embedding React components (diagrams, charts, interactive widgets) directly in prose
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion (page/section transitions, diagram reveals — slow, elegant, not flashy)
- **Charts:** Chart.js or D3.js (simulated-vs-theoretical curve comparisons)
- **Diagrams:** Inline SVG (agent-interaction diagrams, rule→outcome flow diagrams), hand-authored or generated — vector only, no raster screenshots
- **Deployment:** Vercel
- **Repo:** New GitHub repo under github.com/zulfiqaralimir — suggested name `abm-micro`
- **No backend/database required** for v1 — fully static/MDX content, statically generated

## 3. Site Structure

```
/                          → Landing page: course intro, Asad Zaman's framing, link to source
/course                    → Main course TOC
/course/foundations        → What an ABM is, why start small
/course/[chapter-slug]     → One page per chapter (see §4 template)
/course/instructor-notes   → Aggregated weekly notes (also embedded per-chapter)
/applications              → Applications section landing (index of 6 tracks)
/applications/programming  → Agent simulation implementations (Python)
/applications/dsa          → Data structures relevant to simulation
/applications/leetcode     → Cross-link out to existing Blind 75 / NeetCode 150 book (do not duplicate content)
/applications/system-design→ Designing a scalable ABM simulation engine
/applications/lld          → OOP design of Agent / Environment / RuleEngine
/applications/reference    → Reference Section (see §5)
/sandbox                   → "Build Your Own ABM" interactive in-browser simulator
```

## 4. Chapter Page Template (Main Course)

Every chapter under `/course/[chapter-slug]` follows this fixed structure — implement as an MDX layout component `ChapterLayout`:

1. **Setup** — the agents and their rules, stated plainly
2. **By-Hand Walkthrough** — arithmetic/spreadsheet steps, shown as a numbered sequence; use `<WalkthroughStep>` components so each step can be visually revealed via Framer Motion scroll-reveal
3. **Standard Theory Comparison** — what the textbook result says, side by side with the ABM outcome (use a two-column `<ComparisonPanel>` component)
4. **Where Assumptions Break** — callout box (`<AssumptionBreak>` component, visually distinct — e.g. amber left-border) listing the assumptions required and what happens when each fails
5. **Instructor's Notes** — collapsible `<InstructorNote>` component: expected vs. actual vs. what changed (sourced from Zaman's weekly posts)
6. **See Also** — optional cross-links to `/applications/*` pages, only when a genuine connection exists (e.g., a chapter modeling agent scheduling links to `/applications/dsa#queues`)

Frontmatter for each chapter MDX file:
```yaml
---
title: "Chapter title"
slug: "chapter-slug"
week: 1
economicResult: "Demand Curve"
status: "draft" | "published"
sourceUrl: "https://sites.google.com/view/islamic-economics-2023/abm-micro"
---
```

## 5. Reference Section (`/applications/reference`)

A curated, continuously-growing bibliography, separate from course content. Structure as filterable cards grouped by type:

- **Q1 Research Papers** — full citation, one-line relevance note, link (DOI/arXiv/SSRN where available)
- **Books** — full citation, one-line relevance note
- **Articles** — popular/academic articles relevant to ABM economics
- **Other Learning Resources** — courses, lecture series, tools, ABM software (e.g. NetLogo, Mesa), talks

Each entry as frontmatter-driven MDX or a JSON/YAML data file (`/data/references.yaml`) rendered through a `<ReferenceCard>` component with tag-based filtering (e.g. `tags: [agent-based-modeling, welfare-economics, market-design]`). Do not fabricate citations — leave entries as placeholders (`# TODO: add citation`) until the user supplies them.

## 6. Design System

- Academic-but-modern: closer to a clean textbook than a dashboard. Lighter and more spacious than the FERROQUANT Bloomberg-terminal aesthetic used elsewhere in the user's portfolio.
- **Typography:** serif for chapter body text (readability for long-form prose), sans-serif for UI chrome, nav, and code
- **Color:** light background, one accent color for interactive elements, amber/warning tone reserved for `<AssumptionBreak>` callouts only
- **Animation:** slow, elegant transitions only (per established preference) — scroll-reveal for walkthrough steps, subtle fade/slide for page transitions. No flashy or fast motion.
- **No logos or branding on diagrams/visual content.**
- Sidebar chapter navigation with progress indicator (chapters read / total)
- Code blocks: syntax-highlighted, used in Applications section only (not main course, which has no programming)

## 7. Components to Build (v1)

| Component | Purpose |
|---|---|
| `ChapterLayout` | Wraps every course chapter with the fixed 6-part structure |
| `WalkthroughStep` | Numbered, scroll-revealed arithmetic step |
| `ComparisonPanel` | Two-column ABM-outcome vs. standard-theory display |
| `AssumptionBreak` | Amber callout box for broken assumptions |
| `InstructorNote` | Collapsible weekly note (expected/actual/changed) |
| `AgentDiagram` | Inline SVG wrapper for agent-interaction diagrams |
| `FlowDiagram` | Inline SVG wrapper for rule→outcome flow diagrams |
| `ReferenceCard` | Bibliography entry with tag filtering |
| `SandboxSimulator` | Interactive grid + simple agent rules, live-updating demand curve |
| `ProgressTracker` | Sidebar reading-progress indicator |

## 8. Content Rules

- Never invent course content, citations, or instructor's notes not supplied by the user or the source material at the linked Google Sites page.
- Mark any placeholder content explicitly as `<!-- TODO -->` or `status: draft` — never present placeholder text as finished content.
- Applications section content (Programming/DSA/System Design/LLD) can be written from general knowledge but must stay clearly labeled as supplementary, not part of the original course.
- LeetCode track: link out to the user's existing Blind 75 / NeetCode 150 books rather than duplicating problems here.

## 9. Build Order (follow in sequence — confirm with user before moving to next phase)

1. **Scaffold** — Next.js + Tailwind + MDX config, folder structure, empty layout shells, deployed to Vercel with a placeholder homepage (this confirms the pipeline works end to end)
2. **Design system** — typography, color tokens, base components (`ChapterLayout`, nav, sidebar) with dummy content
3. **Chapter template** — build all 6 sub-components, wire into one fully worked example chapter (Foundations)
4. **Remaining course chapters** — one at a time, as source material is supplied
5. **Applications section** — six tracks, starting with structure/nav, then content per track
6. **Reference section** — data file + filtering UI, populated as citations are supplied
7. **Sandbox simulator** — interactive ABM widget (last, since it's the most complex piece)

Do not generate speculative content for phases 4–6 ahead of the source material being provided.
