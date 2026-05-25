"use client";
import { useState } from "react";
import Image from "next/image";

const BULLETS = [
  "Soluții tehnice inovatoare",
  "Standarde de calitate recunoscute",
  "Expertiză extinsă",
  "Practică Certificată ISO 9001:2015",
];

const TABS = [
  {
    label: "Proiecte instalații",
    tabTitle: "Proiectare de Sisteme Electrice",
    tabDesc: "La Mayer E-CONCEPT, proiectăm sisteme electrice eficiente și personalizate, adaptate cerințelor specifice ale clienților noștri. Cu acreditarea ISO 9001, garantăm calitatea, siguranța și profesionalismul în fiecare etapă a proiectului.",
    images: [
      "/uploads/ME-CONCEPT-021.jpg",
      "/uploads/ME-CONCEPT-162.jpg",
      "/uploads/electrician_31.jpg",
    ],
  },
  {
    label: "Echipa",
    tabTitle: "Specialiști cu experiență",
    tabDesc: "Echipa noastră este formată din ingineri cu experiență vastă în proiectarea instalațiilor electrice, pregătiți să ofere soluții complete și personalizate pentru orice tip de proiect.",
    images: [
      "/uploads/Design-fara-titlu-32.jpg",
      "/uploads/ME-CONCEPT-083-1.jpg",
      "/uploads/electrician_34.jpg",
    ],
  },
  {
    label: "Certificări",
    tabTitle: "Calitate Certificată ISO 9001",
    tabDesc: "Suntem certificați ISO 9001:2015 de SKYCERT. Fiecare proiect este realizat conform unui sistem de management al calității documentat și auditat periodic.",
    images: [
      "/uploads/SKYCERT9001.png",
      "/uploads/PROIECTARE-INSTALATII-ELECTRICE.jpg",
      "/uploads/PROIECTARE-MAYER-E-CONCEPT.jpg",
    ],
  },
];

export function SpecialistsSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="despre"
      style={{
        background: "#FFFFFF",
        paddingTop: "clamp(72px, 9vw, 130px)",
        paddingBottom: "clamp(72px, 9vw, 130px)",
      }}
    >
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px, 6vw, 100px)",
          alignItems: "start",
        }}
      >
        {/* Left — text + bullets */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#0F4C5C",
              marginBottom: 18,
              paddingBottom: 12,
              borderBottom: "1px solid #D8DCDE",
              display: "inline-block",
            }}
          >
            Mayer E-Concept
          </div>

          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(30px, 3.4vw, 44px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              color: "#0E323D",
              maxWidth: "22ch",
              marginBottom: 24,
            }}
          >
            Specialiști în proiectarea instalațiilor electrice
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.7,
              color: "#335058",
              marginBottom: 32,
              maxWidth: "50ch",
            }}
          >
            Cu o experiență vastă și procese stricte de control al calității, ne asigurăm că fiecare
            proiect este executat cu profesionalism și meticulozitate. Alege Mayer E-Concept pentru
            siguranța și eficiența instalațiilor electrice!{" "}
            <br />
            Contactează-ne astăzi pentru o consultanță gratuită!
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {BULLETS.map((b) => (
              <li
                key={b}
                style={{
                  position: "relative",
                  paddingLeft: 28,
                  marginBottom: 12,
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  color: "#0E323D",
                  lineHeight: 1.55,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    color: "#1A6F7A",
                    fontWeight: 700,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  →
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — portfolio tabs */}
        <div id="portfolio">
          {/* Tab controls */}
          <div
            style={{
              display: "flex",
              gap: 0,
              borderBottom: "1px solid #D8DCDE",
              marginBottom: 24,
            }}
          >
            {TABS.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === i ? "2px solid #C5895B" : "2px solid transparent",
                  padding: "14px 20px",
                  marginBottom: -1,
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: activeTab === i ? "#0E323D" : "#5E6B70",
                  cursor: "pointer",
                  transition: "color .2s ease",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== i) (e.currentTarget as HTMLButtonElement).style.color = "#C5895B";
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== i) (e.currentTarget as HTMLButtonElement).style.color = "#5E6B70";
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab title + description */}
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(22px, 2.4vw, 32px)",
              fontWeight: 700,
              letterSpacing: "-0.015em",
              color: "#0E323D",
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            {TABS[activeTab].tabTitle}
          </h3>

          {/* Tab panel — main image + secondary + description */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "4/3" }}>
              <Image
                src={TABS[activeTab].images[0]}
                alt={TABS[activeTab].tabTitle}
                width={600}
                height={450}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ borderRadius: 12, overflow: "hidden", flex: 1 }}>
                <Image
                  src={TABS[activeTab].images[1]}
                  alt={`${TABS[activeTab].tabTitle} 2`}
                  width={600}
                  height={300}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              lineHeight: 1.65,
              color: "#335058",
              margin: 0,
            }}
          >
            {TABS[activeTab].tabDesc}
          </p>
        </div>
      </div>
    </section>
  );
}
