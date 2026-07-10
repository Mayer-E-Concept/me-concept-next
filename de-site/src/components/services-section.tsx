"use client";
import { useState } from "react";
import { SectionDivider } from "@/components/section-divider";
import { ServicesDiagramDe } from "@/components/services-diagram";

const SERVICES_LEFT = [
  { title: "Individuelle Beratung", desc: "Wir passen Projekte an die spezifischen Bedürfnisse jedes Kunden an, um optimale Ergebnisse zu garantieren." },
  { title: "Planung von Steckdosen und Schaltern", desc: "Strategische Planung für maximalen Komfort und Erreichbarkeit in jedem Raum." },
  { title: "Beleuchtungspunkte und 3D-Lichtplanung", desc: "Wir planen hochwertige Beleuchtungslösungen für alle Räume, einschließlich Balkone und Terrassen." },
  { title: "Abluftventilation in Bädern", desc: "Wir gewährleisten die korrekte Belüftung für ein gesundes Raumklima in jedem Bad." },
  { title: "Stromzähler und Sicherungsverteilung", desc: "Effiziente und sichere Lösungen für die Stromversorgung und den Schutz des elektrischen Systems." },
  { title: "Elektroanschluss", desc: "Planung und Koordination des Elektroanschlusses für die Verbindung mit dem Versorgungsnetz unter Einhaltung aller geltenden Vorschriften." },
];

const SERVICES_RIGHT = [
  { title: "Thermostate und Temperatursteuerung", desc: "Wir planen und installieren Umgebungsthermostaten für präzise Temperaturkontrolle in jedem Raum." },
  { title: "Intelligente Haussteuerung", desc: "Automatisierungen für Licht, Temperatur, Sicherheit und Haushaltsgeräte, steuerbar über mobile Apps." },
  { title: "Anschlüsse für Großgeräte", desc: "Zusätzliche Versorgungspunkte für Großgeräte, insbesondere in der Küche." },
  { title: "Video-Türsprechanlage", desc: "Wir planen Video-Türsprechanlagensysteme für zusätzliche Sicherheit und Komfort." },
  { title: "Ausführungskontrolle", desc: "Wir bieten Ausführungskontrollen an, um die Konformität und Qualität der durchgeführten Arbeiten sicherzustellen." },
  { title: "Unterstützung bei der Elektrikersuche", desc: "Wir helfen Kunden, einen qualifizierten Elektriker zu finden, und stellen das Leistungsverzeichnis bereit, um sicherzustellen, dass die Ausführung gemäß dem Projekt verläuft." },
];

export function ServicesSectionDe() {
  const [hovered, setHovered] = useState<string | null>(null);

  const serviceItem = (
    item: { title: string; desc: string },
    key: string,
    column: 1 | 2,
    row: number,
  ) => (
    <li
      key={key}
      onMouseEnter={() => setHovered(key)}
      onMouseLeave={() => setHovered(null)}
      style={{
        position: "relative",
        gridColumn: column,
        gridRow: row,
        padding: "18px 0 18px 48px",
        borderBottom: "1px solid rgba(143,224,232,0.10)",
        cursor: "default",
        transition: "padding-left .2s ease",
        paddingLeft: hovered === key ? 52 : 48,
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: 28,
          height: 28,
          background: hovered === key ? "#8FE0E8" : "rgba(143,224,232,0.15)",
          borderRadius: 6,
          transition: "background .25s ease",
          display: "block",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: 16,
          color: hovered === key ? "#072327" : "#8FE0E8",
          lineHeight: 1,
          transition: "color .25s ease",
          zIndex: 1,
        }}
      >
        +
      </span>
      <strong
        style={{
          fontFamily: "var(--font-barlow)",
          fontWeight: 600,
          fontSize: "clamp(13px, 1vw, 14.5px)",
          color: hovered === key ? "#8FE0E8" : "#F2FBFC",
          display: "block",
          marginBottom: 2,
          transition: "color .2s ease",
          lineHeight: 1.35,
        }}
      >
        {item.title}
      </strong>
      <span
        style={{
          fontFamily: "var(--font-barlow)",
          fontWeight: 400,
          fontSize: "13px",
          color: hovered === key ? "rgba(143,224,232,0.80)" : "rgba(143,224,232,0.55)",
          lineHeight: 1.55,
          transition: "color .2s ease",
        }}
      >
        {item.desc}
      </span>
    </li>
  );

  return (
    <section
      style={{
        position: "relative",
        paddingTop: "clamp(72px, 9vw, 130px)",
        paddingBottom: "clamp(72px, 9vw, 130px)",
        overflow: "hidden",
      }}
    >
      <SectionDivider />
      <style>{`
        @media (max-width: 767px) {
          .services-top-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .services-lists-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .services-lists-grid > li { grid-column: 1 !important; grid-row: auto !important; }
        }
      `}</style>

      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="services-top-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(24px, 4vw, 60px)",
            alignItems: "center",
            marginBottom: "clamp(40px, 5vw, 64px)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-plex-mono)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#8FE0E8",
                marginBottom: 18,
              }}
            >
              Wohnprojekte
            </div>
            <h2
              style={{
                fontFamily: "var(--font-barlow)",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                color: "#F2FBFC",
                maxWidth: "22ch",
              }}
            >
              Für Ihr Zuhause: komplette Elektroplanung, vom Hausanschluss bis zum Smart Home
            </h2>
          </div>
          <div>
            <ServicesDiagramDe />
          </div>
        </div>

        {/* Two columns of services — a single grid so each left/right pair
            shares a row and stretches to match height, keeping the "+"
            markers aligned regardless of text length. */}
        <ul
          className="services-lists-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "clamp(0px, 4vw, 60px)",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {SERVICES_LEFT.map((s, i) => serviceItem(s, `L${i}`, 1, i + 1))}
          {SERVICES_RIGHT.map((s, i) => serviceItem(s, `R${i}`, 2, i + 1))}
        </ul>
      </div>
    </section>
  );
}
