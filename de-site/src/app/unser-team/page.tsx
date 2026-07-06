import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { SiteHeaderDe } from "@/components/site-header";
import { SiteFooterDe } from "@/components/site-footer";
import { TeamSectionDe } from "@/components/team-section";
import { ContactSectionDe } from "@/components/contact-section";

const OG_IMAGE = `${SITE_URL}/uploads/echipa-159-duotone.jpg`;

export const metadata: Metadata = {
  title: "Unser Team — Mayer E-Concept",
  description:
    "Lernen Sie das Team von Mayer E-Concept kennen: Planungsingenieure, Projektmanager und freie Mitarbeiter hinter den Projekten für Elektroinstallationen.",
  alternates: {
    canonical: "/unser-team",
    languages: {
      ro: "https://me-concept.ro/echipa-noastra",
      de: "/unser-team",
      "x-default": "https://me-concept.ro/echipa-noastra",
    },
  },
  openGraph: {
    title: "Unser Team — Mayer E-Concept",
    description:
      "Lernen Sie das Team von Mayer E-Concept kennen: Planungsingenieure, Projektmanager und freie Mitarbeiter.",
    url: `${SITE_URL}/unser-team`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Team Mayer E-Concept" }],
    type: "website",
    locale: "de_DE",
    siteName: "Mayer E-Concept",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unser Team — Mayer E-Concept",
    description: "Lernen Sie das Team von Mayer E-Concept kennen.",
    images: [OG_IMAGE],
  },
};

export default function UnserTeam() {
  return (
    <>
      <SiteHeaderDe />
      <main>
        <TeamSectionDe />
        <ContactSectionDe />
      </main>
      <SiteFooterDe />
    </>
  );
}
