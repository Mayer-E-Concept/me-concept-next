import type { Metadata } from "next";
import { Manrope, Inter, Oxanium, Barlow, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Petrol hero redesign (see design_handoff_website_petrol/PROMPT.md)
const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const OG_IMAGE = `${SITE_URL}/uploads/me-concept-proiectare-instalatii-electrice-romania.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ME-Concept — Qualitative Elektroplanung",
  description:
    "Elektroplanung für Wohn- und Gewerbeprojekte. Professionalität, Präzision, garantierte Qualität. ISO 9001:2015 zertifiziert.",
  alternates: {
    canonical: "/",
    languages: {
      ro: "https://me-concept.ro/",
      de: "/",
      "x-default": "https://me-concept.ro/",
    },
  },
  openGraph: {
    title: "ME-Concept — Qualitative Elektroplanung",
    description:
      "Elektroplanung für Wohn- und Gewerbeprojekte. Professionalität, Präzision, garantierte Qualität.",
    url: `${SITE_URL}/`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Mayer E-Concept — Elektroplanung" }],
    type: "website",
    locale: "de_DE",
    siteName: "Mayer E-Concept",
  },
  twitter: {
    card: "summary_large_image",
    title: "ME-Concept — Qualitative Elektroplanung",
    description: "Professionelle Elektroplanung. ANRE-zertifiziert, ISO 9001:2015.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${inter.variable} ${oxanium.variable} ${barlow.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
