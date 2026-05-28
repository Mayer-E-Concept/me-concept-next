"use client";
import { useLayoutEffect, useState } from "react";
import type { PanelPos } from "@/components/hero-3d-canvas";

/* ── Cable path builder ───────────────────────────────────────────────────
   Each cable: short horizontal departure → gentle diagonal → long
   horizontal arrival (matches the user's sketch exactly).
──────────────────────────────────────────────────────────────────────── */
function buildPaths(
  ox: number,
  oys: number[],
  tx: number,
  tys: number[],
): string[] {
  const span     = Math.max(400, tx - ox);
  const departure = Math.min(90, span * 0.07);
  const diagLen   = Math.min(320, span * 0.22);

  return oys.map((sy, i) => {
    const ey = tys[i];
    const x1 = ox + departure;
    const x2 = x1 + diagLen;
    return `M ${ox} ${sy} H ${x1} L ${x2} ${ey} H ${tx}`;
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

      // 4 exit points spread top→bottom across diamond right edge
      const oys = [
        dtop + dh * 0.05,   // near top
        dcy  - dh * 0.18,   // upper-mid
        dcy  + dh * 0.18,   // lower-mid
        dbot - dh * 0.05,   // near bottom
      ];

      // 4 entry points fan OUT from the diamond center (~130% of dh)
      // Lines 0,1 go UP (above diamond center); lines 2,3 go DOWN.
      const tys = [
        dcy - dh * 0.65,
        dcy - dh * 0.30,
        dcy + dh * 0.30,
        dcy + dh * 0.65,
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
