import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { ElectroGradPage } from "@/components/electrograd-page";

const TITLE = "ElectroGrad | App für die ANRE-Zulassungsprüfung für Elektriker";
const DESCRIPTION =
  "ElectroGrad: fast 1.600 Fragen, Prüfungssimulation und Leitfaden für die Zulassungsprüfung der Elektriker bei der rumänischen ANRE, Grade I bis IVB. Unabhängige App von Mayer E-Concept.";
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
    locale: "de_DE",
    siteName: "Mayer E-Concept",
  },
};

export default function ElectroGrad() {
  return <ElectroGradPage />;
}
