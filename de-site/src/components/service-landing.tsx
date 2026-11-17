import Image from "next/image";
import Link from "next/link";
import { SiteHeaderDe } from "@/components/site-header";
import { SiteFooterDe } from "@/components/site-footer";
import { SITE_URL } from "@/lib/site";
import { BUSINESS } from "@/lib/business";

// Landing page for a local service (execution of electrical installations).
// Server component: all text is in the HTML for search engines; photos are the company's own.

export type Pic = { src: string; alt: string; pos?: string };
export type ServiceCard = { title: string; text: string; img: Pic; href?: string };
export type Faq = { q: string; a: string };

type Props = {
  path: string;
  serviceName: string;
  serviceType: string;
  eyebrow: string;
  title: [string, string, string?]; // text, highlighted part, text after
  lead: string;
  hero: Pic;
  chips: string[];
  stats: { value: string; label: string }[];
  cardsTitle: string;
  cards: ServiceCard[];
  quote: { text: string; who: string; role: string; img: Pic };
  steps: { title: string; text: string }[];
  areas: string[];
  faqs: Faq[];
  cta: { title: string; text: string; img: Pic };
  related?: { href: string; label: string };
};

export const SL_CSS = `
.sl-hero{position:relative;min-height:min(86vh,860px);display:flex;align-items:flex-end;overflow:hidden}
.sl-hero-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(9,52,55,.96) 0%,rgba(9,52,55,.82) 40%,rgba(9,52,55,.25) 100%),linear-gradient(0deg,rgba(9,52,55,1) 0%,rgba(9,52,55,0) 35%)}
.sl-wrap{max-width:1200px;margin:0 auto;padding:0 clamp(20px,5vw,48px);position:relative}
.sl-h1{font-family:var(--font-barlow);font-weight:800;font-size:clamp(40px,6.4vw,84px);line-height:.98;letter-spacing:-.025em;color:#F2FBFC;margin:0 0 22px;max-width:15ch}
.sl-h1 em{font-style:normal;color:#8FE0E8}
.sl-eyebrow{font-family:var(--font-plex-mono);font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#8FE0E8;margin:0 0 18px;display:flex;align-items:center;gap:10px}
.sl-eyebrow:before{content:"";width:28px;height:1.5px;background:#8FE0E8}
.sl-lead{font-size:clamp(17px,1.6vw,21px);line-height:1.6;color:#C9DEDB;max-width:56ch;margin:0 0 32px}
.sl-btn{display:inline-flex;align-items:center;gap:10px;font-weight:700;font-size:16px;padding:16px 26px;border-radius:999px;text-decoration:none;transition:transform .15s ease,background .2s ease}
.sl-btn:hover{transform:translateY(-2px)}
.sl-btn-main{background:#8FE0E8;color:#0F4A4B}
.sl-btn-ghost{border:1.5px solid rgba(242,251,252,.35);color:#F2FBFC}
.sl-btn-ghost:hover{background:rgba(242,251,252,.08)}
.sl-chips{display:flex;flex-wrap:wrap;gap:10px;margin:34px 0 0}
.sl-chip{font-family:var(--font-plex-mono);font-size:12px;letter-spacing:.06em;color:#F2FBFC;border:1px solid rgba(143,224,232,.35);background:rgba(9,52,55,.55);backdrop-filter:blur(6px);padding:8px 14px;border-radius:999px}
.sl-stats{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(143,224,232,.14);border-bottom:1px solid rgba(143,224,232,.14)}
.sl-stat{padding:34px 20px;border-left:1px solid rgba(143,224,232,.14)}
.sl-stat:first-child{border-left:none}
.sl-stat b{display:block;font-family:var(--font-barlow);font-weight:800;font-size:clamp(34px,4vw,54px);line-height:1;color:#F2FBFC}
.sl-stat span{display:block;margin-top:8px;font-size:14px;color:#9FC1BE}
.sl-sec{padding:clamp(72px,9vw,128px) 0 0}
.sl-h2{font-family:var(--font-barlow);font-weight:800;font-size:clamp(30px,4vw,52px);line-height:1.05;letter-spacing:-.02em;color:#F2FBFC;margin:0 0 36px;max-width:20ch}
.sl-bento{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:300px;gap:16px}
.sl-card{position:relative;border-radius:22px;overflow:hidden;display:flex;align-items:flex-end;text-decoration:none;isolation:isolate}
.sl-card:first-child{grid-column:span 2;grid-row:span 2}
.sl-card img{transition:transform .6s ease}
.sl-card:hover img{transform:scale(1.05)}
.sl-card-shade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(9,52,55,.95) 0%,rgba(9,52,55,.45) 45%,rgba(9,52,55,0) 75%);z-index:1}
.sl-card-body{position:relative;z-index:2;padding:24px 26px}
.sl-card h3{font-family:var(--font-barlow);font-weight:800;font-size:clamp(22px,2vw,28px);color:#F2FBFC;margin:0 0 6px}
.sl-card:first-child h3{font-size:clamp(28px,3vw,40px)}
.sl-card p{font-size:15px;line-height:1.5;color:#C9DEDB;margin:0;max-width:44ch}
.sl-card-more{display:inline-block;margin-top:10px;font-family:var(--font-plex-mono);font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#8FE0E8}
.sl-quote{display:grid;grid-template-columns:minmax(260px,420px) 1fr;gap:clamp(32px,5vw,72px);align-items:center}
.sl-quote-img{position:relative;aspect-ratio:4/5;border-radius:24px;overflow:hidden}
.sl-quote blockquote{margin:0;font-family:var(--font-barlow);font-weight:700;font-size:clamp(26px,3.2vw,42px);line-height:1.2;color:#F2FBFC}
.sl-quote blockquote:before{content:"„";display:block;font-size:110px;line-height:.6;color:#8FE0E8;margin-bottom:18px}
.sl-quote figcaption{margin-top:22px;color:#9FC1BE;font-size:15px}
.sl-quote figcaption b{color:#F2FBFC}
.sl-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;counter-reset:s}
.sl-step{position:relative;padding-top:86px}
.sl-step:before{counter-increment:s;content:"0" counter(s);position:absolute;top:0;left:0;font-family:var(--font-barlow);font-weight:800;font-size:72px;line-height:1;color:transparent;-webkit-text-stroke:1.5px #8FE0E8}
.sl-step h3{font-family:var(--font-barlow);font-weight:700;font-size:22px;color:#F2FBFC;margin:0 0 8px}
.sl-step p{font-size:15px;line-height:1.6;color:#9FC1BE;margin:0}
.sl-step p::first-letter{text-transform:uppercase}
.sl-areas{display:flex;flex-wrap:wrap;gap:10px}
.sl-area{font-weight:600;font-size:16px;color:#F2FBFC;padding:12px 18px;border-radius:12px;background:rgba(143,224,232,.07);border:1px solid rgba(143,224,232,.18)}
.sl-area:first-child{background:#8FE0E8;color:#0F4A4B}
.sl-faq{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.sl-faq details{background:rgba(143,224,232,.05);border:1px solid rgba(143,224,232,.14);border-radius:16px;padding:20px 22px}
.sl-faq summary{cursor:pointer;font-weight:700;font-size:17px;color:#F2FBFC;list-style:none;display:flex;justify-content:space-between;gap:16px}
.sl-faq summary::-webkit-details-marker{display:none}
.sl-faq summary:after{content:"+";color:#8FE0E8;font-size:22px;line-height:1}
.sl-faq details[open] summary:after{content:"–"}
.sl-faq p{margin:12px 0 0;font-size:15.5px;line-height:1.65;color:#B5CFCC}
.sl-cta{position:relative;margin-top:clamp(72px,9vw,128px);border-radius:28px;overflow:hidden;min-height:420px;display:flex;align-items:center}
.sl-cta-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(9,52,55,.95) 0%,rgba(9,52,55,.75) 50%,rgba(9,52,55,.35) 100%)}
.sl-cta-body{position:relative;padding:clamp(32px,5vw,64px);max-width:640px}
@media (max-width:900px){
 .sl-stats{grid-template-columns:repeat(2,1fr)}
 .sl-stat:nth-child(3){border-left:none}
 .sl-stat:nth-child(n+3){border-top:1px solid rgba(143,224,232,.14)}
 .sl-bento{grid-template-columns:1fr;grid-auto-rows:minmax(340px,auto)}
 .sl-card-shade{background:linear-gradient(0deg,rgba(9,52,55,.97) 0%,rgba(9,52,55,.75) 50%,rgba(9,52,55,.1) 85%)}
 .sl-card:first-child{grid-column:auto;grid-row:span 1}
 .sl-quote{grid-template-columns:1fr}
 .sl-quote-img{max-width:360px}
 .sl-steps{grid-template-columns:1fr 1fr}
 .sl-faq{grid-template-columns:1fr}
}
@media (max-width:520px){.sl-steps{grid-template-columns:1fr}}
`;

