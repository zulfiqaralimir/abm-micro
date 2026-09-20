import Link from "next/link";

const SOURCE_URL = "https://sites.google.com/view/islamic-economics-2023/abm-micro";

// Landing page copy paraphrased from Asad Zaman's Sep 19, 2026 announcement
// email (see content/announcements/2026-09-19-abm-micro-starting-soon.mdx).
export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <section>
        <h1 className="font-serif text-4xl font-bold text-ink">ABM Micro</h1>
        <p className="mt-2 font-serif text-xl text-ink-muted">
          Rebuilding microeconomics, one small model at a time.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-ink-muted">
          This course starts with agent-based models small enough — few
          enough agents, simple enough rules — that the whole thing can be
          worked through on paper. From there, it rebuilds the standard
          textbook results one at a time:
        </p>
        <ul className="mt-4 space-y-1 text-lg text-ink-muted">
          <li>The demand curve</li>
          <li>Market equilibrium</li>
          <li>The welfare theorems</li>
          <li>Rent control</li>
          <li>The minimum wage</li>
        </ul>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          Building each result from the ground up shows exactly what has to
          be true about people before the result appears at all — and what
          happens when those assumptions don&apos;t hold.
        </p>
        <div className="mt-8 flex gap-4 text-sm font-medium">
          <Link
            href="/course"
            className="rounded bg-accent px-4 py-2 text-white no-underline hover:bg-accent-hover"
          >
            Start the course
          </Link>
          <Link
            href="/applications"
            className="rounded border border-border px-4 py-2 text-ink no-underline hover:border-accent hover:text-accent"
          >
            Applications
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-2xl font-semibold text-ink">No Prerequisites</h2>
        <ul className="mt-4 space-y-2 text-ink-muted">
          <li>No programming required or taught</li>
          <li>No calculus, statistics, or econometrics assumed</li>
          <li>Models run with arithmetic, and later a spreadsheet</li>
          <li>
            Open to students who could never take a computational modelling
            course — sociology, political science, Islamic studies, and
            anyone else working on how people behave in groups
          </li>
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-2xl font-semibold text-ink">How This Book Is Built</h2>
        <p className="mt-4 leading-relaxed text-ink-muted">
          Course material is posted weekly, in the form the class received
          it, along with a short note on what was expected, what actually
          happened, and what had to change. This isn&apos;t a finished,
          polished text — it&apos;s being written as the course is taught
          for the first time in this form, so it shows what fails alongside
          what works.
        </p>
        <p className="mt-4 text-sm">
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

      <section className="mt-16 border-t border-border pt-6">
        <p className="text-sm text-ink-muted">
          Course author: Asad Zaman, Ibn Haldun University, Istanbul.
        </p>
      </section>
    </main>
  );
}
