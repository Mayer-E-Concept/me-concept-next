import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_URL } from "@/lib/site";
import { BUSINESS } from "@/lib/business";

// Landing page for a local service (execution of electrical installations).
// Plain server component: all text is in the HTML for search engines.

export type ServiceBlock = { title: string; text: string; points?: string[] };
export type Faq = { q: string; a: string };

type Props = {
  path: string;
  eyebrow: string;
  title: string;
  intro: string[];
  blocks: ServiceBlock[];
  why: string[];
  steps: { title: string; text: string }[];
  areas: string[];
  faqs: Faq[];
  related?: { href: string; label: string };
  serviceName: string;
  serviceType: string;
};

const C = {
  text: "#F2FBFC",
  soft: "#BFD8D5",
  accent: "#8FE0E8",
  card: "rgba(143,224,232,0.05)",
  line: "rgba(143,224,232,0.14)",
};

const h2Style = {
  fontFamily: "var(--font-barlow)",
  fontSize: "clamp(24px, 3vw, 34px)",
  fontWeight: 800,
  letterSpacing: "-0.01em",
  lineHeight: 1.2,
  color: C.text,
  margin: "56px 0 20px",
} as const;
const pStyle = { fontSize: 17, lineHeight: 1.7, color: C.soft, margin: "0 0 16px" } as const;

export function ServiceLanding(p: Props) {
  const url = `${SITE_URL}${p.path}`;
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: p.serviceName,
      serviceType: p.serviceType,
      url,
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: p.areas.map((name) => ({ "@type": "City", name })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: p.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Acasă", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: p.serviceName, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <SiteHeader />
      <main
        style={{
          minHeight: "100vh",
          color: C.text,
          paddingTop: "calc(72px + clamp(48px, 6vw, 96px))",
          paddingBottom: "clamp(64px, 8vw, 120px)",
        }}
      >
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 clamp(20px, 5vw, 40px)" }}>
          <nav aria-label="Navigare" style={{ marginBottom: 32 }}>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-plex-mono)",
                fontSize: "11.5px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: C.accent,
                textDecoration: "none",
              }}
            >
              ← Acasă
            </Link>
          </nav>

          <p
            style={{
              fontFamily: "var(--font-plex-mono)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.accent,
              margin: "0 0 12px",
            }}
          >
            {p.eyebrow}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "clamp(30px, 4.4vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: C.text,
              margin: "0 0 24px",
            }}
          >
            {p.title}
          </h1>
          {p.intro.map((t) => (
            <p key={t} style={{ ...pStyle, fontSize: 19 }}>
              {t}
            </p>
          ))}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, margin: "28px 0 0" }}>
            <a
              href={`tel:${BUSINESS.phoneE164}`}
              style={{
                background: C.accent,
                color: "#072327",
                fontWeight: 700,
                padding: "14px 22px",
                borderRadius: 10,
                textDecoration: "none",
              }}
            >
              Sună: {BUSINESS.phoneDisplay}
            </a>
            <Link
              href="/#contact"
              style={{
                border: `1.5px solid ${C.line}`,
                color: C.text,
                fontWeight: 600,
                padding: "13px 22px",
                borderRadius: 10,
                textDecoration: "none",
              }}
            >
              Cere o ofertă
            </Link>
          </div>

          <h2 style={h2Style}>Ce executăm</h2>
          <div style={{ display: "grid", gap: 16 }}>
            {p.blocks.map((b) => (
              <section
                key={b.title}
                style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 14, padding: "22px 24px" }}
              >
                <h3 style={{ fontFamily: "var(--font-barlow)", fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 8px" }}>
                  {b.title}
                </h3>
                <p style={{ ...pStyle, margin: b.points ? "0 0 10px" : 0 }}>{b.text}</p>
                {b.points && (
                  <ul style={{ margin: 0, paddingLeft: 20, color: C.soft, lineHeight: 1.7, fontSize: 16 }}>
                    {b.points.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <h2 style={h2Style}>De ce Mayer E-Concept</h2>
          <ul style={{ margin: 0, paddingLeft: 20, color: C.soft, lineHeight: 1.8, fontSize: 17 }}>
            {p.why.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>

          <h2 style={h2Style}>Cum lucrăm</h2>
          <ol style={{ margin: 0, paddingLeft: 22, color: C.soft, lineHeight: 1.7, fontSize: 17 }}>
            {p.steps.map((s) => (
              <li key={s.title} style={{ marginBottom: 10 }}>
                <strong style={{ color: C.text }}>{s.title}</strong> – {s.text}
              </li>
            ))}
          </ol>

          <h2 style={h2Style}>Zona în care lucrăm</h2>
          <p style={pStyle}>
            Executăm lucrări în {p.areas.slice(0, -1).join(", ")} și {p.areas[p.areas.length - 1]}. Pentru proiecte mai mari
            venim și în alte localități din județul Sibiu – întreabă-ne.
          </p>

          <h2 style={h2Style}>Întrebări frecvente</h2>
          <div style={{ display: "grid", gap: 10 }}>
            {p.faqs.map((f) => (
              <details key={f.q} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: "16px 20px" }}>
                <summary style={{ cursor: "pointer", fontWeight: 600, color: C.text, fontSize: 17 }}>{f.q}</summary>
                <p style={{ ...pStyle, margin: "10px 0 0" }}>{f.a}</p>
              </details>
            ))}
          </div>

          <section
            style={{
              marginTop: 56,
              background: C.card,
              border: `1px solid ${C.line}`,
              borderRadius: 16,
              padding: "28px 28px",
            }}
          >
            <h2 style={{ ...h2Style, margin: "0 0 10px" }}>Ai o lucrare în Sibiu?</h2>
            <p style={pStyle}>
              Spune-ne ce ai de făcut și primești o ofertă clară. {BUSINESS.name}, {BUSINESS.street}, {BUSINESS.city}.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a
                href={`tel:${BUSINESS.phoneE164}`}
                style={{ background: C.accent, color: "#072327", fontWeight: 700, padding: "14px 22px", borderRadius: 10, textDecoration: "none" }}
              >
                Sună: {BUSINESS.phoneDisplay}
              </a>
              <Link
                href="/#contact"
                style={{ border: `1.5px solid ${C.line}`, color: C.text, fontWeight: 600, padding: "13px 22px", borderRadius: 10, textDecoration: "none" }}
              >
                Formular de contact
              </Link>
              {p.related && (
                <Link href={p.related.href} style={{ color: C.accent, fontWeight: 600, padding: "13px 4px", textDecoration: "none" }}>
                  {p.related.label} →
                </Link>
              )}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
