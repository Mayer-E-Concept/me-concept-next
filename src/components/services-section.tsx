"use client";
import { useState } from "react";
import Image from "next/image";

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
        padding: "16px 0 16px 44px",
        borderBottom: "1px solid #D8DCDE",
        fontFamily: "var(--font-body)",
        fontSize: 15,
        lineHeight: 1.55,
        color: hovered === idx ? "#C5895B" : "#0E323D",
        transition: "color .2s ease, padding-left .25s ease",
        paddingLeft: hovered === idx ? 48 : 44,
        cursor: "default",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: 28,
          height: 28,
          background: hovered === idx ? "#C5895B" : "rgba(15,76,92,0.10)",
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
          color: hovered === idx ? "#fff" : "#1A6F7A",
          lineHeight: 1,
          transition: "color .25s ease",
          zIndex: 1,
        }}
      >
        +
      </span>
      <strong style={{ fontWeight: 600, display: "block", marginBottom: 2 }}>{item.title}:</strong>
      <span style={{ fontWeight: 400, color: hovered === idx ? "#C5895B" : "#335058" }}>{item.desc}</span>
    </li>
  );

  return (
    <section
      style={{
        position: "relative",
        background: "#ECEFF0",
        paddingTop: "clamp(72px, 9vw, 130px)",
        paddingBottom: "clamp(72px, 9vw, 130px)",
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          position: "absolute",
          top: "clamp(40px, 5vw, 70px)",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-sans)",
          fontSize: "11.5px",
          fontWeight: 600,
          letterSpacing: "0.22em",
          color: "#0F4C5C",
          whiteSpace: "nowrap",
        }}
      >
        SERVICII COMPLETE
      </div>

      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
        {/* Top row: heading left, diagram image right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(24px, 4vw, 60px)",
            alignItems: "center",
            marginBottom: "clamp(32px, 4vw, 56px)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#0F4C5C",
                marginBottom: 14,
                paddingBottom: 14,
                borderBottom: "1px solid #D8DCDE",
                display: "inline-block",
              }}
            >
              Ce oferim
            </div>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(28px, 3.2vw, 40px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                color: "#0E323D",
                maxWidth: "22ch",
              }}
            >
              La Mayer E Concept, oferim soluții complete de proiectare electrică, adaptate nevoilor fiecărui client.
            </h2>
          </div>
          <div style={{ borderRadius: 12, overflow: "hidden" }}>
            <Image
              src="/uploads/ce-oferim.png"
              alt="Prezentare Generală a Serviciilor Electrice"
              width={600}
              height={400}
              style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
            />
          </div>
        </div>

        {/* Two columns of services */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px, 4vw, 60px)" }}>
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
