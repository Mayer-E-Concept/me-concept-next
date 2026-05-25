"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Acasă", href: "/" },
  { label: "Servicii", href: "#servicii" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Despre noi", href: "#despre" },
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

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
        transition: "background-color .25s ease, box-shadow .25s ease, padding .25s ease",
        padding: scrolled ? "12px 0" : "18px 0",
        backgroundColor: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
        backdropFilter: scrolled ? "saturate(140%) blur(10px)" : "none",
        boxShadow: scrolled ? "0 4px 18px rgba(14,50,61,0.06)" : "none",
        borderBottom: "none",
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
        {/* Logo — hidden until scrolled */}
        <div
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
              style={{ maxHeight: 40, width: "auto", objectFit: "contain" }}
              priority
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                fontSize: "12.5px",
                fontWeight: 600,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: "#0E323D",
                textDecoration: "none",
                padding: "8px 0",
                transition: "color .2s ease",
                fontFamily: "var(--font-sans)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C5895B")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#0E323D")}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
