import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { StoryPageDe } from "@/components/de/story-page";

const OG_IMAGE = `${SITE_URL}/uploads/poveste.jpg`;

export const metadata: Metadata = {
  title: "Meine Geschichte — Mayer E-Concept",
  description:
    "Die Geschichte von Martin Mayer: vom Elektriker zum Unternehmer, zwischen Deutschland und Rumänien.",
  alternates: {
    canonical: "/de/meine-geschichte",
    languages: {
      ro: "/povestea-mea",
      de: "/de/meine-geschichte",
      "x-default": "/povestea-mea",
    },
  },
  openGraph: {
    title: "Meine Geschichte — Mayer E-Concept",
    description:
      "Vom Elektriker zum Unternehmer, zwischen Deutschland und Rumänien.",
    url: `${SITE_URL}/de/meine-geschichte`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Martin Mayer" }],
    type: "website",
    locale: "de_DE",
    siteName: "Mayer E-Concept",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meine Geschichte — Mayer E-Concept",
    description: "Vom Elektriker zum Unternehmer, zwischen Deutschland und Rumänien.",
    images: [OG_IMAGE],
  },
};

export default function MeineGeschichte() {
  return <StoryPageDe />;
}
