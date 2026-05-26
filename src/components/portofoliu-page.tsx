"use client";
import Image from "next/image";
import Link from "next/link";

const SERVICES = [
  {
    num: "01",
    title: "Construcții Civile",
    desc: "Proiectarea și echiparea electrică realizate de un expert pot îmbunătăți eficiența energetică a unei clădiri, reducând semnificativ consumul de energie și costurile pe termen lung.",
    img: "/uploads/Casa3-3D.jpg",
  },
  {
    num: "02",
    title: "Spații Comerciale",
    desc: "Proiectăm un sistem electric adaptat nevoilor specifice, fie că este vorba de o unitate comercială, showroom sau centru logistic. Soluții personalizate pentru optimizarea fluxurilor de lucru.",
    img: "/uploads/Spatii-Comerciale.png",
  },
  {
    num: "03",
    title: "Iluminat Tehnic",
    desc: "Proiectăm soluții de iluminat tehnic adaptate fiecărui spațiu — hale industriale, birouri, spații comerciale — cu focus pe eficiență energetică, confort vizual și durabilitate.",
    img: "/uploads/ME-CONCEPT-162.jpg",
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
    img: "/uploads/ME-CONCEPT-021.jpg",
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
    img: "/uploads/ME-CONCEPT-083-1.jpg",
  },
  {
    num: "08",
    title: "Sisteme de Iluminat de Urgență",
    desc: "Asigurăm continuitatea vizibilității și siguranța în situații de urgență prin proiectarea sistemelor de iluminat de siguranță și evacuare, conforme cu toate reglementările.",
    img: "/uploads/proiectare-instalatii-electrice-sibiu-2.jpg",
  },
];

const PROJECTS = [
  { count: "50+", label: "Proiecte rezidențiale mari", desc: "Ansambluri de 50+ unități, planificate integral în Revit 3D cu faze LP 1–5." },
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
  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .porto-services-grid { grid-template-columns: 1fr !important; }
          .porto-projects-grid { grid-template-columns: 1fr !important; }
          .porto-gallery-grid { grid-template-columns: 1fr 1fr !important; }
          .porto-hero-inner { padding-top: 120px !important; padding-bottom: 60px !important; }
        }
        @media (max-width: 480px) {
          .porto-gallery-grid { grid-template-columns: 1fr !important; }
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
            cu sediul în Sibiu și Germania. Faze LP 1–5, BIM nativ în Revit, automatizare
            KNX și integrare fotovoltaică.
          </p>
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
              Domenii de expertiză
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
            className="porto-gallery-grid"
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

      {/* Project reference categories */}
      <section
        style={{
          background: "#ECEFF0",
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
              Portofoliu de referință
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
              Proiecte executate de Mayer E-Concept
            </h2>
          </div>

          <div
            className="porto-projects-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 2,
            }}
          >
            {PROJECTS.map((p, i) => (
              <div
                key={p.label}
                style={{
                  background: i % 2 === 0 ? "#FFFFFF" : "#F0F2F3",
                  padding: "clamp(24px, 3vw, 40px)",
                  borderRadius: 0,
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                  borderBottom: "1px solid #D8DCDE",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(28px, 3vw, 42px)",
                    fontWeight: 800,
                    color: "#C5895B",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    minWidth: 70,
                    flexShrink: 0,
                  }}
                >
                  {p.count}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#0E323D",
                      marginBottom: 6,
                      lineHeight: 1.3,
                    }}
                  >
                    {p.label}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "#335058",
                      margin: 0,
                    }}
                  >
                    {p.desc}
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
