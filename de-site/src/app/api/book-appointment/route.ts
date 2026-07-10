import { NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml } from "@/lib/escape-html";
import { rateLimit } from "@/lib/rate-limit";
import { TIME_SLOTS, isValidBookingDate } from "@/lib/booking";

const NOTIFY_TO = "contact@me-concept.ro";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!(await rateLimit(`book-appointment:${ip}`))) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
      { status: 429 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[book-appointment] RESEND_API_KEY fehlt.");
    return NextResponse.json({ error: "Dienst nicht verfügbar." }, { status: 503 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  try {
    const body = await req.json();
    const name    = String(body?.name    ?? "").trim();
    const email   = String(body?.email   ?? "").trim();
    const phone   = String(body?.phone   ?? "").trim();
    const date    = String(body?.date    ?? "").trim();
    const time    = String(body?.time    ?? "").trim();
    const message = String(body?.message ?? "").trim();
    const company = String(body?.company ?? "").trim();

    if (company) return NextResponse.json({ ok: true });

    if (!date || !time || !name || !email)
      return NextResponse.json({ error: "Unvollständige Daten." }, { status: 400 });

    if (!EMAIL_RE.test(email))
      return NextResponse.json({ error: "Ungültige E-Mail." }, { status: 400 });

    if (name.length > 120 || email.length > 160 || phone.length > 30 || message.length > 2000)
      return NextResponse.json({ error: "Felder zu lang." }, { status: 400 });

    if (!isValidBookingDate(date))
      return NextResponse.json({ error: "Ungültiges oder nicht verfügbares Datum." }, { status: 400 });

    if (!(TIME_SLOTS as readonly string[]).includes(time))
      return NextResponse.json({ error: "Ungültige Uhrzeit." }, { status: 400 });

    const safeName    = escapeHtml(name);
    const safeEmail   = escapeHtml(email);
    const safePhone   = escapeHtml(phone);
    const safeTime    = escapeHtml(time);
    const safeMessage = escapeHtml(message);

    // `date` kommt als lokales Kalenderdatum (YYYY-MM-DD). Wir fixieren es auf Mitternacht UTC
    // und formatieren alles in UTC, damit das angezeigte Datum unabhängig von der Zeitzone
    // der Laufzeitumgebung exakt dem ausgewählten Tag entspricht (Vercel läuft in UTC).
    const dateObj = new Date(`${date}T00:00:00Z`);
    const dateDe  = dateObj.toLocaleDateString("de-DE", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
      timeZone: "UTC",
    });

    const notifyHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#051E27;color:#F4F2EC;padding:32px;border-radius:8px;">
        <h2 style="color:#1A6F7A;margin:0 0 24px;">Neuer Termin eingegangen</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);width:140px;">Kunde</td><td style="padding:8px 0;font-weight:600;">${safeName}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);">E-Mail</td><td style="padding:8px 0;"><a href="mailto:${safeEmail}" style="color:#1A6F7A;">${safeEmail}</a></td></tr>
          ${safePhone ? `<tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);">Telefon</td><td style="padding:8px 0;">${safePhone}</td></tr>` : ""}
          <tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);">Datum</td><td style="padding:8px 0;font-weight:600;text-transform:capitalize;">${dateDe}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);">Uhrzeit</td><td style="padding:8px 0;font-weight:600;">${safeTime}</td></tr>
          ${safeMessage ? `<tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);vertical-align:top;">Nachricht</td><td style="padding:8px 0;">${safeMessage.replace(/\n/g, "<br>")}</td></tr>` : ""}
        </table>
      </div>`;

    const confirmHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#051E27;color:#F4F2EC;padding:32px;border-radius:8px;">
        <h2 style="color:#1A6F7A;margin:0 0 8px;">Termin bestätigt</h2>
        <p style="color:rgba(244,242,236,0.65);margin:0 0 28px;">Guten Tag, <strong style="color:#F4F2EC;">${safeName}</strong>! Ihr Termin bei Mayer E-Concept wurde erfasst.</p>
        <div style="background:rgba(26,111,122,0.12);border:1px solid rgba(26,111,122,0.30);border-radius:8px;padding:20px 24px;margin-bottom:28px;">
          <p style="margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:0.12em;color:#1A6F7A;">Termindetails</p>
          <p style="margin:0;font-size:22px;font-weight:700;text-transform:capitalize;">${dateDe}</p>
          <p style="margin:4px 0 0;font-size:18px;color:rgba(244,242,236,0.75);">um ${safeTime}</p>
        </div>
        <p style="color:rgba(244,242,236,0.55);font-size:14px;margin:0 0 4px;">Wir melden uns in Kürze, um die Verfügbarkeit zu bestätigen.</p>
        <p style="color:rgba(244,242,236,0.55);font-size:14px;margin:0;">Fragen? Schreiben Sie uns an <a href="mailto:contact@me-concept.ro" style="color:#1A6F7A;">contact@me-concept.ro</a></p>
        <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:28px 0 16px;"/>
        <p style="color:rgba(244,242,236,0.25);font-size:12px;margin:0;">Mayer E-Concept SRL · Strada Măslinului nr. 9, Sibiu</p>
      </div>`;

    const results = await Promise.allSettled([
      resend.emails.send({
        from: `Mayer E-Concept <${FROM}>`,
        to: NOTIFY_TO,
        subject: `Neuer Termin: ${name.replace(/[\r\n]/g, " ").slice(0, 80)} — ${dateDe} um ${time}`,
        html: notifyHtml,
        replyTo: email,
      }),
      resend.emails.send({
        from: `Mayer E-Concept <${FROM}>`,
        to: email,
        subject: `Termin bestätigt — ${dateDe} um ${time}`,
        html: confirmHtml,
      }),
    ]);

    const notifyResult = results[0];
    if (notifyResult.status === "rejected" || notifyResult.value?.error) {
      const err = notifyResult.status === "rejected" ? notifyResult.reason : notifyResult.value.error;
      console.error("[book-appointment] Resend-Fehler:", JSON.stringify(err));
      return NextResponse.json({ error: "Senden fehlgeschlagen." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[book-appointment]", err);
    return NextResponse.json({ error: "Interner Fehler." }, { status: 500 });
  }
}
