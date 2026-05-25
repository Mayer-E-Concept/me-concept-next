"use client";
import { useState } from "react";

const FEATURES = [
  {
    title: "Proiectare BIM nativă în Revit",
    desc: "Planificare electrică completă în Autodesk Revit — modele 3D coordonate cu arhitectura și HVAC, documentație LP 1–5 conform normativelor în vigoare.",
  },
  {
    title: "Certificare ISO 9001:2015",
    desc: "Sistem de management al calității certificat SKYCERT. Procese documentate, trasabilitate completă, audituri periodice — garanția unui partener de încredere.",
  },
  {
    title: "Standarde HOAI · DIN · VDE",
    desc: "Proiecte conform standardelor germane și europene. Experiență directă cu clienți din Germania, Austria și Elveția — comunicare fluentă în română și germană.",
  },
  {
    title: "Rezidențial & Comercial",
    desc: "De la case individuale la ansambluri de 300+ unități. Proiecte rezidențiale, retail, birouri, grădinițe, clădiri de patrimoniu — toate fazele LP.",
  },
  {
    title: "Calcul tehnic Dialux & Simaris",
    desc: "Simulări de iluminat cu Dialux Evo și calcul de protecții cu Siemens Simaris. Rezultate certificate, optimizate energetic, documentate complet.",
  },
  {
    title: "Smart Home & KNX",
    desc: "Automatizare KNX, integrare fotovoltaică, planificare tuburi goale pentru upgrade ulterior. Clădiri inteligente livrate la cheie.",
  },
];

export function FeaturesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="servicii"
      style={{
        position: "relative",
        background: "#FFFFFF",
        paddingTop: "clamp(72px, 9vw, 130px)",
        paddingBottom: "clamp(72px, 9vw, 130px)",
      }}
    >
      {/* Eyebrow label */}
      <div
        style={{
          position: "absolute",
          top: "clamp(40px, 5vw, 70px)",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-sans)",
          fontSize: "11.5px",
          fontWeight: 600,
          letterSpacing: "0.22em",
          color: "#0F4C5C",
          whiteSpace: "nowrap",
        }}
      >
        PUNCTE FORTE
      </div>

      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                position: "relative",
                background: "#F6F7F7",
                border: `1px solid ${hoveredIdx === i ? "#C5895B" : "#D8DCDE"}`,
                borderRadius: 12,
                padding: "36px 32px",
                overflow: "hidden",
                transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
                transform: hoveredIdx === i ? "translateY(-6px)" : "translateY(0)",
                boxShadow: hoveredIdx === i
                  ? "0 1px 2px rgba(20,24,31,0.04), 0 12px 32px rgba(20,24,31,0.08)"
                  : "none",
                cursor: "default",
              }}
            >
              {/* Copper top border line on hover */}
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
                  fontSize: 19,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: "#0E323D",
                  marginBottom: 14,
                  lineHeight: 1.25,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14.5px",
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
