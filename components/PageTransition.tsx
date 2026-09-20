"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Slow, subtle fade on route change — per CLAUDE.md §6 ("slow, elegant
// transitions only ... no flashy or fast motion").
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
