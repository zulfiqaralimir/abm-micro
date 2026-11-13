"use client";

import { motion } from "framer-motion";
import Icon from "./Icon";
import { slugify, textOf } from "@/lib/slug";

type C = { children?: React.ReactNode };

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- headings ---------- */

export function H2({ children }: C) {
  const text = textOf(children);
  const m = text.match(/^(\d+)\.\s+(.*)$/);
  const icon = /looking ahead/i.test(text) ? "compass" : /exercises/i.test(text) ? "pencil" : "book";
  return (
    <motion.h2
      id={slugify(text)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease }}
      className="not-prose group relative mb-6 mt-20 scroll-mt-28 flex items-center gap-4 border-t border-border pt-10 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl"
    >
      <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-[#4b8ea3] font-display text-2xl font-extrabold text-white shadow-lg shadow-accent/30">
        {m ? m[1] : <Icon name={icon} className="h-6 w-6" />}
        <span className="absolute inset-0 -z-10 animate-pulse rounded-2xl bg-accent/30 blur-md" />
      </span>
      <span>{m ? m[2] : text}</span>
    </motion.h2>
  );
}

export function H3({ children }: C) {
  const text = textOf(children);
  const m = text.match(/^(\d+\.\d+)\s+(.*)$/);
  return (
    <motion.h3
      id={slugify(text)}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease }}
      className="not-prose mb-3 mt-12 flex scroll-mt-28 items-center gap-3 font-display text-2xl font-bold tracking-tight text-ink"
    >
      {m ? (
        <span className="rounded-full bg-accent/10 px-3 py-1 font-sans text-sm font-bold text-accent ring-1 ring-accent/20">
          {m[1]}
        </span>
      ) : (
        <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-accent to-assumption" />
      )}
      <span>{m ? m[2] : text}</span>
    </motion.h3>
  );
}

/* ---------- text ---------- */

export function P({ children }: C) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, ease }}
      className="my-5 text-[1.12rem] leading-[1.85] text-ink/90"
    >
      {children}
    </motion.p>
  );
}

export function Strong({ children }: C) {
  return (
    <strong className="rounded-sm bg-gradient-to-t from-yellow-200/80 to-transparent px-0.5 font-bold text-ink">
      {children}
    </strong>
  );
}

export function A({ href, children }: { href?: string; children?: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="break-words font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
    >
      {children}
    </a>
  );
}

/* ---------- lists ---------- */

export function UL({ children }: C) {
  return <ul className="not-prose my-6 list-none space-y-3 p-0">{children}</ul>;
}

export function LI({ children }: C) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, ease }}
      whileHover={{ x: 4 }}
      className="group flex gap-4 rounded-2xl border border-border bg-paper-raised p-4 text-[1.05rem] leading-relaxed text-ink/90 shadow-sm transition-colors hover:border-accent/40"
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-300 group-hover:rotate-[360deg] group-hover:bg-accent group-hover:text-white">
        <Icon name="check" className="h-4 w-4" />
      </span>
      <span>{children}</span>
    </motion.li>
  );
}

export function OL({ children }: C) {
  return <ol className="not-prose my-6 list-none space-y-4 p-0 [counter-reset:ex]">{children}</ol>;
}

export function OLI({ children }: C) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.55, ease }}
      className="relative flex gap-4 rounded-2xl border border-border bg-gradient-to-br from-paper-raised to-accent/5 p-5 pl-5 shadow-sm [counter-increment:ex] before:flex before:h-10 before:w-10 before:shrink-0 before:items-center before:justify-center before:rounded-xl before:bg-gradient-to-br before:from-assumption before:to-[#d99a3d] before:font-display before:text-lg before:font-extrabold before:text-white before:shadow-md before:content-[counter(ex)]"
    >
      <span className="text-[1.05rem] leading-relaxed text-ink/90">{children}</span>
    </motion.li>
  );
}

/* ---------- table ---------- */

export function Table({ children }: C) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease }}
      className="not-prose my-10 overflow-hidden rounded-2xl border border-border bg-paper-raised shadow-xl shadow-accent/5"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left text-[0.95rem]">{children}</table>
      </div>
    </motion.div>
  );
}
export const THead = ({ children }: C) => (
  <thead className="bg-gradient-to-r from-accent to-[#3a7488] text-white">{children}</thead>
);
export const TH = ({ children }: C) => (
  <th className="px-4 py-3.5 font-sans text-xs font-bold uppercase tracking-wider">{children}</th>
);
export const TBody = ({ children }: C) => (
  <tbody className="[&>tr:last-child]:bg-gradient-to-r [&>tr:last-child]:from-yellow-100/70 [&>tr:last-child]:to-transparent [&>tr:last-child_td:first-child]:text-accent">
    {children}
  </tbody>
);
export const TR = ({ children }: C) => (
  <tr className="border-b border-border/70 transition-colors last:border-0 hover:bg-accent/5">{children}</tr>
);
export const TD = ({ children }: C) => (
  <td className="px-4 py-4 align-top leading-snug text-ink/85 first:font-display first:text-base first:font-bold first:text-ink">
    {children}
  </td>
);

