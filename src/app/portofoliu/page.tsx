import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactSection } from "@/components/contact-section";
import { PortofoliuPage } from "@/components/portofoliu-page";

const OG_IMAGE = `${SITE_URL}/uploads/PROIECTARE-INSTALATII-ELECTRICE.jpg`;

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
  openGraph: {
    title: "Portofoliu — Mayer E-Concept",
    description:
      "Proiecte de instalații electrice: rezidențiale, comerciale, industriale. BIM Revit, KNX, iluminat arhitectural.",
    url: `${SITE_URL}/portofoliu`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Portofoliu proiecte instalații electrice" }],
    type: "website",
    locale: "ro_RO",
    siteName: "Mayer E-Concept",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portofoliu — Mayer E-Concept",
    description: "Proiecte instalații electrice: rezidențiale, comerciale, industriale.",
    images: [OG_IMAGE],
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
