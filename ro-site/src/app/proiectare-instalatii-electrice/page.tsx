import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProcessSection } from "@/components/process-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { ServicesSection } from "@/components/services-section";
import { ContactSection } from "@/components/contact-section";
import { FadeIn } from "@/components/fade-in";
import { SL_CSS } from "@/components/service-landing";

const PATH = "/proiectare-instalatii-electrice";
const TITLE = "Proiectare instalații electrice | BIM Revit | ME-Concept Sibiu";
const DESCRIPTION =
  "Proiectare instalații electrice pentru clădiri rezidențiale, comerciale și industriale. Documentație completă în BIM Revit, conform NP-I7 și PE 132. Atestat ANRE, ISO 9001:2015.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    type: "website",
    locale: "ro_RO",
    siteName: "Mayer E-Concept",
  },
};

// Pagina de proiectare: procesul, domeniile de expertiză și serviciile, mutate de pe pagina principală.
export default function Proiectare() {
  return (
    <>
      <style>{SL_CSS}</style>
      <SiteHeader />
      <main>
        <section className="sl-hero" style={{ minHeight: "min(64vh, 620px)", color: "#F2FBFC" }}>
          <Image
            src="/uploads/Plan-Exemplu-2.png"
            alt="Detaliu dintr-un plan de instalații electrice"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="sl-hero-shade" />
          <div className="sl-wrap" style={{ width: "100%", paddingTop: 140, paddingBottom: "clamp(40px,6vw,72px)" }}>
            <p className="sl-eyebrow">Proiectare · România și Germania</p>
            <h1 className="sl-h1" style={{ maxWidth: "18ch" }}>
              Proiectare instalații electrice <em>în BIM</em>.
            </h1>
            <p className="sl-lead">
              Proiect electric complet pentru clădiri rezidențiale, comerciale și industriale. Lucrăm în Revit, cu modele 3D coordonate, conform NP-I7 și PE 132.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link href="#contact" className="sl-btn sl-btn-main">
                Solicită consultanță
              </Link>
              <Link href="/portofoliu" className="sl-btn sl-btn-ghost">
                Vezi portofoliul →
              </Link>
            </div>
          </div>
        </section>
        <FadeIn><ProcessSection /></FadeIn>
        <FadeIn><ExpertiseSection /></FadeIn>
        <FadeIn><ServicesSection /></FadeIn>
        <FadeIn><ContactSection /></FadeIn>
      </main>
      <SiteFooter />
    </>
  );
}
