import Link from "next/link";

const SOURCE_URL = "https://sites.google.com/view/islamic-economics-2023/abm-micro";

const RESULTS = [
  "The demand curve",
  "Market equilibrium",
  "The welfare theorems",
  "Rent control",
  "The minimum wage",
];

const PREREQUISITES = [
  "No programming required or taught",
  "No calculus, statistics, or econometrics assumed",
  "Models run with arithmetic, and later a spreadsheet",
  "Open to students who could never take a computational modelling course — sociology, political science, Islamic studies, and anyone else working on how people behave in groups",
];

// Landing page copy paraphrased from Asad Zaman's Sep 19, 2026 announcement
// email (see content/announcements/2026-09-19-abm-micro-starting-soon.mdx).
export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
          A Web Book
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-ink sm:text-5xl">
          ABM Micro
        </h1>
        <p className="mt-3 max-w-[42rem] font-serif text-xl italic text-ink-muted">
          Rebuilding microeconomics,{" "}
          <mark className="rounded bg-yellow-200 px-1 text-ink">
            one small model at a time
          </mark>
          .
        </p>

        <div className="max-w-[42rem]">
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            This course starts with agent-based models small enough —{" "}
            <mark className="rounded bg-yellow-200 px-1 text-ink">
              few enough agents, simple enough rules
            </mark>{" "}
            — that the whole thing can be worked through on paper. From
            there, it{" "}
            <mark className="rounded bg-yellow-200 px-1 text-ink">
              rebuilds the standard textbook results one at a time
            </mark>
            :
          </p>
          <ul className="mt-4 list-disc space-y-1.5 pl-5 text-lg text-ink-muted marker:text-accent">
            {RESULTS.map((result) => (
              <li key={result}>{result}</li>
            ))}
          </ul>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            Building each result from the ground up shows exactly{" "}
            <mark className="rounded bg-yellow-200 px-1 text-ink">
              what has to be true about people before the result appears at
              all — and what happens when those assumptions don&apos;t hold
            </mark>
            .
          </p>
        </div>

        <div className="mt-8 flex gap-4 text-sm font-medium">
          <Link
            href="/course"
            className="rounded bg-accent px-4 py-2 text-white no-underline transition-colors hover:bg-accent-hover"
          >
            Start the course
          </Link>
          <Link
            href="/applications"
            className="rounded border border-border px-4 py-2 text-ink no-underline transition-colors hover:border-accent hover:text-accent"
          >
            Applications
          </Link>
        </div>
      </section>

      <section className="mt-20 border-t border-border pt-10">
        <h2 className="font-serif text-2xl font-semibold text-ink">No Prerequisites</h2>
        <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {PREREQUISITES.map((item) => (
            <li key={item} className="flex gap-3 text-ink-muted">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                className="mt-1 h-4 w-4 shrink-0 text-accent"
                aria-hidden="true"
              >
                <path
                  d="M4 10.5l3.5 3.5L16 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20 border-t border-border pt-10">
        <h2 className="font-serif text-2xl font-semibold text-ink">How This Book Is Built</h2>
        <p className="mt-4 max-w-[42rem] leading-relaxed text-ink-muted">
          Course material is posted weekly, in the form the class received
          it, along with a short note on what was expected, what actually
          happened, and what had to change.
        </p>
        <div className="mt-4 max-w-[42rem] rounded border-l-2 border-accent bg-paper-raised py-3 pl-4 pr-4">
          <p className="leading-relaxed text-ink-muted">
            This isn&apos;t a finished, polished text — it&apos;s being
            written as the course is taught for the first time in this form,
            so it shows what fails alongside what works.
          </p>
        </div>
        <p className="mt-5 text-sm">
          <Link href="/announcements" className="no-underline hover:text-accent-hover">
            Latest updates →
          </Link>
          {" · "}
          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noreferrer"
            className="no-underline hover:text-accent-hover"
          >
            Course source
          </a>
        </p>
      </section>

      <section className="mt-20 border-t border-border pt-6">
        <p className="text-sm text-ink-muted">
          Course author: Asad Zaman, Ibn Haldun University, Istanbul.
        </p>
      </section>
    </main>
  );
}
