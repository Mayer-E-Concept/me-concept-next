"use client";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { Hero3DCanvas } from "@/components/hero-3d-canvas";
import { HeroStatsStrip } from "@/components/hero-stats-strip";

export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#F6F7F7",
        overflow: "hidden",
      }}
    >
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

      {/* Brand mark watermark — top-left, multiply blend */}
      <Image
        src="/assets/brand-mark.png"
        alt=""
        aria-hidden
        width={480}
        height={480}
        style={{
          position: "absolute",
          top: "clamp(50px, 6vh, 110px)",
          left: "clamp(-30px, 1vw, 40px)",
          width: "clamp(0px, calc((100vw - 800px) * 0.22), 480px)",
          height: "auto",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.55,
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
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1240px",
          margin: "0 auto",
          paddingLeft: "clamp(32px, 5vw, 100px)",
          paddingRight: "clamp(420px, calc((100vw - 800px) * 0.46), 860px)",
          paddingTop: "clamp(80px, 10vh, 120px)",
          paddingBottom: "clamp(80px, 10vh, 120px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h1
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
          Inginerie electrică{" "}
          <span style={{ color: "#1A6F7A" }}>de precizie</span>
        </h1>

        {/* Buttons row */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <HeroButton href="#contact">Solicită Consultanță</HeroButton>
          <HeroButton href="#portfolio">Vezi Portfolio</HeroButton>
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
