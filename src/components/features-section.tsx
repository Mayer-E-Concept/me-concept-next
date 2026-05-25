"use client";
import { useState } from "react";

const FEATURES = [
  {
    title: "Consultanța Personalizata",
    desc: "Îți oferim soluții electrice personalizate care se potrivesc perfect proiectului tău. Fie că este vorba de un sistem rezidențial, comercial sau industrial, îți stăm alături de la concept până la implementare.",
  },
  {
    title: "Proiectare la Standard Înalt",
    desc: "Avem o echipă experimentată care folosește cele mai recente tehnologii și respectă toate reglementările locale și internaționale, inclusiv HOAI, DIN și VDE. Proiectele noastre îmbină siguranța, eficiența și inovația pentru rezultate de top.",
  },
  {
    title: "Certificări de Calitate",
    desc: "Suntem certificați ISO 9001:2015, ceea ce atestă calitatea și profesionalismul lucrărilor noastre. Clienții noștri beneficiază de standarde ridicate și de un angajament constant pentru perfecțiune.",
  },
  {
    title: "Eficiență și Precizie",
    desc: "Știm că timpul este esențial, de aceea ne angajăm să respectăm termenele stabilite și să oferim soluții care optimizează costurile și resursele.",
  },
  {
    title: "Experiența Solidă",
    desc: "Cu peste 20 de ani de experiență în proiectarea instalațiilor electrice, suntem pregătiți să transformăm orice proiect în realitate, având o viziune clară asupra siguranței și fiabilității.",
  },
  {
    title: "Încredere și Transparență",
    desc: "În fiecare proiect, colaborăm strâns cu clienții noștri, asigurând transparență totală și comunicare deschisă, astfel încât să asigurăm satisfacția dorită și să construim relații de durată.",
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
        {/* Intro paragraph */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 19,
            lineHeight: 1.6,
            color: "#0E323D",
            textAlign: "center",
            maxWidth: "72ch",
            margin: "0 auto clamp(40px, 5vw, 64px)",
          }}
        >
          Proiectarea instalațiilor pentru construcții reprezintă activitatea noastră de bază, activitate
          care este într-un continuu proces de îmbunătățire și progres, pentru a putea răspunde prompt și
          pe măsura așteptărilor clienților noștri.
        </p>

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
