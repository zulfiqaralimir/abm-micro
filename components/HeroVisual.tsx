"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import AgentHero from "./AgentHero";

const Market3D = dynamic(() => import("./Market3D"), { ssr: false, loading: () => null });

// 3D scene on capable desktop screens; the lightweight SVG everywhere else
// (small screens, reduced-motion, or no WebGL).
export default function HeroVisual() {
  const [use3d, setUse3d] = useState(false);

  useEffect(() => {
    try {
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const c = document.createElement("canvas");
      const gl = !!(c.getContext("webgl2") || c.getContext("webgl"));
      setUse3d(wide && !calm && gl);
    } catch {
      setUse3d(false);
    }
  }, []);

  if (use3d) {
    // Full-bleed behind the hero so agents roam the whole section instead of
    // sitting in a boxed window.
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)" }}
      >
        <Market3D />
      </div>
    );
  }
  return (
    <div className="float-slow relative z-10 mx-auto mt-10 aspect-[520/440] w-full max-w-sm px-6 lg:max-w-md">
      <AgentHero />
    </div>
  );
}
