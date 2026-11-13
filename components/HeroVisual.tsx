"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import AgentHero from "./AgentHero";

const Market3D = dynamic(() => import("./Market3D"), { ssr: false, loading: () => <AgentHero /> });

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

  return use3d ? <Market3D /> : <AgentHero />;
}
