"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Top-level site nav. Keeps Main Course and Applications visually distinct
// (CLAUDE.md §1) by giving Applications links a muted treatment vs. the
// primary Course link.
const links = [
  { href: "/course", label: "Course" },
  { href: "/applications", label: "Applications" },
  { href: "/sandbox", label: "Sandbox" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-lg font-semibold text-ink no-underline">
          ABM Micro
        </Link>
        <ul className="flex gap-6 text-sm font-medium">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`no-underline transition-colors ${
                    active ? "text-accent" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
