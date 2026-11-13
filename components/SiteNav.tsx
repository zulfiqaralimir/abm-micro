"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Logo from "./Logo";

const links = [
  { href: "/course", label: "Course" },
  { href: "/applications", label: "Applications" },
  { href: "/sandbox", label: "Sandbox" },
  { href: "/announcements", label: "Announcements" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-border/70 bg-paper/75 shadow-sm backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="group flex items-center gap-3 no-underline">
          <Logo />
          <span className="font-display text-xl font-bold tracking-tight text-ink">
            ABM <span className="text-accent">Micro</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 text-sm font-medium md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`relative block rounded-full px-4 py-2 no-underline transition-colors ${
                  isActive(l.href) ? "text-white hover:text-white" : "text-ink-muted hover:text-ink"
                }`}
              >
                {isActive(l.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-accent shadow-md shadow-accent/30"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-border bg-paper-raised md:hidden"
        >
          <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block h-0.5 w-5 rounded bg-ink" />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className="block h-0.5 w-5 rounded bg-ink" />
          <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block h-0.5 w-5 rounded bg-ink" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-4 mb-3 space-y-1 rounded-2xl border border-border bg-paper-raised/95 p-3 shadow-xl backdrop-blur-xl md:hidden"
          >
            {links.map((l, i) => (
              <motion.li key={l.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                <Link
                  href={l.href}
                  className={`block rounded-xl px-4 py-3 text-base font-medium no-underline ${
                    isActive(l.href) ? "bg-accent text-white hover:text-white" : "text-ink hover:bg-accent/10"
                  }`}
                >
                  {l.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-accent via-[#4b8ea3] to-assumption"
      />
    </header>
  );
}
