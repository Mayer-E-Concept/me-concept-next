"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Proiectare Instalații Electrice", href: "/" },
  { label: "Despre noi", href: "/#despre" },
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
        .nav-desktop { display: flex !important; }
        @media (max-width: 767px) {
          .nav-hamburger { display: flex !important; }
          .nav-desktop { display: none !important; }
        }
        .ham-bar {
          display: block;
          width: 24px;
          height: 2px;
          background: rgba(255,255,255,0.85);
          transition: transform .3s ease, opacity .3s ease, background .2s ease;
          border-radius: 1px;
        }
        .ham-open-1 { transform: translateY(7px) rotate(45deg); background: #C5895B; }
        .ham-open-2 { opacity: 0; }
        .ham-open-3 { transform: translateY(-7px) rotate(-45deg); background: #C5895B; }
        .mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 99990;
          background: rgba(5,30,39,0.97);
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
          font-family: var(--font-sans);
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.80);
          text-decoration: none;
          padding: 18px 40px;
          width: 100%;
          text-align: center;
          transition: color .2s ease;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .mobile-nav-link:first-of-type { border-top: 1px solid rgba(255,255,255,0.06); }
        .mobile-nav-link:hover { color: #C5895B; }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          padding: "18px 0",
          backgroundColor: scrolled || menuOpen ? "rgba(5,30,39,0.96)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "saturate(130%) blur(12px)" : "none",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.25)" : "none",
          transition: "background-color .3s ease, box-shadow .3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "92%",
            maxWidth: "1340px",
            margin: "0 auto",
          }}
        >
          {/* Logo — visible on all screen sizes */}
          <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/uploads/base_logo_transparent_background-1.png"
              alt="Mayer E-Concept"
              style={{
                height: "clamp(26px, 3.2vw, 36px)",
                width: "auto",
                display: "block",
                filter: "brightness(0) invert(1)",
                opacity: 0.90,
              }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="nav-desktop" style={{ gap: 32, alignItems: "center" }}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  fontSize: "12.5px",
                  fontWeight: 600,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  padding: "8px 0",
                  transition: "color .2s ease",
                  fontFamily: "var(--font-sans)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C5895B")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
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
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
