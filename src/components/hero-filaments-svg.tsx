"use client";
import { useLayoutEffect, useState } from "react";

const DOT_RADIUS     = 4;
const ANIM_DURATION  = 5; // seconds for full path traversal
const DOTS_PER_LINE  = 3;

export function HeroFilamentsSvg() {
  const [layout, setLayout] = useState<{
    dCenterX: number;
    dTop: number;
    dBot: number;
    dh: number;
    dW: number;
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
        dCenterX: (d.left + d.right) / 2 - h.left,
        dTop:     d.top    - h.top,
        dBot:     d.bottom - h.top,
        dh:       d.height,
        dW:       d.width,
        heroW:    h.width,
      });
    };

    compute();
    const ro = new ResizeObserver(compute);
    const hero = document.querySelector(".hero-section");
    if (hero) ro.observe(hero);
    return () => ro.disconnect();
  }, []);

  if (!layout) return null;

  const { dCenterX, dTop, dh, dW, heroW } = layout;

  /* ── Diamond geometry ────────────────────────────────────────────────
     The brand mark fills the image bounding box (310×224 in display);
     model the visible chamfered outline as an ellipse whose horizontal
     radius matches the image WIDTH (not height).
       x_edge(y) = dCenterX + (dW/2) * sqrt(1 - yDist01²)
  ─────────────────────────────────────────────────────────────────── */
  const diamondEdge = (yFrac: number) => {
    const yDist01 = Math.abs(yFrac - 0.5) * 2;
    const widthFactor = Math.sqrt(Math.max(0, 1 - yDist01 * yDist01));
    return {
      x: dCenterX + (dW / 2) * widthFactor,
      y: dTop + dh * yFrac,
    };
  };

  /* ─── LINE 1 ──────────────────────────────────────────────────────────
     Starts on the lower-right slope of the diamond (closer to right apex).
     Path: short horizontal → 45° DOWN → long horizontal → 45° UP into house.
  ─────────────────────────────────────────────────────────────────────── */
  const LINE1_Y_FRAC = 0.85;
  const start1 = diamondEdge(LINE1_Y_FRAC);
  const ox = start1.x;
  const sy = start1.y;

  const tx = heroW * 0.72;            // end X (line terminates here, no rise)

  const shortHoriz = 165;
  const dipAmount  = dh * 0.20;       // diagonal down — half of previous length

  const x1 = ox + shortHoriz;
  const x2 = x1 + dipAmount;
  const y2 = sy + dipAmount;

  // Line 1: short horizontal → 45° down → long horizontal (no rise into house)
  const line1Path = `M ${ox} ${sy} H ${x1} L ${x2} ${y2} H ${tx}`;

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
        stroke="rgba(120,200,215,0.75)"
        strokeWidth={1.75}
        strokeLinejoin="miter"
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
