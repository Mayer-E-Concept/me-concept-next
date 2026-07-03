import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TeamSection } from "@/components/team-section";
import { ContactSection } from "@/components/contact-section";

const OG_IMAGE = `${SITE_URL}/uploads/echipa-159-duotone.jpg`;

export const metadata: Metadata = {
  title: "Echipa noastră — Mayer E-Concept",
  description:
    "Cunoaște echipa Mayer E-Concept: ingineri proiectanți, manageri de proiect și colaboratori din spatele proiectelor de instalații electrice.",
  alternates: {
    canonical: "/echipa-noastra",
    languages: {
      ro: "/echipa-noastra",
      de: "/de/unser-team",
      "x-default": "/echipa-noastra",
    },
  },
  openGraph: {
    title: "Echipa noastră — Mayer E-Concept",
    description:
      "Cunoaște echipa Mayer E-Concept: ingineri proiectanți, manageri de proiect și colaboratori.",
    url: `${SITE_URL}/echipa-noastra`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Echipa Mayer E-Concept" }],
    type: "website",
    locale: "ro_RO",
    siteName: "Mayer E-Concept",
  },
  twitter: {
    card: "summary_large_image",
    title: "Echipa noastră — Mayer E-Concept",
    description: "Cunoaște echipa Mayer E-Concept.",
    images: [OG_IMAGE],
  },
};

export default function EchipaNoastra() {
  return (
    <>
      <SiteHeader />
      <main>
        <TeamSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
