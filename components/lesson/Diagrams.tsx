"use client";

import { motion } from "framer-motion";

const TEAL = "#2b5a6b";
const TEAL_L = "#7fc0d3";
const AMBER = "#b8791f";
const AMBER_L = "#f3c87a";
const INK = "#1c1a17";
const MUTED = "#6b6459";

const ease = [0.22, 1, 0.36, 1] as const;
const view = { once: true, margin: "-60px" } as const;

function Figure({ caption, children, vb }: { caption: string; children: React.ReactNode; vb: string }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={view}
      transition={{ duration: 0.8, ease }}
      className="not-prose my-10"
    >
      <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-paper-raised via-paper-raised to-accent/5 p-4 shadow-xl shadow-accent/5 sm:p-6">
        <svg viewBox={vb} className="h-auto w-full" role="img" aria-label={caption}>
          {children}
        </svg>
      </div>
      <figcaption className="mt-3 text-center text-sm italic text-ink-muted">{caption}</figcaption>
    </motion.figure>
  );
}

const pop = (i: number) => ({
  initial: { opacity: 0, scale: 0.6 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: view,
  transition: { duration: 0.5, delay: 0.1 * i, ease },
});

const draw = (delay = 0, duration = 1.2) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: view,
  transition: { duration, delay, ease: "easeInOut" as const },
});

