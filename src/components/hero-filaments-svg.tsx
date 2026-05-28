"use client";
import { useLayoutEffect, useRef, useState } from "react";

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
  const edgeRef = useRef<Float32Array | null>(null);
  const [layout, setLayout] = useState<{
    dLeft: number;
    dTop:  number;
    dh:    number;
    dW:    number;
    heroW: number;
    edgeByRow: Float32Array;
  } | null>(null);

  useLayoutEffect(() => {
    let stop = false;

    const measure = () => {
      const diamond = document.querySelector(
        ".hero-brand-group img:last-child",
      ) as HTMLImageElement | null;
      const hero = document.querySelector(".hero-section") as HTMLElement | null;
      if (!diamond || !hero || !edgeRef.current) return;

      const d = diamond.getBoundingClientRect();
      const h = hero.getBoundingClientRect();
      if (d.width === 0 || d.height === 0) return;

      setLayout({
        dLeft: d.left - h.left,
        dTop:  d.top  - h.top,
        dh:    d.height,
        dW:    d.width,
        heroW: h.width,
        edgeByRow: edgeRef.current,
      });
    };

    // Scan PNG once → build per-row right-edge fraction table
    const diamond = document.querySelector(
      ".hero-brand-group img:last-child",
    ) as HTMLImageElement | null;
    if (!diamond) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (stop) return;
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const px = ctx.getImageData(0, 0, c.width, c.height).data;
      const table = new Float32Array(c.height);
      for (let y = 0; y < c.height; y++) {
        let lastX = -1;
        const rowOffset = y * c.width * 4;
        for (let x = 0; x < c.width; x++) {
          if (px[rowOffset + x * 4 + 3] > 1) lastX = x;
        }
        table[y] = lastX === -1 ? -1 : lastX / c.width;
      }
      edgeRef.current = table;
      measure();
    };
    img.src = diamond.src;

    const hero = document.querySelector(".hero-section");
    const ro = new ResizeObserver(measure);
    if (hero) ro.observe(hero);

    return () => { stop = true; ro.disconnect(); };
  }, []);

  if (!layout) return null;

  const { dLeft, dTop, dh, dW, heroW, edgeByRow } = layout;

  /* ── Diamond edge by direct pixel lookup ────────────────────────────
     For any y_frac, find the rightmost non-transparent pixel in that
     row of the PNG and project it into hero-relative CSS pixels.
     Pixel-perfect at any viewport because dW scales with rendering.
  ─────────────────────────────────────────────────────────────────── */
  const diamondEdge = (yFrac: number) => {
    const rowIdx = Math.min(edgeByRow.length - 1, Math.max(0, Math.round(yFrac * edgeByRow.length)));
    const edgeFrac = edgeByRow[rowIdx];
    const x = edgeFrac < 0
      ? dLeft + dW / 2
      : dLeft + edgeFrac * dW;
    return { x, y: dTop + dh * yFrac };
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
