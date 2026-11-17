import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { SiteHeaderDe } from "@/components/site-header";
import { SiteFooterDe } from "@/components/site-footer";
import { ProcessSectionDe } from "@/components/process-section";
import { ExpertiseSectionDe } from "@/components/expertise-section";
import { ServicesSectionDe } from "@/components/services-section";
import { ContactSectionDe } from "@/components/contact-section";
import { FadeIn } from "@/components/fade-in";
import { SL_CSS } from "@/components/service-landing";

const PATH = "/elektroplanung";
const TITLE = "Elektroplanung in BIM mit Revit | ME-Concept";
const DESCRIPTION =
  "Elektroplanung für Wohn-, Gewerbe- und Industriegebäude in Deutschland und Rumänien. Vollständige Dokumentation in BIM mit Revit, nach HOAI, DIN und VDE. ISO 9001:2015.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    type: "website",
    locale: "de_DE",
    siteName: "Mayer E-Concept",
  },
};

// Planungsseite: Prozess, Fachbereiche und Leistungen, von der Startseite hierher verschoben.
export default function Elektroplanung() {
  return (
    <>
      <style>{SL_CSS}</style>
      <SiteHeaderDe />
      <main>
        <section className="sl-hero" style={{ minHeight: "min(64vh, 620px)", color: "#F2FBFC" }}>
          <Image
            src="/uploads/blog-ghid.jpg"
            alt="Planer von Mayer E-Concept arbeitet in Revit an einem Gebäudemodell"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="sl-hero-shade" />
          <div className="sl-wrap" style={{ width: "100%", paddingTop: 140, paddingBottom: "clamp(40px,6vw,72px)" }}>
            <p className="sl-eyebrow">Elektroplanung · Deutschland und Rumänien</p>
            <h1 className="sl-h1" style={{ maxWidth: "18ch" }}>
              Elektroplanung <em>in BIM</em>.
            </h1>
            <p className="sl-lead">
              Komplette Elektroplanung für Wohn-, Gewerbe- und Industriegebäude. Wir arbeiten in Revit mit koordinierten 3D-Modellen, nach HOAI, DIN und VDE.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link href="#contact" className="sl-btn sl-btn-main">
                Beratung anfragen
              </Link>
              <Link href="/portofoliu" className="sl-btn sl-btn-ghost">
                Portfolio ansehen →
              </Link>
            </div>
          </div>
        </section>
        <FadeIn><ProcessSectionDe /></FadeIn>
        <FadeIn><ExpertiseSectionDe /></FadeIn>
        <FadeIn><ServicesSectionDe /></FadeIn>
        <FadeIn><ContactSectionDe /></FadeIn>
      </main>
      <SiteFooterDe />
    </>
  );
}
