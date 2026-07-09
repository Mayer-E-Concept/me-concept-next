"use client";
import { useState } from "react";
import { useHeroSize } from "@/components/hero-filaments-data";

const TRACE_START   = 0.4;  // s after mount — first line begins
const TRACE_DUR     = 0.5;  // s per line
const TRACE_STAGGER = 0.1;  // s between lines
const LINE_OPACITY  = 0.32; // matches the reference design's calm, low-contrast lines
const BRANCH_OPACITY = 0.14; // sub-lines branching off a trunk read as fainter, further-back traces

/** A handful of simple right-angle traces, each just a few waypoints
    (hero-relative fractions). Deliberately sparse — this is a calm
    background layer, not a dense circuit board: a few thin lines with
    plain dots, kept to the margins around the text/graphic. Some end in
    a small electrical-symbol detail (switch/ground) or a short tag label,
    matching the reference banner (assets/linkedin_banner.png). A few also
    grow one subtle, lower-opacity branch off their own endpoint. */
type Branch = {
  /** Horizontal pixels from the trunk's endpoint before the branch's own bend */
  depart: number;
  /** Signed vertical bend (scaled by hero height); + = down, − = up */
  bendDY: number;
  /** Hero-width fraction of the branch's own terminal */
  endXFrac: number;
};

type LineSpec = {
  id: string;
  points: { xFrac: number; yFrac: number }[];
  /** Perpendicular stub + symbol hanging off the line's last point. */
  endSymbol?: { type: "switch" | "ground"; dir: "up" | "down" };
  /** Small mono-uppercase tag near the line's first point. */
  label?: { text: string; dx: number; dy: number; align?: "start" | "end" };
  /** Opts this line into a slow traveling glow. Rare — most lines stay static. */
  pulse?: boolean;
  /** A single subtle, low-opacity offshoot from this line's endpoint. */
  branch?: Branch;
};

/* Safe zone: the icon/text/house "box" occupies x:[0.0521, 0.9479]
   (100–1820px of the 1920-wide canvas) and y:[0.1019, 0.8981]
   (110–970px of the 1080-tall canvas) — see hero-section.tsx for the
   matching pixel values. Every line below stays either in the left/right
   margin (x outside that x-range, any y) or in the top/bottom strip (y
   outside that y-range, any x) — never both inside at once — so nothing
   can ever visually cross the box. */
