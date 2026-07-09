"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FeaturesSection } from "@/components/features-section";
import { SectionDivider } from "@/components/section-divider";
import { FeaturedProjectCard } from "@/components/featured-project-card";
import { FEATURED_PROJECTS } from "@/components/featured-projects-data";

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
  { count: "50+", label: "Proiecte rezidențiale mari", desc: "Ansambluri de 50+ unități, planificate integral în Revit 3D cu faze LPH 1–8." },
  { count: "30+", label: "Proiecte rezidențiale mici", desc: "Case individuale și vile, soluții personalizate pentru fiecare beneficiar." },
  { count: "5", label: "Grădinițe & clădiri sociale", desc: "Grădinițe și instituții sociale, planificare completă incl. iluminat de siguranță și curenți slabi." },
  { count: "8", label: "Comerț & retail", desc: "Supermarketuri (incl. REWE) până la 2.500 m², coordonare cu standardele comerțului alimentar." },
  { count: "4", label: "Birouri & administrație", desc: "Clădiri planificate integral în Revit 3D, incl. pardoseală tehnică, iluminat Dialux și structură flexibilă." },
  { count: "3", label: "Monument & renovare", desc: "Renovări complexe de clădiri istorice, planificare BIM cu gestionarea patrimoniului construit." },
  { count: "10+", label: "Industrie & energie", desc: "Hale industriale și sisteme fotovoltaice, integrare completă în infrastructura electrică existentă." },
];

export function PortofoliuPage() {
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
          .porto-projects-grid { grid-template-columns: 1fr 1fr !important; }
          .porto-gallery-grid { grid-template-columns: 1fr 1fr !important; }
          .porto-hero-inner { padding-top: 120px !important; padding-bottom: 60px !important; }
          .porto-featured-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .porto-projects-grid { grid-template-columns: 1fr !important; }
          .porto-gallery-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1099px) {
          .porto-projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* Page Hero */}
      <section
        style={{
          position: "relative",
          background: "#051E27",
          overflow: "hidden",
        }}
      >
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
          className="porto-hero-inner"
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
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
              Acasă
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
              Portofoliu
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
            Proiecte în instalații electrice
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
            Planificare electrică pentru clădiri rezidențiale, comerciale și industriale,
            cu sediul în Sibiu și Germania. Faze LPH 1–8, BIM nativ în Revit, automatizare
            KNX și integrare fotovoltaică.
          </p>
        </div>
      </section>

      {/* Project reference categories — dark premium strip */}
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
        {/* subtle circuit texture */}
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
        {/* copper accent line top */}
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
          {/* heading */}
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
              Portofoliu de referință
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
              Proiecte executate de Mayer E-Concept
            </h2>
          </div>

          {/* cards grid — 4 cols desktop, 2 tablet, 1 mobile */}
          <div
            ref={projectsRef}
            className="porto-projects-grid"
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
                {/* cyan left accent */}
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
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 60px)",
          }}
        >
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
              Proiecte de referință — Germania
            </div>
          </div>

          <div
            className="porto-featured-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 20,
            }}
          >
            {FEATURED_PROJECTS.map((p) => (
              <FeaturedProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Puncte forte — mutat de pe homepage (swap cu Domenii de expertiză) */}
      <FeaturesSection />

    </>
  );
}
