"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { TocItem } from "@/lib/slug";

export default function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-ink-faint">On this page</p>
      <ul className="relative space-y-1 border-l border-border">
        {items.map((it) => {
          const on = active === it.id;
          return (
            <li key={it.id} className="relative">
              {on && (
                <motion.span
                  layoutId="toc-bar"
                  className="absolute -left-px top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-accent to-assumption"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <a
                href={`#${it.id}`}
                className={`block py-1.5 pl-4 pr-2 leading-snug no-underline transition-colors ${
                  on ? "font-semibold text-accent" : "text-ink-muted hover:text-ink"
                }`}
              >
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
