import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactSection } from "@/components/contact-section";
import { PortofoliuPage } from "@/components/portofoliu-page";

export const metadata = {
  title: "Portofoliu — Mayer E-Concept | Proiecte instalații electrice",
  description:
    "Portofoliu de proiecte de instalații electrice: rezidențiale, comerciale, industriale. Planificare electrică BIM Revit, automatizare KNX, iluminat tehnic și arhitectural.",
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
