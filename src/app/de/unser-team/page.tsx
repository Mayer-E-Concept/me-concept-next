import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { SiteHeaderDe } from "@/components/de/site-header";
import { SiteFooterDe } from "@/components/de/site-footer";
import { TeamSectionDe } from "@/components/de/team-section";
import { ContactSectionDe } from "@/components/de/contact-section";

const OG_IMAGE = `${SITE_URL}/uploads/echipa-159-duotone.jpg`;

export const metadata: Metadata = {
  title: "Unser Team — Mayer E-Concept",
  description:
    "Lernen Sie das Team von Mayer E-Concept kennen: Planungsingenieure, Projektmanager und freie Mitarbeiter hinter den Projekten für Elektroinstallationen.",
  alternates: {
    canonical: "/de/unser-team",
    languages: {
      ro: "/echipa-noastra",
      de: "/de/unser-team",
      "x-default": "/echipa-noastra",
    },
  },
  openGraph: {
    title: "Unser Team — Mayer E-Concept",
    description:
      "Lernen Sie das Team von Mayer E-Concept kennen: Planungsingenieure, Projektmanager und freie Mitarbeiter.",
    url: `${SITE_URL}/de/unser-team`,
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
