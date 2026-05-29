import { NextResponse } from "next/server";
import { Resend } from "resend";

const NOTIFY_TO = "contact@me-concept.ro";

export async function POST(req: Request) {
  // Instanțiere în handler — evită eroarea la build (RESEND_API_KEY lipsește la build time)
  const resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");
  const FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  try {
    const { date, time, name, email, phone } = await req.json();

    if (!date || !time || !name || !email) {
      return NextResponse.json({ error: "Date incomplete." }, { status: 400 });
    }

    const dateObj = new Date(date);
    const dateRo = dateObj.toLocaleDateString("ro-RO", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const notifyHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#051E27;color:#F4F2EC;padding:32px;border-radius:8px;">
        <h2 style="color:#C5895B;margin:0 0 24px;">Programare nouă primită</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);width:140px;">Client</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#C5895B;">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);">Telefon</td><td style="padding:8px 0;">${phone}</td></tr>` : ""}
          <tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);">Data</td><td style="padding:8px 0;font-weight:600;text-transform:capitalize;">${dateRo}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(244,242,236,0.55);">Ora</td><td style="padding:8px 0;font-weight:600;">${time}</td></tr>
        </table>
      </div>`;

    const confirmHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#051E27;color:#F4F2EC;padding:32px;border-radius:8px;">
        <h2 style="color:#C5895B;margin:0 0 8px;">Programare confirmată</h2>
        <p style="color:rgba(244,242,236,0.65);margin:0 0 28px;">Bună ziua, <strong style="color:#F4F2EC;">${name}</strong>! Programarea ta la Mayer E-Concept a fost înregistrată.</p>
        <div style="background:rgba(197,137,91,0.12);border:1px solid rgba(197,137,91,0.30);border-radius:8px;padding:20px 24px;margin-bottom:28px;">
          <p style="margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:0.12em;color:#C5895B;">Detalii programare</p>
          <p style="margin:0;font-size:22px;font-weight:700;text-transform:capitalize;">${dateRo}</p>
          <p style="margin:4px 0 0;font-size:18px;color:rgba(244,242,236,0.75);">ora ${time}</p>
        </div>
        <p style="color:rgba(244,242,236,0.55);font-size:14px;margin:0 0 4px;">Te vom contacta în curând pentru a confirma disponibilitatea.</p>
        <p style="color:rgba(244,242,236,0.55);font-size:14px;margin:0;">Întrebări? Scrie-ne la <a href="mailto:contact@me-concept.ro" style="color:#C5895B;">contact@me-concept.ro</a></p>
        <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:28px 0 16px;"/>
        <p style="color:rgba(244,242,236,0.25);font-size:12px;margin:0;">Mayer E-Concept SRL · Strada Măslinului nr. 9, Sibiu</p>
      </div>`;

    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: NOTIFY_TO,
        subject: `Programare nouă: ${name} — ${dateRo} la ${time}`,
        html: notifyHtml,
        replyTo: email,
      }),
      resend.emails.send({
        from: FROM,
        to: email,
        subject: `Programare confirmată — ${dateRo} la ${time}`,
        html: confirmHtml,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[book-appointment]", err);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}
