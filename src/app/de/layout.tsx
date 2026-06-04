import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const OG_IMAGE = `${SITE_URL}/uploads/me-concept-proiectare-instalatii-electrice-romania.jpg`;

export const metadata: Metadata = {
  title: "ME-Concept — Qualitative Elektroplanung",
  description:
    "Elektroplanung für Wohn- und Gewerbeprojekte. Professionalität, Präzision, garantierte Qualität. ISO 9001:2015 zertifiziert.",
  alternates: {
    canonical: "/de",
    languages: {
      ro: "/",
      de: "/de",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "ME-Concept — Qualitative Elektroplanung",
    description:
      "Elektroplanung für Wohn- und Gewerbeprojekte. Professionalität, Präzision, garantierte Qualität.",
    url: `${SITE_URL}/de`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Mayer E-Concept — Elektroplanung" }],
    type: "website",
    locale: "de_DE",
    siteName: "Mayer E-Concept",
  },
  twitter: {
    card: "summary_large_image",
    title: "ME-Concept — Qualitative Elektroplanung",
    description: "Professionelle Elektroplanung. ANRE-zertifiziert, ISO 9001:2015.",
    images: [OG_IMAGE],
  },
};

export default function DeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
