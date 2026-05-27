import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Politică cookie-uri (UE) — Mayer E-Concept",
  description:
    "Politica privind utilizarea cookie-urilor pe site-ul me-concept.ro, conform reglementărilor UE.",
  alternates: {
    canonical: "https://me-concept-next.vercel.app/politica-cookie-uri-ue",
  },
};

export default function PoliticaCookiePage() {
  return (
    <LegalPage
      title="Politică cookie-uri (UE)"
      lastUpdated="Actualizată ultima dată pe 27 mai 2026 | Conformă OG 13/2024 și GDPR"
      sections={[
        {
          title: "1. Introducere",
          content:
            'Site-ul nostru, https://me-concept.ro (numit în continuare "site-ul"), foloseşte cookie-uri şi alte tehnologii similare (pentru comoditate, toate tehnologiile sunt numite în continuare "cookie-uri"). Cookie-urile sunt plasate şi de terții cu care colaborăm. În documentul de mai jos te informăm despre modul cum folosim cookie-uri pe site-ul nostru.',
        },
        {
          title: "2. Ce sunt cookie-urile?",
          content:
            "Un cookie este un fişier simplu, de mici dimensiuni, care este trimis împreună cu paginile acestui site web şi stocat de navigatorul tău pe hard diskul computerului sau al altui dispozitiv. Informațiile stocate acolo pot fi trimise înapoi către serverele noastre sau serverele terților relevanți, în timpul unei vizite ulterioare.",
        },
        {
          title: "3. Ce sunt scripturile?",
          content:
            "Un script este un fragment de cod (de program), utilizat pentru ca site-ul nostru să funcționeze corect şi interactiv. Acest cod este executat pe serverul nostru sau pe dispozitivul tău.",
        },
        {
          title: "4. Ce este un web beacon?",
          content:
            'Un "web beacon" (sau un "pixel tag") este un mic fragment invizibil de text sau o imagine care este plasată pe un site web pentru a monitoriza traficul. Pentru realizarea monitorizării traficului, web beacons pot stoca diverse date despre tine.',
        },
        {
          title: "5. Cookie-uri",
          content: "",
          subsections: [
            {
              title: "5.1 Cookie-uri tehnice sau funcționale",
              content:
                "Unele cookie-uri se asigură că anumite părți ale site-ului funcționează corect şi că preferințele tale de utilizator rămân cunoscute. Prin plasarea cookie-urilor funcționale, îți este mai uşor să vizitezi site-ul nostru. Putem plasa aceste cookie-uri fără consimțământul tău.",
            },
            {
              title: "5.2 Cookie-uri pentru marketing/urmărire",
              content:
                "Cookie-urile de marketing/urmărire sunt cookie-uri utilizate în crearea profilurilor de utilizator, pentru a afişa publicitate sau pentru a urmări utilizatorul pe acest site ori pe mai multe site-uri, în scopuri de marketing similare.",
            },
            {
              title: "5.3 Rețele sociale",
              content:
                "Site-ul nostru nu include butoane de distribuire pe rețele sociale și nu utilizează cod de urmărire de la Facebook, Instagram sau alte platforme sociale. Nu se plasează cookie-uri de social media de pe acest site.",
            },
          ],
        },
        {
          title: "6. Cookie-uri plasate",
          content: [
            "Cookie de sesiune (necesar): asigură funcționarea formularului de contact — Funcțional, fără consimțământ necesar",
            "Cookie preferințe browser (necesar): memorează setările de afișare — Funcțional, fără consimțământ necesar",
            "Site-ul nu utilizează cookie-uri de analiză, marketing sau urmărire",
            "Fonturile web (Manrope, Inter) sunt auto-găzduite — nu se plasează cookie-uri terțe",
          ],
        },
        {
          title: "7. Consimțământ",
          content:
            'Când vizitezi pentru prima dată site-ul nostru, îți vom arăta o fereastră pop-up cu o explicație despre cookie-uri. Apăsând pe "Salvează preferințele", îți exprimi consimțământul pentru utilizarea de către noi a categoriilor de cookie-uri selectate, conform descrierii din această Politică privind cookie-urile. Poți bloca folosirea cookie-urilor din navigatorul pe care îl foloseşti, dar te rugăm să ții cont de faptul că în acest caz e posibil ca site-ul nostru să nu mai funcționeze corespunzător.',
        },
        {
          title: "8. Activarea/dezactivarea şi ştergerea cookie-urilor",
          content:
            "Poți utiliza navigatorul tău de internet pentru a şterge automat sau manual cookie-urile. De asemenea, poți specifica faptul că anumite cookie-uri nu pot fi plasate. Te rog să reții că site-ul nostru s-ar putea să nu funcționeze corect dacă sunt dezactivate toate cookie-urile. Dacă ştergi cookie-urile din navigatorul tău, ele vor fi plasate din nou după ce îți dai consimțământul când vizitezi din nou site-ul nostru.",
        },
        {
          title: "9. Drepturile tale asupra datelor cu caracter personal",
          content: [
            "Ai dreptul să ştii de ce sunt necesare datele tale cu caracter personal, ce vom face cu ele şi cât timp vor fi păstrate.",
            "Dreptul de acces: ai dreptul de a-ți accesa datele cu caracter personal pe care le-am colectat.",
            "Dreptul la rectificare: ai dreptul de a completa, corecta, şterge sau bloca datele tale cu caracter personal oricând vrei.",
            "Dacă ne dai consimțământul să-ți prelucrăm datele, ai dreptul de a revoca consimțământul şi să ceri ştergerea tuturor datele cu caracter personal.",
            "Dreptul de a-ți transfera datele: ai dreptul să ceri toate datele tale cu caracter personal de la operator şi să le transferi în întregime la un alt operator.",
            "Dreptul de a obiecta: te poți opune prelucrării datelor tale.",
          ],
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
