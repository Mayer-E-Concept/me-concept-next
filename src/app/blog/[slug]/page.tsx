import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactSection } from "@/components/contact-section";
import { SITE_URL } from "@/lib/site";

type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "callout"; text: string };

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  img: string;
  readMin: number;
  blocks: Block[];
}

const POSTS: Post[] = [
  {
    slug: "proiectare-instalatii-electrice",
    title: "Proiectare instalații electrice — Ce trebuie să știi?",
    date: "18 octombrie 2024",
    category: "Blog",
    excerpt:
      "De ce este important să alegi un proiectant certificat? Legislația în domeniul construcțiilor impune respectarea unor standarde stricte. Descoperă pașii esențiali și ce înseamnă un proiect electric bine realizat.",
    img: "/uploads/ME-CONCEPT-021.jpg",
    readMin: 6,
    blocks: [
      {
        t: "p",
        text: "Proiectarea instalațiilor electrice reprezintă fundația oricărei construcții moderne. Indiferent că vorbim de o casă, un bloc de apartamente sau o clădire comercială, un proiect electric bine realizat garantează siguranța ocupanților, eficiența energetică și conformitatea cu legislația în vigoare.",
      },
      { t: "h2", text: "Ce înseamnă proiectarea instalațiilor electrice?" },
      {
        t: "p",
        text: "Proiectarea instalațiilor electrice cuprinde întregul ansamblu de documente tehnice necesare pentru realizarea sistemului electric al unei clădiri: planuri de amplasare a corpurilor de iluminat, trasee de cabluri, scheme electrice, calcule de dimensionare, memorii tehnice și liste de materiale.",
      },
      {
        t: "p",
        text: "Un proiect electric complet include minimum: schema monofilară a tabloului de distribuție, planul de iluminat, planul de prize și circuite, planul branșamentului electric și, după caz, proiectul de instalații de protecție (paratrăsnet, împământare).",
      },
      { t: "h2", text: "Etapele unui proiect electric" },
      {
        t: "ul",
        items: [
          "Faza SF / PAC — studiu de fezabilitate și proiect pentru autorizarea construirii",
          "Faza PT — proiect tehnic de execuție, cu detalii complete",
          "Detalii de execuție (DE) — desene la scară pentru execuție",
          "Documentație pentru obținerea avizelor (E-Distribuție, DSP, ISU etc.)",
          "Asistență tehnică pe șantier",
        ],
      },
      { t: "h2", text: "Standarde și legislație aplicabilă" },
      {
        t: "p",
        text: "În România, proiectarea instalațiilor electrice trebuie să respecte normativele NTE 007/08/00 și I7/2011 (Normativul pentru proiectarea și executarea instalațiilor electrice cu tensiuni până la 1000 V c.a.). Suplimentar, standardele SR EN 60364 stabilesc cerințele europene armonizate.",
      },
      {
        t: "callout",
        text: "Proiectantul de instalații electrice trebuie să fie atestat ANRE și înscris în Registrul Urbaniștilor sau la Ordinul Arhitecților, în funcție de tipul proiectului.",
      },
      { t: "h2", text: "De ce este important un proiectant certificat?" },
      {
        t: "p",
        text: "Legislația impune că orice branșament sau instalație electrică nouă trebuie realizată pe baza unui proiect semnat de un inginer atestat. Un proiect realizat fără respectarea normelor poate duce la refuzul recepției lucrării, amenzi sau, în cazuri grave, accidente electrice.",
      },
      {
        t: "ul",
        items: [
          "Garantează conformitatea cu normativele în vigoare",
          "Previne supraîncărcările și pericolele de incendiu",
          "Asigură o distribuție eficientă a energiei electrice",
          "Facilitează obținerea autorizațiilor și avizelor",
          "Reduce costurile de întreținere pe termen lung",
        ],
      },
      { t: "h2", text: "Greșeli comune de evitat" },
      {
        t: "p",
        text: 'Una dintre cele mai frecvente greșeli este realizarea instalației fără proiect sau pe baza unor „schițe" informale. O altă problemă comună este subdimensionarea cablurilor și a siguranțelor, care poate genera avarii costisitoare sau incendii.',
      },
      {
        t: "p",
        text: "De asemenea, lipsa unui proiect de împământare și paratrăsnet la clădirile care necesită aceste sisteme reprezintă atât un risc de securitate, cât și o neconformitate legală.",
      },
      { t: "h2", text: "Concluzie" },
      {
        t: "p",
        text: "Investiția într-un proiect electric profesionist realizat de un inginer atestat nu este un cost suplimentar — este o garanție că instalația va funcționa în siguranță pentru zeci de ani. La Mayer E-Concept, realizăm proiecte complete pentru construcții rezidențiale și comerciale, cu respectarea tuturor normativelor în vigoare.",
      },
    ],
  },
  {
    slug: "avantajele-colaborarii-cu-un-proiectant-local",
    title: "Avantajele colaborării cu un proiectant local",
    date: "9 decembrie 2024",
    category: "Sfaturi",
    excerpt:
      "Dacă proiectul tău se desfășoară într-o zonă specifică, cum ar fi Sibiu, este util să colaborezi cu un specialist în proiectare instalații electrice. Un proiectant local cunoaște bine specificațiile regiunii, furnizorii locali de materiale și condițiile de execuție.",
    img: "/uploads/ME-CONCEPT-089.jpg",
    readMin: 5,
    blocks: [
      {
        t: "p",
        text: "Dacă proiectul tău se desfășoară într-o zonă specifică, cum ar fi Sibiu, este util să colaborezi cu un specialist în proiectare instalații electrice din aceeași regiune. Un proiectant local cunoaște bine specificațiile zonei, furnizorii locali de materiale și condițiile specifice de instalare, ceea ce poate reduce semnificativ costurile și timpul de execuție.",
      },
      {
        t: "h2",
        text: "Cunoașterea specificului local — un avantaj real",
      },
      {
        t: "p",
        text: "Fiecare regiune din România are particularitățile sale: operatorul de distribuție (în Sibiu este E-Distribuție Transilvania), normele locale de avizare, condițiile de teren și chiar practicile constructive locale. Un proiectant care activează în Sibiu știe deja cum să pregătească documentația pentru avizul E-Distribuție, ce termene sunt realiste și care sunt cerințele specifice ale inspectoratelor locale.",
      },
      { t: "h2", text: "Disponibilitate și comunicare" },
      {
        t: "p",
        text: "Colaborarea cu un proiectant local înseamnă posibilitatea de a programa întâlniri față în față, vizite pe șantier și consultații rapide. Comunicarea directă reduce riscul de neînțelegeri și permite ajustări rapide pe parcursul proiectului.",
      },
      {
        t: "callout",
        text: "Un proiectant local poate vizita șantierul și poate verifica condițiile reale, adaptând proiectul la specificul construcției — detaliu imposibil de gestionat de la distanță.",
      },
      { t: "h2", text: "Rețeaua locală de furnizori și executanți" },
      {
        t: "p",
        text: "Un proiectant cu experiență în zona Sibiu cunoaște distribuitorii locali de materiale electrice, know-how-ul constructorilor locali și poate recomanda electricieni verificați pentru execuție. Această rețea se traduce în economii de timp și costuri pentru beneficiar.",
      },
      {
        t: "ul",
        items: [
          "Acces rapid la furnizorii locali de materiale la prețuri competitive",
          "Recomandări de echipe de execuție verificate și cunoscute",
          "Cunoașterea timpilor reali de livrare și aprovizionare din zonă",
          "Relație directă cu operatorul de distribuție pentru avizare rapidă",
        ],
      },
      { t: "h2", text: "Asistență tehnică pe șantier" },
      {
        t: "p",
        text: "Asistența tehnică din partea proiectantului este obligatorie legal în fazele importante ale execuției. Un proiectant local poate fi prezent la faza de traseu, la verificarea montajului tabloului de distribuție și la recepția lucrărilor, fără costuri suplimentare de deplasare.",
      },
      { t: "h2", text: "Concluzie" },
      {
        t: "p",
        text: "Alegerea unui proiectant local pentru instalații electrice nu înseamnă un compromis față de calitate — dimpotrivă, poate adăuga valoare reală prin cunoașterea contextului local, disponibilitate și eficiență. Dacă proiectul tău se află în Sibiu sau în zona Transilvaniei, echipa Mayer E-Concept este la dispoziția ta pentru o consultanță gratuită.",
      },
    ],
  },
  {
    slug: "cum-sa-gasesti-un-proiectant-de-instalatii-electrice-potrivit",
    title: "Cum să găsești un proiectant de instalații electrice potrivit?",
    date: "9 decembrie 2024",
    category: "Ghid",
    excerpt:
      "Alegerea unui proiectant certificat este esențială. În România, legislația impune respectarea unor standarde stricte pentru instalațiile electrice. Un proiectant de calitate garantează conformitatea, siguranța și eficiența energetică a proiectului tău.",
    img: "/uploads/ME-CONCEPT-083-1.jpg",
    readMin: 7,
    blocks: [
      {
        t: "p",
        text: "Alegerea proiectantului de instalații electrice este una dintre deciziile cheie în orice proiect de construcție sau renovare. Un proiectant calificat nu doar că desenează scheme — el garantează siguranța instalației, conformitatea cu normele în vigoare și eficiența energetică a clădirii tale.",
      },
      { t: "h2", text: "1. Verifică atestările și certificările" },
      {
        t: "p",
        text: "În România, proiectantul de instalații electrice trebuie să fie atestat de ANRE (Autoritatea Națională de Reglementare în domeniul Energiei) pentru proiectare. Verifică dacă proiectantul este înscris în registrul public ANRE și dacă atestatul este valabil.",
      },
      {
        t: "ul",
        items: [
          "Atestat ANRE tip Dp (proiectare instalații electrice)",
          "Înscrierea în registrul public pe site-ul ANRE",
          "Certificare ISO 9001 — semnalează procese de calitate verificate",
          "Membru al asociațiilor profesionale (AAIR, AGIR etc.)",
        ],
      },
      { t: "h2", text: "2. Analizează experiența și portofoliul" },
      {
        t: "p",
        text: "Experiența în tipul de proiect dorit contează enorm. Un proiectant specializat în construcții rezidențiale poate să nu aibă expertiza necesară pentru o clădire industrială sau un spațiu comercial cu cerințe speciale. Cere exemple de proiecte similare și referințe de la beneficiari anteriori.",
      },
      {
        t: "callout",
        text: "Întreabă proiectantul câte proiecte similare cu al tău a realizat în ultimii 3 ani. Experiența recentă în tipul de construcție dorit este mai valoroasă decât experiența generală de decenii.",
      },
      { t: "h2", text: "3. Evaluează capacitatea de comunicare" },
      {
        t: "p",
        text: "Un proiectant bun trebuie să fie capabil să explice soluțiile tehnice în termeni accesibili, să răspundă prompt la întrebări și să fie transparent în privința costurilor și termenelor. Prima întâlnire sau consultanță gratuită îți oferă o imagine clară asupra stilului de colaborare.",
      },
      { t: "h2", text: "4. Înțelege ce include oferta" },
      {
        t: "p",
        text: "Înainte de a semna contractul, asigură-te că știi exact ce livrează proiectantul: câte planuri, ce faze (PAC, PT, DE), dacă include memoriu tehnic, liste de cantități și asistență tehnică pe șantier. Ofertele aparent mai ieftine pot ascunde costuri suplimentare pentru fiecare modificare.",
      },
      {
        t: "ul",
        items: [
          "Plan de iluminat și prize (toate etajele)",
          "Schema electrică a tabloului de distribuție",
          "Plan branșament electric",
          "Proiect împământare și paratrăsnet (dacă e necesar)",
          "Memoriu tehnic și liste de materiale",
          "Asistență tehnică pe faze de execuție",
        ],
      },
      { t: "h2", text: "5. Raportul calitate-preț" },
      {
        t: "p",
        text: "Costul unui proiect electric variază în funcție de suprafața construcției, complexitatea instalației și zona geografică. Un proiect prea ieftin poate semnala lipsă de experiență sau utilizarea unor șabloane neadaptate la specificul construcției tale.",
      },
      { t: "h2", text: "Ce să eviți" },
      {
        t: "ul",
        items: [
          "Proiectanți fără atestat ANRE valid",
          "Lipsa unui contract scris cu livrabile clare",
          "Proiectanți care refuză vizita pe șantier",
          "Oferte fără detalierea fazelor și livrabilelor",
          "Proiectanți care promit termene irealist de scurte",
        ],
      },
      { t: "h2", text: "Concluzie" },
      {
        t: "p",
        text: "Găsirea proiectantului potrivit necesită timp, dar investiția merită. Un proiect electric bine realizat înseamnă economii pe termen lung, siguranță pentru locuitorii clădirii și zero probleme la recepție sau la inspecțiile autorităților. Mayer E-Concept oferă consultanță gratuită pentru a înțelege nevoile proiectului tău înainte de a propune o soluție.",
      },
    ],
  },
];

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const baseUrl = SITE_URL;
  return {
    title: `${post.title} — Mayer E-Concept`,
    description: post.excerpt,
    alternates: { canonical: `${baseUrl}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [{ url: `${baseUrl}${post.img}`, width: 1200, height: 630, alt: post.title }],
      type: "article",
      locale: "ro_RO",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section
          style={{
            position: "relative",
            background: "#051E27",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: 'url("/assets/circuit-pattern.svg")',
              backgroundSize: "240px 240px",
              opacity: 0.07,
              filter: "invert(1)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: "1240px",
              margin: "0 auto",
              padding: "0 clamp(20px, 5vw, 60px)",
              paddingTop: "clamp(130px, 16vh, 200px)",
              paddingBottom: "clamp(56px, 7vw, 88px)",
            }}
          >
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              <Link
                href="/"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                }}
              >
                Acasă
              </Link>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>›</span>
              <Link
                href="/blog"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                }}
              >
                Blog
              </Link>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>›</span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#C5895B",
                }}
              >
                {post.category}
              </span>
            </div>

            {/* Meta row */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#C5895B",
                  background: "rgba(197,137,91,0.15)",
                  borderRadius: 4,
                  padding: "4px 10px",
                }}
              >
                {post.category}
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                {post.date}
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
                · {post.readMin} min citire
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(28px, 4vw, 56px)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                color: "#F4F2EC",
                maxWidth: "22ch",
                marginBottom: 0,
              }}
            >
              {post.title}
            </h1>
          </div>
        </section>

        {/* Featured image */}
        <div style={{ background: "#0A2E3A", lineHeight: 0 }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
            <div
              style={{
                borderRadius: "0 0 12px 12px",
                overflow: "hidden",
                aspectRatio: "21/8",
                maxHeight: 420,
              }}
            >
              <Image
                src={post.img}
                alt={post.title}
                width={1240}
                height={420}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* Article body */}
        <section style={{ background: "#F6F7F7", paddingTop: "clamp(56px, 7vw, 96px)", paddingBottom: "clamp(72px, 9vw, 120px)" }}>
          <div
            style={{
              maxWidth: "1240px",
              margin: "0 auto",
              padding: "0 clamp(20px, 5vw, 60px)",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) 320px",
              gap: "clamp(40px, 6vw, 80px)",
              alignItems: "start",
            }}
            className="article-layout"
          >
            <style>{`
              @media (max-width: 900px) {
                .article-layout { grid-template-columns: 1fr !important; }
              }
            `}</style>

            {/* Main article */}
            <article>
              {post.blocks.map((block, i) => {
                if (block.t === "p") {
                  return (
                    <p
                      key={i}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(15px, 1.1vw, 17px)",
                        lineHeight: 1.75,
                        color: "#2C4349",
                        marginBottom: 24,
                      }}
                    >
                      {block.text}
                    </p>
                  );
                }
                if (block.t === "h2") {
                  return (
                    <h2
                      key={i}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "clamp(20px, 1.8vw, 26px)",
                        fontWeight: 700,
                        letterSpacing: "-0.015em",
                        color: "#0E323D",
                        marginTop: 48,
                        marginBottom: 16,
                      }}
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.t === "h3") {
                  return (
                    <h3
                      key={i}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "clamp(17px, 1.4vw, 20px)",
                        fontWeight: 700,
                        color: "#0E323D",
                        marginTop: 32,
                        marginBottom: 12,
                      }}
                    >
                      {block.text}
                    </h3>
                  );
                }
                if (block.t === "ul") {
                  return (
                    <ul
                      key={i}
                      style={{
                        paddingLeft: 0,
                        listStyle: "none",
                        marginBottom: 24,
                      }}
                    >
                      {block.items.map((item, j) => (
                        <li
                          key={j}
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "clamp(14px, 1.05vw, 16px)",
                            lineHeight: 1.65,
                            color: "#2C4349",
                            paddingLeft: 24,
                            marginBottom: 10,
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: 0,
                              top: "0.55em",
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "#C5895B",
                              display: "inline-block",
                            }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.t === "callout") {
                  return (
                    <div
                      key={i}
                      style={{
                        background: "rgba(26,111,122,0.07)",
                        borderLeft: "3px solid #1A6F7A",
                        borderRadius: "0 8px 8px 0",
                        padding: "16px 20px",
                        marginBottom: 24,
                        marginTop: 8,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "clamp(14px, 1.05vw, 16px)",
                          lineHeight: 1.65,
                          color: "#1A6F7A",
                          fontStyle: "italic",
                          margin: 0,
                        }}
                      >
                        {block.text}
                      </p>
                    </div>
                  );
                }
                return null;
              })}

              {/* Author */}
              <div
                style={{
                  marginTop: 56,
                  paddingTop: 32,
                  borderTop: "1px solid #D8DCDE",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "#1A6F7A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 700, color: "#fff" }}>
                    M
                  </span>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, color: "#0E323D", margin: 0 }}>
                    Mayer E-Concept
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#6B8086", margin: "2px 0 0" }}>
                    Proiectare instalații electrice · Sibiu & Germania
                  </p>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside>
              {/* Back to blog */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #D8DCDE",
                  borderRadius: 12,
                  padding: "24px 24px 20px",
                  marginBottom: 24,
                }}
              >
                <Link
                  href="/blog"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#1A6F7A",
                    textDecoration: "none",
                    marginBottom: 20,
                  }}
                >
                  <span style={{ fontSize: 14 }}>←</span>
                  Înapoi la Blog
                </Link>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "#6B8086",
                    margin: 0,
                  }}
                >
                  Publicat pe {post.date} · {post.readMin} min citire
                </p>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #D8DCDE",
                    borderRadius: 12,
                    padding: "24px",
                    marginBottom: 24,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#6B8086",
                      marginBottom: 16,
                    }}
                  >
                    Articole similare
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/blog/${r.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "72px 1fr",
                            gap: 12,
                            alignItems: "start",
                          }}
                        >
                          <div style={{ borderRadius: 6, overflow: "hidden", aspectRatio: "1", flexShrink: 0 }}>
                            <Image
                              src={r.img}
                              alt={r.title}
                              width={72}
                              height={72}
                              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                            />
                          </div>
                          <div>
                            <p
                              style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: 13,
                                fontWeight: 700,
                                color: "#0E323D",
                                lineHeight: 1.35,
                                margin: "0 0 4px",
                              }}
                            >
                              {r.title}
                            </p>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#8A9498", margin: 0 }}>
                              {r.date}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA card */}
              <div
                style={{
                  background: "#0E323D",
                  borderRadius: 12,
                  padding: "28px 24px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#F4F2EC",
                    lineHeight: 1.4,
                    marginBottom: 10,
                  }}
                >
                  Ai nevoie de un proiect electric?
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "rgba(244,242,236,0.60)",
                    marginBottom: 20,
                  }}
                >
                  Contactează-ne pentru o consultanță gratuită. Proiectăm instalații electrice pentru construcții rezidențiale și comerciale.
                </p>
                <Link
                  href="/#contact"
                  style={{
                    display: "inline-block",
                    background: "#C5895B",
                    color: "#fff",
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    padding: "12px 20px",
                    borderRadius: 6,
                  }}
                >
                  Contactează-ne
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
