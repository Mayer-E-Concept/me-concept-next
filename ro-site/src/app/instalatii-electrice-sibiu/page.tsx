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
      title={TITLE}
      serviceName="Execuție instalații electrice în Sibiu"
      serviceType="Instalații electrice"
      intro={[
        "Proiectăm și executăm instalații electrice în Sibiu și în împrejurimi – de la o priză nouă până la instalația completă a unei case, a unui magazin sau a unei hale.",
        "Lucrăm cu atestat ANRE pentru instalații electrice de joasă tensiune, la standardul german pe care Martin Mayer, maistru electrician (Elektromeister) cu peste 20 de ani de experiență, l-a adus în România.",
      ]}
      blocks={[
        {
          title: "Case și apartamente",
          text: "Instalații electrice noi sau renovate, curat și conform normativului I7.",
          points: [
            "Prize, întrerupătoare și circuite noi, trasee îngropate sau aparente",
            "Tablou electric nou sau înlocuirea tabloului vechi, cu protecții diferențiale",
            "Iluminat interior și exterior, spoturi, iluminat pentru terase și grădini",
            "Racorduri pentru plită, cuptor, boiler, pompă de căldură și aer condiționat",
            "Casă inteligentă: lumini, jaluzele și încălzire controlate din telefon",
            "Interfon video, rețea de date și sonerie",
          ],
        },
        {
          title: "Spații comerciale și industriale",
          text: "Pentru birouri, magazine, restaurante, ateliere și hale – planificat ca să nu oprească activitatea.",
          points: [
            "Distribuție de forță, tablouri și circuite pentru utilaje",
            "Iluminat eficient LED pentru birouri, magazine și hale",
            "Modernizarea instalațiilor existente și extinderi",
          ],
        },
        {
          title: "Panouri fotovoltaice și stații de încărcare",
          text: "Sisteme fotovoltaice pentru case și firme și stații de încărcare (wallbox) pentru mașini electrice, cu racordarea corectă în tabloul existent.",
        },
      ]}
      why={[
        "Atestate ANRE de tip A și B: proiectare și execuție instalații electrice",
        "Proiect și execuție din aceeași mână – fără pierderi între proiectant și electrician",
        "Firmă certificată ISO 9001:2015",
        "Maistru electrician german (Elektromeister), peste 20 de ani pe șantiere în Germania și România",
        "Ofertă clară înainte de început și documentație la predare",
        "Raport de lucru zilnic, semnat de client, cu orele și materialele folosite",
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
