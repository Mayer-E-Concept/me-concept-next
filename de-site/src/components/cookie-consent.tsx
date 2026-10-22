"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";

// Cookie-Hinweis: erscheint beim ersten Besuch. Notwendige Cookies laufen immer;
// die anonyme Besucherstatistik (Vercel Analytics) startet nur nach Zustimmung.
// Die Auswahl wird im Browser gespeichert und kann über den Footer-Link geändert werden.

const KEY = "cookie-consent";
export const OPEN_EVENT = "open-cookie-settings";
type Choice = "all" | "necessary";

const T = {
  title: "Cookies & Datenschutz",
  text: "Wir verwenden nur technisch notwendige Cookies. Mit Ihrer Zustimmung erfassen wir zusätzlich eine anonyme Besucherstatistik (ohne Cookies, ohne Profilbildung), um die Website zu verbessern.",
  policy: "Cookie-Richtlinie",
  policyHref: "/cookie-richtlinie",
  all: "Alle akzeptieren",
  necessary: "Nur notwendige",
};

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function CookieConsent() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {
      // Speicher gesperrt (z. B. privater Modus) – Hinweis trotzdem zeigen
    }
    if (saved === "all" || saved === "necessary") setChoice(saved);
    else setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const decide = (c: Choice) => {
    try {
      localStorage.setItem(KEY, c);
    } catch {
      // nur für diese Sitzung
    }
    setChoice(c);
    setOpen(false);
  };

  const btn = (primary: boolean) =>
    ({
      fontFamily: "var(--font-barlow)",
      fontSize: 14,
      fontWeight: 600,
      padding: "10px 18px",
      borderRadius: 8,
      cursor: "pointer",
      border: primary ? "1px solid #8FE0E8" : "1px solid rgba(143,224,232,0.35)",
      background: primary ? "#8FE0E8" : "transparent",
      color: primary ? "#072327" : "#F2FBFC",
    }) as const;

  return (
    <>
      {choice === "all" && <Analytics />}
      {open && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label={T.title}
          style={{
            position: "fixed",
            left: 16,
            right: 16,
            bottom: 16,
            zIndex: 1000,
            maxWidth: 720,
            margin: "0 auto",
            background: "#0B2E33",
            border: "1px solid rgba(143,224,232,0.25)",
            borderRadius: 12,
            padding: "18px 20px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
            color: "#F2FBFC",
          }}
        >
          <p style={{ fontFamily: "var(--font-barlow)", fontSize: 16, fontWeight: 700, margin: "0 0 6px" }}>{T.title}</p>
          <p style={{ fontFamily: "var(--font-barlow)", fontSize: 14, lineHeight: 1.5, color: "rgba(242,251,252,0.8)", margin: "0 0 14px" }}>
            {T.text}{" "}
            <Link href={T.policyHref} style={{ color: "#8FE0E8" }}>
              {T.policy}
            </Link>
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button type="button" onClick={() => decide("all")} style={btn(true)}>
              {T.all}
            </button>
            <button type="button" onClick={() => decide("necessary")} style={btn(false)}>
              {T.necessary}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
