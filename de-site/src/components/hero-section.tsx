"use client";
import { useLayoutEffect, useState, type ReactNode } from "react";
import { Hero3DLazy } from "@/components/hero-3d-lazy";
import { HeroFilamentsSvg } from "@/components/hero-filaments-svg";
import { HeroStatsStripDe } from "@/components/hero-stats-strip";

/** The desktop/tablet/landscape composition lives in a fixed 1920×1080
    design canvas that's uniformly scaled (via CSS zoom) to fit whatever
    viewport it's shown in — width-ratio and height-ratio, whichever is
    smaller, so the icon/text/house "boxes" always sit at the same relative
    distance from each other and the same relative scale, on any window size
    or aspect ratio (4:3, ultrawide, whatever). Only mobile portrait — where
    a fixed-width canvas would either overflow or shrink text to nothing —
    falls back to its own fluid single-column composition below. */
const DESIGN_W = 1920;
const DESIGN_H = 1080;

/** Mobile portrait gets its own bespoke composition (ambient lines only, no
    house, no fixed design canvas) rather than a shrunk copy of the desktop
    layout — matched by width AND orientation so a rotated phone (landscape)
    still gets the scaled-desktop treatment instead of this. */
function useIsPortraitMobile(): boolean {
  const [isPortrait, setIsPortrait] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 767px) and (orientation: portrait)");
    const update = () => setIsPortrait(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isPortrait;
}

