"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Three.js (~529 KB raw) stă într-un chunk separat și se descarcă doar
// când scena chiar se montează — niciodată pe mobil (<768px, unde
// canvas-ul e ascuns din CSS) și niciodată la prefers-reduced-motion
// (unde scena oricum nu se construiește).
const Hero3DCanvas = dynamic(
  () => import("@/components/hero-3d-canvas").then((m) => m.Hero3DCanvas),
  { ssr: false },
);

export function Hero3DLazy() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => {
      if (
        mq.matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setEnabled(true);
      }
    };
    update();
    // Fereastră lărgită ulterior peste 768px → montează atunci
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return enabled ? <Hero3DCanvas /> : null;
}
