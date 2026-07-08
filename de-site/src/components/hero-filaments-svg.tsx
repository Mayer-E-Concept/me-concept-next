"use client";
import { useState } from "react";
import {
  CABLE_SPECS,
  buildCableSegments,
  useDiamondLayout,
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
const EDGE_STAGGER    = 0.4;  // s between the right-side ambient cables
const BRANCH_STAGGER  = 0.15; // s between a trunk's own branches

/** Simple straight-line cables anchored to fixed points on the hero canvas
    (fractions of hero width/height) rather than to the diamond — used for the
    top-left corner fill-in and the right-edge ambient lines. Travel direction
    (left→right or right→left) is inferred from start vs. mid X. Can branch
    just like the diamond cables, to read as circuit traces rather than
    single wires. */
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
  return segments.map((seg, i) =>
    i === 0
      ? { ...seg, start: trunkStart }
      : { ...seg, start: trunkStart + TRACE_DUR + (i - 1) * BRANCH_STAGGER },
  );
}

/** A bend vertex along an ambient (non-diamond) cable, in hero-relative
    pixels — used to place small PCB-via marks at each corner, echoing the
    reference circuit artwork's node pads. Only tracked for the fraction-
    anchored ambient lines (top-left fill + right-edge lines), never for the
    diamond-anchored fan — those must stay exactly as they are. */
type FractionSegment = CableSegment & { vertices: { x: number; y: number }[] };

