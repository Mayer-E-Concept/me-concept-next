import type { Metadata } from "next";
import { SiteHeaderDe } from "@/components/de/site-header";
import { SiteFooterDe } from "@/components/de/site-footer";
import { ContactSectionDe } from "@/components/de/contact-section";
import { BlogPageDe } from "@/components/de/blog-page";

export const metadata: Metadata = {
  title: "Blog — Mayer E-Concept | Elektroplanung",
  description:
    "Artikel über Elektroplanung, Ratgeber für die Wahl eines Elektroingenieurs und Neuigkeiten aus der Branche.",
  alternates: {
    canonical: "/de/blog",
    languages: {
      ro: "/blog",
      de: "/de/blog",
      "x-default": "/blog",
    },
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
