import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { AREAS_SIBIU, BUSINESS } from "@/lib/business";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { AboutSection } from "@/components/about-section";
import { ReferencesSection } from "@/components/references-section";
import { ProcessSection } from "@/components/process-section";
import { ServicesSection } from "@/components/services-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn } from "@/components/fade-in";
import { PreviewCardsSection } from "@/components/preview-cards-section";

const OG_IMAGE = `${SITE_URL}/uploads/me-concept-proiectare-instalatii-electrice-romania.jpg`;

export const metadata: Metadata = {
  title: "ME-Concept — Proiectare și execuție instalații electrice | Sibiu",
  description:
    "Proiectare și execuție instalații electrice în Sibiu: case, spații comerciale și industriale, fotovoltaice și stații de încărcare. Atestat ANRE, ISO 9001:2015.",
  openGraph: {
    title: "ME-Concept — Proiectare Instalații Electrice",
    description:
      "Proiectare instalații electrice pentru construcții rezidențiale și comerciale. Atestat ANRE, ISO 9001:2015.",
    url: `${SITE_URL}/`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Mayer E-Concept — Proiectare instalații electrice" }],
    type: "website",
    locale: "ro_RO",
    siteName: "Mayer E-Concept",
  },
  twitter: {
    card: "summary_large_image",
    title: "ME-Concept — Proiectare Instalații Electrice",
    description: "Proiectare instalații electrice profesionistă. Atestat ANRE, ISO 9001:2015.",
    images: [OG_IMAGE],
  },
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  "@id": `${SITE_URL}/#business`,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  description:
    "Proiectare și execuție instalații electrice în Sibiu și împrejurimi: case, spații comerciale și industriale, fotovoltaice și stații de încărcare. Atestat ANRE, ISO 9001:2015.",
  url: SITE_URL,
  telephone: BUSINESS.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    addressCountry: BUSINESS.country,
  },
  areaServed: AREAS_SIBIU.map((name) => ({ "@type": "City", name })),
  knowsAbout: ["Instalații electrice", "Proiectare instalații electrice", "Panouri fotovoltaice", "Stații de încărcare", "Casă inteligentă"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  image: OG_IMAGE,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <SiteHeader />
      <main>
        <HeroSection />
        <FadeIn><AboutSection /></FadeIn>
        <PreviewCardsSection
          id="executie"
          eyebrow="Execuție · Sibiu și împrejurimi"
          title="Nu doar proiectăm. Executăm instalația, cu atestat ANRE."
          lead="Din aceeași mână cu proiectul: instalații electrice pentru case, firme și hale, fotovoltaice și stații de încărcare. Alege domeniul și vezi detaliile pe pagina lui."
          cta="Află mai mult"
          cards={[
            {
              title: "Instalații electrice",
              desc: "Case, apartamente, spații comerciale și hale: instalații noi sau renovate, circuite, prize și iluminat.",
              img: "/uploads/Iluminat-Arhitctural.jpg",
              alt: "Casă cu iluminat exterior executat de Mayer E-Concept",
              href: "/instalatii-electrice-sibiu",
              tag: "Execuție",
            },
            {
              title: "Fotovoltaice și stații de încărcare",
              desc: "Sisteme fotovoltaice și wallbox pentru mașina electrică, legate corect în tablou.",
              img: "/uploads/Casa3-3D.jpg",
              alt: "Casă cu panouri fotovoltaice pe acoperiș",
              href: "/panouri-fotovoltaice-sibiu",
              tag: "Execuție",
            },
            {
              title: "Tablouri electrice și modernizare",
              desc: "Tablou nou sau înlocuirea celui vechi. Verificăm instalația existentă și schimbăm doar ce trebuie.",
              img: "/uploads/Automatizare.jpg",
              alt: "Tablou electric executat de Mayer E-Concept",
              href: "/instalatii-electrice-sibiu",
              tag: "Execuție",
            },
          ]}
        />
        <FadeIn><ProcessSection /></FadeIn>
        <FadeIn><ExpertiseSection /></FadeIn>
        <FadeIn><ReferencesSection /></FadeIn>
        <FadeIn><ServicesSection /></FadeIn>
        <PreviewCardsSection
          id="aplicatii"
          eyebrow="Software propriu"
          title="Instrumente dezvoltate de noi, pentru alții"
          lead="Pe lângă proiectare și execuție, vrem să-i ajutăm și pe alții să se dezvolte. Ce am construit din propria experiență, pentru munca noastră de zi cu zi, împărtășim mai departe."
          cta="Vezi detalii"
          cards={[
            {
              title: "ElecTriX",
              desc: "Suită de instrumente Revit pentru echipe de instalații electrice: circuite, niveluri, familii și coordonarea echipei, direct în model.",
              img: "/uploads/Revit.png",
              alt: "Model de instalații electrice în Revit",
              href: "/electrix",
              tag: "Add-in Revit",
              imgPos: "left center",
            },
            {
              title: "ElectroGrad",
              desc: "Aplicație mobilă pentru pregătirea examenului de autorizare a electricienilor ANRE, gradele I până la IVB.",
              img: "/uploads/electrograd/feature.png",
              alt: "ElectroGrad, aplicație pentru examenul de autorizare electrician ANRE",
              href: "/electrograd",
              tag: "Aplicație mobilă",
            },
          ]}
        />
        <FadeIn><ContactSection /></FadeIn>
      </main>
      <SiteFooter />
    </>
  );
}
