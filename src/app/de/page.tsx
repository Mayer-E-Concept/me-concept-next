import { SITE_URL } from "@/lib/site";
import { SiteHeaderDe } from "@/components/de/site-header";
import { HeroSectionDe } from "@/components/de/hero-section";
import { FeaturesSectionDe } from "@/components/de/features-section";
import { TrustSectionDe } from "@/components/de/trust-section";
import { SpecialistsSectionDe } from "@/components/de/specialists-section";
import { ServicesSectionDe } from "@/components/de/services-section";
import { ContactSectionDe } from "@/components/de/contact-section";
import { SiteFooterDe } from "@/components/de/site-footer";

const orgLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Mayer E-Concept",
  url: `${SITE_URL}/de`,
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
        <FeaturesSectionDe />
        <TrustSectionDe />
        <SpecialistsSectionDe />
        <ServicesSectionDe />
        <ContactSectionDe />
      </main>
      <SiteFooterDe />
    </>
  );
}
