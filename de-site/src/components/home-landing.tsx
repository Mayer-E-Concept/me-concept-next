import Image from "next/image";
import Link from "next/link";
import { BUSINESS } from "@/lib/business";
import { SL_CSS } from "@/components/service-landing";

/* Oberer Teil der Startseite im Stil der Ausführungsseiten (service-landing.tsx):
   Foto, Kennzahlen, Bildkarten. Jede Karte führt auf eine eigene Seite,
   die Startseite ist nur Vorschau. */

const STATS = [
  { value: "100+", label: "abgeschlossene Projekte" },
  { value: "20+", label: "Jahre Erfahrung auf Baustellen" },
  { value: "A + B", label: "ANRE-Atteste: Planung und Ausführung" },
  { value: "ISO", label: "9001:2015 zertifiziert" },
];

const CHIPS = ["ANRE-Attest A + B", "ISO 9001:2015", "Elektromeister und Ingenieure", "BIM · Revit"];

type Card = { title: string; text: string; img: string; alt: string; href: string; pos?: string; dim?: boolean };

// Leistungen der Firma. Die eigenen Apps stehen bewusst getrennt in HomeApps.
const CARDS: Card[] = [
  {
    title: "Elektroplanung",
    text: "Komplette Elektroplanung in BIM mit Revit, für Projekte in Deutschland und Rumänien. Vom Hausanschluss bis zum Smart Home.",
    img: "/uploads/blog-ghid.jpg",
    alt: "Planer von Mayer E-Concept arbeitet in Revit an einem Gebäudemodell",
    href: "/elektroplanung",
  },
  {
    title: "Ausführung in Sibiu",
    text: "Elektroinstallation für Häuser, Gewerbe und Hallen, mit ANRE-Attest.",
    img: "/uploads/Iluminat-Arhitctural.jpg",
    alt: "Wohnhaus mit von Mayer E-Concept ausgeführter Außenbeleuchtung",
    href: "/elektroinstallation-sibiu",
  },
  {
    title: "Photovoltaik und Wallbox",
    text: "PV-Anlagen und Ladestationen, sauber in die Verteilung eingebunden.",
    img: "/uploads/pv-wallbox-schema.jpg",
    alt: "Schema: Photovoltaikmodule auf dem Dach, Wechselrichter und Wallbox für das Elektroauto",
    href: "/photovoltaik-sibiu",
    pos: "85% center",
  },
];

const APPS: Card[] = [
  {
    title: "ElecTriX",
    text: "Unsere Suite aus Revit-Werkzeugen für Elektroteams.",
    img: "/uploads/Revit.png",
    alt: "Elektromodell in Revit",
    href: "/electrix",
    pos: "left center",
    dim: true,
  },
  {
    title: "ElectroGrad",
    text: "Unsere Lern-App für die ANRE-Zulassungsprüfung für Elektriker in Rumänien. Erhältlich bei Google Play.",
    img: "/uploads/electrograd/card.jpg",
    alt: "Logo der App ElectroGrad",
    href: "/electrograd",
  },
];

