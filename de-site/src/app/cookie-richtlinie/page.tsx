import type { Metadata } from "next";
import { LegalPageDe } from "@/components/legal-page";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie-Richtlinie (EU) — Mayer E-Concept",
  description:
    "Cookie-Richtlinie gemäß EU-Verordnung für die Website me-concept.de.",
  alternates: {
    canonical: "/cookie-richtlinie",
  },
};

export default function CookieRichtliniePage() {
  return (
    <LegalPageDe
      title="Cookie-Richtlinie (EU)"
      lastUpdated="Zuletzt aktualisiert am 27. Mai 2026 | Gemäß TDDDG und DSGVO"
      backLabel="← Startseite"
      contactLabel="Kontaktdaten"
      sections={[
        {
          title: "1. Einleitung",
          content:
            'Unsere Website, https://me-concept.de (im Folgenden "die Website"), verwendet Cookies und andere ähnliche Technologien (der Einfachheit halber werden alle diese Technologien im Folgenden als "Cookies" bezeichnet). Cookies werden auch von Dritten gesetzt, mit denen wir zusammenarbeiten. Im folgenden Dokument informieren wir Sie darüber, wie wir Cookies auf unserer Website verwenden.',
        },
        {
          title: "2. Was sind Cookies?",
          content:
            "Ein Cookie ist eine einfache kleine Datei, die zusammen mit den Seiten dieser Website übermittelt und von Ihrem Browser auf der Festplatte Ihres Computers oder eines anderen Geräts gespeichert wird. Die darin gespeicherten Informationen können bei einem späteren Besuch an unsere Server oder die Server der jeweiligen Dritten zurückgesandt werden.",
        },
        {
          title: "3. Was sind Skripte?",
          content:
            "Ein Skript ist ein Stück Programmcode, das dazu dient, unsere Website korrekt und interaktiv zu betreiben. Dieser Code wird auf unserem Server oder auf Ihrem Gerät ausgeführt.",
        },
        {
          title: "4. Was ist ein Web-Beacon?",
          content:
            'Ein Web-Beacon (auch "Pixel-Tag" genannt) ist ein kleines, unsichtbares Stück Text oder Bild auf einer Website, das zur Überwachung des Datenverkehrs auf der Website verwendet wird. Zur Erfassung des Website-Traffics können Web-Beacons verschiedene Daten über Sie speichern.',
        },
        {
          title: "5. Cookies",
          content: "",
          subsections: [
            {
              title: "5.1 Technische oder funktionale Cookies",
              content:
                "Einige Cookies stellen sicher, dass bestimmte Teile der Website ordnungsgemäß funktionieren und Ihre Benutzerpräferenzen bekannt bleiben. Durch das Setzen funktionaler Cookies machen wir Ihnen den Besuch unserer Website einfacher. Diese Cookies können wir ohne Ihre Einwilligung setzen.",
            },
            {
              title: "5.2 Marketing-/Tracking-Cookies",
              content:
                "Marketing-/Tracking-Cookies sind Cookies, die für die Erstellung von Nutzerprofilen verwendet werden, um Werbung anzuzeigen oder den Nutzer auf dieser oder mehreren Websites für ähnliche Marketingzwecke zu verfolgen.",
            },
            {
              title: "5.3 Soziale Medien",
              content:
                "Unsere Website enthält keine Social-Media-Schaltflächen und keinen Tracking-Code von Facebook, Instagram oder anderen sozialen Plattformen. Es werden keine Social-Media-Cookies gesetzt.",
            },
          ],
        },
        {
          title: "6. Gesetzte Cookies",
          content: [
            "Session-Cookie (notwendig): stellt die Funktion des Kontaktformulars sicher — Funktional, keine Einwilligung erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG)",
            "Browser-Präferenz-Cookie (notwendig): speichert Anzeigeeinstellungen — Funktional, keine Einwilligung erforderlich",
            "Analyse-, Marketing- oder Tracking-Cookies: werden nicht verwendet",
            "Webfonts (Manrope, Inter): werden selbst gehostet — keine Drittanbieter-Cookies",
          ],
        },
        {
          title: "7. Einwilligung",
          content:
            'Wenn Sie unsere Website zum ersten Mal besuchen, zeigen wir Ihnen ein Popup-Fenster mit einer Erklärung zu Cookies. Durch Klicken auf "Einstellungen speichern" erklären Sie sich mit der Verwendung der ausgewählten Cookie-Kategorien gemäß dieser Cookie-Richtlinie einverstanden. Sie können die Verwendung von Cookies über Ihren Browser blockieren, bitte beachten Sie jedoch, dass unsere Website in diesem Fall möglicherweise nicht ordnungsgemäß funktioniert.',
        },
        {
          title: "8. Aktivierung/Deaktivierung und Löschen von Cookies",
          content:
            "Sie können Ihren Internet-Browser verwenden, um Cookies automatisch oder manuell zu löschen. Sie können auch festlegen, dass bestimmte Cookies nicht gesetzt werden dürfen. Bitte beachten Sie, dass unsere Website möglicherweise nicht ordnungsgemäß funktioniert, wenn alle Cookies deaktiviert sind.",
        },
        {
          title: "9. Ihre Rechte in Bezug auf personenbezogene Daten",
          content: [
            "Sie haben das Recht zu wissen, warum Ihre personenbezogenen Daten benötigt werden, was damit passiert und wie lange sie aufbewahrt werden.",
            "Auskunftsrecht: Sie haben das Recht, auf die personenbezogenen Daten zuzugreifen, die wir von Ihnen gesammelt haben.",
            "Recht auf Berichtigung: Sie haben das Recht, Ihre personenbezogenen Daten jederzeit zu ergänzen, zu korrigieren, zu löschen oder zu sperren.",
            "Widerrufsrecht: Wenn Sie uns die Einwilligung zur Verarbeitung Ihrer Daten erteilt haben, haben Sie das Recht, diese Einwilligung zu widerrufen und die Löschung aller personenbezogenen Daten zu verlangen.",
            "Recht auf Datenübertragbarkeit: Sie haben das Recht, alle Ihre personenbezogenen Daten beim Verantwortlichen anzufordern und vollständig an einen anderen Verantwortlichen zu übertragen.",
            "Widerspruchsrecht: Sie können der Verarbeitung Ihrer Daten widersprechen.",
          ],
        },
      ]}
      contactInfo={{
        company: "Mayer E-Concept S.R.L.",
        address: "Str. Atena, Nr. 5, Ap. 1, Sibiu, Kreis Sibiu",
        country: "Rumänien",
        website: `${SITE_URL}/`,
        email: "info@me-concept.de",
      }}
    />
  );
}
