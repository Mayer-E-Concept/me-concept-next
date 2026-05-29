"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function parseCount(s: string): { num: number; suffix: string } {
  const m = s.match(/^(\d+)(\+?)$/);
  return m ? { num: Number(m[1]), suffix: m[2] } : { num: 0, suffix: s };
}

function AnimatedCount({ raw, active }: { raw: string; active: boolean }) {
  const { num, suffix } = parseCount(raw);
  const [cur, setCur] = useState(0);
  const rafRef = useRef<number | null>(null);
  const t0Ref = useRef<number | null>(null);
  const DURATION = 1300;

  useEffect(() => {
    if (!active) return;
    t0Ref.current = null;
    function tick(ts: number) {
      if (t0Ref.current === null) t0Ref.current = ts;
      const p = Math.min((ts - t0Ref.current) / DURATION, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCur(Math.round(ease * num));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setCur(num);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active, num]);

  return <>{cur}{suffix}</>;
}

const SERVICES = [
  {
    num: "01",
    title: "Wohngebäude",
    desc: "Professionelle Elektroplanung und -ausrüstung verbessern die Energieeffizienz eines Gebäudes und reduzieren langfristig Energieverbrauch und Kosten erheblich.",
    img: "/uploads/Casa3-3D.jpg",
  },
  {
    num: "02",
    title: "Gewerbeflächen",
    desc: "Wir planen ein auf Ihre spezifischen Anforderungen zugeschnittenes Elektrosystem – ob Einzelhandel, Showroom oder Logistikzentrum. Individuelle Lösungen zur Optimierung der Arbeitsabläufe.",
    img: "/uploads/Spatii-Comerciale.png",
  },
  {
    num: "03",
    title: "Technische Beleuchtung",
    desc: "Wir entwickeln technische Beleuchtungslösungen für jeden Raum – Industriehallen, Büros, Gewerbeflächen – mit Fokus auf Energieeffizienz, Sehkomfort und Langlebigkeit.",
    img: "/uploads/ME-CONCEPT-162.jpg",
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
    img: "/uploads/ME-CONCEPT-021.jpg",
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
    img: "/uploads/ME-CONCEPT-083-1.jpg",
  },
  {
    num: "08",
    title: "Sicherheitsbeleuchtung",
    desc: "Wir gewährleisten Sichtverhältnisse und Sicherheit in Notfällen durch die Planung von Notbeleuchtungs- und Evakuierungssystemen gemäß allen geltenden Vorschriften.",
    img: "/uploads/proiectare-instalatii-electrice-sibiu-2.jpg",
  },
];

const PROJECTS = [
  { count: "50+", label: "Große Wohnprojekte", desc: "Wohnanlagen mit 50+ Einheiten, vollständig in Revit 3D geplant mit Leistungsphasen LPH 1–8." },
  { count: "30+", label: "Kleine Wohnprojekte", desc: "Einfamilienhäuser und Villen, individuelle Lösungen für jeden Auftraggeber." },
  { count: "5", label: "Kindergärten & Sozialbauten", desc: "Kindergärten und Sozialeinrichtungen, vollständige Planung inkl. Sicherheitsbeleuchtung und Schwachstromtechnik." },
  { count: "8", label: "Handel & Retail", desc: "Supermärkte (inkl. REWE) bis 2.500 m², Koordination nach Lebensmittelhandel-Standards." },
  { count: "4", label: "Büro & Verwaltung", desc: "Gebäude vollständig in Revit 3D geplant, inkl. Doppelboden, Dialux-Beleuchtung und flexibler Grundrissgestaltung." },
  { count: "3", label: "Denkmal & Sanierung", desc: "Komplexe Sanierungen historischer Gebäude, BIM-Planung mit Denkmalschutz-Management." },
  { count: "10+", label: "Industrie & Energie", desc: "Industriehallen und Photovoltaik-Anlagen, vollständige Integration in die bestehende Elektroinfrastruktur." },
];

const GALLERY = [
  { src: "/uploads/ME-CONCEPT-021.jpg", alt: "Elektroplanungsprojekt" },
  { src: "/uploads/ME-CONCEPT-162.jpg", alt: "Elektrische Planung Revit" },
  { src: "/uploads/Design-fara-titlu-32.jpg", alt: "Wohnprojekt" },
  { src: "/uploads/ME-CONCEPT-083-1.jpg", alt: "Elektroinstallationen" },
  { src: "/uploads/electrician_31.jpg", alt: "Elektrische Planung" },
  { src: "/uploads/PROIECTARE-INSTALATII-ELECTRICE.jpg", alt: "Gewerbeprojekt" },
];

export function PortofoliuPageDe() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const [projectsTriggered, setProjectsTriggered] = useState(false);

  useEffect(() => {
    const el = projectsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setProjectsTriggered(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .porto-services-grid-de { grid-template-columns: 1fr !important; }
          .porto-projects-grid-de { grid-template-columns: 1fr 1fr !important; }
          .porto-gallery-grid-de { grid-template-columns: 1fr 1fr !important; }
          .porto-hero-inner-de { padding-top: 120px !important; padding-bottom: 60px !important; }
        }
        @media (max-width: 480px) {
          .porto-projects-grid-de { grid-template-columns: 1fr !important; }
          .porto-gallery-grid-de { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1099px) {
          .porto-projects-grid-de { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* Page Hero */}
      <section style={{ position: "relative", background: "#051E27", overflow: "hidden" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: 'url("/assets/circuit-pattern.svg")',
            backgroundSize: "240px 240px",
            opacity: 0.08,
            filter: "invert(1)",
            pointerEvents: "none",
          }}
        />
        <div
          className="porto-hero-inner-de"
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 60px)",
            paddingTop: "clamp(130px, 16vh, 200px)",
            paddingBottom: "clamp(72px, 9vw, 110px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <Link
              href="/de"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
              }}
            >
              Startseite
            </Link>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>›</span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#C5895B",
              }}
            >
              Portfolio
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              color: "#F4F2EC",
              maxWidth: "18ch",
              marginBottom: 24,
            }}
          >
            Projekte in der Elektroplanung
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 1.4vw, 19px)",
              lineHeight: 1.65,
              color: "rgba(244,242,236,0.65)",
              maxWidth: "55ch",
              marginBottom: 0,
            }}
          >
            Elektrische Planung für Wohn-, Gewerbe- und Industriegebäude mit Standort
            in Sibiu und Deutschland. Leistungsphasen LPH 1–8, natives BIM in Revit,
            KNX-Automatisierung und Photovoltaik-Integration.
          </p>
        </div>
      </section>

      {/* Project reference categories */}
      <section
        style={{
          position: "relative",
          background: "#071C26",
          paddingTop: "clamp(72px, 9vw, 110px)",
          paddingBottom: "clamp(72px, 9vw, 110px)",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: 'url("/assets/circuit-pattern.svg")',
            backgroundSize: "280px 280px",
            backgroundRepeat: "repeat",
            filter: "invert(1)",
            opacity: 0.04,
            pointerEvents: "none",
          }}
        />
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

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
          <div style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
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
              Referenzportfolio
            </div>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(28px, 3.2vw, 44px)",
                fontWeight: 800,
                letterSpacing: "-0.022em",
                lineHeight: 1.1,
                color: "#F4F2EC",
                maxWidth: "28ch",
                margin: 0,
              }}
            >
              Realisierte Projekte von Mayer E-Concept
            </h2>
          </div>

          <div
            ref={projectsRef}
            className="porto-projects-grid-de"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
            }}
          >
            {PROJECTS.map((p) => (
              <div
                key={p.label}
                style={{
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10,
                  padding: "clamp(20px, 2.4vw, 32px)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: 3,
                    background: "linear-gradient(180deg, #C5895B 0%, rgba(197,137,91,0.15) 100%)",
                    borderRadius: "10px 0 0 10px",
                  }}
                />
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(36px, 3.8vw, 54px)",
                    fontWeight: 800,
                    color: "#C5895B",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    marginBottom: 14,
                  }}
                >
                  <AnimatedCount raw={p.count} active={projectsTriggered} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#F4F2EC",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.35,
                    marginBottom: 8,
                  }}
                >
                  {p.label}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12.5,
                    lineHeight: 1.65,
                    color: "rgba(244,242,236,0.45)",
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section
        style={{
          background: "#F6F7F7",
          paddingTop: "clamp(72px, 9vw, 120px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
        }}
      >
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
          <div style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#0F4C5C",
                marginBottom: 14,
                paddingBottom: 14,
                borderBottom: "1px solid #D8DCDE",
                display: "inline-block",
              }}
            >
              Fachbereiche
            </div>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.12,
                color: "#0E323D",
                maxWidth: "28ch",
              }}
            >
              Elektrische Planung für jeden Gebäudetyp
            </h2>
          </div>

          <div
            className="porto-services-grid-de"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {SERVICES.map((s) => (
              <div
                key={s.num}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid #D8DCDE",
                  display: "flex",
                  flexDirection: "column",
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
                <div style={{ padding: "24px 24px 28px" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      color: "#C5895B",
                      marginBottom: 8,
                    }}
                  >
                    {s.num}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#0E323D",
                      letterSpacing: "-0.01em",
                      marginBottom: 10,
                      lineHeight: 1.3,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: "#335058",
                      margin: 0,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section style={{ background: "#0E323D", padding: "clamp(48px, 6vw, 80px) 0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
          <div
            className="porto-gallery-grid-de"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
            }}
          >
            {GALLERY.map((g) => (
              <div key={g.src} style={{ borderRadius: 10, overflow: "hidden", aspectRatio: "4/3" }}>
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={400}
                  height={300}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.85)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
