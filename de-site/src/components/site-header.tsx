"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Startseite", href: "/" },
  { label: "Über uns", href: "/#ueber-uns" },
  { label: "Unser Team", href: "/unser-team" },
  { label: "Portfolio", href: "/portofoliu" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/#contact" },
];

export function SiteHeaderDe() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <style>{`
        .nav-hamburger-de { display: none !important; }
        .nav-desktop-de   { display: flex !important; gap: 32px; }
        .nav-row-de { justify-content: space-between; }
        .mobile-header-logo-de { display: none; }
        .desktop-header-logo-de { display: flex; }
        /* Below 1280px the 6 nav links + fixed-size logo no longer reliably
           fit on one line — links would wrap onto two lines and, being
           vertically centered, shift upward into the logo. Rather than
           fight that with ever-smaller fonts, use the hamburger menu for
           this whole range (phones through small laptops). */
        @media (max-width: 1279px) {
          .nav-hamburger-de { display: flex !important; }
          .nav-desktop-de   { display: none !important; }
          .nav-row-de { justify-content: flex-end; }
          .desktop-header-logo-de { display: none; }
          /* Centered independently of the flex row (which is now
             right-aligned for the hamburger alone) — otherwise the bar
             reads as empty on the left/center on mobile. */
          .mobile-header-logo-de {
            display: flex;
            align-items: center;
            gap: 8px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            height: 24px;
          }
        }
        .ham-bar-de {
          display: block;
          width: 24px;
          height: 2px;
          background: rgba(242,251,252,0.85);
          transition: transform .3s ease, opacity .3s ease, background .2s ease;
          border-radius: 1px;
        }
        .ham-open-de-1 { transform: translateY(7px) rotate(45deg); background: #8FE0E8; }
        .ham-open-de-2 { opacity: 0; }
        .ham-open-de-3 { transform: translateY(-7px) rotate(-45deg); background: #8FE0E8; }
        .mobile-overlay-de {
          position: fixed;
          inset: 0;
          z-index: 99990;
          background: rgba(7,35,39,0.97);
          backdrop-filter: blur(14px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;
          transition: transform .35s cubic-bezier(.4,0,.2,1), opacity .35s ease;
        }
        .mobile-overlay-de-closed { transform: translateX(100%); opacity: 0; pointer-events: none; }
        .mobile-overlay-de-open   { transform: translateX(0);    opacity: 1; pointer-events: all; }
        .mobile-nav-link-de {
          font-family: var(--font-plex-mono);
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(169,201,204,0.85);
          text-decoration: none;
          padding: 18px 40px;
          width: 100%;
          text-align: center;
          transition: color .2s ease;
          border-bottom: 1px solid rgba(143,224,232,0.10);
        }
        .mobile-nav-link-de:first-of-type { border-top: 1px solid rgba(143,224,232,0.10); }
        .mobile-nav-link-de:hover { color: #8FE0E8; }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          padding: "18px 0",
          backgroundColor: "rgba(7,35,39,0.96)",
          backdropFilter: "saturate(130%) blur(12px)",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.25)" : "none",
          transition: "background-color .3s ease, box-shadow .3s ease",
        }}
      >
        {/* Tapered divider — pointed at the far edges, full-height and
            connected through the middle (no diamond ornament). */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            display: "flex",
            padding: "0 clamp(20px, 5vw, 60px)",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "100%",
              background: "linear-gradient(to right, transparent, #5AC9D4)",
              opacity: 0.5,
            }}
          />
          <div
            style={{
              flex: 1,
              height: "100%",
              background: "linear-gradient(to left, transparent, #5AC9D4)",
              opacity: 0.5,
            }}
          />
        </div>
        <Link href="/" aria-label="Startseite" className="mobile-header-logo-de">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/uploads/icon_petrol.png"
            alt=""
            style={{ height: "100%", width: "auto", display: "block" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/uploads/textlogo_petrol.png"
            alt="Mayer E-Concept"
            style={{ height: "82%", width: "auto", display: "block" }}
          />
        </Link>
        <div
          className="nav-row-de"
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            boxSizing: "border-box",
            padding: "0 clamp(20px, 5vw, 60px)",
          }}
        >
          {/* Desktop logo lockup — icon + wordmark/tagline, left-aligned */}
          <Link href="/" aria-label="Startseite" className="desktop-header-logo-de" style={{ alignItems: "center", gap: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/uploads/icon_petrol.png" alt="" style={{ height: 54, width: "auto", display: "block" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/uploads/textlogo_petrol.png" alt="Mayer E-Concept" style={{ height: 45, width: "auto", display: "block" }} />
          </Link>

          {/* Desktop nav */}
          <nav className="nav-desktop-de" style={{ alignItems: "center" }}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => { if (item.href === "/") window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{
                  fontSize: "12.5px",
                  fontWeight: 600,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "rgba(169,201,204,0.85)",
                  textDecoration: "none",
                  padding: "8px 0",
                  transition: "color .2s ease",
                  fontFamily: "var(--font-plex-mono)",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#8FE0E8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(169,201,204,0.85)")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger button — mobile only */}
          <button
            className="nav-hamburger-de"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              flexDirection: "column",
              gap: 5,
              zIndex: 100001,
              position: "relative",
            }}
          >
            <span className={`ham-bar-de${menuOpen ? " ham-open-de-1" : ""}`} />
            <span className={`ham-bar-de${menuOpen ? " ham-open-de-2" : ""}`} />
            <span className={`ham-bar-de${menuOpen ? " ham-open-de-3" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div className={`mobile-overlay-de ${menuOpen ? "mobile-overlay-de-open" : "mobile-overlay-de-closed"}`}>
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="mobile-nav-link-de"
            onClick={() => { setMenuOpen(false); if (item.href === "/") window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
