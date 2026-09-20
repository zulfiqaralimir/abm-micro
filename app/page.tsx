import Link from "next/link";

// Landing page. Full framing from Asad Zaman's course materials and a link
// to the source Google Sites page are TODO (Phase 4+, pending source text).
export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-serif text-4xl font-bold">ABM Micro</h1>
      <p className="mt-4 text-lg text-ink-muted">
        Rebuilding demand, equilibrium, welfare, rent control, and the minimum
        wage — from small agent-based models you can run on paper.
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
      <Link
        href="/announcements"
        className="mt-6 inline-block text-sm text-ink-muted no-underline hover:text-accent"
      >
        Latest updates →
      </Link>
      {/* TODO: Asad Zaman's framing + link to source course once supplied */}
    </main>
  );
}
