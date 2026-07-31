"use client";
import { useState } from "react";
import { FadeIn } from "@/components/fade-in";
import { SectionDivider } from "@/components/section-divider";

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
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .features-card-body { padding: 16px 16px 18px !important; }
          .features-card-title { font-size: 14px !important; margin-bottom: 8px !important; }
          .features-card-desc { font-size: 12px !important; line-height: 1.5 !important; }
        }
      `}</style>

      {/* linie cupru sus + textură circuit — limbajul premium al secțiunilor dark */}
      <SectionDivider />
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
                fontFamily: "var(--font-plex-mono)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#8FE0E8",
                marginBottom: 14,
              }}
            >
              Puncte forte
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
              De ce să alegi Mayer E-Concept
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
              className="features-card-body"
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
                boxShadow: hoveredIdx === i
                  ? "0 16px 40px rgba(0,0,0,0.35)"
                  : "none",
                cursor: "default",
                borderColor: hoveredIdx === i ? "rgba(143,224,232,0.55)" : "rgba(143,224,232,0.12)",
              }}
            >
              {/* Cyan top accent */}
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
              {/* Numerotare inginerească — 01 ─── */}
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
                className="features-card-title"
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
                className="features-card-desc"
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
