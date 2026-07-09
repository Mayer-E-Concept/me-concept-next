"use client";

import { useState } from "react";
import { CalendarIcon, CheckCircle2, ChevronLeft, ClockIcon, MailIcon, PhoneIcon, UserIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
];

const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;
const isPast = (d: Date) => {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return d < today;
};
const isToday = (d: Date) => {
  const now = new Date();
  return d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
};
// Dezactivează slot-urile care au trecut deja (pentru ziua curentă)
const isSlotUnavailable = (slot: string, selectedDate: Date | undefined): boolean => {
  if (!selectedDate || !isToday(selectedDate)) return false;
  const [h, m] = slot.split(":").map(Number);
  const slotTime = new Date();
  slotTime.setHours(h, m, 0, 0);
  return slotTime < new Date(); // dezactivat doar dacă ora a trecut
};

const formatDate = (d: Date, locale: "ro" | "de") =>
  d.toLocaleDateString(locale === "de" ? "de-DE" : "ro-RO", { weekday: "long", day: "numeric", month: "long" });

// Ziua calendaristică locală ca YYYY-MM-DD — NU folosi toISOString() (convertește în UTC
// și decalează data cu o zi pentru fusurile cu offset pozitiv, ex. Europe/Bucharest).
const toLocalISODate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const T = {
  ro: {
    pickLabel: "Alege data și ora",
    timeLabel: "Orar",
    selectBtn: "Selectează data și ora",
    continueBtn: (date: Date, time: string) => `Continuă — ${formatDate(date, "ro")} la ${time}`,
    backBtn: "Înapoi",
    detailsLabel: "Date contact",
    namePlaceholder: "Numele tău",
    emailPlaceholder: "email@exemplu.com",
    phonePlaceholder: "Telefon (opțional)",
    messagePlaceholder: "Descrie pe scurt proiectul sau întrebarea ta (opțional)",
    nameError: "Câmpul este obligatoriu.",
    emailError: "Email invalid.",
    apiError: "A apărut o eroare. Încearcă din nou.",
    submitBtn: "Confirmă programarea",
    sendingBtn: "Se trimite...",
    successTitle: "Programare confirmată!",
    successMsg: () => `Am primit solicitarea ta. Vei primi un email de confirmare la `,
    successEmail: true,
    successDot: ".",
    anotherBtn: "Altă programare",
    atWord: "la",
  },
  de: {
    pickLabel: "Datum und Uhrzeit wählen",
    timeLabel: "Uhrzeit",
    selectBtn: "Datum und Uhrzeit wählen",
    continueBtn: (date: Date, time: string) => `Weiter — ${formatDate(date, "de")} um ${time}`,
    backBtn: "Zurück",
    detailsLabel: "Kontaktdaten",
    namePlaceholder: "Ihr Name",
    emailPlaceholder: "email@beispiel.com",
    phonePlaceholder: "Telefon (optional)",
    messagePlaceholder: "Beschreiben Sie kurz Ihr Projekt oder Ihre Frage (optional)",
    nameError: "Pflichtfeld.",
    emailError: "Ungültige E-Mail.",
    apiError: "Ein Fehler ist aufgetreten. Bitte erneut versuchen.",
    submitBtn: "Termin bestätigen",
    sendingBtn: "Wird gesendet...",
    successTitle: "Termin bestätigt!",
    successMsg: () => `Ihre Anfrage wurde erhalten. Sie erhalten eine Bestätigung an `,
    successEmail: true,
    successDot: ".",
    anotherBtn: "Weiterer Termin",
    atWord: "um",
  },
} as const;

type Step = "pick" | "details" | "success";

const inputBase: React.CSSProperties = {
  background: "#0B373D",
  border: "1px solid rgba(143,224,232,0.20)",
  borderRadius: 6,
  color: "#F2FBFC",
  padding: "11px 14px 11px 40px",
  fontFamily: "var(--font-barlow)",
  fontSize: 14,
  outline: "none",
  width: "100%",
  boxSizing: "border-box" as const,
  transition: "border-color .2s, background .2s",
};

