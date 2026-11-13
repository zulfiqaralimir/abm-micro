"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { NarrationSection } from "@/lib/narration";

// Listen-to-the-chapter player. Uses the browser's built-in speech engine
// (no audio files, no external service), reading section by section.
const SPEEDS = [0.85, 1, 1.15, 1.3, 1.5];

const I = {
  play: <path d="M7 4.5v15l12-7.5-12-7.5Z" fill="currentColor" stroke="none" />,
  pause: <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" stroke="none" />,
  prev: <path d="M6 5v14M19 5l-9 7 9 7V5Z" />,
  next: <path d="M18 5v14M5 5l9 7-9 7V5Z" />,
  head: <path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v6H5a1 1 0 0 1-1-1v-5ZM20 14h-3v6h2a1 1 0 0 0 1-1v-5Z" />,
};
const Ic = ({ n, c = "h-5 w-5" }: { n: keyof typeof I; c?: string }) => (
  <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {I[n]}
  </svg>
);

export default function AudioPlayer({ sections }: { sections: NarrationSection[] }) {
  const [supported, setSupported] = useState(true);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [sec, setSec] = useState(0);
  const [rate, setRate] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState("");

  const token = useRef(0);
  const chunk = useRef(0);
  const state = useRef({ sec: 0, rate: 1, voiceURI: "" });
  state.current = { sec, rate, voiceURI };

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    const load = () => {
      const en = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
      en.sort((a, b) => Number(/natural|online/i.test(b.name)) - Number(/natural|online/i.test(a.name)));
      setVoices(en);
      setVoiceURI((cur) => {
        if (cur) return cur;
        try {
          const saved = window.localStorage.getItem("abm-micro:voice");
          if (saved && en.some((v) => v.voiceURI === saved)) return saved;
        } catch {}
        return en[0]?.voiceURI ?? "";
      });
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", load);
      token.current++;
      window.speechSynthesis.cancel();
    };
  }, []);

  const goTo = useCallback((id: string) => {
    if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const speak = useCallback(
    (s: number, c: number) => {
      const synth = window.speechSynthesis;
      const t = ++token.current;
      synth.cancel();
      const section = sections[s];
      if (!section) {
        setPlaying(false);
        return;
      }
      if (c === 0) goTo(section.id);
      setSec(s);
      chunk.current = c;
      const u = new SpeechSynthesisUtterance(section.chunks[c]);
      const v = synth.getVoices().find((x) => x.voiceURI === state.current.voiceURI);
      if (v) u.voice = v;
      u.rate = state.current.rate;
      u.onend = () => {
        if (token.current !== t) return;
        if (c + 1 < section.chunks.length) speak(s, c + 1);
        else if (s + 1 < sections.length) speak(s + 1, 0);
        else setPlaying(false);
      };
      u.onerror = () => {
        if (token.current === t) setPlaying(false);
      };
      synth.speak(u);
    },
    [sections, goTo]
  );

  const toggle = () => {
    if (playing) {
      token.current++;
      window.speechSynthesis.cancel();
      setPlaying(false);
    } else {
      setPlaying(true);
      speak(sec, chunk.current);
    }
  };
  const jump = (s: number) => {
    const n = Math.max(0, Math.min(sections.length - 1, s));
    chunk.current = 0;
    setSec(n);
    if (playing) speak(n, 0);
  };

  if (!supported || sections.length === 0) return null;

  const pct = ((sec + 1) / sections.length) * 100;

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-3">
      <AnimatePresence mode="wait" initial={false}>
        {!open ? (
          <motion.button
            key="fab"
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            whileHover={{ y: -3 }}
            className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-accent to-[#3a7488] py-3 pl-4 pr-6 text-sm font-bold text-white shadow-2xl shadow-accent/40"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <Ic n="head" />
              {playing && <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />}
            </span>
            Listen to this chapter
          </motion.button>
        ) : (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-[#10242c]/95 text-white shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            <div className="h-1 w-full bg-white/10">
              <motion.div className="h-full bg-gradient-to-r from-[#7fc0d3] to-[#f3c87a]" animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} />
            </div>
            <div className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
              <div className="flex items-center gap-1.5">
                <button type="button" aria-label="Previous section" onClick={() => jump(sec - 1)} className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white">
                  <Ic n="prev" />
                </button>
                <button
                  type="button"
                  aria-label={playing ? "Pause" : "Play"}
                  onClick={toggle}
                  className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f3c87a] to-assumption text-[#10242c] shadow-lg transition hover:scale-105"
                >
                  <Ic n={playing ? "pause" : "play"} c="h-6 w-6" />
                  {playing && <span className="absolute inset-0 animate-ping rounded-full bg-[#f3c87a]/40" />}
                </button>
                <button type="button" aria-label="Next section" onClick={() => jump(sec + 1)} className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white">
                  <Ic n="next" />
                </button>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#f3c87a]">
                  Section {sec + 1} of {sections.length}
                </p>
                <p className="truncate font-display text-base font-bold">{sections[sec].title}</p>
                {playing && (
                  <div className="mt-1 flex h-3 items-end gap-[3px]" aria-hidden="true">
                    {[0, 1, 2, 3, 4, 5, 6].map((b) => (
                      <motion.span
                        key={b}
                        className="w-[3px] rounded-full bg-[#7fc0d3]"
                        animate={{ height: ["25%", "100%", "40%"] }}
                        transition={{ duration: 0.8 + b * 0.07, repeat: Infinity, repeatType: "mirror" }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <select
                  aria-label="Speed"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white outline-none"
                >
                  {SPEEDS.map((s) => (
                    <option key={s} value={s} className="text-black">{s}×</option>
                  ))}
                </select>
                {voices.length > 1 && (
                  <select
                    aria-label="Voice"
                    value={voiceURI}
                    onChange={(e) => {
                      setVoiceURI(e.target.value);
                      try { window.localStorage.setItem("abm-micro:voice", e.target.value); } catch {}
                    }}
                    className="max-w-[9rem] truncate rounded-full border border-white/15 bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white outline-none"
                  >
                    {voices.map((v) => (
                      <option key={v.voiceURI} value={v.voiceURI} className="text-black">
                        {v.name.replace(/^Microsoft /, "")}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <button
                type="button"
                aria-label="Close player"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <span className="block text-lg leading-none">×</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
