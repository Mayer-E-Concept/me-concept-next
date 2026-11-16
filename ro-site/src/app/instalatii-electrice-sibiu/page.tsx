import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { AREAS_SIBIU } from "@/lib/business";
import { ServiceLanding } from "@/components/service-landing";

const PATH = "/instalatii-electrice-sibiu";
const TITLE = "Electrician autorizat ANRE în Sibiu – execuție instalații electrice";
const DESCRIPTION =
  "Execuție instalații electrice în Sibiu și împrejurimi: case, apartamente, spații comerciale și industriale, fotovoltaice și stații de încărcare. Atestat ANRE, ISO 9001:2015.";
const OG_IMAGE = `${SITE_URL}/uploads/me-concept-proiectare-instalatii-electrice-romania.jpg`;

export const metadata: Metadata = {
  title: "Electrician autorizat ANRE Sibiu | Instalații electrice | ME-Concept",
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Mayer E-Concept – instalații electrice în Sibiu" }],
    type: "website",
    locale: "ro_RO",
    siteName: "Mayer E-Concept",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
};

export default function InstalatiiElectriceSibiu() {
  return (
    <ServiceLanding
      path={PATH}
      eyebrow="Execuție instalații electrice · Sibiu"
      serviceName="Execuție instalații electrice în Sibiu"
      serviceType="Instalații electrice"
      title={["Instalații electrice", "proiectate și executate", "în Sibiu."]}
      lead="De la o priză nouă până la instalația completă a unei case, a unui magazin sau a unei hale – cu atestat ANRE și standardul german pe care Martin Mayer, Elektromeister cu peste 20 de ani de experiență, l-a adus în România."
      hero={{ src: "/uploads/ME-CONCEPT-162.jpg", alt: "Echipa Mayer E-Concept pe șantier, cu planurile instalației electrice", pos: "70% center" }}
      quote={{
        text: "Meșteșug curat, planificare gândită temeinic, procese clare – asta nu ține de țară, ci de atitudine.",
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
      cardsTitle="Lucrări electrice pentru case, firme și hale"
      cards={[
        {
          title: "Case și apartamente",
          text: "Instalații noi sau renovate conform normativului I7: circuite, prize, iluminat interior și exterior, racorduri pentru plită, boiler, pompă de căldură și aer condiționat.",
          img: { src: "/uploads/Iluminat-Arhitctural.jpg", alt: "Casă cu iluminat exterior executat de Mayer E-Concept" },
        },
        {
          title: "Tablouri electrice",
          text: "Tablou nou sau înlocuirea celui vechi, cu protecții diferențiale.",
          img: { src: "/uploads/Automatizare.jpg", alt: "Tablou electric executat de Mayer E-Concept" },
        },
        {
          title: "Spații comerciale și industriale",
          text: "Birouri, magazine, ateliere și hale: distribuție de forță și circuite pentru utilaje.",
          img: { src: "/uploads/spati-comerciale-2.jpg", alt: "Spațiu comercial cu instalație electrică și iluminat" },
        },
        {
          title: "Iluminat",
          text: "LED eficient, spoturi, șine și iluminat arhitectural.",
          img: { src: "/uploads/Iluminat-Arhitctural2.jpg", alt: "Iluminat interior cu spoturi pe șină" },
        },
        {
          title: "Modernizare și verificare",
          text: "Verificăm instalația veche și schimbăm doar ce trebuie.",
          img: { src: "/uploads/iStock-1192061868.jpg", alt: "Electrician care verifică un tablou electric" },
        },
        {
          title: "Fotovoltaice și wallbox",
          text: "Sisteme fotovoltaice și stații de încărcare, legate corect în tablou.",
          img: { src: "/uploads/Casa3-3D.jpg", alt: "Casă cu panouri fotovoltaice pe acoperiș" },
          href: "/panouri-fotovoltaice-sibiu",
        },
      ]}
      steps={[
        { title: "Discuție și vizită", text: "ne spui ce ai nevoie, venim să vedem locul sau pornim de la planuri." },
        { title: "Ofertă", text: "primești o ofertă clară cu lucrările și materialele." },
        { title: "Execuție", text: "lucrăm curat și la termen; vezi în fiecare zi ce s-a făcut." },
        { title: "Verificare și predare", text: "verificăm instalația, o punem în funcțiune și îți predăm documentația." },
      ]}
      areas={AREAS_SIBIU}
      faqs={[
        {
          q: "Aveți atestat ANRE pentru execuția instalațiilor electrice?",
          a: "Da. Mayer E-Concept are atestate ANRE de tip A și B, atât pentru proiectarea, cât și pentru execuția instalațiilor electrice, la clădiri civile și industriale.",
        },
        {
          q: "Faceți și proiectul, sau doar execuția?",
          a: "Amândouă. Putem face proiectul și execuția, sau executăm după un proiect existent. Când le facem pe amândouă, nu se pierde nimic între planificare și șantier.",
        },
        {
          q: "Cum primesc o ofertă?",
          a: "Sună-ne sau scrie-ne prin formularul de contact. Pentru lucrări mici ajunge o descriere și câteva poze; pentru lucrări mari venim la fața locului sau pornim de la planuri.",
        },
        {
          q: "Lucrați și pentru firme, magazine sau hale?",
          a: "Da. Executăm instalații pentru birouri, spații comerciale, ateliere și hale, inclusiv distribuție de forță și iluminat.",
        },
        {
          q: "Puteți moderniza o instalație veche?",
          a: "Da. Verificăm instalația existentă, îți spunem ce trebuie schimbat și înlocuim tabloul, circuitele sau protecțiile acolo unde e nevoie.",
        },
        {
          q: "În ce localități lucrați?",
          a: `În Sibiu și împrejurimi: ${AREAS_SIBIU.join(", ")}. Pentru proiecte mai mari venim și în alte localități din județ.`,
        },
      ]}
      related={{ href: "/panouri-fotovoltaice-sibiu", label: "Fotovoltaice și stații de încărcare" }}
    />
  );
}
