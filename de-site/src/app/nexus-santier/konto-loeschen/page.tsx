import type { Metadata } from "next";
import { LegalPageDe } from "@/components/legal-page";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nexus Șantier — Konto und Daten löschen",
  description:
    "So löschen Sie Ihr Konto und Ihre Daten in der App Nexus Șantier (Mayer E-Concept S.R.L.): direkt in der App oder per E-Mail.",
  alternates: {
    canonical: "/nexus-santier/konto-loeschen",
  },
};

// Seite zur Kontolöschung – von Google Play für Apps mit Konto gefordert
export default function NexusSantierKontoLoeschenPage() {
  return (
    <LegalPageDe
      title="Nexus Șantier — Konto und Daten löschen"
      lastUpdated="Zuletzt aktualisiert am 13. Oktober 2026 | App Nexus Șantier, Entwickler Mayer E-Concept S.R.L."
      backLabel="← Startseite"
      contactLabel="Kontaktdaten"
      sections={[
        {
          title: "1. Löschung direkt in der App (empfohlen)",
          content: [
            "Öffnen Sie die App Nexus Șantier.",
            "Tippen Sie oben rechts auf das Profilsymbol.",
            "Scrollen Sie zum Abschnitt „Cont și cloud“ (Konto und Cloud).",
            "Tippen Sie auf „Șterge contul“ (Konto löschen) und bestätigen Sie anschließend durch erneutes Tippen („Sigur? Șterge definitiv“ – Sicher? Endgültig löschen).",
            "Das Konto und die Daten in der Cloud werden sofort gelöscht, und die Daten auf dem Smartphone werden entfernt.",
          ],
        },
        {
          title: "2. Löschung per E-Mail (ohne Zugriff auf die App)",
          content:
            "Senden Sie eine E-Mail an contact@me-concept.ro von der E-Mail-Adresse, mit der Sie sich registriert haben, mit dem Betreff „Ștergere cont Nexus Șantier“ (Löschung Konto Nexus Șantier). Aus Sicherheitsgründen können wir Sie bitten, die Anfrage zu bestätigen. Die Löschung erfolgt innerhalb von höchstens 30 Tagen nach Eingang der Anfrage, und Sie erhalten eine Bestätigung per E-Mail.",
        },
        {
          title: "3. Löschung einzelner Daten, ohne das Konto zu löschen",
          content: [
            "Sie können jederzeit nur bestimmte Daten löschen und das Konto behalten: Wischen Sie in der App über einen Arbeitseintrag, ein Foto, einen Beleg, einen Bericht, ein Projekt oder einen Artikel der Einkaufsliste nach links, tippen Sie auf „Șterge“ (Löschen) und bestätigen Sie anschließend.",
            "Die Löschung wird bei der nächsten Synchronisierung automatisch auch in die Cloud übertragen. Beim Löschen eines Projekts werden auch alle damit verbundenen Daten gelöscht.",
            "Wenn Sie die Löschung bestimmter Daten wünschen und keinen Zugriff mehr auf die App haben, schreiben Sie uns an contact@me-concept.ro, gemäß den Schritten unter Punkt 2.",
          ],
        },
        {
          title: "4. Welche Daten gelöscht werden",
          content: [
            "Das Konto (E-Mail-Adresse und Kontokennung).",
            "Wenn Sie in der App Inhaber der Firma sind: alle Daten der Firma in der Cloud – Projekte, Arbeitseinträge, Belege, Berichte, Einkaufslisten und alle Fotos.",
            "Wenn Sie Mitarbeiter einer Firma sind: Ihr Konto und Ihr Zugriff auf die Daten der Firma. Die für die Firma erstellten Arbeitseinträge verbleiben bei der Firma (dem Arbeitgeber).",
            "Die lokal auf dem Smartphone gespeicherten Daten werden bei der Löschung des Kontos in der App oder bei der Deinstallation der App gelöscht.",
          ],
        },
        {
          title: "5. Welche Daten aufbewahrt werden und wie lange",
          content: [
            "Etwaige technische Sicherungskopien des Servers werden innerhalb von höchstens 30 Tagen entfernt.",
            "Berichte oder Fotos, die Sie bereits an andere Personen gesendet haben (z. B. per WhatsApp oder E-Mail), befinden sich bei den Empfängern und können von uns nicht gelöscht werden.",
            "Nach der Löschung des Kontos bewahren wir keine weiteren Daten auf, es sei denn, wir sind gesetzlich dazu verpflichtet.",
          ],
        },
        {
          title: "6. Firmen mit mehreren Nutzern",
          content:
            "Wenn es in Ihrer Firma weitere Nutzer (Mitarbeiter) gibt, ist die Löschung des Inhaberkontos in der App nicht möglich, damit nicht versehentlich die Daten der Kollegen gelöscht werden. Schreiben Sie uns in diesem Fall an contact@me-concept.ro, und wir löschen die Firma samt ihren Daten gemäß den Schritten unter Punkt 2.",
        },
        {
          title: "7. Weitere Informationen",
          content:
            "Details zu den verarbeiteten Daten finden Sie in der „Nexus Șantier — Datenschutzerklärung“ (me-concept.de/nexus-santier/datenschutz).",
        },
      ]}
      contactInfo={{
        company: "Mayer E-Concept S.R.L.",
        address: "Str. Atena, Nr. 5, Ap. 1, Sibiu, Kreis Sibiu",
        country: "Rumänien",
        website: `${SITE_URL}/`,
        email: "contact@me-concept.ro",
        phone: "+40 752 099 791",
      }}
    />
  );
}
