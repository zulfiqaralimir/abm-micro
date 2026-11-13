"use client";

import { motion, useReducedMotion } from "framer-motion";

// Decorative ABM scene: buyers (teal) and sellers (amber) drift and trade.
// Positions are fixed (no Math.random) so server and client render match.
const BUYERS = [
  [60, 70], [120, 150], [70, 230], [150, 300], [210, 90], [220, 220], [100, 360],
];
const SELLERS = [
  [440, 80], [380, 160], [450, 240], [370, 320], [310, 100], [300, 250], [420, 380],
];
const TRADES = [[0, 4], [1, 5], [2, 5], [3, 5], [4, 0], [5, 3], [6, 3]];

export default function AgentHero() {
  const reduce = useReducedMotion();
  const drift = (i: number) =>
    reduce
      ? {}
      : {
          animate: { x: [0, i % 2 ? 10 : -10, 0], y: [0, i % 3 ? -12 : 12, 0] },
          transition: { duration: 5 + (i % 4), repeat: Infinity, ease: "easeInOut" as const },
        };

  return (
    <svg viewBox="0 0 520 440" className="h-full w-full" role="img" aria-label="Animated buyers and sellers trading with each other">
      <defs>
        <radialGradient id="buyerG" cx="35%" cy="30%">
          <stop offset="0" stopColor="#7fc0d3" />
          <stop offset="1" stopColor="#2b5a6b" />
        </radialGradient>
        <radialGradient id="sellerG" cx="35%" cy="30%">
          <stop offset="0" stopColor="#f3c87a" />
          <stop offset="1" stopColor="#b8791f" />
        </radialGradient>
        <linearGradient id="lineG" x1="0" x2="1">
          <stop offset="0" stopColor="#2b5a6b" />
          <stop offset="1" stopColor="#b8791f" />
        </linearGradient>
      </defs>

      {TRADES.map(([b, s], i) => (
        <motion.line
          key={i}
          x1={BUYERS[b][0]} y1={BUYERS[b][1]} x2={SELLERS[s][0]} y2={SELLERS[s][1]}
          stroke="url(#lineG)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 8"
          initial={{ opacity: 0 }}
          animate={reduce ? { opacity: 0.35 } : { opacity: [0.1, 0.6, 0.1], strokeDashoffset: [0, -48] }}
          transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
        />
      ))}

      {BUYERS.map(([x, y], i) => (
        <motion.g key={`b${i}`} {...drift(i)}>
          <circle cx={x} cy={y} r={20} fill="#2b5a6b" opacity="0.08" />
          <circle cx={x} cy={y} r={11} fill="url(#buyerG)" />
        </motion.g>
      ))}
      {SELLERS.map(([x, y], i) => (
        <motion.g key={`s${i}`} {...drift(i + 3)}>
          <circle cx={x} cy={y} r={20} fill="#b8791f" opacity="0.1" />
          <rect x={x - 10} y={y - 10} width={20} height={20} rx={6} fill="url(#sellerG)" />
        </motion.g>
      ))}

      {/* Emerging price: pulsing equilibrium marker at the centre */}
      <motion.circle
        cx={260} cy={220} r={6} fill="none" stroke="#2b5a6b" strokeWidth="2"
        animate={reduce ? {} : { r: [6, 34], opacity: [0.8, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
      />
      <circle cx={260} cy={220} r={5} fill="#2b5a6b" />
    </svg>
  );
}
