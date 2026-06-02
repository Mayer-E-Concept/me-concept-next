import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactSection } from "@/components/contact-section";
import { PortofoliuPage } from "@/components/portofoliu-page";

export const metadata: Metadata = {
  title: "Portofoliu — Mayer E-Concept | Proiecte instalații electrice",
  description:
    "Portofoliu de proiecte de instalații electrice: rezidențiale, comerciale, industriale. Planificare electrică BIM Revit, automatizare KNX, iluminat tehnic și arhitectural.",
  alternates: {
    canonical: "/portofoliu",
    languages: {
      ro: "/portofoliu",
      de: "/de/portofoliu",
      "x-default": "/portofoliu",
    },
  },
};

export default function Portofoliu() {
  return (
    <>
      <SiteHeader />
      <main>
        <PortofoliuPage />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
