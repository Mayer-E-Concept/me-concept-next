import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { escapeHtml } from "@/lib/escape-html";

const NOTIFY_TO = "contact@me-concept.ro";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createTransport() {
  return nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { ciphers: "SSLv3" },
  });
}

export async function POST(req: Request) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("[book-appointment] SMTP_USER sau SMTP_PASS lipsesc.");
    return NextResponse.json({ error: "Serviciu indisponibil." }, { status: 503 });
  }

  try {
    const body = await req.json();
    const name    = String(body?.name    ?? "").trim();
    const email   = String(body?.email   ?? "").trim();
    const phone   = String(body?.phone   ?? "").trim();
    const date    = String(body?.date    ?? "").trim();
    const time    = String(body?.time    ?? "").trim();
    const company = String(body?.company ?? "").trim();

    if (company) return NextResponse.json({ ok: true });

    if (!date || !time || !name || !email)
      return NextResponse.json({ error: "Date incomplete." }, { status: 400 });

    if (!EMAIL_RE.test(email))
      return NextResponse.json({ error: "Email invalid." }, { status: 400 });

    if (name.length > 120 || email.length > 160 || phone.length > 30)
      return NextResponse.json({ error: "Câmpuri prea lungi." }, { status: 400 });

    const safeName  = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeTime  = escapeHtml(time);

    const dateObj = new Date(date);
    const dateRo  = dateObj.toLocaleDateString("ro-RO", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });

    const FROM = `Mayer E-Concept <${process.env.SMTP_USER}>`;

    const notifyHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#051E27;color:#F4F2EC;padding:32px;border-radius:8px;">
        <h2 style="color:#1A6F7A;margin:0 0 24px;">Programare nouă primită</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);width:140px;">Client</td><td style="padding:8px 0;font-weight:600;">${safeName}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);">Email</td><td style="padding:8px 0;"><a href="mailto:${safeEmail}" style="color:#1A6F7A;">${safeEmail}</a></td></tr>
          ${safePhone ? `<tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);">Telefon</td><td style="padding:8px 0;">${safePhone}</td></tr>` : ""}
          <tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);">Data</td><td style="padding:8px 0;font-weight:600;text-transform:capitalize;">${dateRo}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);">Ora</td><td style="padding:8px 0;font-weight:600;">${safeTime}</td></tr>
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

    const transport = createTransport();

    const results = await Promise.allSettled([
      transport.sendMail({
        from: FROM,
        to: NOTIFY_TO,
        subject: `Programare nouă: ${name.replace(/[\r\n]/g, " ").slice(0, 80)} — ${dateRo} la ${time}`,
        html: notifyHtml,
        replyTo: email,
      }),
      transport.sendMail({
        from: FROM,
        to: email,
        subject: `Programare confirmată — ${dateRo} la ${time}`,
        html: confirmHtml,
      }),
    ]);

    const notifyResult = results[0];
    if (notifyResult.status === "rejected") {
      console.error("[book-appointment] Notificare eșuată:", notifyResult.reason);
      return NextResponse.json({ error: "Trimiterea a eșuat." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[book-appointment]", err);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}
