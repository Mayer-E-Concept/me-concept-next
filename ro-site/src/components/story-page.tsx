import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const PARAGRAPHS = [
  "Sunt Martin, născut și crescut în Germania, cu rădăcini românești din partea tatălui și germane din partea mamei. Această combinație m-a marcat dintotdeauna, chiar dacă nu am fost mereu conștient de asta.",
  "Totul a început clasic: am învățat meseria de la instalații electrice, apoi am urcat treptat, șef de șantier, șef de proiect, la un moment dat maistru electrician autorizat (Elektromeister). 20 de ani în domeniul electric, cu tot ce presupune asta: șantiere, clienți, nopți nedormite și probleme care, până la urmă, s-au rezolvat mereu.",
  "La începutul lui 2022 am ajuns la un punct în care am știut: nu e suficient să continui pur și simplu ca până acum. Voiam mai mult, pentru mine și pentru familia mea. Așa că ne-am făcut bagajele și ne-am mutat la Sibiu. Nu a fost un flirt de vacanță cu România, ci un nou început adevărat. Natura de aici, ritmul, calitatea vieții, exact ce căutam.",
  "Să construiești o firmă de la distanță a sunat inițial nebunesc. Poate că și este, un pic. Dar exact din asta a apărut Mayer E-Concept SRL, biroul meu de proiectare pentru instalații electrotehnice. Din Sibiu continui să planific și să gestionez proiecte în toată Germania, exact ca înainte.",
  "În același timp, vreau să fac următorul pas: vreau să folosesc experiența mea pentru a planifica și implementa proiecte și aici, în România, la exact același standard pe care l-am învățat și aplicat în toți acești ani în Germania. Meșteșug curat, planificare gândită temeinic, procese clare, asta nu ține de țară, ci de atitudine. Fie că e vorba de Germania sau de România, cine vrea precizie și calitate la standard german găsește în mine partenerul potrivit.",
  "Ce nu se schimbă: pretenția de planificare curată și temeinică. Firma mea este certificată ISO 9001:2015 și lucrez consecvent conform standardelor HOAI, DIN 18015 și VDE, sau i7 în ambele țări, în egală măsură.",
  "Uneori trebuie să dai totul peste cap ca să ajungi exact acolo unde ai vrut. Și indiferent dacă proiectul tău e în Germania sau aici, în Ardeal, mă bucur să-l realizăm împreună.",
];

export function StoryPage() {
  return (
    <>
      <SiteHeader />
      <main
        style={{
          background: "#051E27",
          minHeight: "100vh",
          color: "#F4F2EC",
          paddingTop: "calc(72px + clamp(48px, 6vw, 96px))",
          paddingBottom: "clamp(64px, 8vw, 120px)",
        }}
      >
        <style>{`
          @media (max-width: 640px) {
            .story-photo { float: none !important; width: 100% !important; margin: 0 0 24px 0 !important; }
          }
        `}</style>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 40px)",
          }}
        >
          <nav style={{ marginBottom: 40 }}>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11.5px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#1A6F7A",
                textDecoration: "none",
              }}
            >
              ← Acasă
            </Link>
          </nav>

          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(28px, 3.8vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "#F4F2EC",
              maxWidth: "22ch",
              marginBottom: 32,
            }}
          >
            Povestea mea: de la electrician la antreprenor, între Germania și România
          </h1>

          <div>
            {/* Floated (not flexed) so the text wraps naturally around the
                image's actual height instead of leaving a gap when the first
                paragraph is shorter than the photo. */}
            <div
              className="story-photo"
              style={{
                position: "relative",
                float: "left",
                width: 300,
                aspectRatio: "3/4",
                borderRadius: 14,
                overflow: "hidden",
                margin: "0 28px 20px 0",
              }}
            >
              <Image
                src="/uploads/poveste.jpg"
                alt="Martin Mayer"
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                style={{ objectFit: "cover" }}
              />
            </div>

            {PARAGRAPHS.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(15px, 1.3vw, 17px)",
                  lineHeight: 1.8,
                  color: i === 0 ? "rgba(244,242,236,0.80)" : "rgba(244,242,236,0.75)",
                  margin: "0 0 20px",
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
