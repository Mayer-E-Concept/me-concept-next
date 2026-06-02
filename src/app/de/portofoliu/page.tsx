import type { Metadata } from "next";
import { SiteHeaderDe } from "@/components/de/site-header";
import { SiteFooterDe } from "@/components/de/site-footer";
import { ContactSectionDe } from "@/components/de/contact-section";
import { PortofoliuPageDe } from "@/components/de/portofoliu-page";

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
