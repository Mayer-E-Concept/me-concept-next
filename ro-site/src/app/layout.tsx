import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ME-Concept — Instalații Electrice de Calitate",
  description:
    "Proiectare și execuție instalații electrice. Profesionalism, precizie, calitate garantată.",
  alternates: {
    canonical: "/",
    languages: {
      ro: "/",
      de: "https://me-concept.de/",
      "x-default": "/",
    },
  },
  openGraph: {
    siteName: "Mayer E-Concept",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
