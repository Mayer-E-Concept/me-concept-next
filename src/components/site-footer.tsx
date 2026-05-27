"use client";
import Image from "next/image";
import Link from "next/link";

const NAV = [
  { label: "Acasă", href: "/" },
  { label: "Servicii", href: "/#servicii" },
  { label: "Portofoliu", href: "/portofoliu" },
  { label: "Despre noi", href: "/#despre" },
  { label: "Contact", href: "/#contact" },
];

const LEGAL = [
  { label: "Politică cookie-uri (UE)", href: "/politica-cookie-uri-ue" },
  { label: "Termeni și condiții", href: "/termeni-si-conditii" },
  { label: "Politică de confidențialitate", href: "/politica-de-confidentialitate" },
  { label: "Blog", href: "/blog" },
  { label: "Cariere", href: "#" },
];

export function SiteFooter() {
  return (
    <footer
      style={{
        background: "#051E27",
        borderTop: "1px solid rgba(255,255,255,0.06)",
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
          {/* Left — logo + tagline */}
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
                fontFamily: "var(--font-body)",
                fontSize: 14,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.50)",
                maxWidth: "36ch",
                marginBottom: 20,
              }}
            >
              Proiectare instalații electrice pentru clădiri rezidențiale și
              comerciale. Certificare ISO 9001:2015. Sibiu & Germania.
            </p>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.50)" }}>
              <a
                href="mailto:contact@me-concept.ro"
                style={{ color: "rgba(255,255,255,0.50)", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#C5895B")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.50)")}
              >
                contact@me-concept.ro
              </a>
            </div>
          </div>

          {/* Right — nav links */}
          <nav style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 4 }}>
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.50)",
                  textDecoration: "none",
                  transition: "color .2s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#C5895B")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.50)")}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          className="footer-bottom-bar"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "18px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0 }}>
            © {new Date().getFullYear()} Mayer E-Concept SRL. Toate drepturile rezervate.
          </p>
          <div className="footer-legal-links" style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {LEGAL.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                  transition: "color .2s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#C5895B")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
