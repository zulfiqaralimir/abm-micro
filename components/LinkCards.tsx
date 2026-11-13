"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const SOURCE_URL = "https://sites.google.com/view/islamic-economics-2023/abm-micro";

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
    <path
      d="M6 9a6 6 0 1 1 12 0c0 5 2 6.5 2 6.5H4S6 14 6 9Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
    <path
      d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5v-15ZM20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5v-15Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const CARDS = [
  {
    title: "Latest updates",
    text: "Weekly announcements from the course, newest first.",
    href: "/announcements",
    external: false,
    icon: <BellIcon />,
    cta: "Read announcements",
  },
  {
    title: "Course source",
    text: "Asad Zaman's original course site, where the material is first posted.",
    href: SOURCE_URL,
    external: true,
    icon: <BookIcon />,
    cta: "Open Google Site",
  },
];

export default function LinkCards() {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {CARDS.map((card, i) => {
        const inner = (
          <>
            <span className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br from-accent/10 via-transparent to-assumption/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="pointer-events-none absolute -inset-x-full top-0 h-full w-1/2 -skew-x-12 bg-white/60 opacity-0 transition-all duration-700 group-hover:translate-x-[300%] group-hover:opacity-100" />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
              {card.icon}
            </span>
            <span className="relative mt-4 block font-display text-xl font-bold text-ink">
              {card.title}
            </span>
            <span className="relative mt-1 block text-sm leading-relaxed text-ink-muted">
              {card.text}
            </span>
            <span className="relative mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
              {card.cta}
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </span>
          </>
        );
        const cls =
          "group relative block overflow-hidden rounded-2xl border border-border bg-paper-raised p-6 no-underline shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
            whileHover={{ y: -6 }}
          >
            {card.external ? (
              <a href={card.href} target="_blank" rel="noreferrer" className={cls}>
                {inner}
              </a>
            ) : (
              <Link href={card.href} className={cls}>
                {inner}
              </Link>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
