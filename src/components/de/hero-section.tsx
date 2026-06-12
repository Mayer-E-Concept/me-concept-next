"use client";
import type { ReactNode } from "react";
import { Hero3DLazy } from "@/components/hero-3d-lazy";
import { HeroFilamentsSvg } from "@/components/hero-filaments-svg";
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
            padding-top: 80px !important;
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
          .hero-mobile-brand { display: flex !important; }
        }

        .hero-mobile-brand { display: none; }

        @media (min-width: 768px) and (max-width: 1199px) {
          .hero-section .hero-content {
            padding-left: clamp(24px, 4vw, 56px) !important;
            padding-right: clamp(260px, 36vw, 460px) !important;
          }
        }

        /* ── Hide 3D canvas + brand watermark on mobile/tablet ──── */
        @media (max-width: 767px) {
          .hero-canvas-wrapper { display: none !important; }
          .hero-brand-group { display: none !important; }
        }

        /* ── Hide brand watermark where it would overlap text ── */
        @media (min-width: 768px) and (max-width: 1499px) {
          .hero-brand-group { display: none !important; }
        }

        /* ── Large screens: vertically centered, scales with resolution ── */
        @media (min-width: 1500px) {
          .hero-brand-group {
            left: clamp(20px, 3vw, 60px) !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            width: clamp(140px, calc((100vw - 1240px) / 2 - 30px), 520px) !important;
            overflow: hidden !important;
          }
          .hero-brand-group img {
            width: 100% !important;
          }
        }
      `}</style>

      {/* PCB circuit pattern */}
      {/* Gradient mesh — static depth layer under the circuit texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: [
            "radial-gradient(ellipse 60% 55% at 72% 38%, rgba(74,171,184,0.10), transparent 70%)",
            "radial-gradient(ellipse 55% 60% at 14% 78%, rgba(197,137,91,0.07), transparent 72%)",
            "radial-gradient(ellipse 75% 55% at 42% 8%, rgba(14,50,61,0.55), transparent 75%)",
          ].join(", "),
        }}
      />

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
          zIndex: 10,
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
        <Hero3DLazy />
      </div>

      {/* SVG horizontal lines — from logo centre, with animated amber dots */}
      <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none" }}>
        <HeroFilamentsSvg />
      </div>

      {/* Text content */}
      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 30,
          width: "100%",
          maxWidth: "1240px",
          margin: "0 auto",
          paddingLeft: "clamp(24px, 5vw, 100px)",
          paddingRight: "clamp(420px, calc((100vw - 800px) * 0.46), 516px)",
          paddingTop: "clamp(80px, 10vh, 120px)",
          paddingBottom: "clamp(80px, 10vh, 120px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* Mobile-only brand block */}
        <div
          className="hero-mobile-brand"
          aria-hidden="true"
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 10,
            marginBottom: 32,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/uploads/logo_text_only.png"
            alt=""
            style={{
              width: "clamp(150px, 44vw, 210px)",
              height: "auto",
              display: "block",
              filter: "brightness(0) invert(1)",
              opacity: 0.75,
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/uploads/base_icon_transparent.png"
            alt=""
            style={{
              width: "clamp(100px, 30vw, 150px)",
              height: "auto",
              display: "block",
              filter: "brightness(0) invert(1)",
              opacity: 0.70,
            }}
          />
        </div>

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
          <HeroButton href="#contact" variant="copper">Beratung anfragen</HeroButton>
          <HeroButton href="/de/portofoliu" variant="outline">Portfolio ansehen</HeroButton>
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
    transition: "background .2s ease, border-color .2s ease, transform .2s ease, color .2s ease, box-shadow .25s ease",
    boxSizing: "border-box",
  };

  if (variant === "copper") {
    return (
      <a
        href={href}
        style={{
          ...base,
          background: "#C5895B",
          color: "#fff",
          border: "1.5px solid #C5895B",
          boxShadow: "0 2px 14px rgba(197,137,91,0.22)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "#b37a50";
          el.style.borderColor = "#b37a50";
          el.style.transform = "translateY(-2px)";
          el.style.boxShadow = "0 6px 28px rgba(197,137,91,0.45)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "#C5895B";
          el.style.borderColor = "#C5895B";
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "0 2px 14px rgba(197,137,91,0.22)";
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
        background: "#051E27",
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
