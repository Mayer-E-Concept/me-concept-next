"use client";
import { useState } from "react";
import Image from "next/image";
import { SectionDivider } from "@/components/section-divider";

const SERVICES_LEFT = [
  { title: "Consultanță Personalizată", desc: "Adaptăm proiectele la nevoile specifice fiecărui client pentru a garanta rezultate optime." },
  { title: "Proiectarea Prizelor și Întrerupătoarelor", desc: "Planificare strategică pentru confort și accesibilitate maximă în fiecare încăpere." },
  { title: "Puncte de Lumină și Iluminat 3D", desc: "Proiectăm soluții de iluminat de calitate pentru toate camerele, inclusiv pentru balcoane și terase." },
  { title: "Ventilatoare de Evacuare în Băi", desc: "Asigurăm ventilația corectă pentru un mediu sănătos în fiecare baie." },
  { title: "Contor Electric Individual și Distribuția Siguranțelor", desc: "Soluții eficiente și sigure pentru alimentarea și protecția sistemului electric." },
  { title: "Branșament Electric", desc: "Proiectarea și coordonarea branșamentului electric pentru conectarea la rețeaua de distribuție, respectând toate reglementările în vigoare." },
];

const SERVICES_RIGHT = [
  { title: "Termostate și Controlul Temperaturii", desc: "Proiectăm și instalăm termostate ambientale pentru controlul precis al temperaturii în fiecare încăpere." },
  { title: "Control Inteligent al Casei", desc: "Automatizări pentru lumini, temperatură, securitate și electrocasnice, controlabile prin aplicații mobile." },
  { title: "Racorduri pentru Electrocasnice Mari", desc: "Puncte de alimentare suplimentare pentru electrocasnice de mari dimensiuni, mai ales în bucătărie." },
  { title: "Interfon Video pentru Siguranță", desc: "Proiectăm sisteme de interfon video pentru un plus de securitate și confort." },
  { title: "Verificarea Execuției", desc: "Oferim verificarea execuțiilor pentru a asigura conformitatea și calitatea lucrărilor realizate." },
  { title: "Sprijin în Găsirea Electricianului Potrivit", desc: "Ajutăm clienții să găsească un electrician calificat și le oferim carnetul de sarcini, pentru a asigura că execuția se desfășoară conform proiectului." },
];

export function ServicesSection() {
  const [hoveredLeft, setHoveredLeft] = useState<number | null>(null);
  const [hoveredRight, setHoveredRight] = useState<number | null>(null);

  const serviceItem = (
    item: { title: string; desc: string },
    idx: number,
    hovered: number | null,
    setHovered: (i: number | null) => void,
  ) => (
    <li
      key={item.title}
      onMouseEnter={() => setHovered(idx)}
      onMouseLeave={() => setHovered(null)}
      style={{
        position: "relative",
        padding: "18px 0 18px 48px",
        borderBottom: "1px solid rgba(143,224,232,0.10)",
        cursor: "default",
        transition: "padding-left .2s ease",
        paddingLeft: hovered === idx ? 52 : 48,
      }}
    >
      {/* Bullet */}
      <span
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: 28,
          height: 28,
          background: hovered === idx ? "#8FE0E8" : "rgba(143,224,232,0.15)",
          borderRadius: 6,
          transition: "background .25s ease",
          display: "block",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: 16,
          color: hovered === idx ? "#072327" : "#8FE0E8",
          lineHeight: 1,
          transition: "color .25s ease",
          zIndex: 1,
        }}
      >
        +
      </span>
      <strong
        style={{
          fontFamily: "var(--font-barlow)",
          fontWeight: 600,
          fontSize: "clamp(13px, 1vw, 14.5px)",
          color: hovered === idx ? "#8FE0E8" : "#F2FBFC",
          display: "block",
          marginBottom: 2,
          transition: "color .2s ease",
          lineHeight: 1.35,
        }}
      >
        {item.title}
      </strong>
      <span
        style={{
          fontFamily: "var(--font-barlow)",
          fontWeight: 400,
          fontSize: "13px",
          color: hovered === idx ? "rgba(143,224,232,0.80)" : "rgba(143,224,232,0.55)",
          lineHeight: 1.55,
          transition: "color .2s ease",
        }}
      >
        {item.desc}
      </span>
    </li>
  );

  return (
    <section
      style={{
        position: "relative",
        paddingTop: "clamp(72px, 9vw, 130px)",
        paddingBottom: "clamp(72px, 9vw, 130px)",
        overflow: "hidden",
      }}
    >
      <SectionDivider />

      <style>{`
        @media (max-width: 767px) {
          .services-top-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .services-lists-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
      `}</style>

      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Top row: heading left, diagram image right */}
        <div
          className="services-top-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(24px, 4vw, 60px)",
            alignItems: "center",
            marginBottom: "clamp(40px, 5vw, 64px)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-plex-mono)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#8FE0E8",
                marginBottom: 18,
              }}
            >
              Proiectare rezidențială
            </div>
            <h2
              style={{
                fontFamily: "var(--font-barlow)",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                color: "#F2FBFC",
                maxWidth: "22ch",
              }}
            >
              Pentru locuința ta: proiect electric complet, de la branșament la smart home
            </h2>
          </div>
          <div>
            <Image
              src="/uploads/ce-oferim-transparent.png"
              alt="Prezentare Generală a Serviciilor Electrice"
              width={600}
              height={400}
              style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
            />
          </div>
        </div>

        {/* Two columns of services */}
        <div
          className="services-lists-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(0px, 4vw, 60px)" }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {SERVICES_LEFT.map((s, i) => serviceItem(s, i, hoveredLeft, setHoveredLeft))}
          </ul>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {SERVICES_RIGHT.map((s, i) => serviceItem(s, i, hoveredRight, setHoveredRight))}
          </ul>
        </div>
      </div>
    </section>
  );
}
