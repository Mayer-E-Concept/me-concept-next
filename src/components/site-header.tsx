"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Proiectare Instalații Electrice", href: "/" },
  { label: "Despre noi", href: "/#despre" },
  { label: "Portofoliu", href: "/portofoliu" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.65);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change / link click
  const closeMenu = () => setMenuOpen(false);

  const bgSolid  = "rgba(5,30,39,0.97)";
  const bgGlass  = scrolled ? bgSolid : "transparent";

  return (
    <>
      <style>{`
        /* ── tablet: reduce gap + font-size ── */
        @media (min-width: 768px) and (max-width: 1099px) {
          .sh-nav { gap: 20px !important; }
          .sh-nav a { font-size: 11px !important; letter-spacing: 0.08em !important; }
        }
        /* ── mobile: hide desktop nav, show hamburger ── */
        @media (max-width: 767px) {
          .sh-nav       { display: none !important; }
          .sh-hamburger { display: flex !important; }
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 99999,
          backgroundColor: bgGlass,
          backdropFilter: scrolled ? "saturate(140%) blur(14px)" : "none",
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.30)" : "none",
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
            height: 64,
          }}
        >
          {/* ── Logo ── */}
          <Link href="/" onClick={closeMenu} style={{ flexShrink: 0, lineHeight: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/uploads/logo_text_only.png"
              alt="Mayer E-Concept"
              style={{
                height: "clamp(22px, 2.4vw, 30px)",
                width: "auto",
                display: "block",
                filter: "brightness(0) invert(1)",
                opacity: 0.92,
              }}
            />
          </Link>

          {/* ── Desktop nav ── */}
          <nav
            className="sh-nav"
            style={{ display: "flex", gap: 30, alignItems: "center" }}
          >
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.82)",
                  textDecoration: "none",
                  padding: "8px 0",
                  transition: "color .2s ease",
                  fontFamily: "var(--font-sans)",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C5895B")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.82)")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ── Hamburger (mobile only) ── */}
          <button
            className="sh-hamburger"
            aria-label={menuOpen ? "Închide meniu" : "Deschide meniu"}
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              display: "none",          // overridden to flex on mobile via CSS
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              marginRight: -8,
            }}
          >
            {/* three-line icon */}
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.88)",
                  transformOrigin: "center",
                  transition: "transform .22s ease, opacity .22s ease",
                  transform:
                    menuOpen
                      ? i === 0 ? "translateY(7px) rotate(45deg)"
                      : i === 2 ? "translateY(-7px) rotate(-45deg)"
                      : "scaleX(0)"
                      : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* ── Mobile dropdown ── */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: menuOpen ? "400px" : "0",
            transition: "max-height .32s ease",
            backgroundColor: bgSolid,
            borderTop: menuOpen ? "1px solid rgba(255,255,255,0.08)" : "none",
          }}
        >
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "16px 0 20px",
              width: "92%",
              margin: "0 auto",
            }}
          >
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.78)",
                  textDecoration: "none",
                  padding: "13px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  fontFamily: "var(--font-sans)",
                  transition: "color .18s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C5895B")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.78)")}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
