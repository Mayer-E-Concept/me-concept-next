"use client";
import { useState } from "react";

/* Small decorative circuit-line accents for hero widths below 1500px, where
   the desktop diamond fan (HeroFilamentsSvg) can't render at all — it
   measures a large image (.hero-brand-group) that's hidden entirely on
   these layouts. Rather than trying to scale that per-row-pixel-scanned,
   text-anchored system down, these are purpose-built, much simpler fixed
   line sets — deliberately NOT wired into useHeroCableAnchor, so they can't
   change how the heading/buttons/stats are positioned at these widths.
   Same visual language (via-pads, sparse amber pulse) as the desktop
   version, at a fraction of the complexity since there's no diamond edge to
   track and no text-collision tuning needed (kept in the left gutter/behind
   the text at low opacity, like the desktop watermark). */

type CompactLine = {
  id: string;
  d: string;
  vertices: [number, number][];
  opacity: number;
  pulse?: boolean;
  delay: number;
};

const TRACE_DUR = 0.5;
const PULSE_LEN = 0.08;
const ANIM_DURATION = 5;

function LineFan({
  lines,
  viewBox,
  className,
  keyPrefix,
}: {
  lines: CompactLine[];
  viewBox: string;
  className: string;
  keyPrefix: string;
}) {
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  return (
    <svg
      aria-hidden
      viewBox={viewBox}
      className={className}
      style={{ position: "absolute", overflow: "visible", pointerEvents: "none" }}
    >
      <style>{`
        @keyframes ${keyPrefix}-trace { to { stroke-dashoffset: 0; } }
        @keyframes ${keyPrefix}-fade  { to { opacity: 1; } }
      `}</style>

      {lines.map((l) => (
        <path
          key={`p-${l.id}`}
          d={l.d}
          fill="none"
          stroke={`rgba(255,255,255,${l.opacity})`}
          strokeWidth={1.3}
          {...(!reduced && {
            pathLength: 1,
            strokeDasharray: 1,
            strokeDashoffset: 1,
            style: { animation: `${keyPrefix}-trace ${TRACE_DUR}s cubic-bezier(0.4,0,0.2,1) ${l.delay.toFixed(2)}s forwards` },
          })}
        />
      ))}

      {lines.flatMap((l) => {
        const fadeAt = (l.delay + TRACE_DUR - 0.1).toFixed(2);
        const style = reduced ? undefined : { opacity: 0, animation: `${keyPrefix}-fade 0.35s ease ${fadeAt}s forwards` };
        return l.vertices.map(([x, y], i) => (
          <g key={`v-${l.id}-${i}`} style={style}>
            <path d={`M ${x} ${y - 2.5} L ${x + 2.5} ${y} L ${x} ${y + 2.5} L ${x - 2.5} ${y} Z`} fill="#FFFFFF" opacity={Math.min(l.opacity * 2, 0.7)} />
          </g>
        ));
      })}

      {!reduced && lines.filter((l) => l.pulse).map((l) => {
        const begin = (l.delay + TRACE_DUR).toFixed(2);
        return (
          <path
            key={`g-${l.id}`}
            d={l.d}
            fill="none"
            stroke="#E8943A"
            strokeWidth={1.8}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={`${PULSE_LEN} ${1 - PULSE_LEN}`}
            opacity={0}
            style={{ filter: "blur(1.5px)" }}
          >
            <animate attributeName="opacity" from="0" to="0.85" dur="0.3s" begin={`${begin}s`} fill="freeze" />
            <animate attributeName="stroke-dashoffset" from="0" to={-1} dur={`${ANIM_DURATION}s`} begin={`${begin}s`} repeatCount="indefinite" />
          </path>
        );
      })}
    </svg>
  );
}

/* Mobile (<768px) — the hero's 140px left inset plus the icon's own width
   leaves just ~120px of room before the viewport edge, so this stays tight. */
const MOBILE_LINES: CompactLine[] = [
  { id: "hfm-1", d: "M 0 15 H 35 L 44 26 H 85", vertices: [[35, 15], [44, 26]], opacity: 0.55, pulse: true, delay: 0 },
  { id: "hfm-2", d: "M 0 38 H 25 L 33 48 H 80", vertices: [[25, 38], [33, 48]], opacity: 0.4, delay: 0.15 },
  { id: "hfm-3", d: "M 0 60 H 20 L 28 72 H 70", vertices: [[20, 60], [28, 72]], opacity: 0.35, pulse: true, delay: 0.3 },
];

export function HeroFilamentsMobileSvg() {
  return <LineFan lines={MOBILE_LINES} viewBox="0 0 100 90" className="hero-filaments-mobile" keyPrefix="hfm" />;
}

/* Tablet/small-laptop (768–1499px) — positioned near the top of the hero
   (see hero-section.tsx), well clear of the text block below regardless of
   its exact height, so the viewBox is kept flat/short rather than tall. */
const TABLET_LINES: CompactLine[] = [
  { id: "hft-1", d: "M 0 14 H 100 L 112 26 H 260", vertices: [[100, 14], [112, 26]], opacity: 0.5, pulse: true, delay: 0 },
  { id: "hft-2", d: "M 0 36 H 75 L 86 48 H 200", vertices: [[75, 36], [86, 48]], opacity: 0.36, delay: 0.12 },
  { id: "hft-3", d: "M 0 58 H 120 L 132 70 H 270", vertices: [[120, 58], [132, 70]], opacity: 0.4, delay: 0.24 },
  { id: "hft-4", d: "M 0 82 H 55 L 65 92 H 160", vertices: [[55, 82], [65, 92]], opacity: 0.3, delay: 0.36 },
  { id: "hft-5", d: "M 0 104 H 90 L 102 114 H 230", vertices: [[90, 104], [102, 114]], opacity: 0.36, pulse: true, delay: 0.48 },
];

export function HeroFilamentsTabletSvg() {
  return <LineFan lines={TABLET_LINES} viewBox="0 0 300 120" className="hero-filaments-tablet" keyPrefix="hft" />;
}
