"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FeaturesSectionDe } from "@/components/features-section";
import { SectionDivider } from "@/components/section-divider";
import { FeaturedProjectCard } from "@/components/featured-project-card";
import { FEATURED_PROJECTS_DE } from "@/components/featured-projects-data";

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

const PROJECTS = [
  { count: "50+", label: "Große Wohnprojekte", desc: "Wohnanlagen mit 50+ Einheiten, vollständig in Revit 3D geplant mit Leistungsphasen LPH 1–8." },
  { count: "30+", label: "Kleine Wohnprojekte", desc: "Einfamilienhäuser und Villen, individuelle Lösungen für jeden Auftraggeber." },
  { count: "5", label: "Kindergärten & Sozialbauten", desc: "Kindergärten und Sozialeinrichtungen, vollständige Planung inkl. Sicherheitsbeleuchtung und Schwachstromtechnik." },
  { count: "8", label: "Handel & Retail", desc: "Supermärkte (inkl. REWE) bis 2.500 m², Koordination nach Lebensmittelhandel-Standards." },
  { count: "4", label: "Büro & Verwaltung", desc: "Gebäude vollständig in Revit 3D geplant, inkl. Doppelboden, Dialux-Beleuchtung und flexibler Grundrissgestaltung." },
  { count: "3", label: "Denkmal & Sanierung", desc: "Komplexe Sanierungen historischer Gebäude, BIM-Planung mit Denkmalschutz-Management." },
  { count: "10+", label: "Industrie & Energie", desc: "Industriehallen und Photovoltaik-Anlagen, vollständige Integration in die bestehende Elektroinfrastruktur." },
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
          .porto-projects-grid-de { gap: 12px !important; }
          .porto-gallery-grid-de { gap: 12px !important; }
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
              href="/"
              style={{
                fontFamily: "var(--font-plex-mono)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#7FA2A6",
                textDecoration: "none",
              }}
            >
              Startseite
            </Link>
            <span style={{ color: "rgba(143,224,232,0.3)", fontSize: 12 }}>›</span>
            <span
              style={{
                fontFamily: "var(--font-plex-mono)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#8FE0E8",
              }}
            >
              Portfolio
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              color: "#F2FBFC",
              maxWidth: "18ch",
              marginBottom: 24,
            }}
          >
            Projekte in der Elektroplanung
          </h1>
          <p
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "clamp(16px, 1.4vw, 19px)",
              lineHeight: 1.65,
              color: "#A9C9CC",
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
            background: "linear-gradient(90deg, transparent, #5AC9D4 30%, #5AC9D4 70%, transparent)",
            opacity: 0.45,
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
          <div style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
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
              Referenzportfolio
            </div>
            <h2
              style={{
                fontFamily: "var(--font-barlow)",
                fontSize: "clamp(28px, 3.2vw, 44px)",
                fontWeight: 800,
                letterSpacing: "-0.022em",
                lineHeight: 1.1,
                color: "#F2FBFC",
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
                  background: "#0B373D",
                  border: "1px solid rgba(143,224,232,0.12)",
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
                    background: "linear-gradient(180deg, #5AC9D4 0%, rgba(143,224,232,0.15) 100%)",
                    borderRadius: "10px 0 0 10px",
                  }}
                />
                <div
                  style={{
                    fontFamily: "var(--font-barlow)",
                    fontSize: "clamp(36px, 3.8vw, 54px)",
                    fontWeight: 800,
                    color: "#8FE0E8",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    marginBottom: 14,
                  }}
                >
                  <AnimatedCount raw={p.count} active={projectsTriggered} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-barlow)",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#F2FBFC",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.35,
                    marginBottom: 8,
                  }}
                >
                  {p.label}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-barlow)",
                    fontSize: 12.5,
                    lineHeight: 1.65,
                    color: "#A9C9CC",
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
            background: "rgba(143,224,232,0.06)",
          }}
        />
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
          <div style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
            <div
              style={{
                fontFamily: "var(--font-plex-mono)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#8FE0E8",
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
              <FeaturedProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Stärken — von der Startseite verschoben (Swap mit Fachbereiche) */}
      <FeaturesSectionDe />

    </>
  );
}
