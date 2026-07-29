import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { SiteHeaderDe } from "@/components/site-header";
import { SiteFooterDe } from "@/components/site-footer";
import { ElecTriXPageDe } from "@/components/electrix-page";

export const metadata: Metadata = {
  title: "ElecTriX — Revit Add-in für Elektroteams | Mayer E-Concept",
  description:
    "ElecTriX: Suite aus 11+ Revit-Werkzeugen für Stromkreis-Kennzeichnung, Ebenen-Verwaltung, Familienplatzierung und Teamkoordination. Revit 2025 & 2026.",
  alternates: {
    canonical: "/electrix",
  },
  openGraph: {
    title: "ElecTriX — Revit Add-in für Elektroteams",
    description: "Suite aus 11+ Revit-Werkzeugen für elektrische Dokumentation: Stromkreise, Ebenen, Familien, Teamkoordination.",
    url: `${SITE_URL}/electrix`,
    type: "website",
    locale: "de_DE",
    siteName: "Mayer E-Concept",
  },
  twitter: {
    card: "summary_large_image",
    title: "ElecTriX — Revit Add-in für Elektroteams",
    description: "Suite aus 11+ Revit-Werkzeugen für elektrische Dokumentation: Stromkreise, Ebenen, Familien, Teamkoordination.",
  },
};

export default function ElecTriXDe() {
  return (
    <>
      <SiteHeaderDe />
      <main>
        <ElecTriXPageDe />
      </main>
      <SiteFooterDe />
    </>
  );
}
