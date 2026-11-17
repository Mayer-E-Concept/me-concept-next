import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { AREAS_SIBIU, BUSINESS } from "@/lib/business";
import { SiteHeader } from "@/components/site-header";
import { AboutSection } from "@/components/about-section";
import { ReferencesSection } from "@/components/references-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn } from "@/components/fade-in";
import { HomeLanding, HomeApps } from "@/components/home-landing";

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
        <HomeLanding />
        <FadeIn><AboutSection /></FadeIn>
        <FadeIn><ReferencesSection /></FadeIn>
        <HomeApps />
        <FadeIn><ContactSection /></FadeIn>
      </main>
      <SiteFooter />
    </>
  );
}
