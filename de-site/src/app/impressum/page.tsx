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
          background: "#051E27",
          minHeight: "100vh",
          color: "#F4F2EC",
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
                fontFamily: "var(--font-sans)",
                fontSize: "11.5px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#1A6F7A",
                textDecoration: "none",
              }}
            >
              ← Startseite
            </Link>
          </nav>

          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(26px, 3.5vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "#F4F2EC",
              marginBottom: 12,
            }}
          >
            Impressum
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "rgba(244,242,236,0.40)",
              marginBottom: 48,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              paddingBottom: 28,
            }}
          >
            Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz) und § 18 Abs. 2 MStV
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

            {/* Anbieter */}
            <section>
              <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 700, color: "#F4F2EC", marginBottom: 16 }}>
                Anbieter und Verantwortlicher
              </h2>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 2,
                  color: "rgba(244,242,236,0.75)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: 8,
                  padding: "22px 28px",
                }}
              >
                <strong style={{ color: "#F4F2EC", display: "block", marginBottom: 4 }}>
                  MAYER E-CONCEPT S.R.L.
                </strong>
                <span>Str. Atena, Nr. 5, Ap. 1</span><br />
                <span>550049 Sibiu (Hermannstadt)</span><br />
                <span>Rumänien</span>
              </div>
            </section>

            {/* Kontakt */}
            <section>
              <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 700, color: "#F4F2EC", marginBottom: 16 }}>
                Kontakt
              </h2>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 2, color: "rgba(244,242,236,0.75)" }}>
                <span>Telefon: </span>
                <a href="tel:+40752099791" style={{ color: "#F4F2EC", textDecoration: "none" }}>+40 752 099 791</a><br />
                <span>E-Mail: </span>
                <a href="mailto:contact@me-concept.ro" style={{ color: "#C5895B", textDecoration: "none" }}>contact@me-concept.ro</a><br />
                <span>Website: </span>
                <a href="https://me-concept.de" style={{ color: "#1A6F7A", textDecoration: "none" }}>https://me-concept.de</a>
              </div>
            </section>

            {/* Vertretung */}
            <section>
              <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 700, color: "#F4F2EC", marginBottom: 16 }}>
                Vertretungsberechtigte Person
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.75, color: "rgba(244,242,236,0.75)" }}>
                Geschäftsführer: Mayer Martin
              </p>
            </section>

            {/* Registereintrag */}
            <section>
              <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 700, color: "#F4F2EC", marginBottom: 16 }}>
                Registereintrag
              </h2>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 2, color: "rgba(244,242,236,0.75)" }}>
                <span>Eingetragen im Handelsregister Sibiu (Registrul Comerțului)</span><br />
                <span>CUI (Steuernummer): RO48817141</span>
              </div>
            </section>

            {/* Berufsbezeichnung */}
            <section>
              <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 700, color: "#F4F2EC", marginBottom: 16 }}>
                Berufsbezeichnung und berufsrechtliche Regelungen
              </h2>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.75, color: "rgba(244,242,236,0.75)" }}>
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
                background: "rgba(197,137,91,0.07)",
                border: "1px solid rgba(197,137,91,0.20)",
                borderRadius: 8,
                padding: "22px 28px",
              }}
            >
              <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 700, color: "#F4F2EC", marginBottom: 12 }}>
                EU-Streitschlichtung
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.75, color: "rgba(244,242,236,0.75)", marginBottom: 12 }}>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1A6F7A" }}
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.75, color: "rgba(244,242,236,0.75)" }}>
                Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).
              </p>
            </section>

            {/* Haftung */}
            <section>
              <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 700, color: "#F4F2EC", marginBottom: 16 }}>
                Haftungsausschluss
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: "rgba(244,242,236,0.85)", marginBottom: 6 }}>
                    Haftung für Inhalte
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.75, color: "rgba(244,242,236,0.65)" }}>
                    Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den
                    allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht
                    verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: "rgba(244,242,236,0.85)", marginBottom: 6 }}>
                    Haftung für Links
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.75, color: "rgba(244,242,236,0.65)" }}>
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
                    Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                    Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: "rgba(244,242,236,0.85)", marginBottom: 6 }}>
                    Urheberrecht
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.75, color: "rgba(244,242,236,0.65)" }}>
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
