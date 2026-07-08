import type { FeaturedProject } from "@/components/featured-project-card";

/* Shared between the portfolio page's featured section and the homepage
   references teaser — kept as a single source of truth so both stay in
   sync automatically. */
export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "rewe",
    category: "Comerț & Smart-Building",
    title: "Supermarket și Spații Sportive",
    desc: "Clădire mixtă ce reunește un supermarket și spații sportive publice, planificată integral LPH 1–7. Concept flexibil de iluminat și distribuție energetică pentru două tipologii distincte de utilizare.",
    img: "/uploads/referinte/render-1.jpg",
    // Ascunde marca de pe fațadă din vizualizare — logo situat în dreapta-sus a clădirii.
    blurRegion: { left: 58.4, top: 52.1, width: 11.2, height: 9.8 },
    specs: [
      { label: "LPH", value: "1–7 complet" },
      { label: "Suprafață", value: "~2.500 m²" },
      { label: "Standard", value: "Smart-Building" },
    ],
    award: null,
  },
  {
    id: "group7",
    category: "Industrie & Energie",
    title: "Sediu și Logistică",
    desc: "Complex ce integrează 5.000 m² de birouri cu o hală logistică modernă. Instalație PV pe acoperiș — acoperă consumul energetic a ~100 de gospodării.",
    img: "/uploads/referinte/render-2.jpg",
    // Ascunde sigla de pe fațada clădirii.
    blurRegion: { left: 55.8, top: 25.2, width: 20.4, height: 13.6 },
    specs: [
      { label: "LPH", value: "1–7" },
      { label: "Birouri", value: "5.000 m²" },
      { label: "PV", value: "~100 gospodării" },
    ],
    award: null,
  },
  {
    id: "villa-maxima",
    category: "Rezidențial & Monument",
    title: "Reabilitare Civilă Monument Istoric",
    desc: "Haar, München — 120 unități rezidențiale în 3 clădiri monument. Trasee de cabluri prin subsoluri boltite cu înălțime redusă — rezolvate prin modelare BIM milimetrică și verificare coliziuni în timp real.",
    img: "/uploads/referinte/render-3.jpg",
    specs: [
      { label: "LPH", value: "1–7" },
      { label: "Unități", value: "120 WE" },
      { label: "Fibră optică", value: "Toate unitățile" },
    ],
    award: "BIM-Preis Bayern 2025",
  },
  {
    id: "get-h2",
    category: "Energie & Infrastructură",
    title: "Centrală Electrică pe Hidrogen",
    desc: "Planificare Werk & Montaj pentru infrastructura electrică a primei instalații de electroliză H₂ la scară mare din Germania. Coordonare intensivă cu toate corpurile de meseriași.",
    img: "/uploads/referinte/render-4.jpg",
    specs: [
      { label: "Rol", value: "Proiectare detaliată și planificarea asamblării" },
      { label: "Locație", value: "Lingen, Emsland" },
    ],
    award: null,
  },
];
