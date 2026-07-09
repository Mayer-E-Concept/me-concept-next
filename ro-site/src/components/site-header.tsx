"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Acasă", href: "/" },
  { label: "Despre noi", href: "/#despre" },
  { label: "Echipa noastră", href: "/echipa-noastra" },
  { label: "Portofoliu", href: "/portofoliu" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
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
        .nav-hamburger { display: none !important; }
        .nav-desktop { display: flex !important; gap: 32px; }
        .nav-row { justify-content: space-between; }
        .mobile-header-logo { display: none; }
        .desktop-header-logo { display: flex; }
        @media (max-width: 767px) {
          .nav-hamburger { display: flex !important; }
          .nav-desktop { display: none !important; }
          .nav-row { justify-content: flex-end; }
          .desktop-header-logo { display: none; }
          /* Centered independently of the flex row (which is now
             right-aligned for the hamburger alone) — otherwise the bar
             reads as empty on the left/center on mobile. */
          .mobile-header-logo {
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            height: 26px;
            width: auto;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .nav-desktop { gap: 18px; }
          .nav-desktop a { font-size: 11px !important; letter-spacing: 0.06em !important; }
        }
        .ham-bar {
          display: block;
          width: 24px;
          height: 2px;
          background: rgba(242,251,252,0.85);
          transition: transform .3s ease, opacity .3s ease, background .2s ease;
          border-radius: 1px;
        }
        .ham-open-1 { transform: translateY(7px) rotate(45deg); background: #8FE0E8; }
        .ham-open-2 { opacity: 0; }
        .ham-open-3 { transform: translateY(-7px) rotate(-45deg); background: #8FE0E8; }
        .mobile-overlay {
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
        .mobile-overlay-closed { transform: translateX(100%); opacity: 0; pointer-events: none; }
        .mobile-overlay-open   { transform: translateX(0);    opacity: 1; pointer-events: all; }
        .mobile-nav-link {
          font-family: var(--font-plex-mono);
          font-size: 20px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(169,201,204,0.85);
          text-decoration: none;
          padding: 18px 40px;
          width: 100%;
          text-align: center;
          transition: color .2s ease;
          border-bottom: 1px solid rgba(143,224,232,0.10);
        }
        .mobile-nav-link:first-of-type { border-top: 1px solid rgba(143,224,232,0.10); }
        .mobile-nav-link:hover { color: #8FE0E8; }
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
              marginRight: -1,
              background: "#5AC9D4",
              opacity: 0.5,
              clipPath: "polygon(0% 50%, 100% 0%, 100% 100%)",
            }}
          />
          <div
            style={{
              flex: 1,
              height: "100%",
              background: "#5AC9D4",
              opacity: 0.5,
              clipPath: "polygon(100% 50%, 0% 0%, 0% 100%)",
            }}
          />
        </div>
        <Link href="/" aria-label="Acasă" className="mobile-header-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/uploads/icon_petrol.png"
            alt=""
            style={{ height: "100%", width: "auto", display: "block" }}
          />
        </Link>
        <div
          className="nav-row"
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            boxSizing: "border-box",
            padding: "0 clamp(20px, 5vw, 60px)",
          }}
        >
          {/* Desktop logo lockup — icon + wordmark/tagline, left-aligned */}
          <Link href="/" aria-label="Acasă" className="desktop-header-logo" style={{ alignItems: "center", gap: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/uploads/icon_petrol.png" alt="" style={{ height: 54, width: "auto", display: "block" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/uploads/textlogo_petrol.png" alt="Mayer E-Concept" style={{ height: 45, width: "auto", display: "block" }} />
          </Link>

          {/* Desktop nav */}
          <nav className="nav-desktop" style={{ alignItems: "center" }}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => { if (item.href === "/") window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(169,201,204,0.85)",
                  textDecoration: "none",
                  padding: "8px 0",
                  transition: "color .2s ease",
                  fontFamily: "var(--font-plex-mono)",
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
            className="nav-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Închide meniu" : "Deschide meniu"}
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
            <span className={`ham-bar${menuOpen ? " ham-open-1" : ""}`} />
            <span className={`ham-bar${menuOpen ? " ham-open-2" : ""}`} />
            <span className={`ham-bar${menuOpen ? " ham-open-3" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div className={`mobile-overlay ${menuOpen ? "mobile-overlay-open" : "mobile-overlay-closed"}`}>
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="mobile-nav-link"
            onClick={() => { setMenuOpen(false); if (item.href === "/") window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
