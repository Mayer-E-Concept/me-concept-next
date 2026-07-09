"use client";
import { useLayoutEffect, useState, type ReactNode } from "react";
import { Hero3DLazy } from "@/components/hero-3d-lazy";
import { HeroFilamentsSvg } from "@/components/hero-filaments-svg";
import { HeroStatsStrip } from "@/components/hero-stats-strip";

const HERO_LEFT_INSET = "clamp(140px, 15vw, 220px)";

/** Mobile portrait gets its own bespoke composition (ambient lines only, no
    house) rather than a shrunk copy of the desktop layout — matched by width
    AND orientation so a rotated phone (landscape) still gets the
    scaled-desktop treatment instead of this. */
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

export function HeroSection() {
  const isPortraitMobile = useIsPortraitMobile();

  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "radial-gradient(130% 150% at 72% -10%, #12525B 0%, #0B373D 52%, #072327 100%)",
        overflow: "hidden",
      }}
    >
      <style>{`
        /* ── Mobile portrait ──────────────────────────────── */
        @media (max-width: 767px) and (orientation: portrait) {
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
        }

        /* ── Scaled canvas: tablet/laptop (768–1499px) AND any landscape
           phone (short height, regardless of width) ──────────────────────
           Rather than tuning each element's own responsive formula
           separately (which shrinks everything at different rates and never
           quite reads as "the same design, smaller"), the whole composition
           renders at a fixed 1920px-wide design size and gets uniformly
           zoomed down to fit the real viewport. Every vw/vh-driven value
           below is frozen to what it equals at that design width instead of
           reading the true (narrower) viewport — otherwise it would shrink
           twice over, once from its own formula and again from the zoom. */
        @media (min-width: 768px) and (max-width: 1499px),
               (orientation: landscape) and (max-height: 500px) {
          .hero-scale-canvas {
            width: 1920px !important;
            zoom: calc(100vw / 1920px) !important;
          }
          .hero-section .hero-content {
            padding-left: 220px !important;
            padding-right: 500px !important;
            padding-top: 110px !important;
            padding-bottom: 100px !important;
          }
          .hero-section .hero-h1 { font-size: 42px !important; }
          /* Full-bleed (like the >=1500px desktop treatment) would let the
             house's own aspect-ratio-based positioning (hero-3d-canvas.tsx)
             size/place it as if it owned the whole viewport width, which is
             exactly what the original 768–1499px fix (matching this box to
             the text's reserved gutter) existed to prevent. Same fix,
             re-applied here with the frozen design-space gutter width. */
          .hero-canvas-wrapper { left: auto !important; width: 500px !important; }
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

      <div className="hero-scale-canvas" style={{ position: "relative", width: "100%", alignSelf: "stretch" }}>
        {/* Gradient mesh — static depth layer under the circuit texture */}
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

        {/* PCB circuit pattern — white on dark */}
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

        {/* Three.js 3D canvas — full-bleed on tablet+/scaled; skipped entirely on
            mobile portrait, where there's no collision-free spot for it */}
        {!isPortraitMobile && (
          <div className="hero-canvas-wrapper" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
            <Hero3DLazy />
          </div>
        )}

        {/* SVG ambient schematic lines — thin cyan traces with junction dots */}
        <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none" }}>
          <HeroFilamentsSvg />
        </div>

        {/* Icon-only brand mark — sits in the left gutter, vertically centered,
            to the left of the heading. No wordmark (that lives in the header
            now) and no watermark-scale sizing — just a modest mark. */}
        {!isPortraitMobile && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: "clamp(20px, 4vw, 50px)",
              top: "50%",
              transform: "translateY(-50%)",
              width: "clamp(70px, 8vw, 140px)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/uploads/icon_petrol.png"
              alt=""
              style={{ width: "100%", height: "auto", display: "block", opacity: 0.55 }}
            />
          </div>
        )}

        {/* Text content — left column */}
        <div
          className="hero-content"
          style={{
            position: "relative",
            zIndex: 30,
            width: "100%",
            maxWidth: "1240px",
            margin: "0 auto",
            paddingLeft: HERO_LEFT_INSET,
            paddingRight: "clamp(420px, calc((100vw - 800px) * 0.46), 516px)",
            paddingTop: "clamp(80px, 10vh, 120px)",
            paddingBottom: "clamp(70px, 9vh, 110px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div className="hero-title-block">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
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
                fontSize: "clamp(24px, 3vw, 42px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "#F2FBFC",
                maxWidth: "22ch",
                margin: "0 0 22px 0",
                textAlign: "left",
              }}
            >
              Instalații electrice sigure, eficiente, proiectate cu grijă
            </h1>

            <div
              className="hero-buttons"
              style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}
            >
              <HeroButton href="/#contact" variant="copper">Solicită consultanță</HeroButton>
              <HeroButton href="/portofoliu" variant="outline">Vezi portofoliul</HeroButton>
            </div>
          </div>

          <div className="hero-stats-wrapper" style={{ marginTop: "clamp(32px, 5vh, 56px)" }}>
            <HeroStatsStrip />
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
    height: 44,
    borderRadius: 4,
    fontFamily: "var(--font-plex-mono)",
    fontSize: "10.5px",
    fontWeight: 500,
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
