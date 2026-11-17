import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionDivider } from "@/components/section-divider";

/* Pagina de prezentare a aplicației ElectroGrad. Server component:
   tot textul este în HTML pentru motoarele de căutare. Textele urmează
   descrierea din magazinul de aplicații. */

const wrap: React.CSSProperties = { position: "relative", zIndex: 1, maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" };
const sec: React.CSSProperties = { position: "relative", paddingTop: "clamp(72px, 9vw, 120px)", paddingBottom: "clamp(72px, 9vw, 120px)" };
const eyebrow: React.CSSProperties = {
  fontFamily: "var(--font-plex-mono)",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#8FE0E8",
  marginBottom: 14,
  paddingBottom: 14,
  borderBottom: "1px solid rgba(143,224,232,0.12)",
  display: "inline-block",
};
const h2: React.CSSProperties = {
  fontFamily: "var(--font-barlow)",
  fontSize: "clamp(28px, 3.2vw, 42px)",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: 1.12,
  color: "#F2FBFC",
  maxWidth: "28ch",
  marginBottom: "clamp(32px, 4vw, 48px)",
};
const body: React.CSSProperties = { fontFamily: "var(--font-barlow)", fontSize: 15, lineHeight: 1.7, color: "#A9C9CC", margin: 0 };
const card: React.CSSProperties = { background: "#0B373D", borderRadius: 12, border: "1px solid rgba(143,224,232,0.08)", padding: "24px 24px 26px" };
const monoLink: React.CSSProperties = {
  fontFamily: "var(--font-plex-mono)",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#8FE0E8",
  textDecoration: "none",
  border: "1.5px solid rgba(143,224,232,0.4)",
  borderRadius: 4,
  padding: "13px 18px",
  display: "inline-block",
};

const FEATURES = [
  { title: "Aproape 1.600 de întrebări", desc: "Întrebările de exemplu publicate de ANRE pe anre.ro, împărțite pe grade și capitole: electrotehnică, legislație și norme tehnice." },
  { title: "Simulare de examen", desc: "În condiții reale: 25 de întrebări, 60 de minute, promovare de la 18 răspunsuri corecte." },
  { title: "Răspuns și explicație", desc: "La fiecare întrebare primești răspunsul, explicația și trimiterea la lege sau normativ." },
  { title: "Repetarea greșelilor", desc: "Întrebările la care ai greșit revin până le știi." },
  { title: "Progres și istoric", desc: "Vezi progresul pe fiecare capitol și istoricul simulărilor." },
  { title: "Ghid gratuit", desc: "Ce grad poți da, normativele, formularele, calendarul sesiunii și linkuri directe către paginile oficiale ANRE." },
];

const SHOTS = [
  { src: "/uploads/electrograd/1-start.jpg", alt: "ElectroGrad: ecranul principal cu gradul și progresul" },
  { src: "/uploads/electrograd/2-simulare.jpg", alt: "ElectroGrad: simulare de examen" },
  { src: "/uploads/electrograd/3-exersare.jpg", alt: "ElectroGrad: exersare pe capitole" },
  { src: "/uploads/electrograd/4-progres.jpg", alt: "ElectroGrad: progres pe capitole" },
  { src: "/uploads/electrograd/5-ghid.jpg", alt: "ElectroGrad: ghidul ANRE" },
];

const SOURCES = [
  { label: "ANRE: autorizarea electricienilor (întrebări, formulare, anunțuri)", href: "https://anre.ro/participanti-la-piata-de-energie/persoane-fizice/energie-electrica/" },
  { label: "Tematica și bibliografia examenului", href: "https://anre.ro/wp-content/uploads/2023/05/Tematica-si-bibliografie-pentru-examenul-de-autorizare-electricieni-2023-.pdf" },
  { label: "Regulamentul examenului (Ordinul ANRE nr. 66/2023)", href: "https://anre.ro/wp-content/uploads/2023/05/Ord-66-2023.pdf" },
  { label: "Înscriere și programare la examen", href: "https://spv.anre.ro/examene-electricieni/" },
  { label: "Legi și hotărâri (de ex. Legea 123/2012)", href: "https://legislatie.just.ro" },
];

export function ElectroGradPage() {
  return (
    <>
      <SiteHeader />
      <style>{`
        @media (max-width: 900px) {
          .eg-hero-grid, .eg-plan-grid { grid-template-columns: 1fr !important; }
          .eg-feature-grid { grid-template-columns: 1fr 1fr !important; }
          .eg-shots { grid-template-columns: repeat(5, 62vw) !important; overflow-x: auto; }
        }
        @media (max-width: 560px) { .eg-feature-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <main>
        <section style={{ position: "relative", background: "radial-gradient(120% 140% at 72% -10%, #12525B 0%, #0B373D 55%, #072327 100%)", overflow: "hidden" }}>
          <div
            className="eg-hero-grid"
            style={{ ...wrap, display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)", gap: "clamp(32px, 5vw, 72px)", alignItems: "center", paddingTop: "clamp(140px, 18vh, 210px)", paddingBottom: "clamp(64px, 8vw, 110px)" }}
          >
            <div>
              <div style={{ ...eyebrow, borderBottom: "none", paddingBottom: 0 }}>Aplicație mobilă · Android și iOS</div>
              <h1 style={{ fontFamily: "var(--font-barlow)", fontSize: "clamp(32px, 4vw, 54px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.08, color: "#F2FBFC", maxWidth: "20ch", marginBottom: 22 }}>
                ElectroGrad: pregătire pentru examenul de autorizare ANRE
              </h1>
              <p style={{ ...body, fontSize: "clamp(15px, 1.2vw, 18px)", maxWidth: "58ch", marginBottom: 18 }}>
                ElectroGrad te ajută să te pregătești pentru examenul de autorizare a electricienilor organizat de ANRE, pentru gradele I, IIA, IIB, IIIA, IIIB, IVA și IVB.
              </p>
              <p style={{ ...body, maxWidth: "58ch", marginBottom: 28 }}>
                Am construit aplicația din propria experiență. Pe lângă proiectare și execuție, vrem să-i ajutăm și pe alții să se dezvolte în meserie.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <a href="#functii" style={{ ...monoLink, background: "#8FE0E8", color: "#072327", borderColor: "#8FE0E8" }}>Ce găsești în aplicație</a>
                <Link href="/electrograd/suport" style={monoLink}>Ajutor și contact</Link>
              </div>
            </div>
            <Image
              src="/uploads/electrograd/feature.png"
              alt="ElectroGrad, examen autorizare electrician ANRE, gradele I până la IV"
              width={1024}
              height={500}
              priority
              style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid rgba(143,224,232,0.18)", display: "block" }}
            />
          </div>
        </section>

        <section id="functii" style={{ ...sec, scrollMarginTop: 72 }}>
          <SectionDivider />
          <div style={wrap}>
            <div style={eyebrow}>Funcții</div>
            <h2 style={h2}>Ce găsești în aplicație</h2>
            <div className="eg-feature-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 24 }}>
              {FEATURES.map((f, i) => (
                <div key={f.title} style={card}>
                  <div style={{ fontFamily: "var(--font-oxanium)", fontSize: 22, fontWeight: 700, color: "#8FE0E8", marginBottom: 12 }}>{String(i + 1).padStart(2, "0")}</div>
                  <h3 style={{ fontFamily: "var(--font-barlow)", fontSize: 17, fontWeight: 700, color: "#F2FBFC", marginBottom: 10, lineHeight: 1.3 }}>{f.title}</h3>
                  <p style={{ ...body, fontSize: 14, lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ ...sec, background: "#051E27" }}>
          <SectionDivider />
          <div style={wrap}>
            <div style={eyebrow}>Capturi de ecran</div>
            <h2 style={h2}>Așa arată ElectroGrad</h2>
            <div className="eg-shots" style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 16 }}>
              {SHOTS.map((s) => (
                <Image key={s.src} src={s.src} alt={s.alt} width={720} height={1440} style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid rgba(143,224,232,0.18)", display: "block" }} />
              ))}
            </div>
          </div>
        </section>

        <section style={sec}>
          <SectionDivider />
          <div style={wrap}>
            <div style={eyebrow}>Gratuit și versiunea completă</div>
            <h2 style={h2}>Începi gratuit, continui dacă îți folosește</h2>
            <div className="eg-plan-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 24 }}>
              <div style={card}>
                <h3 style={{ fontFamily: "var(--font-barlow)", fontSize: 19, fontWeight: 700, color: "#F2FBFC", marginBottom: 10 }}>Gratuit</h3>
                <p style={body}>Primele 50 de întrebări din fiecare grad, o simulare de examen și tot ghidul.</p>
              </div>
              <div style={{ ...card, borderColor: "rgba(143,224,232,0.35)" }}>
                <h3 style={{ fontFamily: "var(--font-barlow)", fontSize: 19, fontWeight: 700, color: "#F2FBFC", marginBottom: 10 }}>Versiunea completă</h3>
                <p style={body}>Toate întrebările și simulări nelimitate, cu abonament de 3 sau de 12 luni. Se reînnoiește automat până îl anulezi.</p>
              </div>
            </div>
            <p style={{ ...body, fontSize: 14, maxWidth: "80ch", marginTop: 28 }}>
              Important: ANRE publică doar întrebările, nu și răspunsurile. Răspunsurile din aplicație sunt elaborate de noi și verificate cu normativele și legile în vigoare; puținele încă neconfirmate sunt marcate. Dacă găsești o greșeală, scrie-ne și o corectăm rapid.
            </p>
          </div>
        </section>

        <section style={{ ...sec, background: "#051E27" }}>
          <SectionDivider />
          <div style={wrap}>
            <div style={eyebrow}>Aplicație independentă</div>
            <h2 style={h2}>Surse oficiale</h2>
            <p style={{ ...body, maxWidth: "80ch", marginBottom: 28 }}>
              ElectroGrad este realizată de Mayer E-Concept S.R.L. și nu reprezintă ANRE sau altă instituție a statului; nu este afiliată cu acestea și nu oferă servicii ale statului. Informațiile oficiale sunt doar pe site-urile ANRE:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "grid", gap: 12 }}>
              {SOURCES.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-barlow)", fontSize: 15, color: "#8FE0E8", textDecoration: "underline", textUnderlineOffset: 4 }}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link href="/electrograd/confidentialitate" style={monoLink}>Confidențialitate</Link>
              <Link href="/electrograd/termeni" style={monoLink}>Termeni</Link>
              <Link href="/electrograd/suport" style={monoLink}>Ajutor și contact</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
