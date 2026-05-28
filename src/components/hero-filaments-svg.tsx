"use client";
import { useLayoutEffect, useState } from "react";

const NUM_LINES      = 4;
const LINE_GAP       = 18;
const DOTS_PER_LINE  = 4;
const ANIM_DURATION  = 4; // seconds
const DOT_RADIUS     = 3.5;

export function HeroFilamentsSvg() {
  const [layout, setLayout] = useState<{
    cx: number;
    cy: number;
    heroW: number;
  } | null>(null);

  useLayoutEffect(() => {
    const compute = () => {
      const diamond = document.querySelector(
        ".hero-brand-group img:last-child",
      ) as HTMLElement | null;
      const hero = document.querySelector(".hero-section") as HTMLElement | null;
      if (!diamond || !hero) { setLayout(null); return; }

      const d = diamond.getBoundingClientRect();
      const h = hero.getBoundingClientRect();
      if (d.width === 0 || d.height === 0) { setLayout(null); return; }

      setLayout({
        cx:    (d.left + d.right) / 2 - h.left,
        cy:    (d.top  + d.bottom) / 2 - h.top,
        heroW: h.width,
      });
    };

    compute();
    const ro = new ResizeObserver(compute);
    const hero = document.querySelector(".hero-section");
    if (hero) ro.observe(hero);
    return () => ro.disconnect();
  }, []);

  if (!layout) return null;

  const totalH = (NUM_LINES - 1) * LINE_GAP;
  const startY = layout.cy - totalH / 2;
  const lineYs = Array.from({ length: NUM_LINES }, (_, i) => startY + i * LINE_GAP);

  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <defs>
        <style>{`
          @keyframes hero-dot-move {
            0%   { transform: translateX(0);    opacity: 0; }
            10%  {                              opacity: 1; }
            90%  {                              opacity: 1; }
            100% { transform: translateX(80vw); opacity: 0; }
          }
        `}</style>
      </defs>

      {lineYs.map((y, lineIdx) => (
        <g key={lineIdx}>
          {/* Subtle white guideline from logo centre to hero right edge */}
          <line
            x1={layout.cx}
            y1={y}
            x2={layout.heroW}
            y2={y}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={1}
          />

          {/* Animated amber packets travelling from logo to the right */}
          {Array.from({ length: DOTS_PER_LINE }, (_, dotIdx) => {
            // Stagger dots within line; offset whole line per spec (0,1,2,3 s).
            // Negative delay so all dots are visible from page load.
            const stagger = dotIdx * (ANIM_DURATION / DOTS_PER_LINE);
            const delay   = -(lineIdx + stagger);
            return (
              <circle
                key={dotIdx}
                cx={layout.cx}
                cy={y}
                r={DOT_RADIUS}
                fill="#E8943A"
                style={{
                  animation:      `hero-dot-move ${ANIM_DURATION}s linear infinite`,
                  animationDelay: `${delay}s`,
                  willChange:     "transform, opacity",
                }}
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}
