"use client";
import { useState } from "react";
import {
  CABLE_SPECS,
  buildCableSegments,
  useDiamondLayout,
  TRACE_START,
  TRACE_DUR,
  TRACE_STAGGER,
  type BranchSpec,
  type CableSegment,
} from "@/components/hero-filaments-data";

const DOT_RADIUS     = 3.5;
const ANIM_DURATION  = 5; // seconds per full path traversal
const DOTS_PER_LINE  = 3;
const EDGE_STAGGER   = 0.4;  // s between the right-side ambient cables
const BRANCH_STAGGER = 0.15; // s between a trunk's own branches

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
  opacity?: number;
  branches?: BranchSpec[];
};

/** Attach `start` (trace-in delay) to each segment of a built cable: the
    trunk starts at `trunkStart`; each branch starts once the trunk has
    finished drawing, staggered slightly from each other. */
function withTiming(segments: CableSegment[], trunkStart: number) {
  return segments.map((seg, i) =>
    i === 0
      ? { ...seg, start: trunkStart }
      : { ...seg, start: trunkStart + TRACE_DUR + (i - 1) * BRANCH_STAGGER },
  );
}

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
      return { d: `M ${sx} ${sy} H ${mx}`, endX: mx, endY: sy };
    }
    const dir = Math.sign(mx - sx) || 1;
    const dy = spec.bendDY * heroH;
    const x2 = mx + dir * Math.abs(dy);
    const y2 = sy + dy;
    return { d: `M ${sx} ${sy} H ${mx} L ${x2} ${y2}`, endX: x2, endY: y2 };
  };

  const buildFractionCableSegments = (spec: FractionCableSpec): CableSegment[] => {
    const trunk = buildFractionCable(spec);
    const trunkOpacity = spec.opacity ?? 0.5;
    const segments: CableSegment[] = [
      {
        id: spec.id,
        d: trunk.d,
        endX: trunk.endX,
        endY: trunk.endY,
        isJunction: !!spec.branches?.length,
        opacity: trunkOpacity,
      },
    ];
    spec.branches?.forEach((b, i) => {
      const hubX = trunk.endX;
      const hubY = trunk.endY;
      const btx = heroW * b.endXFrac;
      const dir = Math.sign(btx - hubX) || 1;
      const bx1 = hubX + dir * b.depart;
      const bBend = b.bendDY * heroH;
      const bx2 = bx1 + dir * Math.abs(bBend);
      const by2 = hubY + bBend;
      segments.push({
        id: `${spec.id}-b${i}`,
        d: `M ${hubX} ${hubY} H ${bx1} L ${bx2} ${by2} H ${btx}`,
        endX: btx,
        endY: by2,
        isJunction: false,
        opacity: b.opacity ?? trunkOpacity,
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
      id: "hero-topleft-1", yFrac: 0.08, startXFrac: 0, midXFrac: 0.15, bendDY: 0.07,
      branches: [{ depart: 30, bendDY: 0.05, endXFrac: 0.26, opacity: 0.08 }],
    },
    {
      id: "hero-topleft-2", yFrac: 0.18, startXFrac: 0, midXFrac: 0.17, bendDY: 0.03,
      branches: [{ depart: 30, bendDY: 0.04, endXFrac: 0.28, opacity: 0.08 }],
    },
    // Filler for the empty band directly under the nav divider — kept at a
    // very low yFrac with almost no bend so it stays well above the roof
    // regardless of its x-range (yFrac 0.28 previously put its flat segment
    // right through the house's upper section — that was the real "random
    // line on the roof" bug, not hero-fill-topA, which was a red herring and
    // has been removed).
    {
      id: "hero-fill-topB", yFrac: 0.05, startXFrac: 0.60, midXFrac: 0.80, bendDY: 0.04,
      opacity: 0.09,
    },
    // A little more under the nav, between the top-left cluster and hero-fill-topB.
    {
      id: "hero-fill-topC", yFrac: 0.04, startXFrac: 0.22, midXFrac: 0.42, bendDY: 0.05,
      opacity: 0.13,
      branches: [{ depart: 30, bendDY: 0.04, endXFrac: 0.52, opacity: 0.08 }],
    },
    // Filler for the empty bottom-left corner, below the diamond and left of the stats.
    {
      id: "hero-fill-bottomleft", yFrac: 0.80, startXFrac: 0, midXFrac: 0.20, bendDY: 0.12,
      opacity: 0.09,
      branches: [{ depart: 25, bendDY: 0.08, endXFrac: 0.32, opacity: 0.07 }],
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
      id: "hero-edge-1", yFrac: 0.12, startXFrac: 1, midXFrac: 0.88, bendDY: -0.18,
      branches: [{ depart: 25, bendDY: -0.08, endXFrac: 0.74, opacity: 0.08 }],
    },
    {
      id: "hero-edge-2", yFrac: 0.40, startXFrac: 1, midXFrac: 0.90, bendDY: -0.14,
      branches: [{ depart: 20, bendDY: -0.06, endXFrac: 0.80, opacity: 0.08 }],
    },
    // Sits right at the house's own height — pulled almost all the way to the
    // edge with a very slight bend, since the house rotates and even a small
    // dip/reach here risks grazing it. No branch — kept minimal on purpose.
    { id: "hero-edge-3", yFrac: 0.66, startXFrac: 1, midXFrac: 0.96, bendDY: 0.05 },
    // Shortened — the house rotates continuously and its silhouette swings
    // wide enough at some angles to reach this line if it runs any longer.
    // bendDY pulled back from -0.20 to -0.08: that steeper bend swept its
    // endpoint up into the house's bottom-right corner. No branch here either.
    { id: "hero-edge-4", yFrac: 0.89, startXFrac: 1, midXFrac: 0.94, bendDY: -0.08 },
    // Two new faint fillers in the gaps between the lines above — same
    // conservative reach (0.91+) as hero-edge-3/-4 since they also sit
    // roughly at the house's height.
    {
      id: "hero-edge-r1", yFrac: 0.25, startXFrac: 1, midXFrac: 0.91, bendDY: -0.10,
      opacity: 0.15,
      branches: [{ depart: 20, bendDY: -0.05, endXFrac: 0.78, opacity: 0.08 }],
    },
    {
      id: "hero-edge-r2", yFrac: 0.78, startXFrac: 1, midXFrac: 0.93, bendDY: 0.08,
      opacity: 0.15,
      branches: [{ depart: 18, bendDY: 0.04, endXFrac: 0.80, opacity: 0.08 }],
    },
  ];
  const RIGHT_TRACE_START = TRACE_START + (CABLE_SPECS.length + topLeftCables.length) * TRACE_STAGGER + TRACE_DUR + 0.4;
  const builtRightEdge = rightEdgeCables.flatMap((spec, i) =>
    withTiming(buildFractionCableSegments(spec), RIGHT_TRACE_START + i * EDGE_STAGGER),
  );

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

      {/* Destination terminals — fade in as their cable completes. Junctions
          (a trunk that splits into branches) skip the dot — the line just
          continues into its branches instead of terminating. */}
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
          {!reduced && (
            <circle cx={c.endX} cy={c.endY} r={3} fill="none" stroke="#C5895B" strokeWidth={1.0}>
              <animate attributeName="r"       values="3;8;3"       dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.50;0;0.50" dur="2.4s" repeatCount="indefinite" />
            </circle>
          )}
          <circle cx={c.endX} cy={c.endY} r={3} fill="#C5895B" opacity={0.60} />
        </g>
      ))}

      {/* Current packets — start flowing only after their cable is traced.
          Junctions don't get their own packets; the flow continues visually
          via the packets on each branch instead. */}
      {!reduced && allBuilt.filter((c) => !c.isJunction).map((c) =>
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
