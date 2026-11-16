import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { AREAS_SIBIU } from "@/lib/business";
import { ServiceLanding } from "@/components/service-landing";

const PATH = "/panouri-fotovoltaice-sibiu";
const TITLE = "Montaj panouri fotovoltaice și stații de încărcare în Sibiu";
const DESCRIPTION =
  "Sisteme fotovoltaice pentru case și firme și stații de încărcare (wallbox) pentru mașini electrice în Sibiu și împrejurimi. Proiectare și execuție cu atestat ANRE.";
const OG_IMAGE = `${SITE_URL}/uploads/me-concept-proiectare-instalatii-electrice-romania.jpg`;

export const metadata: Metadata = {
  title: "Panouri fotovoltaice și wallbox Sibiu | ME-Concept",
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Mayer E-Concept – fotovoltaice și stații de încărcare în Sibiu" }],
    type: "website",
    locale: "ro_RO",
    siteName: "Mayer E-Concept",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
};

export default function PanouriFotovoltaiceSibiu() {
  return (
    <ServiceLanding
      path={PATH}
      eyebrow="Fotovoltaice și wallbox · Sibiu"
      title={TITLE}
      serviceName="Montaj sisteme fotovoltaice și stații de încărcare în Sibiu"
      serviceType="Sisteme fotovoltaice și stații de încărcare"
      intro={[
        "Proiectăm și montăm sisteme fotovoltaice pentru case și firme și stații de încărcare (wallbox) pentru mașini electrice, în Sibiu și în împrejurimi.",
        "Partea electrică o facem cu atestat ANRE: dimensionare, protecții, racordarea în tabloul existent și punerea în funcțiune.",
      ]}
      blocks={[
        {
          title: "Sisteme fotovoltaice",
          text: "Pentru case, pensiuni, ateliere și hale – dimensionate după consumul tău real.",
          points: [
            "Calcul al puterii necesare pornind de la facturile de energie",
            "Proiectarea instalației și alegerea invertorului",
            "Montaj, cablare, protecții și punere în funcțiune",
            "Ajutor cu documentația tehnică pentru a deveni prosumator",
          ],
        },
        {
          title: "Stații de încărcare (wallbox)",
          text: "Încărcare sigură acasă sau la firmă, fără să suprasoliciți instalația.",
          points: [
            "Verificarea puterii disponibile și a tabloului electric",
            "Circuit dedicat cu protecții corecte",
            "Montaj și punere în funcțiune, și pentru parcări de firmă",
          ],
        },
      ]}
      why={[
        "Atestat ANRE pentru instalații electrice de joasă tensiune",
        "Proiect și execuție din aceeași mână",
        "Firmă certificată ISO 9001:2015",
        "Maistru electrician german (Elektromeister), peste 20 de ani de experiență",
        "Verificăm întâi instalația existentă – fotovoltaicul și wallbox-ul se leagă corect în tablou",
      ]}
      steps={[
        { title: "Discuție", text: "ne spui consumul, locul de montaj și ce vrei să alimentezi." },
        { title: "Calcul și ofertă", text: "dimensionăm sistemul și primești o ofertă clară." },
        { title: "Montaj", text: "montăm, cablăm și legăm în tablou, curat și sigur." },
        { title: "Punere în funcțiune", text: "verificăm, pornim sistemul și îți arătăm cum funcționează." },
      ]}
      areas={AREAS_SIBIU}
      faqs={[
        {
          q: "Pot deveni prosumator cu panourile fotovoltaice?",
          a: "Da. Energia produsă în plus poate fi livrată în rețea. Racordarea ca prosumator se face prin operatorul de distribuție, iar noi te ajutăm cu documentația tehnică necesară.",
        },
        {
          q: "Ce putere fotovoltaică îmi trebuie?",
          a: "Depinde de consumul tău și de locul de montaj. Pornim de la facturile de energie din ultimul an și îți propunem puterea potrivită.",
        },
        {
          q: "Pot monta o stație de încărcare acasă?",
          a: "De cele mai multe ori, da. Verificăm întâi puterea disponibilă și tabloul electric, apoi montăm stația pe un circuit dedicat, cu protecțiile corecte.",
        },
        {
          q: "În ce localități montați?",
          a: `În Sibiu și împrejurimi: ${AREAS_SIBIU.join(", ")}. Pentru proiecte mai mari venim și în alte localități din județ.`,
        },
      ]}
      related={{ href: "/instalatii-electrice-sibiu", label: "Toate lucrările electrice în Sibiu" }}
    />
  );
}
