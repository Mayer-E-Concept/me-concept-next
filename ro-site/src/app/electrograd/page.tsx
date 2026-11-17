import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { ElectroGradPage } from "@/components/electrograd-page";

const TITLE = "ElectroGrad | Aplicație pentru examenul de autorizare electrician ANRE";
const DESCRIPTION =
  "ElectroGrad: aproape 1.600 de întrebări, simulare de examen și ghid pentru examenul de autorizare a electricienilor ANRE, gradele I până la IVB. Aplicație independentă, realizată de Mayer E-Concept.";
const OG_IMAGE = `${SITE_URL}/uploads/electrograd/feature.png`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/electrograd" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/electrograd`,
    images: [{ url: OG_IMAGE, width: 1024, height: 500, alt: "ElectroGrad" }],
    type: "website",
    locale: "ro_RO",
    siteName: "Mayer E-Concept",
  },
};

export default function ElectroGrad() {
  return <ElectroGradPage />;
}
