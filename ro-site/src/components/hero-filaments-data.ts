"use client";
import { useLayoutEffect, useRef, useState } from "react";

/* Trace-in timing — shared with anything that needs to sync its own entrance
   to a specific cable finishing its draw-in (e.g. hero text fading in once
   its anchor line arrives). */
export const TRACE_START   = 1.0;  // s after SVG mount — first cable begins (once the logo entrance settles)
export const TRACE_DUR     = 0.45; // s per cable
export const TRACE_STAGGER = 0.08; // s between cables

/** Multiplies every cable's stroke opacity (trunk + branches) — the fan reads
    as too dense at full strength, so everything is dimmed by the same factor
    rather than re-tuning each line's opacity by hand. */
export const OPACITY_SCALE = 0.55;

export type DiamondLayout = {
  dLeft: number;
  dTop: number;
  dh: number;
  dW: number;
  heroW: number;
  heroH: number;
  edgeByRow: Float32Array;
};

/** A single offshoot from a trunk's terminal point — same depart/bend/end
    shape as a cable's own 1st bend, just starting from the trunk's endpoint
    (the "hub") instead of the diamond edge. */
export type BranchSpec = {
  /** Horizontal pixels from the hub before the diagonal */
  depart: number;
  /** Diagonal — signed vertical (scaled by dh): + = down, − = up */
  bendDY: number;
  /** Hero-width fraction of this branch's own terminal */
  endXFrac: number;
  /** Stroke opacity for this branch — varies the fan's depth. Defaults to the trunk's opacity. */
  opacity?: number;
};

export type CableSpec = {
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
  /** Stroke opacity for the trunk. Defaults to 0.5 (the original constant). */
  opacity?: number;
  /** Offshoots from this cable's terminal — turns it from a single line into
      a branching circuit trace. Omit for a plain single line (e.g. the two
      hero text anchors, which must stay a single predictable line). */
  branches?: BranchSpec[];
};

/** The diamond-anchored filament fan — shared between the decorative SVG and
    any content that needs to line up with one of these cables (e.g. the hero
    text anchoring to "hero-line-7" / "hero-line-3"). Keep this list in sync
    with what HeroFilamentsSvg renders — it's the single source of truth for
    both. */
export const CABLE_SPECS: CableSpec[] = [
  // Linia 2 existed here (yFrac 0.52, right next to hero-line-7's anchor at
  // 0.44) and repeatedly caused problems: bending toward the title forces a
  // crossing with hero-line-7 (both are single-diagonal, rightward-only
  // paths — swapping their vertical order is mathematically guaranteed to
  // intersect somewhere), and its origin sits so close to the diamond's
  // widest point that almost any reach lands behind the text regardless of
  // bend direction. Rather than keep tuning coordinates blind across several
  // rounds without a way to verify the actual render, it's removed — the fan
  // still reads fine with hero-line-7/-5/-3/-9.
  {
    // Linia 7 — ANCORĂ pentru textul hero (hero-section.tsx). Nu se modifică forma —
    // titlul/butoanele sunt poziționate exact pe capătul acestei linii.
    id: "hero-line-7",
    yFrac: 0.44,
    depart: 55,
    bend1DY: -0.14,
    midXFrac: 0,
    bend2DY: 0,
    endXFrac: 0.58,
  },
  {
    // Linia 5 — axa centrală a evantaiului, aproape plată, cea mai scurtă.
    // Fără ramuri, pentru același motiv ca linia 2 — yFrac 0.65 e chiar sub titlu/butoane.
    id: "hero-line-5",
    yFrac: 0.65,
    depart: 60,
    bend1DY: -0.04,
    midXFrac: 0,
    bend2DY: 0,
    endXFrac: 0.28,
  },
  {
    // Linia 3 — ANCORĂ pentru statistici (hero-stats-strip prin hero-section.tsx).
    // Nu se modifică forma — banda de statistici e poziționată pe capătul acestei linii.
    id: "hero-line-3",
    yFrac: 0.78,
    depart: 60,
    bend1DY: 0.22,
    midXFrac: 0,
    bend2DY: 0,
    endXFrac: 0.44,
  },
  {
    // Linia 9 — o a doua "subliniere" sub statistici, imediat sub linia 3,
    // fără ramuri (simplă, ca linia 3) astfel încât să primească propriul
    // impuls de curent pornind chiar din logo, nu doar dintr-un nod la
    // jumătatea traseului.
    id: "hero-line-9",
    yFrac: 0.82,
    depart: 50,
    bend1DY: 0.44,
    midXFrac: 0,
    bend2DY: 0,
    endXFrac: 0.44,
  },
];

/** Measures the diamond icon + hero section once on mount and on every
    resize, in hero-relative pixels. Returns null until the diamond is
    actually visible (it's hidden below the 1500px breakpoint), which is
    also the natural signal for "the filament fan isn't shown here — fall
    back to normal document flow". */
export function useDiamondLayout(): DiamondLayout | null {
  const edgeRef = useRef<Float32Array | null>(null);
  const [layout, setLayout] = useState<DiamondLayout | null>(null);

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
      if (d.width === 0 || d.height === 0) {
        setLayout(null);
        return;
      }

      setLayout({
        dLeft: d.left - h.left,
        dTop: d.top - h.top,
        dh: d.height,
        dW: d.width,
        heroW: h.width,
        heroH: h.height,
        edgeByRow: edgeRef.current,
      });
    };

    // Scan the PNG once → build a per-row right-edge fraction table. Pixel-exact
    // (accounts for the icon's rounded corners / transparent margin) instead of
    // guessing at a padding constant.
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
    // The logo slides in via a CSS transform — getBoundingClientRect() during
    // that animation reports the mid-slide position. Re-measure once it's
    // done so anchors match the logo's final, resting spot.
    brandGroup?.addEventListener("animationend", measure);

    return () => {
      stop = true;
      ro.disconnect();
      brandGroup?.removeEventListener("animationend", measure);
    };
  }, []);

  return layout;
}

