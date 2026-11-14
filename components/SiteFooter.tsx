"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "./Logo";

const SOURCE_URL = "https://sites.google.com/view/islamic-economics-2023/abm-micro";

const COLUMNS = [
  {
    title: "Course",
    links: [
      { label: "Table of contents", href: "/course" },
      { label: "Foundations", href: "/course/foundations" },
      { label: "Instructor notes", href: "/course/instructor-notes" },
      { label: "Announcements", href: "/announcements" },
    ],
  },
  {
    title: "Applications",
    links: [
      { label: "Programming", href: "/applications/programming" },
      { label: "Data structures", href: "/applications/dsa" },
      { label: "System design", href: "/applications/system-design" },
      { label: "Reference", href: "/applications/reference" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Sandbox", href: "/sandbox" },
      { label: "Course source", href: SOURCE_URL, external: true },
      { label: "GitHub", href: "https://github.com/zulfiqaralimir/abm-micro", external: true },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-[#10242c] text-white">
      {/* animated wave on top */}
      <svg className="absolute inset-x-0 top-0 h-16 w-full -translate-y-[1px] text-paper" viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          fill="currentColor"
          animate={{
            d: [
              "M0 0H1440V24C1200 60 960 8 720 28C480 48 240 8 0 36Z",
              "M0 0H1440V36C1200 8 960 52 720 30C480 12 240 56 0 24Z",
              "M0 0H1440V24C1200 60 960 8 720 28C480 48 240 8 0 36Z",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* glowing orbs */}
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-accent/40 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-assumption/30 blur-[100px]" />
      <div className="grid-dots pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-28">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Link href="/" className="group flex items-center gap-3 no-underline">
              <Logo size={44} />
              <span className="font-display text-2xl font-extrabold tracking-tight text-white">ABM Micro</span>
            </Link>
            <p className="mt-5 max-w-xs font-display text-lg italic leading-snug text-white/70">
              Rebuilding microeconomics, one small model at a time.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              A web book based on Asad Zaman&apos;s agent-based microeconomics course, Ibn Haldun University,
              Istanbul.
            </p>
          </motion.div>

          {COLUMNS.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 * (i + 1) }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f3c87a]">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {"external" in l && l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1.5 text-sm text-white/70 no-underline transition-colors hover:text-white"
                      >
                        <span className="h-px w-0 bg-[#f3c87a] transition-all duration-300 group-hover:w-3" />
                        {l.label} <span className="text-xs opacity-60">↗</span>
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-1.5 text-sm text-white/70 no-underline transition-colors hover:text-white"
                      >
                        <span className="h-px w-0 bg-[#f3c87a] transition-all duration-300 group-hover:w-3" />
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <div className="space-y-1.5 text-center sm:text-left">
            <p>© {new Date().getFullYear()} ABM Micro. Course content by Asad Zaman.</p>
            <p className="text-white/70">
              <span className="font-semibold text-white/90">Zulfiqar Ali Mir</span>, CEO, Black Iron Quantum AI (Private) Limited
              {" · "}
              <a href="tel:+923225150501" className="font-semibold text-[#f3c87a] no-underline transition-colors hover:text-white">+92 322 5150501</a>
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/80 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[#f3c87a]/60 hover:text-white"
          >
            Back to top
            <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
              ↑
            </motion.span>
          </button>
        </div>
      </div>
    </footer>
  );
}
