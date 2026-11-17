import type { Pic } from "@/components/service-landing";

// Blocuri comune pentru paginile de servicii locale (citat, cifre, etichete, apel la acțiune).
export const LANDING_QUOTE: { text: string; who: string; role: string; img: Pic } = {
  text: "Lucru curat, planificare temeinică, procese clare. Asta nu ține de țară, ci de atitudine.",
  who: "Martin Mayer",
  role: "Elektromeister, fondator Mayer E-Concept",
  img: { src: "/uploads/poveste.jpg", alt: "Martin Mayer, maistru electrician, fondatorul Mayer E-Concept", pos: "center 25%" },
};

export const LANDING_STATS = [
  { value: "A + B", label: "Atestate ANRE: proiectare și execuție" },
  { value: "20+", label: "ani de experiență pe șantiere" },
  { value: "ISO", label: "9001:2015, firmă certificată" },
  { value: "1", label: "singur partener: proiect și execuție" },
];

export const LANDING_CTA: { title: string; text: string; img: Pic } = {
  title: "Hai să vorbim despre lucrarea ta.",
  text: "Spune-ne ce ai nevoie. Primești o ofertă clară, fără surprize.",
  img: { src: "/uploads/echipa-team.jpg", alt: "Echipa Mayer E-Concept", pos: "center 40%" },
};

export function landingMeta(path: string, title: string, description: string, siteUrl: string) {
  const image = `${siteUrl}/uploads/me-concept-proiectare-instalatii-electrice-romania.jpg`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${path}`,
      images: [{ url: image, width: 1200, height: 630, alt: "Mayer E-Concept, instalații electrice în Sibiu" }],
      type: "website" as const,
      locale: "ro_RO",
      siteName: "Mayer E-Concept",
    },
    twitter: { card: "summary_large_image" as const, title, description, images: [image] },
  };
}
