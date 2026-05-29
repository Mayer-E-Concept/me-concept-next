"use client";
import { useLayoutEffect, useRef, useState } from "react";

const DOT_RADIUS     = 4;
const ANIM_DURATION  = 5; // seconds per full path traversal
const DOTS_PER_LINE  = 3;

type CableSpec = {
  id: string;
  /** Where on the diamond edge to anchor (0 = top, 0.5 = right apex, 1 = bottom) — calibrate here */
  yFrac: number;
  /** Horizontal pixels from diamond edge before first diagonal */
  depart: number;
  /** First diagonal — signed vertical (scaled by dh): + = down, − = up */
  bend1DY: number;
  /** Hero-width fraction where middle horizontal ends (before 2nd bend); 0 = skip 2nd bend */
  midXFrac: number;
  /** Second diagonal — signed vertical (scaled by dh); 0 = no 2nd bend */
  bend2DY: number;
  /** Hero-width fraction of terminal dot */
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

  /* ── Build cable path (1 or 2 bends) + terminal point ──────────── */
  const buildCable = (spec: CableSpec) => {
    const start = diamondEdge(spec.yFrac);
    const ox = start.x;
    const sy = start.y;
    const tx  = heroW * spec.endXFrac;

    // Departure + first diagonal (45°: ΔX = |ΔY|)
    const x1 = ox + spec.depart;
    const b1 = spec.bend1DY * dh;
    const x2 = x1 + Math.abs(b1);
    const y2 = sy + b1;

    if (!spec.midXFrac || spec.bend2DY === 0) {
      // Single-bend path: departure → diagonal → horizontal to terminal
      return { id: spec.id, d: `M ${ox} ${sy} H ${x1} L ${x2} ${y2} H ${tx}`, endX: tx, endY: y2 };
    }

    // Two-bend path: departure → diag1 → horiz → diag2 → horiz to terminal
    const txMid = heroW * spec.midXFrac;
    const b2    = spec.bend2DY * dh;
    const x4    = txMid + Math.abs(b2);
    const y4    = y2 + b2;
    return { id: spec.id, d: `M ${ox} ${sy} H ${x1} L ${x2} ${y2} H ${txMid} L ${x4} ${y4} H ${tx}`, endX: tx, endY: y4 };
  };

  const cables: CableSpec[] = [
    {
      // Linia 1 — urcă abrupt din sfertul superior, step mic jos, terminal scurt
      id: "hero-line-1",
      yFrac:     0.35,   // ← poziție calibrată, nu modifica
      depart:    60,
      bend1DY:  -0.62,   // UP 67px → lane sus
      midXFrac:  0.30,
      bend2DY:   0.08,   // step mic jos (2px) — rămâne bine deasupra liniei 2
      endXFrac:  0.42,
    },
    {
      // Linia 2 — urcă moderat, un singur cot, terminal mediu
      id: "hero-line-2",
      yFrac:     0.52,   // ← poziție calibrată
      depart:    60,
      bend1DY:  -0.28,   // UP 30px → lane sus-mijloc
      midXFrac:  0,      // fără al doilea bend
      bend2DY:   0,
      endXFrac:  0.54,
    },
    {
      // Linia 5 — axa centrală a evantaiului, aproape plată, cea mai scurtă
      id: "hero-line-5",
      yFrac:     0.65,   // ← mijlocul dintre liniile 2 (0.52) și 3 (0.78)
      depart:    60,
      bend1DY:  -0.04,   // aproape orizontală, ușor ascendentă (4px)
      midXFrac:  0,
      bend2DY:   0,
      endXFrac:  0.28,   // cea mai scurtă dintre toate
    },
    {
      // Linia 3 — coboară moderat, terminal trece 2-3cm de butonul outline
      id: "hero-line-3",
      yFrac:     0.78,   // ← poziție calibrată
      depart:    60,
      bend1DY:   0.22,   // DOWN 24px → lane jos-mijloc
      midXFrac:  0,      // fără al doilea bend
      bend2DY:   0,
      endXFrac:  0.44,
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
