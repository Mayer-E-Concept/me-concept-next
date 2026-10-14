import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nexus Șantier — Politică de confidențialitate",
  description:
    "Politica de confidențialitate a aplicației mobile Nexus Șantier (Mayer E-Concept S.R.L.): ce date prelucrăm, unde sunt stocate, cât timp și drepturile dvs. conform GDPR.",
  alternates: {
    canonical: "/nexus-santier/confidentialitate",
  },
};

// Politica de confidențialitate a aplicației Nexus Șantier (cerută de Google Play / App Store)
export default function NexusSantierConfidentialitate() {
  return (
    <LegalPage
      title="Nexus Șantier — Politică de confidențialitate"
      lastUpdated="Actualizată ultima dată pe 14 octombrie 2026 | Aplicația mobilă Nexus Șantier (Android / iOS) | Conformă GDPR (Reg. UE 2016/679)"
      sections={[
        {
          title: "1. Operatorul de date",
          content:
            "Aplicația Nexus Șantier este oferită de MAYER E-CONCEPT S.R.L., cu sediul în Str. Atena, Nr. 5, Ap. 1, Sibiu, Județul Sibiu, România, CUI RO45533577 („noi”). Pentru orice întrebare privind datele dvs. ne puteți scrie la contact@me-concept.ro sau ne puteți suna la +40 752 099 791.",
        },
        {
          title: "2. Ce face aplicația",
          content:
            "Nexus Șantier ajută meseriașii și firmele mici de construcții să țină evidența lucrărilor: proiecte, ore lucrate (inclusiv dictate vocal), materiale, bonuri, fotografii de pe șantier, liste de cumpărături și rapoarte de regie semnate de client pe telefon. Aplicația funcționează și fără cont și fără internet; datele rămân atunci doar pe telefonul dvs.",
        },
        {
          title: "3. Ce date prelucrăm",
          content: "",
          subsections: [
            {
              title: "3.1 Datele introduse de dvs.",
              content:
                "Numele dvs., numele firmei și al colegilor; proiecte (nume client, adresă, telefon – dacă le introduceți); înregistrări de lucru (activitate, durată, deplasare, materiale); bonuri (magazin, sumă, fotografia bonului); fotografii de pe șantier cu descrierea lor; liste de cumpărături; rapoarte de regie, inclusiv numele persoanei care semnează, semnătura olografă desenată pe ecran, data și ora semnării.",
            },
            {
              title: "3.2 Localizarea (doar la semnarea unui raport)",
              content:
                "La semnarea unui raport de regie, aplicația poate salva coordonatele GPS ale locului semnării, ca dovadă a locului prestării. Localizarea se citește doar în acel moment, doar cu permisiunea dvs., și nu este urmărită în fundal.",
            },
            {
              title: "3.3 Microfon și recunoaștere vocală",
              content:
                "Când apăsați pe microfon, vocea dvs. este transformată în text de serviciul de recunoaștere vocală al telefonului (Google pe Android, Apple pe iOS), conform politicilor acestor furnizori. Aplicația nu înregistrează și nu salvează fișiere audio; se păstrează doar textul rezultat.",
            },
            {
              title: "3.4 Cameră și galerie foto",
              content:
                "Accesul la cameră și la galerie este folosit doar când fotografiați un bon sau o situație de pe șantier ori alegeți o poză. Fotografiile sunt micșorate și salvate în spațiul aplicației.",
            },
            {
              title: "3.5 Contul în cloud (opțional)",
              content:
                "Dacă vă creați un cont, prelucrăm adresa de e-mail (pentru autentificarea cu cod trimis pe e-mail, fără parolă), un identificator de cont, firma și rolul în firmă (proprietar, administrator, angajat) și un identificator aleator al telefonului, pentru sincronizare.",
            },
          ],
        },
        {
          title: "4. Scopul și temeiul legal",
          content: [
            "Furnizarea funcțiilor aplicației (evidență lucrări, rapoarte, sincronizare între telefoane și cu biroul) – Art. 6(1)(b) GDPR, executarea contractului de utilizare.",
            "Dovada prestării la rapoartele semnate (semnătură, dată, locație) – Art. 6(1)(f) GDPR, interesul legitim al utilizatorului și al clientului său de a documenta lucrările.",
            "Securitatea și funcționarea serviciului – Art. 6(1)(f) GDPR.",
            "Nu folosim datele pentru publicitate, nu facem profilare și nu vindem date. Aplicația nu conține reclame și nici instrumente de urmărire (tracking).",
          ],
        },
        {
          title: "5. Unde sunt stocate datele",
          content: [
            "Pe telefon: toate datele sunt salvate local, în spațiul privat al aplicației, și funcționează offline.",
            "În cloud (doar dacă v-ați creat cont): datele și fotografiile sunt sincronizate criptat (HTTPS/TLS) pe serverele furnizorului Supabase, în centrul de date din Frankfurt (Germania, Uniunea Europeană). Supabase acționează ca persoană împuternicită conform Art. 28 GDPR.",
            "Accesul este separat pe firme: fiecare firmă vede doar propriile date. În cadrul unei firme, angajații văd proiectele și propriile înregistrări; proprietarul și administratorii văd toate datele firmei.",
            "E-mailurile cu codul de autentificare sunt trimise prin serviciul de e-mail al furnizorului Supabase.",
            "Asistentul AI (doar dacă v-ați creat cont): textul dictat pentru înregistrări și lista de cumpărături, respectiv fotografia unui bon, sunt trimise criptat către Anthropic PBC (SUA), pentru a fi transformate în text pentru raport, materiale sau pozițiile bonului. Anthropic acționează ca persoană împuternicită; transferul se face pe baza clauzelor contractuale standard ale UE. Datele nu sunt folosite pentru antrenarea modelelor AI și sunt păstrate de furnizor doar pe termen scurt, conform condițiilor sale comerciale. Fără cont, aplicația nu folosește AI.",
          ],
        },
        {
          title: "6. Cui transmitem datele",
          content:
            "Datele nu sunt transmise terților, cu excepția furnizorilor tehnici menționați mai sus (Supabase – găzduire în UE; Anthropic – asistentul AI, doar cu cont; Google/Apple – recunoașterea vocală a telefonului) și a cazurilor prevăzute de lege. Rapoartele și fotografiile ajung la alte persoane (de ex. clientul dvs.) doar atunci când le trimiteți dvs. prin WhatsApp, e-mail sau altă aplicație.",
        },
        {
          title: "7. Cât timp păstrăm datele",
          content: [
            "Datele de pe telefon: până le ștergeți din aplicație sau dezinstalați aplicația.",
            "Datele din cloud: cât timp contul este activ. La ștergerea contului, datele sunt șterse imediat din baza de date; eventualele copii de siguranță tehnice sunt eliminate în cel mult 30 de zile.",
            "Pentru angajații unei firme: la ștergerea contului unui angajat se șterge contul; înregistrările de lucru făcute pentru firmă rămân la firmă (angajator), care este responsabilă de ele.",
          ],
        },
        {
          title: "8. Ștergerea contului",
          content:
            "Puteți șterge contul oricând direct din aplicație: Profil (iconița din dreapta sus) → „Cont și cloud” → „Șterge contul”. Dacă nu mai aveți acces la aplicație, urmați pașii de pe pagina „Nexus Șantier — Ștergerea contului și a datelor” (me-concept.ro/nexus-santier/stergere-cont).",
        },
        {
          title: "9. Drepturile dvs.",
          content: [
            "Dreptul de acces, la rectificare și la ștergere (Art. 15–17 GDPR).",
            "Dreptul la restricționarea prelucrării și la portabilitatea datelor (Art. 18, 20 GDPR).",
            "Dreptul de opoziție (Art. 21 GDPR).",
            "Pentru exercitarea drepturilor scrieți-ne la contact@me-concept.ro. Răspundem în cel mult 30 de zile.",
            "Aveți dreptul să depuneți plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), B-dul G-ral. Gheorghe Magheru 28-30, sector 1, București, anspdcp@dataprotection.ro.",
          ],
        },
        {
          title: "10. Securitate",
          content:
            "Folosim conexiuni criptate (HTTPS/TLS), autentificare fără parolă cu cod de unică folosință, reguli de acces la nivel de bază de date (fiecare firmă vede doar datele proprii) și stocare privată a fotografiilor.",
        },
        {
          title: "11. Copii",
          content:
            "Aplicația este destinată uzului profesional și nu se adresează persoanelor sub 16 ani.",
        },
        {
          title: "12. Modificări",
          content:
            "Putem actualiza această politică atunci când aplicația sau legislația se schimbă. Versiunea curentă este întotdeauna disponibilă pe această pagină, cu data ultimei actualizări.",
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
