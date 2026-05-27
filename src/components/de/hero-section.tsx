"use client";
import type { ReactNode } from "react";
import { Hero3DCanvas } from "@/components/hero-3d-canvas";
import { HeroStatsStripDe } from "@/components/de/hero-stats-strip";

export function HeroSectionDe() {
  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#051E27",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .hero-section .hero-content {
            padding-right: clamp(20px, 5vw, 40px) !important;
            padding-top: 100px !important;
            padding-bottom: 72px !important;
            align-items: flex-start !important;
          }
          .hero-section .hero-h1 {
            text-align: left !important;
            max-width: 100% !important;
            font-size: clamp(30px, 8.5vw, 44px) !important;
            margin-bottom: 28px !important;
          }
          .hero-section .hero-buttons {
            align-items: flex-start !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1199px) {
          .hero-section .hero-content {
            padding-left: clamp(24px, 4vw, 56px) !important;
            padding-right: clamp(260px, 36vw, 460px) !important;
          }
        }

        /* ── Hide 3D canvas + brand watermark on mobile ──── */
        @media (max-width: 767px) {
          .hero-canvas-wrapper { display: none !important; }
          .hero-brand-group { display: none !important; }
        }
      `}</style>

      {/* PCB circuit pattern */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: 'url("/assets/circuit-pattern.svg"), url("/assets/circuit-overlay.svg")',
          backgroundRepeat: "repeat, repeat",
          backgroundSize: "320px 320px, 200px 200px",
          backgroundPosition: "0 0, 80px 60px",
          filter: "invert(1)",
          opacity: 0.055,
        }}
      />

      {/* Brand mark watermark */}
      <div
        className="hero-brand-group"
        aria-hidden
        style={{
          position: "absolute",
          top: "clamp(60px, 12vh, 140px)",
          left: "clamp(20px, 12vw, 240px)",
          zIndex: 0,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/uploads/logo_text_only.png"
          alt=""
          style={{
            width: "clamp(220px, 30vw, 520px)",
            height: "auto",
            display: "block",
            filter: "brightness(0) invert(1)",
            opacity: 0.22,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/uploads/base_icon_transparent.png"
          alt=""
          style={{
            width: "clamp(210px, 28vw, 500px)",
            height: "auto",
            display: "block",
            filter: "brightness(0) invert(1)",
            opacity: 0.22,
          }}
        />
      </div>

      {/* Three.js 3D canvas — hidden on mobile */}
      <div className="hero-canvas-wrapper" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        <Hero3DCanvas />
      </div>

      {/* Text content */}
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
            color: "#F4F2EC",
            maxWidth: "26ch",
            margin: "0 0 36px 0",
            textAlign: "left",
          }}
        >
          Sichere, effiziente Elektroinstallationen – präzise geplant
        </h1>

        <div
          className="hero-buttons"
          style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}
        >
          <HeroButton href="#despre" variant="copper">Über uns</HeroButton>
          <HeroButton href="#contact" variant="outline">Kontakt aufnehmen</HeroButton>
        </div>

        <HeroStatsStripDe />
      </div>
    </section>
  );
}

function HeroButton({
  href,
  children,
  variant = "copper",
}: {
  href: string;
  children: ReactNode;
  variant?: "copper" | "outline";
}) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 240,
    height: 56,
    borderRadius: 4,
    fontFamily: "var(--font-sans)",
    fontSize: "12.5px",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "background .2s ease, border-color .2s ease, transform .2s ease, color .2s ease",
    boxSizing: "border-box",
  };

  if (variant === "copper") {
    return (
      <a
        href={href}
        style={{ ...base, background: "#C5895B", color: "#fff", border: "1.5px solid #C5895B" }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "#b37a50";
          el.style.borderColor = "#b37a50";
          el.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "#C5895B";
          el.style.borderColor = "#C5895B";
          el.style.transform = "translateY(0)";
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      style={{
        ...base,
        background: "transparent",
        color: "rgba(255,255,255,0.75)",
        border: "1.5px solid rgba(255,255,255,0.28)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "rgba(255,255,255,0.65)";
        el.style.color = "#fff";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "rgba(255,255,255,0.28)";
        el.style.color = "rgba(255,255,255,0.75)";
        el.style.transform = "translateY(0)";
      }}
    >
      {children}
    </a>
  );
}
