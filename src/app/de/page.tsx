import { SiteHeaderDe } from "@/components/de/site-header";
import { HeroSectionDe } from "@/components/de/hero-section";
import { FeaturesSectionDe } from "@/components/de/features-section";
import { TrustSectionDe } from "@/components/de/trust-section";
import { SpecialistsSectionDe } from "@/components/de/specialists-section";
import { ServicesSectionDe } from "@/components/de/services-section";
import { ContactSectionDe } from "@/components/de/contact-section";
import { SiteFooterDe } from "@/components/de/site-footer";

export default function HomeDe() {
  return (
    <>
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
