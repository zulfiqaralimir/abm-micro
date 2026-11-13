"use client";

import { motion } from "framer-motion";

// Each card has an icon whose strokes draw themselves when scrolled into view
// and replay on hover.
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 1.2, ease: "easeInOut" as const } },
};

const P = (props: React.SVGProps<SVGPathElement> & { d: string }) => (
  <motion.path variants={draw} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...(props as object)} />
);

const ICONS: Record<string, React.ReactNode> = {
  demand: <><P d="M5 4v26h26" /><P d="M9 8c4 12 10 16 22 18" /></>,
  equilibrium: <><P d="M5 4v26h26" /><P d="M8 26L30 8" /><P d="M8 8l22 18" /><motion.circle variants={draw} cx="19" cy="17" r="3" fill="currentColor" /></>,
  welfare: <><P d="M18 6v22M8 28h20" /><P d="M7 12h22" /><P d="M7 12l-4 8h8l-4-8ZM29 12l-4 8h8l-4-8Z" /></>,
  rent: <><P d="M5 17L18 6l13 11" /><P d="M9 15v14h18V15" /><P d="M15 29v-8h6v8" /></>,
  wage: <><circle cx="18" cy="18" r="13" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.25" /><P d="M23 11c-1-2-9-2-9 2s9 3 9 7-8 4-10 1M18 7v22" /></>,
};

const RESULTS = [
  { key: "demand", title: "The demand curve", text: "Built from individual buyers' willingness to pay." },
  { key: "equilibrium", title: "Market equilibrium", text: "Where trades settle, found by hand." },
  { key: "welfare", title: "The welfare theorems", text: "What must be true about people for them to hold." },
  { key: "rent", title: "Rent control", text: "Rules imposed on a tiny housing market." },
  { key: "wage", title: "The minimum wage", text: "A price floor tested agent by agent." },
];

export default function ResultCards() {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {RESULTS.map((r, i) => (
        <motion.div
          key={r.key}
          initial="hidden"
          whileInView="show"
          whileHover="show"
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.08 }}
          className="group relative overflow-hidden rounded-2xl border border-border bg-paper-raised p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
        >
          <span className="absolute right-4 top-3 font-display text-5xl font-extrabold text-accent/10 transition-colors group-hover:text-accent/20">
            {String(i + 1).padStart(2, "0")}
          </span>
          <svg viewBox="0 0 36 36" className="relative h-12 w-12 text-accent">{ICONS[r.key]}</svg>
          <h3 className="relative mt-4 font-display text-xl font-bold">{r.title}</h3>
          <p className="relative mt-1 text-sm leading-relaxed text-ink-muted">{r.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
