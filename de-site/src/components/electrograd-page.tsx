import Image from "next/image";
import { SiteHeaderDe } from "@/components/site-header";
import { SiteFooterDe } from "@/components/site-footer";
import { SectionDivider } from "@/components/section-divider";

/* Vorstellungsseite der App ElectroGrad. Server component: der ganze Text steht
   im HTML für Suchmaschinen. Die Texte folgen dem Store-Eintrag der App. */

const wrap: React.CSSProperties = { position: "relative", zIndex: 1, maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" };
const sec: React.CSSProperties = { position: "relative", paddingTop: "clamp(72px, 9vw, 120px)", paddingBottom: "clamp(72px, 9vw, 120px)" };
const eyebrow: React.CSSProperties = {
  fontFamily: "var(--font-plex-mono)",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#8FE0E8",
  marginBottom: 14,
  paddingBottom: 14,
  borderBottom: "1px solid rgba(143,224,232,0.12)",
  display: "inline-block",
};
const h2: React.CSSProperties = {
  fontFamily: "var(--font-barlow)",
  fontSize: "clamp(28px, 3.2vw, 42px)",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: 1.12,
  color: "#F2FBFC",
  maxWidth: "28ch",
  marginBottom: "clamp(32px, 4vw, 48px)",
};
const body: React.CSSProperties = { fontFamily: "var(--font-barlow)", fontSize: 15, lineHeight: 1.7, color: "#A9C9CC", margin: 0 };
const card: React.CSSProperties = { background: "#155B5C", borderRadius: 12, border: "1px solid rgba(143,224,232,0.08)", padding: "24px 24px 26px" };
const monoLink: React.CSSProperties = {
  fontFamily: "var(--font-plex-mono)",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#8FE0E8",
  textDecoration: "none",
  border: "1.5px solid rgba(143,224,232,0.4)",
  borderRadius: 4,
  padding: "13px 18px",
  display: "inline-block",
};

const PLAY_URL = "https://play.google.com/store/apps/details?id=ro.mayereconcept.electrograd";

const FEATURES = [
  { title: "Fast 1.600 Fragen", desc: "Die von der ANRE auf anre.ro veröffentlichten Beispielfragen, nach Grad und Kapitel geordnet: Elektrotechnik, Gesetzgebung und technische Normen." },
  { title: "Prüfungssimulation", desc: "Wie im Ernstfall: 25 Fragen, 60 Minuten, bestanden ab 18 richtigen Antworten." },
  { title: "Antwort und Erklärung", desc: "Zu jeder Frage gibt es die Antwort, die Erklärung und den Verweis auf Gesetz oder Norm." },
  { title: "Fehler wiederholen", desc: "Falsch beantwortete Fragen kommen wieder, bis sie sitzen." },
  { title: "Fortschritt und Verlauf", desc: "Der Fortschritt je Kapitel und der Verlauf der Simulationen sind jederzeit sichtbar." },
  { title: "Kostenloser Leitfaden", desc: "Welcher Grad möglich ist, die Normen, die Formulare, der Prüfungskalender und direkte Links zu den offiziellen Seiten der ANRE." },
];

const SHOTS = [
  { src: "/uploads/electrograd/1-start.jpg", alt: "ElectroGrad: Startbildschirm mit Grad und Fortschritt" },
  { src: "/uploads/electrograd/2-simulare.jpg", alt: "ElectroGrad: Prüfungssimulation" },
  { src: "/uploads/electrograd/3-exersare.jpg", alt: "ElectroGrad: Üben nach Kapiteln" },
  { src: "/uploads/electrograd/4-progres.jpg", alt: "ElectroGrad: Fortschritt je Kapitel" },
  { src: "/uploads/electrograd/5-ghid.jpg", alt: "ElectroGrad: Leitfaden zur ANRE-Prüfung" },
];

const SOURCES = [
  { label: "ANRE: Zulassung der Elektriker (Fragen, Formulare, Mitteilungen)", href: "https://anre.ro/participanti-la-piata-de-energie/persoane-fizice/energie-electrica/" },
  { label: "Themen und Literatur der Prüfung", href: "https://anre.ro/wp-content/uploads/2023/05/Tematica-si-bibliografie-pentru-examenul-de-autorizare-electricieni-2023-.pdf" },
  { label: "Prüfungsordnung (ANRE-Verordnung Nr. 66/2023)", href: "https://anre.ro/wp-content/uploads/2023/05/Ord-66-2023.pdf" },
  { label: "Anmeldung und Termine", href: "https://spv.anre.ro/examene-electricieni/" },
  { label: "Gesetze (z. B. Gesetz 123/2012)", href: "https://legislatie.just.ro" },
];

// Die Rechtstexte der App gibt es nur auf Rumänisch, auf der rumänischen Seite.
const RO = "https://me-concept.ro/electrograd";

export function ElectroGradPage() {
  return (
    <>
      <SiteHeaderDe />
      <style>{`
        @media (max-width: 900px) {
          .eg-hero-grid, .eg-plan-grid { grid-template-columns: 1fr !important; }
          .eg-feature-grid { grid-template-columns: 1fr 1fr !important; }
          .eg-shots { grid-template-columns: repeat(5, 62vw) !important; overflow-x: auto; }
        }
        @media (max-width: 560px) { .eg-feature-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <main>
        <section style={{ position: "relative", background: "radial-gradient(120% 140% at 72% -10%, #1B6C6C 0%, #155B5C 55%, #0F4A4B 100%)", overflow: "hidden" }}>
          <div
            className="eg-hero-grid"
            style={{ ...wrap, display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)", gap: "clamp(32px, 5vw, 72px)", alignItems: "center", paddingTop: "clamp(140px, 18vh, 210px)", paddingBottom: "clamp(64px, 8vw, 110px)" }}
          >
            <div>
              <div style={{ ...eyebrow, borderBottom: "none", paddingBottom: 0 }}>App · Android</div>
              <h1 style={{ fontFamily: "var(--font-barlow)", fontSize: "clamp(32px, 4vw, 54px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.08, color: "#F2FBFC", maxWidth: "20ch", marginBottom: 22 }}>
                ElectroGrad: Vorbereitung auf die ANRE-Zulassungsprüfung
              </h1>
              <p style={{ ...body, fontSize: "clamp(15px, 1.2vw, 18px)", maxWidth: "58ch", marginBottom: 18 }}>
                ElectroGrad hilft Elektrikern in Rumänien bei der Vorbereitung auf die Zulassungsprüfung der Energiebehörde ANRE, für die Grade I, IIA, IIB, IIIA, IIIB, IVA und IVB. Die App ist auf Rumänisch.
              </p>
              <p style={{ ...body, maxWidth: "58ch", marginBottom: 28 }}>
                Wir haben die App aus eigener Erfahrung gebaut. Neben Planung und Ausführung möchten wir auch anderen helfen, sich im Beruf weiterzuentwickeln.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <a href={PLAY_URL} target="_blank" rel="noopener noreferrer" style={{ ...monoLink, background: "#8FE0E8", color: "#072327", borderColor: "#8FE0E8" }}>Bei Google Play laden</a>
                <a href="#functii" style={monoLink}>Was die App bietet</a>
              </div>
            </div>
            <Image
              src="/uploads/electrograd/feature.png"
              alt="ElectroGrad, Zulassungsprüfung für Elektriker der ANRE, Grade I bis IV"
              width={1024}
              height={500}
              priority
              style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid rgba(143,224,232,0.18)", display: "block" }}
            />
          </div>
        </section>

        <section id="functii" style={{ ...sec, scrollMarginTop: 72 }}>
          <SectionDivider />
          <div style={wrap}>
            <div style={eyebrow}>Funktionen</div>
            <h2 style={h2}>Was die App bietet</h2>
            <div className="eg-feature-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 24 }}>
              {FEATURES.map((f, i) => (
                <div key={f.title} style={card}>
                  <div style={{ fontFamily: "var(--font-oxanium)", fontSize: 22, fontWeight: 700, color: "#8FE0E8", marginBottom: 12 }}>{String(i + 1).padStart(2, "0")}</div>
                  <h3 style={{ fontFamily: "var(--font-barlow)", fontSize: 17, fontWeight: 700, color: "#F2FBFC", marginBottom: 10, lineHeight: 1.3 }}>{f.title}</h3>
                  <p style={{ ...body, fontSize: 14, lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ ...sec, background: "#0C4244" }}>
          <SectionDivider />
          <div style={wrap}>
            <div style={eyebrow}>Screenshots</div>
            <h2 style={h2}>So sieht ElectroGrad aus</h2>
            <div className="eg-shots" style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 16 }}>
              {SHOTS.map((s) => (
                <Image key={s.src} src={s.src} alt={s.alt} width={720} height={1440} style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid rgba(143,224,232,0.18)", display: "block" }} />
              ))}
            </div>
          </div>
        </section>

        <section style={sec}>
          <SectionDivider />
          <div style={wrap}>
            <div style={eyebrow}>Kostenlos und Vollversion</div>
            <h2 style={h2}>Kostenlos starten, weitermachen, wenn es hilft</h2>
            <div className="eg-plan-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 24 }}>
              <div style={card}>
                <h3 style={{ fontFamily: "var(--font-barlow)", fontSize: 19, fontWeight: 700, color: "#F2FBFC", marginBottom: 10 }}>Kostenlos</h3>
                <p style={body}>Die ersten 50 Fragen jedes Grades, eine Prüfungssimulation und der ganze Leitfaden.</p>
              </div>
              <div style={{ ...card, borderColor: "rgba(143,224,232,0.35)" }}>
                <h3 style={{ fontFamily: "var(--font-barlow)", fontSize: 19, fontWeight: 700, color: "#F2FBFC", marginBottom: 10 }}>Vollversion</h3>
                <p style={body}>Alle Fragen und unbegrenzte Simulationen im Abo für 3 oder 12 Monate. Es verlängert sich automatisch, bis es gekündigt wird.</p>
              </div>
            </div>
            <p style={{ ...body, fontSize: 14, maxWidth: "80ch", marginTop: 28 }}>
              Wichtig: Die ANRE veröffentlicht nur die Fragen, nicht die Antworten. Die Antworten in der App haben wir erarbeitet und an den geltenden Normen und Gesetzen geprüft. Die wenigen noch nicht bestätigten sind markiert. Wer einen Fehler findet, schreibt uns, und wir korrigieren ihn schnell.
            </p>
          </div>
        </section>

        <section style={{ ...sec, background: "#0C4244" }}>
          <SectionDivider />
          <div style={wrap}>
            <div style={eyebrow}>Unabhängige App</div>
            <h2 style={h2}>Offizielle Quellen</h2>
            <p style={{ ...body, maxWidth: "80ch", marginBottom: 28 }}>
              ElectroGrad stammt von Mayer E-Concept S.R.L. und vertritt weder die ANRE noch eine andere staatliche Stelle. Die App ist mit ihnen nicht verbunden und bietet keine staatlichen Dienste an. Offizielle Informationen stehen nur auf den Seiten der ANRE (auf Rumänisch):
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "grid", gap: 12 }}>
              {SOURCES.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-barlow)", fontSize: 15, color: "#8FE0E8", textDecoration: "underline", textUnderlineOffset: 4 }}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href={`${RO}/confidentialitate`} style={monoLink}>Datenschutz (RO)</a>
              <a href={`${RO}/termeni`} style={monoLink}>Nutzungsbedingungen (RO)</a>
              <a href={`${RO}/suport`} style={monoLink}>Hilfe und Kontakt (RO)</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooterDe />
    </>
  );
}
