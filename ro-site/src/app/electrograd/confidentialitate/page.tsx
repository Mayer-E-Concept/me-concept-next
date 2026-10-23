import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "ElectroGrad — Politică de confidențialitate",
  description:
    "Politica de confidențialitate a aplicației mobile ElectroGrad (Mayer E-Concept S.R.L.) pentru pregătirea examenului de autorizare a electricienilor ANRE: ce date prelucrăm și drepturile dvs. conform GDPR.",
  alternates: {
    canonical: "/electrograd/confidentialitate",
  },
};

// Politica de confidențialitate a aplicației ElectroGrad (cerută de Google Play / App Store)
export default function ElectroGradConfidentialitate() {
  return (
    <LegalPage
      title="ElectroGrad — Politică de confidențialitate"
      lastUpdated="Actualizată ultima dată pe 23 octombrie 2026 | Aplicația mobilă ElectroGrad (Android / iOS) | Conformă GDPR (Reg. UE 2016/679)"
      sections={[
        {
          title: "1. Operatorul de date",
          content:
            "Aplicația ElectroGrad este oferită de MAYER E-CONCEPT S.R.L., cu sediul în Str. Atena, Nr. 5, Ap. 1, Sibiu, Județul Sibiu, România, CUI RO45533577 („noi”). Pentru orice întrebare privind datele dvs. ne puteți scrie la contact@me-concept.ro sau ne puteți suna la +40 752 099 791.",
        },
        {
          title: "2. Ce face aplicația",
          content:
            "ElectroGrad ajută la pregătirea examenului de autorizare a electricienilor organizat de ANRE (gradele I – IV): întrebări de exersare, simulări de examen, statistici de progres și informații despre sesiunile de examen. Aplicația nu necesită cont și funcționează și fără internet. ElectroGrad este o aplicație independentă și nu este afiliată cu ANRE.",
        },
        {
          title: "3. Ce date prelucrăm",
          content: "",
          subsections: [
            {
              title: "3.1 Date salvate pe telefon",
              content:
                "Gradul ales, progresul la întrebări, bifele din lista de acte, numele căutat la „Statusul meu”, rezultatele simulărilor, tema de afișare. Aceste date rămân pe telefonul dvs. și nu ne sunt transmise nouă (pentru numele căutat la ANRE vezi 3.4).",
            },
            {
              title: "3.2 Achiziții (doar dacă cumpărați un pass)",
              content:
                "Plata pentru accesul complet se face exclusiv prin Google Play sau App Store; noi nu primim și nu stocăm datele cardului. Pentru verificarea achiziției și a perioadei de acces folosim serviciul RevenueCat (RevenueCat, Inc., SUA), care primește de la magazin un identificator anonim al aplicației, produsul cumpărat, data și starea tranzacției. Nu primim numele, adresa de e-mail sau alte date de identificare.",
            },
            {
              title: "3.3 Actualizări ale conținutului",
              content:
                "La pornire, aplicația verifică dacă există o versiune nouă a conținutului (întrebări, răspunsuri, corecturi) pe serverele furnizorului tehnic Expo (650 Industries, Inc., SUA). Pentru aceasta se transmit doar date tehnice necesare conexiunii (versiunea aplicației, platforma, adresa IP). Nu se transmite progresul dvs. și nici alte date personale.",
            },
            {
              title: "3.4 Verificarea statusului la ANRE (doar dacă o folosiți)",
              content:
                "Când apăsați „Verifică statusul”, aplicația trimite numele introdus direct de pe telefon către portalul public al ANRE (spv.anre.ro), pentru a-l căuta în listele publice de candidați și în Registrul electricienilor autorizați. Numele nu trece prin serverele noastre și nu îl primim. Pentru ușurință, ultimul nume căutat se păstrează doar pe telefon și îl puteți șterge oricând din aplicație. Pentru prelucrarea pe portalul său, ANRE este operator separat.",
            },
          ],
        },
        {
          title: "4. Scopul și temeiul legal",
          content: [
            "Furnizarea funcțiilor aplicației și a actualizărilor de conținut – Art. 6(1)(b) GDPR, executarea contractului de utilizare.",
            "Verificarea achizițiilor și acordarea accesului complet – Art. 6(1)(b) GDPR.",
            "Căutarea statusului la ANRE, la cererea dvs. – Art. 6(1)(b) GDPR.",
            "Nu folosim datele pentru publicitate, nu facem profilare și nu vindem date. Aplicația nu conține reclame și nici instrumente de urmărire (tracking).",
          ],
        },
        {
          title: "5. Cui transmitem datele",
          content:
            "Datele nu sunt transmise terților, cu excepția furnizorilor tehnici menționați mai sus (Google / Apple pentru plată, RevenueCat pentru verificarea achiziției, Expo pentru actualizări), care acționează ca persoane împuternicite, a ANRE (doar numele căutat, la cererea dvs., vezi 3.4) și a cazurilor prevăzute de lege. Transferul către furnizorii din SUA se face pe baza clauzelor contractuale standard ale UE.",
        },
        {
          title: "6. Cât timp păstrăm datele",
          content: [
            "Datele de pe telefon: până le ștergeți din aplicație („Progres” → „Resetează progresul”) sau dezinstalați aplicația.",
            "Datele despre achiziții: cât timp este necesar pentru acordarea accesului și conform obligațiilor legale contabile ale magazinului (Google / Apple).",
          ],
        },
        {
          title: "7. Drepturile dvs.",
          content: [
            "Dreptul de acces, la rectificare și la ștergere (Art. 15–17 GDPR).",
            "Dreptul la restricționarea prelucrării și la portabilitatea datelor (Art. 18, 20 GDPR).",
            "Dreptul de opoziție (Art. 21 GDPR).",
            "Pentru exercitarea drepturilor scrieți-ne la contact@me-concept.ro. Răspundem în cel mult 30 de zile.",
            "Aveți dreptul să depuneți plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), B-dul G-ral. Gheorghe Magheru 28-30, sector 1, București, anspdcp@dataprotection.ro.",
          ],
        },
        {
          title: "8. Copii",
          content:
            "Aplicația este destinată pregătirii profesionale și nu se adresează persoanelor sub 16 ani.",
        },
        {
          title: "9. Modificări",
          content:
            "Dacă vom introduce funcții care prelucrează date personale suplimentare (de ex. notificări privind data examenului), vom actualiza această politică înainte de lansarea lor. Versiunea curentă este întotdeauna disponibilă pe această pagină, cu data ultimei actualizări.",
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
