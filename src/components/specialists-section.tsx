"use client";
import { useState } from "react";
import Image from "next/image";

const BULLETS = [
  "Proiectare electrică faze LP 1–5 pentru clădiri rezidențiale și comerciale",
  "Coordonare interdisciplinară BIM: electric, HVAC, arhitectură în Revit 3D",
  "Calcul iluminat (Dialux Evo) și protecții (Siemens Simaris) certificate",
  "Livrare documentație conform HOAI, DIN 18015, VDE 0100 pentru piața germană",
];

const TABS = [
  {
    label: "Rezidențial",
    images: [
      "/uploads/ME-CONCEPT-021.jpg",
      "/uploads/ME-CONCEPT-035.jpg",
      "/uploads/ME-CONCEPT-045.jpg",
    ],
  },
  {
    label: "Comercial",
    images: [
      "/uploads/ME-CONCEPT-083.jpg",
      "/uploads/ME-CONCEPT-089.jpg",
      "/uploads/ME-CONCEPT-137.jpg",
    ],
  },
  {
    label: "BIM & Revit",
    images: [
      "/uploads/PROIECTARE-Revit-1.jpg",
      "/uploads/PROIECTARE-Revit-2.jpg",
      "/uploads/PROIECTARE-Revit-3.jpg",
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
            Cu sediul în Sibiu și colaborări active în Germania, proiectăm
            instalații electrice de la faza de concept până la documentația
            de execuție — rezidențial, comercial, industrial.
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

          {/* Tab panel — 3 images */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "auto auto",
              gap: 12,
            }}
          >
            {TABS[activeTab].images.map((src, i) => (
              <div
                key={src}
                style={{
                  gridColumn: i === 0 ? "1 / span 2" : "auto",
                  borderRadius: 12,
                  overflow: "hidden",
                  aspectRatio: i === 0 ? "16/9" : "4/3",
                }}
              >
                <Image
                  src={src}
                  alt={`${TABS[activeTab].label} ${i + 1}`}
                  width={800}
                  height={i === 0 ? 450 : 300}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
