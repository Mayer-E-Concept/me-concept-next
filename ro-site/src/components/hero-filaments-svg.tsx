"use client";
import { useState } from "react";
import {
  useHeroSize,
  TRACE_START,
  TRACE_DUR,
  TRACE_STAGGER,
  OPACITY_SCALE,
  type BranchSpec,
  type CableSegment,
} from "@/components/hero-filaments-data";

const ANIM_DURATION   = 5; // seconds per full path traversal
const PULSES_PER_LINE = 3; // glow packets travelling each line at once — rendered as separate
                            // paths (see below) so each one visibly departs from the line's
                            // start instead of being pre-seeded mid-path at reveal time
const PULSE_LEN       = 0.045; // fraction of path length lit up per pulse
const EDGE_STAGGER    = 0.12; // s between the right-side ambient cables

/** Simple straight-line cables anchored to fixed points on the hero canvas
    (fractions of hero width/height) — used for the top-left corner fill-in
    and the right-edge ambient lines. Travel direction (left→right or
    right→left) is inferred from start vs. mid X. Can branch just like a
    trunk, to read as circuit traces rather than single wires. */
type FractionCableSpec = {
  id: string;
  yFrac: number;
  startXFrac: number;
  midXFrac: number;
  /** Signed vertical bend (scaled by hero height); 0 = stays flat */
  bendDY: number;
  /** Hero-width fraction of where the trace lands after the corner — omit to
      stop right at the corner. Gives every ambient line a real second leg
      instead of ending mid-bend, which both reaches further (fills more of
      the frame) and gives branches a properly-placed hub to fork from. */
  endXFrac?: number;
  opacity?: number;
  branches?: BranchSpec[];
  /** Opt this specific line into the traveling current glow. Ambient lines
      default to none — with 16+ of them, giving every eligible segment its
      own pulse read as far too busy, so only a deliberately small, curated
      set actually animates. Ignored (and impossible) for any line with
      branches — junctions never pulse, keeping the model simple: only a
      handful of plain single lines carry visible current. */
  pulse?: boolean;
};

/** Short 45° corner clip instead of one long diagonal spanning the whole
    bend — reads as an actual PCB trace (mostly-straight runs, brief chamfered
    corners) rather than a soft diagonal sweep. Shared by both ambient trunks
    and their branches. */
const CHAMFER = 14;

function chamferedRoute(x0: number, y0: number, midX: number, bendPx: number, dirX: number, finalX: number) {
  if (!bendPx) {
    return { d: `M ${x0} ${y0} H ${finalX}`, vertices: [] as { x: number; y: number }[], endX: finalX, endY: y0 };
  }
  const vDir = Math.sign(bendPx) || 1;
  const chamfer = Math.min(CHAMFER, Math.abs(bendPx));
  const cornerX = midX + dirX * chamfer;
  const cornerY = y0 + vDir * chamfer;
  const endY = y0 + bendPx;
  return {
    d: `M ${x0} ${y0} H ${midX} L ${cornerX} ${cornerY} V ${endY} H ${finalX}`,
    vertices: [{ x: midX, y: y0 }, { x: cornerX, y: endY }],
    endX: finalX,
    endY,
  };
}

/** Attach `start` (trace-in delay) to each segment of a built cable: the
    trunk starts at `trunkStart`; each branch starts once the trunk has
    finished drawing, staggered slightly from each other. */
function withTiming<T extends CableSegment>(segments: T[], trunkStart: number) {
  const BRANCH_STAGGER = 0.06;
  return segments.map((seg, i) =>
    i === 0
      ? { ...seg, start: trunkStart }
      : { ...seg, start: trunkStart + TRACE_DUR + (i - 1) * BRANCH_STAGGER },
  );
}

/** Ambient cable segment — CableSegment already carries `vertices` (bend
    points, for the via-pad markers) plus this pulse-eligibility flag. */
type FractionSegment = CableSegment & {
  /** true only for a trunk whose spec explicitly opted into the pulse
      allowlist; always false for branches (they never pulse, regardless of
      any flag) and for junction trunks (structurally excluded below). */
  ambientPulse: boolean;
};

