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
    icon: Layers,
    title: "Level & IFC Manager",
    desc: "Toate nivelurile proiectului, grupate automat (subsol/parter/etaj), filtrabile pe zone. Citește niveluri, unități și locație direct din IFC și semnalează neconcordanțele de unități înainte să devină probleme.",
  },
  {
    icon: LayoutGrid,
    title: "Family Placer",
    desc: "Plasează mai multe familii într-un aranjament configurat — stivuit, unul lângă altul, cu spațiere personalizată — și salvează totul ca șablon reutilizabil pentru fiecare apartament sau unitate.",
  },
  {
    icon: Search,
    title: "Family Browser",
    desc: "Căutare și plasare rapidă pentru orice familie din bibliotecă, fără să cauți prin structura de panouri nativă a Revit.",
  },
  {
    icon: Lightbulb,
    title: "Lamp Placer",
    desc: "Distribuție automată de corpuri de iluminat într-o încăpere, aranjare pe grilă manuală sau pe o linie trasată, cu spațiere egală în stil DIALux — pentru Rooms și MEP Spaces.",
  },
  {
    icon: MessageSquare,
    title: "Comments",
    desc: "Un strat de comentarii care trăiește în model. Lasă o notă legată de un element, atribuie-o unui coleg și urmărește-o până la rezolvare — cu notificare desktop și acces direct la element.",
  },
  {
    icon: History,
    title: "Activity Log",
    desc: "Înregistrare automată a cine a adăugat, modificat sau șters ce și când, în tot modelul partajat. Filtrabil, căutabil, exportabil CSV — răspunsul la „cine a schimbat asta?”",
  },
  {
    icon: ArrowLeftRight,
    title: "Project Transfer",
    desc: "Alege filtre, vederi de schiță, legende, planșe și scheduri dintr-un proiect și copiază-le direct în altul, cu previzualizare live a exact ce se transferă.",
  },
  {
    icon: Wrench,
    title: "Fix Level",
    desc: "Repară o problemă Revit ușor de ratat: o instanță de familie a cărei proprietate „Level” nu corespunde cu poziția reală — sursă tăcută de erori în scheduri și filtre pe nivel.",
  },
  {
    icon: BarChart3,
    title: "Statistics",
    desc: "Numărători rapide pentru prize, corpuri de iluminat și întrerupătoare, pe etaj — o verificare instantanee, fără să deschizi un schedule.",
  },
];

const DIFFERENTIATORS = [
  "Interfață nativă Revit — temă dark/light construită să se simtă ca parte din Revit, nu ca un plugin lipit alături",
  "Complet multilingv — întreaga interfață, nu doar câteva etichete, în engleză, germană și română",
  "Gândit pentru documentația electrică reală — circuite, apartamente, convenții germane de denumire, nu un „tagging tool” generic",
  "Întreținut activ — dezvoltat pe baza feedback-ului din proiecte reale, cu un istoric de reparare a unor probleme Revit subtile",
  "Un singur instalator, o singură licență — acoperă Revit 2025 și 2026",
];

const TRIAL_DOWNLOAD_URL = "/downloads/ElecTriX-Setup-v1.8.0.exe";

const PRICING_TIERS = [
  { name: "Trial", desc: "14 zile gratuit, pentru evaluare completă a suitei.", download: true },
  { name: "Extensie 30 de zile", desc: "Pentru proiecte care au nevoie de puțin timp suplimentar de testare." },
  { name: "Licență 1 an", desc: "Acces complet, cu actualizări, pentru un an." },
  { name: "Licență permanentă", desc: "Acces complet, fără limită de timp." },
];

