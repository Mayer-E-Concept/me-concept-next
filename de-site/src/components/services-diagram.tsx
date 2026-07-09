import { MessageSquare, ToggleLeft, Lightbulb, Fan, Gauge, Cable, Thermometer, Smartphone, type LucideIcon } from "lucide-react";

/* Replaces the old raster ce-oferim-transparent.png overlay (services-infographic.tsx —
   colorful pastel icons, a bright halo that only worked on a light background).
   This is a plain line-art diagram built to match the site's own cyan schematic
   style — a lightbulb hub with 8 labelled spokes, in a fixed 700×460 design
   space. The SVG draws the bulb + connector lines; the icon+label chips are
   plain HTML positioned by percentage over the same design space, so both
   layers scale together. */

const VB_W = 700;
const VB_H = 460;
const BULB_CX = 350;
const BULB_CY = 226;
const BULB_R = 58;

type Item = { label: string; icon: LucideIcon; y: number; bulbY: number; bulbX: number };

const LEFT: Item[] = [
  { label: "Individuelle Beratung", icon: MessageSquare, y: 46, bulbX: 313, bulbY: 190 },
  { label: "Beleuchtungslösungen", icon: Lightbulb, y: 175, bulbX: 294, bulbY: 213 },
  { label: "Stromzähler", icon: Gauge, y: 285, bulbX: 294, bulbY: 247 },
  { label: "Temperatursteuerung", icon: Thermometer, y: 414, bulbX: 313, bulbY: 268 },
];

const RIGHT: Item[] = [
  { label: "Steckdosen und Schalter", icon: ToggleLeft, y: 46, bulbX: 387, bulbY: 190 },
  { label: "Badlüftung", icon: Fan, y: 175, bulbX: 406, bulbY: 213 },
  { label: "Hausanschluss", icon: Cable, y: 285, bulbX: 406, bulbY: 247 },
  { label: "Smart-Home-Automation", icon: Smartphone, y: 414, bulbX: 387, bulbY: 268 },
];

function pct(v: number, total: number) {
  return `${(v / total) * 100}%`;
}

export function ServicesDiagramDe({ title = "Allgemeine Übersicht der Elektrodienstleistungen" }: { title?: string }) {
  const allItems = [...LEFT.map((it) => ({ ...it, side: "left" as const })), ...RIGHT.map((it) => ({ ...it, side: "right" as const }))];

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: `${VB_W} / ${VB_H}` }}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
        aria-hidden
      >
        <text
          x={VB_W / 2}
          y={16}
          textAnchor="middle"
          fill="#7FA2A6"
          style={{ fontFamily: "var(--font-plex-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}
        >
          {title}
        </text>

        {/* Connector lines — straight diagonal from each label chip to its
            point on the bulb's rim, with a small arrowhead. */}
        {allItems.map((it, i) => {
          const chipEdgeX = it.side === "left" ? 240 : 460;
          return (
            <g key={`ln-${i}`}>
              <path
                d={`M ${chipEdgeX} ${it.y} L ${it.bulbX} ${it.bulbY}`}
                stroke="#5AC9D4"
                strokeOpacity={0.4}
                strokeWidth={1.5}
                fill="none"
              />
              <circle cx={it.bulbX} cy={it.bulbY} r={2.5} fill="#8FE0E8" opacity={0.75} />
            </g>
          );
        })}

        {/* Lightbulb — glass dome + filament + screw base, plain line-art. */}
        <g>
          <path
            d={`M ${BULB_CX - BULB_R} ${BULB_CY}
                A ${BULB_R} ${BULB_R} 0 1 1 ${BULB_CX + BULB_R} ${BULB_CY}
                Q ${BULB_CX + BULB_R * 0.55} ${BULB_CY + BULB_R * 0.85} ${BULB_CX + 16} ${BULB_CY + BULB_R * 0.98}
                L ${BULB_CX - 16} ${BULB_CY + BULB_R * 0.98}
                Q ${BULB_CX - BULB_R * 0.55} ${BULB_CY + BULB_R * 0.85} ${BULB_CX - BULB_R} ${BULB_CY}
                Z`}
            fill="none"
            stroke="#5AC9D4"
            strokeOpacity={0.7}
            strokeWidth={2}
            strokeLinejoin="round"
          />
          {/* Screw base */}
          <rect x={BULB_CX - 15} y={BULB_CY + BULB_R * 0.98} width={30} height={9} fill="none" stroke="#5AC9D4" strokeOpacity={0.7} strokeWidth={1.6} />
          <path d={`M ${BULB_CX - 15} ${BULB_CY + BULB_R * 0.98 + 4.5} H ${BULB_CX + 15}`} stroke="#5AC9D4" strokeOpacity={0.5} strokeWidth={1} />
          <rect x={BULB_CX - 11} y={BULB_CY + BULB_R * 0.98 + 9} width={22} height={7} rx={2} fill="none" stroke="#5AC9D4" strokeOpacity={0.7} strokeWidth={1.6} />
          {/* Filament */}
          <path
            d={`M ${BULB_CX - 14} ${BULB_CY + 14} L ${BULB_CX - 8} ${BULB_CY - 8} L ${BULB_CX} ${BULB_CY + 6} L ${BULB_CX + 8} ${BULB_CY - 8} L ${BULB_CX + 14} ${BULB_CY + 14}`}
            fill="none"
            stroke="#8FE0E8"
            strokeOpacity={0.85}
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      {/* Icon + label chips — plain HTML, positioned over the same design space.
          Icon sits on the side nearest the bulb for both columns; label text
          sits further out. */}
      {allItems.map((it, i) => {
        const Icon = it.icon;
        const isLeft = it.side === "left";
        return (
          <div
            key={`chip-${i}`}
            style={{
              position: "absolute",
              top: pct(it.y, VB_H),
              ...(isLeft ? { right: pct(VB_W - 240, VB_W) } : { left: pct(460, VB_W) }),
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: isLeft ? "row-reverse" : "row",
              alignItems: "center",
              gap: 8,
              maxWidth: pct(210, VB_W),
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 28,
                height: 28,
                borderRadius: 6,
                background: "rgba(143,224,232,0.10)",
                border: "1px solid rgba(143,224,232,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={15} color="#8FE0E8" strokeWidth={1.75} />
            </span>
            <span
              style={{
                fontFamily: "var(--font-barlow)",
                fontSize: 12.5,
                fontWeight: 600,
                lineHeight: 1.3,
                color: "#A9C9CC",
                textAlign: isLeft ? "right" : "left",
              }}
            >
              {it.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
