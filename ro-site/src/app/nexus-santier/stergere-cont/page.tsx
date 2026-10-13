import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nexus Șantier — Ștergerea contului și a datelor",
  description:
    "Cum vă ștergeți contul și datele din aplicația Nexus Șantier (Mayer E-Concept S.R.L.): direct din aplicație sau prin e-mail.",
  alternates: {
    canonical: "/nexus-santier/stergere-cont",
  },
};

// Pagina de ștergere a contului – cerută de Google Play pentru aplicațiile cu cont
export default function NexusSantierStergereCont() {
  return (
    <LegalPage
      title="Nexus Șantier — Ștergerea contului și a datelor"
      lastUpdated="Actualizată ultima dată pe 13 octombrie 2026 | Aplicația Nexus Șantier, dezvoltator Mayer E-Concept S.R.L."
      sections={[
        {
          title: "1. Ștergere direct din aplicație (recomandat)",
          content: [
            "Deschideți aplicația Nexus Șantier.",
            "Apăsați pe iconița de profil din dreapta sus.",
            "Derulați la secțiunea „Cont și cloud”.",
            "Apăsați „Șterge contul”, apoi confirmați apăsând încă o dată („Sigur? Șterge definitiv”).",
            "Contul și datele din cloud sunt șterse imediat, iar datele de pe telefon sunt eliminate.",
          ],
        },
        {
          title: "2. Ștergere prin e-mail (fără acces la aplicație)",
          content:
            "Trimiteți un e-mail la contact@me-concept.ro, de pe adresa de e-mail cu care v-ați înregistrat, cu subiectul „Ștergere cont Nexus Șantier”. Pentru siguranță, vă putem cere să confirmați solicitarea. Ștergerea se face în cel mult 30 de zile de la primirea cererii, iar dvs. primiți confirmarea pe e-mail.",
        },
        {
          title: "3. Ce date se șterg",
          content: [
            "Contul (adresa de e-mail și identificatorul contului).",
            "Dacă sunteți proprietarul firmei în aplicație: toate datele firmei din cloud – proiecte, înregistrări de lucru, bonuri, rapoarte, liste de cumpărături și toate fotografiile.",
            "Dacă sunteți angajat al unei firme: contul dvs. și accesul la datele firmei. Înregistrările de lucru făcute pentru firmă rămân la firmă (angajator).",
            "Datele salvate local pe telefon se șterg la ștergerea contului din aplicație sau la dezinstalarea aplicației.",
          ],
        },
        {
          title: "4. Ce date se păstrează și cât timp",
          content: [
            "Eventualele copii de siguranță tehnice ale serverului sunt eliminate în cel mult 30 de zile.",
            "Rapoartele sau fotografiile pe care le-ați trimis deja altor persoane (de ex. prin WhatsApp sau e-mail) se află la destinatari și nu pot fi șterse de noi.",
            "Nu păstrăm alte date după ștergerea contului, cu excepția cazurilor în care legea ne obligă.",
          ],
        },
        {
          title: "5. Firme cu mai mulți utilizatori",
          content:
            "Dacă în firma dvs. mai sunt și alți utilizatori (angajați), ștergerea contului de proprietar din aplicație nu este posibilă, pentru a nu șterge din greșeală datele colegilor. În acest caz scrieți-ne la contact@me-concept.ro și ștergem firma împreună cu datele ei, conform pașilor de la punctul 2.",
        },
        {
          title: "6. Mai multe informații",
          content:
            "Detalii despre datele prelucrate găsiți în „Nexus Șantier — Politică de confidențialitate” (me-concept.ro/nexus-santier/confidentialitate).",
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
