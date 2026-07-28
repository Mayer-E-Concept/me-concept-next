import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MeToolsPage } from "@/components/me-tools-page";

export const metadata: Metadata = {
  title: "ME-Tools (ElecTriX) — Add-in Revit pentru echipe electrice | Mayer E-Concept",
  description:
    "ME-Tools (ribbon ElecTriX): suită de 11+ instrumente Revit pentru etichetare de circuite, gestionare niveluri, plasare familii și coordonare de echipă. Revit 2025 & 2026.",
  alternates: {
    canonical: "/me-tools",
  },
  openGraph: {
    title: "ME-Tools (ElecTriX) — Add-in Revit pentru echipe electrice",
    description: "Suită de 11+ instrumente Revit pentru documentație electrică: circuite, niveluri, familii, coordonare de echipă.",
    url: `${SITE_URL}/me-tools`,
    type: "website",
    locale: "ro_RO",
    siteName: "Mayer E-Concept",
  },
  twitter: {
    card: "summary_large_image",
    title: "ME-Tools (ElecTriX) — Add-in Revit pentru echipe electrice",
    description: "Suită de 11+ instrumente Revit pentru documentație electrică: circuite, niveluri, familii, coordonare de echipă.",
  },
};

export default function MeTools() {
  return (
    <>
      <SiteHeader />
      <main>
        <MeToolsPage />
      </main>
      <SiteFooter />
    </>
  );
}
