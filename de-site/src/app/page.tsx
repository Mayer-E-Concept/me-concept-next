import { SITE_URL } from "@/lib/site";
import { SiteHeaderDe } from "@/components/site-header";
import { HeroSectionDe } from "@/components/hero-section";
import { ExpertiseSectionDe } from "@/components/expertise-section";
import { AboutSectionDe } from "@/components/about-section";
import { ReferencesSectionDe } from "@/components/references-section";
import { ProcessSectionDe } from "@/components/process-section";
import { ServicesSectionDe } from "@/components/services-section";
import { ContactSectionDe } from "@/components/contact-section";
import { SiteFooterDe } from "@/components/site-footer";
import { FadeIn } from "@/components/fade-in";

const orgLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Mayer E-Concept",
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/uploads/me-concept-proiectare-instalatii-electrice-romania.jpg`,
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
};

export default function HomeDe() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <SiteHeaderDe />
      <main>
        <HeroSectionDe />
        <FadeIn><AboutSectionDe /></FadeIn>
        <FadeIn><ProcessSectionDe /></FadeIn>
        <FadeIn><ExpertiseSectionDe /></FadeIn>
        <FadeIn><ReferencesSectionDe /></FadeIn>
        <FadeIn><ServicesSectionDe /></FadeIn>
        <FadeIn><ContactSectionDe /></FadeIn>
      </main>
      <SiteFooterDe />
    </>
  );
}