export function HeroSectionDe() {
  const isPortraitMobile = useIsPortraitMobile();

  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(130% 150% at 72% -10%, #12525B 0%, #0B373D 52%, #072327 100%)",
        overflow: "hidden",
      }}
    >
      <style>{`
        /* ── Mobile portrait — own fluid single-column composition ── */
        @media (max-width: 767px) and (orientation: portrait) {
          .hero-canvas {
            width: 100% !important;
            height: auto !important;
            min-height: 100vh !important;
            zoom: 1 !important;
          }
          .hero-icon-mark, .hero-canvas-wrapper { display: none !important; }
          .hero-content {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 100% !important;
            height: auto !important;
            min-height: 100vh !important;
            padding: 80px clamp(20px, 5vw, 40px) 72px !important;
            align-items: flex-start !important;
            text-align: left !important;
          }
          .hero-title-block, .hero-stats-wrapper { align-items: flex-start !important; }
          .hero-eyebrow, .hero-buttons { justify-content: flex-start !important; }
          .hero-h1 { text-align: left !important; font-size: clamp(28px, 7.5vw, 40px) !important; }
        }

        /* ── Heading/buttons + stats fade in shortly after mount ── */
        @keyframes hero-text-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-title-block { animation: hero-text-in 0.6s ease 0.15s both; }
        .hero-stats-wrapper { animation: hero-text-in 0.6s ease 0.45s both; }

        @media (prefers-reduced-motion: reduce) {
          .hero-title-block, .hero-stats-wrapper { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* Full-bleed decorative layers — NOT part of the zoomed design canvas
          below, so they always reach the true viewport edges regardless of
          aspect ratio (no letterboxing on the ambient background/lines,
          even though the icon/text/house canvas does letterbox to stay
          uniformly scaled). */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: [
            "radial-gradient(ellipse 60% 55% at 72% 38%, rgba(90,201,212,0.10), transparent 70%)",
            "radial-gradient(ellipse 55% 60% at 14% 78%, rgba(143,224,232,0.06), transparent 72%)",
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
      <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none" }}>
        <HeroFilamentsSvg />
      </div>

      {/* Fixed design canvas — uniformly zoomed to fit the viewport. Every
          child below is positioned in this same 1920×1080 pixel space, so
          nothing needs its own vw/vh-driven responsive formula: the zoom
          factor is the only thing that changes with window size. */}
      <div
        className="hero-canvas"
        style={{
          position: "relative",
          width: DESIGN_W,
          height: DESIGN_H,
          flexShrink: 0,
          zIndex: 30,
          zoom: `min(calc(100vw / ${DESIGN_W}px), calc(100vh / ${DESIGN_H}px))`,
        }}
      >
        {/* Three.js 3D canvas — confined to its own right-hand column so it
            can never collide with the centered text column. Skipped
            entirely on mobile portrait. */}
        {!isPortraitMobile && (
          <div
            className="hero-canvas-wrapper"
            style={{ position: "absolute", left: 1300, top: 0, width: 600, height: DESIGN_H, zIndex: 1, pointerEvents: "none" }}
          >
            <Hero3DLazy />
          </div>
        )}

        {/* Icon-only brand mark — its own left-hand column, vertically
            centered, roughly matching the 3D house's scale. No wordmark
            (that lives in the header now). Sits behind the text column. */}
        {!isPortraitMobile && (
          <div
            aria-hidden
            className="hero-icon-mark"
            style={{
              position: "absolute",
              left: 60,
              top: "50%",
              transform: "translateY(-50%)",
              width: 520,
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/uploads/icon_petrol.png"
              alt=""
              style={{ width: "100%", height: "auto", display: "block", opacity: 0.5 }}
            />
          </div>
        )}

        {/* Text content — its own middle column, centered both ways within it */}
        <div
          className="hero-content"
          style={{
            position: "absolute",
            left: 620,
            top: 0,
            width: 680,
            height: DESIGN_H,
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div className="hero-title-block" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="hero-eyebrow" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ width: 24, height: 1, background: "#5AC9D4", display: "block" }} />
              <span
                style={{
                  fontFamily: "var(--font-plex-mono)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#8FE0E8",
                }}
              >
                Electrical Engineering
              </span>
            </div>

            <h1
              className="hero-h1"
              style={{
                fontFamily: "var(--font-barlow)",
                // Shrunk from RO's 40px — the German headline wraps to 3
                // lines instead of RO's 2 (longer compound words), so it
                // needs a smaller footprint to fit the same vertical budget.
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: "-0.026em",
                lineHeight: 1.1,
                color: "#F2FBFC",
                maxWidth: "22ch",
                margin: "0 0 14px 0",
                textAlign: "center",
              }}
            >
              Sichere, effiziente Elektroinstallationen – präzise geplant
            </h1>

            <div
              className="hero-buttons"
              style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "center" }}
            >
              <HeroButton href="/#contact" variant="copper">Beratung anfragen</HeroButton>
              <HeroButton href="/portofoliu" variant="outline">Portfolio ansehen</HeroButton>
            </div>
          </div>

          <div className="hero-stats-wrapper" style={{ marginTop: 40 }}>
            <HeroStatsStripDe />
          </div>
        </div>
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
    width: 190,
    height: 38,
    borderRadius: 4,
    fontFamily: "var(--font-plex-mono)",
    fontSize: "9.5px",
    fontWeight: 700,
    letterSpacing: "0.12em",
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
          background: "#8FE0E8",
          color: "#072327",
          border: "1.5px solid #8FE0E8",
          boxShadow: "0 2px 14px rgba(143,224,232,0.22)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "#6fd0da";
          el.style.borderColor = "#6fd0da";
          el.style.transform = "translateY(-2px)";
          el.style.boxShadow = "0 6px 28px rgba(143,224,232,0.45)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "#8FE0E8";
          el.style.borderColor = "#8FE0E8";
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "0 2px 14px rgba(143,224,232,0.22)";
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
        background: "#072327",
        color: "#A9C9CC",
        border: "1.5px solid rgba(143,224,232,0.4)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "rgba(143,224,232,0.8)";
        el.style.color = "#F2FBFC";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "rgba(143,224,232,0.4)";
        el.style.color = "#A9C9CC";
        el.style.transform = "translateY(0)";
      }}
    >
      {children}
    </a>
  );
}
