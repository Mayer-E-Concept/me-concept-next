"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Elektroplanung", href: "/de" },
  { label: "Über uns", href: "/de/#ueber-uns" },
  { label: "Portfolio", href: "/de/portofoliu" },
  { label: "Blog", href: "/de/blog" },
  { label: "Kontakt", href: "/de/#contact" },
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
        .nav-row-de { justify-content: center; }
        @media (max-width: 767px) {
          .nav-hamburger-de { display: flex !important; }
          .nav-desktop-de   { display: none !important; }
          .nav-row-de { justify-content: flex-end; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .nav-desktop-de { gap: 18px; }
          .nav-desktop-de a { font-size: 11px !important; letter-spacing: 0.06em !important; }
        }
        .ham-bar-de {
          display: block;
          width: 24px;
          height: 2px;
          background: rgba(255,255,255,0.85);
          transition: transform .3s ease, opacity .3s ease, background .2s ease;
          border-radius: 1px;
        }
        .ham-open-de-1 { transform: translateY(7px) rotate(45deg); background: #C5895B; }
        .ham-open-de-2 { opacity: 0; }
        .ham-open-de-3 { transform: translateY(-7px) rotate(-45deg); background: #C5895B; }
        .mobile-overlay-de {
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
        .mobile-overlay-de-closed { transform: translateX(100%); opacity: 0; pointer-events: none; }
        .mobile-overlay-de-open   { transform: translateX(0);    opacity: 1; pointer-events: all; }
        .mobile-nav-link-de {
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
        .mobile-nav-link-de:first-of-type { border-top: 1px solid rgba(255,255,255,0.06); }
        .mobile-nav-link-de:hover { color: #C5895B; }
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
          className="nav-row-de"
          style={{
            display: "flex",
            alignItems: "center",
            width: "92%",
            maxWidth: "1340px",
            margin: "0 auto",
          }}
        >
          {/* Desktop nav */}
          <nav className="nav-desktop-de" style={{ alignItems: "center" }}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => { if (item.href === "/de") window.scrollTo({ top: 0, behavior: "smooth" }); }}
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
            onClick={() => { setMenuOpen(false); if (item.href === "/de") window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
