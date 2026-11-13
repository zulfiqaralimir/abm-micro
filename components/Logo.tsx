"use client";

import { motion, useReducedMotion } from "framer-motion";

// Animated mark: a buyer (circle) and a seller (square) orbit a pulsing
// equilibrium point and trade along a dashed line. Reads as "agents -> price".
export default function Logo({ size = 40 }: { size?: number }) {
  const reduce = useReducedMotion();
  return (
    <span
      className="relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-accent via-[#3a7488] to-[#4b8ea3] shadow-lg shadow-accent/30 ring-1 ring-white/20 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" width={size} height={size} fill="none" aria-hidden="true">
        {/* orbit ring */}
        <circle cx="20" cy="20" r="12" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 3" />
        {/* equilibrium pulse */}
        <motion.circle
          cx="20" cy="20" r="3" stroke="white" strokeWidth="1.2"
          animate={reduce ? {} : { r: [3, 11], opacity: [0.9, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
        <circle cx="20" cy="20" r="2.6" fill="white" />
        {/* orbiting agents */}
        <motion.g
          style={{ originX: "20px", originY: "20px" }}
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="20" cy="8" r="3.4" fill="white" />
          <rect x="29" y="17.8" width="6" height="6" rx="1.8" fill="#f3c87a" transform="rotate(0)" />
          <motion.line
            x1="20" y1="8" x2="32" y2="20.8" stroke="white" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2.5"
            animate={reduce ? {} : { strokeDashoffset: [0, -18] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
        </motion.g>
      </svg>
    </span>
  );
}
