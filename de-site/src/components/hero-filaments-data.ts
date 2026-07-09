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

export type HeroSize = {
  heroW: number;
  heroH: number;
};

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

/** Measures `.hero-section` once on mount and on every resize, in CSS
    pixels — the ambient ombient cables are purely fractions of this size,
    so no icon/logo needs to exist in the DOM for them to render. */
export function useHeroSize(): HeroSize | null {
  const [size, setSize] = useState<HeroSize | null>(null);

  useLayoutEffect(() => {
    const hero = document.querySelector(".hero-section") as HTMLElement | null;
    if (!hero) return;

    const measure = () => {
      const h = hero.getBoundingClientRect();
      if (h.width === 0 || h.height === 0) return;
      setSize({ heroW: h.width, heroH: h.height });
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(hero);
    return () => ro.disconnect();
  }, []);

  return size;
}
