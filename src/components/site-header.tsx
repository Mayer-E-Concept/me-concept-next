"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Proiectare Instalații Electrice", href: "/" },
  { label: "Despre noi", href: "/#despre" },
  { label: "Portofoliu", href: "/portofoliu" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showBg = scrolled || menuOpen;

  return (
    <>
      <style>{`
        .site-header-hamburger { display: none; }
        @media (max-width: 767px) {
          .site-header-desktop-nav { display: none !important; }
          .site-header-hamburger { display: flex !important; }
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          padding: "18px 0",
          backgroundColor: showBg ? "rgba(5,30,39,0.96)" : "transparent",
          backdropFilter: showBg ? "saturate(130%) blur(12px)" : "none",
          boxShadow: showBg ? "0 2px 20px rgba(0,0,0,0.25)" : "none",
          transition: "background-color .3s ease, box-shadow .3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "92%",
            maxWidth: "1340px",
            margin: "0 auto",
          }}
        >
          {/* Desktop nav */}
          <nav className="site-header-desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
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
            className="site-header-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Meniu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {[
              menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              "none",
              menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            ].map((transform, i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 24,
                  height: 2,
                  background: "#FFFFFF",
                  transition: "transform .2s ease, opacity .2s ease",
                  transform,
                  opacity: i === 1 && menuOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <nav
            style={{
              borderTop: "1px solid rgba(255,255,255,0.12)",
              padding: "16px 0 8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  padding: "14px 5%",
                  fontFamily: "var(--font-sans)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
