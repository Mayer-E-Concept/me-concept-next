import type { Metadata } from "next";
import { LegalPageDe } from "@/components/legal-page";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nexus Șantier — Datenschutzerklärung",
  description:
    "Datenschutzerklärung der mobilen App Nexus Șantier (Mayer E-Concept S.R.L.): welche Daten wir verarbeiten, wo sie gespeichert werden, wie lange und Ihre Rechte gemäß DSGVO.",
  alternates: {
    canonical: "/nexus-santier/datenschutz",
  },
};

// Datenschutzerklärung der App Nexus Șantier (von Google Play / App Store gefordert)
export default function NexusSantierDatenschutzPage() {
  return (
    <LegalPageDe
      title="Nexus Șantier — Datenschutzerklärung"
      lastUpdated="Zuletzt aktualisiert am 14. Oktober 2026 | Mobile App Nexus Șantier (Android / iOS) | Gemäß DSGVO (EU) 2016/679"
      backLabel="← Startseite"
      contactLabel="Kontaktdaten des Verantwortlichen"
      sections={[
        {
          title: "1. Verantwortlicher",
          content:
            "Die App Nexus Șantier wird angeboten von MAYER E-CONCEPT S.R.L., mit Sitz in Str. Atena, Nr. 5, Ap. 1, Sibiu, Kreis Sibiu, Rumänien, CUI (USt-IdNr.) RO45533577 („wir“). Bei Fragen zu Ihren Daten erreichen Sie uns per E-Mail unter contact@me-concept.ro oder telefonisch unter +40 752 099 791.",
        },
        {
          title: "2. Was die App macht",
          content:
            "Nexus Șantier hilft Handwerkern und kleinen Baufirmen, ihre Arbeiten zu dokumentieren: Projekte, Arbeitsstunden (auch per Spracheingabe diktiert), Material, Belege, Baustellenfotos, Einkaufslisten sowie Regieberichte, die der Kunde direkt auf dem Smartphone unterschreibt. Die App funktioniert auch ohne Konto und ohne Internetverbindung; die Daten verbleiben dann ausschließlich auf Ihrem Smartphone.",
        },
        {
          title: "3. Welche Daten wir verarbeiten",
          content: "",
          subsections: [
            {
              title: "3.1 Von Ihnen eingegebene Daten",
              content:
                "Ihr Name, der Name Ihrer Firma und Ihrer Kollegen; Projekte (Name des Kunden, Adresse, Telefonnummer – sofern Sie diese eingeben); Arbeitseinträge (Tätigkeit, Dauer, Anfahrt, Material); Belege (Geschäft, Betrag, Foto des Belegs); Baustellenfotos mit ihrer Beschreibung; Einkaufslisten; Regieberichte, einschließlich des Namens der unterzeichnenden Person, der auf dem Bildschirm gezeichneten handschriftlichen Unterschrift sowie Datum und Uhrzeit der Unterzeichnung.",
            },
            {
              title: "3.2 Standort (nur bei der Unterzeichnung eines Berichts)",
              content:
                "Bei der Unterzeichnung eines Regieberichts kann die App die GPS-Koordinaten des Unterzeichnungsortes als Nachweis des Leistungsortes speichern. Der Standort wird nur in diesem Moment und nur mit Ihrer Erlaubnis abgefragt und nicht im Hintergrund verfolgt.",
            },
            {
              title: "3.3 Mikrofon und Spracherkennung",
              content:
                "Wenn Sie auf das Mikrofon tippen, wird Ihre Sprache durch den Spracherkennungsdienst Ihres Smartphones (Google unter Android, Apple unter iOS) gemäß den Richtlinien dieser Anbieter in Text umgewandelt. Die App nimmt keine Audiodateien auf und speichert keine; es wird nur der resultierende Text gespeichert.",
            },
            {
              title: "3.4 Kamera und Fotogalerie",
              content:
                "Der Zugriff auf Kamera und Galerie wird nur genutzt, wenn Sie einen Beleg oder eine Situation auf der Baustelle fotografieren oder ein Bild auswählen. Die Fotos werden verkleinert und im Speicherbereich der App abgelegt.",
            },
            {
              title: "3.5 Cloud-Konto (optional)",
              content:
                "Wenn Sie ein Konto erstellen, verarbeiten wir Ihre E-Mail-Adresse (für die Anmeldung mit einem per E-Mail gesendeten Code, ohne Passwort), eine Kontokennung, die Firma und Ihre Rolle in der Firma (Inhaber, Administrator, Mitarbeiter) sowie eine zufällige Kennung des Smartphones zur Synchronisierung.",
            },
          ],
        },
        {
          title: "4. Zweck und Rechtsgrundlage",
          content: [
            "Bereitstellung der Funktionen der App (Dokumentation der Arbeiten, Berichte, Synchronisierung zwischen Smartphones und mit dem Büro) – Art. 6 Abs. 1 lit. b DSGVO, Erfüllung des Nutzungsvertrags.",
            "Leistungsnachweis bei unterschriebenen Berichten (Unterschrift, Datum, Standort) – Art. 6 Abs. 1 lit. f DSGVO, berechtigtes Interesse des Nutzers und seines Kunden an der Dokumentation der Arbeiten.",
            "Sicherheit und Betrieb des Dienstes – Art. 6 Abs. 1 lit. f DSGVO.",
            "Wir verwenden die Daten nicht für Werbung, betreiben kein Profiling und verkaufen keine Daten. Die App enthält weder Werbung noch Tracking-Tools.",
          ],
        },
        {
          title: "5. Wo die Daten gespeichert werden",
          content: [
            "Auf dem Smartphone: Alle Daten werden lokal im privaten Speicherbereich der App gespeichert und funktionieren offline.",
            "In der Cloud (nur wenn Sie ein Konto erstellt haben): Die Daten und Fotos werden verschlüsselt (HTTPS/TLS) mit den Servern des Anbieters Supabase im Rechenzentrum in Frankfurt (Deutschland, Europäische Union) synchronisiert. Supabase handelt als Auftragsverarbeiter gemäß Art. 28 DSGVO.",
            "Der Zugriff ist nach Firmen getrennt: Jede Firma sieht nur ihre eigenen Daten. Innerhalb einer Firma sehen Mitarbeiter die Projekte und ihre eigenen Einträge; Inhaber und Administratoren sehen alle Daten der Firma.",
            "Die E-Mails mit dem Anmeldecode werden über den E-Mail-Dienst des Anbieters Supabase versendet.",
            "KI-Assistent (nur wenn Sie ein Konto erstellt haben): Der diktierte Text für Einträge und die Einkaufsliste bzw. das Foto eines Belegs werden verschlüsselt an Anthropic PBC (USA) übermittelt, um sie in Text für den Bericht, das Material oder die Positionen des Belegs umzuwandeln. Anthropic handelt als Auftragsverarbeiter; die Übermittlung erfolgt auf Grundlage der EU-Standardvertragsklauseln. Die Daten werden nicht zum Training von KI-Modellen verwendet und vom Anbieter gemäß seinen geschäftlichen Bedingungen nur kurzzeitig gespeichert. Ohne Konto nutzt die App keine KI.",
          ],
        },
        {
          title: "6. An wen wir Daten weitergeben",
          content:
            "Die Daten werden nicht an Dritte weitergegeben, mit Ausnahme der oben genannten technischen Dienstleister (Supabase – Hosting in der EU; Anthropic – KI-Assistent, nur mit Konto; Google/Apple – Spracherkennung des Smartphones) und der gesetzlich vorgesehenen Fälle. Berichte und Fotos gelangen nur dann an andere Personen (z. B. Ihren Kunden), wenn Sie diese selbst per WhatsApp, E-Mail oder über eine andere App versenden.",
        },
        {
          title: "7. Wie lange wir die Daten speichern",
          content: [
            "Daten auf dem Smartphone: bis Sie sie in der App löschen oder die App deinstallieren.",
            "Daten in der Cloud: solange das Konto aktiv ist. Bei Löschung des Kontos werden die Daten sofort aus der Datenbank gelöscht; etwaige technische Sicherungskopien werden innerhalb von höchstens 30 Tagen entfernt.",
            "Für Mitarbeiter einer Firma: Bei Löschung des Kontos eines Mitarbeiters wird das Konto gelöscht; die für die Firma erstellten Arbeitseinträge verbleiben bei der Firma (dem Arbeitgeber), die für sie verantwortlich ist.",
          ],
        },
        {
          title: "8. Löschung des Kontos",
          content:
            "Sie können Ihr Konto jederzeit direkt in der App löschen: Profil (Symbol oben rechts) → „Cont și cloud“ (Konto und Cloud) → „Șterge contul“ (Konto löschen). Wenn Sie keinen Zugriff mehr auf die App haben, folgen Sie den Schritten auf der Seite „Nexus Șantier — Konto und Daten löschen“ (me-concept.de/nexus-santier/konto-loeschen).",
        },
        {
          title: "9. Ihre Rechte",
          content: [
            "Recht auf Auskunft, Berichtigung und Löschung (Art. 15–17 DSGVO).",
            "Recht auf Einschränkung der Verarbeitung und auf Datenübertragbarkeit (Art. 18, 20 DSGVO).",
            "Widerspruchsrecht (Art. 21 DSGVO).",
            "Zur Ausübung Ihrer Rechte schreiben Sie uns an contact@me-concept.ro. Wir antworten innerhalb von höchstens 30 Tagen.",
            "Sie haben das Recht, Beschwerde bei der rumänischen Datenschutzaufsichtsbehörde (Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal – ANSPDCP), B-dul G-ral. Gheorghe Magheru 28-30, sector 1, București, anspdcp@dataprotection.ro, einzulegen.",
          ],
        },
        {
          title: "10. Sicherheit",
          content:
            "Wir verwenden verschlüsselte Verbindungen (HTTPS/TLS), eine passwortlose Anmeldung mit Einmalcode, Zugriffsregeln auf Datenbankebene (jede Firma sieht nur ihre eigenen Daten) und eine private Speicherung der Fotos.",
        },
        {
          title: "11. Kinder",
          content:
            "Die App ist für den beruflichen Gebrauch bestimmt und richtet sich nicht an Personen unter 16 Jahren.",
        },
        {
          title: "12. Änderungen",
          content:
            "Wir können diese Datenschutzerklärung aktualisieren, wenn sich die App oder die Rechtslage ändert. Die aktuelle Version ist stets auf dieser Seite mit dem Datum der letzten Aktualisierung verfügbar.",
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
