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
    plain dots, kept to the margins around the text/graphic. Some end in
    a small electrical-symbol detail (switch/ground) or a short tag label,
    matching the reference banner (assets/linkedin_banner.png). */
type LineSpec = {
  id: string;
  points: { xFrac: number; yFrac: number }[];
  /** Perpendicular stub + symbol hanging off the line's last point. */
  endSymbol?: { type: "switch" | "ground"; dir: "up" | "down" };
  /** Small mono-uppercase tag near the line's first point. */
  label?: { text: string; dx: number; dy: number; align?: "start" | "end" };
  /** Opts this line into a slow traveling glow. Rare — most lines stay static. */
  pulse?: boolean;
};

const LINES: LineSpec[] = [
  // Upper band, above the eyebrow — matches the reference banner's top-left
  // trace: right, down, right again, then a switch symbol; "L1·L2·L3" tag
  // at the origin corner.
  {
    id: "l1",
    points: [
      { xFrac: 0.005, yFrac: 0.02 },
      { xFrac: 0.16, yFrac: 0.02 },
      { xFrac: 0.16, yFrac: 0.055 },
      { xFrac: 0.27, yFrac: 0.055 },
    ],
    endSymbol: { type: "switch", dir: "down" },
    label: { text: "L1·L2·L3", dx: 4, dy: -6, align: "start" },
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
  // Lower-left, below the stats row — ground symbol, matching the
  // reference banner's bottom-left ground detail.
  {
    id: "l5",
    points: [
      { xFrac: 0.005, yFrac: 0.90 },
      { xFrac: 0.10, yFrac: 0.90 },
      { xFrac: 0.10, yFrac: 0.94 },
      { xFrac: 0.22, yFrac: 0.94 },
    ],
    endSymbol: { type: "ground", dir: "down" },
  },
  {
    id: "l6",
    points: [
      { xFrac: 0.34, yFrac: 0.995 },
      { xFrac: 0.34, yFrac: 0.93 },
      { xFrac: 0.44, yFrac: 0.93 },
    ],
  },
  // Far corners, to avoid completely empty space without adding density
  // anywhere near the text.
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
  // Mid-right, between the two edge clusters above/below.
  {
    id: "l9",
    points: [
      { xFrac: 0.995, yFrac: 0.32 },
      { xFrac: 0.87, yFrac: 0.32 },
      { xFrac: 0.87, yFrac: 0.38 },
    ],
  },
  {
    id: "l10",
    points: [
      { xFrac: 0.995, yFrac: 0.60 },
      { xFrac: 0.885, yFrac: 0.60 },
    ],
    pulse: true,
  },
  // Bottom-right corner tag, matching the reference banner's "KNX" corner label.
  {
    id: "l11",
    points: [
      { xFrac: 0.995, yFrac: 0.92 },
      { xFrac: 0.95, yFrac: 0.92 },
      { xFrac: 0.95, yFrac: 0.96 },
    ],
    label: { text: "KNX", dx: -8, dy: 16, align: "end" },
  },
];

const TAG_FONT = { fontFamily: "var(--font-plex-mono)", fontSize: 10, letterSpacing: "0.14em" } as const;

function buildPath(points: { xFrac: number; yFrac: number }[], heroW: number, heroH: number) {
  const px = points.map((p) => ({ x: p.xFrac * heroW, y: p.yFrac * heroH }));
  const d = px.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  return { d, px };
}

/** Switch symbol: short perpendicular stem off the line's endpoint, a small
    square (relay/switch body), then a terminal dot — matches the two switch
    marks in the reference banner. */
function SwitchSymbol({ x, y, dir }: { x: number; y: number; dir: "up" | "down" }) {
  const s = dir === "down" ? 1 : -1;
  const stemEnd = y + 8 * s;
  const rectTop = s > 0 ? stemEnd : stemEnd - 9;
  const dotY = stemEnd + 13 * s;
  return (
    <g>
      <path d={`M ${x} ${y} L ${x} ${stemEnd}`} stroke="#5AC9D4" strokeOpacity={LINE_OPACITY} strokeWidth={2} fill="none" />
      <rect x={x - 4.5} y={rectTop} width={9} height={9} fill="none" stroke="#5AC9D4" strokeOpacity={LINE_OPACITY + 0.15} strokeWidth={1.4} />
      <circle cx={x} cy={dotY} r={2.5} fill="#8FE0E8" opacity={0.7} />
    </g>
  );
}

/** Ground/earth symbol: perpendicular stem into three decreasing-width bars —
    matches the reference banner's ground detail. */
function GroundSymbol({ x, y, dir }: { x: number; y: number; dir: "up" | "down" }) {
  const s = dir === "down" ? 1 : -1;
  const stemEnd = y + 8 * s;
  const bars = [
    { w: 14, o: 0 },
    { w: 10, o: 4 * s },
    { w: 6, o: 8 * s },
  ];
  return (
    <g>
      <path d={`M ${x} ${y} L ${x} ${stemEnd}`} stroke="#5AC9D4" strokeOpacity={LINE_OPACITY} strokeWidth={2} fill="none" />
      {bars.map((b, i) => (
        <path
          key={i}
          d={`M ${x - b.w / 2} ${stemEnd + b.o} H ${x + b.w / 2}`}
          stroke="#5AC9D4"
          strokeOpacity={LINE_OPACITY + 0.15}
          strokeWidth={1.6}
        />
      ))}
    </g>
  );
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
    const first = px[0];
    return {
      ...spec,
      d,
      waypoints: px,
      endX: last.x,
      endY: last.y,
      startX: first.x,
      startY: first.y,
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
          same style throughout, matching the reference design. Lines with
          an end symbol skip the plain dot at their last point — the symbol
          replaces it. */}
      {built.flatMap((c) => {
        const fadeAt = (c.start + TRACE_DUR - 0.15).toFixed(2);
        const style = reduced ? undefined : { opacity: 0, animation: `hf-fade 0.4s ease ${fadeAt}s forwards` };
        const pts = c.endSymbol ? c.waypoints.slice(0, -1) : c.waypoints;
        return pts.map((wp, i) => (
          <circle key={`d-${c.id}-${i}`} cx={wp.x} cy={wp.y} r={3} fill="#8FE0E8" opacity={0.7} style={style} />
        ));
      })}

      {/* Switch / ground symbol details — the handful of lines that opt in. */}
      {built.filter((c) => c.endSymbol).map((c) => {
        const fadeAt = (c.start + TRACE_DUR - 0.15).toFixed(2);
        const style = reduced ? undefined : { opacity: 0, animation: `hf-fade 0.4s ease ${fadeAt}s forwards` };
        return (
          <g key={`sym-${c.id}`} style={style}>
            {c.endSymbol!.type === "switch" ? (
              <SwitchSymbol x={c.endX} y={c.endY} dir={c.endSymbol!.dir} />
            ) : (
              <GroundSymbol x={c.endX} y={c.endY} dir={c.endSymbol!.dir} />
            )}
          </g>
        );
      })}

      {/* Small tag labels near a line's origin — plain uppercase mono text,
          matching the reference banner's "L1·L2·L3" / "KNX" corner tags. */}
      {built.filter((c) => c.label).map((c) => {
        const fadeAt = (c.start + TRACE_DUR - 0.15).toFixed(2);
        const style = reduced ? undefined : { opacity: 0, animation: `hf-fade 0.4s ease ${fadeAt}s forwards` };
        const l = c.label!;
        return (
          <text
            key={`lbl-${c.id}`}
            x={c.startX + l.dx}
            y={c.startY + l.dy}
            textAnchor={l.align === "end" ? "end" : "start"}
            fill="#8FE0E8"
            opacity={0.55}
            style={{ ...TAG_FONT, textTransform: "uppercase", ...style }}
          >
            {l.text}
          </text>
        );
      })}

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
