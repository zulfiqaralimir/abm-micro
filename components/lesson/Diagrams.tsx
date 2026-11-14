"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TEAL = "#2b5a6b";
const TEAL_L = "#7fc0d3";
const AMBER = "#b8791f";
const AMBER_L = "#f3c87a";
const INK = "#1c1a17";
const MUTED = "#6b6459";

const ease = [0.22, 1, 0.36, 1] as const;
const view = { once: true, margin: "-60px" } as const;

function Figure({ caption, children, vb }: { caption: string; children: React.ReactNode; vb: string }) {
  const box = useRef<HTMLDivElement | null>(null);
  const [fs, setFs] = useState(false);
  useEffect(() => {
    const on = () => setFs(document.fullscreenElement === box.current);
    document.addEventListener("fullscreenchange", on);
    return () => document.removeEventListener("fullscreenchange", on);
  }, []);
  const toggle = () => {
    try {
      if (document.fullscreenElement) void document.exitFullscreen();
      else void box.current?.requestFullscreen();
    } catch {}
  };
  return (
    <motion.figure
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={view}
      transition={{ duration: 0.8, ease }}
      className="not-prose my-10"
    >
      <div
        ref={box}
        onClick={toggle}
        className={
          fs
            ? "relative flex h-screen w-screen cursor-zoom-out items-center justify-center bg-[#0f1a1f] p-4 sm:p-8"
            : "group relative cursor-zoom-in overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-paper-raised via-paper-raised to-accent/5 p-4 shadow-xl shadow-accent/5 sm:p-6"
        }
      >
        <svg viewBox={vb} className={fs ? "h-full w-full" : "h-auto w-full"} role="img" aria-label={caption}>
          {children}
        </svg>
        <button
          type="button"
          aria-label={fs ? "Exit full screen" : "View full screen"}
          onClick={(e) => { e.stopPropagation(); toggle(); }}
          className="absolute right-3 top-3 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold tracking-wide text-white opacity-80 backdrop-blur transition hover:opacity-100 sm:right-5 sm:top-5"
        >
          {fs ? "✕ Close" : "⤢ Full screen"}
        </button>
      </div>
      {!fs && <figcaption className="mt-3 text-center text-sm italic text-ink-muted">{caption}</figcaption>}
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
  // One driver for everything physical: the car's x. Wheels turn by exactly the distance
  // rolled (angle = distance / radius), so spin and travel always match and slow together.
  const carX = useMotionValue(-190);
  const wheelRefs = useRef<(SVGGElement | null)[]>([]);
  const manRef = useRef<SVGGElement | null>(null);
  const man = useRef<{
    standLegs: SVGGElement | null; walkLegs: SVGGElement | null; standArms: SVGGElement | null; walkArms: SVGGElement | null; up: SVGGElement | null;
    legs: (SVGPathElement | null)[]; feet: (SVGEllipseElement | null)[]; arms: (SVGPathElement | null)[]; hands: (SVGCircleElement | null)[];
  }>({ standLegs: null, walkLegs: null, standArms: null, walkArms: null, up: null, legs: [], feet: [], arms: [], hands: [] });
  const manY = useMotionValue(0);
  const manO = useMotionValue(1);
  useEffect(() => {
    const R = 12;
    const hubs = [68, 134];
    const unsub = carX.on("change", (x) => {
      const deg = ((x + 190) * 180) / (Math.PI * R);
      hubs.forEach((cx, i) => wheelRefs.current[i]?.setAttribute("transform", `rotate(${deg} ${cx} 198)`));
    });
    // the man: waits at the kerb, then walks across the road once the car has stopped
    const place = () => {
      const y = manY.get();
      const m = man.current;
      const sc = 1 + (y / 104) * 0.18;
      manRef.current?.setAttribute("transform", `translate(0 ${y}) translate(475 130) scale(${sc}) translate(-475 -130)`);
      manRef.current?.setAttribute("opacity", String(manO.get()));
      const walking = y > 0.3;
      m.standLegs?.setAttribute("display", walking ? "none" : "inline");
      m.standArms?.setAttribute("display", walking ? "none" : "inline");
      m.walkLegs?.setAttribute("display", walking ? "inline" : "none");
      m.walkArms?.setAttribute("display", walking ? "inline" : "none");
      if (!walking) { m.up?.setAttribute("transform", ""); return; }
      // Front-view gait (he walks towards us). Each leg cycles: stance (foot planted, slides back
      // relative to the body as he advances) then swing (foot lifts and reaches forward = lower on screen).
      const CYCLES = 4, STANCE = 0.6, S = 12;
      const cyc = (y / 104) * CYCLES;
      const HIP = 114.5;
      const ease = (t: number) => t * t * (3 - 2 * t);
      const legs = [0, 1].map((k) => {
        const u = (((cyc + k * 0.5) % 1) + 1) % 1;
        let off: number, lift = 0;
        if (u < STANCE) off = S / 2 - S * (u / STANCE);
        else { const t = (u - STANCE) / (1 - STANCE); off = -S / 2 + S * ease(t); lift = 4.2 * Math.sin(Math.PI * t); }
        const hx = k ? 478 : 472, out = k ? 1 : -1;
        const ax = hx + out * 0.9, ay = 129.5 + off * 0.55 - lift;
        const kx = (hx + ax) / 2 + out * (0.8 + lift * 0.35), ky = (HIP + ay) / 2 - lift * 0.25;
        return { hx, kx, ky, ax, ay };
      });
      const bob = -1.3 * Math.abs(Math.sin(cyc * 2 * Math.PI));
      const sway = 0.9 * Math.sin(cyc * 2 * Math.PI);
      legs.forEach((g, k) => {
        m.legs[k]?.setAttribute("d", `M${g.hx + sway * 0.5} ${HIP + bob} L${g.kx} ${g.ky} L${g.ax} ${g.ay}`);
        m.feet[k]?.setAttribute("cx", String(g.ax));
        m.feet[k]?.setAttribute("cy", String(g.ay + 1));
      });
      m.up?.setAttribute("transform", `translate(${sway} ${bob})`);
      [0, 1].forEach((k) => {
        const sx = k ? 483 : 467, out = k ? 1 : -1;
        const sw = Math.sin((cyc + (k ? 0 : 0.5)) * 2 * Math.PI); // swings against the same-side leg
        const ex = sx + out * 1.6, ey = 103;
        const hx = sx + out * (1.1 - 0.5 * sw), hy = 110.5 + 3.2 * sw;
        m.arms[k]?.setAttribute("d", `M${sx} 97 L${ex} ${ey} L${hx} ${hy}`);
        m.hands[k]?.setAttribute("cx", String(hx));
        m.hands[k]?.setAttribute("cy", String(hy + 1.6));
      });
    };
    const u2 = manY.on("change", place);
    const u3 = manO.on("change", place);
    const times = [0, 0.55, 0.93, 0.96, 0.99, 1];
    const cy = animate(manY, [0, 0, 104, 104, 0, 0], { duration: T, times, ease: "linear", repeat: Infinity });
    const co = animate(manO, [1, 1, 1, 0, 0, 1], { duration: T, times, ease: "linear", repeat: Infinity });
    const ctl = animate(carX, 190, { duration: T / 2, ease: "easeOut", repeat: Infinity, repeatDelay: T / 2 });
    return () => { unsub(); u2(); u3(); ctl.stop(); cy.stop(); co.stop(); };
  }, [carX]);
  const carTimes = [0, 0.5, 1];
  const brake = { duration: T, times: carTimes, repeat: Infinity, ease: ["easeOut", "linear"] as ["easeOut", "linear"] };
  // far haze layer, then near buildings: [x, width, height, roof]
  const far = [[0, 50, 40], [44, 38, 56], [120, 44, 44], [210, 40, 52], [300, 56, 38], [380, 40, 54], [450, 50, 42], [540, 44, 56], [596, 50, 44]];
  const near: [number, number, number, string, string][] = [
    [4, 40, 54, "flat", "#a9927a"], [46, 34, 38, "tank", "#8f5a49"], [280, 38, 46, "flat", "#c9b896"], [322, 44, 60, "antenna", "#6c8591"],
    [370, 36, 40, "slope", "#b08a68"], [410, 26, 34, "flat", "#7d8f96"], [520, 44, 56, "tank", "#a47a5e"], [566, 30, 42, "slope", "#c4b08c"], [600, 36, 62, "antenna", "#5f7a86"],
  ];
  const win = (i: number, r: number, c: number) => (i * 7 + r * 13 + c * 5) % 4 !== 0;
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
        <linearGradient id="cx-shade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0b1c24" stopOpacity="0.5" />
          <stop offset="0.6" stopColor="#0b1c24" stopOpacity="0.12" />
          <stop offset="1" stopColor="#ffb86b" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="cx-dusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffcf8f" stopOpacity="0.18" />
          <stop offset="1" stopColor="#0b1c24" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="cx-win-lit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff0b8" />
          <stop offset="1" stopColor="#f0a94a" />
        </linearGradient>
        <linearGradient id="cx-win-dark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c9a374" />
          <stop offset="0.5" stopColor="#35525f" />
          <stop offset="1" stopColor="#1a2b33" />
        </linearGradient>
        <linearGradient id="cx-road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#57534b" />
          <stop offset="1" stopColor="#35322d" />
        </linearGradient>
        <linearGradient id="cx-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef1f3" />
          <stop offset="0.3" stopColor="#b9c1c8" />
          <stop offset="0.62" stopColor="#7d868e" />
          <stop offset="1" stopColor="#3f454b" />
        </linearGradient>
        <linearGradient id="cx-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a9c8d6" />
          <stop offset="0.5" stopColor="#35525f" />
          <stop offset="1" stopColor="#1a2b33" />
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
      {/* far haze layer */}
      {far.map(([x, w, h], i) => (
        <rect key={i} x={x} y={118 - h} width={w} height={h} fill="#6f9aa8" opacity="0.4" />
      ))}

      {/* mosque: dome and twin minarets, the skyline of the city this course is taught in */}
      <g fill="#183843">
        <path d="M118 118 V96 H206 V118 Z" />
        <path d="M130 96 A32 30 0 0 1 194 96 Z" />
        <path d="M110 96 A14 12 0 0 1 138 96 Z" opacity="0.9" />
        <path d="M186 96 A14 12 0 0 1 214 96 Z" opacity="0.9" />
        <rect x="161" y="58" width="2" height="8" />
        <circle cx="162" cy="56" r="2.5" />
        {[100, 224].map((mx) => (
          <g key={mx}>
            <rect x={mx - 3} y="46" width="6" height="72" />
            <rect x={mx - 6} y="62" width="12" height="3" />
            <polygon points={`${mx - 4},46 ${mx},26 ${mx + 4},46`} />
            <circle cx={mx} cy="24" r="2" />
          </g>
        ))}
      </g>
      {[148, 162, 176].map((wx) => (
        <path key={wx} d={`M${wx - 4} 118 V108 A4 5 0 0 1 ${wx + 4} 108 V118 Z`} fill="#ffe29a" opacity="0.75" />
      ))}

      {/* near buildings: lit facades, cornices, framed windows, balconies, shopfronts */}
      {near.map(([x, w, h, roof, tone], i) => {
        const top = 118 - h;
        const cols = Math.max(1, Math.floor((w - 8) / 10));
        const rows = Math.max(1, Math.floor((h - 20) / 12));
        const pad = (w - cols * 10) / 2 + 1.5;
        return (
          <g key={i}>
            {roof === "slope" && <polygon points={`${x - 2},${top} ${x + w / 2},${top - 11} ${x + w + 2},${top}`} fill="#a4503e" />}
            {roof === "slope" && <polygon points={`${x + w / 2},${top - 11} ${x + w + 2},${top} ${x + w / 2},${top}`} fill="#7c3a2e" />}
            <rect x={x} y={top} width={w} height={h} fill={tone} />
            <rect x={x} y={top} width={w} height={h} fill="url(#cx-shade)" />
            <rect x={x} y={top} width={w} height={h} fill="url(#cx-dusk)" />
            <rect x={x + w - 2.5} y={top} width="2.5" height={h} fill="#ffd9a0" opacity="0.35" />
            <rect x={x - 1.5} y={top - 2.5} width={w + 3} height="3" fill="#e9dcc2" opacity="0.8" />
            <rect x={x - 1.5} y={top + 0.5} width={w + 3} height="1.4" fill="#000" opacity="0.25" />
            {roof === "tank" && (
              <g><rect x={x + 6} y={top - 12} width="14" height="9" rx="2" fill="#5b6a70" /><rect x={x + 8} y={top - 4} width="2" height="3" fill="#3d484d" /><rect x={x + 16} y={top - 4} width="2" height="3" fill="#3d484d" /></g>
            )}
            {roof === "antenna" && (
              <g stroke="#2a3a40" strokeWidth="1.6"><line x1={x + w / 2} y1={top - 3} x2={x + w / 2} y2={top - 19} /><line x1={x + w / 2 - 6} y1={top - 12} x2={x + w / 2 + 6} y2={top - 12} /><line x1={x + w / 2 - 4} y1={top - 16} x2={x + w / 2 + 4} y2={top - 16} /></g>
            )}
            {roof === "flat" && <rect x={x + w - 12} y={top - 8} width="5" height="6" fill="#4a5459" />}
            {Array.from({ length: rows }).flatMap((_, r) =>
              Array.from({ length: cols }).map((__, c) => {
                const wx = x + pad + c * 10;
                const wy = top + 8 + r * 12;
                const lit = (i * 7 + r * 13 + c * 5) % 4 !== 0;
                const blink = lit && (i + r + c) % 5 === 0;
                return (
                  <g key={`${r}-${c}`}>
                    <rect x={wx - 1} y={wy - 1} width="8.5" height="10.5" rx="0.8" fill="#e6dcc6" opacity="0.75" />
                    <rect x={wx} y={wy} width="6.5" height="8.5" fill={lit ? "url(#cx-win-lit)" : "url(#cx-win-dark)"} />
                    {blink && (
                      <motion.rect x={wx} y={wy} width="6.5" height="8.5" fill="#1b2c33"
                        animate={{ opacity: [0, 0.8, 0] }}
                        transition={{ duration: 4 + ((i + r) % 3), delay: (i * 0.7 + c * 0.9) % 4, repeat: Infinity }} />
                    )}
                    <line x1={wx + 3.25} y1={wy} x2={wx + 3.25} y2={wy + 8.5} stroke="#e6dcc6" strokeWidth="0.6" opacity="0.8" />
                    {(r + i) % 2 === 1 && (
                      <g><rect x={wx - 1.5} y={wy + 8.7} width="9.5" height="1.6" fill="#1b2c33" opacity="0.85" /><path d={`M${wx - 0.5} ${wy + 8.7} v-2.6 M${wx + 2} ${wy + 8.7} v-2.6 M${wx + 4.5} ${wy + 8.7} v-2.6 M${wx + 7} ${wy + 8.7} v-2.6`} stroke="#1b2c33" strokeWidth="0.6" opacity="0.7" /></g>
                    )}
                  </g>
                );
              })
            )}
            {/* shopfront with striped awning and lit door */}
            <rect x={x} y="108" width={w} height="10" fill="#14262d" />
            {Array.from({ length: Math.floor(w / 6) }).map((_, k) => (
              <rect key={k} x={x + k * 6} y="106" width="6" height="4" fill={k % 2 ? "#f3e7cf" : (i % 2 ? "#b4443a" : "#2b7a8a")} />
            ))}
            <rect x={x + 5} y="111" width={Math.max(8, w - 14)} height="7" fill="url(#cx-win-lit)" opacity="0.9" />
          </g>
        );
      })}

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

      {/* pedestrian: stride is driven by distance walked (see place() above) */}
      <g ref={manRef}>
        <ellipse cx="475" cy="130" rx="14" ry="3" fill="#000" opacity="0.25" />
        <g ref={(el) => { man.current.standLegs = el; }}>
          <path d="M471 114 V128 M479 114 V128" stroke="#2a2f3a" strokeWidth="5.5" strokeLinecap="round" />
          <ellipse cx="469.5" cy="130" rx="5" ry="2.6" fill="#15110e" />
          <ellipse cx="480.5" cy="130" rx="5" ry="2.6" fill="#15110e" />
        </g>
        <g display="none" ref={(el) => { man.current.walkLegs = el; }}>
          {[0, 1].map((k) => (
            <g key={k}>
              <path ref={(el) => { man.current.legs[k] = el; }} d="M0 0" fill="none" stroke="#2a2f3a" strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round" />
              <ellipse ref={(el) => { man.current.feet[k] = el; }} rx="5" ry="2.5" fill="#15110e" />
            </g>
          ))}
        </g>
        <g ref={(el) => { man.current.up = el; }}>
          <g ref={(el) => { man.current.standArms = el; }}>
            <path d="M466 97 L464 111 M484 97 L486 111" stroke="#b4443a" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="464" cy="113" r="2.4" fill="#d9a679" />
            <circle cx="486" cy="113" r="2.4" fill="#d9a679" />
          </g>
          <g display="none" ref={(el) => { man.current.walkArms = el; }}>
            {[0, 1].map((k) => (
              <g key={k}>
                <path ref={(el) => { man.current.arms[k] = el; }} d="M0 0" fill="none" stroke="#b4443a" strokeWidth="4.3" strokeLinecap="round" strokeLinejoin="round" />
                <circle ref={(el) => { man.current.hands[k] = el; }} r="2.4" fill="#d9a679" />
              </g>
            ))}
          </g>
          <path d="M466 96 Q475 91 484 96 L485 115 Q475 119 465 115 Z" fill="#b4443a" />
          <path d="M472 93 L475 100 L478 93 Z" fill="#e9dcc2" />
          <rect x="473" y="87" width="4" height="6" fill="#d9a679" />
          <circle cx="475" cy="81.5" r="7.5" fill="#d9a679" />
          <polygon points="468.5,82.5 465.5,86 469.5,86" fill="#c8915f" />
          <circle cx="478.5" cy="82.5" r="1.7" fill="#c8915f" />
          <circle cx="471.8" cy="81.5" r="1.1" fill="#15110e" />
          <path d="M467.4 81 A7.6 7.6 0 0 1 482.6 81 Q480 76.6 475 77.4 Q470 76.4 467.4 81 Z" fill="#2a1d16" />
          <motion.circle cx="475" cy="84" r="13" fill="none" stroke={TEAL_L} strokeWidth="2"
            animate={{ r: [10, 22], opacity: [0.8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} />
        </g>
      </g>

      {/* the car */}
      <motion.g style={{ x: carX }}>
        <motion.g animate={{ opacity: [1, 0, 0] }} transition={brake}>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={-30 - i * 6} y={158 + i * 14} width={60 + i * 10} height="3" rx="1.5" fill="#fff" opacity="0.5" />
          ))}
        </motion.g>
        <polygon points="168,172 340,138 340,216 168,184" fill="url(#cx-beam)" />
        <ellipse cx="104" cy="207" rx="74" ry="5" fill="#000" opacity="0.45" />
        {/* body: sedan silhouette in metallic paint */}
        <path d="M36 192 Q34 176 40 170 L52 166 L68 163 L80 141 Q84 134 94 133 L124 133 Q134 134 141 146 L156 160 L165 165 Q171 170 171 180 L171 192 Q170 199 162 199 L44 199 Q36 199 36 192 Z" fill="url(#cx-body)" />
        <path d="M44 199 L162 199 L162 193 L44 193 Z" fill="#000" opacity="0.28" />
        {/* glass */}
        <path d="M80 158 L86 141 Q88 138 94 138 L105 138 L105 158 Z" fill="url(#cx-glass)" />
        <path d="M109 158 L109 138 L122 138 Q128 139 133 148 L141 158 Z" fill="url(#cx-glass)" />
        <path d="M112 156 L116 140 M118 156 L122 140" stroke="#fff" strokeWidth="2" opacity="0.18" />
        <path d="M82 134 Q94 131 124 131" stroke="#fff" strokeWidth="1.2" opacity="0.55" fill="none" />
        {/* panel lines, handles, trim */}
        <path d="M44 168 L152 164" stroke="#fff" strokeWidth="1.2" opacity="0.55" fill="none" />
        <path d="M107 138 V196 M71 164 V196 M148 161 V196" stroke="#2b2f33" strokeWidth="0.9" opacity="0.7" />
        <rect x="112" y="168" width="9" height="2.6" rx="1.3" fill="#d8dde0" />
        <rect x="79" y="168" width="9" height="2.6" rx="1.3" fill="#d8dde0" />
        <path d="M46 190 L160 190" stroke="#dfe3e6" strokeWidth="1" opacity="0.5" />
        <ellipse cx="140" cy="152" rx="4.5" ry="3" fill="#8f98a0" />
        {/* lights: headlight, grille, taillight */}
        <path d="M159 168 L169 170 L170 177 L160 175 Z" fill="#fff6d6" />
        <rect x="168" y="180" width="3" height="10" rx="1" fill="#1b1d20" />
        <circle cx="168" cy="173" r="9" fill="#fff3c9" opacity="0.35" filter="url(#cx-glow)" />
        <path d="M36 172 L41 170 L42 178 L36 181 Z" fill="#8f1d16" />
        <circle cx="38" cy="175" r="16" fill="url(#cx-red)" />
        <motion.circle cx="38" cy="175" r="13" fill="url(#cx-red)"
          animate={{ opacity: [0, 1, 1] }} transition={{ ...brake, times: [0, 0.2, 1] }} />
        <motion.path d="M36 172 L41 170 L42 178 L36 181 Z" fill="#ff5a4a"
          animate={{ opacity: [0.2, 1, 1] }} transition={{ ...brake, times: [0, 0.2, 1] }} />
        {/* wheels: arch, tyre, 5-spoke alloy that spins by the distance rolled */}
        {[68, 134].map((cx, wi) => (
          <g key={cx}>
            <circle cx={cx} cy="198" r="15.5" fill="#0e0c0a" />
            <circle cx={cx} cy="198" r="12.5" fill="#1a1816" />
            <circle cx={cx} cy="198" r="12.5" fill="none" stroke="#35312c" strokeWidth="1" />
            <g ref={(el) => { wheelRefs.current[wi] = el; }}>
              <circle cx={cx} cy="198" r="8.5" fill="#cfd4d8" />
              {[0, 1, 2, 3, 4].map((k) => {
                const a = (k * 72 * Math.PI) / 180;
                return <path key={k} d={`M${cx} 198 L${cx + 7.3 * Math.sin(a)} ${198 - 7.3 * Math.cos(a)}`} stroke="#5f656b" strokeWidth="2.6" strokeLinecap="round" />;
              })}
              <circle cx={cx} cy="198" r="2.4" fill="#8b9096" />
              <circle cx={cx} cy="198" r="8.5" fill="none" stroke="#f3f5f6" strokeWidth="0.8" opacity="0.7" />
            </g>
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

/* 0b — the exam: the same grade, two very different minds behind it */
export function ExamDiagram() {
  const T = 9;
  const tl = (times: number[], values: number[]) => ({
    animate: { opacity: values },
    transition: { duration: T, times, repeat: Infinity, ease: "linear" as const },
  });
  const grade = tl([0, 0.1, 0.14, 0.95, 0.98, 1], [0, 0, 1, 1, 0, 0]);
  const same = tl([0, 0.18, 0.23, 0.95, 0.98, 1], [0, 0, 1, 1, 0, 0]);
  const asking = tl([0, 0.3, 0.36, 0.95, 0.98, 1], [0, 0, 1, 1, 0, 0]);
  const unknown = tl([0, 0.28, 0.34, 0.46, 0.52, 1], [0, 0, 1, 1, 0, 0]);
  const mind = tl([0, 0.46, 0.56, 0.95, 0.98, 1], [0, 0, 1, 1, 0, 0]);
  const trace = {
    animate: { pathLength: [0, 0, 1, 1, 0, 0], opacity: [0, 0, 1, 1, 0, 0] },
    transition: { duration: T, times: [0, 0.32, 0.46, 0.95, 0.98, 1], repeat: Infinity, ease: "linear" as const },
  };
  const wood = "#b98a5a";

  const student = (cx: number, o: { skin: string; skinD: string; hair: string; shirt: string; long: boolean; tired: boolean; delay: number; pen: boolean }) => {
    const arm = (side: 1 | -1) => `M${cx + side * 15} 177 Q${cx + side * 21} 188 ${cx + side * 19} 196 L${cx + side * 10} 203`;
    return (
      <g>
        {/* chair back */}
        <rect x={cx - 26} y="160" width="52" height="50" rx="8" fill="#5e4029" />
        <rect x={cx - 26} y="160" width="52" height="3.5" rx="2" fill="#8f6742" />
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -0.9;0 0" dur="3.6s" begin={`${o.delay}s`} repeatCount="indefinite" />
          {/* torso with collar and soft shading */}
          <path d={`M${cx - 19} 204 Q${cx - 21.5} 183 ${cx - 13} 176 Q${cx - 8} 173 ${cx} 173 Q${cx + 8} 173 ${cx + 13} 176 Q${cx + 21.5} 183 ${cx + 19} 204 Z`} fill={o.shirt} />
          <path d={`M${cx - 19} 204 Q${cx - 21.5} 183 ${cx - 13} 176 L${cx - 9} 204 Z`} fill="#000" opacity="0.15" />
          {o.long ? (
            <path d={`M${cx - 6.5} 173 L${cx} 183 L${cx + 6.5} 173 Q${cx} 177 ${cx - 6.5} 173 Z`} fill="#f3ecdd" />
          ) : (
            <path d={`M${cx - 6.8} 173.4 Q${cx} 181 ${cx + 6.8} 173.4`} stroke="#000" strokeWidth="1.6" opacity="0.28" fill="none" />
          )}
          {/* arms resting on the desk */}
          <path d={arm(-1)} stroke={o.shirt} strokeWidth="6.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <ellipse cx={cx - 9.5} cy="203.5" rx="3.2" ry="2.5" fill={o.skin} />
          <path d={arm(1)} stroke={o.shirt} strokeWidth="6.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <g>
            <ellipse cx={cx + 9.5} cy="203.5" rx="3.2" ry="2.5" fill={o.skin} />
            <line x1={cx + 10} y1="203" x2={cx + 17} y2="196" stroke="#2a2f3a" strokeWidth="1.5" strokeLinecap="round" />
            <animateTransform attributeName="transform" type="translate" values="0 0;-2.6 0.8;0 0" dur={o.pen ? "0.7s" : "3.2s"} begin={`${o.delay}s`} repeatCount="indefinite" />
          </g>
          {/* head: tilts gently, eyes drift between paper and teacher */}
          <g>
            <animateTransform attributeName="transform" type="rotate" values={`-1.6 ${cx} 172;1.8 ${cx} 172;-1.6 ${cx} 172`} dur={o.tired ? "4.4s" : "6.2s"} begin={`${o.delay}s`} repeatCount="indefinite" />
            <path d={`M${cx - 3.6} 163 L${cx - 3.6} 174 Q${cx} 177 ${cx + 3.6} 174 L${cx + 3.6} 163 Z`} fill={o.skinD} />
            <circle cx={cx - 8.9} cy="153.4" r="1.9" fill={o.skinD} />
            <circle cx={cx + 8.9} cy="153.4" r="1.9" fill={o.skinD} />
            <path d={`M${cx - 8.8} 152 Q${cx - 9.2} 142.5 ${cx} 142 Q${cx + 9.2} 142.5 ${cx + 8.8} 152 Q${cx + 8.8} 161 ${cx + 5} 164.5 Q${cx} 167.8 ${cx - 5} 164.5 Q${cx - 8.8} 161 ${cx - 8.8} 152 Z`} fill={o.skin} />
            <path d={`M${cx + 2} 143 Q${cx + 9.2} 144 ${cx + 8.8} 152 Q${cx + 8.8} 161 ${cx + 5} 164.5 Q${cx + 7} 156 ${cx + 2} 143 Z`} fill="#000" opacity="0.07" />
            {/* hair */}
            {o.long ? (
              <g>
                <path d={`M${cx - 9.8} 152 Q${cx - 11.2} 138.6 ${cx} 139 Q${cx + 11.2} 138.6 ${cx + 9.8} 152 Q${cx + 6.5} 145 ${cx} 145.2 Q${cx - 6.5} 145 ${cx - 9.8} 152 Z`} fill={o.hair} />
                <path d={`M${cx - 9.8} 150 Q${cx - 12.8} 166 ${cx - 11.8} 181 L${cx - 7.6} 181 Q${cx - 8.8} 166 ${cx - 8.4} 153 Z`} fill={o.hair} />
                <path d={`M${cx + 9.8} 150 Q${cx + 12.8} 166 ${cx + 11.8} 181 L${cx + 7.6} 181 Q${cx + 8.8} 166 ${cx + 8.4} 153 Z`} fill={o.hair} />
                <path d={`M${cx - 4} 142 Q${cx} 140.6 ${cx + 4.4} 142.2`} stroke="#fff" strokeWidth="1" opacity="0.2" fill="none" strokeLinecap="round" />
              </g>
            ) : (
              <g>
                <path d={`M${cx - 9.6} 150 Q${cx - 10.8} 138.6 ${cx} 139.4 Q${cx + 10.8} 138.6 ${cx + 9.6} 150 Q${cx + 6.4} 144.4 ${cx + 1.4} 145.4 Q${cx - 4.2} 143.6 ${cx - 9.6} 150 Z`} fill={o.hair} />
                <path d={`M${cx - 6} 141 L${cx - 7} 137.8 M${cx - 1} 139.6 L${cx - 1.4} 136.4 M${cx + 4} 140 L${cx + 5.4} 137`} stroke={o.hair} strokeWidth="1.5" strokeLinecap="round" />
                <path d={`M${cx - 4} 141.6 Q${cx + 1} 140.4 ${cx + 5} 142`} stroke="#fff" strokeWidth="0.9" opacity="0.14" fill="none" strokeLinecap="round" />
              </g>
            )}
            {/* brows, eyes, nose, mouth, cheeks */}
            {[-1, 1].map((sd) => (
              <path key={sd} d={o.tired ? `M${cx + sd * 6.2} ${150.7 - sd * 0.4} Q${cx + sd * 4} 149.8 ${cx + sd * 1.9} ${151 + sd * 0.3}` : `M${cx + sd * 6.1} 150.6 Q${cx + sd * 4} 149.2 ${cx + sd * 1.9} 150.4`} stroke={o.hair} strokeWidth="1" fill="none" strokeLinecap="round" />
            ))}
            {[-3.9, 3.9].map((dx) => (
              <g key={dx}>
                <ellipse cx={cx + dx} cy="153.6" rx="2" ry="1.35" fill="#fff" />
                <ellipse cx={cx + dx} cy="153.6" rx="1" ry="1" fill="#2a1d16">
                  <animate attributeName="cx" values={`${cx + dx};${cx + dx - 0.8};${cx + dx - 0.8};${cx + dx}`} keyTimes="0;0.4;0.7;1" dur="6s" begin={`${o.delay}s`} repeatCount="indefinite" />
                  <animate attributeName="ry" values="1;1;0.1;1;1" keyTimes="0;0.9;0.94;0.98;1" dur="4.2s" begin={`${o.delay}s`} repeatCount="indefinite" />
                </ellipse>
                <path d={`M${cx + dx - 2.1} 152.7 Q${cx + dx} 151.8 ${cx + dx + 2.1} 152.7`} stroke="#3b2e29" strokeWidth="0.7" fill="none" />
                {o.tired && <path d={`M${cx + dx - 2.2} 155.4 Q${cx + dx} 156.7 ${cx + dx + 2.2} 155.4`} stroke="#8f5f3e" strokeWidth="0.8" fill="none" opacity="0.7" />}
              </g>
            ))}
            <path d={`M${cx} 154.6 Q${cx - 1.4} 158.2 ${cx + 0.6} 158.8`} stroke="#9a6a45" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <ellipse cx={cx - 5.6} cy="158.6" rx="2" ry="1.2" fill="#d9776a" opacity="0.2" />
            <ellipse cx={cx + 5.6} cy="158.6" rx="2" ry="1.2" fill="#d9776a" opacity="0.2" />
            <path d={o.tired ? `M${cx - 2.8} 162.2 Q${cx} 162.7 ${cx + 2.8} 162.1` : `M${cx - 3.2} 161.6 Q${cx} 164 ${cx + 3.2} 161.6 Q${cx} 162.6 ${cx - 3.2} 161.6 Z`} stroke="#a8453f" strokeWidth="1" fill={o.tired ? "none" : "#a8453f"} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
        {/* desk: lit top, wooden front, soft shadow */}
        <ellipse cx={cx} cy="246" rx="74" ry="5" fill="#000" opacity="0.3" />
        <rect x={cx - 66} y="196" width="132" height="20" rx="3" fill={wood} />
        <rect x={cx - 66} y="196" width="132" height="3" fill="#e0bd8c" />
        <rect x={cx - 66} y="216" width="132" height="28" fill="url(#ex-wood)" />
        <rect x={cx - 66} y="216" width="132" height="2" fill="#000" opacity="0.25" />
        <polygon points={`${cx - 33},213 ${cx + 35},213 ${cx + 29},200 ${cx - 27},200`} fill="#000" opacity="0.16" />
        <polygon points={`${cx - 34},212 ${cx + 34},212 ${cx + 28},199 ${cx - 28},199`} fill="#fbf8f0" stroke="#d9d0bd" strokeWidth="0.8" />
        {[0, 1, 2].map((k) => (
          <line key={k} x1={cx - 24 + k * 1.5} y1={202 + k * 3.4} x2={cx + 4 - k * 2} y2={202 + k * 3.4} stroke="#a9a193" strokeWidth="0.9" />
        ))}
        <motion.g {...grade}>
          <circle cx={cx + 15} cy="206" r="6.8" fill="none" stroke="#c0392b" strokeWidth="1.6" />
          <text x={cx + 15} y="209.6" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#c0392b">B+</text>
        </motion.g>
      </g>
    );
  };

  const A = 280, B = 480;
  const nodes: [number, number][] = [[-50, 10], [-24, -14], [-2, -24], [6, 8], [32, -12], [52, 10]];
  const links: [number, number][] = [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 5], [0, 3]];
  const cards: [number, number, number][] = [[-52, -8, -14], [-28, 8, 9], [-4, -14, -6], [18, 6, 12], [-36, 20, 4]];

  return (
    <Figure vb="0 0 640 280" caption="The grade is only a trace of what was learned. Two students can leave the same mark behind very different minds.">
      <defs>
        <linearGradient id="ex-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6ead2" />
          <stop offset="1" stopColor="#e9d4ad" />
        </linearGradient>
        <linearGradient id="ex-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c89c68" />
          <stop offset="1" stopColor="#8a6240" />
        </linearGradient>
        <linearGradient id="ex-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8f6742" />
          <stop offset="1" stopColor="#5e4029" />
        </linearGradient>
        <linearGradient id="ex-blazer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6a2f47" />
          <stop offset="0.5" stopColor="#8a4560" />
          <stop offset="1" stopColor="#6a2f47" />
        </linearGradient>
        <linearGradient id="ex-skirt" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#23272f" />
          <stop offset="0.5" stopColor="#3b414c" />
          <stop offset="1" stopColor="#23272f" />
        </linearGradient>
        <linearGradient id="ex-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6b88c" />
          <stop offset="1" stopColor="#c98f61" />
        </linearGradient>
        <linearGradient id="ex-hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5a463d" />
          <stop offset="1" stopColor="#2a211c" />
        </linearGradient>
        <linearGradient id="ex-ray" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff3c9" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff3c9" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* classroom */}
      <rect x="0" y="0" width="640" height="176" rx="18" fill="url(#ex-wall)" />
      <rect x="0" y="170" width="640" height="110" rx="18" fill="url(#ex-floor)" />
      <rect x="0" y="170" width="640" height="4" fill="#6e4b2f" opacity="0.5" />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <line key={k} x1="0" y1={186 + k * 18} x2="640" y2={186 + k * 18} stroke="#6e4b2f" strokeWidth="0.8" opacity="0.25" />
      ))}
      {/* window and sunlight */}
      <rect x="566" y="48" width="58" height="84" rx="4" fill="#cfe6ee" stroke="#e9dcc2" strokeWidth="4" />
      <line x1="595" y1="48" x2="595" y2="132" stroke="#e9dcc2" strokeWidth="3" />
      <line x1="566" y1="90" x2="624" y2="90" stroke="#e9dcc2" strokeWidth="3" />
      <polygon points="566,132 624,132 470,260 360,260" fill="url(#ex-ray)" />
      {/* board with chalk marks */}
      <rect x="168" y="48" width="104" height="52" rx="3" fill="#2f4a3f" stroke="#8b6a43" strokeWidth="3" opacity="0.0" />

      {/* step labels */}
      {[
        { x: 118, label: "1 · THE SAME GRADE", t: [0, 0.06, 0.28, 0.33] },
        { x: 320, label: "2 · ONLY A TRACE", t: [0.28, 0.36, 0.54, 0.6] },
        { x: 522, label: "3 · TWO DIFFERENT MINDS", t: [0.54, 0.62, 0.95, 1] },
      ].map((s) => (
        <motion.g key={s.label} animate={{ opacity: [0.3, 1, 1, 0.3] }} transition={{ duration: T, times: s.t, repeat: Infinity }}>
          <rect x={s.x - 98} y="10" width="196" height="22" rx="11" fill="#3a2a1a" opacity="0.62" />
          <text x={s.x} y="25" textAnchor="middle" fontSize="10.5" fontWeight="800" letterSpacing="1.5" fill="#fff">{s.label}</text>
        </motion.g>
      ))}

      {/* the teacher, marking */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -0.8;0 0" dur="3.8s" repeatCount="indefinite" />
        <ellipse cx="100" cy="237" rx="30" ry="4.6" fill="#000" opacity="0.3" />
        {/* legs in dark tights, court shoes */}
        <path d="M93 206 Q91.5 220 93.5 231" stroke="#262a33" strokeWidth="7.2" strokeLinecap="round" fill="none" />
        <path d="M107 206 Q108.5 220 106.5 231" stroke="#262a33" strokeWidth="7.2" strokeLinecap="round" fill="none" />
        <path d="M87.5 232 Q91 230 97 231.5 L97.5 235.5 L86.5 235.5 Z" fill="#15110e" />
        <path d="M112.5 232 Q109 230 103 231.5 L102.5 235.5 L113.5 235.5 Z" fill="#15110e" />
        {/* pencil skirt */}
        <path d="M83 160 Q80.5 184 85 208 Q100 211 115 208 Q119.5 184 117 160 Z" fill="url(#ex-skirt)" />
        <path d="M100 168 L100 208" stroke="#000" strokeWidth="0.8" opacity="0.18" />
        {/* tailored blazer with lapels and blouse */}
        <path d="M84 123 Q79.5 142 84.5 166 Q100 172 115.5 166 Q120.5 142 116 123 Q108 117 100 117 Q92 117 84 123 Z" fill="url(#ex-blazer)" />
        <path d="M92.5 117.5 L100 146 L107.5 117.5 Q100 121 92.5 117.5 Z" fill="#f3ecdd" />
        <path d="M92.5 117.5 L99 140 L88 131 Z" fill="#6a2f47" />
        <path d="M107.5 117.5 L101 140 L112 131 Z" fill="#6a2f47" />
        <path d="M100 146 L100 168" stroke="#4e2033" strokeWidth="1" opacity="0.7" />
        <circle cx="101.6" cy="152" r="1.2" fill="#d8b36a" />
        <circle cx="101.6" cy="160" r="1.2" fill="#d8b36a" />
        <path d="M84 123 Q79.5 142 84.5 166 L90 166 Q86 142 90 121 Z" fill="#000" opacity="0.14" />
        {/* left arm: clipboard held at the waist */}
        <path d="M84 125 Q78.5 142 80.5 152 Q82 166 92 171" stroke="#7a3b52" strokeWidth="7.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="88" y="157" width="20" height="26" rx="2" fill="#7f6140" />
        <rect x="90" y="160" width="16" height="21" fill="#fbf8f0" />
        <rect x="95" y="156" width="6" height="3.5" rx="1" fill="#b8bcc1" />
        {[0, 1, 2, 3].map((k) => (
          <line key={k} x1="92" y1={164 + k * 4} x2="104" y2={164 + k * 4} stroke="#a9a193" strokeWidth="0.8" />
        ))}
        <ellipse cx="92.5" cy="172.5" rx="3.2" ry="2.6" fill="#d9a679" />
        {/* right arm raised: red pen marks in the air */}
        <path d="M116 125 Q125.5 140 128 150" stroke="#7a3b52" strokeWidth="7.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <g>
          <path d="M128 150 Q131 150 134 142" stroke="#7a3b52" strokeWidth="7.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <ellipse cx="135.5" cy="138.5" rx="3.3" ry="3.8" fill="#d9a679" />
          <path d="M133 136.5 Q131.8 134.5 133.2 133.6" stroke="#d9a679" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <line x1="136" y1="139" x2="144.5" y2="124" stroke="#c0392b" strokeWidth="2.1" strokeLinecap="round" />
          <line x1="143.4" y1="126" x2="144.5" y2="124" stroke="#2a2f3a" strokeWidth="2.1" strokeLinecap="round" />
          <animateTransform attributeName="transform" type="rotate" values="0 128 150;-16 128 150;7 128 150;0 128 150" dur="2.6s" repeatCount="indefinite" />
        </g>
        {/* head: turns between the two papers */}
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-4 100 118;4 100 118;-4 100 118" dur="6.5s" repeatCount="indefinite" />
          <path d="M95.8 108 L95.8 119 Q100 123 104.2 119 L104.2 108 Z" fill="#c8915f" />
          <circle cx="91.8" cy="100" r="2.1" fill="#c8915f" />
          <circle cx="108.2" cy="100" r="2.1" fill="#c8915f" />
          <path d="M91 99 Q90.5 90.5 100 90 Q109.5 90.5 109 99 Q109 108 105 111.5 Q100 114.5 95 111.5 Q91 108 91 99 Z" fill="url(#ex-face)" />
          {/* hair swept back into a bun */}
          <path d="M90.4 99 Q88.6 86 100 86 Q111.4 86 109.6 99 Q106.5 91 100 91.2 Q93.5 91 90.4 99 Z" fill="url(#ex-hair)" />
          <circle cx="100" cy="82.6" r="5.6" fill="url(#ex-hair)" />
          <path d="M96.5 85.5 Q100 88 103.5 85.5" stroke="#2a211c" strokeWidth="0.8" fill="none" opacity="0.7" />
          <path d="M94 89 Q98 86.8 104 88" stroke="#fff" strokeWidth="1" opacity="0.16" fill="none" strokeLinecap="round" />
          {/* brows, eyes behind thin glasses, nose, lips */}
          {[-1, 1].map((sd) => (
            <path key={sd} d={`M${100 + sd * 6.6} 97.2 Q${100 + sd * 4.4} 95.8 ${100 + sd * 2.2} 97`} stroke="#3b2e29" strokeWidth="1" fill="none" strokeLinecap="round" />
          ))}
          {[-4.3, 4.3].map((dx) => (
            <g key={dx}>
              <ellipse cx={100 + dx} cy="100.4" rx="2.1" ry="1.45" fill="#fff" />
              <ellipse cx={100 + dx} cy="100.4" rx="1.05" ry="1.05" fill="#2a1d16">
                <animate attributeName="cx" values={`${100 + dx};${100 + dx + 0.9};${100 + dx - 0.9};${100 + dx}`} keyTimes="0;0.35;0.7;1" dur="6.5s" repeatCount="indefinite" />
                <animate attributeName="ry" values="1.05;1.05;0.1;1.05;1.05" keyTimes="0;0.88;0.92;0.96;1" dur="4.6s" repeatCount="indefinite" />
              </ellipse>
              <path d={`M${100 + dx - 2.2} 99.2 Q${100 + dx} 98.3 ${100 + dx + 2.2} 99.2`} stroke="#3b2e29" strokeWidth="0.7" fill="none" />
              <circle cx={100 + dx} cy="100.4" r="3.7" fill="#fff" opacity="0.1" stroke="#2a2f3a" strokeWidth="0.7" />
            </g>
          ))}
          <path d="M103.7 100.2 Q100 99 96.3 100.2" stroke="#2a2f3a" strokeWidth="0.7" fill="none" />
          <path d="M100 101.5 Q98.7 105 100.5 105.6" stroke="#a5724c" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          <ellipse cx="94.3" cy="105" rx="2.2" ry="1.3" fill="#d9776a" opacity="0.22" />
          <ellipse cx="105.7" cy="105" rx="2.2" ry="1.3" fill="#d9776a" opacity="0.22" />
          <path d="M96.8 108.4 Q100 110.2 103.2 108.4 Q100 109 96.8 108.4 Z" fill="#a8453f" stroke="#a8453f" strokeWidth="0.9" strokeLinejoin="round" />
        </g>
      </g>
      {/* the teacher's question */}
      <motion.g {...asking}>
        <circle cx="107" cy="84" r="3" fill={TEAL} />
        <circle cx="111" cy="77.5" r="4.5" fill={TEAL} />
        <ellipse cx="108" cy="52" rx="62" ry="22" fill={TEAL} stroke={TEAL_L} strokeWidth="2" strokeDasharray="5 5" />
        <text x="108" y="49" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">Same grade.</text>
        <text x="108" y="63" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">Same learning?</text>
      </motion.g>

      {/* hidden minds: unknown, then revealed */}
      {[A, B].map((cx) => (
        <motion.g key={cx} {...unknown}>
          <rect x={cx - 78} y="44" width="156" height="72" rx="18" fill="#ffffff" opacity="0.45" stroke={MUTED} strokeWidth="2" strokeDasharray="6 6" />
          <text x={cx} y="92" textAnchor="middle" fontSize="38" fontWeight="800" fill={MUTED} opacity="0.7">?</text>
        </motion.g>
      ))}

      {/* student A: understood */}
      {student(A, { skin: "#d9a679", skinD: "#c8915f", hair: "#2a1d16", shirt: "#2b7a8a", long: true, tired: false, delay: 0, pen: false })}
      {/* student B: crammed */}
      {student(B, { skin: "#c8915f", skinD: "#b07a4f", hair: "#3a2a1f", shirt: "#6e7f45", long: false, tired: true, delay: 1.1, pen: true })}

      {/* traces from each grade up to the mind behind it */}
      {[A, B].map((cx, i) => (
        <motion.path key={cx} d={`M${cx + 24} 196 C${cx + 74} 180 ${cx + 78} 142 ${cx + 62} 118`} fill="none"
          stroke={i ? AMBER : TEAL} strokeWidth="2.5" strokeDasharray="2 8" strokeLinecap="round" {...trace} />
      ))}

      {/* "=" between the two grades */}
      <motion.g {...same}>
        <text x="380" y="214" textAnchor="middle" fontSize="34" fontWeight="800" fill="#c0392b">=</text>
        <text x="380" y="234" textAnchor="middle" fontSize="10" fontWeight="800" letterSpacing="1.5" fill="#fff">SAME GRADE</text>
      </motion.g>

      {/* mind A: connected understanding */}
      <motion.g {...mind}>
        <rect x={A - 78} y="44" width="156" height="72" rx="18" fill="#e4f3f7" stroke={TEAL_L} strokeWidth="2" />
        <g transform={`translate(${A} 80)`}>
          {links.map(([a, b], k) => (
            <line key={k} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={TEAL} strokeWidth="1.6" strokeDasharray="4 4" opacity="0.8">
              <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.6s" repeatCount="indefinite" />
            </line>
          ))}
          {nodes.map(([x, y], k) => (
            <g key={k}>
              <circle cx={x} cy={y} r="8" fill={TEAL_L} opacity="0.35">
                <animate attributeName="r" values="5;10;5" dur={`${2.2 + k * 0.25}s`} begin={`${k * 0.2}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur={`${2.2 + k * 0.25}s`} begin={`${k * 0.2}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={x} cy={y} r="4.6" fill={TEAL} stroke="#fff" strokeWidth="1.2" />
            </g>
          ))}
        </g>
        <text x={A} y="130" textAnchor="middle" fontSize="10.5" fontWeight="800" letterSpacing="1.5" fill={TEAL}>UNDERSTOOD IT</text>
      </motion.g>

      {/* mind B: facts crammed at 2 a.m. */}
      <motion.g {...mind}>
        <rect x={B - 78} y="44" width="156" height="72" rx="18" fill="#fdf0d8" stroke={AMBER_L} strokeWidth="2" />
        <g transform={`translate(${B - 4} 80)`}>
          {cards.map(([x, y, r], k) => (
            <g key={k} transform={`translate(${x} ${y}) rotate(${r})`}>
              <animateTransform attributeName="transform" type="rotate" additive="sum" values={`0;${k % 2 ? 4 : -4};0`} dur={`${2.6 + k * 0.4}s`} repeatCount="indefinite" />
              <rect x="-11" y="-7" width="22" height="14" rx="2" fill="#fff" stroke={AMBER} strokeWidth="1.1" />
              <line x1="-7" y1="-2" x2="7" y2="-2" stroke="#c9b48c" strokeWidth="1" />
              <line x1="-7" y1="2" x2="3" y2="2" stroke="#c9b48c" strokeWidth="1" />
            </g>
          ))}
          <circle cx="50" cy="-12" r="9" fill="#f3c87a" />
          <circle cx="54" cy="-15" r="8" fill="#fdf0d8" />
          <text x="48" y="12" textAnchor="middle" fontSize="9" fontWeight="800" fill={AMBER}>2:00 AM</text>
        </g>
        <text x={B} y="130" textAnchor="middle" fontSize="10.5" fontWeight="800" letterSpacing="1.5" fill={AMBER}>MEMORISED IT</text>
      </motion.g>

      {/* readouts */}
      <rect x="0" y="248" width="640" height="32" rx="16" fill="#d9c8a6" />
      <text x="20" y="268" fontSize="11" fontWeight="800" letterSpacing="2" fill={AMBER}>SEEN · THE GRADE</text>
      <text x="620" y="268" textAnchor="end" fontSize="11" fontWeight="800" letterSpacing="2" fill={TEAL}>UNSEEN · WHAT WAS LEARNED</text>
    </Figure>
  );
}
