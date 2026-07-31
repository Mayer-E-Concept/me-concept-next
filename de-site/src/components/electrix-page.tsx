"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Tag,
  Layers,
  LayoutGrid,
  Search,
  Lightbulb,
  MessageSquare,
  History,
  ArrowLeftRight,
  Wrench,
  BarChart3,
  Check,
} from "lucide-react";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";

const TOOLS = [
  {
    icon: Tag,
    title: "Circuit Tagger",
    desc: "Berechnet die Stromkreis-Bezeichnung automatisch (z. B. Sicherung „1“ + Zweig „F2“ → Tag „1F2“), schreibt sie auf jedes ausgewählte Element und platziert eine korrekt ausgerichtete Beschriftung — inklusive Circuit Stats mit Live-Zählern und Excel-Export.",
  },
  {
    icon: Layers,
    title: "Level & IFC Manager",
    desc: "Alle Ebenen des Projekts, automatisch gruppiert (Keller/Erdgeschoss/Obergeschoss), filterbar nach Zonen. Liest Ebenen, Einheiten und Standort direkt aus IFC und meldet Einheiten-Konflikte, bevor sie zum Problem werden.",
  },
  {
    icon: Search,
    title: "Family Browser",
    desc: "Schnelles, durchsuchbares Durchstöbern und Platzieren jeder Familie aus Ihrer Bibliothek, ohne durch Revits eigene Panelstruktur zu suchen.",
  },
  {
    icon: MessageSquare,
    title: "Comments",
    desc: "Eine gemeinsame Kommentarebene direkt im Modell. Notiz zu einem Element hinterlassen, einem Teammitglied zuweisen und bis zur Erledigung verfolgen — mit Desktop-Benachrichtigung und direktem Sprung zum Element.",
  },
  {
    icon: History,
    title: "Activity Log",
    desc: "Automatische Aufzeichnung, wer was wann im gesamten gemeinsam genutzten Modell hinzugefügt, geändert oder gelöscht hat. Filterbar, durchsuchbar, als CSV exportierbar — die Antwort auf „Wer hat das geändert?“",
  },
  {
    icon: ArrowLeftRight,
    title: "Project Transfer",
    desc: "Filter, Detailansichten, Legenden, Pläne und Auswertungstabellen aus einem Projekt auswählen und direkt in ein anderes kopieren, mit Live-Vorschau der genauen Auswahl.",
  },
  {
    icon: Wrench,
    title: "Fix Level",
    desc: "Behebt ein leicht übersehenes Revit-Problem: eine Familieninstanz, deren gespeicherte Ebene nicht mit ihrer tatsächlichen Position übereinstimmt — eine stille Fehlerquelle in Auswertungen und Ebenenfiltern.",
  },
  {
    icon: BarChart3,
    title: "Statistics",
    desc: "Schnelle Zählung von Steckdosen, Leuchten und Schaltern nach Geschoss — eine sofortige Kontrolle, ohne eine Auswertungstabelle zu öffnen.",
  },
];

const DIFFERENTIATORS = [
  "Fühlt sich nativ in Revit an — jedes Fenster nutzt ein eigenes Dark-/Light-Theme nach Revits visueller Sprache, kein aufgesetzter Standarddialog",
  "Wirklich mehrsprachig — die gesamte Oberfläche, nicht nur einzelne Labels, in Englisch, Deutsch und Rumänisch",
  "Gebaut nach echter Elektroplanungspraxis — Stromkreis-Logik, Gebäude-/Wohnungsgruppierung und deutsche Parameterkonventionen sind fester Bestandteil",
  "Aktiv weiterentwickelt — basierend auf echtem Projekt-Feedback, mit einer Erfolgsbilanz bei der Behebung subtiler Revit-Probleme",
  "Ein Installer, eine Lizenz — deckt Revit 2025 und 2026 ab",
];

const TRIAL_DOWNLOAD_URL = "/downloads/ElecTriX-Setup-v1.8.0.exe";

