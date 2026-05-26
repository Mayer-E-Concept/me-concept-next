"use client";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Proiectare Instalații Electrice", href: "/" },
  { label: "Despre noi", href: "/#despre" },
  { label: "Portofoliu", href: "/portofoliu" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          backgroundColor: menuOpen ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: menuOpen ? "saturate(140%) blur(10px)" : "none",
          boxShadow: menuOpen ? "0 4px 18px rgba(14,50,61,0.06)" : "none",
          transition: "background-color .25s ease, box-shadow .25s ease",
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
            <span style={{
              display: "block", width: 24, height: 2,
              background: menuOpen ? "#0E323D" : "#FFFFFF",
              transition: "transform .2s ease, opacity .2s ease, background .25s ease",
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
            }} />
            <span style={{
              display: "block", width: 24, height: 2,
              background: menuOpen ? "#0E323D" : "#FFFFFF",
              transition: "opacity .2s ease, background .25s ease",
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block", width: 24, height: 2,
              background: menuOpen ? "#0E323D" : "#FFFFFF",
              transition: "transform .2s ease, opacity .2s ease, background .25s ease",
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }} />
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <nav
            style={{
              borderTop: "1px solid #D8DCDE",
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
                  color: "#0E323D",
                  textDecoration: "none",
                  padding: "14px 5%",
                  fontFamily: "var(--font-sans)",
                  borderBottom: "1px solid #F0F2F3",
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
