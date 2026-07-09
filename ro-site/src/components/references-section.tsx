import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { SectionDivider } from "@/components/section-divider";
import { FEATURED_PROJECTS } from "@/components/featured-projects-data";

/* Teaser referințe pe homepage — card simplu (nu cardul bogat de pe pagina
   de portofoliu), dar cu aceleași date (categorie/titlu/specificații) ca
   FEATURED_PROJECTS, ca cele două pagini să nu mai poată desincroniza. */

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
                fontFamily: "var(--font-plex-mono)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#8FE0E8",
                marginBottom: 16,
              }}
            >
              Referințe — Germania
            </div>
            <h2
              style={{
                fontFamily: "var(--font-barlow)",
                fontSize: "clamp(28px, 3.2vw, 44px)",
                fontWeight: 800,
                letterSpacing: "-0.022em",
                lineHeight: 1.1,
                color: "#F2FBFC",
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
              fontFamily: "var(--font-plex-mono)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8FE0E8",
              textDecoration: "none",
              paddingBottom: 4,
              borderBottom: "1.5px solid rgba(143,224,232,0.4)",
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
          {FEATURED_PROJECTS.map((p, i) => (
            <FadeIn key={p.id} delay={(i % 4) * 100}>
              <div
                style={{
                  background: "#0B373D",
                  border: "1px solid rgba(143,224,232,0.12)",
                  borderRadius: 12,
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                  <Image
                    src={p.img}
                    alt={p.title}
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
                  {p.blurRegion && (
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: `${p.blurRegion.left}%`,
                        top: `${p.blurRegion.top}%`,
                        width: `${p.blurRegion.width}%`,
                        height: `${p.blurRegion.height}%`,
                        backdropFilter: "blur(8px)",
                        background: "rgba(10,36,48,0.10)",
                      }}
                    />
                  )}
                  {p.award && (
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        background: "#8FE0E8",
                        color: "#072327",
                        fontFamily: "var(--font-plex-mono)",
                        fontSize: "9px",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        padding: "4px 9px",
                        borderRadius: 6,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.award}
                    </div>
                  )}
                </div>
                <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-plex-mono)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#8FE0E8",
                    }}
                  >
                    {p.category}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-barlow)",
                      fontSize: "clamp(15px, 1.4vw, 17px)",
                      fontWeight: 700,
                      color: "#F2FBFC",
                      letterSpacing: "-0.015em",
                      lineHeight: 1.25,
                      margin: 0,
                    }}
                  >
                    {p.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-barlow)",
                      fontSize: "12.5px",
                      color: "#7FA2A6",
                      lineHeight: 1.5,
                      marginTop: "auto",
                    }}
                  >
                    {p.specs.map((s) => s.value).join(" · ")}
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