const LINES: LineSpec[] = [
  // ── Top strip (y stays well above 0.102) ──────────────────────────────
  {
    id: "t1",
    points: [{ xFrac: 0.005, yFrac: 0.025 }, { xFrac: 0.14, yFrac: 0.025 }, { xFrac: 0.14, yFrac: 0.06 }, { xFrac: 0.25, yFrac: 0.06 }],
    endSymbol: { type: "switch", dir: "down" },
    label: { text: "L1·L2·L3", dx: 4, dy: -6, align: "start" },
    branch: { depart: 30, bendDY: -0.025, endXFrac: 0.30 },
  },
  { id: "t2", points: [{ xFrac: 0.30, yFrac: 0.015 }, { xFrac: 0.30, yFrac: 0.04 }, { xFrac: 0.40, yFrac: 0.04 }], pulse: true },
  {
    id: "t3",
    points: [{ xFrac: 0.45, yFrac: 0.02 }, { xFrac: 0.45, yFrac: 0.06 }, { xFrac: 0.58, yFrac: 0.06 }],
    endSymbol: { type: "ground", dir: "down" },
    label: { text: "400V", dx: 4, dy: -10, align: "start" },
    pulse: true,
  },
  { id: "t4", points: [{ xFrac: 0.63, yFrac: 0.05 }, { xFrac: 0.73, yFrac: 0.05 }], pulse: true, branch: { depart: 24, bendDY: 0.02, endXFrac: 0.78 } },
  {
    id: "t5",
    points: [{ xFrac: 0.995, yFrac: 0.015 }, { xFrac: 0.88, yFrac: 0.015 }, { xFrac: 0.88, yFrac: 0.05 }],
    endSymbol: { type: "switch", dir: "down" },
    pulse: true,
  },
  { id: "t6", points: [{ xFrac: 0.81, yFrac: 0.02 }, { xFrac: 0.81, yFrac: 0.05 }] },

  // ── Bottom strip (y stays well below 0.898) ───────────────────────────
  {
    id: "b1",
    points: [{ xFrac: 0.005, yFrac: 0.93 }, { xFrac: 0.14, yFrac: 0.93 }, { xFrac: 0.14, yFrac: 0.965 }, { xFrac: 0.24, yFrac: 0.965 }],
    endSymbol: { type: "ground", dir: "down" },
    label: { text: "230V", dx: 4, dy: -10, align: "start" },
    branch: { depart: 26, bendDY: 0.02, endXFrac: 0.30 },
  },
  {
    id: "b2",
    points: [{ xFrac: 0.28, yFrac: 0.995 }, { xFrac: 0.28, yFrac: 0.955 }, { xFrac: 0.38, yFrac: 0.955 }],
    endSymbol: { type: "switch", dir: "up" },
    pulse: true,
  },
  {
    id: "b3",
    points: [{ xFrac: 0.43, yFrac: 0.96 }, { xFrac: 0.55, yFrac: 0.96 }],
    label: { text: "MCB", dx: 4, dy: -10, align: "start" },
    pulse: true,
    branch: { depart: 22, bendDY: -0.018, endXFrac: 0.60 },
  },
  {
    id: "b4",
    points: [{ xFrac: 0.65, yFrac: 0.995 }, { xFrac: 0.65, yFrac: 0.945 }, { xFrac: 0.76, yFrac: 0.945 }],
    endSymbol: { type: "ground", dir: "up" },
    pulse: true,
  },
  {
    id: "b5",
    points: [{ xFrac: 0.81, yFrac: 0.96 }, { xFrac: 0.91, yFrac: 0.96 }],
    label: { text: "KNX", dx: -8, dy: -10, align: "end" },
    pulse: true,
  },
  { id: "b6", points: [{ xFrac: 0.995, yFrac: 0.965 }, { xFrac: 0.94, yFrac: 0.965 }] },

  // ── Left margin (x stays well left of 0.052) ──────────────────────────
  {
    id: "lm1",
    points: [{ xFrac: 0.005, yFrac: 0.20 }, { xFrac: 0.035, yFrac: 0.20 }, { xFrac: 0.035, yFrac: 0.24 }],
    endSymbol: { type: "switch", dir: "down" },
  },
  { id: "lm2", points: [{ xFrac: 0.005, yFrac: 0.34 }, { xFrac: 0.04, yFrac: 0.34 }], pulse: true },
  {
    id: "lm3",
    points: [{ xFrac: 0.005, yFrac: 0.48 }, { xFrac: 0.035, yFrac: 0.48 }, { xFrac: 0.035, yFrac: 0.52 }],
    endSymbol: { type: "ground", dir: "down" },
    label: { text: "IP65", dx: 4, dy: -10, align: "start" },
  },
  { id: "lm4", points: [{ xFrac: 0.005, yFrac: 0.62 }, { xFrac: 0.04, yFrac: 0.62 }], pulse: true },
  {
    id: "lm5",
    points: [{ xFrac: 0.005, yFrac: 0.76 }, { xFrac: 0.035, yFrac: 0.76 }, { xFrac: 0.035, yFrac: 0.80 }],
    pulse: true,
  },

  // ── Right margin (x stays well right of 0.948) ────────────────────────
  {
    id: "rm1",
    points: [{ xFrac: 0.995, yFrac: 0.20 }, { xFrac: 0.965, yFrac: 0.20 }, { xFrac: 0.965, yFrac: 0.24 }],
    endSymbol: { type: "switch", dir: "down" },
  },
  { id: "rm2", points: [{ xFrac: 0.995, yFrac: 0.34 }, { xFrac: 0.96, yFrac: 0.34 }], pulse: true },
  {
    id: "rm3",
    points: [{ xFrac: 0.995, yFrac: 0.48 }, { xFrac: 0.965, yFrac: 0.48 }, { xFrac: 0.965, yFrac: 0.52 }],
    endSymbol: { type: "ground", dir: "down" },
    label: { text: "PEN", dx: -4, dy: -10, align: "end" },
  },
  { id: "rm4", points: [{ xFrac: 0.995, yFrac: 0.62 }, { xFrac: 0.96, yFrac: 0.62 }], pulse: true },
  {
    id: "rm5",
    points: [{ xFrac: 0.995, yFrac: 0.76 }, { xFrac: 0.965, yFrac: 0.76 }, { xFrac: 0.965, yFrac: 0.80 }],
    pulse: true,
  },
];

