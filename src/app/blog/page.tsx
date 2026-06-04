import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactSection } from "@/components/contact-section";
import { BlogPage } from "@/components/blog-page";

const OG_IMAGE = `${SITE_URL}/uploads/me-concept-proiectare-instalatii-electrice-romania.jpg`;

export const metadata: Metadata = {
  title: "Blog — Mayer E-Concept | Proiectare instalații electrice",
  description:
    "Articole despre proiectarea instalațiilor electrice, sfaturi pentru alegerea unui proiectant, noutăți din domeniu.",
  alternates: {
    canonical: "/blog",
    languages: {
      ro: "/blog",
      de: "/de/blog",
      "x-default": "/blog",
    },
  },
  openGraph: {
    title: "Blog — Mayer E-Concept",
    description:
      "Articole despre proiectarea instalațiilor electrice, sfaturi pentru alegerea unui proiectant.",
    url: `${SITE_URL}/blog`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Blog Mayer E-Concept" }],
    type: "website",
    locale: "ro_RO",
    siteName: "Mayer E-Concept",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Mayer E-Concept",
    description: "Articole despre proiectarea instalațiilor electrice.",
    images: [OG_IMAGE],
  },
};

export default function Blog() {
  return (
    <>
      <SiteHeader />
      <main>
        <BlogPage />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