const INTEREST_OPTIONS = [
  { value: "demo", label: "Vreau o demonstrație" },
  { value: "purchase", label: "Vreau să discut o achiziție" },
  { value: "question", label: "Am o întrebare generală" },
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

export function ElecTriXPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  function validate(form: HTMLFormElement) {
    const errs: Record<string, string> = {};
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value.trim();
    const interest = (form.elements.namedItem("interest") as HTMLSelectElement)?.value;
    if (!name) errs.name = "Câmp obligatoriu.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Email invalid.";
    if (!interest) errs.interest = "Selectează o opțiune.";
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
      setApiError("Mesajul nu a putut fi trimis. Încearcă din nou sau scrie-ne direct la contact@me-concept.ro.");
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
            <div style={eyebrowStyle}>Add-in Revit · Mayer E-Concept</div>
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
              <span style={{ color: "#8FE0E8" }}>ElecTriX</span>: etichetare de circuite, gestionare niveluri și coordonare de echipă — direct în Revit.
            </h1>
            <p style={{ fontFamily: "var(--font-barlow)", fontSize: "clamp(15px, 1.2vw, 18px)", lineHeight: 1.7, color: "#A9C9CC", maxWidth: "62ch", marginBottom: 32 }}>
              O suită profesională de instrumente pentru Revit, creată de un birou de proiectare electrică
              pentru echipe MEP. Unsprezece instrumente sub un singur tab de ribbon, pentru Revit 2025 și 2026.
            </p>

            <div className="electrix-hero-badges" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
              {["Revit 2025 & 2026", "EN · DE · RO", "Licență per stație de lucru"].map((b) => (
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
                Descarcă versiunea trial gratuită →
              </a>
              <a href="#inquiry" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-plex-mono)", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9C9CC", textDecoration: "none", padding: "16px 30px", borderRadius: 4, background: "transparent", border: "1.5px solid rgba(143,224,232,0.4)" }}>
                Cere o demonstrație sau o achiziție
              </a>
            </div>
            <p style={{ fontFamily: "var(--font-barlow)", fontSize: 12.5, color: "#7FA2A6", marginTop: 14 }}>
              14 zile funcționalitate completă · fără cont necesar · Revit 2025 & 2026
            </p>
          </div>
        </div>
      </section>

      {/* PROBLEM -> SOLUTION */}
      <section id="cum-functioneaza" style={{ position: "relative", paddingTop: "clamp(72px, 9vw, 130px)", paddingBottom: "clamp(72px, 9vw, 130px)", scrollMarginTop: 72 }}>
        <SectionDivider />
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
          <FadeIn>
            <div style={{ maxWidth: "760px", marginBottom: 48 }}>
              <div style={eyebrowStyle}>De ce ElecTriX</div>
              <h2 style={{ ...h2Style, marginBottom: 20 }}>De la etichetare manuală, la date live despre proiect</h2>
              <p style={{ fontFamily: "var(--font-barlow)", fontSize: "clamp(14px, 1.1vw, 16px)", lineHeight: 1.75, color: "#A9C9CC" }}>
                Revit nu are un concept nativ de „circuit”. Etichetarea prizelor, întrerupătoarelor și
                corpurilor de iluminat pe circuite se face manual, element cu element — iar verificarea
                corectitudinii înseamnă, de obicei, un export separat în Excel. ElecTriX calculează
                eticheta de circuit automat, o scrie pe fiecare element selectat, plasează adnotarea
                corect orientată și păstrează totul interogabil direct în model, pe măsură ce proiectul
                și echipa cresc.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="electrix-compare-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 24, alignItems: "center" }}>
              <div style={{ background: "rgba(224,123,90,0.06)", border: "1px solid rgba(224,123,90,0.25)", borderRadius: 12, padding: "26px 28px" }}>
                <div style={{ fontFamily: "var(--font-plex-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#E07B5A", marginBottom: 10 }}>
                  Fără ElecTriX
                </div>
                <p style={{ fontFamily: "var(--font-barlow)", fontSize: 16, color: "#F2FBFC", margin: 0, lineHeight: 1.6 }}>
                  10 circuite etichetate unul câte unul, apoi verificate manual într-un Excel separat.
                </p>
              </div>
              <div style={{ fontFamily: "var(--font-plex-mono)", fontSize: 13, fontWeight: 700, color: "#7FA2A6" }}>→</div>
              <div style={{ background: "rgba(143,224,232,0.06)", border: "1px solid rgba(143,224,232,0.30)", borderRadius: 12, padding: "26px 28px" }}>
                <div style={{ fontFamily: "var(--font-plex-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8FE0E8", marginBottom: 10 }}>
                  Cu ElecTriX
                </div>
                <p style={{ fontFamily: "var(--font-barlow)", fontSize: 16, color: "#F2FBFC", margin: 0, lineHeight: 1.6 }}>
                  10 circuite etichetate și exportate în Excel, în sub un minut — datele rămân live în model.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FEATURES */}
      <section id="functii" style={{ position: "relative", background: "#0E323D", paddingTop: "clamp(72px, 9vw, 130px)", paddingBottom: "clamp(72px, 9vw, 130px)", scrollMarginTop: 72, overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #5AC9D4 30%, #5AC9D4 70%, transparent)", opacity: 0.45 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
          <FadeIn>
            <div style={{ maxWidth: "700px", marginBottom: 48 }}>
              <div style={eyebrowStyle}>Instrumentele</div>
              <h2 style={h2Style}>Unsprezece instrumente. Un singur ribbon.</h2>
            </div>
          </FadeIn>

          {/* Flagship — Circuit Tagger */}
          <FadeIn>
            <div style={{ background: "linear-gradient(135deg, rgba(143,224,232,0.10), rgba(143,224,232,0.02))", border: "1.5px solid rgba(143,224,232,0.35)", borderRadius: 16, padding: "clamp(28px, 4vw, 44px)", marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "#8FE0E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Tag size={22} color="#072327" strokeWidth={2} />
                </div>
                <span style={{ fontFamily: "var(--font-plex-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8FE0E8" }}>
                  Instrumentul principal
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--font-barlow)", fontSize: "clamp(22px, 2.4vw, 30px)", fontWeight: 800, color: "#F2FBFC", marginBottom: 16 }}>
                Circuit Tagger
              </h3>
              <p style={{ fontFamily: "var(--font-barlow)", fontSize: "clamp(14px, 1.1vw, 16px)", lineHeight: 1.75, color: "#A9C9CC", maxWidth: "76ch", marginBottom: 24 }}>
                Selectezi orice combinație de prize, întrerupătoare și corpuri de iluminat, completezi
                siguranța și ramura de circuit, iar ElecTriX calculează eticheta automat (ex. siguranța
                „1” + ramura „F2” → eticheta „1F2”), o scrie pe fiecare element și plasează o adnotare
                corect orientată, indiferent de direcția peretelui. Sub-circuitele primesc automat
                suffixul „_1”, „_2”.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
                {[
                  "Circuit Stats: grupare Clădire → Apartament → Circuit, cu numărători live și export Excel dintr-un click",
                  "Detectează automat apartamentele copiate pe alt etaj și le reetichetează ca grup nou",
                  "Aspectul etichetei (culoare, font, leader) e complet configurabil și oglindește stilurile native Revit",
                ].map((t) => (
                  <li key={t} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <Check size={17} color="#8FE0E8" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: "var(--font-barlow)", fontSize: 14, lineHeight: 1.55, color: "#F2FBFC" }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

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
            <div style={eyebrowStyle}>De ce merită</div>
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
      <section id="capturi" style={{ position: "relative", background: "#051E27", paddingTop: "clamp(72px, 9vw, 130px)", paddingBottom: "clamp(72px, 9vw, 130px)", scrollMarginTop: 72 }}>
        <SectionDivider />
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
          <FadeIn>
            <div style={{ maxWidth: "700px", marginBottom: 40 }}>
              <div style={eyebrowStyle}>Cum arată</div>
              <h2 style={h2Style}>Interfața ElecTriX</h2>
            </div>
          </FadeIn>

          <FadeIn>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="electrix-ribbon-frame">
                <Image src="/uploads/electrix-ribbon.png" alt="Tab-ul ElecTriX în ribbon-ul Revit" fill style={{ objectFit: "cover" }} sizes="(max-width: 900px) 100vw, 900px" />
              </div>
              <p style={{ fontFamily: "var(--font-barlow)", fontSize: 13.5, color: "#A9C9CC", marginTop: 12, textAlign: "center" }}>
                Tab-ul ElecTriX — toate cele unsprezece instrumente, într-un singur loc
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PRICING */}
      <section id="licentiere" style={{ position: "relative", paddingTop: "clamp(72px, 9vw, 130px)", paddingBottom: "clamp(72px, 9vw, 130px)", scrollMarginTop: 72 }}>
        <SectionDivider />
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
          <FadeIn>
            <div style={{ maxWidth: "700px", marginBottom: 40 }}>
              <div style={eyebrowStyle}>Licențiere</div>
              <h2 style={h2Style}>O licență pentru fiecare etapă</h2>
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
                      Descarcă →
                    </a>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
              <a href="#inquiry" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-plex-mono)", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#072327", textDecoration: "none", padding: "16px 36px", borderRadius: 4, background: "#8FE0E8", border: "1.5px solid #8FE0E8", boxShadow: "0 2px 14px rgba(143,224,232,0.22)" }}>
                Alege o opțiune și contactează-ne →
              </a>
            </div>
          </FadeIn>

          <FadeIn>
            <div style={{ background: "rgba(143,224,232,0.04)", border: "1px solid rgba(143,224,232,0.12)", borderRadius: 8, padding: "20px 24px", display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between" }}>
              <p style={{ fontFamily: "var(--font-barlow)", fontSize: 13.5, lineHeight: 1.6, color: "#A9C9CC", margin: 0, maxWidth: "56ch" }}>
                Licențele sunt legate de stația de lucru (Machine ID generat la instalare). Trimiteți
                Machine ID-ul către Mayer E-Concept și primiți cheia de licență prin email.
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
            <div style={eyebrowStyle}>Contact</div>
            <h2 style={{ ...h2Style, marginBottom: 24, maxWidth: "18ch" }}>Cere o demonstrație sau o achiziție</h2>
            <p style={{ fontFamily: "var(--font-barlow)", fontSize: 15, lineHeight: 1.7, color: "#A9C9CC", marginBottom: 24, maxWidth: "44ch" }}>
              Versiunea trial gratuită este disponibilă mai sus pentru descărcare directă. Pentru o
              demonstrație, achiziționarea unei licențe sau întrebări generale răspundem în 24 de ore
              lucrătoare — sau scrieți-ne direct la{" "}
              <a href="mailto:contact@me-concept.ro" style={{ color: "#8FE0E8" }}>contact@me-concept.ro</a>.
            </p>
            <p style={{ fontFamily: "var(--font-barlow)", fontSize: 13.5, lineHeight: 1.6, color: "#7FA2A6" }}>
              Compatibil cu Autodesk Revit 2025 și 2026 · interfață EN / DE / RO
            </p>
          </div>

          <div>
            {submitted ? (
              <div role="status" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: "48px 32px", background: "rgba(143,224,232,0.04)", border: "1px solid rgba(143,224,232,0.30)", borderRadius: 8, textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(143,224,232,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check size={26} color="#8FE0E8" strokeWidth={2.5} />
                </div>
                <h3 style={{ fontFamily: "var(--font-barlow)", fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 700, color: "#F2FBFC", margin: 0 }}>
                  Cerere trimisă!
                </h3>
                <p style={{ fontFamily: "var(--font-barlow)", fontSize: 15, lineHeight: 1.65, color: "#A9C9CC", margin: 0, maxWidth: "36ch" }}>
                  Vă răspundem în cel mult 24 de ore lucrătoare.
                </p>
                <button onClick={() => setSubmitted(false)} style={{ marginTop: 8, background: "none", border: "1px solid rgba(143,224,232,0.40)", color: "#8FE0E8", fontFamily: "var(--font-plex-mono)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "10px 24px", borderRadius: 4, cursor: "pointer" }}>
                  Trimite altă cerere
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label htmlFor="mt-name" style={labelStyle}>Nume</label>
                    <input id="mt-name" name="name" type="text" placeholder="Nume complet" aria-invalid={!!errors.name} style={{ ...inputStyle, borderColor: errors.name ? "#E07B5A" : "rgba(143,224,232,0.20)" }} onChange={() => setErrors((p) => { const n = { ...p }; delete n.name; return n; })} />
                    {errors.name && <span role="alert" style={errorStyle}>{errors.name}</span>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label htmlFor="mt-email" style={labelStyle}>Email</label>
                    <input id="mt-email" name="email" type="email" placeholder="nume@companie.ro" aria-invalid={!!errors.email} style={{ ...inputStyle, borderColor: errors.email ? "#E07B5A" : "rgba(143,224,232,0.20)" }} onChange={() => setErrors((p) => { const n = { ...p }; delete n.email; return n; })} />
                    {errors.email && <span role="alert" style={errorStyle}>{errors.email}</span>}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label htmlFor="mt-company" style={labelStyle}>Companie (opțional)</label>
                  <input id="mt-company" name="company" type="text" placeholder="Nume companie" style={inputStyle} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label htmlFor="mt-interest" style={labelStyle}>Sunt interesat de</label>
                  <select id="mt-interest" name="interest" defaultValue="" aria-invalid={!!errors.interest} style={{ ...inputStyle, borderColor: errors.interest ? "#E07B5A" : "rgba(143,224,232,0.20)" }} onChange={() => setErrors((p) => { const n = { ...p }; delete n.interest; return n; })}>
                    <option value="" disabled>Selectează o opțiune</option>
                    {INTEREST_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  {errors.interest && <span role="alert" style={errorStyle}>{errors.interest}</span>}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label htmlFor="mt-message" style={labelStyle}>Mesaj (opțional)</label>
                  <textarea id="mt-message" name="message" rows={4} placeholder="Detalii despre proiect sau echipă..." style={{ ...inputStyle, resize: "vertical" }} />
                </div>

                <button type="submit" disabled={loading} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, height: 56, padding: "0 32px", background: "#8FE0E8", color: "#072327", border: "1.5px solid #8FE0E8", borderRadius: 4, fontFamily: "var(--font-plex-mono)", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", cursor: loading ? "wait" : "pointer", alignSelf: "flex-start", minWidth: 200, opacity: loading ? 0.7 : 1 }}>
                  {loading ? "SE TRIMITE..." : "TRIMITE CEREREA"}
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
