import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
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

const OG_IMAGE = `${SITE_URL}/uploads/me-concept-proiectare-instalatii-electrice-romania.jpg`;

export const metadata: Metadata = {
  title: "ME-Concept — Proiectare Instalații Electrice | Sibiu & Germania",
  description:
    "Proiectare instalații electrice pentru construcții rezidențiale și comerciale. Atestat ANRE, ISO 9001:2015, expertiză BIM Revit. Sibiu & Germania.",
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
  "@type": "LocalBusiness",
  name: "Mayer E-Concept",
  url: SITE_URL,
  telephone: "+40752129500",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Strada Măslinului nr. 9",
    addressLocality: "Sibiu",
    addressCountry: "RO",
  },
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
        <FadeIn><ExpertiseSection /></FadeIn>
        <FadeIn><ProcessSection /></FadeIn>
        <FadeIn><AboutSection /></FadeIn>
        <FadeIn><ReferencesSection /></FadeIn>
        <FadeIn><ServicesSection /></FadeIn>
        <FadeIn><ContactSection /></FadeIn>
      </main>
      <SiteFooter />
    </>
  );
}
