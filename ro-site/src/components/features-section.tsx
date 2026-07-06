"use client";
import { useState } from "react";
import { FadeIn } from "@/components/fade-in";

const FEATURES = [
  {
    title: "Consultanță Personalizată",
    desc: "Îți oferim soluții electrice personalizate care se potrivesc perfect proiectului tău. Fie că este vorba de un sistem rezidențial, comercial sau industrial, îți stăm alături de la concept până la implementare.",
    icon: "01",
  },
  {
    title: "Proiectare la Standard Înalt",
    desc: "Avem o echipă experimentată care folosește cele mai recente tehnologii și respectă toate reglementările locale și internaționale, inclusiv HOAI, DIN și VDE. Proiectele noastre îmbină siguranța, eficiența și inovația pentru rezultate de top.",
    icon: "02",
  },
  {
    title: "Certificări de Calitate",
    desc: "Suntem certificați ISO 9001:2015, ceea ce atestă calitatea și profesionalismul lucrărilor noastre. Clienții noștri beneficiază de standarde ridicate și de un angajament constant pentru perfecțiune.",
    icon: "03",
  },
  {
    title: "Eficiență și Precizie",
    desc: "Știm că timpul este esențial, de aceea ne angajăm să respectăm termenele stabilite și să oferim soluții care optimizează costurile și resursele.",
    icon: "04",
  },
  {
    title: "Experiență Solidă",
    desc: "Cu peste 20 de ani de experiență în proiectarea instalațiilor electrice, suntem pregătiți să transformăm orice proiect în realitate, având o viziune clară asupra siguranței și fiabilității.",
    icon: "05",
  },
  {
    title: "Încredere și Transparență",
    desc: "În fiecare proiect, colaborăm strâns cu clienții noștri, asigurând transparență totală și comunicare deschisă, astfel încât să asigurăm satisfacția dorită și să construim relații de durată.",
    icon: "06",
  },
];

export function FeaturesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="servicii"
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

      {/* linie cupru sus + textură circuit — limbajul premium al secțiunilor dark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, #C5895B 30%, #C5895B 70%, transparent)",
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
        {/* Header row */}
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
              Puncte forte
            </div>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "#F4F2EC",
                maxWidth: "22ch",
                margin: 0,
              }}
            >
              De ce să alegi Mayer E-Concept
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 1.1vw, 16px)",
              lineHeight: 1.7,
              color: "rgba(244,242,236,0.60)",
              maxWidth: "46ch",
              margin: 0,
            }}
          >
            Proiectarea instalațiilor pentru construcții reprezintă activitatea noastră de bază, activitate
            care este într-un continuu proces de îmbunătățire și progres, pentru a putea răspunde prompt
            și pe măsura așteptărilor clienților noștri.
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
                background: hoveredIdx === i ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.035)",
                border: "1px solid",
                borderRadius: 12,
                padding: "30px 30px 32px",
                overflow: "hidden",
                height: "100%",
                transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease, background .25s ease",
                transform: hoveredIdx === i ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hoveredIdx === i
                  ? "0 16px 40px rgba(0,0,0,0.35)"
                  : "none",
                cursor: "default",
                borderColor: hoveredIdx === i ? "rgba(197,137,91,0.55)" : "rgba(255,255,255,0.08)",
              }}
            >
              {/* Copper top accent */}
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
              {/* Numerotare inginerească — 01 ─── */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "12.5px",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    color: "#C5895B",
                  }}
                >
                  {f.icon}
                </span>
                <span aria-hidden style={{ height: 1, flex: 1, background: "rgba(197,137,91,0.22)" }} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(16px, 1.3vw, 19px)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: "#F4F2EC",
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
                  color: "rgba(244,242,236,0.55)",
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
