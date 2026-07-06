import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { SiteHeaderDe } from "@/components/site-header";
import { SiteFooterDe } from "@/components/site-footer";
import { ContactSectionDe } from "@/components/contact-section";
import { BlogPageDe } from "@/components/blog-page";

const OG_IMAGE = `${SITE_URL}/uploads/me-concept-proiectare-instalatii-electrice-romania.jpg`;

export const metadata: Metadata = {
  title: "Blog — Mayer E-Concept | Elektroplanung",
  description:
    "Artikel über Elektroplanung, Ratgeber für die Wahl eines Elektroingenieurs und Neuigkeiten aus der Branche.",
  alternates: {
    canonical: "/blog",
    languages: {
      ro: "https://me-concept.ro/blog",
      de: "/blog",
      "x-default": "https://me-concept.ro/blog",
    },
  },
  openGraph: {
    title: "Blog — Mayer E-Concept | Elektroplanung",
    description: "Artikel über Elektroplanung und Ratgeber für die Wahl eines Elektroingenieurs.",
    url: `${SITE_URL}/blog`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Blog Mayer E-Concept Elektroplanung" }],
    type: "website",
    locale: "de_DE",
    siteName: "Mayer E-Concept",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Mayer E-Concept | Elektroplanung",
    description: "Artikel über Elektroplanung.",
    images: [OG_IMAGE],
  },
};

export default function BlogDe() {
  return (
    <>
      <SiteHeaderDe />
      <main>
        <BlogPageDe />
        <ContactSectionDe />
      </main>
      <SiteFooterDe />
    </>
  );
}
