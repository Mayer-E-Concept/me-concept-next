import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { AREAS_SIBIU } from "@/lib/business";
import { ServiceLanding } from "@/components/service-landing";

const PATH = "/photovoltaik-sibiu";
const TITLE = "Photovoltaik und Wallbox in Sibiu | Montage mit ANRE-Attest | ME-Concept";
const DESCRIPTION =
  "Photovoltaikanlagen für Häuser und Firmen und Ladestationen für Elektroautos in Sibiu und Umgebung. Nach Ihrem Verbrauch ausgelegt und sauber in die Verteilung eingebunden. ANRE-Attest, ISO 9001:2015.";
const OG_IMAGE = `${SITE_URL}/uploads/pv-wallbox-schema.jpg`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    images: [{ url: OG_IMAGE, alt: "Schema einer Photovoltaikanlage mit Wallbox" }],
    type: "website",
    locale: "de_DE",
    siteName: "Mayer E-Concept",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
};

// Deutsche Fassung der Photovoltaik-Seite. Ausgeführt wird nur in Rumänien (Sibiu und Umgebung).
export default function PhotovoltaikSibiu() {
  return (
    <ServiceLanding
      path={PATH}
      eyebrow="Photovoltaik und Wallbox · Sibiu"
      serviceName="Montage von Photovoltaikanlagen und Ladestationen in Sibiu"
      serviceType="Photovoltaikanlagen und Ladestationen"
      title={["Photovoltaik und", "Ladestationen", "in Sibiu."]}
      lead="Photovoltaikanlagen für Häuser und Firmen und Wallboxen für Elektroautos. Nach Ihrem Verbrauch ausgelegt und sauber in die Verteilung eingebunden, mit ANRE-Attest."
      hero={{ src: "/uploads/pv-wallbox-schema.jpg", alt: "Schema: Photovoltaikmodule auf dem Dach, Wechselrichter und Wallbox für das Elektroauto", pos: "right center" }}
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
      cardsTitle="Eigener Strom, sauber in die Verteilung eingebunden"
      cards={[
        {
          title: "Photovoltaikanlagen",
          text: "Für Häuser, Pensionen, Werkstätten und Hallen: Auslegung der Leistung aus Ihren Stromrechnungen, Planung, Wechselrichter, Montage, Schutzeinrichtungen und Hilfe bei den Unterlagen für Prosumenten.",
          img: { src: "/uploads/Iluminat-Arhitctural.jpg", alt: "Haus, das von einer Photovoltaikanlage versorgt wird" },
        },
        {
          title: "Ladestationen",
          text: "Wallbox zu Hause oder in der Firma, auf eigenem Stromkreis und richtig abgesichert.",
          img: { src: "/uploads/iStock-1192061868.jpg", alt: "Elektriker bereitet den Anschluss für eine Ladestation vor" },
        },
        {
          title: "Verteiler und Schutz",
          text: "Wir prüfen zuerst die verfügbare Leistung und den bestehenden Verteiler.",
          img: { src: "/uploads/Automatizare.jpg", alt: "Verteiler, vorbereitet für Photovoltaik" },
        },
      ]}
      steps={[
        { title: "Gespräch", text: "Sie nennen uns Verbrauch, Montageort und was versorgt werden soll." },
        { title: "Auslegung und Angebot", text: "Wir legen die Anlage aus, und Sie erhalten ein klares Angebot." },
        { title: "Montage", text: "Wir montieren, verkabeln und binden in die Verteilung ein, sauber und sicher." },
        { title: "Inbetriebnahme", text: "Wir prüfen, nehmen die Anlage in Betrieb und zeigen Ihnen, wie sie funktioniert." },
      ]}
      areas={AREAS_SIBIU}
      faqs={[
        {
          q: "Kann ich mit einer Photovoltaikanlage Prosument werden?",
          a: "Ja. Überschüssiger Strom kann ins Netz eingespeist werden. Der Anschluss als Prosument läuft über den Verteilnetzbetreiber, und wir helfen Ihnen mit den nötigen technischen Unterlagen.",
        },
        {
          q: "Welche Leistung brauche ich?",
          a: "Das hängt von Ihrem Verbrauch und vom Montageort ab. Wir gehen von den Stromrechnungen des letzten Jahres aus und schlagen Ihnen die passende Leistung vor.",
        },
        {
          q: "Kann ich zu Hause eine Ladestation montieren lassen?",
          a: "In den meisten Fällen ja. Wir prüfen zuerst die verfügbare Leistung und den Verteiler und montieren die Station dann auf einem eigenen Stromkreis mit den richtigen Schutzeinrichtungen.",
        },
        {
          q: "In welchen Orten montieren Sie?",
          a: `In Sibiu und Umgebung: ${AREAS_SIBIU.join(", ")}. Für größere Projekte kommen wir auch in andere Orte im Kreis Sibiu.`,
        },
      ]}
      related={{ href: "/elektroinstallation-sibiu", label: "Alle Elektroarbeiten in Sibiu" }}
    />
  );
}
