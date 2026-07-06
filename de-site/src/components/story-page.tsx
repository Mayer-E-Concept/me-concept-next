import Link from "next/link";
import Image from "next/image";
import { SiteHeaderDe } from "@/components/site-header";
import { SiteFooterDe } from "@/components/site-footer";

const PARAGRAPHS = [
  "Ich bin Martin, geboren und aufgewachsen in Deutschland, mit rumänischen Wurzeln väterlicherseits und deutschen mütterlicherseits. Diese Mischung hat mich schon immer geprägt, auch wenn mir das nicht immer bewusst war.",
  "Angefangen hat alles ganz klassisch: Elektroinstallation von der Pike auf gelernt, dann über die Jahre hochgearbeitet, Bauleiter, Projektleiter, irgendwann Elektromeister. 20 Jahre Elektrobranche, mit allem, was dazugehört: Baustellen, Kunden, schlaflose Nächte und Probleme, die sich am Ende doch immer gelöst haben.",
  "Anfang 2022 kam dann der Punkt, an dem ich wusste: Es reicht nicht, einfach weiterzumachen wie bisher. Ich wollte mehr, für mich und meine Familie. Also haben wir gepackt und sind nach Sibiu gezogen. Kein Urlaubsflirt mit Rumänien, sondern ein echter Neustart. Die Natur hier, das Tempo, die Lebensqualität, genau das, wonach ich gesucht hatte.",
  "Aus der Ferne ein eigenes Unternehmen aufzubauen, klang erstmal verrückt. Ist es vielleicht auch ein bisschen. Aber genau daraus ist Mayer E-Concept SRL entstanden, mein Planungsbüro für elektrotechnische Anlagen. Von Siebenbürgen aus plane und betreue ich weiterhin Projekte in ganz Deutschland, genau wie bisher.",
  "Gleichzeitig will ich den nächsten Schritt gehen: Ich möchte mit meiner Erfahrung auch hier in Rumänien Projekte planen und umsetzen, nach genau demselben Standard, den ich in Deutschland gelernt und all die Jahre angewendet habe. Sauberes Handwerk, durchdachte Planung, klare Prozesse, das ist keine Frage des Landes, sondern der Haltung. Ob in Deutschland oder Rumänien, wer auf deutsche Präzision und Qualität setzen will, findet in mir den richtigen Partner.",
  "Was sich dabei nicht verändert: der Anspruch an saubere, durchdachte Planung. Meine Firma ist ISO 9001:2015-zertifiziert, und ich arbeite konsequent nach HOAI, DIN 18015 und VDE, in beiden Ländern gleichermaßen.",
  "Manchmal muss man eben alles auf den Kopf stellen, um am Ende genau da anzukommen, wo man hinwollte. Und egal ob dein Projekt in Deutschland oder hier in Siebenbürgen liegt, ich freue mich darauf, es mit dir umzusetzen.",
];

export function StoryPageDe() {
  return (
    <>
      <SiteHeaderDe />
      <main
        style={{
          background: "#051E27",
          minHeight: "100vh",
          color: "#F4F2EC",
          paddingTop: "calc(72px + clamp(48px, 6vw, 96px))",
          paddingBottom: "clamp(64px, 8vw, 120px)",
        }}
      >
        <style>{`
          @media (max-width: 640px) {
            .story-photo { float: none !important; width: 100% !important; margin: 0 0 24px 0 !important; }
          }
        `}</style>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 40px)",
          }}
        >
          <nav style={{ marginBottom: 40 }}>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11.5px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#1A6F7A",
                textDecoration: "none",
              }}
            >
              ← Startseite
            </Link>
          </nav>

          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(28px, 3.8vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "#F4F2EC",
              maxWidth: "24ch",
              marginBottom: 32,
            }}
          >
            Meine Geschichte: vom Elektriker zum Unternehmer, zwischen Deutschland und Rumänien
          </h1>

          <div>
            <div
              className="story-photo"
              style={{
                position: "relative",
                float: "left",
                width: 300,
                aspectRatio: "3/4",
                borderRadius: 14,
                overflow: "hidden",
                margin: "0 28px 20px 0",
              }}
            >
              <Image
                src="/uploads/poveste.jpg"
                alt="Martin Mayer"
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                style={{ objectFit: "cover" }}
              />
            </div>

            {PARAGRAPHS.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(15px, 1.3vw, 17px)",
                  lineHeight: 1.8,
                  color: i === 0 ? "rgba(244,242,236,0.80)" : "rgba(244,242,236,0.75)",
                  margin: "0 0 20px",
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </main>
      <SiteFooterDe />
    </>
  );
}