/* 1 — the seen and the unseen: iceberg / waterline */
export function SeenUnseenDiagram() {
  const cols = [
    { x: 110, seen: "Tracks in a detector", hidden: "The particles", field: "Physics" },
    { x: 320, seen: "Symptoms", hidden: "The disease", field: "Medicine" },
    { x: 530, seen: "Prices, purchases, choices", hidden: "Motives inside people", field: "Economics" },
  ];
  return (
    <Figure vb="0 0 640 330" caption="Every science works with what can be seen and the hidden things that produce it.">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdf6e3" />
          <stop offset="1" stopColor="#eaf4f7" />
        </linearGradient>
        <linearGradient id="deep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bcdce6" />
          <stop offset="1" stopColor="#2b5a6b" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="640" height="150" fill="url(#sky)" rx="18" />
      <rect x="0" y="150" width="640" height="180" fill="url(#deep)" rx="18" />
      <rect x="0" y="130" width="640" height="40" fill="url(#sky)" opacity="0" />
      <motion.path
        d="M0 150 Q40 138 80 150 T160 150 T240 150 T320 150 T400 150 T480 150 T560 150 T640 150"
        fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round"
        animate={{ d: [
          "M0 150 Q40 138 80 150 T160 150 T240 150 T320 150 T400 150 T480 150 T560 150 T640 150",
          "M0 150 Q40 162 80 150 T160 150 T240 150 T320 150 T400 150 T480 150 T560 150 T640 150",
          "M0 150 Q40 138 80 150 T160 150 T240 150 T320 150 T400 150 T480 150 T560 150 T640 150",
        ] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x="20" y="30" fontSize="13" fontWeight="700" letterSpacing="2" fill={AMBER}>SEEN · WHAT CAN BE OBSERVED</text>
      <text x="20" y="318" fontSize="13" fontWeight="700" letterSpacing="2" fill="#dbeef4">UNSEEN · WHAT PRODUCES IT</text>

      {cols.map((c, i) => (
        <g key={c.field}>
          <motion.g {...pop(i)}>
            <rect x={c.x - 90} y="68" width="180" height="50" rx="14" fill="#fff" stroke={AMBER_L} strokeWidth="2" />
            <text x={c.x} y="98" textAnchor="middle" fontSize="14" fontWeight="600" fill={INK}>{c.seen}</text>
          </motion.g>
          <motion.line
            x1={c.x} y1="226" x2={c.x} y2="124" stroke="#fff" strokeWidth="2" strokeDasharray="5 7" strokeLinecap="round"
            animate={{ strokeDashoffset: [0, -24] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          />
          <motion.g {...pop(i + 3)}>
            <rect x={c.x - 90} y="228" width="180" height="50" rx="14" fill={TEAL} stroke={TEAL_L} strokeWidth="2" />
            <text x={c.x} y="258" textAnchor="middle" fontSize="14" fontWeight="600" fill="#fff">{c.hidden}</text>
          </motion.g>
          <text x={c.x} y="196" textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="2" fill="#fff">{c.field.toUpperCase()}</text>
        </g>
      ))}
    </Figure>
  );
}

/* 2 — map vs ground: simplification for a purpose */
export function MapDiagram() {
  const clutter = [
    [50, 60, "tree"], [95, 110, "stone"], [140, 55, "house"], [60, 150, "stone"], [120, 160, "tree"],
    [170, 120, "house"], [30, 110, "tree"], [150, 170, "stone"], [85, 75, "house"], [185, 60, "tree"],
  ] as const;
  return (
    <Figure vb="0 0 640 230" caption="A map leaves out almost everything, and that is exactly why it is useful for finding a route.">
      <rect x="10" y="20" width="220" height="190" rx="20" fill="#eef3e4" stroke="#c9d6b0" strokeWidth="2" />
      <text x="120" y="14" textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="2" fill={MUTED}>THE GROUND</text>
      {clutter.map(([x, y, k], i) => (
        <motion.g key={i} {...pop(i * 0.4)}>
          {k === "tree" && <polygon points={`${x},${y - 14} ${x - 10},${y + 8} ${x + 10},${y + 8}`} fill="#6e9a5c" />}
          {k === "stone" && <ellipse cx={x} cy={y} rx="8" ry="5" fill="#a49d8f" />}
          {k === "house" && (
            <>
              <rect x={x - 9} y={y - 5} width="18" height="13" fill={AMBER_L} />
              <polygon points={`${x - 11},${y - 5} ${x},${y - 15} ${x + 11},${y - 5}`} fill="#b4443a" />
            </>
          )}
        </motion.g>
      ))}
      <motion.g
        animate={{ x: [0, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="250" y1="115" x2="380" y2="115" stroke={TEAL} strokeWidth="3" strokeLinecap="round" />
        <polygon points="380,105 398,115 380,125" fill={TEAL} />
      </motion.g>
      <text x="320" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill={TEAL}>simplify for a purpose</text>
      <rect x="410" y="20" width="220" height="190" rx="20" fill="#fff" stroke={TEAL_L} strokeWidth="2" />
      <text x="520" y="14" textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="2" fill={MUTED}>THE MAP</text>
      <motion.path
        d="M445 170 C480 170 480 110 520 110 S570 70 600 55"
        fill="none" stroke={TEAL} strokeWidth="5" strokeLinecap="round" strokeDasharray="1 10"
        {...draw(0.2, 1.6)}
      />
      <motion.path d="M445 170 C480 170 480 110 520 110 S570 70 600 55" fill="none" stroke={TEAL} strokeWidth="5" strokeLinecap="round" {...draw(0.2, 1.6)} />
      <motion.circle cx="445" cy="170" r="9" fill={AMBER} {...pop(2)} />
      <motion.circle cx="600" cy="55" r="9" fill={TEAL} {...pop(5)} />
      <text x="445" y="195" textAnchor="middle" fontSize="11" fill={MUTED}>start</text>
      <text x="600" y="80" textAnchor="middle" fontSize="11" fill={MUTED}>arrive</text>
    </Figure>
  );
}

/* 3 — Models A and B reproduce the same overall rate */
export function ModelsABDiagram() {
  const Student = ({ x, y, fill, partial }: { x: number; y: number; fill: string; partial?: boolean }) => (
    <g>
      <circle cx={x} cy={y} r="11" fill={fill} />
      <path d={`M${x - 15} ${y + 38} q0 -22 15 -22 q15 0 15 22 Z`} fill={fill} />
      {partial && <path d={`M${x - 15} ${y + 38} q0 -22 15 -22 q15 0 15 22 Z`} fill={AMBER_L} clipPath="inset(75% 0 0 0)" opacity="0.001" />}
      {partial && <rect x={x - 15} y={y + 30} width="30" height="8" rx="3" fill={AMBER_L} />}
    </g>
  );
  const xs = [70, 130, 190, 250, 310];
  return (
    <Figure vb="0 0 700 300" caption="Different hidden parts, identical observations: one copied answer in five either way.">
      {[
        { ox: 10, title: "MODEL A", sub: "One student in five copies every answer", a: true },
        { ox: 370, title: "MODEL B", sub: "Everyone copies about one answer in five", a: false },
      ].map((m, k) => (
        <g key={m.title} transform={`translate(${m.ox},0)`}>
          <rect x="0" y="10" width="320" height="230" rx="20" fill="#fff" stroke={k ? AMBER_L : TEAL_L} strokeWidth="2" />
          <text x="160" y="40" textAnchor="middle" fontSize="14" fontWeight="800" letterSpacing="3" fill={k ? AMBER : TEAL}>{m.title}</text>
          <text x="160" y="62" textAnchor="middle" fontSize="12" fill={MUTED}>{m.sub}</text>
          {xs.map((x, i) => (
            <motion.g key={i} {...pop(i)}>
              {m.a ? (
                <Student x={x - 10} y={110} fill={i === 0 ? AMBER : TEAL_L} />
              ) : (
                <Student x={x - 10} y={110} fill={TEAL_L} partial />
              )}
            </motion.g>
          ))}
          <text x="160" y="205" textAnchor="middle" fontSize="12" fontWeight="600" fill={INK}>
            {m.a ? "a few have no scruples" : "everyone has a few"}
          </text>
          {m.a && (
            <motion.circle
              cx="60" cy="120" r="26" fill="none" stroke={AMBER} strokeWidth="2"
              animate={{ r: [22, 34], opacity: [0.8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
            />
          )}
        </g>
      ))}
      <motion.g {...pop(6)}>
        <rect x="190" y="252" width="320" height="40" rx="20" fill={TEAL} />
        <text x="350" y="277" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">= same overall rate: 1 in 5</text>
      </motion.g>
    </Figure>
  );
}

/* 4 — two criteria */
export function CriteriaDiagram() {
  return (
    <Figure vb="0 0 700 290" caption="Any model can be judged for either purpose, and neither criterion makes a model true.">
      <motion.g {...pop(0)}>
        <rect x="10" y="105" width="150" height="80" rx="18" fill={TEAL} />
        <text x="85" y="152" textAnchor="middle" fontSize="18" fontWeight="800" fill="#fff">A model</text>
      </motion.g>
      <motion.path d="M160 135 C220 135 220 60 280 60" fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" {...draw(0.3)} />
      <motion.path d="M160 155 C220 155 220 230 280 230" fill="none" stroke={AMBER} strokeWidth="3" strokeLinecap="round" {...draw(0.3)} />
      <motion.circle r="5" fill={TEAL} animate={{ offsetDistance: ["0%", "100%"] }} style={{ offsetPath: 'path("M160 135 C220 135 220 60 280 60")' }} transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }} />
      <motion.circle r="5" fill={AMBER} animate={{ offsetDistance: ["0%", "100%"] }} style={{ offsetPath: 'path("M160 155 C220 155 220 230 280 230")' }} transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }} />

      <motion.g {...pop(2)}>
        <rect x="280" y="20" width="410" height="80" rx="18" fill="#fff" stroke={TEAL_L} strokeWidth="2" />
        <text x="300" y="48" fontSize="12" fontWeight="800" letterSpacing="2" fill={TEAL}>PREDICTION · THE NOMINALIST CRITERION</text>
        <text x="300" y="72" fontSize="14" fill={INK}>Does the model reproduce what we observe?</text>
        <text x="300" y="90" fontSize="12" fill={MUTED}>A close match counts in its favour.</text>
      </motion.g>
      <motion.g {...pop(3)}>
        <rect x="280" y="190" width="410" height="80" rx="18" fill="#fff" stroke={AMBER_L} strokeWidth="2" />
        <text x="300" y="218" fontSize="12" fontWeight="800" letterSpacing="2" fill={AMBER}>UNDERSTANDING · THE REALIST CRITERION</text>
        <text x="300" y="242" fontSize="14" fill={INK}>Has it kept the mechanisms that produce what we see?</text>
        <text x="300" y="260" fontSize="12" fill={MUTED}>The purpose of the models in this book.</text>
      </motion.g>
    </Figure>
  );
}

/* 5 — the three tests */
export function ThreeTestsDiagram() {
  const steps = [
    { x: 110, t: "Sufficiency", q: "Is what remains enough?" },
    { x: 350, t: "Reproduction", q: "Does it produce the phenomenon?" },
    { x: 590, t: "Plausibility", q: "Do the mechanics look plausible?" },
  ];
  return (
    <Figure vb="0 0 700 220" caption="A model built for understanding is judged by three questions, and agreement grows as it answers them well.">
      {[0, 1].map((i) => (
        <motion.line
          key={i} x1={steps[i].x + 52} y1="80" x2={steps[i + 1].x - 52} y2="80"
          stroke={TEAL} strokeWidth="3" strokeDasharray="6 8" strokeLinecap="round"
          animate={{ strokeDashoffset: [0, -28] }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {steps.map((s, i) => (
        <g key={s.t}>
          <motion.g {...pop(i)}>
            <circle cx={s.x} cy="80" r="46" fill={i === 1 ? AMBER : TEAL} />
            <circle cx={s.x} cy="80" r="46" fill="none" stroke={i === 1 ? AMBER_L : TEAL_L} strokeWidth="3" strokeDasharray="4 6" />
            <text x={s.x} y="74" textAnchor="middle" fontSize="26" fontWeight="800" fill="#fff">{i + 1}</text>
            <text x={s.x} y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">{s.t}</text>
          </motion.g>
          <motion.text {...pop(i + 2)} x={s.x} y="165" textAnchor="middle" fontSize="13" fill={INK}>{s.q}</motion.text>
        </g>
      ))}
    </Figure>
  );
}

/* 0 — at the crossing: the car you see, the intention you cannot */
export function CrossingDiagram() {
  const T = 8;
  const carTimes = [0, 0.5, 1];
  const brake = { duration: T, times: carTimes, repeat: Infinity, ease: ["easeOut", "linear"] as ["easeOut", "linear"] };
  const towers = [
    [10, 52, 34], [48, 30, 40], [92, 62, 30], [128, 40, 44], [176, 70, 28], [210, 36, 38],
    [560, 58, 36], [600, 34, 40], [520, 74, 26],
  ];
  return (
    <Figure vb="0 0 640 280" caption="You can see the car slowing. The driver's intention to stop is what you actually act on, and it is invisible.">
      <defs>
        <linearGradient id="cx-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b5a6b" />
          <stop offset="0.55" stopColor="#e8c79a" />
          <stop offset="1" stopColor="#f6dfb4" />
        </linearGradient>
        <radialGradient id="cx-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff3c9" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff3c9" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cx-road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#57534b" />
          <stop offset="1" stopColor="#35322d" />
        </linearGradient>
        <linearGradient id="cx-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e0a548" />
          <stop offset="1" stopColor="#a8701c" />
        </linearGradient>
        <linearGradient id="cx-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff3c9" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fff3c9" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cx-red" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff5a4a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ff5a4a" stopOpacity="0" />
        </radialGradient>
        <filter id="cx-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* dusk sky, sun, skyline */}
      <rect x="0" y="0" width="640" height="118" rx="18" fill="url(#cx-sky)" />
      <motion.circle cx="330" cy="100" r="90" fill="url(#cx-sun)"
        animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      {towers.map(([x, h, w], i) => (
        <g key={i}>
          <rect x={x} y={118 - h} width={w} height={h} fill="#1f4350" opacity="0.85" />
          {[0, 1, 2].map((r) => (
            <motion.rect key={r} x={x + 6 + (r % 2) * 14} y={118 - h + 8 + r * 12} width="6" height="5" rx="1" fill="#ffe29a"
              animate={{ opacity: [0.2, 0.95, 0.2] }}
              transition={{ duration: 3 + ((i + r) % 3), delay: (i * 0.7 + r * 0.4) % 3, repeat: Infinity }} />
          ))}
        </g>
      ))}

      {/* drifting clouds */}
      {[[60, 52, 0], [380, 40, 1]].map(([y0, w, k]) => (
        <motion.g key={k} initial={{ x: -120 }} animate={{ x: [-120, 700] }}
          transition={{ duration: 40 + k * 15, repeat: Infinity, ease: "linear", delay: -k * 20 }}>
          <ellipse cx="0" cy={y0 - 10 + k * 14} rx={w} ry="9" fill="#fff" opacity="0.28" />
          <ellipse cx={w / 2} cy={y0 - 16 + k * 14} rx={w / 1.6} ry="8" fill="#fff" opacity="0.22" />
        </motion.g>
      ))}

      {/* lamp posts with glow */}
      {[262, 590].map((x, i) => (
        <g key={x}>
          <rect x={x - 2} y="68" width="4" height="52" fill="#1f4350" />
          <motion.circle cx={x} cy="66" r="14" fill="#ffd98a" filter="url(#cx-glow)"
            animate={{ opacity: [0.5, 0.95, 0.5] }} transition={{ duration: 3.5, delay: i * 1.2, repeat: Infinity, ease: "easeInOut" }} />
          <circle cx={x} cy="66" r="4" fill="#fff3c9" />
        </g>
      ))}

      {/* story steps, lit in sequence */}
      {[
        { x: 118, label: "1 · YOU SEE THE CAR SLOW", t: [0, 0.05, 0.4, 0.45] },
        { x: 320, label: "2 · YOU INFER AN INTENTION", t: [0.4, 0.5, 0.65, 0.7] },
        { x: 522, label: "3 · YOU ACT", t: [0.65, 0.72, 0.95, 1] },
      ].map((s) => (
        <motion.g key={s.label} animate={{ opacity: [0.25, 1, 1, 0.25] }}
          transition={{ duration: T, times: s.t, repeat: Infinity }}>
          <rect x={s.x - 98} y="10" width="196" height="22" rx="11" fill="#0f2a33" opacity="0.55" />
          <text x={s.x} y="25" textAnchor="middle" fontSize="10.5" fontWeight="800" letterSpacing="1.5" fill="#fff">{s.label}</text>
        </motion.g>
      ))}

      {/* pavement, road, kerb */}
      <rect x="0" y="118" width="640" height="16" fill="#cfc6b4" />
      <rect x="0" y="134" width="640" height="106" fill="url(#cx-road)" />
      <rect x="0" y="134" width="640" height="3" fill="#e9e1cf" opacity="0.6" />
      <rect x="0" y="240" width="640" height="40" rx="18" fill="#cfc6b4" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={20 + i * 85} y="188" width="42" height="5" rx="2" fill="#f4efe4" opacity="0.6" />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="438" y={140 + i * 19} width="74" height="11" fill="#f6f1e6" opacity="0.9" />
      ))}

      {/* pedestrian */}
      <motion.g
        animate={{ y: [0, 0, 40, 40, 0], opacity: [1, 1, 1, 1, 0] }}
        transition={{ duration: T, times: [0, 0.55, 0.7, 0.95, 1], repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="475" cy="130" rx="14" ry="3" fill="#000" opacity="0.25" />
        <circle cx="475" cy="84" r="9" fill={INK} />
        <path d="M475 93 L475 114" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <path d="M475 114 L469 130 M475 114 L481 130" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
        <path d="M475 98 L466 108 M475 98 L484 108" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
        <motion.circle cx="475" cy="84" r="13" fill="none" stroke={TEAL_L} strokeWidth="2"
          animate={{ r: [10, 22], opacity: [0.8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} />
      </motion.g>

      {/* the car */}
      <motion.g initial={{ x: -190 }} animate={{ x: [-190, 190, 190] }} transition={brake}>
        <motion.g animate={{ opacity: [1, 0, 0] }} transition={brake}>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={-30 - i * 6} y={158 + i * 14} width={60 + i * 10} height="3" rx="1.5" fill="#fff" opacity="0.5" />
          ))}
        </motion.g>
        <polygon points="158,172 330,140 330,214 158,184" fill="url(#cx-beam)" />
        <ellipse cx="100" cy="206" rx="64" ry="5" fill="#000" opacity="0.3" />
        <rect x="40" y="158" width="120" height="40" rx="13" fill="url(#cx-body)" />
        <path d="M62 158 L78 134 H128 L146 158 Z" fill="#f3c87a" />
        <rect x="84" y="140" width="18" height="15" rx="3" fill="#dff0f5" />
        <rect x="108" y="140" width="20" height="15" rx="3" fill="#dff0f5" />
        <circle cx="94" cy="148" r="4" fill={INK} />
        <circle cx="158" cy="172" r="4" fill="#fff3c9" />
        <circle cx="42" cy="170" r="14" fill="url(#cx-red)" />
        <motion.circle cx="42" cy="170" r="12" fill="url(#cx-red)"
          animate={{ opacity: [0, 1, 1] }} transition={{ ...brake, times: [0, 0.2, 1] }} />
        <rect x="40" y="166" width="5" height="9" rx="2" fill="#ff5a4a" />
        {[68, 134].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="198" r="12" fill={INK} />
            <motion.g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }} animate={{ rotate: [0, 900, 900] }} transition={brake}>
              <circle cx={cx} cy="198" r="8" fill="#bdb6a8" />
              <path d={`M${cx - 8} 198 H${cx + 8} M${cx} 190 V206`} stroke={INK} strokeWidth="2" />
              <circle cx={cx + 5} cy="193" r="2" fill={AMBER} />
            </motion.g>
          </g>
        ))}
        <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={{ duration: T, times: [0, 0.3, 0.45, 0.95, 1], repeat: Infinity }}>
          <circle cx="94" cy="128" r="3.5" fill={TEAL} />
          <circle cx="86" cy="117" r="5.5" fill={TEAL} />
          {[0, 1].map((k) => (
            <motion.ellipse key={k} cx="100" cy="88" rx="68" ry="23" fill="none" stroke={TEAL_L} strokeWidth="1.5"
              animate={{ rx: [68, 100], ry: [23, 40], opacity: [0.6, 0] }}
              transition={{ duration: 2.4, delay: k * 1.2, repeat: Infinity, ease: "easeOut" }} />
          ))}
          <motion.ellipse cx="100" cy="88" rx="68" ry="23" fill={TEAL} stroke={TEAL_L} strokeWidth="2" strokeDasharray="5 5"
            animate={{ ry: [23, 25, 23] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
          <text x="100" y="93" textAnchor="middle" fontSize="14" fontWeight="600" fill="#fff">“I'll stop”</text>
        </motion.g>
      </motion.g>

      {/* trust: pedestrian to the hidden intention */}
      <motion.path d="M468 80 C430 40 380 52 360 86" fill="none" stroke={TEAL} strokeWidth="2.5" strokeDasharray="2 8" strokeLinecap="round"
        animate={{ pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: T, times: [0, 0.4, 0.55, 0.95, 1], repeat: Infinity, ease: "easeInOut" }} />

      {/* readouts */}
      <text x="20" y="262" fontSize="11" fontWeight="800" letterSpacing="2" fill={AMBER}>SEEN · SPEED</text>
      <rect x="128" y="253" width="150" height="10" rx="5" fill="#fff" opacity="0.7" />
      <motion.rect x="128" y="253" height="10" rx="5" fill={AMBER} animate={{ width: [150, 6, 6] }} transition={brake} />
      <text x="620" y="262" textAnchor="end" fontSize="11" fontWeight="800" letterSpacing="2" fill={TEAL}>UNSEEN · THE DRIVER'S INTENTION</text>
    </Figure>
  );
}
