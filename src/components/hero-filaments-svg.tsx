"use client";
import { useLayoutEffect, useState } from "react";
import type { PanelPos } from "@/components/hero-3d-canvas";

/* ── PCB-trace path builder ───────────────────────────────────────────────
   Each cable: horizontal → single 45° diagonal → arrives at panel entry.
   Cable 4 (bottom): 45° dip down → long horizontal → 45° rise.
──────────────────────────────────────────────────────────────────────── */
function buildPaths(
  ox: number,
  oys: number[],
  tx: number,
  tys: number[],
): string[] {
  return oys.map((sy, i) => {
    const ey = tys[i];

    if (i < 3) {
      const dy    = ey - sy;
      const bendX = Math.max(ox + 60, tx - Math.abs(dy));
      return `M ${ox} ${sy} H ${bendX} L ${tx} ${ey}`;
    }

    // Cable 4: 45° down → long horizontal → 45° rise to entry
    const dipLen  = Math.max(50, Math.abs(ey - sy) * 0.55);
    const dipX    = ox + dipLen;
    const dipY    = sy + dipLen;
    const riseLen = Math.max(20, dipY - ey);
    const riseX   = Math.max(dipX + 40, tx - riseLen);
    return `M ${ox} ${sy} L ${dipX} ${dipY} H ${riseX} L ${tx} ${ey}`;
  });
}

export function HeroFilamentsSvg({ panelPos }: { panelPos: PanelPos | null }) {
  const [layout, setLayout] = useState<{
    ox: number; oys: number[]; tx: number; tys: number[];
  } | null>(null);

  useLayoutEffect(() => {
    const compute = () => {
      const diamond = document.querySelector(
        ".hero-brand-group img:last-child",
      ) as HTMLElement | null;
      const hero = document.querySelector(".hero-section") as HTMLElement | null;

      if (!diamond || !hero || !panelPos) { setLayout(null); return; }

      const dRect = diamond.getBoundingClientRect();
      const hRect = hero.getBoundingClientRect();

      if (dRect.width === 0 || dRect.height === 0) { setLayout(null); return; }

      const ox   = dRect.right  - hRect.left;
      const dtop = dRect.top    - hRect.top;
      const dbot = dRect.bottom - hRect.top;
      const dh   = dbot - dtop;
      const dcy  = dtop + dh / 2;

      // 4 exit points spread across diamond height
      const oys = [
        dtop + dh * 0.05,
        dcy  + dh * 0.18,
        dcy  - dh * 0.18,
        dbot - dh * 0.05,
      ];

      // 4 entry points spread across panel face
      const tys = [
        panelPos.y - panelPos.halfH * 0.65,
        panelPos.y - panelPos.halfH * 0.22,
        panelPos.y + panelPos.halfH * 0.22,
        panelPos.y + panelPos.halfH * 0.65,
      ];

      setLayout({ ox, oys, tx: panelPos.x, tys });
    };

    compute();
    const ro = new ResizeObserver(compute);
    const hero = document.querySelector(".hero-section");
    if (hero) ro.observe(hero);
    return () => ro.disconnect();
  }, [panelPos]);

  if (!layout) return null;

  const paths = buildPaths(layout.ox, layout.oys, layout.tx, layout.tys);

  // Stagger phases so packets don't all move in sync
  const durations = [5.4, 4.7, 4.1, 6.0];
  const delays    = [0, -1.4, -0.7, -2.1];

  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 3,
        overflow: "visible",
      }}
    >
      <defs>
        <style>{`
          @keyframes hero-wire-flow {
            to { stroke-dashoffset: -260; }
          }
        `}</style>
      </defs>

      {paths.map((d, i) => (
        <g key={i}>
          {/* Static cable trace */}
          <path
            d={d}
            fill="none"
            stroke="rgba(74,171,184,0.38)"
            strokeWidth={1.5}
          />
          {/* Animated current packet */}
          <path
            d={d}
            fill="none"
            stroke="#C5895B"
            strokeWidth={3}
            strokeLinecap="round"
            opacity={0.90}
            strokeDasharray="18 260"
            strokeDashoffset={0}
            style={{
              animation: `hero-wire-flow ${durations[i]}s linear infinite`,
              animationDelay: `${delays[i]}s`,
            }}
          />
        </g>
      ))}
    </svg>
  );
}
