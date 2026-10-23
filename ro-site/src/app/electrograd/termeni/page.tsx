import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "ElectroGrad — Termeni și condiții",
  description:
    "Termenii și condițiile de utilizare ale aplicației mobile ElectroGrad (Mayer E-Concept S.R.L.) pentru pregătirea examenului de autorizare a electricienilor ANRE.",
  alternates: {
    canonical: "/electrograd/termeni",
  },
};

// Termenii de utilizare ai aplicației ElectroGrad (legați din aplicație: Setări și pagina de cumpărare)
export default function ElectroGradTermeni() {
  return (
    <LegalPage
      title="ElectroGrad — Termeni și condiții"
      lastUpdated="Actualizați ultima dată pe 23 octombrie 2026 | Aplicația mobilă ElectroGrad (Android / iOS)"
      sections={[
        {
          title: "1. Cine oferă aplicația",
          content:
            "Aplicația ElectroGrad este oferită de MAYER E-CONCEPT S.R.L., Str. Atena, Nr. 5, Ap. 1, Sibiu, Județul Sibiu, România, CUI RO45533577 („noi”). Prin instalarea și folosirea aplicației acceptați acești termeni.",
        },
        {
          title: "2. Ce este ElectroGrad",
          content:
            "ElectroGrad este un instrument de învățare pentru pregătirea examenului de autorizare a electricienilor. Aplicația este independentă: nu este a ANRE, nu este afiliată cu ANRE și nu vorbește în numele ANRE. Singurele surse oficiale sunt ANRE (anre.ro, spv.anre.ro) și legislația publicată în Monitorul Oficial.",
        },
        {
          title: "3. Întrebări și răspunsuri – fără garanție",
          content: [
            "Întrebările provin din exemplele publicate de ANRE. ANRE nu publică răspunsurile corecte; răspunsurile și explicațiile din aplicație au fost stabilite de noi, pe baza normativelor și a legilor în vigoare și a altor surse, cu toată grija.",
            "Cu toate acestea, unele răspunsuri sau explicații pot fi greșite, incomplete sau depășite (de exemplu după modificarea unei legi sau a unui normativ). Răspunsurile încă neconfirmate sunt marcate în aplicație.",
            "Nu garantăm promovarea examenului și nici corectitudinea fiecărui răspuns. La examen contează exclusiv baremul ANRE.",
          ],
        },
        {
          title: "4. Ghidul și verificarea statusului",
          content: [
            "Informațiile despre sesiuni, termene, taxe, acte și condiții sunt rezumate pe înțelesul tuturor din surse publice și pot fi simplificate sau se pot schimba între timp. Înainte de orice pas (înscriere, plată, depunerea dosarului, contestație) verificați întotdeauna anunțul oficial ANRE.",
            "Funcția „Statusul meu” afișează datele din listele publice ale ANRE așa cum sunt publicate de ANRE. Nu răspundem pentru conținutul, actualitatea sau disponibilitatea acestor liste. Explicațiile afișate lângă status sunt orientative; decisivă este comunicarea ANRE din contul dvs. de pe portal.",
          ],
        },
        {
          title: "5. Limitarea răspunderii",
          content: [
            "În măsura permisă de lege, nu răspundem pentru pagube rezultate din folosirea aplicației, în special din răspunsuri sau explicații greșite, din nepromovarea examenului, din termene ratate, din dosare incomplete sau din decizii luate pe baza informațiilor din aplicație.",
            "Dacă totuși răspundem, răspunderea noastră este limitată la suma plătită de dvs. pentru aplicație în ultimele 12 luni.",
            "Aceste limitări nu se aplică în caz de intenție sau culpă gravă, în caz de deces ori de vătămare a integrității corporale sau a sănătății și nici acolo unde legea nu permite limitarea răspunderii. Drepturile pe care vi le conferă legislația privind protecția consumatorilor nu sunt afectate.",
          ],
        },
        {
          title: "6. Acces complet și plată",
          content: [
            "O parte a conținutului este gratuită. Accesul complet se cumpără ca pass pe o perioadă fixă, exclusiv prin Google Play sau App Store, la prețul afișat în magazin. Pass-ul nu se reînnoiește automat.",
            "Pentru plată, anulare și rambursare se aplică regulile magazinului (Google Play / App Store). Cumpărarea unui pass nu este o garanție de promovare.",
          ],
        },
        {
          title: "7. Ajutor la dosar",
          content:
            "Serviciul „Ajutor la dosar” (asistență la pregătirea dosarului) nu face parte din aplicație. Se oferă separat, pe baza unei oferte individuale, iar răspunderea pentru depunerea dosarului și pentru datele declarate rămâne a candidatului.",
        },
        {
          title: "8. Drepturi de autor",
          content:
            "Textele explicative, desenele, structura și designul aplicației ne aparțin. Copierea sau publicarea lor fără acordul nostru scris nu este permisă. Textele oficiale (întrebări ANRE, legi, normative) aparțin autorilor lor.",
        },
        {
          title: "9. Modificări",
          content:
            "Putem actualiza aplicația, conținutul și acești termeni. Versiunea curentă este întotdeauna pe această pagină, cu data ultimei actualizări.",
        },
        {
          title: "10. Legea aplicabilă",
          content:
            "Se aplică legea română. Pentru reclamații ne puteți scrie la contact@me-concept.ro. Ca consumator vă puteți adresa și Autorității Naționale pentru Protecția Consumatorilor (ANPC) sau instanței competente.",
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