export function AppointmentCalendar({ locale = "ro" }: { locale?: "ro" | "de" }) {
  const t = T[locale];
  const [step, setStep] = useState<Step>("pick");
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = t.nameError;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.emailError;
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setApiError("");
    try {
      const res = await fetch("/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: date ? toLocalISODate(date) : undefined, time, name: form.name, email: form.email, phone: form.phone, message: form.message }),
      });
      if (!res.ok) throw new Error();
      setStep("success");
    } catch {
      setApiError(t.apiError);
    } finally {
      setLoading(false);
    }
  };

  /* ── Step: success ── */
  if (step === "success") return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "40px 24px", textAlign: "center" }}>
      <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(143,224,232,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CheckCircle2 size={30} color="#8FE0E8" />
      </div>
      <h3 style={{ fontFamily: "var(--font-barlow)", fontSize: 22, fontWeight: 700, color: "#F2FBFC", margin: 0 }}>
        {t.successTitle}
      </h3>
      <p style={{ fontFamily: "var(--font-barlow)", fontSize: 14, lineHeight: 1.65, color: "rgba(242,251,252,0.60)", margin: 0, maxWidth: "34ch" }}>
        {t.successMsg()}<span style={{ color: "#8FE0E8" }}>{form.email}</span>{t.successDot}
      </p>
      <div style={{ background: "rgba(143,224,232,0.10)", border: "1px solid rgba(143,224,232,0.25)", borderRadius: 8, padding: "14px 20px", marginTop: 8 }}>
        <p style={{ fontFamily: "var(--font-barlow)", fontSize: 15, fontWeight: 600, color: "#F2FBFC", margin: "0 0 2px", textTransform: "capitalize" }}>
          {date && formatDate(date, locale)}
        </p>
        <p style={{ fontFamily: "var(--font-barlow)", fontSize: 13, color: "#8FE0E8", margin: 0 }}>{t.atWord} {time}</p>
      </div>
      <button
        onClick={() => { setStep("pick"); setDate(undefined); setTime(null); setForm({ name: "", email: "", phone: "", message: "" }); }}
        style={{ marginTop: 8, background: "none", border: "1px solid rgba(143,224,232,0.35)", color: "#8FE0E8", fontFamily: "var(--font-plex-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "9px 22px", borderRadius: 4, cursor: "pointer" }}
      >
        {t.anotherBtn}
      </button>
    </div>
  );

  /* ── Step: details form ── */
  if (step === "details") return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Header back */}
      <button
        onClick={() => setStep("pick")}
        style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "rgba(242,251,252,0.50)", fontFamily: "var(--font-plex-mono)", fontSize: 12, fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", cursor: "pointer", padding: "0 0 16px", transition: "color .2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#8FE0E8")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(242,251,252,0.50)")}
      >
        <ChevronLeft size={14} /> {t.backBtn}
      </button>

      {/* Selected slot summary */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(143,224,232,0.10)", border: "1px solid rgba(143,224,232,0.22)", borderRadius: 6, padding: "8px 14px" }}>
          <CalendarIcon size={13} color="#8FE0E8" />
          <span style={{ fontFamily: "var(--font-barlow)", fontSize: 12, color: "#F2FBFC", textTransform: "capitalize" }}>
            {date && formatDate(date, locale)}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(143,224,232,0.10)", border: "1px solid rgba(143,224,232,0.22)", borderRadius: 6, padding: "8px 14px" }}>
          <ClockIcon size={13} color="#8FE0E8" />
          <span style={{ fontFamily: "var(--font-barlow)", fontSize: 12, color: "#F2FBFC" }}>{time}</span>
        </div>
      </div>

      <p style={{ fontFamily: "var(--font-plex-mono)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(242,251,252,0.45)", marginBottom: 16 }}>
        {t.detailsLabel}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Name */}
        <div style={{ position: "relative" }}>
          <UserIcon size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(242,251,252,0.35)", pointerEvents: "none" }} />
          <input
            placeholder={t.namePlaceholder}
            value={form.name}
            onChange={(e) => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => { const n = { ...p }; delete n.name; return n; }); }}
            style={{ ...inputBase, borderColor: errors.name ? "#E07B5A" : "rgba(143,224,232,0.20)" }}
            onFocus={(e) => { e.target.style.borderColor = "rgba(143,224,232,0.6)"; }}
            onBlur={(e) => { e.target.style.borderColor = errors.name ? "#E07B5A" : "rgba(143,224,232,0.20)"; }}
          />
          {errors.name && <span style={{ fontSize: 11, color: "#E07B5A", marginTop: 3, display: "block" }}>{errors.name}</span>}
        </div>
        {/* Email */}
        <div style={{ position: "relative" }}>
          <MailIcon size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(242,251,252,0.35)", pointerEvents: "none" }} />
          <input
            placeholder={t.emailPlaceholder}
            type="email"
            value={form.email}
            onChange={(e) => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => { const n = { ...p }; delete n.email; return n; }); }}
            style={{ ...inputBase, borderColor: errors.email ? "#E07B5A" : "rgba(143,224,232,0.20)" }}
            onFocus={(e) => { e.target.style.borderColor = "rgba(143,224,232,0.6)"; }}
            onBlur={(e) => { e.target.style.borderColor = errors.email ? "#E07B5A" : "rgba(143,224,232,0.20)"; }}
          />
          {errors.email && <span style={{ fontSize: 11, color: "#E07B5A", marginTop: 3, display: "block" }}>{errors.email}</span>}
        </div>
        {/* Phone (optional) */}
        <div style={{ position: "relative" }}>
          <PhoneIcon size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(242,251,252,0.35)", pointerEvents: "none" }} />
          <input
            placeholder={t.phonePlaceholder}
            value={form.phone}
            onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
            style={inputBase}
            onFocus={(e) => { e.target.style.borderColor = "rgba(143,224,232,0.6)"; }}
            onBlur={(e) => { e.target.style.borderColor = "rgba(143,224,232,0.20)"; }}
          />
        </div>
        {/* Message (optional) */}
        <div>
          <textarea
            placeholder={t.messagePlaceholder}
            value={form.message}
            rows={4}
            onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
            style={{ ...inputBase, padding: "11px 14px", resize: "vertical", lineHeight: 1.55 }}
            onFocus={(e) => { e.target.style.borderColor = "rgba(143,224,232,0.6)"; }}
            onBlur={(e) => { e.target.style.borderColor = "rgba(143,224,232,0.20)"; }}
          />
        </div>
      </div>

      {apiError && (
        <p style={{ fontSize: 12, color: "#E07B5A", marginTop: 10, marginBottom: 0 }}>{apiError}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: 20,
          height: 52,
          background: loading ? "#0E323D" : "#8FE0E8",
          border: "none",
          borderRadius: 4,
          color: loading ? "#F2FBFC" : "#072327",
          fontFamily: "var(--font-plex-mono)",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          cursor: loading ? "wait" : "pointer",
          transition: "background .2s, transform .2s",
          opacity: loading ? 0.7 : 1,
        }}
        onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#6fd0da"; }}
        onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#8FE0E8"; }}
      >
        {loading ? t.sendingBtn : t.submitBtn}
      </button>
    </div>
  );

  /* ── Step: pick date + time ── */
  return (
    <div>
      <style>{`
        .appt-time-btn {
          width: 100%; padding: 8px 0; border-radius: 6px;
          font-family: var(--font-barlow); font-size: 13px; font-weight: 600;
          cursor: pointer; transition: background .15s, border-color .15s, color .15s;
          border: 1px solid rgba(143,224,232,0.12);
          background: rgba(143,224,232,0.04);
          color: rgba(242,251,252,0.70);
        }
        .appt-time-btn:hover { background: rgba(143,224,232,0.10); color: #F2FBFC; }
        .appt-time-btn.selected {
          background: #8FE0E8; border-color: #8FE0E8; color: #072327;
        }
        @media (max-width: 600px) {
          .appt-inner { flex-direction: column !important; }
          .appt-slots { border-left: none !important; border-top: 1px solid rgba(143,224,232,0.08) !important; height: 180px !important; }
        }
      `}</style>

      <p style={{ fontFamily: "var(--font-plex-mono)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(242,251,252,0.40)", marginBottom: 18 }}>
        {t.pickLabel}
      </p>

      <div className="appt-inner" style={{ display: "flex", gap: 0, border: "1px solid rgba(143,224,232,0.10)", borderRadius: 10, overflow: "hidden" }}>
        {/* Calendar */}
        <div style={{ flex: "1 1 auto", padding: "20px 16px" }}>
          <Calendar
            selected={date}
            onSelect={setDate}
            disabled={(d) => isPast(d) || isWeekend(d)}
            locale={locale}
          />
        </div>

        {/* Time slots */}
        <div
          className="appt-slots"
          style={{
            width: 130,
            flexShrink: 0,
            borderLeft: "1px solid rgba(143,224,232,0.08)",
            height: 320,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p style={{ fontFamily: "var(--font-plex-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(242,251,252,0.35)", margin: "16px 14px 10px" }}>
            {t.timeLabel}
          </p>
          <ScrollArea style={{ flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "0 12px 16px" }}>
              {TIME_SLOTS.map((t) => {
                const unavailable = !date || isSlotUnavailable(t, date);
                return (
                <button
                  key={t}
                  className={`appt-time-btn${time === t ? " selected" : ""}`}
                  onClick={() => { if (!unavailable) setTime(t); }}
                  disabled={unavailable}
                  style={{ opacity: unavailable ? 0.25 : 1, cursor: unavailable ? "not-allowed" : "pointer" }}
                >
                  {t}
                </button>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>

      <button
        onClick={() => setStep("details")}
        disabled={!date || !time}
        style={{
          marginTop: 16,
          width: "100%",
          height: 50,
          background: date && time ? "#8FE0E8" : "rgba(143,224,232,0.20)",
          border: "none",
          borderRadius: 4,
          color: date && time ? "#072327" : "rgba(143,224,232,0.55)",
          fontFamily: "var(--font-plex-mono)",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          cursor: date && time ? "pointer" : "not-allowed",
          transition: "background .2s, color .2s",
        }}
        onMouseEnter={(e) => { if (date && time) (e.currentTarget as HTMLButtonElement).style.background = "#6fd0da"; }}
        onMouseLeave={(e) => { if (date && time) (e.currentTarget as HTMLButtonElement).style.background = "#8FE0E8"; }}
      >
        {date && time ? t.continueBtn(date, time) : t.selectBtn}
      </button>
    </div>
  );
}
