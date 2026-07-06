"use client";
import Image from "next/image";

export function TrustSectionDe() {
  return (
    <section
      style={{
        background: "#0E323D",
        paddingTop: "clamp(72px, 9vw, 130px)",
        paddingBottom: "clamp(72px, 9vw, 130px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .trust-top-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .trust-bottom-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>

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
          className="trust-top-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 6vw, 100px)",
            alignItems: "start",
            marginBottom: "clamp(48px, 6vw, 80px)",
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
                marginBottom: 18,
              }}
            >
              Über uns
            </div>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(28px, 3.4vw, 44px)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                color: "#F4F2EC",
                marginBottom: 0,
              }}
            >
              Vertrauen und Qualität in der Elektroplanung
            </h2>
          </div>
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(14px, 1.1vw, 16px)",
                lineHeight: 1.75,
                color: "rgba(244,242,236,0.65)",
                marginBottom: 32,
              }}
            >
              Wenn Sie ein wirklich kompetentes Elektroplanung-Unternehmen suchen, das die Komplexität
              von Installationen in sichere und effiziente Lösungen umwandeln kann, sind wir der Partner,
              den Sie brauchen. Mit jahrelanger Erfahrung und einem der Exzellenz verpflichteten Team
              bieten wir maßgeschneiderte Elektroplanung-Dienstleistungen auf höchstem Niveau, die auf
              den Erfolg Ihres Projekts ausgerichtet sind.
            </p>
            <a
              href="#ueber-uns"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 52,
                padding: "0 28px",
                background: "#C5895B",
                color: "#fff",
                border: "1.5px solid #C5895B",
                borderRadius: 4,
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background .2s ease, transform .2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#b37a50";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#C5895B";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              Über Mayer E-Concept
            </a>
          </div>
        </div>

        {/* Bottom — cinematic split panel */}
        <style>{`
          @media (max-width: 767px) {
            .trust-panel { grid-template-columns: 1fr !important; }
            .trust-panel-photo { min-height: 260px !important; }
          }
        `}</style>
        <div
          className="trust-panel"
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.07)",
            minHeight: 420,
          }}
        >
          {/* Foto duotone */}
          <div
            className="trust-panel-photo"
            style={{ position: "relative", minHeight: 420 }}
          >
            <Image
              src="/uploads/echipa-159-duotone.jpg"
              alt="Mayer E-Concept Team — Elektroplanung"
              fill
              sizes="(max-width:767px) 100vw, 60vw"
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, transparent 60%, rgba(10,38,30,0.55) 100%)",
              pointerEvents: "none",
            }} />
          </div>

          {/* Credentials + Zitat */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            borderLeft: "1px solid rgba(255,255,255,0.07)",
            padding: "clamp(28px, 4vw, 52px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 28,
          }}>
            <div style={{
              background: "rgba(255,255,255,0.96)",
              borderRadius: 8,
              padding: "10px 14px",
              width: "fit-content",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}>
              <Image
                src="/uploads/SKYCERT9001.png"
                alt="ISO 9001:2015 SKYCERT"
                width={96}
                height={64}
                style={{ objectFit: "contain", display: "block" }}
              />
            </div>

            <div style={{ width: 36, height: 2, background: "#C5895B", borderRadius: 1 }} />

            <div>
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(15px, 1.4vw, 18px)",
                fontWeight: 300,
                lineHeight: 1.7,
                color: "rgba(244,242,236,0.80)",
                fontStyle: "italic",
                margin: "0 0 20px",
              }}>
                „Wir planen sichere, effiziente und zertifizierte Elektroinstallationen — vom Konzept bis zum Ausführungsdetail."
              </p>
              <span style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C5895B",
              }}>
                Mayer E-Concept
              </span>
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              paddingTop: 4,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#C5895B", flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                color: "rgba(244,242,236,0.50)",
                letterSpacing: "0.04em",
              }}>
                ANRE zertifiziert · Sibiu, Siebenbürgen
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
