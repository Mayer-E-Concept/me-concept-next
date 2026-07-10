import { MessageSquare, ToggleLeft, Lightbulb, Fan, Gauge, Cable, Thermometer, Smartphone, type LucideIcon } from "lucide-react";

/* Replaces the old raster ce-oferim-transparent.png (colorful pastel icons,
   Romanian text baked into the pixels, a bright halo that only worked on a
   light background). This is a plain line-art diagram built to match the
   site's own cyan schematic style — a lightbulb hub with 8 labelled spokes,
   in a fixed 700×460 design space. The SVG draws the bulb + connector lines;
   the icon+label chips are plain HTML positioned by percentage over the same
   design space, so both layers scale together. */

const VB_W = 700;
const VB_H = 460;
const BULB_CX = 350;
const BULB_CY = 226;

type Item = { label: string; icon: LucideIcon; y: number; bulbY: number; bulbX: number };

const LEFT: Item[] = [
  { label: "Consultanță Personalizată", icon: MessageSquare, y: 46, bulbX: 313, bulbY: 190 },
  { label: "Soluții de Iluminat", icon: Lightbulb, y: 175, bulbX: 294, bulbY: 213 },
  { label: "Contorizare Electrică", icon: Gauge, y: 285, bulbX: 294, bulbY: 247 },
  { label: "Controlul Temperaturii", icon: Thermometer, y: 414, bulbX: 313, bulbY: 268 },
];

const RIGHT: Item[] = [
  { label: "Prize și Întrerupătoare", icon: ToggleLeft, y: 46, bulbX: 387, bulbY: 190 },
  { label: "Ventilație în Băi", icon: Fan, y: 175, bulbX: 406, bulbY: 213 },
  { label: "Branșament Electric", icon: Cable, y: 285, bulbX: 406, bulbY: 247 },
  { label: "Automatizare Casă", icon: Smartphone, y: 414, bulbX: 387, bulbY: 268 },
];

function pct(v: number, total: number) {
  return `${(v / total) * 100}%`;
}

export function ServicesDiagram({ title = "Prezentare Generală a Serviciilor Electrice" }: { title?: string }) {
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

        {/* Hub — rounded box matching the small chip icons around it, with a house glyph. */}
        <g>
          <rect
            x={BULB_CX - 50}
            y={BULB_CY - 50}
            width={100}
            height={100}
            rx={18}
            fill="#8FE0E8"
            fillOpacity={0.1}
            stroke="#8FE0E8"
            strokeOpacity={0.25}
            strokeWidth={1.5}
          />
          <g transform={`translate(${BULB_CX - 20}, ${BULB_CY - 20}) scale(${40 / 24})`}>
            <path
              d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
              fill="none"
              stroke="#8FE0E8"
              strokeWidth={1.1}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
              fill="none"
              stroke="#8FE0E8"
              strokeWidth={1.1}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
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
