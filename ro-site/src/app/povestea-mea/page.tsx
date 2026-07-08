import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { StoryPage } from "@/components/story-page";

const OG_IMAGE = `${SITE_URL}/uploads/poveste.jpg`;

export const metadata: Metadata = {
  title: "Povestea mea — Mayer E-Concept",
  description:
    "Povestea lui Martin Mayer: de la electrician la antreprenor, între Germania și România.",
  alternates: {
    canonical: "/povestea-mea",
    languages: {
      ro: "/povestea-mea",
      de: "https://me-concept.de/meine-geschichte",
      "x-default": "/povestea-mea",
    },
  },
  openGraph: {
    title: "Povestea mea — Mayer E-Concept",
    description:
      "De la electrician la antreprenor, între Germania și România.",
    url: `${SITE_URL}/povestea-mea`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Martin Mayer" }],
    type: "website",
    locale: "ro_RO",
    siteName: "Mayer E-Concept",
  },
  twitter: {
    card: "summary_large_image",
    title: "Povestea mea — Mayer E-Concept",
    description: "De la electrician la antreprenor, între Germania și România.",
    images: [OG_IMAGE],
  },
};

export default function PovesteaMea() {
  return <StoryPage />;
}
