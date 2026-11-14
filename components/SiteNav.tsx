"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import Logo from "./Logo";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const icons = {
  course: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5v-15ZM20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5v-15Z" {...stroke} />
    </svg>
  ),
  apps: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.6" {...stroke} />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6" {...stroke} />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6" {...stroke} />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6" {...stroke} />
    </svg>
  ),
  sandbox: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M9 3h6M10 3v6l-5.5 9.5A1.6 1.6 0 0 0 5.9 21h12.2a1.6 1.6 0 0 0 1.4-2.5L14 9V3" {...stroke} />
      <path d="M7.5 15h9" {...stroke} />
    </svg>
  ),
  news: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M6 9a6 6 0 1 1 12 0c0 5 2 6.5 2 6.5H4S6 14 6 9Z" {...stroke} />
      <path d="M10 19a2 2 0 0 0 4 0" {...stroke} />
    </svg>
  ),
};

const links = [
  { href: "/course", label: "Course", icon: icons.course },
  { href: "/applications", label: "Applications", icon: icons.apps },
  { href: "/sandbox", label: "Sandbox", icon: icons.sandbox },
  { href: "/announcements", label: "Announcements", icon: icons.news },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const dotLeft = useTransform(progress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      {/* gradient border wrapper */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`relative mx-auto max-w-5xl rounded-[28px] bg-gradient-to-r from-accent/50 via-white/70 to-assumption/50 p-[1.5px] transition-shadow duration-500 ${
          scrolled ? "shadow-2xl shadow-accent/20" : "shadow-lg shadow-accent/10"
        }`}
      >
        <div className="relative overflow-hidden rounded-[27px] bg-paper/80 backdrop-blur-2xl">
          {/* ambient glow */}
          <div className="pointer-events-none absolute -left-10 top-0 h-full w-40 bg-accent/10 blur-2xl" />
          <div className="pointer-events-none absolute -right-10 top-0 h-full w-40 bg-assumption/10 blur-2xl" />

          <nav className="relative flex items-center justify-between gap-4 px-4 py-2.5 sm:px-5">
            <Link href="/" className="group flex items-center gap-3 no-underline">
              <Logo size={38} />
              <span className="font-display text-xl font-extrabold tracking-tight text-ink">
                ABM <span className="bg-gradient-to-r from-accent to-[#4b8ea3] bg-clip-text text-transparent">Micro</span>
              </span>
            </Link>

            <ul className="hidden items-center md:flex" onMouseLeave={() => setHover(null)}>
              {links.map((l) => {
                const active = isActive(l.href);
                return (
                  <li key={l.href} onMouseEnter={() => setHover(l.href)} className="relative">
                    <Link
                      href={l.href}
                      className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold no-underline transition-colors duration-200 ${
                        active ? "text-white hover:text-white" : "text-ink-muted hover:text-accent"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent to-[#3a7488] shadow-lg shadow-accent/40"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      {!active && hover === l.href && (
                        <motion.span
                          layoutId="nav-hover"
                          className="absolute inset-0 -z-10 rounded-full bg-accent/10"
                          transition={{ type: "spring", stiffness: 500, damping: 36 }}
                        />
                      )}
                      <motion.span
                        whileHover={{ rotate: [0, -12, 12, -6, 0], scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex"
                      >
                        {l.icon}
                      </motion.span>
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <Link
                href="/course"
                className="group relative hidden overflow-hidden rounded-full bg-gradient-to-r from-assumption to-[#d99a3d] px-5 py-2 text-sm font-bold text-white no-underline shadow-lg shadow-assumption/30 transition-transform duration-300 hover:-translate-y-0.5 hover:text-white lg:inline-flex lg:items-center lg:gap-1.5"
              >
                <span className="pointer-events-none absolute -inset-x-full top-0 h-full w-1/2 -skew-x-12 bg-white/40 transition-transform duration-700 group-hover:translate-x-[400%]" />
                <span className="relative">Start learning</span>
                <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>

              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-border bg-paper-raised md:hidden"
              >
                <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block h-0.5 w-5 rounded bg-ink" />
                <motion.span animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }} className="block h-0.5 w-5 rounded bg-ink" />
                <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block h-0.5 w-5 rounded bg-ink" />
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-1 overflow-hidden px-3 pb-3 md:hidden"
              >
                {links.map((l, i) => (
                  <motion.li key={l.href} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 * i }}>
                    <Link
                      href={l.href}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold no-underline ${
                        isActive(l.href) ? "bg-gradient-to-r from-accent to-[#3a7488] text-white hover:text-white" : "text-ink hover:bg-accent/10"
                      }`}
                    >
                      {l.icon}
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* reading progress */}
          <motion.div
            style={{ scaleX: progress }}
            className="absolute inset-x-0 bottom-0 h-[4px] origin-left bg-gradient-to-r from-accent via-[#4b8ea3] to-assumption shadow-[0_0_14px_rgba(75,142,163,0.75)]"
          />
          <motion.div
            aria-hidden
            style={{ left: dotLeft }}
            className="pointer-events-none absolute bottom-[-3px] h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-assumption shadow-[0_0_14px_5px_rgba(243,200,122,0.85)]"
          />
        </div>
      </motion.div>
    </header>
  );
}