const TAG_FONT = { fontFamily: "var(--font-plex-mono)", fontSize: 10, letterSpacing: "0.14em" } as const;

function buildPath(points: { xFrac: number; yFrac: number }[], heroW: number, heroH: number) {
  const px = points.map((p) => ({ x: p.xFrac * heroW, y: p.yFrac * heroH }));
  const d = px.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  return { d, px };
}

/** Builds a single branch's path from a trunk's endpoint — same shape as a
    trunk's own bend, just starting from the hub instead of the edge. */
function buildBranch(hubX: number, hubY: number, branch: Branch, heroW: number, heroH: number) {
  const btx = heroW * branch.endXFrac;
  const dir = Math.sign(btx - hubX) || 1;
  const midX = hubX + dir * branch.depart;
  const bendPx = branch.bendDY * heroH;
  const cornerX = midX + dir * Math.min(14, Math.abs(bendPx));
  const cornerY = hubY + Math.sign(bendPx || 1) * Math.min(14, Math.abs(bendPx));
  const endY = hubY + bendPx;
  if (!bendPx) return { d: `M ${hubX} ${hubY} H ${btx}`, endX: btx, endY: hubY };
  return { d: `M ${hubX} ${hubY} H ${midX} L ${cornerX} ${cornerY} V ${endY} H ${btx}`, endX: btx, endY };
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
    const start = TRACE_START + i * TRACE_STAGGER;
    const branch = spec.branch ? { ...buildBranch(last.x, last.y, spec.branch, heroW, heroH), start: start + TRACE_DUR } : null;
    return {
      ...spec,
      d,
      waypoints: px,
      endX: last.x,
      endY: last.y,
      startX: first.x,
      startY: first.y,
      start,
      branch,
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

      {/* Subtle, low-opacity branches off a trunk's endpoint — a fainter,
          further-back offshoot rather than a second equally-bold line. */}
      {built.filter((c) => c.branch).map((c) => (
        <path
          key={`br-${c.id}`}
          d={c.branch!.d}
          fill="none"
          stroke="#5AC9D4"
          strokeOpacity={BRANCH_OPACITY}
          strokeWidth={1.5}
          strokeLinejoin="miter"
          {...(!reduced && {
            pathLength: 1,
            strokeDasharray: 1,
            strokeDashoffset: 1,
            style: { animation: `hf-trace ${TRACE_DUR}s cubic-bezier(0.4,0,0.2,1) ${c.branch!.start.toFixed(2)}s forwards` },
          })}
        />
      ))}
      {built.filter((c) => c.branch).map((c) => {
        const fadeAt = (c.branch!.start + TRACE_DUR - 0.15).toFixed(2);
        const style = reduced ? undefined : { opacity: 0, animation: `hf-fade 0.4s ease ${fadeAt}s forwards` };
        return <circle key={`brd-${c.id}`} cx={c.branch!.endX} cy={c.branch!.endY} r={2.2} fill="#5AC9D4" opacity={0.4} style={style} />;
      })}

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