/* ---------- blockquote = exercise card ---------- */

export function Blockquote({ children }: C) {
  return <Callout kind="exercise">{children}</Callout>;
}

/* ---------- callouts & cards ---------- */

const KINDS = {
  idea: { icon: "bulb", label: "Key idea", bar: "from-accent to-[#4b8ea3]", bg: "from-accent/10 via-paper-raised to-paper-raised", chip: "bg-accent text-white" },
  story: { icon: "book", label: "Story", bar: "from-assumption to-[#f3c87a]", bg: "from-yellow-100/70 via-paper-raised to-paper-raised", chip: "bg-assumption text-white" },
  warning: { icon: "alert", label: "Cautionary tale", bar: "from-[#b4443a] to-[#e0897f]", bg: "from-red-100/60 via-paper-raised to-paper-raised", chip: "bg-[#b4443a] text-white" },
  exercise: { icon: "pencil", label: "Exercise", bar: "from-[#3a7488] to-[#7fc0d3]", bg: "from-sky-100/70 via-paper-raised to-paper-raised", chip: "bg-[#3a7488] text-white" },
  next: { icon: "compass", label: "Up next", bar: "from-accent to-assumption", bg: "from-accent/10 via-paper-raised to-yellow-100/50", chip: "bg-accent text-white" },
} as const;

export function Callout({
  kind = "idea",
  title,
  children,
}: { kind?: keyof typeof KINDS; title?: string } & C) {
  const k = KINDS[kind];
  return (
    <motion.aside
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease }}
      className={`not-prose relative my-10 overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${k.bg} p-6 pl-8 shadow-lg shadow-black/5 sm:p-8 sm:pl-10`}
    >
      <span className={`absolute inset-y-0 left-0 w-2 bg-gradient-to-b ${k.bar}`} />
      <div className="mb-3 flex items-center gap-3">
        <motion.span
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-md ${k.chip}`}
        >
          <Icon name={k.icon} className="h-5 w-5" />
        </motion.span>
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">{k.label}</span>
        {title && <span className="font-display text-xl font-bold text-ink">{title}</span>}
      </div>
      <div className="callout-body space-y-3 text-[1.08rem] leading-[1.8] text-ink/90 [&_p]:my-3">{children}</div>
    </motion.aside>
  );
}

export function Pull({ children }: C) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease }}
      className="not-prose relative my-12 overflow-hidden rounded-3xl bg-gradient-to-br from-[#10242c] via-[#1e434f] to-[#2b5a6b] p-8 text-center shadow-2xl shadow-accent/20 sm:p-12"
    >
      <span className="pointer-events-none absolute -left-6 -top-10 font-display text-[10rem] leading-none text-white/10">“</span>
      <div className="relative font-display text-2xl font-semibold italic leading-snug text-white sm:text-3xl [&_strong]:bg-none [&_strong]:text-[#f3c87a]">
        {children}
      </div>
    </motion.blockquote>
  );
}

export function CardGrid({ cols = 3, children }: { cols?: 2 | 3 } & C) {
  return (
    <div className={`not-prose my-8 grid gap-5 ${cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
      {children}
    </div>
  );
}

export function Card({
  icon = "spark",
  title,
  tone = "teal",
  children,
}: { icon?: string; title: string; tone?: "teal" | "amber" } & C) {
  const amber = tone === "amber";
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.6, ease }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-paper-raised p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl ${
        amber ? "hover:shadow-assumption/15" : "hover:shadow-accent/15"
      }`}
    >
      <span
        className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-40 ${
          amber ? "bg-assumption" : "bg-accent"
        }`}
      />
      <span
        className={`relative flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${
          amber ? "bg-assumption/10 text-assumption" : "bg-accent/10 text-accent"
        }`}
      >
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <h4 className="relative mt-4 font-display text-xl font-bold text-ink">{title}</h4>
      <div className="relative mt-2 text-[0.98rem] leading-relaxed text-ink/80 [&_p]:my-2">{children}</div>
    </motion.div>
  );
}

export function Lead({ children }: C) {
  return (
    <div className="not-prose my-8 rounded-3xl border border-border bg-gradient-to-br from-paper-raised to-accent/5 p-7 font-display text-xl leading-relaxed text-ink/85 shadow-sm sm:text-2xl sm:leading-relaxed [&_p]:my-3 [&_p]:text-inherit">
      {children}
    </div>
  );
}

export function Reference({ children }: C) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
      className="not-prose my-6 flex gap-5 rounded-2xl border border-border bg-paper-raised p-6 shadow-sm"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
        <Icon name="link" className="h-6 w-6" />
      </span>
      <div className="space-y-2 text-[0.98rem] leading-relaxed text-ink/85 [&_p]:my-2">{children}</div>
    </motion.div>
  );
}
