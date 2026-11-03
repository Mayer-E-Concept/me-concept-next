import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "ElectroGrad — Ajutor și contact",
  description:
    "Ajutor pentru aplicația ElectroGrad (Mayer E-Concept S.R.L.): întrebări frecvente despre versiunea completă, restabilirea achiziției, răspunsuri și contact.",
  alternates: {
    canonical: "/electrograd/suport",
  },
};

// Pagina de suport a aplicației ElectroGrad (Support URL pentru App Store / Google Play, legată din Setări)
export default function ElectroGradSuport() {
  return (
    <LegalPage
      title="ElectroGrad — Ajutor și contact"
      lastUpdated="Aplicația mobilă ElectroGrad (Android / iOS) pentru examenul de autorizare a electricienilor ANRE"
      sections={[
        {
          title: "Contact",
          content: [
            "Scrieți-ne la contact@me-concept.ro – răspundem de obicei în 1–2 zile lucrătoare.",
            "Telefon: +40 752 099 791.",
            "Ca să vă putem ajuta repede, spuneți-ne telefonul folosit (Android / iPhone), versiunea aplicației (Setări, jos) și ce s-a întâmplat.",
          ],
        },
        {
          title: "Ce este gratuit și ce aduce versiunea completă?",
          content: [
            "Gratuit: primele 50 de întrebări ale fiecărui grad, împărțite pe capitole, o simulare de examen, ghidul despre examen și verificarea statusului.",
            "Versiunea completă: toate întrebările și simulări nelimitate. Se plătește o singură dată prin Google Play sau App Store – nu este abonament.",
          ],
        },
        {
          title: "Am cumpărat, dar aplicația este tot blocată",
          content: [
            "Deschideți Setări → „Restabilește achiziția”. Folosiți același cont Google / Apple cu care ați cumpărat.",
            "Dacă plata este „în așteptare” (de ex. plată în numerar sau aprobare de la părinte), versiunea completă se deblochează automat după ce magazinul confirmă plata.",
            "Dacă tot nu merge, scrieți-ne cu data achiziției și numărul comenzii din e-mailul de la Google / Apple.",
          ],
        },
        {
          title: "Telefon nou sau aplicație reinstalată",
          content:
            "Achiziția rămâne în contul dvs. de magazin. Instalați aplicația, conectați-vă cu același cont și apăsați „Restabilește achiziția” în Setări. Progresul la întrebări se păstrează doar pe telefon și nu se mută automat.",
        },
        {
          title: "Rambursare",
          content:
            "Plata și rambursarea sunt gestionate de magazin, după regulile lui. Google Play: play.google.com → Plăți și abonamente → Buget și istoric. App Store: reportaproblem.apple.com.",
        },
        {
          title: "Am găsit un răspuns greșit",
          content:
            "ANRE nu publică răspunsurile corecte; răspunsurile din aplicație sunt stabilite de noi, cu grijă, iar cele încă neconfirmate sunt marcate. Dacă credeți că un răspuns este greșit, scrieți-ne gradul și textul întrebării – corectăm prin actualizare, fără să reinstalați aplicația.",
        },
        {
          title: "Aplicația este oficială ANRE?",
          content:
            "Nu. ElectroGrad este o aplicație independentă a Mayer E-Concept S.R.L. și nu este afiliată cu ANRE. Informațiile oficiale sunt doar pe anre.ro și spv.anre.ro.",
        },
        {
          title: "Documente",
          content: [
            "Termeni și condiții: me-concept.ro/electrograd/termeni",
            "Politica de confidențialitate: me-concept.ro/electrograd/confidentialitate",
          ],
        },
      ]}
      contactInfo={{
        company: "Mayer E-Concept S.R.L.",
        address: "Str. Atena, Nr. 5, Ap. 1, Sibiu, Județul Sibiu",
        country: "România",
        website: SITE_URL,
        email: "contact@me-concept.ro",
        phone: "+40 752 099 791",
      }}
    />
  );
}