export function ServiceLanding(p: Props) {
  const url = `${SITE_URL}${p.path}`;
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: p.serviceName,
      serviceType: p.serviceType,
      url,
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: p.areas.map((name) => ({ "@type": "City", name })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: p.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: p.serviceName, item: url },
      ],
    },
  ];
  const tel = `tel:${BUSINESS.phoneE164}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <style>{SL_CSS}</style>
      <SiteHeaderDe />
      <main style={{ color: "#F2FBFC" }}>
        {/* Hero mit eigenem Baustellenfoto */}
        <section className="sl-hero">
          <Image src={p.hero.src} alt={p.hero.alt} fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: p.hero.pos ?? "center" }} />
          <div className="sl-hero-shade" />
          <div className="sl-wrap" style={{ width: "100%", paddingTop: 140, paddingBottom: "clamp(48px,7vw,96px)" }}>
            <p className="sl-eyebrow">{p.eyebrow}</p>
            <h1 className="sl-h1">
              {p.title[0]} <em>{p.title[1]}</em>
              {p.title[2] ? ` ${p.title[2]}` : ""}
            </h1>
            <p className="sl-lead">{p.lead}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href={tel} className="sl-btn sl-btn-main">
                Jetzt anrufen · {BUSINESS.phoneDisplay}
              </a>
              <Link href="/#contact" className="sl-btn sl-btn-ghost">
                Angebot anfragen →
              </Link>
            </div>
            <div className="sl-chips">
              {p.chips.map((c) => (
                <span key={c} className="sl-chip">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="sl-wrap">
          {/* Zahlen */}
          <div className="sl-stats">
            {p.stats.map((s) => (
              <div key={s.label} className="sl-stat">
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Leistungen als Bildkarten */}
          <section className="sl-sec">
            <p className="sl-eyebrow">Was wir ausführen</p>
            <h2 className="sl-h2">{p.cardsTitle}</h2>
            <div className="sl-bento">
              {p.cards.map((c, i) => {
                const body = (
                  <>
                    <Image src={c.img.src} alt={c.img.alt} fill sizes={i === 0 ? "(max-width:900px) 100vw, 66vw" : "(max-width:900px) 100vw, 33vw"} style={{ objectFit: "cover", objectPosition: c.img.pos ?? "center" }} />
                    <div className="sl-card-shade" />
                    <div className="sl-card-body">
                      <h3>{c.title}</h3>
                      <p>{c.text}</p>
                      {c.href && <span className="sl-card-more">Mehr erfahren →</span>}
                    </div>
                  </>
                );
                return c.href ? (
                  <Link key={c.title} href={c.href} className="sl-card">
                    {body}
                  </Link>
                ) : (
                  <div key={c.title} className="sl-card">
                    {body}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Zitat */}
          <section className="sl-sec">
            <figure className="sl-quote" style={{ margin: 0 }}>
              <div className="sl-quote-img">
                <Image src={p.quote.img.src} alt={p.quote.img.alt} fill sizes="(max-width:900px) 360px, 420px" style={{ objectFit: "cover", objectPosition: p.quote.img.pos ?? "center" }} />
              </div>
              <div>
                <blockquote>{p.quote.text}</blockquote>
                <figcaption>
                  <b>{p.quote.who}</b> · {p.quote.role}
                </figcaption>
              </div>
            </figure>
          </section>

          {/* Ablauf */}
          <section className="sl-sec">
            <p className="sl-eyebrow">So arbeiten wir</p>
            <h2 className="sl-h2">Vom ersten Anruf bis zur fertigen Anlage</h2>
            <div className="sl-steps">
              {p.steps.map((s) => (
                <div key={s.title} className="sl-step">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Einsatzgebiet */}
          <section className="sl-sec">
            <p className="sl-eyebrow">Unser Gebiet</p>
            <h2 className="sl-h2">In Sibiu und Umgebung</h2>
            <div className="sl-areas">
              {p.areas.map((a) => (
                <span key={a} className="sl-area">
                  {a}
                </span>
              ))}
            </div>
            <p style={{ marginTop: 18, color: "#9FC1BE", fontSize: 15 }}>Für größere Projekte kommen wir auch in andere Orte im Kreis Sibiu. Fragen Sie uns.</p>
          </section>

          {/* FAQ */}
          <section className="sl-sec">
            <p className="sl-eyebrow">Häufige Fragen</p>
            <h2 className="sl-h2">Was Kunden uns fragen</h2>
            <div className="sl-faq">
              {p.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Abschluss mit Teamfoto */}
          <section className="sl-cta">
            <Image src={p.cta.img.src} alt={p.cta.img.alt} fill sizes="100vw" style={{ objectFit: "cover", objectPosition: p.cta.img.pos ?? "center" }} />
            <div className="sl-cta-shade" />
            <div className="sl-cta-body">
              <h2 className="sl-h2" style={{ marginBottom: 16 }}>
                {p.cta.title}
              </h2>
              <p className="sl-lead" style={{ marginBottom: 26 }}>
                {p.cta.text}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                <a href={tel} className="sl-btn sl-btn-main">
                  Jetzt anrufen · {BUSINESS.phoneDisplay}
                </a>
                <Link href="/#contact" className="sl-btn sl-btn-ghost">
                  Kontaktformular
                </Link>
              </div>
              <p style={{ marginTop: 22, color: "#9FC1BE", fontSize: 14 }}>
                {BUSINESS.name} · {BUSINESS.street}, {BUSINESS.city}
                {p.related && (
                  <>
                    {" · "}
                    <Link href={p.related.href} style={{ color: "#8FE0E8", textDecoration: "none", fontWeight: 600 }}>
                      {p.related.label} →
                    </Link>
                  </>
                )}
              </p>
            </div>
          </section>
          <div style={{ height: "clamp(64px,8vw,120px)" }} />
        </div>
      </main>
      <SiteFooterDe />
    </>
  );
}
