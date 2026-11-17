import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { AREAS_SIBIU } from "@/lib/business";
import { ServiceLanding } from "@/components/service-landing";
import { LANDING_CTA, LANDING_QUOTE, LANDING_STATS, landingMeta } from "@/lib/landing-common";

const PATH = "/tablouri-electrice-sibiu";

export const metadata: Metadata = landingMeta(
  PATH,
  "Tablouri electrice Sibiu | Montaj și înlocuire | ME-Concept",
  "Montaj, înlocuire și modernizare de tablouri electrice în Sibiu și împrejurimi: case, apartamente, spații comerciale și hale. Protecții diferențiale, protecție la supratensiune, schemă și etichetare. Atestat ANRE.",
  SITE_URL,
);

export default function TablouriElectriceSibiu() {
  return (
    <ServiceLanding
      path={PATH}
      eyebrow="Tablouri electrice · Sibiu"
      serviceName="Montaj și înlocuire tablouri electrice în Sibiu"
      serviceType="Tablouri electrice"
      title={["Tablouri electrice", "montate corect", "în Sibiu."]}
      lead="Tablou nou pentru casa ta sau înlocuirea celui vechi, cu siguranțe automate, protecții diferențiale și protecție la supratensiune. Fiecare circuit este etichetat, iar la final primești schema tabloului."
      hero={{ src: "/uploads/Automatizare.jpg", alt: "Tablou electric cablat de Mayer E-Concept", pos: "center" }}
      quote={LANDING_QUOTE}
      stats={LANDING_STATS}
      chips={["Atestat ANRE A + B", "ISO 9001:2015", "Elektromeister german", "Sibiu și împrejurimi"]}
      cta={LANDING_CTA}
      cardsTitle="Tabloul este inima instalației electrice"
      cards={[
        {
          title: "Tablou nou pentru casă sau apartament",
          text: "Dimensionăm tabloul după circuitele și consumatorii tăi: plită, boiler, pompă de căldură, aer condiționat, fotovoltaice sau wallbox. Lăsăm loc de rezervă pentru extinderi.",
          img: { src: "/uploads/Automatizare.jpg", alt: "Tablou electric nou, cu circuite etichetate" },
        },
        {
          title: "Înlocuirea tabloului vechi",
          text: "Scoatem siguranțele vechi și montăm aparataj modern, cu protecție diferențială.",
          img: { src: "/uploads/iStock-1192061868.jpg", alt: "Electrician care verifică un tablou electric vechi" },
        },
        {
          title: "Tablouri pentru firme și hale",
          text: "Tablouri de distribuție și de forță pentru birouri, magazine, ateliere și hale.",
          img: { src: "/uploads/spati-comerciale-2.jpg", alt: "Spațiu comercial alimentat dintr-un tablou de distribuție" },
        },
        {
          title: "Toată instalația electrică",
          text: "Dacă trebuie refăcute și circuitele, executăm instalația completă.",
          img: { src: "/uploads/ME-CONCEPT-162.jpg", alt: "Echipa Mayer E-Concept pe șantier, cu planurile instalației", pos: "70% center" },
          href: "/instalatii-electrice-sibiu",
        },
        {
          title: "Wallbox și fotovoltaice",
          text: "Pregătim tabloul pentru stația de încărcare și pentru panouri.",
          img: { src: "/uploads/pv-wallbox-schema.jpg", alt: "Schemă: panouri fotovoltaice, invertor și wallbox legate la tablou", pos: "85% center" },
          href: "/statii-de-incarcare-sibiu",
        },
      ]}
      steps={[
        { title: "Discuție și poze", text: "ne trimiți câteva poze cu tabloul actual sau venim să îl vedem." },
        { title: "Ofertă", text: "primești o ofertă clară, cu aparatajul și manopera." },
        { title: "Montaj", text: "stabilim împreună ora la care oprim curentul și lucrăm curat." },
        { title: "Măsurători și predare", text: "verificăm fiecare circuit, etichetăm și îți predăm schema tabloului." },
      ]}
      areas={AREAS_SIBIU}
      faqs={[
        {
          q: "Când trebuie înlocuit un tablou electric?",
          a: "Când are siguranțe fuzibile vechi, când nu are protecție diferențială, când siguranțele sar des, când se încălzește sau miroase a ars și când adaugi consumatori mari, de exemplu plită electrică, pompă de căldură, fotovoltaice sau o stație de încărcare.",
        },
        {
          q: "Ce este protecția diferențială și de ce am nevoie de ea?",
          a: "Protecția diferențială întrerupe curentul în câteva sutimi de secundă dacă apare o scurgere de curent, de exemplu când cineva atinge un aparat defect. Protejează oamenii de electrocutare și reduce riscul de incendiu. Pentru circuitele de prize folosim protecții de 30 mA.",
        },
        {
          q: "Cât durează înlocuirea unui tablou?",
          a: "La un apartament sau o casă obișnuită, de regulă o zi de lucru. Curentul este oprit doar pe durata lucrării. La tablouri mari sau când trebuie refăcute și circuite, durata o stabilim după ce vedem instalația.",
        },
        {
          q: "Primesc schema tabloului?",
          a: "Da. Fiecare circuit este etichetat în tablou, iar la predare primești schema și rezultatele verificărilor făcute.",
        },
        {
          q: "Montați și protecție la supratensiune?",
          a: "Da. Descărcătorul de supratensiune protejează aparatele electronice de vârfurile de tensiune din rețea și de efectele trăsnetelor. Îl recomandăm mai ales la case și acolo unde există fotovoltaice.",
        },
        {
          q: "În ce localități lucrați?",
          a: `În Sibiu și împrejurimi: ${AREAS_SIBIU.join(", ")}. Pentru lucrări mai mari venim și în alte localități din județ.`,
        },
      ]}
      related={{ href: "/instalatii-electrice-sibiu", label: "Toate lucrările electrice în Sibiu" }}
    />
  );
}
