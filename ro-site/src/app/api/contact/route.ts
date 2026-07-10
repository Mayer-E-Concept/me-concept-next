import { NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml } from "@/lib/escape-html";
import { rateLimit } from "@/lib/rate-limit";

const NOTIFY_TO = "contact@me-concept.ro";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!(await rateLimit(`contact:${ip}`))) {
    return NextResponse.json(
      { error: "Prea multe cereri. Încearcă din nou mai târziu." },
      { status: 429 }
    );
  }

  // Instanțiere în handler — evită eroarea la build dacă RESEND_API_KEY lipsește.
  const resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");
  const FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  try {
    const body = await req.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const message = String(body?.message ?? "").trim();
    const company = String(body?.company ?? "").trim(); // honeypot (câmp ascuns)

    // Anti-spam: boții completează câmpul ascuns — abandonăm silențios (200, ca să nu semnalăm).
    if (company) return NextResponse.json({ ok: true });

    // Validare server-side (nu te baza doar pe validarea din client).
    if (!name || !email || !message || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Date invalide." }, { status: 400 });
    }
    if (name.length > 120 || email.length > 160 || message.length > 5000) {
      return NextResponse.json({ error: "Câmpuri prea lungi." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("[contact] RESEND_API_KEY lipsește din environment.");
      return NextResponse.json({ error: "Serviciu indisponibil." }, { status: 503 });
    }

    // Escapează tot input-ul înainte de a-l pune în HTML.
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#051E27;color:#F4F2EC;padding:32px;border-radius:8px;">
        <h2 style="color:#C5895B;margin:0 0 24px;">Mesaj nou de contact</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);width:120px;vertical-align:top;">Nume</td><td style="padding:8px 0;font-weight:600;">${safeName}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);vertical-align:top;">Email</td><td style="padding:8px 0;"><a href="mailto:${safeEmail}" style="color:#C5895B;">${safeEmail}</a></td></tr>
        </table>
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(197,137,91,0.30);border-radius:8px;padding:18px 22px;margin-top:18px;">
          <p style="margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:0.12em;color:#C5895B;">Mesaj</p>
          <p style="margin:0;line-height:1.6;">${safeMessage}</p>
        </div>
        <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:28px 0 16px;"/>
        <p style="color:rgba(244,242,236,0.25);font-size:12px;margin:0;">Trimis din formularul de contact · me-concept.ro</p>
      </div>`;

    const result = await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      subject: `Mesaj nou de contact: ${name.replace(/[\r\n]/g, " ").slice(0, 80)}`,
      html,
      replyTo: email,
    });

    if (result.error) {
      console.error("[contact] Resend:", result.error);
      return NextResponse.json({ error: "Trimiterea a eșuat." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}
