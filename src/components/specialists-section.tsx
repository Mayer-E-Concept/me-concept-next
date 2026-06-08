"use client";
import { useState } from "react";
import Image from "next/image";

interface Tab {
  label: string;
  tabTitle: string;
  tabDesc: string;
  wideImage?: string;
  images: string[];
}

const BULLETS = [
  "Soluții tehnice inovatoare",
  "Standarde de calitate recunoscute",
  "Expertiză extinsă",
  "Practică Certificată ISO 9001:2015",
];

const TABS: Tab[] = [
  {
    label: "Proiecte instalații",
    tabTitle: "Proiectare de Sisteme Electrice",
    tabDesc: "La Mayer E-CONCEPT, proiectăm sisteme electrice eficiente și personalizate, adaptate cerințelor specifice ale clienților noștri. Cu acreditarea ISO 9001, garantăm calitatea, siguranța și profesionalismul în fiecare etapă a proiectului.",
    wideImage: "/uploads/PROIECTARE-INSTALATII-ELECTRICE.jpg",
    images: [],
  },
  {
    label: "Echipa",
    tabTitle: "Specialiști cu Experiență",
    tabDesc: "Echipa noastră este formată din ingineri cu experiență vastă în proiectarea instalațiilor electrice, pregătiți să ofere soluții complete și personalizate pentru orice tip de proiect.",
    images: [
      "/uploads/echipa-050.jpg",
      "/uploads/echipa-075.jpg",
      "/uploads/echipa-050.jpg",
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
        background: "#F6F7F7",
        paddingTop: "clamp(72px, 9vw, 130px)",
        paddingBottom: "clamp(72px, 9vw, 130px)",
        scrollMarginTop: "72px",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .specialists-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .specialists-tabs-overflow { overflow-x: auto; }
        }
      `}</style>

      <div
        className="specialists-grid"
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
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C5895B",
              marginBottom: 20,
            }}
          >
            Mayer E-Concept
          </div>

          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(30px, 3.4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
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
              fontSize: "clamp(14px, 1.1vw, 16px)",
              lineHeight: 1.75,
              color: "#335058",
              marginBottom: 36,
              maxWidth: "50ch",
            }}
          >
            Cu o experiență vastă și procese stricte de control al calității, ne asigurăm că fiecare
            proiect este executat cu profesionalism și meticulozitate. Alege Mayer E-Concept pentru
            siguranța și eficiența instalațiilor electrice!{" "}
            Contactează-ne astăzi pentru o consultanță gratuită!
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {BULLETS.map((b) => (
              <li
                key={b}
                style={{
                  position: "relative",
                  paddingLeft: 24,
                  marginBottom: 14,
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(14px, 1.05vw, 16px)",
                  color: "#0E323D",
                  lineHeight: 1.55,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#C5895B",
                    flexShrink: 0,
                  }}
                />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — portfolio tabs */}
        <div id="portfolio">
          {/* Tab controls */}
          <div
            className="specialists-tabs-overflow"
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
                  padding: "12px 20px",
                  marginBottom: -1,
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: activeTab === i ? "#0E323D" : "#8A9498",
                  cursor: "pointer",
                  transition: "color .2s ease",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== i) (e.currentTarget as HTMLButtonElement).style.color = "#C5895B";
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== i) (e.currentTarget as HTMLButtonElement).style.color = "#8A9498";
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(20px, 2vw, 28px)",
              fontWeight: 700,
              letterSpacing: "-0.015em",
              color: "#0E323D",
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            {TABS[activeTab].tabTitle}
          </h3>

          {TABS[activeTab].wideImage ? (
            <div style={{ borderRadius: 10, overflow: "hidden", aspectRatio: "21/8", marginBottom: 16 }}>
              <Image
                src={TABS[activeTab].wideImage}
                alt={TABS[activeTab].tabTitle}
                width={1200}
                height={457}
                priority={activeTab === 0}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              <div style={{ borderRadius: 10, overflow: "hidden", aspectRatio: "4/3" }}>
                <Image
                  src={TABS[activeTab].images[0]}
                  alt={TABS[activeTab].tabTitle}
                  width={600}
                  height={450}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ borderRadius: 10, overflow: "hidden", aspectRatio: "4/3" }}>
                <Image
                  src={TABS[activeTab].images[1]}
                  alt={`${TABS[activeTab].tabTitle} 2`}
                  width={600}
                  height={300}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>
          )}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
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
