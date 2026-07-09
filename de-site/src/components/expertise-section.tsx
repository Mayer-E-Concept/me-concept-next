import Image from "next/image";
import { FadeIn } from "@/components/fade-in";
import { SectionDivider } from "@/components/section-divider";

const SERVICES = [
  {
    num: "01",
    title: "Wohngebäude",
    desc: "Professionelle Elektroplanung und -ausrüstung verbessern die Energieeffizienz eines Gebäudes und reduzieren langfristig Energieverbrauch und Kosten erheblich.",
    img: "/uploads/electrician_22.jpg",
  },
  {
    num: "02",
    title: "Gewerbeflächen",
    desc: "Wir planen ein auf Ihre spezifischen Anforderungen zugeschnittenes Elektrosystem – ob Einzelhandel, Showroom oder Logistikzentrum. Individuelle Lösungen zur Optimierung der Arbeitsabläufe.",
    img: "/uploads/spati-comerciale-2.jpg",
  },
  {
    num: "03",
    title: "Technische Beleuchtung",
    desc: "Wir entwickeln technische Beleuchtungslösungen für jeden Raum – Industriehallen, Büros, Gewerbeflächen – mit Fokus auf Energieeffizienz, Sehkomfort und Langlebigkeit.",
    img: "/uploads/electrician_31.jpg",
  },
  {
    num: "04",
    title: "Architekturbeleuchtung",
    desc: "Wir erwecken Gebäude und Außenbereiche durch beeindruckende Architekturbeleuchtung zum Leben. Wir betonen architektonische Details und schaffen eine einzigartige Atmosphäre.",
    img: "/uploads/Iluminat-Arhitctural.jpg",
  },
  {
    num: "05",
    title: "Stromversorgung und -verteilung",
    desc: "Wir planen Stromversorgungs- und Verteilsysteme für Wohn-, Gewerbe- und Industriegebäude. Unsere Lösungen gewährleisten einen stabilen und sicheren Stromfluss.",
    img: "/uploads/iStock-1192061868.jpg",
  },
  {
    num: "06",
    title: "Automatisierung und Steuerung",
    desc: "Wir automatisieren Prozesse und optimieren den Energieverbrauch. Wir planen intelligente KNX-Systeme, die das Gebäudemanagement einfacher und effizienter gestalten.",
    img: "/uploads/Automatizare.jpg",
  },
  {
    num: "07",
    title: "Blitz- und Erdungsschutz",
    desc: "Der Schutz von Gebäuden vor Blitzeinschlägen ist unerlässlich. Wir planen Blitzschutz- und Erdungssysteme, die vollständige Sicherheit nach DIN VDE bieten.",
    img: "/uploads/proiectare-instalatii-electrice-sibiu-2.jpg",
  },
  {
    num: "08",
    title: "Sicherheitsbeleuchtung",
    desc: "Wir gewährleisten Sichtverhältnisse und Sicherheit in Notfällen durch die Planung von Notbeleuchtungs- und Evakuierungssystemen gemäß allen geltenden Vorschriften.",
    img: "/uploads/electrician_35.jpg",
  },
];

export function ExpertiseSectionDe() {
  return (
    <section
      id="leistungen"
      style={{
        position: "relative",
        paddingTop: "clamp(72px, 9vw, 120px)",
        paddingBottom: "clamp(72px, 9vw, 120px)",
        scrollMarginTop: "72px",
      }}
    >
      <SectionDivider />
      <style>{`
        @media (max-width: 767px) {
          .expertise-grid-de { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
          .expertise-card-body-de { padding: 14px 14px 16px !important; }
          .expertise-card-title-de { font-size: 14px !important; margin-bottom: 6px !important; }
          .expertise-card-desc-de { font-size: 12px !important; line-height: 1.5 !important; }
        }
      `}</style>
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
        <div style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
          <div
            style={{
              fontFamily: "var(--font-plex-mono)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#8FE0E8",
              marginBottom: 14,
              paddingBottom: 14,
              borderBottom: "1px solid rgba(143,224,232,0.12)",
              display: "inline-block",
            }}
          >
            Fachbereiche
          </div>
          <h2
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "clamp(28px, 3.2vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              color: "#F2FBFC",
              maxWidth: "28ch",
            }}
          >
            Elektrische Planung für jeden Gebäudetyp
          </h2>
        </div>

        <div
          className="expertise-grid-de"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {SERVICES.map((s, i) => (
            <FadeIn key={s.num} delay={(i % 4) * 100}>
            <div
              style={{
                background: "#0B373D",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(143,224,232,0.08)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                <Image
                  src={s.img}
                  alt={s.title}
                  width={560}
                  height={315}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div className="expertise-card-body-de" style={{ padding: "24px 24px 28px" }}>
                <h3
                  className="expertise-card-title-de"
                  style={{
                    fontFamily: "var(--font-barlow)",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#F2FBFC",
                    letterSpacing: "-0.01em",
                    marginBottom: 10,
                    lineHeight: 1.3,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="expertise-card-desc-de"
                  style={{
                    fontFamily: "var(--font-barlow)",
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "#A9C9CC",
                    margin: 0,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
