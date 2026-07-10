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

// Petrol hero redesign (header/hero only, see design_handoff_website_petrol/PROMPT.md)
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
  title: "ME-Concept — Instalații Electrice de Calitate",
  description:
    "Proiectare și execuție instalații electrice. Profesionalism, precizie, calitate garantată. Certificat ISO 9001:2015.",
  alternates: {
    canonical: "/",
    languages: {
      ro: "/",
      de: "https://me-concept.de/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "ME-Concept — Instalații Electrice de Calitate",
    description:
      "Proiectare și execuție instalații electrice. Profesionalism, precizie, calitate garantată.",
    url: `${SITE_URL}/`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Mayer E-Concept — Proiectare instalații electrice" }],
    type: "website",
    locale: "ro_RO",
    siteName: "Mayer E-Concept",
  },
  twitter: {
    card: "summary_large_image",
    title: "ME-Concept — Instalații Electrice de Calitate",
    description: "Proiectare instalații electrice profesionistă. Atestat ANRE, ISO 9001:2015.",
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
      lang="ro"
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
