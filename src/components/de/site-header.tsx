"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Elektroplanung", href: "/de" },
  { label: "Über uns", href: "/de/#despre" },
  { label: "Portfolio", href: "/de/portofoliu" },
  { label: "Blog", href: "/de/blog" },
  { label: "Kontakt", href: "#contact" },
];

export function SiteHeaderDe() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
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
        padding: "18px 0",
        backgroundColor: scrolled ? "rgba(5,30,39,0.96)" : "transparent",
        backdropFilter: scrolled ? "saturate(130%) blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.25)" : "none",
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
      </div>
    </header>
  );
}
