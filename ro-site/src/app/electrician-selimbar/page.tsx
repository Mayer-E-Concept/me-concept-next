import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { AREAS_SIBIU } from "@/lib/business";
import { ServiceLanding } from "@/components/service-landing";
import { LANDING_CTA, LANDING_QUOTE, LANDING_STATS, landingMeta } from "@/lib/landing-common";

const PATH = "/electrician-selimbar";
const LOC = "Șelimbăr";
// Localitatea paginii apare prima în lista zonelor.
const AREAS = [LOC, ...AREAS_SIBIU.filter((a) => a !== LOC)];

export const metadata: Metadata = landingMeta(
  PATH,
  "Electrician Șelimbăr | Instalații electrice cu atestat ANRE | ME-Concept",
  "Electrician în Șelimbăr: instalații electrice pentru case noi, apartamente și spații comerciale, tablouri electrice, stații de încărcare și panouri fotovoltaice. Firmă din Sibiu cu atestat ANRE și ISO 9001:2015.",
  SITE_URL,
);

export default function ElectricianSelimbar() {
  return (
    <ServiceLanding
      path={PATH}
      eyebrow="Electrician · Șelimbăr"
      serviceName="Electrician în Șelimbăr: instalații electrice"
      serviceType="Instalații electrice"
      title={["Electrician în", "Șelimbăr", "cu atestat ANRE."]}
      lead="Suntem din Sibiu, la câteva minute de Șelimbăr. Executăm instalații electrice pentru case noi, apartamente și spații comerciale, de la primul circuit până la punerea în funcțiune."
      hero={{ src: "/uploads/ME-CONCEPT-162.jpg", alt: "Echipa Mayer E-Concept pe șantier, cu planurile instalației electrice", pos: "70% center" }}
      quote={LANDING_QUOTE}
      stats={LANDING_STATS}
      chips={["Atestat ANRE A + B", "ISO 9001:2015", "Elektromeister german", "Șelimbăr și Sibiu"]}
      cta={LANDING_CTA}
      cardsTitle="Lucrări electrice pentru case noi și firme din Șelimbăr"
      cards={[
        {
          title: "Case noi și apartamente",
          text: "În Șelimbăr se construiește mult. Executăm instalația completă a casei, de la tuburi și cabluri până la tablou, prize, iluminat și racordurile pentru pompă de căldură, plită și aer condiționat.",
          img: { src: "/uploads/Iluminat-Arhitctural.jpg", alt: "Casă cu instalație electrică și iluminat exterior executate de Mayer E-Concept" },
          href: "/instalatii-electrice-sibiu",
        },
        {
          title: "Tablouri electrice",
          text: "Tablou nou sau înlocuirea celui vechi, cu protecții diferențiale.",
          img: { src: "/uploads/Automatizare.jpg", alt: "Tablou electric executat de Mayer E-Concept" },
          href: "/tablouri-electrice-sibiu",
        },
        {
          title: "Stații de încărcare",
          text: "Wallbox pe circuit dedicat, acasă sau la firmă.",
          img: { src: "/uploads/iStock-1192061868.jpg", alt: "Electrician care pregătește racordul pentru o stație de încărcare" },
          href: "/statii-de-incarcare-sibiu",
        },
        {
          title: "Panouri fotovoltaice",
          text: "Sisteme fotovoltaice dimensionate după consumul tău.",
          img: { src: "/uploads/pv-wallbox-schema.jpg", alt: "Schemă: panouri fotovoltaice pe acoperiș, invertor și wallbox", pos: "85% center" },
          href: "/panouri-fotovoltaice-sibiu",
        },
        {
          title: "Spații comerciale",
          text: "Magazine, birouri, ateliere și hale din zona comercială.",
          img: { src: "/uploads/spati-comerciale-2.jpg", alt: "Spațiu comercial cu instalație electrică și iluminat" },
        },
      ]}
      steps={[
        { title: "Discuție și vizită", text: "ne spui ce ai nevoie și venim în Șelimbăr să vedem locul." },
        { title: "Ofertă", text: "primești o ofertă clară cu lucrările și materialele." },
        { title: "Execuție", text: "lucrăm curat și la termen. Vezi în fiecare zi ce s-a făcut." },
        { title: "Verificare și predare", text: "verificăm instalația, o punem în funcțiune și îți predăm documentația." },
      ]}
      areas={AREAS}
      faqs={[
        {
          q: "Veniți în Șelimbăr pentru lucrări mici?",
          a: "Da. Șelimbăr este lângă Sibiu, așa că venim și pentru lucrări mici, de exemplu un tablou, un circuit nou sau o stație de încărcare.",
        },
        {
          q: "Lucrați la case aflate în construcție?",
          a: "Da. Intrăm în șantier la momentul potrivit, ne coordonăm cu constructorul și cu celelalte echipe și executăm instalația în etape: trasee și cabluri, apoi tablou și aparataj, apoi verificări și punere în funcțiune.",
        },
        {
          q: "Aveți atestat ANRE?",
          a: "Da. Mayer E-Concept are atestate ANRE de tip A și B, pentru proiectarea și pentru execuția instalațiilor electrice.",
        },
        {
          q: "Cum primesc o ofertă?",
          a: "Sună-ne, scrie-ne pe WhatsApp sau folosește formularul de contact. Pentru lucrări mici ajung o descriere și câteva poze. Pentru lucrări mari venim la fața locului sau pornim de la planuri.",
        },
        {
          q: "Faceți și proiectul instalației electrice?",
          a: "Da. Facem proiectarea și execuția, sau executăm după un proiect existent. Când amândouă vin de la noi, nu se pierde nimic între proiect și șantier.",
        },
      ]}
      related={{ href: "/instalatii-electrice-sibiu", label: "Toate lucrările electrice în Sibiu" }}
    />
  );
}
