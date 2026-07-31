import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ElecTriXPage } from "@/components/electrix-page";

export const metadata: Metadata = {
  title: "ElecTriX — Add-in Revit pentru echipe electrice | Mayer E-Concept",
  description:
    "ElecTriX: suită de 11+ instrumente Revit pentru plasare automată de familii, iluminat, etichetare de circuite și coordonare de echipă. Revit 2025 & 2026.",
  alternates: {
    canonical: "/electrix",
  },
  openGraph: {
    title: "ElecTriX — Add-in Revit pentru echipe electrice",
    description: "Suită de 11+ instrumente Revit pentru echipe MEP: plasare familii, iluminat, niveluri, circuite, coordonare de echipă.",
    url: `${SITE_URL}/electrix`,
    type: "website",
    locale: "ro_RO",
    siteName: "Mayer E-Concept",
  },
  twitter: {
    card: "summary_large_image",
    title: "ElecTriX — Add-in Revit pentru echipe electrice",
    description: "Suită de 11+ instrumente Revit pentru echipe MEP: plasare familii, iluminat, niveluri, circuite, coordonare de echipă.",
  },
};

export default function ElecTriXRo() {
  return (
    <>
      <SiteHeader />
      <main>
        <ElecTriXPage />
      </main>
      <SiteFooter />
    </>
  );
}
