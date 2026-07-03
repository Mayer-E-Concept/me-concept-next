"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FeaturesSectionDe } from "@/components/de/features-section";
import { SectionDivider } from "@/components/section-divider";

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

const FEATURED_PROJECTS_DE = [
  {
    id: "rewe",
    category: "Handel & Smart-Building",
    title: "Supermarkt und Sportflächen",
    desc: "Neubau mit synergetischer Verbindung von Supermarkt und öffentlichen Sportflächen, vollständig LPH 1–7 geplant. Flexibles Energie- und Beleuchtungskonzept für zwei unterschiedliche Nutzungstypen.",
    img: "/uploads/referinte/render-1.jpg",
    // Blendet das Markenlogo auf der Fassade aus — oben rechts am Gebäude.
    blurRegion: { left: 56, top: 50, width: 16, height: 14 },
    specs: [
      { label: "LPH", value: "1–7 komplett" },
      { label: "Fläche", value: "~2.500 m²" },
      { label: "Standard", value: "Smart-Building" },
    ],
    award: null,
  },
  {
    id: "group7",
    category: "Industrie & Energie",
    title: "Sitz & Logistik",
    desc: "Kombination aus 5.000 m² Bürofläche in Winkelform mit modernem Logistikzentrum. PV-Anlage auf dem Hallendach deckt den Strombedarf von ~100 Haushalten.",
    img: "/uploads/referinte/render-2.jpg",
    // Blendet das Firmenlogo auf der Fassade aus.
    blurRegion: { left: 54, top: 24, width: 24, height: 16 },
    specs: [
      { label: "LPH", value: "1–7" },
      { label: "Bürofläche", value: "5.000 m²" },
      { label: "PV", value: "~100 Haushalte" },
    ],
    award: null,
  },
  {
    id: "villa-maxima",
    category: "Wohnen & Denkmal",
    title: "Sanierung Denkmalgeschütztes Gebäude",
    desc: "Haar, München — 120 Wohneinheiten in 3 denkmalgeschützten Gebäuden. Leitungsführung durch Gewölbekeller mit geringer Deckenhöhe — gelöst durch millimetergenaue BIM-Modellierung mit digitaler Kollisionsprüfung.",
    img: "/uploads/referinte/render-3.jpg",
    specs: [
      { label: "LPH", value: "1–7" },
      { label: "Einheiten", value: "120 WE" },
      { label: "Glasfaser", value: "Alle WE" },
    ],
    award: "BIM-Preis Bayern 2025",
  },
  {
    id: "get-h2",
    category: "Energie & Infrastruktur",
    title: "Wasserstoff-Kraftwerk",
    desc: "Werk- und Montageplanung für die elektrotechnische Infrastruktur der ersten großskaligen H₂-Elektrolyseanlage Deutschlands. Intensive Gewerke-Koordination als zentrale Herausforderung.",
    img: "/uploads/referinte/render-4.jpg",
    specs: [
      { label: "Rolle", value: "Detailplanung und Montageplanung" },
      { label: "Standort", value: "Lingen, Emsland" },
    ],
    award: null,
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
          .porto-projects-grid-de { grid-template-columns: 1fr 1fr !important; }
          .porto-gallery-grid-de { grid-template-columns: 1fr 1fr !important; }
          .porto-hero-inner-de { padding-top: 120px !important; padding-bottom: 60px !important; }
          .porto-featured-grid-de { grid-template-columns: 1fr !important; }
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
        <SectionDivider />
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

      {/* Featured reference projects */}
      <section
        style={{
          background: "#051E27",
          paddingTop: "clamp(72px, 9vw, 110px)",
          paddingBottom: "clamp(72px, 9vw, 110px)",
          position: "relative",
        }}
      >
        <SectionDivider />
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
          <div style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#C5895B",
              }}
            >
              Referenzprojekte — Deutschland
            </div>
          </div>

          <div
            className="porto-featured-grid-de"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}
          >
            {FEATURED_PROJECTS_DE.map((p) => (
              <div
                key={p.id}
                style={{
                  background: "#0A2430",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                  <Image
                    src={p.img}
                    alt={p.title}
                    width={620}
                    height={349}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      filter: "brightness(0.65) saturate(0.8)",
                    }}
                  />
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, #0A2430 0%, transparent 55%)",
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
                        backdropFilter: "blur(14px)",
                        background: "rgba(10,36,48,0.35)",
                      }}
                    />
                  )}
                  {p.award && (
                    <div
                      style={{
                        position: "absolute",
                        top: 14,
                        right: 14,
                        background: "#C5895B",
                        color: "#051E27",
                        fontFamily: "var(--font-sans)",
                        fontSize: "9px",
                        fontWeight: 800,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        padding: "5px 10px",
                        borderRadius: 6,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.award}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    padding: "24px 28px 28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    flex: 1,
                    position: "relative",
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
                      background: "linear-gradient(180deg, #C5895B 0%, rgba(197,137,91,0.08) 100%)",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#C5895B",
                    }}
                  >
                    {p.category}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(17px, 1.8vw, 22px)",
                      fontWeight: 800,
                      color: "#F4F2EC",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                      margin: 0,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13.5,
                      lineHeight: 1.65,
                      color: "rgba(244,242,236,0.52)",
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                    {p.specs.map((s) => (
                      <div
                        key={s.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          borderRadius: 6,
                          padding: "4px 10px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "9px",
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "rgba(244,242,236,0.38)",
                          }}
                        >
                          {s.label}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "#F4F2EC",
                          }}
                        >
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stärken — von der Startseite verschoben (Swap mit Fachbereiche) */}
      <FeaturesSectionDe />

    </>
  );
}
