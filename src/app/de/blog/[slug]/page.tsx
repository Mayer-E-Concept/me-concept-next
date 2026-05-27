import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeaderDe } from "@/components/de/site-header";
import { SiteFooterDe } from "@/components/de/site-footer";
import { ContactSectionDe } from "@/components/de/contact-section";

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
    slug: "elektroplanung-was-sie-wissen-muessen",
    title: "Elektroplanung – Was Sie wissen müssen",
    date: "18. Oktober 2024",
    category: "Blog",
    excerpt:
      "Warum ist ein zertifizierter Elektroingenieur so wichtig? Die Baugesetzgebung schreibt strenge Normen vor. Erfahren Sie die wesentlichen Schritte und was ein professionelles Elektroprojekt auszeichnet.",
    img: "/uploads/ME-CONCEPT-021.jpg",
    readMin: 6,
    blocks: [
      {
        t: "p",
        text: "Die Elektroplanung bildet das Fundament jedes modernen Bauwerks. Ob Einfamilienhaus, Mehrfamilienhaus oder Gewerbegebäude – ein professionell erstelltes Elektroprojekt garantiert die Sicherheit der Nutzer, Energieeffizienz und die Einhaltung der gesetzlichen Vorschriften.",
      },
      { t: "h2", text: "Was umfasst die Elektroplanung?" },
      {
        t: "p",
        text: "Die Elektroplanung umfasst alle technischen Unterlagen, die für die Realisierung des elektrischen Systems eines Gebäudes erforderlich sind: Leuchten- und Steckdosenpläne, Kabeltrassen, Einlinienschemas, Dimensionierungsberechnungen, technische Erläuterungen und Materiallisten.",
      },
      {
        t: "p",
        text: "Ein vollständiges Elektroprojekt beinhaltet mindestens: das Einlinienschema des Verteilers, den Beleuchtungsplan, den Steckdosen- und Stromkreisplan, den Hausanschlussplan sowie je nach Bedarf das Blitzschutz- und Erdungsprojekt.",
      },
      { t: "h2", text: "Leistungsphasen nach HOAI" },
      {
        t: "ul",
        items: [
          "LP 1 – Grundlagenermittlung: Anforderungen und Bedarfsplanung",
          "LP 2 – Vorplanung: erste Konzepte und Machbarkeitsnachweis",
          "LP 3 – Entwurfsplanung: detaillierte technische Lösung",
          "LP 4 – Genehmigungsplanung: Unterlagen für Behörden und Netzbetreiber",
          "LP 5 – Ausführungsplanung: maßstabsgerechte Ausführungspläne",
          "LP 6–9 – Vorbereitung und Mitwirkung bei der Vergabe, Bauleitung, Projektsteuerung",
        ],
      },
      { t: "h2", text: "Geltende Normen und Vorschriften" },
      {
        t: "p",
        text: "In Deutschland muss die Elektroplanung die Normen der DIN VDE-Reihe (insbesondere DIN VDE 0100) sowie die Technischen Anschlussbedingungen (TAB) des jeweiligen Netzbetreibers einhalten. Ergänzend gelten die europäisch harmonisierten Normen der EN 60364-Reihe.",
      },
      {
        t: "callout",
        text: "Elektroplanungen müssen von einem eingetragenen Ingenieur oder einem zugelassenen Ingenieurbüro erstellt und unterzeichnet werden. Die Eintragung in die jeweilige Ingenieurkammer ist Voraussetzung für die Planvorlageberechtigung.",
      },
      { t: "h2", text: "Warum ist ein zertifizierter Planer so wichtig?" },
      {
        t: "p",
        text: "Die Gesetzgebung schreibt vor, dass jeder neue Hausanschluss oder jede neue Elektroinstallation auf Basis eines von einem zugelassenen Ingenieur unterzeichneten Plans realisiert werden muss. Ein Plan ohne Normenkonformität kann zur Ablehnung der Bauabnahme, zu Bußgeldern oder im schlimmsten Fall zu Elektrounfällen führen.",
      },
      {
        t: "ul",
        items: [
          "Gewährleistet die Konformität mit den geltenden Normen",
          "Verhindert Überlastungen und Brandgefahren",
          "Sichert eine effiziente Stromverteilung",
          "Erleichtert die Erlangung von Genehmigungen und Anschlusszusagen",
          "Reduziert die Wartungskosten langfristig",
        ],
      },
      { t: "h2", text: "Häufige Fehler, die vermieden werden sollten" },
      {
        t: "p",
        text: "Einer der häufigsten Fehler ist die Ausführung der Anlage ohne formellen Plan oder auf Basis informeller Skizzen. Ein weiteres verbreitetes Problem ist die Unterdimensionierung von Kabeln und Sicherungen, die zu kostspieligen Störungen oder Bränden führen kann.",
      },
      { t: "h2", text: "Fazit" },
      {
        t: "p",
        text: "Die Investition in ein professionelles Elektroprojekt, erstellt von einem zugelassenen Ingenieur, ist kein zusätzlicher Kostenfaktor – sie ist eine Garantie dafür, dass die Anlage jahrzehntelang sicher funktioniert. Bei Mayer E-Concept erstellen wir vollständige Projekte für Wohn- und Gewerbebauten unter Einhaltung aller geltenden Vorschriften.",
      },
    ],
  },
  {
    slug: "vorteile-lokaler-elektroingenieur",
    title: "Vorteile der Zusammenarbeit mit einem lokalen Elektroingenieur",
    date: "9. Dezember 2024",
    category: "Ratgeber",
    excerpt:
      "Ein lokaler Elektroingenieur kennt die regionalen Besonderheiten, lokale Lieferanten und die spezifischen Ausführungsbedingungen. Das spart Zeit, Kosten und verhindert Missverständnisse.",
    img: "/uploads/ME-CONCEPT-089.jpg",
    readMin: 5,
    blocks: [
      {
        t: "p",
        text: "Wenn Ihr Projekt in einer bestimmten Region realisiert wird, lohnt es sich, mit einem lokalen Spezialisten für Elektroplanung zusammenzuarbeiten. Ein lokaler Planer kennt die regionalen Besonderheiten, die lokalen Lieferanten und die spezifischen Ausführungsbedingungen – was Zeit und Kosten erheblich reduzieren kann.",
      },
      { t: "h2", text: "Kenntnis der lokalen Gegebenheiten – ein echter Vorteil" },
      {
        t: "p",
        text: "Jede Region in Deutschland hat ihre Eigenheiten: den zuständigen Netzbetreiber, die lokalen Genehmigungsanforderungen, die Bodenverhältnisse und sogar die regionalen Bautraditionen. Ein Planer, der vor Ort tätig ist, weiß, wie die Unterlagen für den Netzanschluss aufzubereiten sind, welche Fristen realistisch sind und welche spezifischen Anforderungen die lokalen Behörden stellen.",
      },
      { t: "h2", text: "Verfügbarkeit und Kommunikation" },
      {
        t: "p",
        text: "Die Zusammenarbeit mit einem lokalen Planer ermöglicht persönliche Treffen, Baustellenbegehungen und schnelle Rücksprachen. Die direkte Kommunikation reduziert das Risiko von Missverständnissen und ermöglicht rasche Anpassungen im Projektverlauf.",
      },
      {
        t: "callout",
        text: "Ein lokaler Planer kann die Baustelle besuchen und die realen Bedingungen prüfen – und das Projekt entsprechend anpassen. Das ist aus der Ferne nicht möglich.",
      },
      { t: "h2", text: "Netzwerk lokaler Lieferanten und Ausführender" },
      {
        t: "p",
        text: "Ein erfahrener Planer kennt die lokalen Elektromaterialhändler, das Know-how der regionalen Handwerker und kann bewährte Elektriker für die Ausführung empfehlen. Dieses Netzwerk schlägt sich für den Auftraggeber direkt in Zeit- und Kostenersparnis nieder.",
      },
      {
        t: "ul",
        items: [
          "Schneller Zugang zu lokalen Lieferanten mit wettbewerbsfähigen Preisen",
          "Empfehlungen geprüfter und bekannter Ausführungsteams",
          "Kenntnis realer Liefer- und Beschaffungszeiten in der Region",
          "Direkte Beziehung zum Netzbetreiber für eine schnelle Anschlusszusage",
        ],
      },
      { t: "h2", text: "Technische Baubegleitung vor Ort" },
      {
        t: "p",
        text: "Die technische Begleitung durch den Planer ist in wichtigen Ausführungsphasen gesetzlich vorgeschrieben. Ein lokaler Planer kann bei der Trassenlegung, der Überprüfung der Verteilermontage und der Abnahme anwesend sein – ohne zusätzliche Reisekosten.",
      },
      { t: "h2", text: "Fazit" },
      {
        t: "p",
        text: "Die Wahl eines lokalen Elektroplaners bedeutet keinen Qualitätskompromiss – im Gegenteil, sie kann durch Kenntnis des lokalen Kontexts, Verfügbarkeit und Effizienz echten Mehrwert bringen. Das Team von Mayer E-Concept steht Ihnen für eine kostenlose Erstberatung zur Verfügung.",
      },
    ],
  },
  {
    slug: "richtigen-elektroingenieur-finden",
    title: "Wie finden Sie den richtigen Elektroingenieur?",
    date: "9. Dezember 2024",
    category: "Leitfaden",
    excerpt:
      "Die Wahl eines zertifizierten Ingenieurs ist entscheidend. In Deutschland schreiben HOAI und DIN VDE strenge Standards vor. Ein qualifizierter Planer garantiert Normkonformität, Sicherheit und Energieeffizienz.",
    img: "/uploads/ME-CONCEPT-083-1.jpg",
    readMin: 7,
    blocks: [
      {
        t: "p",
        text: "Die Wahl des richtigen Elektroingenieurs ist eine der wichtigsten Entscheidungen in jedem Bau- oder Sanierungsprojekt. Ein qualifizierter Planer zeichnet nicht nur Schaltpläne – er garantiert die Sicherheit der Anlage, die Einhaltung der geltenden Normen und die Energieeffizienz Ihres Gebäudes.",
      },
      { t: "h2", text: "1. Überprüfen Sie Zulassungen und Zertifizierungen" },
      {
        t: "p",
        text: "In Deutschland muss der Elektroingenieur in der zuständigen Ingenieurkammer eingetragen sein und die Planvorlageberechtigung besitzen. Prüfen Sie, ob der Planer im öffentlichen Ingenieurregister verzeichnet ist und ob seine Zulassung aktuell ist.",
      },
      {
        t: "ul",
        items: [
          "Eintragung in der Ingenieurkammer mit Planvorlageberechtigung",
          "Nachgewiesene Fachkunde in der Elektrotechnik (z. B. VDE-Mitgliedschaft)",
          "ISO 9001-Zertifizierung – ein Zeichen für geprüfte Qualitätsprozesse",
          "Mitgliedschaft in Fachverbänden (VDE, VDMA, ZVEH etc.)",
        ],
      },
      { t: "h2", text: "2. Analysieren Sie Erfahrung und Portfolio" },
      {
        t: "p",
        text: "Erfahrung im gewünschten Projekttyp ist entscheidend. Ein auf Wohngebäude spezialisierter Planer verfügt möglicherweise nicht über die erforderliche Expertise für ein Industriegebäude oder einen Gewerberaum mit besonderen Anforderungen. Verlangen Sie Beispiele ähnlicher Projekte und Referenzen früherer Auftraggeber.",
      },
      {
        t: "callout",
        text: "Fragen Sie den Planer, wie viele Projekte ähnlich Ihrem er in den letzten 3 Jahren realisiert hat. Aktuelle Erfahrung im gewünschten Gebäudetyp ist wertvoller als jahrzehntelange Allgemeinerfahrung.",
      },
      { t: "h2", text: "3. Bewerten Sie die Kommunikationsfähigkeit" },
      {
        t: "p",
        text: "Ein guter Planer muss technische Lösungen verständlich erklären können, auf Fragen prompte Antworten geben und bezüglich Kosten und Terminen transparent sein. Das erste Treffen oder eine kostenlose Erstberatung gibt Ihnen einen klaren Eindruck vom Arbeitsstil.",
      },
      { t: "h2", text: "4. Verstehen Sie, was das Angebot beinhaltet" },
      {
        t: "p",
        text: "Bevor Sie den Vertrag unterzeichnen, stellen Sie sicher, dass Sie genau wissen, was der Planer liefert: wie viele Pläne, welche Leistungsphasen (LP 1–9 nach HOAI), ob technischer Bericht, Massenermittlungen und Baubegleitung enthalten sind. Scheinbar günstigere Angebote können versteckte Zusatzkosten für jede Änderung beinhalten.",
      },
      {
        t: "ul",
        items: [
          "Beleuchtungs- und Steckdosenplan (alle Geschosse)",
          "Einlinienschema des Verteilers",
          "Hausanschlussplan",
          "Blitzschutz- und Erdungsprojekt (falls erforderlich)",
          "Technischer Bericht und Materiallisten",
          "Technische Baubegleitung in den Ausführungsphasen",
        ],
      },
      { t: "h2", text: "5. Das Preis-Leistungs-Verhältnis" },
      {
        t: "p",
        text: "Die Kosten eines Elektroprojekts variieren je nach Gebäudefläche, Komplexität der Anlage und Region. Ein zu günstiges Angebot kann auf mangelnde Erfahrung oder die Verwendung nicht angepasster Standardvorlagen hinweisen.",
      },
      { t: "h2", text: "Was Sie vermeiden sollten" },
      {
        t: "ul",
        items: [
          "Planer ohne gültige Ingenieurkammermitgliedschaft",
          "Fehlen eines schriftlichen Vertrags mit klaren Leistungszielen",
          "Planer, die Baustellenbegehungen ablehnen",
          "Angebote ohne detaillierte Leistungsphasen und Liefergegenstände",
          "Planer, die unrealistisch kurze Termine versprechen",
        ],
      },
      { t: "h2", text: "Fazit" },
      {
        t: "p",
        text: "Die Suche nach dem richtigen Planer erfordert Zeit, aber die Investition lohnt sich. Ein professionell erstelltes Elektroprojekt bedeutet langfristige Einsparungen, Sicherheit für die Gebäudenutzer und keinerlei Probleme bei der Bauabnahme oder bei Behördenprüfungen. Mayer E-Concept bietet eine kostenlose Erstberatung, um Ihre Projektanforderungen zu verstehen, bevor eine Lösung vorgeschlagen wird.",
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
  return {
    title: `${post.title} — Mayer E-Concept`,
    description: post.excerpt,
  };
}

export default async function BlogPostPageDe({
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
      <SiteHeaderDe />
      <main>
        {/* Hero */}
        <section style={{ position: "relative", background: "#051E27", overflow: "hidden" }}>
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
                href="/de"
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
                Startseite
              </Link>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>›</span>
              <Link
                href="/de/blog"
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
                · {post.readMin} Min. Lesezeit
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
            <div style={{ borderRadius: "0 0 12px 12px", overflow: "hidden", aspectRatio: "21/8", maxHeight: 420 }}>
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
            className="article-layout-de"
          >
            <style>{`
              @media (max-width: 900px) {
                .article-layout-de { grid-template-columns: 1fr !important; }
              }
            `}</style>

            {/* Main article */}
            <article>
              {post.blocks.map((block, i) => {
                if (block.t === "p") {
                  return (
                    <p key={i} style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.75, color: "#2C4349", marginBottom: 24 }}>
                      {block.text}
                    </p>
                  );
                }
                if (block.t === "h2") {
                  return (
                    <h2 key={i} style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(20px, 1.8vw, 26px)", fontWeight: 700, letterSpacing: "-0.015em", color: "#0E323D", marginTop: 48, marginBottom: 16 }}>
                      {block.text}
                    </h2>
                  );
                }
                if (block.t === "h3") {
                  return (
                    <h3 key={i} style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(17px, 1.4vw, 20px)", fontWeight: 700, color: "#0E323D", marginTop: 32, marginBottom: 12 }}>
                      {block.text}
                    </h3>
                  );
                }
                if (block.t === "ul") {
                  return (
                    <ul key={i} style={{ paddingLeft: 0, listStyle: "none", marginBottom: 24 }}>
                      {block.items.map((item, j) => (
                        <li key={j} style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.05vw, 16px)", lineHeight: 1.65, color: "#2C4349", paddingLeft: 24, marginBottom: 10, position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, top: "0.55em", width: 6, height: 6, borderRadius: "50%", background: "#C5895B", display: "inline-block" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.t === "callout") {
                  return (
                    <div key={i} style={{ background: "rgba(26,111,122,0.07)", borderLeft: "3px solid #1A6F7A", borderRadius: "0 8px 8px 0", padding: "16px 20px", marginBottom: 24, marginTop: 8 }}>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.05vw, 16px)", lineHeight: 1.65, color: "#1A6F7A", fontStyle: "italic", margin: 0 }}>
                        {block.text}
                      </p>
                    </div>
                  );
                }
                return null;
              })}

              {/* Author */}
              <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid #D8DCDE", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#1A6F7A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 700, color: "#fff" }}>M</span>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, color: "#0E323D", margin: 0 }}>Mayer E-Concept</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#6B8086", margin: "2px 0 0" }}>Elektroplanung · Sibiu & Deutschland</p>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside>
              <div style={{ background: "#FFFFFF", border: "1px solid #D8DCDE", borderRadius: 12, padding: "24px 24px 20px", marginBottom: 24 }}>
                <Link
                  href="/de/blog"
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
                  Zurück zum Blog
                </Link>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.6, color: "#6B8086", margin: 0 }}>
                  Veröffentlicht am {post.date} · {post.readMin} Min. Lesezeit
                </p>
              </div>

              {related.length > 0 && (
                <div style={{ background: "#FFFFFF", border: "1px solid #D8DCDE", borderRadius: 12, padding: "24px", marginBottom: 24 }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B8086", marginBottom: 16 }}>
                    Ähnliche Artikel
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {related.map((r) => (
                      <Link key={r.slug} href={`/de/blog/${r.slug}`} style={{ textDecoration: "none" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 12, alignItems: "start" }}>
                          <div style={{ borderRadius: 6, overflow: "hidden", aspectRatio: "1", flexShrink: 0 }}>
                            <Image src={r.img} alt={r.title} width={72} height={72} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                          </div>
                          <div>
                            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, color: "#0E323D", lineHeight: 1.35, margin: "0 0 4px" }}>{r.title}</p>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#8A9498", margin: 0 }}>{r.date}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA card */}
              <div style={{ background: "#0E323D", borderRadius: 12, padding: "28px 24px" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", fontWeight: 700, color: "#F4F2EC", lineHeight: 1.4, marginBottom: 10 }}>
                  Benötigen Sie ein Elektroprojekt?
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.6, color: "rgba(244,242,236,0.60)", marginBottom: 20 }}>
                  Kontaktieren Sie uns für eine kostenlose Erstberatung. Wir planen Elektroinstallationen für Wohn- und Gewerbebauten.
                </p>
                <Link
                  href="/de#contact"
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
                  Kontakt aufnehmen
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <ContactSectionDe />
      </main>
      <SiteFooterDe />
    </>
  );
}
