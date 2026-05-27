"use client";
import { useState } from "react";

const FEATURES = [
  {
    title: "Individuelle Beratung",
    desc: "Wir bieten maßgeschneiderte Elektrolösungen, die perfekt zu Ihrem Projekt passen. Ob Wohn-, Gewerbe- oder Industriegebäude – wir begleiten Sie von der Idee bis zur Umsetzung.",
    icon: "01",
  },
  {
    title: "Planung nach höchsten Standards",
    desc: "Unser erfahrenes Team nutzt modernste Technologien und hält alle lokalen und internationalen Vorschriften ein, einschließlich HOAI, DIN und VDE. Unsere Projekte vereinen Sicherheit, Effizienz und Innovation für erstklassige Ergebnisse.",
    icon: "02",
  },
  {
    title: "Qualitätszertifizierungen",
    desc: "Wir sind ISO 9001:2015-zertifiziert, was die Qualität und Professionalität unserer Arbeit belegt. Unsere Kunden profitieren von hohen Standards und einem beständigen Streben nach Exzellenz.",
    icon: "03",
  },
  {
    title: "Effizienz und Präzision",
    desc: "Wir wissen, dass Zeit das Wesentliche ist – daher verpflichten wir uns, vereinbarte Fristen einzuhalten und Lösungen anzubieten, die Kosten und Ressourcen optimieren.",
    icon: "04",
  },
  {
    title: "Fundierte Erfahrung",
    desc: "Mit über 20 Jahren Erfahrung in der Elektroplanung sind wir bereit, jedes Projekt in die Realität umzusetzen – mit einem klaren Fokus auf Sicherheit und Zuverlässigkeit.",
    icon: "05",
  },
  {
    title: "Vertrauen und Transparenz",
    desc: "In jedem Projekt arbeiten wir eng mit unseren Kunden zusammen und sorgen für vollständige Transparenz und offene Kommunikation, um die gewünschte Zufriedenheit zu sichern und dauerhafte Beziehungen aufzubauen.",
    icon: "06",
  },
];

export function FeaturesSectionDe() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="leistungen"
      style={{
        position: "relative",
        background: "#F6F7F7",
        paddingTop: "clamp(72px, 9vw, 130px)",
        paddingBottom: "clamp(72px, 9vw, 130px)",
        scrollMarginTop: "72px",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 40,
            marginBottom: "clamp(40px, 5vw, 64px)",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C5895B",
                marginBottom: 14,
              }}
            >
              Unsere Stärken
            </div>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "#0E323D",
                maxWidth: "22ch",
                margin: 0,
              }}
            >
              Warum Mayer E-Concept wählen
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 1.1vw, 16px)",
              lineHeight: 1.7,
              color: "#335058",
              maxWidth: "46ch",
              margin: 0,
            }}
          >
            Die Elektroplanung für Bauprojekte ist unser Kerngeschäft – ein Bereich, der sich in einem
            ständigen Prozess der Verbesserung und des Fortschritts befindet, um schnell und entsprechend
            den Erwartungen unserer Kunden zu reagieren.
          </p>
        </div>

        <div
          className="features-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 2,
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                position: "relative",
                background: "#FFFFFF",
                border: "1px solid #E2E5E6",
                borderRadius: 0,
                padding: "36px 32px 32px",
                overflow: "hidden",
                transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
                transform: hoveredIdx === i ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hoveredIdx === i ? "0 8px 32px rgba(14,50,61,0.10)" : "none",
                cursor: "default",
                borderColor: hoveredIdx === i ? "#C5895B" : "#E2E5E6",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: 2,
                  width: hoveredIdx === i ? "100%" : "0%",
                  background: "#C5895B",
                  transition: "width .35s ease",
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(16px, 1.3vw, 19px)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: "#0E323D",
                  marginBottom: 12,
                  lineHeight: 1.25,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  lineHeight: 1.65,
                  color: "#335058",
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