export function HeroFilamentsSvg() {
  // Static fallback: cabluri desenate complet, fara trasare/SMIL/pachete
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const size = useHeroSize();

  if (!size) return null;

  const { heroW, heroH } = size;

  /* ── Simple straight-line cables anchored by hero-relative fractions ──── */
  const buildFractionCable = (spec: FractionCableSpec) => {
    const sx = heroW * spec.startXFrac;
    const sy = heroH * spec.yFrac;
    const mx = heroW * spec.midXFrac;
    if (!spec.bendDY) {
      const finalX = spec.endXFrac != null ? heroW * spec.endXFrac : mx;
      return { d: `M ${sx} ${sy} H ${finalX}`, endX: finalX, endY: sy, vertices: [] as { x: number; y: number }[] };
    }
    const dir = Math.sign(mx - sx) || 1;
    const bendPx = spec.bendDY * heroH;
    const cornerXIfNoFinal = mx + dir * Math.min(CHAMFER, Math.abs(bendPx));
    const finalX = spec.endXFrac != null ? heroW * spec.endXFrac : cornerXIfNoFinal;
    const route = chamferedRoute(sx, sy, mx, bendPx, dir, finalX);
    return route;
  };

  const buildFractionCableSegments = (spec: FractionCableSpec): FractionSegment[] => {
    const trunk = buildFractionCable(spec);
    const trunkOpacity = (spec.opacity ?? 0.5) * OPACITY_SCALE;
    const segments: FractionSegment[] = [
      {
        id: spec.id,
        d: trunk.d,
        endX: trunk.endX,
        endY: trunk.endY,
        isJunction: !!spec.branches?.length,
        opacity: trunkOpacity,
        vertices: trunk.vertices,
        ambientPulse: !!spec.pulse,
      },
    ];
    spec.branches?.forEach((b, i) => {
      const hubX = trunk.endX;
      const hubY = trunk.endY;
      const btx = heroW * b.endXFrac;
      const dir = Math.sign(btx - hubX) || 1;
      const midX = hubX + dir * b.depart;
      const bendPx = b.bendDY * heroH;
      const branchRoute = chamferedRoute(hubX, hubY, midX, bendPx, dir, btx);
      segments.push({
        id: `${spec.id}-b${i}`,
        d: branchRoute.d,
        endX: branchRoute.endX,
        endY: branchRoute.endY,
        isJunction: false,
        opacity: (b.opacity ?? trunkOpacity / OPACITY_SCALE) * OPACITY_SCALE,
        vertices: branchRoute.vertices,
        ambientPulse: false,
      });
    });
    return segments;
  };

  // Top-left corner fill-in — kept well above the header/hero text (roughly
  // the top ~20% of the hero). Each gets exactly one short branch that
  // continues the trunk's own bend direction, instead of forking off at an
  // unrelated angle.
  const topLeftCables: FractionCableSpec[] = [
    // yFrac kept below ~0.075 clears the fixed header (it sits on top of the
    // hero and was clipping this line's origin, making it look cut-off/tiny).
    // No branches on this one (unlike -2 below) — kept a single plain line on
    // purpose so it's eligible for a full pulse that visibly departs from
    // the screen edge, rather than only from a mid-path branch hub.
    {
      id: "hero-topleft-1", yFrac: 0.08, startXFrac: 0, midXFrac: 0.15, bendDY: 0.07, endXFrac: 0.20,
      opacity: 0.6,
      pulse: true,
    },
    {
      id: "hero-topleft-2", yFrac: 0.18, startXFrac: 0, midXFrac: 0.17, bendDY: 0.03, endXFrac: 0.23,
      opacity: 0.6,
      branches: [{ depart: 30, bendDY: 0.04, endXFrac: 0.32, opacity: 0.12 }],
    },
    // Filler for the empty band directly under the nav divider — kept at a
    // very low yFrac with almost no bend so it stays well above the roof
    // regardless of its x-range.
    {
      id: "hero-fill-topB", yFrac: 0.05, startXFrac: 0.60, midXFrac: 0.80, bendDY: 0.04, endXFrac: 0.92,
      opacity: 0.14,
    },
    // A little more under the nav, between the top-left cluster and hero-fill-topB.
    {
      id: "hero-fill-topC", yFrac: 0.04, startXFrac: 0.22, midXFrac: 0.42, bendDY: 0.05, endXFrac: 0.58,
      opacity: 0.18,
      branches: [{ depart: 30, bendDY: 0.04, endXFrac: 0.62, opacity: 0.12 }],
    },
    // Filler for the empty bottom-left corner, below the text and left of
    // the stats. No branches (unlike -bottomleft2 below) — plain line, so it
    // gets a full edge-to-edge pulse like hero-topleft-1 above.
    {
      id: "hero-fill-bottomleft", yFrac: 0.80, startXFrac: 0, midXFrac: 0.20, bendDY: 0.12, endXFrac: 0.30,
      opacity: 0.14,
      pulse: true,
    },
    // Far top-right sliver — extreme top edge, well clear of the diagram on
    // the right, fills what was empty space before the right-edge cluster starts.
    {
      id: "hero-fill-topD", yFrac: 0.02, startXFrac: 0.85, midXFrac: 0.95, bendDY: 0.03, endXFrac: 1,
      opacity: 0.13,
      pulse: true,
    },
    // Second, lower bottom-left line beneath hero-fill-bottomleft — the very
    // bottom band still had room.
    {
      id: "hero-fill-bottomleft2", yFrac: 0.94, startXFrac: 0, midXFrac: 0.14, bendDY: 0.04, endXFrac: 0.26,
      opacity: 0.13,
      branches: [{ depart: 20, bendDY: 0.03, endXFrac: 0.34, opacity: 0.1 }],
    },
  ];
  const builtTopLeft = topLeftCables.flatMap((spec, i) =>
    withTiming(buildFractionCableSegments(spec), TRACE_START + i * TRACE_STAGGER),
  );

  // Right-edge ambient cables — deliberately irregular (varied Y spacing,
  // bend direction and length) rather than a mirrored/symmetric fan. Drift in
  // well after the left-side fan has finished. Plain single-bend lines, no
  // branches — but each one alternates bend direction and uses a distinctly
  // different reach (midXFrac) from its neighbours, so the stack reads as
  // varied traces rather than the same shape repeated at different heights.
  const rightEdgeCables: FractionCableSpec[] = [
    {
      id: "hero-edge-1", yFrac: 0.12, startXFrac: 1, midXFrac: 0.88, bendDY: -0.18, endXFrac: 0.78,
      opacity: 0.55,
      branches: [{ depart: 25, bendDY: -0.08, endXFrac: 0.70, opacity: 0.12 }],
    },
    {
      id: "hero-edge-2", yFrac: 0.40, startXFrac: 1, midXFrac: 0.90, bendDY: -0.14, endXFrac: 0.82,
      opacity: 0.55,
      branches: [{ depart: 20, bendDY: -0.06, endXFrac: 0.76, opacity: 0.12 }],
    },
    // Sits right at the diagram's own height — pulled almost all the way to
    // the edge with a very slight bend, since a small dip/reach here risks
    // grazing it. No branch — kept minimal on purpose.
    { id: "hero-edge-3", yFrac: 0.66, startXFrac: 1, midXFrac: 0.96, bendDY: 0.05, endXFrac: 0.90, opacity: 0.45, pulse: true },
    { id: "hero-edge-4", yFrac: 0.89, startXFrac: 1, midXFrac: 0.94, bendDY: -0.08, endXFrac: 0.84, opacity: 0.45, pulse: true },
    // Two faint fillers in the gaps between the lines above — same
    // conservative reach (0.90+) as hero-edge-3/-4 since they also sit
    // roughly at the diagram's height.
    {
      id: "hero-edge-r1", yFrac: 0.25, startXFrac: 1, midXFrac: 0.91, bendDY: -0.10, endXFrac: 0.80,
      opacity: 0.20,
      branches: [{ depart: 20, bendDY: -0.05, endXFrac: 0.74, opacity: 0.11 }],
    },
    {
      id: "hero-edge-r2", yFrac: 0.78, startXFrac: 1, midXFrac: 0.93, bendDY: 0.08, endXFrac: 0.84,
      opacity: 0.20,
      branches: [{ depart: 18, bendDY: 0.04, endXFrac: 0.76, opacity: 0.11 }],
    },
    // New: fills the 0.40–0.66 gap — very conservative reach, mid-height.
    { id: "hero-edge-r3", yFrac: 0.53, startXFrac: 1, midXFrac: 0.95, bendDY: -0.05, endXFrac: 0.90, opacity: 0.35, pulse: true },
    // New: extreme top-right and bottom-right corners.
    { id: "hero-edge-r4", yFrac: 0.04, startXFrac: 1, midXFrac: 0.92, bendDY: 0.04, endXFrac: 0.84, opacity: 0.4, pulse: true },
    { id: "hero-edge-r5", yFrac: 0.97, startXFrac: 1, midXFrac: 0.90, bendDY: -0.04, endXFrac: 0.80, opacity: 0.4, pulse: true },
  ];
  const RIGHT_TRACE_START = TRACE_START + topLeftCables.length * TRACE_STAGGER + TRACE_DUR + 0.15;
  const builtRightEdge = rightEdgeCables.flatMap((spec, i) =>
    withTiming(buildFractionCableSegments(spec), RIGHT_TRACE_START + i * EDGE_STAGGER),
  );

  const allBuilt = [...builtTopLeft, ...builtRightEdge];

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

      {/* Cable traces — drawn in from their origin outward (static at reduced motion).
          Opacity varies per segment (branches read as fainter, further-back
          traces than their trunk) instead of one flat value for every line. */}
      {allBuilt.map((c) => (
        <path
          key={`p-${c.id}`}
          id={c.id}
          d={c.d}
          fill="none"
          stroke={`rgba(90,201,212,${c.opacity})`}
          strokeWidth={2}
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

      {/* Destination terminals — small static dot, fades in as its cable
          completes. Junctions (a trunk that splits into branches) skip the
          dot — the line just continues into its branches instead of
          terminating. */}
      {allBuilt.filter((c) => !c.isJunction).map((c) => (
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
          <circle cx={c.endX} cy={c.endY} r={3} fill="#8FE0E8" opacity={0.65} />
        </g>
      ))}

      {/* PCB-via pad marks — small diamond nodes at every bend. Fades in
          alongside that segment's own terminal dot. Purely decorative
          metadata (vertices) — never touches d/endX/endY. */}
      {allBuilt.flatMap((c) => {
        const fadeAt = (c.start + TRACE_DUR - 0.15).toFixed(2);
        const padStyle = reduced ? undefined : { opacity: 0, animation: `hf-fade 0.4s ease ${fadeAt}s forwards` };
        const padOpacity = Math.min(c.opacity * 2.4, 0.7);
        const pads = c.vertices.map((v, i) => (
          <g key={`via-${c.id}-${i}`} style={padStyle}>
            <path
              d={`M ${v.x} ${v.y - 5} L ${v.x + 5} ${v.y} L ${v.x} ${v.y + 5} L ${v.x - 5} ${v.y} Z`}
              fill="#5AC9D4"
              opacity={padOpacity}
            />
          </g>
        ));
        // Junction hubs (where a trunk splits into branches) get a slightly
        // larger cyan-bright pad instead — reads as the "active node" the
        // branches fan out from.
        if (c.isJunction) {
          pads.push(
            <g key={`via-hub-${c.id}`} style={padStyle}>
              <path
                d={`M ${c.endX} ${c.endY - 6} L ${c.endX + 6} ${c.endY} L ${c.endX} ${c.endY + 6} L ${c.endX - 6} ${c.endY} Z`}
                fill="#8FE0E8"
                opacity={0.7}
              />
            </g>,
          );
        }
        return pads;
      })}

      {/* Traveling current glow — a soft blurred highlight flowing through
          each cable once it's traced in, rather than discrete dots/rings.
          Each of the PULSES_PER_LINE packets is its own path with a single
          dash, so its stroke-dashoffset always starts at 0 (the path's own
          origin) the moment it's introduced. Junctions don't get their own
          glow at all; only lines that opted in via `pulse: true` animate —
          deliberately rare, not "every line that happens to be eligible". */}
      {!reduced && allBuilt.filter((c) => !c.isJunction && c.ambientPulse).flatMap((c) => {
        const baseBegin = c.start + TRACE_DUR;
        return Array.from({ length: PULSES_PER_LINE }, (_, i) => {
          const begin = (baseBegin + i * (ANIM_DURATION / PULSES_PER_LINE)).toFixed(2);
          return (
            <path
              key={`g-${c.id}-${i}`}
              d={c.d}
              fill="none"
              stroke="#8FE0E8"
              strokeWidth={3}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={`${PULSE_LEN} ${1 - PULSE_LEN}`}
              opacity={0}
              style={{ filter: "blur(2.5px)" }}
            >
              <animate attributeName="opacity" from="0" to="0.85" dur="0.4s" begin={`${begin}s`} fill="freeze" />
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to={-1}
                dur={`${ANIM_DURATION}s`}
                begin={`${begin}s`}
                repeatCount="indefinite"
              />
            </path>
          );
        });
      })}
    </svg>
  );
}
