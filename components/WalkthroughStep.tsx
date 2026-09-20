"use client";

import { motion } from "framer-motion";

// Numbered, scroll-revealed arithmetic/spreadsheet step within the By-Hand
// Walkthrough. Step numbers auto-increment via a CSS counter scoped to
// `.chapter-walkthrough` (see globals.css) — no manual numbering needed when
// stacking steps inside a walkthrough section.
export default function WalkthroughStep({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="walkthrough-step my-4 border-l-2 border-border pl-4"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
