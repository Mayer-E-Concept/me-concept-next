"use client";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { BOOKINGS_URL } from "@/lib/site";

const AppointmentCalendar = dynamic(
  () => import("@/components/appointment-calendar").then((m) => m.AppointmentCalendar),
  { ssr: false, loading: () => <div style={{ height: 320 }} /> }
);

type ActiveTab = "form" | "calendar";

export function ContactSectionDe() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("calendar");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  function validate(form: HTMLFormElement) {
    const errs: Record<string, string> = {};
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value.trim();
    if (!name) errs.name = "Pflichtfeld.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Ungültige E-Mail.";
    if (!message) errs.message = "Bitte geben Sie eine Nachricht ein.";
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
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
      company: (form.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "",
    };
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      setSubmitted(true);
    } catch {
      setApiError(
        "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an contact@me-concept.ro."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: 4,
    color: "#fff",
    padding: "14px 16px",
    fontFamily: "var(--font-body)",
    fontSize: 15,
    outline: "none",
    transition: "border-color .2s ease, background .2s ease",
    width: "100%",
    boxSizing: "border-box" as const,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontSize: "11.5px",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "rgba(244,242,236,0.65)",
  };

  const errorStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "12px",
    color: "#E07B5A",
    marginTop: 4,
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        background: "#051E27",
        paddingTop: "clamp(72px, 9vw, 130px)",
        paddingBottom: "clamp(72px, 9vw, 130px)",
        overflow: "hidden",
        scrollMarginTop: "72px",
        color: "#F4F2EC",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .contact-name-email-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: 'url("/assets/circuit-pattern.svg")',
          backgroundSize: "240px 240px",
          opacity: 0.10,
          filter: "invert(1)",
          pointerEvents: "none",
        }}
      />

      <div
        className="contact-grid"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px, 6vw, 100px)",
          alignItems: "start",
        }}
      >
        {/* Left — info */}
        <div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(28px, 3.4vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              color: "#F4F2EC",
              maxWidth: "20ch",
              marginBottom: 28,
            }}
          >
            Lassen Sie uns über Ihr Projekt sprechen
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.7,
              color: "rgba(244,242,236,0.75)",
              marginBottom: 40,
              maxWidth: "46ch",
            }}
          >
            Senden Sie uns eine Nachricht oder kontaktieren Sie uns direkt.
            Wir antworten innerhalb von 24 Stunden an Werktagen.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
            {[
              { label: "E-Mail", value: "info@me-concept.de", href: "mailto:info@me-concept.de" },
            ].map(({ label, value, href }) => (
              <div key={label}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1A6F7A", marginBottom: 4 }}>
                  {label}
                </div>
                {href ? (
                  <a href={href} style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#F4F2EC", textDecoration: "none" }}>
                    {value}
                  </a>
                ) : (
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#F4F2EC" }}>{value}</div>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Image src="/uploads/SKYCERT9001.png" alt="ISO 9001:2015 SKYCERT" width={80} height={50} style={{ objectFit: "contain", display: "block" }} />
            </div>
          </div>
        </div>

        {/* Right — tabs + form / calendar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {/* Tab switcher */}
          <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.10)", marginBottom: 28 }}>
            {(["calendar", "form"] as ActiveTab[]).map((tab) => {
              const label = tab === "form" ? "Nachricht senden" : "Termin vereinbaren";
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: "none",
                    border: "none",
                    borderBottom: active ? "2px solid #C5895B" : "2px solid transparent",
                    padding: "10px 0",
                    marginRight: 28,
                    marginBottom: -1,
                    fontFamily: "var(--font-sans)",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    letterSpacing: "0.11em",
                    textTransform: "uppercase",
                    color: active ? "#F4F2EC" : "rgba(244,242,236,0.38)",
                    cursor: "pointer",
                    transition: "color .2s, border-color .2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = "#C5895B"; }}
                  onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = "rgba(244,242,236,0.38)"; }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Calendar tab */}
          {/* Calendar tab — Microsoft Bookings embed wenn konfiguriert, sonst der eigene Kalender */}
          {activeTab === "calendar" && (BOOKINGS_URL ? (
            <iframe
              src={BOOKINGS_URL}
              title="Termin vereinbaren — Mayer E-Concept"
              loading="lazy"
              style={{ width: "100%", minHeight: 760, border: "1px solid rgba(255,255,255,0.10)", borderRadius: 8, background: "#fff" }}
            />
          ) : (
            <AppointmentCalendar locale="de" />
          ))}

          {/* Form tab */}
          {activeTab === "form" && (submitted ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              padding: "48px 32px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(197,137,91,0.30)",
              borderRadius: 8,
              textAlign: "center",
            }}
          >
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(197,137,91,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C5895B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 700, color: "#F4F2EC", margin: 0 }}>
              Nachricht gesendet!
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.65, color: "rgba(244,242,236,0.65)", margin: 0, maxWidth: "36ch" }}>
              Vielen Dank! Wir melden uns innerhalb von 24 Stunden an Werktagen bei Ihnen.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              style={{ marginTop: 8, background: "none", border: "1px solid rgba(197,137,91,0.40)", color: "#C5895B", fontFamily: "var(--font-sans)", fontSize: "11.5px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "10px 24px", borderRadius: 4, cursor: "pointer", transition: "border-color .2s ease" }}
            >
              Weitere Nachricht senden
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Honeypot Anti-Spam — visuell versteckt; Bots füllen es aus, Menschen nicht. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />
            <div className="contact-name-email-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { name: "name", label: "Name", type: "text", placeholder: "Ihr Name" },
                { name: "email", label: "E-Mail", type: "email", placeholder: "ihre@email.de" },
              ].map((field) => (
                <div key={field.name} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label htmlFor={`de-${field.name}`} style={labelStyle}>{field.label}</label>
                  <input
                    id={`de-${field.name}`}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    style={{ ...inputStyle, borderColor: errors[field.name] ? "#E07B5A" : "rgba(255,255,255,0.16)" }}
                    onFocus={(e) => { e.target.style.borderColor = "#1A6F7A"; e.target.style.background = "rgba(255,255,255,0.10)"; }}
                    onBlur={(e) => { e.target.style.borderColor = errors[field.name] ? "#E07B5A" : "rgba(255,255,255,0.16)"; e.target.style.background = "rgba(255,255,255,0.06)"; }}
                    onChange={() => setErrors((prev) => { const n = { ...prev }; delete n[field.name]; return n; })}
                  />
                  {errors[field.name] && <span style={errorStyle}>{errors[field.name]}</span>}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="de-message" style={labelStyle}>Nachricht</label>
              <textarea
                id="de-message"
                name="message"
                rows={5}
                placeholder="Beschreiben Sie kurz Ihr Projekt oder Ihre Frage..."
                style={{ ...inputStyle, resize: "vertical", borderColor: errors.message ? "#E07B5A" : "rgba(255,255,255,0.16)" }}
                onFocus={(e) => { e.target.style.borderColor = "#1A6F7A"; e.target.style.background = "rgba(255,255,255,0.10)"; }}
                onBlur={(e) => { e.target.style.borderColor = errors.message ? "#E07B5A" : "rgba(255,255,255,0.16)"; e.target.style.background = "rgba(255,255,255,0.06)"; }}
                onChange={() => setErrors((prev) => { const n = { ...prev }; delete n.message; return n; })}
              />
              {errors.message && <span style={errorStyle}>{errors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={loading}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                height: 56,
                padding: "0 32px",
                background: loading ? "#0E323D" : btnHovered ? "#C5895B" : "#0E323D",
                color: "#ffffff",
                border: `1.5px solid ${btnHovered && !loading ? "#C5895B" : "#0E323D"}`,
                borderRadius: 4,
                fontFamily: "var(--font-sans)",
                fontSize: "12.5px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: loading ? "wait" : "pointer",
                transition: "background .2s ease, border-color .2s ease, transform .2s ease",
                transform: btnHovered && !loading ? "translateY(-2px)" : "translateY(0)",
                alignSelf: "flex-start",
                minWidth: 200,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  WIRD GESENDET...
                </>
              ) : "ABSENDEN"}
            </button>
            {apiError && (
              <span role="alert" style={{ ...errorStyle, fontSize: 13 }}>{apiError}</span>
            )}
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </form>
        ))}
        </div>
      </div>
    </section>
  );
}
