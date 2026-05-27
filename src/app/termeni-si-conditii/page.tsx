import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Termeni și condiții — Mayer E-Concept",
  description: "Termenii și condițiile de utilizare a site-ului și serviciilor Mayer E-Concept S.R.L.",
  alternates: { canonical: "https://me-concept-next.vercel.app/termeni-si-conditii" },
};

export default function TermeniPage() {
  return (
    <LegalPage
      title="Termeni și condiții"
      lastUpdated="Actualizați ultima dată pe 27 mai 2026"
      sections={[
        {
          title: "1. Introducere",
          content:
            "Acești Termeni și condiții se aplică acestui site web și tranzacțiilor legate de produsele și serviciile noastre. Este posibil să ai în continuare obligații ce decurg din contracte suplimentare legate de relația ta cu noi sau de orice produse sau servicii pe care le primești de la noi. În cazul în care orice prevederi ale unor contracte suplimentare intră în conflict cu prevederile acestor Termeni, prevederile acestor contracte suplimentare vor prevala.",
        },
        {
          title: "2. Cu titlu de obligativitate",
          content:
            "Prin înregistrarea, accesarea sau utilizarea în alt mod a acestui site, ești de acord cu respectarea acestor Termeni și condiții stabiliți mai jos. Simpla utilizare a acestui site implică cunoașterea și acceptarea acestor Termeni și condiții. În unele cazuri particulare, este posibil să îți cerem acordul explicit.",
        },
        {
          title: "3. Comunicare electronică",
          content:
            "Prin utilizarea acestui site sau comunicarea cu noi prin mijloace electronice, iei la cunoștință și ești de acord că putem comunica electronic cu tine și că toate acordurile, notificările, dezvăluirile și alte comunicări pe care ți le transmitem în mod electronic îndeplinesc orice cerință legală, inclusiv cerința ca astfel de comunicări să fie în scris.",
        },
        {
          title: "4. Proprietate intelectuală",
          content:
            "Noi sau licențiatorii noștri deținem și controlăm toate drepturile de autor și alte drepturi de proprietate intelectuală din site și datele, informațiile și alte resurse afișate de sau accesibile pe site.",
          subsections: [
            {
              title: "4.1 Toate drepturile sunt rezervate",
              content:
                "Nu ți se acordă o licență sau orice alt drept în baza drepturilor de autor, a mărcii comerciale, a brevetelor sau a altor drepturi de proprietate intelectuală. Nu vei utiliza, copia, reproduce, reda, afișa, distribui, modifica sau promova orice resurse de pe acest site web, fără permisiunea noastră scrisă exprimată în prealabil.",
            },
          ],
        },
        {
          title: "5. Proprietatea unei terțe părți",
          content:
            "Site-ul nostru poate include legături sau alte referințe la site-urile web ale altor părți. Nu monitorizăm conținutul acestor site-uri. Opiniile exprimate sau materialele care apar pe aceste site-uri nu sunt neapărat împărtășite sau aprobate de noi. Nu vom fi responsabili pentru practicile de confidențialitate sau conținutul acestor site-uri.",
        },
        {
          title: "6. Utilizare în mod responsabil",
          content:
            "Vizitând site-ul nostru, ești de acord să îl utilizezi numai în scopurile prevăzute și permise de acești Termeni, orice contracte suplimentare încheiate cu noi și legile, reglementările și practicile online general acceptate. Angajarea în orice activitate care cauzează sau poate provoca daune site-ului sau care interferează cu performanța, disponibilitatea sau accesibilitatea site-ului este strict interzisă.",
        },
        {
          title: "7. Condiții financiare și reziliere",
          content:
            "Serviciile noastre de proiectare instalații electrice sunt furnizate exclusiv persoanelor juridice și profesioniștilor (B2B). Condițiile financiare, termenele de plată și condițiile de reziliere sunt stabilite prin contractele individuale încheiate cu fiecare client. Aceste condiții prevalează față de orice prevedere generală a prezentului document. Prezentul site are exclusiv rol informativ și nu constituie un contract de vânzare online.",
        },
        {
          title: "8. Trimiterea ideilor",
          content:
            "Nu trimite idei, invenții, lucrări de autor sau alte informații care pot fi considerate propria ta proprietate intelectuală, cu excepția cazului în care am semnat mai întâi un acord privind proprietatea intelectuală sau un acord de nedivulgare.",
        },
        {
          title: "9. Încetarea utilizării",
          content:
            "Putem, la propria noastră discreție, în orice moment, să modificăm sau să întrerupem accesul la site-ul web sau la orice serviciu de pe acesta. Ești de acord că nu vom fi răspunzători față de tine sau de orice altă terță parte pentru orice astfel de modificare, suspendare sau întrerupere.",
        },
        {
          title: "10. Garanții și răspundere",
          content:
            "Acest site web și tot conținutul de pe site sunt furnizate ca atare și în măsura disponibilității actuale. Respingem în mod explicit toate garanțiile de orice fel cu privire la disponibilitatea, acuratețea sau caracterul complet al Conținutului. Nimic de pe acest site web nu constituie sau este menit să constituie sfaturi juridice, financiare sau medicale de orice fel.",
        },
        {
          title: "11. Confidențialitate",
          content:
            "Am elaborat o politică pentru a răspunde oricăror probleme de confidențialitate pe care le-ai putea avea. Pentru mai multe informații, te rugăm să consulți Declarația noastră de confidențialitate și Politica noastră privind cookie-urile.",
        },
        {
          title: "12. Accesibilitate",
          content:
            "Ne-am luat angajamentul de a face conținutul pe care îl oferim accesibil persoanelor cu dizabilități. Dacă ai un handicap și nu poți accesa vreuna dintre porțiunile site-ului nostru, te rugăm să ne trimiți o notificare care să cuprindă o descriere detaliată a problemei pe care ai întâmpinat-o.",
        },
        {
          title: "13. Restricții la export / conformare la legislație",
          content:
            "Accesul la site din teritorii sau țări în care conținutul sau achiziționarea produselor sau serviciilor vândute pe site sunt interzise. Nu poți utiliza acest site web dacă acest lucru încalcă legile și reglementările de export din România.",
        },
        {
          title: "14. Cesiune",
          content:
            "Nu poți cesiona, transfera sau subcontracta niciunul dintre drepturile și/sau obligațiile tale în conformitate cu acești Termeni și condiții, în totalitate sau parțial, către niciun terț fără acordul nostru prealabil, exprimat în scris.",
        },
        {
          title: "15. Încălcarea acestor Termeni și condiții",
          content:
            "Fără a aduce atingere celorlalte drepturi care ne revin, dacă încalci în vreun fel acești Termeni și Condiții, putem lua măsurile pe care le considerăm adecvate, inclusiv suspendarea temporară sau definitivă a accesului tău la site și/sau inițierea de acțiuni în justiție împotriva ta.",
        },
        {
          title: "16. Despăgubire",
          content:
            "Ești de acord să ne despăgubești, să ne aperi și să ne menții în afara oricărei acuzații, revendicări, răspunderi, daune, pierderi și cheltuieli, referitoare la încălcarea acestor Termeni și condiții și a legilor aplicabile.",
        },
        {
          title: "17. Renunțare",
          content:
            "Nerespectarea oricărei dispoziții prevăzute în acești Termeni și Condiții nu va fi interpretată ca renunțarea la aceste prevederi și nu va afecta valabilitatea acestor Termeni și Condiții.",
        },
        {
          title: "18. Limba",
          content:
            "Acești Termeni și condiții vor fi interpretați și înțeleși exclusiv în Română. Toate notificările și corespondența vor fi scrise exclusiv în limba respectivă.",
        },
        {
          title: "19. Întregul acord",
          content:
            "Acești Termeni și condiții, împreună cu Declarația noastră de confidențialitate și Politica privind cookie-urile, vor constitui întregul acord între tine și MAYER E-CONCEPT S.R.L în legătură cu utilizarea de către tine a acestui site web.",
        },
        {
          title: "20. Actualizarea acestor Termeni și condiții",
          content:
            "Este posibil să actualizăm periodic acești Termeni și condiții. Cade în obligația ta să verifici periodic acești Termeni și condiții pentru modificări sau actualizări. Modificările aduse acestor Termeni și condiții vor intra în vigoare după publicarea lor pe acest site.",
        },
        {
          title: "21. Alegerea legislației aplicabile și a jurisdicției",
          content:
            "Acești Termeni și condiții se vor supune legilor din România. Orice litigii legate de acești Termeni și Condiții vor fi supuse jurisdicției instanțelor judecătorești din România.",
        },
      ]}
      contactInfo={{
        company: "Mayer E-Concept S.R.L.",
        address: "Str. Atena, Nr. 5, Ap. 1, Sibiu, Județul Sibiu",
        country: "România",
        website: "https://me-concept-next.vercel.app",
        email: "contact@me-concept.ro",
        phone: "+40 752 099 791",
      }}
    />
  );
}
