"use client";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { Hero3DCanvas } from "@/components/hero-3d-canvas";
import { HeroStatsStrip } from "@/components/hero-stats-strip";

export function HeroSection() {
  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#F6F7F7",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .hero-section .hero-content {
            padding-right: clamp(20px, 5vw, 40px) !important;
            padding-top: 110px !important;
            padding-bottom: 100px !important;
            align-items: center !important;
          }
          .hero-section .hero-h1 {
            text-align: center !important;
            max-width: 100% !important;
            font-size: clamp(32px, 8.5vw, 46px) !important;
            margin-bottom: 28px !important;
          }
          .hero-section .hero-buttons {
            align-items: center !important;
          }
          .hero-section .hero-brand-mark {
            width: 58vw !important;
            bottom: 80px !important;
          }
        }
      `}</style>

      {/* PCB circuit pattern background with horizontal fade mask */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            'url("/assets/circuit-pattern.svg"), url("/assets/circuit-overlay.svg")',
          backgroundRepeat: "repeat, repeat",
          backgroundSize: "320px 320px, 200px 200px",
          backgroundPosition: "0 0, 80px 60px",
          maskImage: `
            linear-gradient(to right,
              #000 0%, #000 22%,
              rgba(0,0,0,0.55) 50%,
              rgba(0,0,0,0.18) 75%,
              transparent 95%),
            linear-gradient(to bottom,
              transparent 0%, rgba(0,0,0,0.55) 8%,
              #000 18%, #000 82%,
              rgba(0,0,0,0.55) 92%, transparent 100%)
          `,
          WebkitMaskImage: `
            linear-gradient(to right,
              #000 0%, #000 22%,
              rgba(0,0,0,0.55) 50%,
              rgba(0,0,0,0.18) 75%,
              transparent 95%),
            linear-gradient(to bottom,
              transparent 0%, rgba(0,0,0,0.55) 8%,
              #000 18%, #000 82%,
              rgba(0,0,0,0.55) 92%, transparent 100%)
          `,
          maskComposite: "intersect" as CSSProperties["maskComposite"],
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Brand mark watermark — centered lower, larger */}
      <Image
        src="/assets/brand-mark.png"
        alt=""
        aria-hidden
        className="hero-brand-mark"
        width={600}
        height={600}
        style={{
          position: "absolute",
          bottom: "clamp(50px, 8vh, 140px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(240px, 30vw, 560px)",
          height: "auto",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.40,
          mixBlendMode: "multiply",
        }}
        priority
      />

      {/* Three.js 3D canvas — fills entire section behind text */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        <Hero3DCanvas />
      </div>

      {/* Text content — left column */}
      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1240px",
          margin: "0 auto",
          paddingLeft: "clamp(24px, 5vw, 100px)",
          paddingRight: "clamp(420px, calc((100vw - 800px) * 0.46), 860px)",
          paddingTop: "clamp(80px, 10vh, 120px)",
          paddingBottom: "clamp(80px, 10vh, 120px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h1
          className="hero-h1"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(36px, 4.6vw, 68px)",
            fontWeight: 800,
            letterSpacing: "-0.026em",
            lineHeight: 1.06,
            color: "#0E323D",
            maxWidth: "26ch",
            margin: "0 0 36px 0",
            textShadow: "none",
            textAlign: "left",
          }}
        >
          Instalații electrice sigure, eficiente, proiectate cu grijă
        </h1>

        <div
          className="hero-buttons"
          style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}
        >
          <HeroButton href="#despre">Despre noi</HeroButton>
          <HeroButton href="#contact">Contactați-ne</HeroButton>
        </div>

        <HeroStatsStrip />
      </div>
    </section>
  );
}

function HeroButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 240,
        height: 56,
        background: "#0E323D",
        color: "#ffffff",
        border: "1.5px solid #0E323D",
        borderRadius: 4,
        fontFamily: "var(--font-sans)",
        fontSize: "12.5px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        textDecoration: "none",
        whiteSpace: "nowrap",
        transition: "background .2s ease, border-color .2s ease, transform .2s ease",
        boxSizing: "border-box",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "#C5895B";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "#C5895B";
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "#0E323D";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "#0E323D";
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
      }}
    >
      {children}
    </a>
  );
}
