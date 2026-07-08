"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Three.js (~529 KB raw) stă într-un chunk separat și se descarcă doar
// când scena chiar se montează — niciodată la prefers-reduced-motion (unde
// scena oricum nu se construiește). Se montează la orice lățime, inclusiv
// mobil — hero-3d-canvas.tsx își adaptează deja fov/scală/poziția casei
// după raportul de aspect al propriului canvas (vezi bracket-ul aspect<1.1),
// iar pe mobil canvas-ul primește propria bandă dedicată (hero-section.tsx),
// nu overlay-ul full-bleed de pe desktop.
const Hero3DCanvas = dynamic(
  () => import("@/components/hero-3d-canvas").then((m) => m.Hero3DCanvas),
  { ssr: false },
);

export function Hero3DLazy() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return enabled ? <Hero3DCanvas /> : null;
}