export function HomeLanding() {
  const tel = `tel:${BUSINESS.phoneE164}`;
  return (
    <div className="home-sl" style={{ color: "#F2FBFC" }}>
      <style>{SL_CSS}</style>
      {/* Gleiche Breite und gleiche Ränder wie die Abschnitte darunter */}
      <style>{`.home-sl .sl-wrap{max-width:1240px;padding:0 clamp(20px,5vw,60px)}`}</style>

      {/* Startbild der Hauptseite: Text links auf dem Raster, Teamfoto rechts.
          Am Handy liegt das Foto vollflächig abgedunkelt hinter dem Text. */}
      <style>{`
        .home-hero-img{position:absolute;top:0;bottom:0;right:0;width:64%}
        .home-hero-shade{position:absolute;inset:0;background:linear-gradient(90deg,#0F4A4B 0%,#0F4A4B 36%,rgba(15,74,75,.6) 45%,rgba(15,74,75,.1) 60%,rgba(15,74,75,0) 100%),linear-gradient(0deg,#0F4A4B 0%,rgba(15,74,75,0) 22%)}
        .home-hero .sl-h1{font-size:clamp(34px,4.4vw,60px);max-width:13ch}
        .home-hero .sl-lead{max-width:40ch}
        .home-hero-text{max-width:560px}
        @media (max-width:900px){
          .home-hero-img{width:100%}
          .home-hero-shade{background:linear-gradient(0deg,#0F4A4B 0%,rgba(15,74,75,.82) 45%,rgba(15,74,75,.6) 100%)}
          .home-hero-text{max-width:none}
          .home-hero .sl-h1{max-width:15ch}
        }
      `}</style>
      <section className="sl-hero home-hero">
        <div className="home-hero-img">
          <Image
            src="/uploads/blog-sfaturi.jpg"
            alt="Team von Mayer E-Concept am Tisch bei der Besprechung eines Elektroplans"
            fill
            priority
            sizes="(max-width:900px) 100vw, 64vw"
            style={{ objectFit: "cover", objectPosition: "88% 55%" }}
          />
        </div>
        <div className="home-hero-shade" />
        <div className="sl-wrap" style={{ width: "100%", paddingTop: 140, paddingBottom: "clamp(48px,7vw,96px)" }}>
          <div className="home-hero-text">
          <p className="sl-eyebrow">Elektroplanung · Ausführung · Sibiu</p>
          <h1 className="sl-h1">
            Elektrotechnik <em>geplant und ausgeführt</em> aus einer Hand.
          </h1>
          <p className="sl-lead">
            Elektroplanung in BIM für Projekte in Deutschland und Rumänien. In Sibiu und Umgebung führen wir auch aus, mit Elektromeister, Ingenieuren und ANRE-Attest.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a href={tel} className="sl-btn sl-btn-main">
              Jetzt anrufen · {BUSINESS.phoneDisplay}
            </a>
            <Link href="/#contact" className="sl-btn sl-btn-ghost">
              Beratung anfragen →
            </Link>
          </div>
          <div className="sl-chips">
            {CHIPS.map((c) => (
              <span key={c} className="sl-chip">
                {c}
              </span>
            ))}
          </div>
          </div>
        </div>
      </section>

      <div className="sl-wrap">
        <div className="sl-stats">
          {STATS.map((s) => (
            <div key={s.label} className="sl-stat">
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <section id="leistungen" className="sl-sec" style={{ scrollMarginTop: 72 }}>
          <p className="sl-eyebrow">Was wir tun</p>
          <h2 className="sl-h2">Planung und Ausführung aus einer Hand</h2>
          <div className="sl-bento">
            {CARDS.map((c, i) => (
              <Link key={c.title} href={c.href} className="sl-card">
                <Image
                  src={c.img}
                  alt={c.alt}
                  fill
                  sizes={i === 0 ? "(max-width:900px) 100vw, 66vw" : "(max-width:900px) 100vw, 33vw"}
                  style={{ objectFit: "cover", objectPosition: c.pos ?? "center", filter: c.dim ? "brightness(0.55)" : undefined }}
                />
                <div className="sl-card-shade" />
                <div className="sl-card-body">
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                  <span className="sl-card-more">Mehr erfahren →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="sl-sec" style={{ paddingBottom: "clamp(72px,9vw,128px)" }}>
          <figure className="sl-quote" style={{ margin: 0 }}>
            <div className="sl-quote-img">
              <Image
                src="/uploads/poveste.jpg"
                alt="Martin Mayer, Elektromeister und Gründer von Mayer E-Concept"
                fill
                sizes="(max-width:900px) 360px, 420px"
                style={{ objectFit: "cover", objectPosition: "center 25%" }}
              />
            </div>
            <div>
              <blockquote>Saubere Arbeit, durchdachte Planung, klare Abläufe. Das ist keine Frage des Landes, sondern der Haltung.</blockquote>
              <figcaption>
                <b>Martin Mayer</b> · Elektromeister, Gründer von Mayer E-Concept
              </figcaption>
            </div>
          </figure>
        </section>
      </div>
    </div>
  );
}

/* Eigene Apps: getrennter Abschnitt, nicht zwischen den Leistungen der Firma. */
export function HomeApps() {
  return (
    <div className="sl-wrap" style={{ color: "#F2FBFC", maxWidth: 1240, padding: "0 clamp(20px,5vw,60px) clamp(72px,9vw,128px)" }}>
      <style>{`
        .sl-two{display:grid;grid-template-columns:repeat(2,1fr);grid-auto-rows:300px;gap:16px}
        .sl-two .sl-card:first-child{grid-column:auto;grid-row:auto}
        .sl-two .sl-card:first-child h3{font-size:clamp(22px,2vw,28px)}
        @media (max-width:900px){.sl-two{grid-template-columns:1fr;grid-auto-rows:minmax(300px,auto)}}
      `}</style>
      <section id="software" className="sl-sec" style={{ scrollMarginTop: 72 }}>
        <p className="sl-eyebrow">Eigene Software</p>
        <h2 className="sl-h2" style={{ marginBottom: 18 }}>Werkzeuge, die wir selbst entwickeln</h2>
        <p className="sl-lead" style={{ maxWidth: "68ch", marginBottom: 36 }}>
          Neben Planung und Ausführung möchten wir auch anderen helfen, sich weiterzuentwickeln. Was wir aus eigener Erfahrung für unseren Alltag gebaut haben, teilen wir deshalb.
        </p>
        <div className="sl-two">
          {APPS.map((c) => (
            <Link key={c.title} href={c.href} className="sl-card">
              <Image src={c.img} alt={c.alt} fill sizes="(max-width:900px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: c.pos ?? "center", filter: c.dim ? "brightness(0.55)" : undefined }} />
              <div className="sl-card-shade" />
              <div className="sl-card-body">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="sl-card-more">Details ansehen →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
