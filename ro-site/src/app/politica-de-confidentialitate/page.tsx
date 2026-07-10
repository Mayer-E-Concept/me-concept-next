import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politică de confidențialitate — Mayer E-Concept",
  description:
    "Politica de confidențialitate a site-ului Mayer E-Concept S.R.L.: ce date colectăm prin formularul de contact, cum le folosim și drepturile dvs. conform GDPR.",
  alternates: {
    canonical: "/politica-de-confidentialitate",
  },
};

export default function PoliticaConfidentialitate() {
  return (
    <LegalPage
      title="Politică de confidențialitate"
      lastUpdated="Actualizată ultima dată pe 27 mai 2026 | Versiune conformă GDPR (Reg. UE 2016/679)"
      sections={[
        {
          title: "1. Operatorul de date cu caracter personal",
          content:
            "MAYER E-CONCEPT S.R.L., cu sediul în Str. Atena, Nr. 5, Ap. 1, Sibiu, Județul Sibiu, România, CUI RO48817141, este operatorul datelor cu caracter personal colectate prin intermediul acestui site web. Ne puteți contacta la adresa de e-mail: contact@me-concept.ro sau la numărul de telefon: +40 752 099 791.",
        },
        {
          title: "2. Ce date colectăm și în ce scop",
          content: "",
          subsections: [
            {
              title: "2.1 Formularul de contact",
              content:
                "Când completați formularul de contact de pe site, colectăm: numele dvs., adresa de e-mail și mesajul transmis. Aceste date sunt folosite exclusiv pentru a răspunde solicitării dvs. Nu sunt prelucrate în alte scopuri, nu sunt vândute și nu sunt transmise unor terți fără acordul dvs. Temeiul juridic al prelucrării este Art. 6(1)(b) GDPR (executarea unui contract sau demersuri precontractuale) și/sau Art. 6(1)(f) GDPR (interesul nostru legitim de a răspunde solicitărilor comerciale primite).",
            },
            {
              title: "2.2 Date tehnice (log-uri server)",
              content:
                "Serverele pe care rulează site-ul colectează automat date tehnice la fiecare accesare: adresa IP anonimizată, tipul de browser, sistemul de operare, pagina accesată, data și ora accesului. Aceste date sunt utilizate exclusiv pentru securitatea și buna funcționare a site-ului. Temeiul juridic: Art. 6(1)(f) GDPR. Datele sunt șterse automat după 30 de zile.",
            },
            {
              title: "2.3 Fonturi web",
              content:
                "Site-ul utilizează fonturile Manrope și Inter, procesate la momentul construirii aplicației și servite direct de pe serverele noastre (self-hosted via Next.js font optimization). Nu se transmite nicio informație despre dvs. către servere Google sau terți la încărcarea fonturilor.",
            },
          ],
        },
        {
          title: "3. Durata păstrării datelor",
          content:
            "Datele transmise prin formularul de contact sunt păstrate pe durata necesară soluționării solicitării dvs. și, ulterior, maximum 3 ani de la ultima interacțiune, în conformitate cu termenele de prescriere aplicabile relațiilor comerciale conform dreptului român. Datele tehnice din log-uri sunt șterse după 30 de zile.",
        },
        {
          title: "4. Destinatarii datelor",
          content:
            "Datele dvs. sunt accesibile exclusiv personalului autorizat al MAYER E-CONCEPT S.R.L. implicat în soluționarea solicitărilor. Nu transferăm date cu caracter personal către terți, cu excepția cazurilor prevăzute de lege sau a furnizorilor de infrastructură tehnică (hosting/cloud) care acționează ca persoane împuternicite conform Art. 28 GDPR și oferă garanții adecvate de protecție a datelor.",
        },
        {
          title: "5. Transferuri internaționale",
          content:
            "Site-ul este găzduit pe platforma Vercel Inc. (SUA). Vercel este certificat conform mecanismelor de transfer aprobate de Comisia Europeană (clauze contractuale standard). Nu efectuăm transferuri de date cu caracter personal în afara SEE fără garanțiile prevăzute de Capitolul V GDPR.",
        },
        {
          title: "6. Drepturile dvs.",
          content: [
            "Dreptul de acces (Art. 15 GDPR): puteți solicita o copie a datelor cu caracter personal pe care le prelucrăm.",
            "Dreptul la rectificare (Art. 16 GDPR): puteți solicita corectarea datelor inexacte sau completarea celor incomplete.",
            "Dreptul la ștergere (Art. 17 GDPR): puteți solicita ștergerea datelor atunci când nu mai sunt necesare sau când vă retrageți consimțământul.",
            "Dreptul la restricționarea prelucrării (Art. 18 GDPR): puteți solicita limitarea prelucrării în anumite circumstanțe.",
            "Dreptul la portabilitatea datelor (Art. 20 GDPR): puteți solicita datele dvs. într-un format structurat, utilizat frecvent și citibil de echipamente automate.",
            "Dreptul de a vă opune (Art. 21 GDPR): puteți obiecta împotriva prelucrării bazate pe interesul legitim al operatorului.",
            "Dreptul de a nu fi supus unei decizii automate (Art. 22 GDPR): nu aplicăm profilare sau decizii automate.",
          ],
        },
        {
          title: "7. Dreptul de a depune plângere la autoritatea de supraveghere",
          content:
            "Aveți dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), cu sediul în B-dul G-ral. Gheorghe Magheru 28-30, sector 1, București, e-mail: anspdcp@dataprotection.ro, telefon: +40 318 059 211. Puteți depune plângere fără a aduce atingere dreptului dvs. de a recurge la o cale de atac judiciară.",
        },
        {
          title: "8. Securitatea datelor",
          content:
            "Site-ul utilizează protocol HTTPS/TLS pentru criptarea datelor în tranzit. Accesul la datele de contact este restricționat exclusiv personalului autorizat. Aplicăm măsuri tehnice și organizatorice adecvate conform Art. 32 GDPR pentru a proteja datele dvs. împotriva accesului neautorizat, modificării sau divulgării.",
        },
        {
          title: "9. Cookie-uri",
          content:
            "Site-ul utilizează exclusiv cookie-uri tehnice funcționale necesare bunei funcționări. Nu utilizăm cookie-uri de urmărire, cookie-uri de marketing sau pixeli terți. Pentru informații detaliate despre utilizarea cookie-urilor, consultați Politica noastră privind cookie-urile.",
        },
        {
          title: "10. Modificări ale acestei politici",
          content:
            "Ne rezervăm dreptul de a actualiza această politică de confidențialitate pentru a reflecta modificările legislative sau operaționale. Versiunea curentă este întotdeauna disponibilă pe această pagină. Vă recomandăm să consultați periodic această pagină.",
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
