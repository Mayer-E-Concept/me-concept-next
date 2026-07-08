"use client";
import Image from "next/image";
import Link from "next/link";
import { SectionDivider } from "@/components/section-divider";

/* Fusion Trust + Specialists: eine einzige „Über uns"-Sektion —
   konkrete Positionierung + Team + Referenzen, ohne ISO-Dubletten. */

const CREDENTIALS = [
  "Planungsingenieure mit LPH 1–8 Erfahrung auf dem deutschen Markt",
  "Koordinierte BIM-Modelle mit digitaler Kollisionsprüfung",
  "Genehmigungsfähige Unterlagen: HOAI · DIN · VDE in Deutschland, NP-I7 · PE 132 in Rumänien",
];

export function AboutSectionDe() {
  return (
    <section
      id="ueber-uns"
      style={{
        position: "relative",
        background: "#D9EAEC",
        paddingTop: "clamp(72px, 9vw, 130px)",
        paddingBottom: "clamp(72px, 9vw, 130px)",
        scrollMarginTop: "72px",
      }}
    >
      <SectionDivider />

      <style>{`
        @media (max-width: 767px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>

      <div
        className="about-grid"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
          display: "grid",
          gridTemplateColumns: "1fr 1.3fr",
          gap: "clamp(24px, 3vw, 48px)",
          alignItems: "center",
        }}
      >
        {/* Links — Positionierung + Referenzen */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C5895B",
              marginBottom: 20,
            }}
          >
            Über uns
          </div>

          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(30px, 3.4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "#0E323D",
              maxWidth: "22ch",
              marginBottom: 24,
            }}
          >
            Spezialisten für Elektroplanung
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 1.1vw, 16px)",
              lineHeight: 1.75,
              color: "#335058",
              marginBottom: 32,
              maxWidth: "52ch",
            }}
          >
            Wir planen Elektroinstallationen für Wohn-, Gewerbe- und
            Industriegebäude — von Sibiu aus, für Deutschland und Rumänien.
            Wir arbeiten in BIM, mit koordinierten 3D-Modellen, und jedes
            Projekt durchläuft ein jährlich auditiertes Qualitätssystem.
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: 36 }}>
            {CREDENTIALS.map((c) => (
              <li
                key={c}
                style={{
                  position: "relative",
                  paddingLeft: 24,
                  marginBottom: 14,
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(14px, 1.05vw, 16px)",
                  color: "#0E323D",
                  lineHeight: 1.55,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#C5895B",
                    flexShrink: 0,
                  }}
                />
                {c}
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <Link
              href="/unser-team"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-sans)",
                fontSize: "12.5px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#fff",
                textDecoration: "none",
                padding: "14px 26px",
                borderRadius: 4,
                background: "#C5895B",
                border: "1.5px solid #C5895B",
                boxShadow: "0 2px 14px rgba(197,137,91,0.22)",
                transition: "background .2s ease, border-color .2s ease, transform .2s ease, box-shadow .25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#b37a50";
                el.style.borderColor = "#b37a50";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 6px 28px rgba(197,137,91,0.45)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#C5895B";
                el.style.borderColor = "#C5895B";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 2px 14px rgba(197,137,91,0.22)";
              }}
            >
              Unser Team →
            </Link>

            <Link
              href="/meine-geschichte"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-sans)",
                fontSize: "12.5px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#0E323D",
                textDecoration: "none",
                padding: "14px 26px",
                borderRadius: 4,
                background: "transparent",
                border: "1.5px solid rgba(14,50,61,0.28)",
                transition: "border-color .2s ease, transform .2s ease, background .2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "#0E323D";
                el.style.background = "rgba(14,50,61,0.05)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(14,50,61,0.28)";
                el.style.background = "transparent";
                el.style.transform = "translateY(0)";
              }}
            >
              Wer sind wir? →
            </Link>
          </div>
        </div>

        {/* Rechts — Team + ISO + Zitat */}
        <div>
          <div
            style={{
              position: "relative",
              borderRadius: 12,
              overflow: "hidden",
              aspectRatio: "4/3",
              boxShadow: "0 12px 40px rgba(14,50,61,0.18)",
            }}
          >
            <Image
              src="/uploads/echipa-team.jpg"
              alt="Team Mayer E-Concept — Elektroplanung"
              fill
              sizes="(max-width:767px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
            />
            {/* ISO-Badge — einzige Stelle auf der Startseite */}
            <div
              style={{
                position: "absolute",
                left: 12,
                bottom: 12,
                background: "rgba(255,255,255,0.96)",
                borderRadius: 6,
                padding: "6px 9px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              }}
            >
              <Image
                src="/uploads/SKYCERT9001.png"
                alt="ISO 9001:2015 SKYCERT"
                width={64}
                height={43}
                style={{ objectFit: "contain", display: "block" }}
              />
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <div style={{ width: 36, height: 2, background: "#C5895B", borderRadius: 1, marginBottom: 18 }} />
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(15px, 1.4vw, 18px)",
                fontWeight: 300,
                lineHeight: 1.7,
                color: "#335058",
                fontStyle: "italic",
                margin: "0 0 14px",
              }}
            >
              „Wir planen sichere, effiziente und zertifizierte
              Elektroinstallationen — vom Konzept bis zum Ausführungsdetail.&#34;
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                paddingTop: 14,
                borderTop: "1px solid rgba(14,50,61,0.12)",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C5895B",
                }}
              >
                Mayer E-Concept
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  color: "#56707A",
                  letterSpacing: "0.04em",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#C5895B",
                    flexShrink: 0,
                  }}
                />
                ANRE zertifiziert · Sibiu, Siebenbürgen
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
