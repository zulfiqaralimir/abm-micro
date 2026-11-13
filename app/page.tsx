import Link from "next/link";
import LinkCards from "@/components/LinkCards";
import AgentHero from "@/components/AgentHero";
import ResultCards from "@/components/ResultCards";
import Reveal from "@/components/Reveal";

const PREREQUISITES: React.ReactNode[] = [
  "No programming required or taught",
  "No calculus, statistics, or econometrics assumed",
  "Models run with arithmetic, and later a spreadsheet",
  <>
    Open to students who could never take a{" "}
    <mark className="rounded bg-yellow-200 px-1 text-ink">computational modelling</mark>{" "}
    course — sociology, political science, Islamic studies, and anyone else
    working on how people behave in groups
  </>,
];

// Landing page copy paraphrased from Asad Zaman's Sep 19, 2026 announcement
// email (see content/announcements/2026-09-19-abm-micro-starting-soon.mdx).
export default function HomePage() {
  return (
    <main className="overflow-x-clip">
      {/* HERO */}
      <section className="hero-mesh relative">
        <div className="grid-dots pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-6 pb-20 pt-16 lg:grid-cols-2 lg:pt-24">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-paper-raised/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent shadow-sm backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                A Web Book
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="shimmer-text mt-5 bg-gradient-to-r from-accent via-[#4b8ea3] to-assumption bg-clip-text font-display text-6xl font-extrabold leading-[1.02] tracking-tight text-transparent sm:text-8xl">
                ABM Micro
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-[34rem] font-display text-2xl italic leading-snug text-ink-muted sm:text-3xl">
                Rebuilding microeconomics,{" "}
                <mark className="rounded bg-yellow-200 px-1 text-ink">one small model at a time</mark>.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-muted">
                Agent-based models small enough, with few enough agents and simple enough rules, to be worked
                through on paper, then used to rebuild the standard textbook results.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-9 flex flex-wrap gap-4 text-sm font-semibold">
                <Link
                  href="/course"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-white no-underline shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover hover:text-white hover:shadow-xl hover:shadow-accent/40"
                >
                  Start the course
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </Link>
                <Link
                  href="/applications"
                  className="rounded-full border border-border bg-paper-raised/80 px-6 py-3 text-ink no-underline backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  Applications
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.25} className="float-slow mx-auto aspect-[520/440] w-full max-w-xl">
            <AgentHero />
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        {/* RESULTS */}
        <section className="py-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">What gets rebuilt</p>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight">
              Five textbook results, from the ground up
            </h2>
            <p className="mt-4 max-w-[44rem] text-lg leading-relaxed text-ink-muted">
              Building each result from scratch shows exactly{" "}
              <mark className="rounded bg-yellow-200 px-1 text-ink">
                what has to be true about people before the result appears at all, and what happens when those
                assumptions don&apos;t hold
              </mark>
              .
            </p>
          </Reveal>
          <ResultCards />
        </section>

        {/* PREREQUISITES */}
        <section className="border-t border-border py-16">
          <Reveal>
            <h2 className="font-display text-4xl font-bold tracking-tight">No Prerequisites</h2>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {PREREQUISITES.map((item, i) => (
              <li key={i} className="list-none">
                <Reveal delay={i * 0.08} className="h-full">
                  <div className="group flex h-full gap-4 rounded-2xl border border-border bg-paper-raised p-5 text-ink-muted shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                      <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                        <path d="M4 10.5l3.5 3.5L16 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="leading-snug">{item}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        {/* HOW BUILT */}
        <section className="border-t border-border py-16">
          <Reveal>
            <h2 className="font-display text-4xl font-bold tracking-tight">How This Book Is Built</h2>
            <p className="mt-4 max-w-[44rem] text-lg leading-relaxed text-ink-muted">
              Course material is posted weekly, in the form the class received it, along with a short note on
              what was expected, what actually happened, and what had to change.
            </p>
            <div className="mt-5 max-w-[44rem] rounded-2xl border-l-4 border-accent bg-gradient-to-r from-accent/5 to-transparent py-4 pl-5 pr-4">
              <p className="leading-relaxed text-ink-muted">
                This isn&apos;t a finished, polished text. It&apos;s being written as the course is taught for
                the first time in this form, so it shows what fails alongside what works.
              </p>
            </div>
          </Reveal>
          <LinkCards />
        </section>

        <section className="border-t border-border py-8">
          <p className="text-sm text-ink-muted">Course author: Asad Zaman, Ibn Haldun University, Istanbul.</p>
        </section>
      </div>
    </main>
  );
}
