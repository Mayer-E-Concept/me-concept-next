"use client";
import { useState } from "react";
import { useHeroSize } from "@/components/hero-filaments-data";

const TRACE_START   = 0.4;  // s after mount — first line begins
const TRACE_DUR     = 0.5;  // s per line
const TRACE_STAGGER = 0.12; // s between lines
const LINE_OPACITY  = 0.32; // matches the reference design's calm, low-contrast lines

/** A handful of simple right-angle traces, each just a few waypoints
    (hero-relative fractions). Deliberately sparse — this is a calm
    background layer, not a dense circuit board: a few thin lines with
    plain dots, kept to the margins around the text/graphic. */
type LineSpec = {
  id: string;
  points: { xFrac: number; yFrac: number }[];
  /** Adds a small resistor-style rectangle detail on the segment leading
      into the last point. Used sparingly — one or two lines total. */
  resistor?: boolean;
  /** Opts this line into a slow traveling glow. Rare — most lines stay static. */
  pulse?: boolean;
};

const LINES: LineSpec[] = [
  // Upper band, above/around the eyebrow — mirrors the reference image's
  // top trace: right, down, right again, ending in a resistor + dot.
  {
    id: "l1",
    points: [
      { xFrac: 0.005, yFrac: 0.035 },
      { xFrac: 0.16, yFrac: 0.035 },
      { xFrac: 0.16, yFrac: 0.07 },
      { xFrac: 0.27, yFrac: 0.07 },
    ],
    resistor: true,
  },
  {
    id: "l2",
    points: [
      { xFrac: 0.62, yFrac: 0.03 },
      { xFrac: 0.62, yFrac: 0.08 },
      { xFrac: 0.78, yFrac: 0.08 },
    ],
    pulse: true,
  },
  // Right side, clear of the 3D graphic — a couple of short traces.
  {
    id: "l3",
    points: [
      { xFrac: 0.995, yFrac: 0.14 },
      { xFrac: 0.90, yFrac: 0.14 },
      { xFrac: 0.90, yFrac: 0.22 },
    ],
  },
  {
    id: "l4",
    points: [
      { xFrac: 0.995, yFrac: 0.86 },
      { xFrac: 0.92, yFrac: 0.86 },
      { xFrac: 0.92, yFrac: 0.94 },
      { xFrac: 0.80, yFrac: 0.94 },
    ],
    pulse: true,
  },
  // Lower-left, below the stats row.
  {
    id: "l5",
    points: [
      { xFrac: 0.005, yFrac: 0.90 },
      { xFrac: 0.10, yFrac: 0.90 },
      { xFrac: 0.10, yFrac: 0.965 },
      { xFrac: 0.22, yFrac: 0.965 },
    ],
  },
  {
    id: "l6",
    points: [
      { xFrac: 0.34, yFrac: 0.995 },
      { xFrac: 0.34, yFrac: 0.93 },
      { xFrac: 0.44, yFrac: 0.93 },
    ],
  },
  // A couple of faint far-corner traces to avoid completely empty corners
  // without adding visual density anywhere near the text.
  {
    id: "l7",
    points: [
      { xFrac: 0.995, yFrac: 0.03 },
      { xFrac: 0.94, yFrac: 0.03 },
    ],
  },
  {
    id: "l8",
    points: [
      { xFrac: 0.005, yFrac: 0.995 },
      { xFrac: 0.005, yFrac: 0.955 },
    ],
  },
];

const RESISTOR_W = 22;
const RESISTOR_H = 9;

function buildPath(points: { xFrac: number; yFrac: number }[], heroW: number, heroH: number) {
  const px = points.map((p) => ({ x: p.xFrac * heroW, y: p.yFrac * heroH }));
  const d = px.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  return { d, px };
}

export function HeroFilamentsSvg() {
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const size = useHeroSize();

  if (!size) return null;
  const { heroW, heroH } = size;

  const built = LINES.map((spec, i) => {
    const { d, px } = buildPath(spec.points, heroW, heroH);
    const last = px[px.length - 1];
    return {
      ...spec,
      d,
      waypoints: px,
      endX: last.x,
      endY: last.y,
      start: TRACE_START + i * TRACE_STAGGER,
    };
  });

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${heroW} ${heroH}`}
      preserveAspectRatio="none"
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

      {/* Lines — draw in from their origin (static at reduced motion). */}
      {built.map((c) => (
        <path
          key={`p-${c.id}`}
          d={c.d}
          fill="none"
          stroke="#5AC9D4"
          strokeOpacity={LINE_OPACITY}
          strokeWidth={2}
          strokeLinejoin="miter"
          {...(!reduced && {
            pathLength: 1,
            strokeDasharray: 1,
            strokeDashoffset: 1,
            style: { animation: `hf-trace ${TRACE_DUR}s cubic-bezier(0.4,0,0.2,1) ${c.start.toFixed(2)}s forwards` },
          })}
        />
      ))}

      {/* Small dots at every waypoint (start, bends, end) — plain circles,
          same style throughout, matching the reference design. */}
      {built.flatMap((c) => {
        const fadeAt = (c.start + TRACE_DUR - 0.15).toFixed(2);
        const style = reduced ? undefined : { opacity: 0, animation: `hf-fade 0.4s ease ${fadeAt}s forwards` };
        return c.waypoints.map((wp, i) => (
          <circle key={`d-${c.id}-${i}`} cx={wp.x} cy={wp.y} r={3} fill="#8FE0E8" opacity={0.7} style={style} />
        ));
      })}

      {/* A single resistor-style rectangle detail, on the lines that opt in. */}
      {built.filter((c) => c.resistor).map((c) => (
        <rect
          key={`r-${c.id}`}
          x={c.endX - RESISTOR_W / 2}
          y={c.endY - RESISTOR_H / 2}
          width={RESISTOR_W}
          height={RESISTOR_H}
          rx={1.5}
          fill="none"
          stroke="#5AC9D4"
          strokeOpacity={LINE_OPACITY + 0.1}
          strokeWidth={1.5}
        />
      ))}

      {/* Slow traveling glow on the handful of lines that opt in — calm and
          rare, not a busy current flowing through every trace. */}
      {!reduced && built.filter((c) => c.pulse).map((c) => (
        <path
          key={`g-${c.id}`}
          d={c.d}
          fill="none"
          stroke="#8FE0E8"
          strokeWidth={3}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="0.06 0.94"
          opacity={0}
          style={{ filter: "blur(2px)" }}
        >
          <animate attributeName="opacity" from="0" to="0.7" dur="0.4s" begin={`${(c.start + TRACE_DUR).toFixed(2)}s`} fill="freeze" />
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to={-1}
            dur="6s"
            begin={`${(c.start + TRACE_DUR).toFixed(2)}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}
    </svg>
  );
}