const PRICING_TIERS = [
  { name: "Trial", desc: "14 Tage kostenlos, für eine vollständige Evaluierung der Suite.", download: true },
  { name: "30-Tage-Verlängerung", desc: "Für Projekte, die etwas mehr Testzeit brauchen." },
  { name: "1-Jahres-Lizenz", desc: "Voller Zugriff inklusive Updates, für ein Jahr." },
  { name: "Permanente Lizenz", desc: "Voller Zugriff, zeitlich unbegrenzt." },
];

const INTEREST_OPTIONS = [
  { value: "demo", label: "Ich möchte eine Demo" },
  { value: "purchase", label: "Ich möchte einen Kauf besprechen" },
  { value: "question", label: "Ich habe eine allgemeine Frage" },
];

function ToolCard({ icon: Icon, title, desc }: { icon: typeof Tag; title: string; desc: string }) {
  return (
    <div className="electrix-tool-card">
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: "rgba(143,224,232,0.10)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <Icon size={19} color="#8FE0E8" strokeWidth={1.8} />
      </div>
      <h3
        style={{
          fontFamily: "var(--font-barlow)",
          fontSize: 17,
          fontWeight: 700,
          color: "#F2FBFC",
          marginBottom: 8,
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
      <p style={{ fontFamily: "var(--font-barlow)", fontSize: 14, lineHeight: 1.6, color: "#A9C9CC", margin: 0 }}>
        {desc}
      </p>
    </div>
  );
}

export function ElecTriXPageDe() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  function validate(form: HTMLFormElement) {
    const errs: Record<string, string> = {};
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value.trim();
    const interest = (form.elements.namedItem("interest") as HTMLSelectElement)?.value;
    if (!name) errs.name = "Pflichtfeld.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Ungültige E-Mail.";
    if (!interest) errs.interest = "Bitte wählen Sie eine Option.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setApiError(null);
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      company: (form.elements.namedItem("company") as HTMLInputElement).value.trim(),
      interest: (form.elements.namedItem("interest") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
      website: (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "",
    };
    setLoading(true);
    try {
      const res = await fetch("/api/electrix-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      setSubmitted(true);
    } catch {
      setApiError("Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an contact@me-concept.ro.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    background: "#0B373D",
    border: "1px solid rgba(143,224,232,0.20)",
    borderRadius: 4,
    color: "#F2FBFC",
    padding: "14px 16px",
    fontFamily: "var(--font-barlow)",
    fontSize: 15,
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-plex-mono)",
    fontSize: "11.5px",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "#7FA2A6",
  };
  const errorStyle: React.CSSProperties = { fontFamily: "var(--font-barlow)", fontSize: 12, color: "#E07B5A", marginTop: 4 };
  const eyebrowStyle: React.CSSProperties = {
    fontFamily: "var(--font-plex-mono)",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "#8FE0E8",
    marginBottom: 18,
  };
  const h2Style: React.CSSProperties = {
    fontFamily: "var(--font-barlow)",
    fontSize: "clamp(28px, 3.2vw, 42px)",
    fontWeight: 800,
    letterSpacing: "-0.025em",
    lineHeight: 1.12,
    color: "#F2FBFC",
  };

  return (
    <>
      <style>{`
        .electrix-tool-card {
          position: relative;
          background: #0B373D;
          border: 1px solid rgba(143,224,232,0.12);
          border-radius: 12px;
          padding: 26px 26px 28px;
          height: 100%;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .electrix-tool-card:hover {
          transform: translateY(-4px);
          border-color: rgba(143,224,232,0.5);
          box-shadow: 0 16px 40px rgba(0,0,0,0.30);
        }
        .electrix-pricing-card {
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          background: rgba(143,224,232,0.04);
          border: 1px solid rgba(143,224,232,0.14);
          border-radius: 12px;
          padding: 28px 24px;
          transition: border-color .25s ease, background .25s ease;
        }
        .electrix-pricing-card:hover { border-color: rgba(143,224,232,0.45); background: rgba(143,224,232,0.07); }
        .electrix-ribbon-frame {
          position: relative;
          width: 100%;
          max-width: 900px;
          aspect-ratio: 737/168;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(143,224,232,0.18);
          box-shadow: 0 12px 34px rgba(0,0,0,0.30);
        }
        .electrix-diff-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px 32px;
        }
        .electrix-diff-item {
          flex: 0 1 calc((100% - 64px) / 3);
          min-width: 220px;
        }
        @media (max-width: 767px) {
          .electrix-tools-grid { grid-template-columns: 1fr 1fr !important; }
          .electrix-flagship-grid { grid-template-columns: 1fr !important; }
          .electrix-diff-item { flex-basis: 100% !important; }
          .electrix-pricing-grid { grid-template-columns: 1fr 1fr !important; }
          .electrix-hero-badges { justify-content: center !important; }
          .electrix-compare-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .electrix-pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ position: "relative", background: "radial-gradient(120% 140% at 72% -10%, #12525B 0%, #0B373D 55%, #072327 100%)", overflow: "hidden" }}>
        <div
          aria-hidden
          style={{ position: "absolute", inset: 0, backgroundImage: 'url("/assets/circuit-pattern.svg")', backgroundSize: "240px 240px", opacity: 0.06, filter: "invert(1)", pointerEvents: "none" }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 60px)",
            paddingTop: "clamp(140px, 18vh, 210px)",
            paddingBottom: "clamp(72px, 9vw, 120px)",
          }}
        >
          {/* Same blueprint grid used behind the homepage hero text, confined
              to this text column (not the full-bleed section) and masked to
              glow behind the headline/CTA area, fading out in a circle. */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              pointerEvents: "none",
              backgroundImage: [
                "linear-gradient(rgba(143,224,232,0.09) 1px, transparent 1px)",
                "linear-gradient(90deg, rgba(143,224,232,0.09) 1px, transparent 1px)",
                "linear-gradient(rgba(143,224,232,0.05) 1px, transparent 1px)",
                "linear-gradient(90deg, rgba(143,224,232,0.05) 1px, transparent 1px)",
              ].join(", "),
              backgroundSize: "240px 240px, 240px 240px, 48px 48px, 48px 48px",
              WebkitMaskImage: "radial-gradient(ellipse 38% 45% at 36% 47%, #fff 0%, #fff 40%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 38% 45% at 36% 47%, #fff 0%, #fff 40%, transparent 100%)",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={eyebrowStyle}>Revit Add-in · Mayer E-Concept</div>
            <h1
              style={{
                fontFamily: "var(--font-barlow)",
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.12,
                color: "#F2FBFC",
                maxWidth: "32ch",
                marginBottom: 24,
              }}
            >
              <span style={{ color: "#8FE0E8" }}>ElecTriX</span>: automatisierte Familienplatzierung, intelligente Beleuchtungsplanung und Teamkoordination — direkt in Revit.
            </h1>
            <p style={{ fontFamily: "var(--font-barlow)", fontSize: "clamp(15px, 1.2vw, 18px)", lineHeight: 1.7, color: "#A9C9CC", maxWidth: "62ch", marginBottom: 32 }}>
              Eine professionelle Add-in-Suite für Revit, entwickelt von einem Elektroplanungsbüro für
              MEP-Teams. Elf Werkzeuge unter einem einzigen Ribbon-Tab, für Revit 2025 und 2026.
            </p>

            <div className="electrix-hero-badges" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
              {["Revit 2025 & 2026", "EN · DE · RO", "Lizenz pro Arbeitsplatz"].map((b) => (
                <span
                  key={b}
                  style={{
                    fontFamily: "var(--font-plex-mono)",
                    fontSize: 11.5,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8FE0E8",
                    border: "1px solid rgba(143,224,232,0.30)",
                    borderRadius: 20,
                    padding: "7px 16px",
                  }}
                >
                  {b}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <a href={TRIAL_DOWNLOAD_URL} download style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-plex-mono)", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#072327", textDecoration: "none", padding: "16px 30px", borderRadius: 4, background: "#8FE0E8", border: "1.5px solid #8FE0E8", boxShadow: "0 2px 14px rgba(143,224,232,0.22)" }}>
                Kostenlose Testversion herunterladen →
              </a>
              <a href="#inquiry" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-plex-mono)", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9C9CC", textDecoration: "none", padding: "16px 30px", borderRadius: 4, background: "transparent", border: "1.5px solid rgba(143,224,232,0.4)" }}>
                Demo oder Kauf anfragen
              </a>
            </div>
            <p style={{ fontFamily: "var(--font-barlow)", fontSize: 12.5, color: "#7FA2A6", marginTop: 14 }}>
              14 Tage voller Funktionsumfang · kein Konto erforderlich · Revit 2025 & 2026
            </p>
          </div>
        </div>
      </section>

      {/* PROBLEM -> SOLUTION */}
      <section id="so-funktioniert-es" style={{ position: "relative", paddingTop: "clamp(72px, 9vw, 130px)", paddingBottom: "clamp(72px, 9vw, 130px)", scrollMarginTop: 72 }}>
        <SectionDivider />
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
          <FadeIn>
            <div style={{ maxWidth: "760px", marginBottom: 48 }}>
              <div style={eyebrowStyle}>Warum ElecTriX</div>
              <h2 style={{ ...h2Style, marginBottom: 20 }}>Von manueller Wiederholarbeit zu voller Automatisierung</h2>
              <p style={{ fontFamily: "var(--font-barlow)", fontSize: "clamp(14px, 1.1vw, 16px)", lineHeight: 1.75, color: "#A9C9CC" }}>
                Familien platzieren und Leuchten verteilen bedeutet normalerweise Stunden manueller
                Arbeit, Element für Element, in jeder Wohnung oder jedem Raum. ElecTriX automatisiert
                diese Arbeitsabläufe — vom Family Placer und Lamp Placer bis zur Stromkreis-Kennzeichnung
                und dem Rest der Suite — und hält alles direkt im Modell abfragbar, während Projekt und
                Team wachsen.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="electrix-compare-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 24, alignItems: "center" }}>
              <div style={{ background: "rgba(224,123,90,0.06)", border: "1px solid rgba(224,123,90,0.25)", borderRadius: 12, padding: "26px 28px" }}>
                <div style={{ fontFamily: "var(--font-plex-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#E07B5A", marginBottom: 10 }}>
                  Ohne ElecTriX
                </div>
                <p style={{ fontFamily: "var(--font-barlow)", fontSize: 16, color: "#F2FBFC", margin: 0, lineHeight: 1.6 }}>
                  40 Leuchten einzeln von Hand platziert, dann visuell im Plan geprüft.
                </p>
              </div>
              <div style={{ fontFamily: "var(--font-plex-mono)", fontSize: 13, fontWeight: 700, color: "#7FA2A6" }}>→</div>
              <div style={{ background: "rgba(143,224,232,0.06)", border: "1px solid rgba(143,224,232,0.30)", borderRadius: 12, padding: "26px 28px" }}>
                <div style={{ fontFamily: "var(--font-plex-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8FE0E8", marginBottom: 10 }}>
                  Mit ElecTriX
                </div>
                <p style={{ fontFamily: "var(--font-barlow)", fontSize: 16, color: "#F2FBFC", margin: 0, lineHeight: 1.6 }}>
                  40 Leuchten automatisch verteilt, mit DIALux-ähnlichem Abstand, in wenigen Sekunden.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FEATURES */}
      <section id="funktionen" style={{ position: "relative", background: "#0E323D", paddingTop: "clamp(72px, 9vw, 130px)", paddingBottom: "clamp(72px, 9vw, 130px)", scrollMarginTop: 72, overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #5AC9D4 30%, #5AC9D4 70%, transparent)", opacity: 0.45 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
          <FadeIn>
            <div style={{ maxWidth: "700px", marginBottom: 48 }}>
              <div style={eyebrowStyle}>Die Werkzeuge</div>
              <h2 style={h2Style}>Alle ElecTriX-Werkzeuge in einem Ribbon-Tab.</h2>
            </div>
          </FadeIn>

          {/* Flagship — Family Placer & Lamp Placer */}
          <div className="electrix-flagship-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
            <FadeIn>
              <div style={{ background: "linear-gradient(135deg, rgba(143,224,232,0.10), rgba(143,224,232,0.02))", border: "1.5px solid rgba(143,224,232,0.35)", borderRadius: 16, padding: "clamp(24px, 3vw, 36px)", height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "#8FE0E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <LayoutGrid size={22} color="#072327" strokeWidth={2} />
                  </div>
                  <span style={{ fontFamily: "var(--font-plex-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8FE0E8" }}>
                    Hauptwerkzeug
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-barlow)", fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 800, color: "#F2FBFC", marginBottom: 16 }}>
                  Family Placer
                </h3>
                <p style={{ fontFamily: "var(--font-barlow)", fontSize: "clamp(14px, 1.1vw, 16px)", lineHeight: 1.75, color: "#A9C9CC", margin: 0 }}>
                  Platziert mehrere Familien in einer konfigurierten Anordnung — gestapelt, nebeneinander,
                  mit individuellem Abstand — und speichert die gesamte Konfiguration als wiederverwendbare
                  Vorlage für jede Wohnung oder Einheit.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={80}>
              <div style={{ background: "linear-gradient(135deg, rgba(143,224,232,0.10), rgba(143,224,232,0.02))", border: "1.5px solid rgba(143,224,232,0.35)", borderRadius: 16, padding: "clamp(24px, 3vw, 36px)", height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "#8FE0E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Lightbulb size={22} color="#072327" strokeWidth={2} />
                  </div>
                  <span style={{ fontFamily: "var(--font-plex-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8FE0E8" }}>
                    Hauptwerkzeug
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-barlow)", fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 800, color: "#F2FBFC", marginBottom: 16 }}>
                  Lamp Placer
                </h3>
                <p style={{ fontFamily: "var(--font-barlow)", fontSize: "clamp(14px, 1.1vw, 16px)", lineHeight: 1.75, color: "#A9C9CC", margin: 0 }}>
                  Automatisierte Beleuchtungsplanung: Leuchten automatisch im Raum verteilen, auf einem
                  manuellen Raster anordnen oder entlang einer Linie mit DIALux-ähnlichem, gleichmäßigem
                  Abstand platzieren — für Rooms und MEP-Spaces.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Remaining tools grid */}
          <div className="electrix-tools-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {TOOLS.map((tool, i) => (
              <FadeIn key={tool.title} delay={(i % 3) * 80}>
                <ToolCard icon={tool.icon} title={tool.title} desc={tool.desc} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section style={{ position: "relative", paddingTop: "clamp(64px, 8vw, 100px)", paddingBottom: "clamp(64px, 8vw, 100px)" }}>
        <SectionDivider />
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
          <FadeIn>
            <div style={eyebrowStyle}>Warum es sich lohnt</div>
          </FadeIn>
          <div className="electrix-diff-grid">
            {DIFFERENTIATORS.map((d, i) => (
              <FadeIn key={d} delay={(i % 3) * 80} className="electrix-diff-item">
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Check size={18} color="#5AC9D4" style={{ flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontFamily: "var(--font-barlow)", fontSize: 14.5, lineHeight: 1.6, color: "#F2FBFC", margin: 0 }}>{d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SCREENSHOTS */}
      <section id="screenshots" style={{ position: "relative", background: "#051E27", paddingTop: "clamp(72px, 9vw, 130px)", paddingBottom: "clamp(72px, 9vw, 130px)", scrollMarginTop: 72 }}>
        <SectionDivider />
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
          <FadeIn>
            <div style={{ maxWidth: "700px", marginBottom: 40 }}>
              <div style={eyebrowStyle}>So sieht es aus</div>
              <h2 style={h2Style}>Die ElecTriX-Oberfläche</h2>
            </div>
          </FadeIn>
          <FadeIn>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="electrix-ribbon-frame">
                <Image src="/uploads/electrix-ribbon.png" alt="Der ElecTriX-Tab im Revit-Ribbon" fill style={{ objectFit: "cover" }} sizes="(max-width: 900px) 100vw, 900px" />
              </div>
              <p style={{ fontFamily: "var(--font-barlow)", fontSize: 13.5, color: "#A9C9CC", marginTop: 12, textAlign: "center" }}>
                Der ElecTriX-Tab — alle elf Werkzeuge an einem Ort
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PRICING */}
      <section id="lizenzierung" style={{ position: "relative", paddingTop: "clamp(72px, 9vw, 130px)", paddingBottom: "clamp(72px, 9vw, 130px)", scrollMarginTop: 72 }}>
        <SectionDivider />
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
          <FadeIn>
            <div style={{ maxWidth: "700px", marginBottom: 40 }}>
              <div style={eyebrowStyle}>Lizenzierung</div>
              <h2 style={h2Style}>Eine Lizenz für jede Phase</h2>
            </div>
          </FadeIn>

          <div className="electrix-pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
            {PRICING_TIERS.map((tier, i) => (
              <FadeIn key={tier.name} delay={i * 60}>
                <div className="electrix-pricing-card">
                  <h3 style={{ fontFamily: "var(--font-barlow)", fontSize: 17, fontWeight: 700, color: "#F2FBFC", marginBottom: 10 }}>{tier.name}</h3>
                  <p style={{ fontFamily: "var(--font-barlow)", fontSize: 13.5, lineHeight: 1.55, color: "#A9C9CC", margin: 0 }}>{tier.desc}</p>
                  {tier.download && (
                    <a href={TRIAL_DOWNLOAD_URL} download style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: "auto", alignSelf: "flex-start", fontFamily: "var(--font-plex-mono)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8FE0E8", textDecoration: "none", border: "1px solid rgba(143,224,232,0.40)", borderRadius: 4, padding: "10px 16px" }}>
                      Herunterladen →
                    </a>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
              <a href="#inquiry" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-plex-mono)", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#072327", textDecoration: "none", padding: "16px 36px", borderRadius: 4, background: "#8FE0E8", border: "1.5px solid #8FE0E8", boxShadow: "0 2px 14px rgba(143,224,232,0.22)" }}>
                Option wählen und Kontakt aufnehmen →
              </a>
            </div>
          </FadeIn>

          <FadeIn>
            <div style={{ background: "rgba(143,224,232,0.04)", border: "1px solid rgba(143,224,232,0.12)", borderRadius: 8, padding: "20px 24px", display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between" }}>
              <p style={{ fontFamily: "var(--font-barlow)", fontSize: 13.5, lineHeight: 1.6, color: "#A9C9CC", margin: 0, maxWidth: "56ch" }}>
                Lizenzen sind an den Arbeitsplatz gebunden (Machine ID, bei der Installation generiert).
                Senden Sie die Machine ID an Mayer E-Concept und erhalten Sie den Lizenzschlüssel per E-Mail.
              </p>
              <p style={{ fontFamily: "var(--font-plex-mono)", fontSize: 12, letterSpacing: "0.06em", color: "#8FE0E8", margin: 0, whiteSpace: "nowrap" }}>
                Revit 2025 & 2026 · Windows
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* INQUIRY */}
      <section id="inquiry" style={{ position: "relative", background: "#051E27", paddingTop: "clamp(72px, 9vw, 130px)", paddingBottom: "clamp(72px, 9vw, 130px)", scrollMarginTop: 72, color: "#F2FBFC" }}>
        <SectionDivider />
        <style>{`
          @media (max-width: 767px) {
            .electrix-inquiry-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          }
          #inquiry input::placeholder, #inquiry textarea::placeholder { color: #7FA2A6; }
        `}</style>
        <div className="electrix-inquiry-grid" style={{ position: "relative", maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 100px)", alignItems: "start" }}>
          <div>
            <div style={eyebrowStyle}>Kontakt</div>
            <h2 style={{ ...h2Style, marginBottom: 24, maxWidth: "18ch" }}>Demo oder Kauf anfragen</h2>
            <p style={{ fontFamily: "var(--font-barlow)", fontSize: 15, lineHeight: 1.7, color: "#A9C9CC", marginBottom: 24, maxWidth: "44ch" }}>
              Die kostenlose Testversion steht oben zum direkten Download bereit. Für eine Demo, den Kauf
              einer Lizenz oder allgemeine Fragen antworten wir innerhalb von 24 Stunden an Werktagen — oder schreiben Sie uns direkt an{" "}
              <a href="mailto:contact@me-concept.ro" style={{ color: "#8FE0E8" }}>contact@me-concept.ro</a>.
            </p>
            <p style={{ fontFamily: "var(--font-barlow)", fontSize: 13.5, lineHeight: 1.6, color: "#7FA2A6" }}>
              Kompatibel mit Autodesk Revit 2025 und 2026 · Oberfläche EN / DE / RO
            </p>
          </div>

          <div>
            {submitted ? (
              <div role="status" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: "48px 32px", background: "rgba(143,224,232,0.04)", border: "1px solid rgba(143,224,232,0.30)", borderRadius: 8, textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(143,224,232,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check size={26} color="#8FE0E8" strokeWidth={2.5} />
                </div>
                <h3 style={{ fontFamily: "var(--font-barlow)", fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 700, color: "#F2FBFC", margin: 0 }}>
                  Anfrage gesendet!
                </h3>
                <p style={{ fontFamily: "var(--font-barlow)", fontSize: 15, lineHeight: 1.65, color: "#A9C9CC", margin: 0, maxWidth: "36ch" }}>
                  Wir antworten innerhalb von höchstens 24 Stunden an Werktagen.
                </p>
                <button onClick={() => setSubmitted(false)} style={{ marginTop: 8, background: "none", border: "1px solid rgba(143,224,232,0.40)", color: "#8FE0E8", fontFamily: "var(--font-plex-mono)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "10px 24px", borderRadius: 4, cursor: "pointer" }}>
                  Weitere Anfrage senden
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label htmlFor="mt-name" style={labelStyle}>Name</label>
                    <input id="mt-name" name="name" type="text" placeholder="Ihr Name" aria-invalid={!!errors.name} style={{ ...inputStyle, borderColor: errors.name ? "#E07B5A" : "rgba(143,224,232,0.20)" }} onChange={() => setErrors((p) => { const n = { ...p }; delete n.name; return n; })} />
                    {errors.name && <span role="alert" style={errorStyle}>{errors.name}</span>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label htmlFor="mt-email" style={labelStyle}>E-Mail</label>
                    <input id="mt-email" name="email" type="email" placeholder="name@unternehmen.de" aria-invalid={!!errors.email} style={{ ...inputStyle, borderColor: errors.email ? "#E07B5A" : "rgba(143,224,232,0.20)" }} onChange={() => setErrors((p) => { const n = { ...p }; delete n.email; return n; })} />
                    {errors.email && <span role="alert" style={errorStyle}>{errors.email}</span>}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label htmlFor="mt-company" style={labelStyle}>Unternehmen (optional)</label>
                  <input id="mt-company" name="company" type="text" placeholder="Firmenname" style={inputStyle} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label htmlFor="mt-interest" style={labelStyle}>Ich interessiere mich für</label>
                  <select id="mt-interest" name="interest" defaultValue="" aria-invalid={!!errors.interest} style={{ ...inputStyle, borderColor: errors.interest ? "#E07B5A" : "rgba(143,224,232,0.20)" }} onChange={() => setErrors((p) => { const n = { ...p }; delete n.interest; return n; })}>
                    <option value="" disabled>Bitte wählen</option>
                    {INTEREST_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  {errors.interest && <span role="alert" style={errorStyle}>{errors.interest}</span>}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label htmlFor="mt-message" style={labelStyle}>Nachricht (optional)</label>
                  <textarea id="mt-message" name="message" rows={4} placeholder="Details zu Projekt oder Team..." style={{ ...inputStyle, resize: "vertical" }} />
                </div>

                <button type="submit" disabled={loading} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, height: 56, padding: "0 32px", background: "#8FE0E8", color: "#072327", border: "1.5px solid #8FE0E8", borderRadius: 4, fontFamily: "var(--font-plex-mono)", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", cursor: loading ? "wait" : "pointer", alignSelf: "flex-start", minWidth: 200, opacity: loading ? 0.7 : 1 }}>
                  {loading ? "WIRD GESENDET..." : "ANFRAGE SENDEN"}
                </button>
                {apiError && <span role="alert" style={{ ...errorStyle, fontSize: 13 }}>{apiError}</span>}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
