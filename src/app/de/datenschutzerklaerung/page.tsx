import type { Metadata } from "next";
import { LegalPageDe } from "@/components/de/legal-page";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — Mayer E-Concept",
  description:
    "Datenschutzerklärung von Mayer E-Concept gemäß DSGVO: welche Daten wir über das Kontaktformular erheben, wie wir sie verwenden und Ihre Rechte.",
  alternates: {
    canonical: "/de/datenschutzerklaerung",
  },
};

export default function DatenschutzPage() {
  return (
    <LegalPageDe
      title="Datenschutzerklärung"
      lastUpdated="Zuletzt aktualisiert am 27. Mai 2026 | Gemäß DSGVO (EU) 2016/679 und TDDDG"
      backLabel="← Startseite"
      contactLabel="Kontaktdaten des Verantwortlichen"
      sections={[
        {
          title: "1. Verantwortlicher",
          content:
            "Verantwortlicher im Sinne der DSGVO ist: MAYER E-CONCEPT S.R.L., Str. Atena, Nr. 5, Ap. 1, 550049 Sibiu (Hermannstadt), Rumänien. Telefon: +40 752 099 791. E-Mail: info@me-concept.de. Wir haben keinen gesetzlich vorgeschriebenen Datenschutzbeauftragten benannt, da die Schwellenwerte nach Art. 37 DSGVO und § 38 BDSG nicht erreicht werden. Bei datenschutzbezogenen Anfragen wenden Sie sich bitte direkt an die oben genannte E-Mail-Adresse.",
        },
        {
          title: "2. Erhebung und Verarbeitung personenbezogener Daten",
          content: "",
          subsections: [
            {
              title: "2.1 Kontaktformular",
              content:
                "Wenn Sie unser Kontaktformular nutzen, erheben wir Ihren Namen, Ihre E-Mail-Adresse und den Inhalt Ihrer Nachricht. Diese Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Massnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung geschäftlicher Anfragen). Die Daten werden nicht an Dritte weitergegeben und nicht für andere Zwecke verarbeitet.",
            },
            {
              title: "2.2 Server-Logfiles",
              content:
                "Beim Zugriff auf unsere Website erfasst der Hosting-Anbieter automatisch technische Daten in Server-Logfiles: anonymisierte IP-Adresse, Browsertyp und -version, Betriebssystem, aufgerufene Seite, Datum und Uhrzeit des Zugriffs. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Sicherheit und Stabilität des Dienstes). Die Daten werden nach 30 Tagen automatisch gelöscht.",
            },
            {
              title: "2.3 Webfonts",
              content:
                "Diese Website verwendet die Schriftarten Manrope und Inter. Die Schriftarten werden beim Build-Prozess heruntergeladen und von unseren eigenen Servern ausgeliefert (Self-Hosting via Next.js Font Optimization). Es werden keine Daten an Google-Server oder Dritte übermittelt.",
            },
          ],
        },
        {
          title: "3. Speicherdauer",
          content:
            "Daten aus dem Kontaktformular werden für die Dauer der Bearbeitung Ihrer Anfrage und anschließend für maximal 3 Jahre nach dem letzten Kontakt gespeichert, entsprechend der handels- und steuerrechtlichen Aufbewahrungsfristen. Server-Logfiles werden nach 30 Tagen gelöscht. Nach Ablauf der Fristen werden die Daten routinemäßig gelöscht, sofern keine gesetzliche Aufbewahrungspflicht besteht.",
        },
        {
          title: "4. Weitergabe von Daten",
          content:
            "Ihre personenbezogenen Daten werden ausschließlich von autorisiertem Personal der MAYER E-CONCEPT S.R.L. verarbeitet. Eine Weitergabe an Dritte erfolgt nur, soweit dies gesetzlich vorgeschrieben ist oder technische Auftragsverarbeiter (Art. 28 DSGVO) eingesetzt werden, die angemessene Datenschutzgarantien bieten.",
        },
        {
          title: "5. Drittlandübermittlung",
          content:
            "Die Website wird auf der Plattform Vercel Inc. (USA) gehostet. Vercel ist auf Basis der von der Europäischen Kommission genehmigten Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO) zertifiziert. Darüber hinaus finden keine Datenübermittlungen in Drittländer statt.",
        },
        {
          title: "6. Ihre Rechte nach DSGVO",
          content: [
            "Auskunftsrecht (Art. 15 DSGVO): Sie haben das Recht, eine Kopie der Sie betreffenden personenbezogenen Daten zu erhalten.",
            "Recht auf Berichtigung (Art. 16 DSGVO): Sie können die Berichtigung unrichtiger oder die Vervollständigung unvollständiger Daten verlangen.",
            "Recht auf Löschung (Art. 17 DSGVO): Sie können die Löschung Ihrer Daten verlangen, wenn diese nicht mehr erforderlich sind oder die Einwilligung widerrufen wird.",
            "Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO): Unter bestimmten Voraussetzungen können Sie die Einschränkung der Verarbeitung verlangen.",
            "Recht auf Datenübertragbarkeit (Art. 20 DSGVO): Sie können Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format erhalten.",
            "Widerspruchsrecht (Art. 21 DSGVO): Sie können der Verarbeitung Ihrer Daten, die auf Art. 6 Abs. 1 lit. f DSGVO beruht, jederzeit widersprechen.",
            "Recht auf Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO): Eine erteilte Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden.",
            "Kein automatisiertes Entscheidungsverfahren: Wir nutzen keine Profilerstellung oder automatisierten Entscheidungen im Sinne des Art. 22 DSGVO.",
          ],
        },
        {
          title: "7. Beschwerderecht bei der Aufsichtsbehörde",
          content:
            "Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist die Aufsichtsbehörde Ihres gewöhnlichen Aufenthaltsortes, Ihres Arbeitsplatzes oder des Ortes des mutmaßlichen Verstoßes. In Deutschland können Sie sich an den Bundesbeauftragten für den Datenschutz und die Informationsfreiheit (BfDI) wenden: Graurheindorfer Str. 153, 53117 Bonn, www.bfdi.bund.de. Alternativ ist die Aufsichtsbehörde des jeweiligen Bundeslandes zuständig.",
        },
        {
          title: "8. Datensicherheit",
          content:
            "Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine TLS-Verschlüsselung (HTTPS). Wir treffen geeignete technische und organisatorische Maßnahmen gemäß Art. 32 DSGVO, um Ihre Daten vor unbefugtem Zugriff, Verlust oder Manipulation zu schützen.",
        },
        {
          title: "9. Cookies",
          content:
            "Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb der Website erforderlich sind. Wir setzen keine Tracking-Cookies, keine Marketing-Cookies und keine Pixels von Drittanbietern ein. Rechtsgrundlage: § 25 Abs. 2 Nr. 2 TDDDG. Für weitere Informationen beachten Sie bitte unsere Cookie-Richtlinie.",
        },
        {
          title: "10. Aktualität und Änderungen dieser Datenschutzerklärung",
          content:
            "Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie stets den aktuellen rechtlichen Anforderungen zu entsprechen oder Änderungen unserer Leistungen umzusetzen. Die jeweils aktuelle Version ist auf dieser Seite verfügbar. Wir empfehlen, diese Seite regelmäßig zu besuchen.",
        },
      ]}
      contactInfo={{
        company: "Mayer E-Concept S.R.L.",
        address: "Str. Atena, Nr. 5, Ap. 1, 550049 Sibiu",
        country: "Rumänien",
        website: "https://me-concept.de",
        email: "info@me-concept.de",
        phone: "+40 752 099 791",
      }}
    />
  );
}
