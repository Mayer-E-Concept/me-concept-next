import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { SiteHeaderDe } from "@/components/site-header";
import { SiteFooterDe } from "@/components/site-footer";
import { MeToolsPageDe } from "@/components/me-tools-page";

export const metadata: Metadata = {
  title: "ME-Tools (ElecTriX) — Revit Add-in für Elektroteams | Mayer E-Concept",
  description:
    "ME-Tools (Ribbon ElecTriX): Suite aus 11+ Revit-Werkzeugen für Stromkreis-Kennzeichnung, Ebenen-Verwaltung, Familienplatzierung und Teamkoordination. Revit 2025 & 2026.",
  alternates: {
    canonical: "/me-tools",
  },
  openGraph: {
    title: "ME-Tools (ElecTriX) — Revit Add-in für Elektroteams",
    description: "Suite aus 11+ Revit-Werkzeugen für elektrische Dokumentation: Stromkreise, Ebenen, Familien, Teamkoordination.",
    url: `${SITE_URL}/me-tools`,
    type: "website",
    locale: "de_DE",
    siteName: "Mayer E-Concept",
  },
  twitter: {
    card: "summary_large_image",
    title: "ME-Tools (ElecTriX) — Revit Add-in für Elektroteams",
    description: "Suite aus 11+ Revit-Werkzeugen für elektrische Dokumentation: Stromkreise, Ebenen, Familien, Teamkoordination.",
  },
};

export default function MeToolsDe() {
  return (
    <>
      <SiteHeaderDe />
      <main>
        <MeToolsPageDe />
      </main>
      <SiteFooterDe />
    </>
  );
}
