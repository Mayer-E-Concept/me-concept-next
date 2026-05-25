"use client";
import Link from "next/link";
import Image from "next/image";
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
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLight = scrolled || menuOpen;
  const navColor = isLight ? "#0E323D" : "rgba(255,255,255,0.85)";
  const barColor = isLight ? "#0E323D" : "#FFFFFF";
  const logoFilter = isLight ? "none" : "brightness(0) invert(1)";

  return (
    <>
      <style>{`
        .site-header-hamburger { display: none; }
        @media (max-width: 767px) {
          .site-header-desktop-nav { display: none !important; }
          .site-header-hamburger { display: flex !important; }
          .site-header-logo { opacity: 1 !important; transform: translateY(0) !important; pointer-events: auto !important; }
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          transition: "background-color .25s ease, box-shadow .25s ease, padding .25s ease",
          padding: scrolled ? "12px 0" : "18px 0",
          backgroundColor: isLight ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: isLight ? "saturate(140%) blur(10px)" : "none",
          boxShadow: isLight ? "0 4px 18px rgba(14,50,61,0.06)" : "none",
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
          {/* Logo — hidden until scrolled on desktop, always visible on mobile */}
          <div
            className="site-header-logo"
            style={{
              opacity: scrolled ? 1 : 0,
              transform: scrolled ? "translateY(0)" : "translateY(-6px)",
              pointerEvents: scrolled ? "auto" : "none",
              transition: "opacity .25s ease, transform .25s ease",
            }}
          >
            <Link href="/">
              <Image
                src="/uploads/base_logo_transparent_background-1.png"
                alt="ME-Concept logo"
                width={160}
                height={40}
                style={{ maxHeight: 40, width: "auto", objectFit: "contain", filter: logoFilter, transition: "filter .25s ease" }}
                priority
              />
            </Link>
          </div>

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
                  color: navColor,
                  textDecoration: "none",
                  padding: "8px 0",
                  transition: "color .2s ease",
                  fontFamily: "var(--font-sans)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C5895B")}
                onMouseLeave={(e) => (e.currentTarget.style.color = navColor)}
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
              background: barColor,
              transition: "transform .2s ease, opacity .2s ease, background .25s ease",
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
            }} />
            <span style={{
              display: "block", width: 24, height: 2,
              background: barColor,
              transition: "opacity .2s ease, background .25s ease",
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block", width: 24, height: 2,
              background: barColor,
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
