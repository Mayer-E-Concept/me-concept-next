import type { Metadata } from "next";
import { LegalPageDe } from "@/components/de/legal-page";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "AGB — Allgemeine Geschäftsbedingungen — Mayer E-Concept",
  description: "Allgemeine Geschäftsbedingungen für die Nutzung der Website und Dienstleistungen von Mayer E-Concept.",
  alternates: { canonical: "/de/agb" },
};

export default function AgbPage() {
  return (
    <LegalPageDe
      title="Allgemeine Geschäftsbedingungen"
      lastUpdated="Zuletzt aktualisiert am 27. Mai 2026"
      backLabel="← Startseite"
      contactLabel="Kontaktdaten"
      sections={[
        {
          title: "1. Einleitung",
          content:
            "Diese Allgemeinen Geschäftsbedingungen gelten für diese Website und die Transaktionen im Zusammenhang mit unseren Produkten und Dienstleistungen. Möglicherweise haben Sie aufgrund zusätzlicher Verträge, die sich auf Ihre Beziehung zu uns oder auf Produkte oder Dienstleistungen, die Sie von uns erhalten, beziehen, weitere Verpflichtungen. Wenn Bestimmungen zusätzlicher Verträge mit diesen AGB in Konflikt stehen, gelten die Bestimmungen dieser zusätzlichen Verträge.",
        },
        {
          title: "2. Verbindlichkeit",
          content:
            "Durch Registrierung, Zugang oder anderweitige Nutzung dieser Website erklären Sie sich mit der Einhaltung dieser Allgemeinen Geschäftsbedingungen einverstanden. Die bloße Nutzung dieser Website impliziert die Kenntnis und Akzeptanz dieser Bedingungen. In bestimmten Fällen werden wir Ihre ausdrückliche Zustimmung verlangen.",
        },
        {
          title: "3. Elektronische Kommunikation",
          content:
            "Durch die Nutzung dieser Website oder die elektronische Kommunikation mit uns nehmen Sie zur Kenntnis und erklären sich damit einverstanden, dass wir auf unserer Website oder per E-Mail elektronisch mit Ihnen kommunizieren können, und dass alle Vereinbarungen, Bekanntmachungen und sonstigen Mitteilungen, die wir Ihnen elektronisch übermitteln, alle gesetzlichen Anforderungen erfüllen.",
        },
        {
          title: "4. Geistiges Eigentum",
          content:
            "Wir oder unsere Lizenzgeber besitzen und kontrollieren alle Urheberrechte und sonstigen Rechte des geistigen Eigentums an der Website und den auf der Website angezeigten oder zugänglichen Daten, Informationen und anderen Ressourcen.",
          subsections: [
            {
              title: "4.1 Alle Rechte vorbehalten",
              content:
                "Sofern spezifische Inhalte nichts anderes vorsehen, wird Ihnen keine Lizenz oder ein sonstiges Recht aufgrund von Urheberrechten, Marken, Patenten oder sonstigen Rechten des geistigen Eigentums gewährt. Sie dürfen keine Ressourcen von dieser Website ohne unsere vorherige schriftliche Genehmigung verwenden, kopieren, reproduzieren, verteilen, verändern, verkaufen oder anderweitig verbreiten.",
            },
          ],
        },
        {
          title: "5. Eigentum Dritter",
          content:
            "Unsere Website kann Links oder andere Verweise auf die Websites anderer Parteien enthalten. Wir überwachen und prüfen den Inhalt der Websites anderer Parteien nicht. Auf diesen Websites geäußerte Meinungen oder erscheinende Materialien werden von uns nicht unbedingt geteilt oder gebilligt. Wir sind nicht verantwortlich für die Datenschutzpraktiken oder den Inhalt dieser Websites.",
        },
        {
          title: "6. Verantwortungsvolle Nutzung",
          content:
            "Mit dem Besuch unserer Website erklären Sie sich damit einverstanden, diese nur für die in diesen AGB vorgesehenen und erlaubten Zwecke sowie in Übereinstimmung mit allen anwendbaren Gesetzen und Vorschriften zu nutzen. Jegliche Aktivitäten, die der Website Schaden zufügen oder ihre Leistung, Verfügbarkeit oder Zugänglichkeit beeinträchtigen, sind ausdrücklich verboten.",
        },
        {
          title: "7. Vergütung und Vertragsbedingungen",
          content:
            "Unsere Elektroplanungsleistungen werden ausschließlich an Unternehmer im Sinne des § 14 BGB sowie an gewerbliche Auftraggeber (B2B) erbracht. Ein Verbraucherwiderrufsrecht gemäß §§ 312 ff. BGB findet keine Anwendung. Vergütung, Zahlungsbedingungen und Kündigungsmodalitäten werden in den individuellen Auftragsverträgen geregelt, die diesen AGB vorgehen. Diese Website dient ausschließlich zur Information und stellt kein verbindliches Angebot dar.",
        },
        {
          title: "7a. EU-Streitschlichtung und VSBG",
          content:
            "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG), da wir ausschließlich gegenüber Unternehmern tätig sind.",
        },
        {
          title: "8. Einsendung von Ideen",
          content:
            "Senden Sie keine Ideen, Erfindungen, urheberrechtlich geschützten Werke oder andere Informationen, die als Ihr geistiges Eigentum angesehen werden könnten, es sei denn, wir haben zuvor eine Vereinbarung über geistiges Eigentum oder eine Geheimhaltungsvereinbarung unterzeichnet.",
        },
        {
          title: "9. Beendigung der Nutzung",
          content:
            "Wir können nach eigenem Ermessen jederzeit den Zugang zur Website oder zu einem Dienst auf ihr vorübergehend oder dauerhaft ändern oder einstellen. Sie erklären sich damit einverstanden, dass wir Ihnen oder einem Dritten gegenüber nicht haftbar sind für eine solche Änderung, Aussetzung oder Einstellung des Zugangs.",
        },
        {
          title: "10. Gewährleistungen und Haftung",
          content:
            "Diese Website und alle Inhalte auf der Website werden so bereitgestellt, wie sie sind, und soweit verfügbar. Wir lehnen ausdrücklich alle Garantien jeglicher Art in Bezug auf die Verfügbarkeit, Genauigkeit oder Vollständigkeit der Inhalte ab. Nichts auf dieser Website stellt rechtliche, finanzielle oder medizinische Beratung dar.",
        },
        {
          title: "11. Datenschutz",
          content:
            "Wir haben eine Richtlinie entwickelt, um etwaige Datenschutzbedenken, die Sie haben könnten, zu berücksichtigen. Weitere Informationen finden Sie in unserer Datenschutzerklärung und unserer Cookie-Richtlinie.",
        },
        {
          title: "12. Barrierefreiheit",
          content:
            "Wir haben uns verpflichtet, die von uns angebotenen Inhalte für Menschen mit Behinderungen zugänglich zu machen. Wenn Sie eine Behinderung haben und aufgrund Ihrer Behinderung nicht auf bestimmte Teile unserer Website zugreifen können, bitten wir Sie, uns eine Benachrichtigung mit einer detaillierten Beschreibung des aufgetretenen Problems zu senden.",
        },
        {
          title: "13. Exportbeschränkungen / Rechtskonformität",
          content:
            "Der Zugriff auf die Website aus Gebieten oder Ländern, in denen die Inhalte oder der Kauf von Produkten oder Dienstleistungen, die auf der Website verkauft werden, verboten sind, ist untersagt. Sie dürfen diese Website nicht nutzen, wenn dies gegen die Export- und Einfuhrgesetze Rumäniens verstößt.",
        },
        {
          title: "14. Abtretung",
          content:
            "Sie dürfen keine Ihrer Rechte und/oder Pflichten aus diesen AGB ganz oder teilweise an einen Dritten abtreten, übertragen oder unterbeauftragen, ohne unsere vorherige schriftliche Zustimmung.",
        },
        {
          title: "15. Verletzung dieser AGB",
          content:
            "Unbeschadet unserer sonstigen Rechte aus diesen AGB können wir, wenn Sie diese AGB in irgendeiner Weise verletzen, Maßnahmen ergreifen, die wir für angemessen halten, einschließlich der vorübergehenden oder dauerhaften Sperrung Ihres Zugangs zur Website und/oder der Einleitung rechtlicher Schritte gegen Sie.",
        },
        {
          title: "16. Freistellung",
          content:
            "Sie erklären sich damit einverstanden, uns von allen Ansprüchen, Forderungen, Verbindlichkeiten, Schäden, Verlusten und Kosten freizustellen und zu verteidigen, die sich aus einem Verstoß gegen diese AGB und die geltenden Gesetze ergeben.",
        },
        {
          title: "17. Verzicht",
          content:
            "Die Nichtdurchsetzung einer Bestimmung dieser AGB gilt nicht als Verzicht auf diese Bestimmung und beeinträchtigt nicht die Gültigkeit dieser AGB oder eines Teils davon.",
        },
        {
          title: "18. Sprache",
          content:
            "Diese AGB werden ausschließlich auf Deutsch ausgelegt und verstanden. Alle Mitteilungen und die gesamte Korrespondenz erfolgen ausschließlich in dieser Sprache.",
        },
        {
          title: "19. Gesamte Vereinbarung",
          content:
            "Diese AGB bilden zusammen mit unserer Datenschutzerklärung und der Cookie-Richtlinie die gesamte Vereinbarung zwischen Ihnen und MAYER E-CONCEPT S.R.L. in Bezug auf Ihre Nutzung dieser Website.",
        },
        {
          title: "20. Aktualisierung dieser AGB",
          content:
            "Wir können diese AGB regelmäßig aktualisieren. Es liegt in Ihrer Verantwortung, diese AGB regelmäßig auf Änderungen oder Aktualisierungen zu überprüfen. Änderungen dieser AGB treten nach ihrer Veröffentlichung auf dieser Website in Kraft.",
        },
        {
          title: "21. Anwendbares Recht und Gerichtsstand",
          content:
            "Diese AGB unterliegen dem Recht Rumäniens. Alle Streitigkeiten im Zusammenhang mit diesen AGB unterliegen der Zuständigkeit der rumänischen Gerichte.",
        },
      ]}
      contactInfo={{
        company: "Mayer E-Concept S.R.L.",
        address: "Str. Atena, Nr. 5, Ap. 1, Sibiu, Kreis Sibiu",
        country: "Rumänien",
        website: `${SITE_URL}/de`,
        email: "info@me-concept.de",
      }}
    />
  );
}
