import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { AREAS_SIBIU } from "@/lib/business";
import { ServiceLanding } from "@/components/service-landing";

const PATH = "/elektroinstallation-sibiu";
const TITLE = "Elektroinstallation in Sibiu | Ausführung mit ANRE-Attest | ME-Concept";
const DESCRIPTION =
  "Ausführung von Elektroinstallationen in Sibiu und Umgebung: Häuser, Wohnungen, Gewerbe- und Industrieflächen, Photovoltaik und Ladestationen. ANRE-Attest, ISO 9001:2015, deutscher Elektromeister.";
const OG_IMAGE = `${SITE_URL}/uploads/me-concept-proiectare-instalatii-electrice-romania.jpg`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Mayer E-Concept, Elektroinstallation in Sibiu" }],
    type: "website",
    locale: "de_DE",
    siteName: "Mayer E-Concept",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
};

// Deutsche Fassung der Ausführungsseite. Ausgeführt wird nur in Rumänien (Sibiu und Umgebung).
export default function ElektroinstallationSibiu() {
  return (
    <ServiceLanding
      path={PATH}
      eyebrow="Ausführung Elektroinstallation · Sibiu"
      serviceName="Ausführung von Elektroinstallationen in Sibiu"
      serviceType="Elektroinstallation"
      title={["Elektroinstallation", "geplant und ausgeführt", "in Sibiu."]}
      lead="Von der neuen Steckdose bis zur kompletten Installation eines Hauses, eines Ladens oder einer Halle. Mit ANRE-Attest und dem deutschen Standard, den Martin Mayer, Elektromeister mit über 20 Jahren Erfahrung, nach Rumänien gebracht hat."
      hero={{ src: "/uploads/ME-CONCEPT-162.jpg", alt: "Team von Mayer E-Concept auf der Baustelle mit den Plänen der Elektroinstallation", pos: "70% center" }}
      quote={{
        text: "Saubere Arbeit, durchdachte Planung, klare Abläufe. Das ist keine Frage des Landes, sondern der Haltung.",
        who: "Martin Mayer",
        role: "Elektromeister, Gründer von Mayer E-Concept",
        img: { src: "/uploads/poveste.jpg", alt: "Martin Mayer, Elektromeister und Gründer von Mayer E-Concept", pos: "center 25%" },
      }}
      stats={[
        { value: "A + B", label: "ANRE-Atteste: Planung und Ausführung" },
        { value: "20+", label: "Jahre Erfahrung auf Baustellen" },
        { value: "ISO", label: "9001:2015 zertifiziert" },
        { value: "1", label: "Partner für Planung und Ausführung" },
      ]}
      chips={["ANRE-Attest A + B", "ISO 9001:2015", "Deutscher Elektromeister", "Sibiu und Umgebung"]}
      cta={{
        title: "Sprechen wir über Ihr Projekt.",
        text: "Sagen Sie uns, was Sie brauchen. Sie erhalten ein klares Angebot ohne Überraschungen.",
        img: { src: "/uploads/echipa-team.jpg", alt: "Team von Mayer E-Concept", pos: "center 40%" },
      }}
      cardsTitle="Elektroarbeiten für Häuser, Firmen und Hallen"
      cards={[
        {
          title: "Häuser und Wohnungen",
          text: "Neue oder sanierte Installationen nach der rumänischen Norm I7: Stromkreise, Steckdosen, Beleuchtung innen und außen, Anschlüsse für Herd, Boiler, Wärmepumpe und Klimaanlage.",
          img: { src: "/uploads/Iluminat-Arhitctural.jpg", alt: "Haus mit von Mayer E-Concept ausgeführter Außenbeleuchtung" },
        },
        {
          title: "Verteiler",
          text: "Neuer Verteiler oder Austausch des alten, mit Fehlerstromschutz.",
          img: { src: "/uploads/Automatizare.jpg", alt: "Von Mayer E-Concept ausgeführter Verteiler" },
        },
        {
          title: "Gewerbe und Industrie",
          text: "Büros, Läden, Werkstätten und Hallen: Kraftverteilung und Stromkreise für Maschinen.",
          img: { src: "/uploads/spati-comerciale-2.jpg", alt: "Gewerbefläche mit Elektroinstallation und Beleuchtung" },
        },
        {
          title: "Beleuchtung",
          text: "Effiziente LED-Beleuchtung, Spots, Schienen und Architekturbeleuchtung.",
          img: { src: "/uploads/Iluminat-Arhitctural2.jpg", alt: "Innenbeleuchtung mit Spots an einer Schiene" },
        },
        {
          title: "Modernisierung und Prüfung",
          text: "Wir prüfen die alte Anlage und tauschen nur, was nötig ist.",
          img: { src: "/uploads/iStock-1192061868.jpg", alt: "Elektriker prüft einen Verteiler" },
        },
        {
          title: "Photovoltaik und Wallbox",
          text: "PV-Anlagen und Ladestationen, sauber in die Verteilung eingebunden.",
          img: { src: "/uploads/pv-wallbox-schema.jpg", alt: "Schema: Photovoltaikmodule auf dem Dach, Wechselrichter und Wallbox", pos: "85% center" },
          href: "/photovoltaik-sibiu",
        },
      ]}
      steps={[
        { title: "Gespräch und Besichtigung", text: "Sie sagen uns, was Sie brauchen. Wir sehen uns den Ort an oder starten mit Ihren Plänen." },
        { title: "Angebot", text: "Sie erhalten ein klares Angebot mit Leistungen und Material." },
        { title: "Ausführung", text: "Wir arbeiten sauber und termingerecht. Sie sehen jeden Tag, was gemacht wurde." },
        { title: "Prüfung und Übergabe", text: "Wir prüfen die Anlage, nehmen sie in Betrieb und übergeben die Dokumentation." },
      ]}
      areas={AREAS_SIBIU}
      faqs={[
        {
          q: "Haben Sie ein ANRE-Attest für die Ausführung von Elektroinstallationen?",
          a: "Ja. Mayer E-Concept hat ANRE-Atteste vom Typ A und B, für die Planung und für die Ausführung von Elektroinstallationen in Wohn- und Industriegebäuden.",
        },
        {
          q: "Machen Sie auch die Planung oder nur die Ausführung?",
          a: "Beides. Wir übernehmen Planung und Ausführung, oder wir führen nach einer bestehenden Planung aus. Wenn beides von uns kommt, geht zwischen Planung und Baustelle nichts verloren.",
        },
        {
          q: "Wie bekomme ich ein Angebot?",
          a: "Rufen Sie uns an oder schreiben Sie uns über das Kontaktformular. Für kleine Arbeiten reichen eine Beschreibung und ein paar Fotos. Für große Arbeiten kommen wir vor Ort oder starten mit den Plänen.",
        },
        {
          q: "Arbeiten Sie auch für Firmen, Läden oder Hallen?",
          a: "Ja. Wir führen Installationen für Büros, Gewerbeflächen, Werkstätten und Hallen aus, einschließlich Kraftverteilung und Beleuchtung.",
        },
        {
          q: "Können Sie eine alte Anlage modernisieren?",
          a: "Ja. Wir prüfen die bestehende Anlage, sagen Ihnen, was getauscht werden muss, und ersetzen Verteiler, Stromkreise oder Schutzeinrichtungen dort, wo es nötig ist.",
        },
        {
          q: "In welchen Orten arbeiten Sie?",
          a: `In Sibiu und Umgebung: ${AREAS_SIBIU.join(", ")}. Für größere Projekte kommen wir auch in andere Orte im Kreis Sibiu. In Deutschland übernehmen wir die Planung, nicht die Ausführung.`,
        },
      ]}
      related={{ href: "/photovoltaik-sibiu", label: "Photovoltaik und Ladestationen" }}
    />
  );
}
