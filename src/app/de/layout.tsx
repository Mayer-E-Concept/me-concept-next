import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ME-Concept — Qualitative Elektroplanung",
  description:
    "Elektroplanung für Wohn- und Gewerbeprojekte. Professionalität, Präzision, garantierte Qualität. ISO 9001:2015 zertifiziert.",
  alternates: {
    canonical: "/de",
    languages: {
      ro: "/",
      de: "/de",
      "x-default": "/",
    },
  },
};

export default function DeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
