"use client";
import { useLayoutEffect, useState } from "react";

const DOT_RADIUS     = 4;
const ANIM_DURATION  = 5; // seconds for full path traversal
const DOTS_PER_LINE  = 3;

export function HeroFilamentsSvg() {
  const [layout, setLayout] = useState<{
    ox: number;
    dTop: number;
    dBot: number;
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
        ox:    d.right  - h.left,   // diamond right edge
        dTop:  d.top    - h.top,
        dBot:  d.bottom - h.top,
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

  const { ox, dTop, dBot, heroW } = layout;
  const dh = dBot - dTop;

  /* ─── LINE 1 ──────────────────────────────────────────────────────────
     Starts at the LOWER-RIGHT edge of the diamond.
     Path: short horizontal → 45° DOWN → long horizontal (below buttons)
           → diagonal UP into house upper-middle area.
  ─────────────────────────────────────────────────────────────────────── */
  const sy = dBot - dh * 0.06;       // very near bottom of diamond
  const tx = heroW * 0.72;           // end X (≈ inside-left of house)
  const ty = dTop - dh * 0.15;       // end Y (upper area, ≈ panel mid)

  const shortHoriz = 50;
  const dipAmount  = dh * 0.18;      // 45° dip below buttons

  const x1 = ox + shortHoriz;
  const x2 = x1 + dipAmount;
  const y2 = sy + dipAmount;         // long horizontal at this y
  const riseLen = y2 - ty;           // amount to rise to reach end y
  const x3 = tx - riseLen;           // start of rise (45°)

  const line1Path = `M ${ox} ${sy} H ${x1} L ${x2} ${y2} H ${x3} L ${tx} ${ty}`;

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
      {/* LINE 1 — cable trace */}
      <path
        id="hero-line-1"
        d={line1Path}
        fill="none"
        stroke="rgba(74,171,184,0.55)"
        strokeWidth={1.5}
      />

      {/* 3 amber current packets flowing along line 1 */}
      {Array.from({ length: DOTS_PER_LINE }, (_, i) => {
        const begin = `${-i * (ANIM_DURATION / DOTS_PER_LINE)}s`;
        return (
          <circle key={i} r={DOT_RADIUS} fill="#E8943A" opacity={0}>
            <animateMotion
              dur={`${ANIM_DURATION}s`}
              repeatCount="indefinite"
              begin={begin}
              rotate="auto"
            >
              <mpath href="#hero-line-1" />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.08;0.92;1"
              dur={`${ANIM_DURATION}s`}
              repeatCount="indefinite"
              begin={begin}
            />
          </circle>
        );
      })}
    </svg>
  );
}
