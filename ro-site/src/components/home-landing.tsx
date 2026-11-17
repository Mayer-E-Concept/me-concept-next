import Image from "next/image";
import Link from "next/link";
import { BUSINESS } from "@/lib/business";
import { SL_CSS } from "@/components/service-landing";

/* Partea de sus a paginii principale, în același stil ca paginile de execuție
   (service-landing.tsx): fotografie de șantier, cifre, carduri cu imagini.
   Fiecare card duce la o pagină separată — pagina principală este doar o previzualizare. */

const STATS = [
  { value: "100+", label: "proiecte finalizate" },
  { value: "20+", label: "ani de experiență pe șantiere" },
  { value: "A + B", label: "Atestate ANRE: proiectare și execuție" },
  { value: "ISO", label: "9001:2015 – firmă certificată" },
];

const CHIPS = ["Atestat ANRE A + B", "ISO 9001:2015", "Elektromeister și ingineri", "BIM · Revit"];

const CARDS = [
  {
    title: "Execuție instalații electrice",
    text: "Case, apartamente, spații comerciale și hale. Instalații noi sau renovate, tablouri electrice și iluminat, cu atestat ANRE.",
    img: "/uploads/Iluminat-Arhitctural.jpg",
    alt: "Casă cu iluminat exterior executat de Mayer E-Concept",
    href: "/instalatii-electrice-sibiu",
  },
  {
    title: "Proiectare",
    text: "Proiect electric complet în BIM cu Revit, de la branșament la smart home.",
    img: "/uploads/Plan-Exemplu-2.png",
    alt: "Detaliu dintr-un plan de instalații electrice",
    href: "/proiectare-instalatii-electrice",
  },
  {
    title: "Fotovoltaice și wallbox",
    text: "Sisteme fotovoltaice și stații de încărcare, legate corect în tablou.",
    img: "/uploads/Casa3-3D.jpg",
    alt: "Casă cu panouri fotovoltaice pe acoperiș",
    href: "/panouri-fotovoltaice-sibiu",
    dim: true,
  },
  {
    title: "Portofoliu",
    text: "Peste 100 de proiecte: rezidențial, comerț, birouri, industrie.",
    img: "/uploads/referinte/render-3.jpg",
    alt: "Randare a unui proiect rezidențial din portofoliu",
    href: "/portofoliu",
    pos: "center bottom",
  },
  {
    title: "ElecTriX",
    text: "Suita noastră de instrumente Revit pentru echipe de instalații electrice.",
    img: "/uploads/Revit.png",
    alt: "Model de instalații electrice în Revit",
    href: "/electrix",
    pos: "left center",
    dim: true,
  },
  {
    title: "ElectroGrad",
    text: "Aplicația noastră pentru examenul de autorizare a electricienilor ANRE.",
    img: "/uploads/electrograd/feature.png",
    alt: "ElectroGrad, aplicație pentru examenul de autorizare electrician ANRE",
    href: "/electrograd",
    pos: "left center",
    dim: true,
  },
];

export function HomeLanding() {
  const tel = `tel:${BUSINESS.phoneE164}`;
  return (
    <div style={{ color: "#F2FBFC" }}>
      <style>{SL_CSS}</style>

      <section className="sl-hero">
        <Image
          src="/uploads/ME-CONCEPT-162.jpg"
          alt="Echipa Mayer E-Concept pe șantier, cu planurile instalației electrice"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "70% center" }}
        />
        <div className="sl-hero-shade" />
        <div className="sl-wrap" style={{ width: "100%", paddingTop: 140, paddingBottom: "clamp(48px,7vw,96px)" }}>
          <p className="sl-eyebrow">Proiectare · Execuție · Sibiu</p>
          <h1 className="sl-h1">
            Instalații electrice <em>proiectate și executate</em> în Sibiu.
          </h1>
          <p className="sl-lead">
            De la o priză nouă până la instalația completă a unei case, a unui magazin sau a unei hale. Cu atestat ANRE, ingineri proiectanți și standardul german al unui Elektromeister cu peste 20 de ani de experiență.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a href={tel} className="sl-btn sl-btn-main">
              Sună acum · {BUSINESS.phoneDisplay}
            </a>
            <Link href="/#contact" className="sl-btn sl-btn-ghost">
              Cere o ofertă →
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

        <section id="servicii" className="sl-sec" style={{ scrollMarginTop: 72 }}>
          <p className="sl-eyebrow">Ce facem</p>
          <h2 className="sl-h2">Proiectare, execuție și instrumente proprii</h2>
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
                  <span className="sl-card-more">Află mai mult →</span>
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
                alt="Martin Mayer, maistru electrician, fondatorul Mayer E-Concept"
                fill
                sizes="(max-width:900px) 360px, 420px"
                style={{ objectFit: "cover", objectPosition: "center 25%" }}
              />
            </div>
            <div>
              <blockquote>Lucru curat, planificare temeinică, procese clare. Asta nu ține de țară, ci de atitudine.</blockquote>
              <figcaption>
                <b>Martin Mayer</b> · Elektromeister, fondator Mayer E-Concept
              </figcaption>
            </div>
          </figure>
        </section>
      </div>
    </div>
  );
}
