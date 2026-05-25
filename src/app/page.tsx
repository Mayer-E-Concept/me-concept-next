import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { TrustSection } from "@/components/trust-section";
import { SpecialistsSection } from "@/components/specialists-section";
import { ServicesSection } from "@/components/services-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TrustSection />
        <SpecialistsSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
