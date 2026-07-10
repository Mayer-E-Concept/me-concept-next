import { NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml } from "@/lib/escape-html";
import { rateLimit } from "@/lib/rate-limit";
import { TIME_SLOTS, isValidBookingDate } from "@/lib/booking";

const NOTIFY_TO = "contact@me-concept.ro";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Prea multe cereri. Încearcă din nou mai târziu." },
      { status: 429 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[book-appointment] RESEND_API_KEY lipsește.");
    return NextResponse.json({ error: "Serviciu indisponibil." }, { status: 503 });
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
      return NextResponse.json({ error: "Completează toate câmpurile obligatorii." }, { status: 400 });

    if (!EMAIL_RE.test(email))
      return NextResponse.json({ error: "Email invalid." }, { status: 400 });

    if (name.length > 120 || email.length > 160 || phone.length > 30 || message.length > 2000)
      return NextResponse.json({ error: "Câmpuri prea lungi." }, { status: 400 });

    if (!isValidBookingDate(date))
      return NextResponse.json({ error: "Dată invalidă sau indisponibilă pentru programare." }, { status: 400 });

    if (!(TIME_SLOTS as readonly string[]).includes(time))
      return NextResponse.json({ error: "Interval orar invalid." }, { status: 400 });

    const safeName    = escapeHtml(name);
    const safeEmail   = escapeHtml(email);
    const safePhone   = escapeHtml(phone);
    const safeTime    = escapeHtml(time);
    const safeMessage = escapeHtml(message);

    // `date` vine ca zi calendaristică locală (YYYY-MM-DD). O fixăm la miezul nopții UTC
    // și formatăm tot în UTC, ca ziua afișată să fie exact cea aleasă, independent de
    // fusul runtime-ului (Vercel rulează în UTC).
    const dateObj = new Date(`${date}T00:00:00Z`);
    const dateRo  = dateObj.toLocaleDateString("ro-RO", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
      timeZone: "UTC",
    });

    const notifyHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#051E27;color:#F4F2EC;padding:32px;border-radius:8px;">
        <h2 style="color:#1A6F7A;margin:0 0 24px;">Programare nouă primită</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);width:140px;">Client</td><td style="padding:8px 0;font-weight:600;">${safeName}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);">Email</td><td style="padding:8px 0;"><a href="mailto:${safeEmail}" style="color:#1A6F7A;">${safeEmail}</a></td></tr>
          ${safePhone ? `<tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);">Telefon</td><td style="padding:8px 0;">${safePhone}</td></tr>` : ""}
          <tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);">Data</td><td style="padding:8px 0;font-weight:600;text-transform:capitalize;">${dateRo}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);">Ora</td><td style="padding:8px 0;font-weight:600;">${safeTime}</td></tr>
          ${safeMessage ? `<tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);vertical-align:top;">Mesaj</td><td style="padding:8px 0;">${safeMessage.replace(/\n/g, "<br>")}</td></tr>` : ""}
        </table>
      </div>`;

    const confirmHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#051E27;color:#F4F2EC;padding:32px;border-radius:8px;">
        <h2 style="color:#1A6F7A;margin:0 0 8px;">Programare confirmată</h2>
        <p style="color:rgba(244,242,236,0.65);margin:0 0 28px;">Bună ziua, <strong style="color:#F4F2EC;">${safeName}</strong>! Programarea ta la Mayer E-Concept a fost înregistrată.</p>
        <div style="background:rgba(26,111,122,0.12);border:1px solid rgba(26,111,122,0.30);border-radius:8px;padding:20px 24px;margin-bottom:28px;">
          <p style="margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:0.12em;color:#1A6F7A;">Detalii programare</p>
          <p style="margin:0;font-size:22px;font-weight:700;text-transform:capitalize;">${dateRo}</p>
          <p style="margin:4px 0 0;font-size:18px;color:rgba(244,242,236,0.75);">ora ${safeTime}</p>
        </div>
        <p style="color:rgba(244,242,236,0.55);font-size:14px;margin:0 0 4px;">Te vom contacta în curând pentru a confirma disponibilitatea.</p>
        <p style="color:rgba(244,242,236,0.55);font-size:14px;margin:0;">Întrebări? Scrie-ne la <a href="mailto:contact@me-concept.ro" style="color:#1A6F7A;">contact@me-concept.ro</a></p>
        <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:28px 0 16px;"/>
        <p style="color:rgba(244,242,236,0.25);font-size:12px;margin:0;">Mayer E-Concept SRL · Strada Măslinului nr. 9, Sibiu</p>
      </div>`;

    const results = await Promise.allSettled([
      resend.emails.send({
        from: `Mayer E-Concept <${FROM}>`,
        to: NOTIFY_TO,
        subject: `Programare nouă: ${name.replace(/[\r\n]/g, " ").slice(0, 80)} — ${dateRo} la ${time}`,
        html: notifyHtml,
        replyTo: email,
      }),
      resend.emails.send({
        from: `Mayer E-Concept <${FROM}>`,
        to: email,
        subject: `Programare confirmată — ${dateRo} la ${time}`,
        html: confirmHtml,
      }),
    ]);

    const notifyResult = results[0];
    if (notifyResult.status === "rejected" || notifyResult.value?.error) {
      const err = notifyResult.status === "rejected" ? notifyResult.reason : notifyResult.value.error;
      console.error("[book-appointment] Eroare Resend:", JSON.stringify(err));
      return NextResponse.json({ error: "Trimiterea a eșuat." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[book-appointment]", err);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}
