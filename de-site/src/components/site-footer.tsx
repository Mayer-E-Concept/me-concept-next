"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

const NAV = [
  { label: "Startseite", href: "/" },
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Portfolio", href: "/portofoliu" },
  { label: "ElecTriX", href: "/electrix" },
  { label: "Über uns", href: "/#ueber-uns" },
  { label: "Kontakt", href: "/#contact" },
];

const LEGAL = [
  { label: "Impressum", href: "/impressum" },
  { label: "Cookie-Richtlinie (EU)", href: "/cookie-richtlinie" },
  { label: "AGB", href: "/agb" },
  { label: "Datenschutzerklärung", href: "/datenschutzerklaerung" },
  { label: "Blog", href: "/blog" },
];

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Nach oben"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        zIndex: 60,
        width: 46,
        height: 46,
        borderRadius: "50%",
        background: "#0B373D",
        border: "1px solid rgba(143,224,232,0.30)",
        color: "#8FE0E8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity .25s ease, transform .25s ease, border-color .2s ease, background .2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(143,224,232,0.7)";
        e.currentTarget.style.background = "#0E4550";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(143,224,232,0.30)";
        e.currentTarget.style.background = "#0B373D";
      }}
    >
      <ArrowUp size={20} strokeWidth={2} />
    </button>
  );
}

export function SiteFooterDe() {
  return (
    <>
    <footer
      style={{
        background: "#072327",
        borderTop: "1px solid rgba(143,224,232,0.06)",
        paddingTop: 64,
        paddingBottom: 0,
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .footer-top-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .footer-bottom-bar { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          .footer-legal-links { gap: 12px !important; }
        }
      `}</style>

      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
        }}
      >
        <div
          className="footer-top-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "clamp(32px, 6vw, 80px)",
            alignItems: "start",
            paddingBottom: 48,
          }}
        >
          <div>
            <Link href="/" style={{ display: "inline-block", marginBottom: 16 }}>
              <Image
                src="/uploads/base_logo_transparent_background-1.png"
                alt="ME-Concept"
                width={160}
                height={40}
                style={{ maxHeight: 40, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p
              style={{
                fontFamily: "var(--font-barlow)",
                fontSize: 14,
                lineHeight: 1.65,
                color: "rgba(169,201,204,0.50)",
                maxWidth: "36ch",
                marginBottom: 20,
              }}
            >
              Elektroplanung für Wohn- und Gewerbeprojekte.
              ISO 9001:2015 Zertifizierung. Sibiu & Deutschland.
            </p>
            <div style={{ fontFamily: "var(--font-barlow)", fontSize: 13, color: "rgba(169,201,204,0.50)" }}>
              <a
                href="mailto:contact@me-concept.ro"
                style={{ color: "rgba(169,201,204,0.50)", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#8FE0E8")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(169,201,204,0.50)")}
              >
                contact@me-concept.ro
              </a>
            </div>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 4 }}>
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: "var(--font-plex-mono)",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "rgba(169,201,204,0.50)",
                  textDecoration: "none",
                  transition: "color .2s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#8FE0E8")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(169,201,204,0.50)")}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div
          className="footer-bottom-bar"
          style={{
            borderTop: "1px solid rgba(143,224,232,0.06)",
            padding: "18px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontFamily: "var(--font-barlow)", fontSize: 13, color: "rgba(169,201,204,0.35)", margin: 0 }}>
            © {new Date().getFullYear()} Mayer E-Concept. Alle Rechte vorbehalten.
          </p>
          <div className="footer-legal-links" style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {LEGAL.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: "var(--font-barlow)",
                  fontSize: 12,
                  color: "rgba(169,201,204,0.35)",
                  textDecoration: "none",
                  transition: "color .2s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#8FE0E8")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(169,201,204,0.35)")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
    <BackToTopButton />
    </>
  );
}
