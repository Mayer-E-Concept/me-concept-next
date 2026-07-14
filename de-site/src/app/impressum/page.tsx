import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeaderDe } from "@/components/site-header";
import { SiteFooterDe } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Impressum — Mayer E-Concept",
  description: "Impressum gemäß § 5 DDG und § 18 Abs. 2 MStV — Mayer E-Concept S.R.L.",
  alternates: {
    canonical: "/impressum",
  },
};

export default function ImpressumPage() {
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
            maxWidth: "760px",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 40px)",
          }}
        >
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
              ← Startseite
            </Link>
          </nav>

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
            Impressum
          </h1>
          <p
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: 13,
              color: "#7FA2A6",
              marginBottom: 48,
              borderBottom: "1px solid rgba(143,224,232,0.08)",
              paddingBottom: 28,
            }}
          >
            Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz) und § 18 Abs. 2 MStV
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

            {/* Anbieter */}
            <section>
              <h2 style={{ fontFamily: "var(--font-barlow)", fontSize: 17, fontWeight: 700, color: "#F2FBFC", marginBottom: 16 }}>
                Anbieter und Verantwortlicher
              </h2>
              <div
                style={{
                  fontFamily: "var(--font-barlow)",
                  fontSize: 15,
                  lineHeight: 2,
                  color: "#A9C9CC",
                  background: "rgba(143,224,232,0.04)",
                  border: "1px solid rgba(143,224,232,0.09)",
                  borderRadius: 8,
                  padding: "22px 28px",
                }}
              >
                <strong style={{ color: "#F2FBFC", display: "block", marginBottom: 4 }}>
                  MAYER E-CONCEPT S.R.L.
                </strong>
                <span>Str. Atena, Nr. 5, Ap. 1</span><br />
                <span>550049 Sibiu (Hermannstadt)</span><br />
                <span>Rumänien</span>
              </div>
            </section>

            {/* Kontakt */}
            <section>
              <h2 style={{ fontFamily: "var(--font-barlow)", fontSize: 17, fontWeight: 700, color: "#F2FBFC", marginBottom: 16 }}>
                Kontakt
              </h2>
              <div style={{ fontFamily: "var(--font-barlow)", fontSize: 15, lineHeight: 2, color: "#A9C9CC" }}>
                <span>Telefon: </span>
                <a href="tel:+40752099791" style={{ color: "#F2FBFC", textDecoration: "none" }}>+40 752 099 791</a><br />
                <span>E-Mail: </span>
                <a href="mailto:contact@me-concept.ro" style={{ color: "#8FE0E8", textDecoration: "none" }}>contact@me-concept.ro</a><br />
                <span>Website: </span>
                <a href="https://me-concept.de" style={{ color: "#8FE0E8", textDecoration: "none" }}>https://me-concept.de</a>
              </div>
            </section>

            {/* Vertretung */}
            <section>
              <h2 style={{ fontFamily: "var(--font-barlow)", fontSize: 17, fontWeight: 700, color: "#F2FBFC", marginBottom: 16 }}>
                Vertretungsberechtigte Person
              </h2>
              <p style={{ fontFamily: "var(--font-barlow)", fontSize: 15, lineHeight: 1.75, color: "#A9C9CC" }}>
                Geschäftsführer: Mayer Martin
              </p>
            </section>

            {/* Registereintrag */}
            <section>
              <h2 style={{ fontFamily: "var(--font-barlow)", fontSize: 17, fontWeight: 700, color: "#F2FBFC", marginBottom: 16 }}>
                Registereintrag
              </h2>
              <div style={{ fontFamily: "var(--font-barlow)", fontSize: 15, lineHeight: 2, color: "#A9C9CC" }}>
                <span>Eingetragen im Handelsregister Sibiu (Registrul Comerțului)</span><br />
                <span>CUI (Steuernummer): RO45533577</span>
              </div>
            </section>

            {/* Berufsbezeichnung */}
            <section>
              <h2 style={{ fontFamily: "var(--font-barlow)", fontSize: 17, fontWeight: 700, color: "#F2FBFC", marginBottom: 16 }}>
                Berufsbezeichnung und berufsrechtliche Regelungen
              </h2>
              <div style={{ fontFamily: "var(--font-barlow)", fontSize: 15, lineHeight: 1.75, color: "#A9C9CC" }}>
                <p>Dienstleistung: Planung elektrischer Anlagen für Wohn- und Gewerbegebäude</p>
                <p style={{ marginTop: 8 }}>
                  Qualitätszertifizierung: ISO 9001:2015 (Zertifikat Nr. SKYCERT)
                </p>
                <p style={{ marginTop: 8 }}>
                  Zuständige Kammer: ANRE (Autoritatea Națională de Reglementare în domeniul Energiei), Rumänien
                </p>
              </div>
            </section>

            {/* EU-Streitschlichtung */}
            <section
              style={{
                background: "rgba(143,224,232,0.07)",
                border: "1px solid rgba(143,224,232,0.20)",
                borderRadius: 8,
                padding: "22px 28px",
              }}
            >
              <h2 style={{ fontFamily: "var(--font-barlow)", fontSize: 17, fontWeight: 700, color: "#F2FBFC", marginBottom: 12 }}>
                EU-Streitschlichtung
              </h2>
              <p style={{ fontFamily: "var(--font-barlow)", fontSize: 15, lineHeight: 1.75, color: "#A9C9CC", marginBottom: 12 }}>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#8FE0E8" }}
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p style={{ fontFamily: "var(--font-barlow)", fontSize: 15, lineHeight: 1.75, color: "#A9C9CC" }}>
                Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).
              </p>
            </section>

            {/* Haftung */}
            <section>
              <h2 style={{ fontFamily: "var(--font-barlow)", fontSize: 17, fontWeight: 700, color: "#F2FBFC", marginBottom: 16 }}>
                Haftungsausschluss
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-barlow)", fontSize: 14, fontWeight: 700, color: "#F2FBFC", marginBottom: 6 }}>
                    Haftung für Inhalte
                  </h3>
                  <p style={{ fontFamily: "var(--font-barlow)", fontSize: 15, lineHeight: 1.75, color: "#A9C9CC" }}>
                    Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den
                    allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht
                    verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-barlow)", fontSize: 14, fontWeight: 700, color: "#F2FBFC", marginBottom: 6 }}>
                    Haftung für Links
                  </h3>
                  <p style={{ fontFamily: "var(--font-barlow)", fontSize: 15, lineHeight: 1.75, color: "#A9C9CC" }}>
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
                    Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                    Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-barlow)", fontSize: 14, fontWeight: 700, color: "#F2FBFC", marginBottom: 6 }}>
                    Urheberrecht
                  </h3>
                  <p style={{ fontFamily: "var(--font-barlow)", fontSize: 15, lineHeight: 1.75, color: "#A9C9CC" }}>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                    Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                    Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
      <SiteFooterDe />
    </>
  );
}
