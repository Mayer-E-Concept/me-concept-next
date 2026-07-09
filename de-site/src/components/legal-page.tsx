import Link from "next/link";
import { SiteHeaderDe } from "@/components/site-header";
import { SiteFooterDe } from "@/components/site-footer";

interface LegalSection {
  title: string;
  content: string | string[];
  subsections?: { title: string; content: string }[];
}

interface LegalPageDeProps {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
  contactInfo?: {
    company: string;
    address: string;
    country: string;
    website: string;
    email: string;
    phone?: string;
  };
  backLabel?: string;
  contactLabel?: string;
}

export function LegalPageDe({
  title,
  lastUpdated,
  sections,
  contactInfo,
  backLabel = "← Startseite",
  contactLabel = "Kontaktdaten",
}: LegalPageDeProps) {
  return (
    <>
      <SiteHeaderDe />
      <main
        style={{
          minHeight: "100vh",
          color: "#F2FBFC",
          paddingTop: "calc(72px + clamp(48px, 6vw, 96px))",
          paddingBottom: "clamp(64px, 8vw, 120px)",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 40px)",
          }}
        >
          {/* Breadcrumb */}
          <nav style={{ marginBottom: 40 }}>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-plex-mono)",
                fontSize: "11.5px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8FE0E8",
                textDecoration: "none",
              }}
            >
              {backLabel}
            </Link>
          </nav>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "clamp(26px, 3.5vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "#F2FBFC",
              marginBottom: 12,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: 14,
              color: "#7FA2A6",
              marginBottom: 56,
              borderBottom: "1px solid rgba(143,224,232,0.08)",
              paddingBottom: 32,
            }}
          >
            {lastUpdated}
          </p>

          {/* Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {sections.map((section, i) => (
              <section key={i}>
                <h2
                  style={{
                    fontFamily: "var(--font-barlow)",
                    fontSize: "clamp(16px, 1.5vw, 19px)",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: "#F2FBFC",
                    marginBottom: 14,
                  }}
                >
                  {section.title}
                </h2>
                {Array.isArray(section.content) ? (
                  <ul
                    style={{
                      fontFamily: "var(--font-barlow)",
                      fontSize: 15,
                      lineHeight: 1.75,
                      color: "#A9C9CC",
                      paddingLeft: 24,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {section.content.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p
                    style={{
                      fontFamily: "var(--font-barlow)",
                      fontSize: 15,
                      lineHeight: 1.75,
                      color: "#A9C9CC",
                    }}
                  >
                    {section.content}
                  </p>
                )}
                {section.subsections?.map((sub, j) => (
                  <div key={j} style={{ marginTop: 20, paddingLeft: 16, borderLeft: "2px solid rgba(143,224,232,0.25)" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-barlow)",
                        fontSize: 14,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        color: "#F2FBFC",
                        marginBottom: 8,
                      }}
                    >
                      {sub.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-barlow)",
                        fontSize: 15,
                        lineHeight: 1.75,
                        color: "#A9C9CC",
                      }}
                    >
                      {sub.content}
                    </p>
                  </div>
                ))}
              </section>
            ))}

            {/* Contact info box */}
            {contactInfo && (
              <section
                style={{
                  background: "rgba(143,224,232,0.04)",
                  border: "1px solid rgba(143,224,232,0.10)",
                  borderRadius: 8,
                  padding: "24px 28px",
                  marginTop: 8,
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-barlow)",
                    fontSize: "clamp(16px, 1.5vw, 19px)",
                    fontWeight: 700,
                    color: "#F2FBFC",
                    marginBottom: 16,
                  }}
                >
                  {contactLabel}
                </h2>
                <div
                  style={{
                    fontFamily: "var(--font-barlow)",
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: "#A9C9CC",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <span style={{ color: "#F2FBFC", fontWeight: 600 }}>{contactInfo.company}</span>
                  <span>{contactInfo.address}</span>
                  <span>{contactInfo.country}</span>
                  <a href={contactInfo.website} style={{ color: "#8FE0E8", textDecoration: "none" }}>{contactInfo.website}</a>
                  <a href={`mailto:${contactInfo.email}`} style={{ color: "#8FE0E8", textDecoration: "none" }}>{contactInfo.email}</a>
                  {contactInfo.phone && <span>{contactInfo.phone}</span>}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      <SiteFooterDe />
    </>
  );
}
