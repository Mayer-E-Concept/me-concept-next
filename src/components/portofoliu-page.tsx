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

const FEATURED_PROJECTS = [
  {
    id: "rewe",
    category: "Comerț & Smart-Building",
    title: "REWE + Centru Sportiv",
    desc: "Clădire mixtă ce reunește un supermarket REWE și spații sportive publice, planificată integral LPH 1–7. Concept flexibil de iluminat și distribuție energetică pentru două tipologii distincte de utilizare.",
    img: "/uploads/referinte/render-1.jpg",
    specs: [
      { label: "LPH", value: "1–7 complet" },
      { label: "Suprafață", value: "~2.500 m²" },
      { label: "Standard", value: "Smart-Building" },
    ],
    award: null,
  },
  {
    id: "group7",
    category: "Industrie & Energie",
    title: "Sediu & Logistică GROUP7, Schwaig",
    desc: "Complex ce integrează 5.000 m² de birouri cu o hală logistică modernă. Instalație PV pe acoperiș — acoperă consumul energetic a ~100 de gospodării.",
    img: "/uploads/referinte/render-2.jpg",
    specs: [
      { label: "LPH", value: "1–7" },
      { label: "Birouri", value: "5.000 m²" },
      { label: "PV", value: "~100 gospodării" },
    ],
    award: null,
  },
  {
    id: "villa-maxima",
    category: "Rezidențial & Monument",
    title: "Villa MAXIMA – Haar, München",
    desc: "120 unități rezidențiale în 3 clădiri monument. Trasee de cabluri prin subsoluri boltite cu înălțime redusă — rezolvate prin modelare BIM milimetrică și verificare coliziuni în timp real.",
    img: "/uploads/referinte/render-3.jpg",
    specs: [
      { label: "LPH", value: "1–7" },
      { label: "Unități", value: "120 WE" },
      { label: "Fibră optică", value: "Toate unitățile" },
    ],
    award: "BIM-Preis Bayern 2025",
  },
  {
    id: "get-h2",
    category: "Energie & Infrastructură",
    title: "GET H₂ Nukleus – RWE, Lingen",
    desc: "Planificare Werk & Montaj pentru infrastructura electrică a primei instalații de electroliză H₂ la scară mare din Germania. Coordonare intensivă cu toate corpurile de meseriași.",
    img: "/uploads/referinte/render-4.jpg",
    specs: [
      { label: "Rol", value: "Echipa de execuție" },
      { label: "Operator", value: "RWE AG" },
      { label: "Locație", value: "Lingen, Emsland" },
    ],
    award: null,
  },
];

const SERVICES = [
  {
    num: "01",
    title: "Construcții Civile",
    desc: "Proiectarea și echiparea electrică realizate de un expert pot îmbunătăți eficiența energetică a unei clădiri, reducând semnificativ consumul de energie și costurile pe termen lung.",
    img: "/uploads/electrician_22.jpg",
  },
  {
    num: "02",
    title: "Spații Comerciale",
    desc: "Proiectăm un sistem electric adaptat nevoilor specifice, fie că este vorba de o unitate comercială, showroom sau centru logistic. Soluții personalizate pentru optimizarea fluxurilor de lucru.",
    img: "/uploads/spati-comerciale-2.jpg",
  },
  {
    num: "03",
    title: "Iluminat Tehnic",
    desc: "Proiectăm soluții de iluminat tehnic adaptate fiecărui spațiu — hale industriale, birouri, spații comerciale — cu focus pe eficiență energetică, confort vizual și durabilitate.",
    img: "/uploads/electrician_31.jpg",
  },
  {
    num: "04",
    title: "Iluminat Arhitectural",
    desc: "Dăm viață clădirilor și spațiilor exterioare prin proiectarea unui iluminat arhitectural impresionant. Punem în valoare detaliile arhitecturale și creăm atmosferă unică.",
    img: "/uploads/Iluminat-Arhitctural.jpg",
  },
  {
    num: "05",
    title: "Sisteme de Alimentare și Distribuție Electrică",
    desc: "Proiectăm sisteme de alimentare și distribuție electrică pentru clădiri rezidențiale, comerciale și industriale. Soluțiile noastre garantează un flux electric stabil și sigur.",
    img: "/uploads/iStock-1192061868.jpg",
  },
  {
    num: "06",
    title: "Sisteme de Automatizare și Control",
    desc: "Automatizăm procesele și optimizăm consumul de energie. Proiectăm sisteme inteligente KNX care fac managementul clădirilor mai simplu și mai eficient.",
    img: "/uploads/Automatizare.jpg",
  },
  {
    num: "07",
    title: "Sisteme de Paratrăsnet și Împământare",
    desc: "Protejarea clădirilor împotriva descărcărilor atmosferice este esențială. Proiectăm sisteme de paratrăsnet și împământare care oferă siguranță completă.",
    img: "/uploads/proiectare-instalatii-electrice-sibiu-2.jpg",
  },
  {
    num: "08",
    title: "Sisteme de Iluminat de Urgență",
    desc: "Asigurăm continuitatea vizibilității și siguranța în situații de urgență prin proiectarea sistemelor de iluminat de siguranță și evacuare, conforme cu toate reglementările.",
    img: "/uploads/electrician_35.jpg",
  },
];

