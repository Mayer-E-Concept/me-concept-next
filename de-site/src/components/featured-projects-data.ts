import type { FeaturedProject } from "@/components/featured-project-card";

/* Shared zwischen der Featured-Sektion der Portfolio-Seite und dem
   Referenz-Teaser auf der Startseite — eine einzige Quelle, damit beide
   automatisch synchron bleiben. */
export const FEATURED_PROJECTS_DE: FeaturedProject[] = [
  {
    id: "rewe",
    category: "Handel & Smart-Building",
    title: "Supermarkt und Sportflächen",
    desc: "Neubau mit synergetischer Verbindung von Supermarkt und öffentlichen Sportflächen, vollständig LPH 1–7 geplant. Flexibles Energie- und Beleuchtungskonzept für zwei unterschiedliche Nutzungstypen.",
    img: "/uploads/referinte/render-1.jpg",
    // Blendet das Markenlogo auf der Fassade aus — oben rechts am Gebäude.
    blurRegion: { left: 58.4, top: 52.1, width: 11.2, height: 9.8 },
    specs: [
      { label: "LPH", value: "1–7 komplett" },
      { label: "Fläche", value: "~2.500 m²" },
      { label: "Standard", value: "Smart-Building" },
    ],
    award: null,
  },
  {
    id: "group7",
    category: "Industrie & Energie",
    title: "Sitz & Logistik",
    desc: "Kombination aus 5.000 m² Bürofläche in Winkelform mit modernem Logistikzentrum. PV-Anlage auf dem Hallendach deckt den Strombedarf von ~100 Haushalten.",
    img: "/uploads/referinte/render-2.jpg",
    // Blendet das Firmenlogo auf der Fassade aus.
    blurRegion: { left: 55.8, top: 25.2, width: 20.4, height: 13.6 },
    specs: [
      { label: "LPH", value: "1–7" },
      { label: "Bürofläche", value: "5.000 m²" },
      { label: "PV", value: "~100 Haushalte" },
    ],
    award: null,
  },
  {
    id: "villa-maxima",
    category: "Wohnen & Denkmal",
    title: "Sanierung Denkmalgeschütztes Gebäude",
    desc: "Haar, München — 120 Wohneinheiten in 3 denkmalgeschützten Gebäuden. Leitungsführung durch Gewölbekeller mit geringer Deckenhöhe — gelöst durch millimetergenaue BIM-Modellierung mit digitaler Kollisionsprüfung.",
    img: "/uploads/referinte/render-3.jpg",
    specs: [
      { label: "LPH", value: "1–7" },
      { label: "Einheiten", value: "120 WE" },
      { label: "Glasfaser", value: "Alle WE" },
    ],
    award: "BIM-Preis Bayern 2025",
  },
  {
    id: "get-h2",
    category: "Energie & Infrastruktur",
    title: "Wasserstoff-Kraftwerk",
    desc: "Werk- und Montageplanung für die elektrotechnische Infrastruktur der ersten großskaligen H₂-Elektrolyseanlage Deutschlands. Intensive Gewerke-Koordination als zentrale Herausforderung.",
    img: "/uploads/referinte/render-4.jpg",
    specs: [
      { label: "Rolle", value: "Detailplanung und Montageplanung" },
      { label: "Standort", value: "Lingen, Emsland" },
    ],
    award: null,
  },
];
