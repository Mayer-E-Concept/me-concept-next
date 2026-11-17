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
      serviceName="Montaj sisteme fotovoltaice și stații de încărcare în Sibiu"
      serviceType="Sisteme fotovoltaice și stații de încărcare"
      title={["Panouri fotovoltaice și", "stații de încărcare", "în Sibiu."]}
      lead="Sisteme fotovoltaice pentru case și firme și wallbox-uri pentru mașini electrice – dimensionate după consumul tău și legate corect în tablou, cu atestat ANRE."
      hero={{ src: "/uploads/pv-wallbox-schema.jpg", alt: "Schemă: panouri fotovoltaice pe acoperiș, invertor și wallbox pentru mașina electrică", pos: "right center" }}
      quote={{
        text: "Lucru curat, planificare temeinică, procese clare. Asta nu ține de țară, ci de atitudine.",
        who: "Martin Mayer",
        role: "Elektromeister, fondator Mayer E-Concept",
        img: { src: "/uploads/poveste.jpg", alt: "Martin Mayer, maistru electrician, fondatorul Mayer E-Concept", pos: "center 25%" },
      }}
      stats={[
        { value: "A + B", label: "Atestate ANRE: proiectare și execuție" },
        { value: "20+", label: "ani de experiență pe șantiere" },
        { value: "ISO", label: "9001:2015 – firmă certificată" },
        { value: "1", label: "singur partener: proiect și execuție" },
      ]}
      chips={["Atestat ANRE A + B", "ISO 9001:2015", "Elektromeister german", "Sibiu și împrejurimi"]}
      cta={{
        title: "Hai să vorbim despre proiectul tău.",
        text: "Spune-ne ce ai nevoie – primești o ofertă clară, fără surprize.",
        img: { src: "/uploads/echipa-team.jpg", alt: "Echipa Mayer E-Concept", pos: "center 40%" },
      }}
      cardsTitle="Energie proprie, legată corect în tablou"
      cards={[
        {
          title: "Sisteme fotovoltaice",
          text: "Pentru case, pensiuni, ateliere și hale: calculul puterii din facturile tale, proiect, invertor, montaj, protecții și ajutor cu documentația de prosumator.",
          img: { src: "/uploads/Iluminat-Arhitctural.jpg", alt: "Casă alimentată de un sistem fotovoltaic" },
        },
        {
          title: "Stații de încărcare",
          text: "Wallbox acasă sau la firmă, pe circuit dedicat, cu protecții corecte.",
          img: { src: "/uploads/iStock-1192061868.jpg", alt: "Electrician care pregătește racordul pentru o stație de încărcare" },
          href: "/statii-de-incarcare-sibiu",
        },
        {
          title: "Tablou și protecții",
          text: "Verificăm întâi puterea disponibilă și tabloul existent.",
          img: { src: "/uploads/Automatizare.jpg", alt: "Tablou electric pregătit pentru fotovoltaice" },
        },
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
