"use client";
import { useLayoutEffect, useState } from "react";

/* Trace-in timing — shared with anything that needs to sync its own entrance
   to the ambient cables drawing in. */
export const TRACE_START   = 0.4;  // s after SVG mount — first cable begins
export const TRACE_DUR     = 0.45; // s per cable
export const TRACE_STAGGER = 0.08; // s between cables

/** Multiplies every cable's stroke opacity (trunk + branches) — the fan reads
    as too dense at full strength, so everything is dimmed by the same factor
    rather than re-tuning each line's opacity by hand. */
export const OPACITY_SCALE = 0.55;

/** Full section size PLUS the icon/text/house box's actual on-screen rect
    and zoom factor. The box is scaled by min(width-ratio, height-ratio) —
    so it's letterboxed on exactly one axis whenever the viewport isn't
    precisely 16:9, and boxLeft/boxTop capture how far that letterboxing has
    pushed the box away from the section's true edge on that axis. Lines
    need this to reach the TRUE edge on their own (rather than living inside
    the box and drifting away from the edge along with it), while still
    staying correctly positioned relative to the box itself. */
export type HeroLayout = {
  sectionW: number;
  sectionH: number;
  boxLeft: number;
  boxTop: number;
  boxW: number;
  boxH: number;
  zoom: number;
};

export function useHeroLayout(designW: number, designH: number): HeroLayout | null {
  const [layout, setLayout] = useState<HeroLayout | null>(null);

  useLayoutEffect(() => {
    const section = document.querySelector(".hero-section") as HTMLElement | null;
    const box = document.querySelector(".hero-canvas") as HTMLElement | null;
    if (!section || !box) return;

    const measure = () => {
      const s = section.getBoundingClientRect();
      const b = box.getBoundingClientRect();
      if (s.width === 0 || b.width === 0) return;
      setLayout({
        sectionW: s.width,
        sectionH: s.height,
        boxLeft: b.left - s.left,
        boxTop: b.top - s.top,
        boxW: b.width,
        boxH: b.height,
        zoom: b.width / designW,
      });
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(section);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [designW, designH]);

  return layout;
}

/** A single offshoot from a trunk's terminal point — same depart/bend/end
    shape as a cable's own 1st bend, just starting from the trunk's endpoint
    (the "hub") instead of a fixed origin. */
export type BranchSpec = {
  /** Horizontal pixels from the hub before the diagonal */
  depart: number;
  /** Diagonal — signed vertical (scaled by hero height); + = down, − = up */
  bendDY: number;
  /** Hero-width fraction of this branch's own terminal */
  endXFrac: number;
  /** Stroke opacity for this branch — varies the fan's depth. Defaults to the trunk's opacity. */
  opacity?: number;
};

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
