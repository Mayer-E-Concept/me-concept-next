"use client";
import { useLayoutEffect, useState } from "react";

const DOT_RADIUS     = 4;
const ANIM_DURATION  = 5; // seconds per full path traversal
const DOTS_PER_LINE  = 3;

type CableSpec = {
  id: string;
  /** Where on the diamond edge to anchor (0 = top, 0.5 = right apex, 1 = bottom) */
  yFrac: number;
  /** Length of the short horizontal departure from the diamond */
  shortHoriz: number;
  /** Signed vertical offset for the 45° bend: + = down, − = up */
  bendDY: number;
  /** Fraction of hero width where the line terminates */
  endXFrac: number;
};

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
     The brand mark is a CHAMFERED rotated square: linear slopes near
     the top/bottom corners, but the right side is flat in the middle
     (rounded chamfer). Model: linear offset capped at a flat-side max.

       slope     = dh * 0.38   (fits line 1 at y_frac=0.85 → x=238)
       flat side = dh * 0.25   (chamfered right side; fits line 2 at 0.65)
  ─────────────────────────────────────────────────────────────────── */
  const SLOPE_HALF_DIAG = dh * 0.38;
  const FLAT_SIDE_MAX   = dh * 0.25;
  const diamondEdge = (yFrac: number) => {
    const yDist01 = Math.abs(yFrac - 0.5) * 2;
    const slopeOffset = SLOPE_HALF_DIAG * Math.max(0, 1 - yDist01);
    const offset = Math.min(slopeOffset, FLAT_SIDE_MAX);
    return {
      x: dCenterX + offset,
      y: dTop + dh * yFrac,
    };
  };

  /* ── Build a single cable path + its terminal point ─────────────── */
  const buildCable = (spec: CableSpec) => {
    const start = diamondEdge(spec.yFrac);
    const ox = start.x;
    const sy = start.y;
    const tx = heroW * spec.endXFrac;

    const x1 = ox + spec.shortHoriz;
    const x2 = x1 + Math.abs(spec.bendDY);
    const y2 = sy + spec.bendDY;

    const d = `M ${ox} ${sy} H ${x1} L ${x2} ${y2} H ${tx}`;
    return { id: spec.id, d, endX: tx, endY: y2 };
  };

  const cables: CableSpec[] = [
    {
      // Line 1 — exits lower-right slope, dips below the CTAs
      id: "hero-line-1",
      yFrac:      0.85,
      shortHoriz: 165,
      bendDY:     dh * 0.20,    // 45° down
      endXFrac:   0.54,
    },
    {
      // Line 2 — exits a bit higher on the diamond, climbs above the buttons
      id: "hero-line-2",
      yFrac:      0.65,
      shortHoriz: 165,
      bendDY:     -dh * 0.30,   // 45° up (negative → going up)
      endXFrac:   0.48,
    },
  ];

  const built = cables.map(buildCable);

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
      {/* Cable traces */}
      {built.map((c) => (
        <path
          key={`p-${c.id}`}
          id={c.id}
          d={c.d}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth={1.75}
          strokeLinejoin="miter"
        />
      ))}

      {/* Destination terminals — solid dot + pulsing halo */}
      {built.map((c) => (
        <g key={`t-${c.id}`}>
          <circle cx={c.endX} cy={c.endY} r={6} fill="none" stroke="#C5895B" strokeWidth={1.5}>
            <animate attributeName="r"       values="6;15;6"      dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.85;0;0.85" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx={c.endX} cy={c.endY} r={5.5} fill="#C5895B" opacity={0.95} />
        </g>
      ))}

      {/* Current packets flowing along each cable */}
      {built.map((c) =>
        Array.from({ length: DOTS_PER_LINE }, (_, i) => {
          const begin = `${-i * (ANIM_DURATION / DOTS_PER_LINE)}s`;
          return (
            <circle key={`${c.id}-d${i}`} r={DOT_RADIUS} fill="#E8943A" opacity={0}>
              <animateMotion
                dur={`${ANIM_DURATION}s`}
                repeatCount="indefinite"
                begin={begin}
                rotate="auto"
              >
                <mpath href={`#${c.id}`} />
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
        })
      )}
    </svg>
  );
}
