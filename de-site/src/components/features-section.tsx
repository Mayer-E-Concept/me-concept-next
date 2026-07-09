"use client";
import { useState } from "react";
import { FadeIn } from "@/components/fade-in";

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
        background: "#0E323D",
        paddingTop: "clamp(72px, 9vw, 130px)",
        paddingBottom: "clamp(72px, 9vw, 130px)",
        scrollMarginTop: "72px",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Kupferlinie oben + Schaltkreis-Textur — Premium-Sprache der dunklen Sektionen */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, #5AC9D4 30%, #5AC9D4 70%, transparent)",
          opacity: 0.45,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: 'url("/assets/circuit-pattern.svg")',
          backgroundSize: "260px 260px",
          filter: "invert(1)",
          opacity: 0.03,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
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
                fontFamily: "var(--font-plex-mono)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#8FE0E8",
                marginBottom: 14,
              }}
            >
              Unsere Stärken
            </div>
            <h2
              style={{
                fontFamily: "var(--font-barlow)",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "#F2FBFC",
                maxWidth: "22ch",
                margin: 0,
              }}
            >
              Warum Mayer E-Concept wählen
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "clamp(14px, 1.1vw, 16px)",
              lineHeight: 1.7,
              color: "#A9C9CC",
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
            gap: 16,
          }}
        >
          {FEATURES.map((f, i) => (
            <FadeIn key={f.title} delay={(i % 3) * 100}>
            <div
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                position: "relative",
                background: "#0B373D",
                border: "1px solid",
                borderRadius: 12,
                padding: "30px 30px 32px",
                overflow: "hidden",
                height: "100%",
                transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease, background .25s ease",
                transform: hoveredIdx === i ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hoveredIdx === i ? "0 16px 40px rgba(0,0,0,0.35)" : "none",
                cursor: "default",
                borderColor: hoveredIdx === i ? "rgba(143,224,232,0.55)" : "rgba(143,224,232,0.12)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: 2,
                  width: hoveredIdx === i ? "100%" : "0%",
                  background: "#5AC9D4",
                  transition: "width .35s ease",
                }}
              />
              {/* Technische Nummerierung — 01 ─── */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <span
                  style={{
                    fontFamily: "var(--font-plex-mono)",
                    fontSize: "12.5px",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    color: "#8FE0E8",
                  }}
                >
                  {f.icon}
                </span>
                <span aria-hidden style={{ height: 1, flex: 1, background: "rgba(143,224,232,0.22)" }} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-barlow)",
                  fontSize: "clamp(16px, 1.3vw, 19px)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: "#F2FBFC",
                  marginBottom: 12,
                  lineHeight: 1.25,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-barlow)",
                  fontSize: "14px",
                  lineHeight: 1.65,
                  color: "#A9C9CC",
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                {f.desc}
              </p>
            </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
