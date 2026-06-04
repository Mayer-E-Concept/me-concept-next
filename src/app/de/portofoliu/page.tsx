import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { SiteHeaderDe } from "@/components/de/site-header";
import { SiteFooterDe } from "@/components/de/site-footer";
import { ContactSectionDe } from "@/components/de/contact-section";
import { PortofoliuPageDe } from "@/components/de/portofoliu-page";

const OG_IMAGE = `${SITE_URL}/uploads/PROIECTARE-INSTALATII-ELECTRICE.jpg`;

export const metadata: Metadata = {
  title: "Portfolio — Mayer E-Concept | Elektroplanungsprojekte",
  description:
    "Portfolio von Elektroplanungsprojekten: Wohn-, Gewerbe- und Industriegebäude. Elektrische Planung BIM Revit, KNX-Automatisierung, technische und Architekturbeleuchtung.",
  alternates: {
    canonical: "/de/portofoliu",
    languages: {
      ro: "/portofoliu",
      de: "/de/portofoliu",
      "x-default": "/portofoliu",
    },
  },
  openGraph: {
    title: "Portfolio — Mayer E-Concept",
    description:
      "Elektroplanungsprojekte: Wohn-, Gewerbe- und Industriegebäude. BIM Revit, KNX, Architekturbeleuchtung.",
    url: `${SITE_URL}/de/portofoliu`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Portfolio Elektroplanungsprojekte" }],
    type: "website",
    locale: "de_DE",
    siteName: "Mayer E-Concept",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio — Mayer E-Concept",
    description: "Elektroplanungsprojekte: Wohn-, Gewerbe- und Industriegebäude.",
    images: [OG_IMAGE],
  },
};

export default function PortfolioDe() {
  return (
    <>
      <SiteHeaderDe />
      <main>
        <PortofoliuPageDe />
        <ContactSectionDe />
      </main>
      <SiteFooterDe />
    </>
  );
}