export function HeroFilamentsSvg() {
  // Static fallback: cabluri desenate complet, fara trasare/SMIL/pachete
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const layout = useDiamondLayout();

  if (!layout) return null;

  const { heroW, heroH } = layout;

  // Only mild/no upward bends here — steep upward lines used to cross into the
  // "MAYER E-CONCEPT" text sitting above the diamond. Those now live in
  // topLeftCables instead, anchored well above the whole brand lockup.
  const built = CABLE_SPECS.flatMap((spec, i) =>
    withTiming(buildCableSegments(layout, spec), TRACE_START + i * TRACE_STAGGER),
  );

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
      });
    });
    return segments;
  };

  // Top-left corner fill-in — replaces the old steep-upward diamond lines so
  // nothing ever crosses the "MAYER E-CONCEPT" text above the icon. Kept well
  // above the vertically-centered brand lockup (roughly the top ~20% of the
  // hero). Back to the original short trunk length (no long boring stretch
  // before anything happens) — each gets exactly one short branch that
  // continues the trunk's own bend direction, instead of forking off at an
  // unrelated angle.
  // hero-topleft-1 starts above hero-topleft-2 (yFrac 0.08 vs 0.18) but used
  // to bend DOWN while -2 bent UP — moving toward each other, which forces a
  // crossing for the same reason as the hero-line-2/-7 issue: two rightward-
  // only paths can't swap vertical order without physically intersecting.
  // Both now bend the same direction (down) so -1 stays above -2 the whole way.
  const topLeftCables: FractionCableSpec[] = [
    // yFrac kept below ~0.075 clears the fixed header (it sits on top of the
    // hero and was clipping this line's origin, making it look cut-off/tiny).
    {
      id: "hero-topleft-1", yFrac: 0.08, startXFrac: 0, midXFrac: 0.15, bendDY: 0.07, endXFrac: 0.20,
      opacity: 0.6,
      branches: [{ depart: 30, bendDY: 0.05, endXFrac: 0.30, opacity: 0.12 }],
    },
    {
      id: "hero-topleft-2", yFrac: 0.18, startXFrac: 0, midXFrac: 0.17, bendDY: 0.03, endXFrac: 0.23,
      opacity: 0.6,
      branches: [{ depart: 30, bendDY: 0.04, endXFrac: 0.32, opacity: 0.12 }],
    },
    // Filler for the empty band directly under the nav divider — kept at a
    // very low yFrac with almost no bend so it stays well above the roof
    // regardless of its x-range (yFrac 0.28 previously put its flat segment
    // right through the house's upper section — that was the real "random
    // line on the roof" bug, not hero-fill-topA, which was a red herring and
    // has been removed).
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
    // Filler for the empty bottom-left corner, below the diamond and left of the stats.
    {
      id: "hero-fill-bottomleft", yFrac: 0.80, startXFrac: 0, midXFrac: 0.20, bendDY: 0.12, endXFrac: 0.30,
      opacity: 0.14,
      branches: [{ depart: 25, bendDY: 0.08, endXFrac: 0.38, opacity: 0.11 }],
    },
    // Far top-right sliver — extreme top edge, well clear of the brand text
    // and the diamond, fills what was empty space before the right-edge
    // cluster starts.
    {
      id: "hero-fill-topD", yFrac: 0.02, startXFrac: 0.85, midXFrac: 0.95, bendDY: 0.03, endXFrac: 1,
      opacity: 0.13,
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
    withTiming(buildFractionCableSegments(spec), TRACE_START + (CABLE_SPECS.length + i) * TRACE_STAGGER),
  );

  // Right-edge ambient cables — deliberately irregular (varied Y spacing,
  // bend direction and length) rather than a mirrored/symmetric fan. Drift in
  // well after the left-side fan has finished. Plain single-bend lines, no
  // branches — but each one alternates bend direction and uses a distinctly
  // different reach (midXFrac) from its neighbours, so the stack reads as
  // varied traces rather than the same shape repeated at different heights.
  // hero-edge-2/-3 (which sit right at the house's own height) stay pulled
  // back for real clearance instead of hugging its edge.
  const rightEdgeCables: FractionCableSpec[] = [
    // hero-edge-1/-2 sit clear above/at the top of the house, so a small
    // branch continuing their own bend direction is safe.
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
    // Sits right at the house's own height — pulled almost all the way to the
    // edge with a very slight bend, since the house rotates and even a small
    // dip/reach here risks grazing it. No branch — kept minimal on purpose.
    { id: "hero-edge-3", yFrac: 0.66, startXFrac: 1, midXFrac: 0.96, bendDY: 0.05, endXFrac: 0.90, opacity: 0.45 },
    // Shortened — the house rotates continuously and its silhouette swings
    // wide enough at some angles to reach this line if it runs any longer.
    // bendDY pulled back from -0.20 to -0.08: that steeper bend swept its
    // endpoint up into the house's bottom-right corner. No branch here either.
    { id: "hero-edge-4", yFrac: 0.89, startXFrac: 1, midXFrac: 0.94, bendDY: -0.08, endXFrac: 0.84, opacity: 0.45 },
    // Two faint fillers in the gaps between the lines above — same
    // conservative reach (0.90+) as hero-edge-3/-4 since they also sit
    // roughly at the house's height.
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
    // New: fills the 0.40–0.66 gap — very conservative reach, mid-height
    // near the house, kept minimal like hero-edge-3.
    { id: "hero-edge-r3", yFrac: 0.53, startXFrac: 1, midXFrac: 0.95, bendDY: -0.05, endXFrac: 0.90, opacity: 0.35 },
    // New: extreme top-right and bottom-right corners — clear of the house
    // at any rotation, safe to reach further.
    { id: "hero-edge-r4", yFrac: 0.04, startXFrac: 1, midXFrac: 0.92, bendDY: 0.04, endXFrac: 0.84, opacity: 0.4 },
    { id: "hero-edge-r5", yFrac: 0.97, startXFrac: 1, midXFrac: 0.90, bendDY: -0.04, endXFrac: 0.80, opacity: 0.4 },
  ];
  const RIGHT_TRACE_START = TRACE_START + (CABLE_SPECS.length + topLeftCables.length) * TRACE_STAGGER + TRACE_DUR + 0.4;
  const builtRightEdge = rightEdgeCables.flatMap((spec, i) =>
    withTiming(buildFractionCableSegments(spec), RIGHT_TRACE_START + i * EDGE_STAGGER),
  );

  const allBuilt = [...built, ...builtTopLeft, ...builtRightEdge];
  // Ambient-only (never the diamond fan) — the set that gets PCB-via pad marks.
  const allAmbient = [...builtTopLeft, ...builtRightEdge];

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

      {/* Cable traces — drawn in from their origin outward (static at reduced motion).
          Opacity varies per segment (branches read as fainter, further-back
          traces than their trunk) instead of one flat value for every line. */}
      {allBuilt.map((c) => (
        <path
          key={`p-${c.id}`}
          id={c.id}
          d={c.d}
          fill="none"
          stroke={`rgba(255,255,255,${c.opacity})`}
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
          <circle cx={c.endX} cy={c.endY} r={3} fill="#C5895B" opacity={0.60} />
        </g>
      ))}

      {/* PCB-via pad marks — small diamond nodes at each bend of the ambient
          (non-diamond-fan) lines, echoing the reference circuit artwork's
          corner pads. Fades in alongside that segment's own terminal dot.
          Kept off the diamond-anchored fan entirely — those lines stay
          exactly as they were. */}
      {allAmbient.flatMap((c) => {
        const fadeAt = (c.start + TRACE_DUR - 0.15).toFixed(2);
        const padStyle = reduced ? undefined : { opacity: 0, animation: `hf-fade 0.4s ease ${fadeAt}s forwards` };
        const padOpacity = Math.min(c.opacity * 2.4, 0.7);
        const pads = c.vertices.map((v, i) => (
          <g key={`via-${c.id}-${i}`} style={padStyle}>
            <path
              d={`M ${v.x} ${v.y - 5} L ${v.x + 5} ${v.y} L ${v.x} ${v.y + 5} L ${v.x - 5} ${v.y} Z`}
              fill="#FFFFFF"
              opacity={padOpacity}
            />
          </g>
        ));
        // Junction hubs (where a trunk splits into branches) get a slightly
        // larger copper pad instead — reads as the "active node" the branches
        // fan out from, matching the reference image's lit-up hub points.
        if (c.isJunction) {
          pads.push(
            <g key={`via-hub-${c.id}`} style={padStyle}>
              <path
                d={`M ${c.endX} ${c.endY - 6} L ${c.endX + 6} ${c.endY} L ${c.endX} ${c.endY + 6} L ${c.endX - 6} ${c.endY} Z`}
                fill="#C5895B"
                opacity={0.7}
              />
            </g>,
          );
        }
        return pads;
      })}

      {/* Traveling current glow — the logo's pulse, carried through the
          lines: a soft blurred highlight flowing through each cable once
          it's traced in, rather than discrete dots/rings. Each of the
          PULSES_PER_LINE packets is its own path with a single dash, so its
          stroke-dashoffset always starts at 0 (the path's own origin) the
          moment it's introduced — instead of pre-seeding several evenly-
          spaced dashes on one shared path, which made every packet but the
          first appear to pop in already partway down the line. Junctions
          don't get their own glow; it continues visually via the glow on
          each branch. */}
      {!reduced && allBuilt.filter((c) => !c.isJunction).flatMap((c) => {
        const baseBegin = c.start + TRACE_DUR;
        return Array.from({ length: PULSES_PER_LINE }, (_, i) => {
          const begin = (baseBegin + i * (ANIM_DURATION / PULSES_PER_LINE)).toFixed(2);
          return (
            <path
              key={`g-${c.id}-${i}`}
              d={c.d}
              fill="none"
              stroke="#E8943A"
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
