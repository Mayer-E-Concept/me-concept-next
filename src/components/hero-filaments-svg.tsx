"use client";
import { useLayoutEffect, useRef, useState } from "react";

const DOT_RADIUS     = 3.5;
const ANIM_DURATION  = 5; // seconds per full path traversal
const DOTS_PER_LINE  = 3;
/* Trace-in: cables draw from their origin outward, staggered; terminals fade
   in as their cable completes, packets start flowing after. */
const TRACE_START   = 2.2;  // s after SVG mount — first cable begins (once the logo entrance settles)
const TRACE_DUR     = 0.9;  // s per cable
const TRACE_STAGGER = 0.25; // s between cables
const EDGE_STAGGER  = 0.4;  // s between the right-side ambient cables

type CableSpec = {
  id: string;
  /** Where on the diamond edge to anchor (0 = top vertex, 0.5 = right vertex, 1 = bottom vertex) */
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

/** Simple straight-line cables anchored to fixed points on the hero canvas
    (fractions of hero width/height) rather than to the diamond — used for the
    top-left corner fill-in and the right-edge ambient lines. Travel direction
    (left→right or right→left) is inferred from start vs. mid X. */
type FractionCableSpec = {
  id: string;
  yFrac: number;
  startXFrac: number;
  midXFrac: number;
  /** Signed vertical bend (scaled by hero height); 0 = stays flat */
  bendDY: number;
};

export function HeroFilamentsSvg() {
  // Static fallback: cabluri desenate complet, fara trasare/SMIL/pachete
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const edgeRef = useRef<Float32Array | null>(null);
  const [layout, setLayout] = useState<{
    dLeft: number;
    dTop:  number;
    dh:    number;
    dW:    number;
    heroW: number;
    heroH: number;
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
        heroH: h.height,
        edgeByRow: edgeRef.current,
      });
    };

    // Scan the PNG once → build a per-row right-edge fraction table. This is
    // pixel-exact (accounts for the icon's rounded corners and any transparent
    // margin baked into the file) instead of guessing at a padding constant.
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
    const brandGroup = document.querySelector(".hero-brand-group");
    const ro = new ResizeObserver(measure);
    if (hero) ro.observe(hero);
    // The logo slides in via a CSS transform (hero-logo-in) — getBoundingClientRect()
    // during that animation reports the mid-slide position, not where it settles.
    // Re-measure once it's done so cable anchors match the logo's final, resting spot.
    brandGroup?.addEventListener("animationend", measure);

    return () => {
      stop = true;
      ro.disconnect();
      brandGroup?.removeEventListener("animationend", measure);
    };
  }, []);

  if (!layout) return null;

  const { dLeft, dTop, dh, dW, heroW, heroH, edgeByRow } = layout;

  /* ── Diamond edge by direct pixel lookup ────────────────────────────
     For any y_frac, find the rightmost non-transparent pixel in that row of
     the PNG and project it into hero-relative CSS pixels — exact at any
     viewport because dW/dh scale with the rendered size. */
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

  // Only mild/no upward bends here — steep upward lines used to cross into the
  // "MAYER E-CONCEPT" text sitting above the diamond. Those now live in
  // topLeftCables instead, anchored well above the whole brand lockup.
  const cables: CableSpec[] = [
    {
      // Linia 2 — urcă moderat, un singur cot, terminal mediu
      id: "hero-line-2",
      yFrac:     0.52,   // ← poziție calibrată
      depart:    60,
      bend1DY:  -0.28,   // UP 30px → lane sus-mijloc
      midXFrac:  0,
      bend2DY:   0,
      endXFrac:  0.54,
    },
    {
      // Linia 7 — umple golul de deasupra liniei 2 (fostă linia 1, mutată din calea textului)
      id: "hero-line-7",
      yFrac:     0.44,
      depart:    55,
      bend1DY:  -0.14,
      midXFrac:  0,
      bend2DY:   0,
      endXFrac:  0.58,
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
      midXFrac:  0,
      bend2DY:   0,
      endXFrac:  0.44,
    },
    {
      // Linia 9 — coboară spre colțul stânga-jos, gol lăsat sub diamant;
      // un singur cot, apoi drept spre DREAPTA — endXFrac trebuie să rămână
      // clar peste punctul unde se termină diagonala, altfel segmentul "H"
      // se întoarce spre stânga în loc să continue spre dreapta.
      id: "hero-line-9",
      yFrac:     0.87,
      depart:    50,
      bend1DY:   0.65,
      midXFrac:  0,
      bend2DY:   0,
      endXFrac:  0.44,
    },
  ];

  const built = cables.map((spec, i) => ({
    ...buildCable(spec),
    start: TRACE_START + i * TRACE_STAGGER,
  }));

  /* ── Simple straight-line cables anchored by hero-relative fractions ──── */
  const buildFractionCable = (spec: FractionCableSpec) => {
    const sx = heroW * spec.startXFrac;
    const sy = heroH * spec.yFrac;
    const mx = heroW * spec.midXFrac;
    if (!spec.bendDY) {
      return { id: spec.id, d: `M ${sx} ${sy} H ${mx}`, endX: mx, endY: sy };
    }
    const dir = Math.sign(mx - sx) || 1;
    const dy = spec.bendDY * heroH;
    const x2 = mx + dir * Math.abs(dy);
    const y2 = sy + dy;
    return { id: spec.id, d: `M ${sx} ${sy} H ${mx} L ${x2} ${y2}`, endX: x2, endY: y2 };
  };

  // Top-left corner fill-in — replaces the old steep-upward diamond lines so
  // nothing ever crosses the "MAYER E-CONCEPT" text above the icon. Kept well
  // above the vertically-centered brand lockup (roughly the top ~20% of the
  // hero). Traced in with the same early group as the diamond cables.
  const topLeftCables: FractionCableSpec[] = [
    // yFrac kept below ~0.075 clears the fixed header (it sits on top of the
    // hero and was clipping this line's origin, making it look cut-off/tiny).
    { id: "hero-topleft-1", yFrac: 0.08, startXFrac: 0, midXFrac: 0.15, bendDY:  0.07 },
    { id: "hero-topleft-2", yFrac: 0.18, startXFrac: 0, midXFrac: 0.17, bendDY: -0.05 },
  ];
  const builtTopLeft = topLeftCables.map((spec, i) => ({
    ...buildFractionCable(spec),
    start: TRACE_START + (cables.length + i) * TRACE_STAGGER,
  }));

  // Right-edge ambient cables — deliberately irregular (varied Y spacing,
  // bend direction and length) rather than a mirrored/symmetric fan. Drift in
  // well after the left-side fan has finished.
  const rightEdgeCables: FractionCableSpec[] = [
    { id: "hero-edge-1", yFrac: 0.12, startXFrac: 1, midXFrac: 0.88, bendDY: -0.18 },
    { id: "hero-edge-2", yFrac: 0.40, startXFrac: 1, midXFrac: 0.90, bendDY:  0.07 },
    { id: "hero-edge-3", yFrac: 0.66, startXFrac: 1, midXFrac: 0.84, bendDY:  0 },
    // Shortened — the house rotates continuously and its silhouette swings
    // wide enough at some angles to reach this line if it runs any longer.
    { id: "hero-edge-4", yFrac: 0.89, startXFrac: 1, midXFrac: 0.95, bendDY: -0.10 },
  ];
  const RIGHT_TRACE_START = TRACE_START + (cables.length + topLeftCables.length) * TRACE_STAGGER + TRACE_DUR + 0.4;
  const builtRightEdge = rightEdgeCables.map((spec, i) => ({
    ...buildFractionCable(spec),
    start: RIGHT_TRACE_START + i * EDGE_STAGGER,
  }));

  const allBuilt = [...built, ...builtTopLeft, ...builtRightEdge];

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
      <style>{`
        @keyframes hf-trace { to { stroke-dashoffset: 0; } }
        @keyframes hf-fade  { to { opacity: 1; } }
      `}</style>

      {/* Cable traces — drawn in from their origin outward (static at reduced motion) */}
      {allBuilt.map((c) => (
        <path
          key={`p-${c.id}`}
          id={c.id}
          d={c.d}
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth={1.8}
          strokeLinejoin="miter"
          {...(!reduced && {
            pathLength: 1,
            strokeDasharray: 1,
            strokeDashoffset: 1,
            style: {
              animation: `hf-trace ${TRACE_DUR}s cubic-bezier(0.4,0,0.2,1) ${c.start.toFixed(2)}s forwards`,
            },
          })}
        />
      ))}

      {/* Destination terminals — fade in as their cable completes */}
      {allBuilt.map((c) => (
        <g
          key={`t-${c.id}`}
          style={
            reduced
              ? undefined
              : {
                  opacity: 0,
                  animation: `hf-fade 0.4s ease ${(c.start + TRACE_DUR - 0.15).toFixed(2)}s forwards`,
                }
          }
        >
          {!reduced && (
            <circle cx={c.endX} cy={c.endY} r={3} fill="none" stroke="#C5895B" strokeWidth={1.0}>
              <animate attributeName="r"       values="3;8;3"       dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.50;0;0.50" dur="2.4s" repeatCount="indefinite" />
            </circle>
          )}
          <circle cx={c.endX} cy={c.endY} r={3} fill="#C5895B" opacity={0.60} />
        </g>
      ))}

      {/* Current packets — start flowing only after their cable is traced */}
      {!reduced && allBuilt.map((c) =>
        Array.from({ length: DOTS_PER_LINE }, (_, i) => {
          const begin = `${(c.start + TRACE_DUR + i * (ANIM_DURATION / DOTS_PER_LINE)).toFixed(2)}s`;
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
