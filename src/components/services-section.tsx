"use client";
import { useState } from "react";

const SERVICES_LEFT = [
  "Proiectare instalații electrice rezidențiale",
  "Proiectare instalații electrice comerciale",
  "Proiectare instalații electrice industriale",
  "Calcul și dimensionare tablouri electrice",
  "Proiectare sisteme fotovoltaice",
  "Planificare integrare centrală H₂",
];

const SERVICES_RIGHT = [
  "Proiectare BIM nativă în Autodesk Revit",
  "Calcul iluminat cu Dialux Evo",
  "Calcul protecții cu Siemens Simaris",
  "Automatizare KNX și Smart Home",
  "Documentație faze LP 1–5 HOAI",
  "Coordonare interdisciplinară BIM",
];

export function ServicesSection() {
  const [hoveredLeft, setHoveredLeft] = useState<number | null>(null);
  const [hoveredRight, setHoveredRight] = useState<number | null>(null);

  const serviceItem = (
    text: string,
    idx: number,
    hovered: number | null,
    setHovered: (i: number | null) => void,
  ) => (
    <li
      key={text}
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
      {/* Background square */}
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
      {/* + icon */}
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
      {text}
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
        {/* Section heading */}
        <div style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
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
              marginBottom: 0,
            }}
          >
            La Mayer E-Concept primești servicii complete de proiectare electrică
          </h2>
        </div>

        {/* Two columns of services */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px, 4vw, 60px)" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {SERVICES_LEFT.map((s, i) =>
              serviceItem(s, i, hoveredLeft, setHoveredLeft),
            )}
          </ul>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {SERVICES_RIGHT.map((s, i) =>
              serviceItem(s, i, hoveredRight, setHoveredRight),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
