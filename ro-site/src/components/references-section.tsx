import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { SectionDivider } from "@/components/section-divider";

/* Teaser referințe pe homepage — dovada concretă, cu link spre portofoliu. */

const REFS = [
  {
    id: "rewe",
    category: "Comerț & Smart-Building",
    title: "REWE + Centru Sportiv",
    spec: "LPH 1–7 · ~2.500 m²",
    img: "/uploads/referinte/render-1.jpg",
    award: null,
  },
  {
    id: "group7",
    category: "Industrie & Energie",
    title: "Sediu & Logistică GROUP7",
    spec: "Birouri 5.000 m² · PV ~100 gospodării",
    img: "/uploads/referinte/render-2.jpg",
    award: null,
  },
  {
    id: "villa-maxima",
    category: "Rezidențial & Monument",
    title: "Villa MAXIMA – München",
    spec: "120 unități · 3 clădiri monument",
    img: "/uploads/referinte/render-3.jpg",
    award: "BIM-Preis Bayern 2025",
  },
  {
    id: "get-h2",
    category: "Energie & Infrastructură",
    title: "GET H₂ Nukleus – RWE",
    spec: "Electroliză H₂ · Lingen, Emsland",
    img: "/uploads/referinte/render-4.jpg",
    award: null,
  },
];

export function ReferencesSection() {
  return (
    <section
      style={{
        position: "relative",
        background: "#071C26",
        paddingTop: "clamp(72px, 9vw, 110px)",
        paddingBottom: "clamp(72px, 9vw, 110px)",
        overflow: "hidden",
      }}
    >
      <SectionDivider />

      <style>{`
        @media (max-width: 1023px) {
          .refs-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .refs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>


      <div style={{ position: "relative", zIndex: 1, maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
            marginBottom: "clamp(36px, 4.5vw, 56px)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#C5895B",
                marginBottom: 16,
              }}
            >
              Referințe — Germania
            </div>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(28px, 3.2vw, 44px)",
                fontWeight: 800,
                letterSpacing: "-0.022em",
                lineHeight: 1.1,
                color: "#F4F2EC",
                maxWidth: "24ch",
                margin: 0,
              }}
            >
              Proiecte care ne recomandă
            </h2>
          </div>
          <Link
            href="/portofoliu"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#C5895B",
              textDecoration: "none",
              paddingBottom: 4,
              borderBottom: "1.5px solid rgba(197,137,91,0.4)",
              whiteSpace: "nowrap",
            }}
          >
            Vezi portofoliul complet →
          </Link>
        </div>

        <div
          className="refs-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {REFS.map((r, i) => (
            <FadeIn key={r.id} delay={(i % 4) * 100}>
              <div
                style={{
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                  <Image
                    src={r.img}
                    alt={r.title}
                    width={420}
                    height={236}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      filter: "brightness(0.7) saturate(0.85)",
                    }}
                  />
                  {r.award && (
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        background: "#C5895B",
                        color: "#051E27",
                        fontFamily: "var(--font-sans)",
                        fontSize: "9px",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        padding: "4px 9px",
                        borderRadius: 6,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.award}
                    </div>
                  )}
                </div>
                <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#C5895B",
                    }}
                  >
                    {r.category}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(15px, 1.4vw, 17px)",
                      fontWeight: 700,
                      color: "#F4F2EC",
                      letterSpacing: "-0.015em",
                      lineHeight: 1.25,
                      margin: 0,
                    }}
                  >
                    {r.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12.5px",
                      color: "rgba(244,242,236,0.5)",
                      lineHeight: 1.5,
                      marginTop: "auto",
                    }}
                  >
                    {r.spec}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