/** Diamond edge by direct pixel lookup — for any y_frac, find the rightmost
    non-transparent pixel in that row of the PNG and project it into
    hero-relative CSS pixels. */
export function diamondEdge(layout: DiamondLayout, yFrac: number) {
  const { dLeft, dTop, dh, dW, edgeByRow } = layout;
  const rowIdx = Math.min(edgeByRow.length - 1, Math.max(0, Math.round(yFrac * edgeByRow.length)));
  const edgeFrac = edgeByRow[rowIdx];
  const x = edgeFrac < 0 ? dLeft + dW / 2 : dLeft + edgeFrac * dW;
  return { x, y: dTop + dh * yFrac };
}

/** Build a cable path (1 or 2 bends) + terminal point, in hero-relative pixels.
    `vertices` (the bend points, purely for decorative via-pad markers) is
    additive metadata — it never affects `d`/endX/endY/startY, so it's safe
    even though this function's output also feeds useHeroCableAnchor. */
export function buildCable(layout: DiamondLayout, spec: CableSpec) {
  const { heroW, dh } = layout;
  const start = diamondEdge(layout, spec.yFrac);
  const ox = start.x;
  const sy = start.y;
  const tx = heroW * spec.endXFrac;

  const x1 = ox + spec.depart;
  const b1 = spec.bend1DY * dh;
  const x2 = x1 + Math.abs(b1);
  const y2 = sy + b1;

  if (!spec.midXFrac || spec.bend2DY === 0) {
    return {
      id: spec.id,
      d: `M ${ox} ${sy} H ${x1} L ${x2} ${y2} H ${tx}`,
      startY: sy,
      endX: tx,
      endY: y2,
      vertices: [{ x: x1, y: sy }, { x: x2, y: y2 }],
    };
  }

  const txMid = heroW * spec.midXFrac;
  const b2 = spec.bend2DY * dh;
  const x4 = txMid + Math.abs(b2);
  const y4 = y2 + b2;
  return {
    id: spec.id,
    d: `M ${ox} ${sy} H ${x1} L ${x2} ${y2} H ${txMid} L ${x4} ${y4} H ${tx}`,
    startY: sy,
    endX: tx,
    endY: y4,
    vertices: [{ x: x1, y: sy }, { x: x2, y: y2 }, { x: txMid, y: y2 }, { x: x4, y: y4 }],
  };
}

export type CableSegment = {
  id: string;
  d: string;
  endX: number;
  endY: number;
  /** True for a trunk that has branches — it's a junction, not a real
      terminal, so the renderer skips its destination dot/packet flow. */
  isJunction: boolean;
  opacity: number;
  /** Bend points along this segment, for the decorative via-pad markers. */
  vertices: { x: number; y: number }[];
};

/** Build a cable's full render list: the trunk segment, plus one segment per
    branch (each starting exactly at the trunk's terminal, so it reads as a
    split rather than a separate line). Use this for rendering; use
    buildCable directly when you only need the single trunk endpoint (e.g.
    the hero text anchors). */
export function buildCableSegments(layout: DiamondLayout, spec: CableSpec): CableSegment[] {
  const trunk = buildCable(layout, spec);
  const trunkOpacity = (spec.opacity ?? 0.5) * OPACITY_SCALE;
  const segments: CableSegment[] = [
    {
      id: spec.id,
      d: trunk.d,
      endX: trunk.endX,
      endY: trunk.endY,
      isJunction: !!spec.branches?.length,
      opacity: trunkOpacity,
      vertices: trunk.vertices,
    },
  ];

  const { dh, heroW } = layout;
  spec.branches?.forEach((b, i) => {
    const hubX = trunk.endX;
    const hubY = trunk.endY;
    const bx1 = hubX + b.depart;
    const bBend = b.bendDY * dh;
    const bx2 = bx1 + Math.abs(bBend);
    const by2 = hubY + bBend;
    const btx = heroW * b.endXFrac;
    segments.push({
      id: `${spec.id}-b${i}`,
      d: `M ${hubX} ${hubY} H ${bx1} L ${bx2} ${by2} H ${btx}`,
      endX: btx,
      endY: by2,
      isJunction: false,
      opacity: (b.opacity ?? trunkOpacity / OPACITY_SCALE) * OPACITY_SCALE,
      vertices: [{ x: bx1, y: hubY }, { x: bx2, y: by2 }],
    });
  });

  return segments;
}

/** Resolves the terminal point of one named cable in the diamond fan, in
    hero-relative pixels — use this to pin content (e.g. hero text) to a
    specific filament line so it tracks the line at any viewport size.
    Returns null when the fan isn't rendered (diamond hidden below 1500px). */
export function useHeroCableAnchor(id: string): { x: number; y: number; startY: number } | null {
  const layout = useDiamondLayout();
  if (!layout) return null;
  const spec = CABLE_SPECS.find((c) => c.id === id);
  if (!spec) return null;
  const built = buildCable(layout, spec);
  return { x: built.endX, y: built.endY, startY: built.startY };
}