const PROJECTS = [
  { count: "50+", label: "Proiecte rezidențiale mari", desc: "Ansambluri de 50+ unități, planificate integral în Revit 3D cu faze LPH 1–8." },
  { count: "30+", label: "Proiecte rezidențiale mici", desc: "Case individuale și vile, soluții personalizate pentru fiecare beneficiar." },
  { count: "5", label: "Grădinițe & clădiri sociale", desc: "Grădinițe și instituții sociale, planificare completă incl. iluminat de siguranță și curenți slabi." },
  { count: "8", label: "Comerț & retail", desc: "Supermarketuri (incl. REWE) până la 2.500 m², coordonare cu standardele comerțului alimentar." },
  { count: "4", label: "Birouri & administrație", desc: "Clădiri planificate integral în Revit 3D, incl. pardoseală tehnică, iluminat Dialux și structură flexibilă." },
  { count: "3", label: "Monument & renovare", desc: "Renovări complexe de clădiri istorice, planificare BIM cu gestionarea patrimoniului construit." },
  { count: "10+", label: "Industrie & energie", desc: "Hale industriale și sisteme fotovoltaice, integrare completă în infrastructura electrică existentă." },
];

const GALLERY = [
  { src: "/uploads/ME-CONCEPT-021.jpg", alt: "Proiect instalații electrice" },
  { src: "/uploads/ME-CONCEPT-162.jpg", alt: "Planificare electrică Revit" },
  { src: "/uploads/Design-fara-titlu-32.jpg", alt: "Proiect rezidențial" },
  { src: "/uploads/ME-CONCEPT-083-1.jpg", alt: "Instalații electrice" },
  { src: "/uploads/electrician_31.jpg", alt: "Proiectare electrică" },
  { src: "/uploads/PROIECTARE-INSTALATII-ELECTRICE.jpg", alt: "Proiect comercial" },
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
          .porto-services-grid { grid-template-columns: 1fr !important; }
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
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
              }}
            >
              Acasă
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
              Portofoliu
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
            Proiecte în instalații electrice
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
            background: "linear-gradient(90deg, transparent, #C5895B 30%, #C5895B 70%, transparent)",
            opacity: 0.45,
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
          {/* heading */}
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
              Portofoliu de referință
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
                {/* copper left accent */}
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
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 60px)",
          }}
        >
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
                {/* Image with overlay */}
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

                {/* Content */}
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
                  {/* copper left bar */}
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
                  {/* Spec chips */}
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

      {/* Services grid */}
      <section
        style={{
          background: "#0E323D",
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
                color: "#C5895B",
                marginBottom: 14,
                paddingBottom: 14,
                borderBottom: "1px solid rgba(255,255,255,0.12)",
                display: "inline-block",
              }}
            >
              Domenii de expertiză
            </div>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.12,
                color: "#F4F2EC",
                maxWidth: "28ch",
              }}
            >
              Proiectare electrică pentru orice tip de construcție
            </h2>
          </div>

          <div
            className="porto-services-grid"
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
                  border: "1px solid rgba(255,255,255,0.10)",
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

    </>
  );
}
