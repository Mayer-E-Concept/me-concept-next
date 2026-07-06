"use client";
import { useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Hero3DLazy } from "@/components/hero-3d-lazy";
import { HeroFilamentsSvg } from "@/components/hero-filaments-svg";
import { HeroStatsStripDe } from "@/components/hero-stats-strip";
import {
  useHeroCableAnchor,
  CABLE_SPECS,
  TRACE_START,
  TRACE_DUR,
  TRACE_STAGGER,
} from "@/components/hero-filaments-data";

const HERO_LEFT_INSET = "clamp(140px, 15vw, 220px)";
const TITLE_ANCHOR_GAP = 24; // px of breathing room below the filament line before the heading starts

/** Seconds after mount until the named cable finishes drawing in — used to
    delay the text's own fade-in so it appears to arrive with its line
    instead of popping in immediately on page load. */
function cableArrivalTime(id: string) {
  const index = CABLE_SPECS.findIndex((c) => c.id === id);
  return TRACE_START + index * TRACE_STAGGER + TRACE_DUR;
}

/** Anchored children live inside `.hero-content`, but the filament lines (and
    the anchor coordinates from useHeroCableAnchor) are measured relative to
    `.hero-section` — and `.hero-section` vertically centers hero-content via
    flexbox, so the two boxes don't share an origin. This measures that gap so
    an anchor Y can be translated into a `top` that's correct inside
    hero-content, at any viewport size. */
function useContentOffsetWithinSection(ref: RefObject<HTMLElement | null>) {
  const [offset, setOffset] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    const section = el?.closest(".hero-section") as HTMLElement | null;
    if (!el || !section) return;

    const measure = () => {
      setOffset(el.getBoundingClientRect().top - section.getBoundingClientRect().top);
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(section);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return offset;
}

export function HeroSectionDe() {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentOffsetY = useContentOffsetWithinSection(contentRef);

  // "Upper" anchor = the filament line the heading/buttons should sit just
  // below; "lower" anchor = the line the stats strip should sit just below.
  // Both resolve to null below the 1500px breakpoint, where the diamond (and
  // its filament fan) aren't rendered at all — the blocks below fall back to
  // plain document flow there, unaffected by any of this.
  const upperAnchor = useHeroCableAnchor("hero-line-7");
  const lowerAnchor = useHeroCableAnchor("hero-line-3");

  const titleBlockStyle: React.CSSProperties | undefined = upperAnchor
    ? {
        position: "absolute",
        top: upperAnchor.y - contentOffsetY + TITLE_ANCHOR_GAP,
        left: HERO_LEFT_INSET,
        opacity: 0,
        animation: `hero-text-in 0.6s ease ${cableArrivalTime("hero-line-7").toFixed(2)}s both`,
      }
    : undefined;

  const statsWrapperStyle: React.CSSProperties | undefined = lowerAnchor
    ? {
        position: "absolute",
        top: lowerAnchor.y - contentOffsetY,
        left: HERO_LEFT_INSET,
        opacity: 0,
        animation: `hero-text-in 0.6s ease ${cableArrivalTime("hero-line-3").toFixed(2)}s both`,
      }
    : undefined;

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
        /* ── Mobile ───────────────────────────────────────── */
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

        /* Hidden on tablet+ (desktop watermark handles it there) */
        .hero-mobile-brand { display: none; }

        /* ── Tablet / Laptop 768–1199px ───────────────────── */
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

        /* ── Hide brand watermark on screens where it would overlap text ── */
        @media (min-width: 768px) and (max-width: 1499px) {
          .hero-brand-group { display: none !important; }
        }

        /* ── Large screens: vertically centered, scales with resolution ──
           The logo is now the dominant visual element on purpose — sized
           generously off viewport width rather than capped to the gutter
           beside the H1. It can extend toward/behind the heading; that's
           fine now that the heading is a muted secondary color and sits on
           top (z-index) of the watermark, not fighting it for attention. */
        @media (min-width: 1500px) {
          .hero-brand-group {
            left: clamp(20px, 3vw, 60px) !important;
            top: 50% !important;
            width: clamp(320px, 26vw, 800px) !important;
            overflow: visible !important;
          }
          .hero-brand-group img {
            width: 100% !important;
          }
        }

        /* ── Logo entrance — slides in from the left once, on mount ── */
        .hero-brand-group {
          animation: hero-logo-in 2.2s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes hero-logo-in {
          from { opacity: 0; transform: translateY(-50%) translateX(-90px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }

        /* ── Icon glow — pulses copper once the logo has settled, as if it's the power source for the filament lines ── */
        .hero-logo-icon {
          filter: brightness(0) invert(1) drop-shadow(0 0 6px rgba(120,74,44,0.35));
          animation: hero-logo-pulse 3.2s ease-in-out 2.2s infinite;
        }
        @keyframes hero-logo-pulse {
          0%, 100% { filter: brightness(0) invert(1) drop-shadow(0 0 6px rgba(120,74,44,0.35)); }
          50%      { filter: brightness(0) invert(1) drop-shadow(0 0 18px rgba(255,205,150,0.85)) drop-shadow(0 0 46px rgba(197,137,91,0.9)); }
        }

        /* ── Heading/buttons + stats fade in as their anchor filament line arrives ── */
        @keyframes hero-text-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-brand-group { animation: none !important; opacity: 1; }
          .hero-logo-icon { animation: none !important; }
          .hero-title-block, .hero-stats-wrapper { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

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

      {/* Brand mark — icon watermark */}
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
            opacity: 0.45,
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-logo-icon"
          src="/uploads/base_icon_transparent.png"
          alt=""
          style={{
            width: "clamp(210px, 28vw, 500px)",
            height: "auto",
            display: "block",
            opacity: 0.6,
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

      {/* Text content — left column */}
      <div
        className="hero-content"
        ref={contentRef}
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
        {/* Mobile-only brand block — same images as desktop watermark */}
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

        <div className="hero-title-block" style={titleBlockStyle}>
          <h1
            className="hero-h1"
            style={{
              fontFamily: "var(--font-sans)",
              // Shrunk from RO's clamp(24,3vw,42) — the German headline wraps
              // to 3 lines instead of RO's 2 (longer compound words), so it
              // needs a smaller footprint to fit the same vertical budget
              // between this anchor line and the stats line below it.
              fontSize: "clamp(20px, 2.5vw, 34px)",
              fontWeight: 800,
              letterSpacing: "-0.026em",
              lineHeight: 1.1,
              color: "rgba(244,242,236,0.55)",
              maxWidth: "22ch",
              margin: "0 0 14px 0",
              textAlign: "left",
            }}
          >
            Sichere, effiziente Elektroinstallationen – präzise geplant
          </h1>

          <div
            className="hero-buttons"
            style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}
          >
            <HeroButton href="/#contact" variant="copper">Beratung anfragen</HeroButton>
            <HeroButton href="/portofoliu" variant="outline">Portfolio ansehen</HeroButton>
          </div>
        </div>

        <div className="hero-stats-wrapper" style={statsWrapperStyle}>
          <HeroStatsStripDe />
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
    fontFamily: "var(--font-sans)",
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
