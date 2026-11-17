import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { AREAS_SIBIU } from "@/lib/business";
import { ServiceLanding } from "@/components/service-landing";
import { LANDING_CTA, LANDING_QUOTE, LANDING_STATS, landingMeta } from "@/lib/landing-common";

const PATH = "/statii-de-incarcare-sibiu";

export const metadata: Metadata = landingMeta(
  PATH,
  "Stații de încărcare mașini electrice Sibiu | Montaj wallbox | ME-Concept",
  "Montaj de stații de încărcare (wallbox) pentru mașini electrice în Sibiu și împrejurimi, acasă sau la firmă. Circuit dedicat, protecții corecte, verificarea puterii disponibile. Atestat ANRE.",
  SITE_URL,
);

export default function StatiiDeIncarcareSibiu() {
  return (
    <ServiceLanding
      path={PATH}
      eyebrow="Stații de încărcare · Sibiu"
      serviceName="Montaj stații de încărcare pentru mașini electrice în Sibiu"
      serviceType="Stații de încărcare pentru mașini electrice"
      title={["Stații de încărcare", "pentru mașina electrică", "în Sibiu."]}
      lead="Montăm wallbox-ul acasă sau la firmă, pe circuit dedicat și cu protecțiile corecte. Verificăm întâi puterea disponibilă și tabloul, ca stația să încarce sigur și fără să sară siguranțele."
      hero={{ src: "/uploads/pv-wallbox-schema.jpg", alt: "Schemă: wallbox pentru mașina electrică, legat la tabloul casei și la panourile fotovoltaice", pos: "right center" }}
      quote={LANDING_QUOTE}
      stats={LANDING_STATS}
      chips={["Atestat ANRE A + B", "ISO 9001:2015", "Elektromeister german", "Sibiu și împrejurimi"]}
      cta={LANDING_CTA}
      cardsTitle="Încarci acasă, sigur și fără griji"
      cards={[
        {
          title: "Wallbox acasă",
          text: "În garaj, pe fațadă sau pe un stâlp în curte. Tragem un circuit dedicat din tablou, cu siguranță și protecție diferențială potrivite pentru încărcarea mașinilor electrice, și punem stația în funcțiune.",
          img: { src: "/uploads/pv-wallbox-schema.jpg", alt: "Schemă: wallbox montat lângă casă", pos: "85% center" },
        },
        {
          title: "Stații pentru firme",
          text: "Pentru flota firmei, angajați sau clienți, cu împărțirea puterii între mai multe stații.",
          img: { src: "/uploads/spati-comerciale-2.jpg", alt: "Clădire comercială pregătită pentru stații de încărcare" },
        },
        {
          title: "Tablou și putere disponibilă",
          text: "Verificăm branșamentul și tabloul înainte de montaj.",
          img: { src: "/uploads/Automatizare.jpg", alt: "Tablou electric pregătit pentru o stație de încărcare" },
          href: "/tablouri-electrice-sibiu",
        },
        {
          title: "Încărcare din fotovoltaice",
          text: "Legăm wallbox-ul cu sistemul fotovoltaic, ca mașina să încarce din energia ta.",
          img: { src: "/uploads/Iluminat-Arhitctural.jpg", alt: "Casă pregătită pentru fotovoltaice și wallbox" },
          href: "/panouri-fotovoltaice-sibiu",
        },
        {
          title: "Toată instalația electrică",
          text: "Executăm și restul instalației, de la circuite la tablou.",
          img: { src: "/uploads/ME-CONCEPT-162.jpg", alt: "Echipa Mayer E-Concept pe șantier, cu planurile instalației", pos: "70% center" },
          href: "/instalatii-electrice-sibiu",
        },
      ]}
      steps={[
        { title: "Discuție", text: "ne spui ce mașină ai, unde parchezi și ce branșament ai." },
        { title: "Verificare și ofertă", text: "verificăm tabloul și puterea disponibilă, apoi primești o ofertă clară." },
        { title: "Montaj", text: "tragem circuitul dedicat, montăm stația și protecțiile." },
        { title: "Punere în funcțiune", text: "măsurăm, pornim stația și îți arătăm cum se folosește." },
      ]}
      areas={AREAS_SIBIU}
      faqs={[
        {
          q: "Pot monta o stație de încărcare acasă?",
          a: "De cele mai multe ori, da. Verificăm întâi puterea disponibilă și tabloul electric, apoi montăm stația pe un circuit dedicat, cu protecțiile corecte.",
        },
        {
          q: "Am nevoie de curent trifazat?",
          a: "Nu neapărat. Pe un branșament monofazat, un wallbox încarcă de regulă cu până la 7,4 kW, ceea ce ajunge pentru încărcarea peste noapte. Pentru 11 kW sau 22 kW este nevoie de branșament trifazat.",
        },
        {
          q: "Trebuie mărită puterea contractată?",
          a: "Depinde de branșamentul tău și de ceilalți consumatori din casă. Dacă puterea nu ajunge, sporul de putere se cere la operatorul de distribuție. Uneori este suficient ca stația să își reducă singură puterea atunci când în casă se consumă mult.",
        },
        {
          q: "De ce nu este bine să încarc zilnic de la o priză obișnuită?",
          a: "O priză obișnuită nu este făcută pentru curent mare timp de multe ore, zi de zi. Contactele se pot încălzi, iar încărcarea durează mult. Un wallbox pe circuit dedicat încarcă mai repede și are protecțiile necesare.",
        },
        {
          q: "Pot încărca mașina din panourile fotovoltaice?",
          a: "Da. Stația poate fi legată cu sistemul fotovoltaic, astfel încât mașina să încarce mai ales atunci când panourile produc mai mult decât consumă casa.",
        },
        {
          q: "În ce localități montați?",
          a: `În Sibiu și împrejurimi: ${AREAS_SIBIU.join(", ")}. Pentru proiecte mai mari venim și în alte localități din județ.`,
        },
      ]}
      related={{ href: "/panouri-fotovoltaice-sibiu", label: "Panouri fotovoltaice în Sibiu" }}
    />
  );
}
