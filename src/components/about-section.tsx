import Image from "next/image";

/* Fuziune Trust + Specialists: o singură secțiune „Despre noi" —
   poziționare concretă + echipă + credențiale, fără dubluri ISO. */

const CREDENTIALS = [
  "Ingineri proiectanți cu experiență LPH 1–8 pe piața germană",
  "Modele BIM coordonate, cu verificare digitală a coliziunilor",
  "Documentație avizabilă: NP-I7 · PE 132 în România, HOAI · DIN · VDE în Germania",
];

export function AboutSection() {
  return (
    <section
      id="despre"
      style={{
        background: "#D9EAEC",
        paddingTop: "clamp(72px, 9vw, 130px)",
        paddingBottom: "clamp(72px, 9vw, 130px)",
        scrollMarginTop: "72px",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>

      <div
        className="about-grid"
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px, 6vw, 100px)",
          alignItems: "center",
        }}
      >
        {/* Stânga — poziționare + credențiale */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C5895B",
              marginBottom: 20,
            }}
          >
            Despre noi
          </div>

          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(30px, 3.4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "#0E323D",
              maxWidth: "22ch",
              marginBottom: 24,
            }}
          >
            Specialiști în proiectarea instalațiilor electrice
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 1.1vw, 16px)",
              lineHeight: 1.75,
              color: "#335058",
              marginBottom: 32,
              maxWidth: "52ch",
            }}
          >
            De peste 20 de ani proiectăm instalații electrice pentru clădiri
            rezidențiale, comerciale și industriale — din Sibiu, pentru România
            și Germania. Proiectăm în BIM, cu modele 3D coordonate, iar fiecare
            proiect trece printr-un sistem de calitate auditat anual.
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {CREDENTIALS.map((c) => (
              <li
                key={c}
                style={{
                  position: "relative",
                  paddingLeft: 24,
                  marginBottom: 14,
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(14px, 1.05vw, 16px)",
                  color: "#0E323D",
                  lineHeight: 1.55,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#C5895B",
                    flexShrink: 0,
                  }}
                />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Dreapta — echipă + ISO + citat */}
        <div>
          <div
            style={{
              position: "relative",
              borderRadius: 12,
              overflow: "hidden",
              aspectRatio: "4/3",
              boxShadow: "0 12px 40px rgba(14,50,61,0.18)",
            }}
          >
            <Image
              src="/uploads/echipa-159-duotone.jpg"
              alt="Echipa Mayer E-Concept — proiectare instalații electrice"
              fill
              sizes="(max-width:767px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
            />
            {/* ISO badge — o singură apariție pe homepage */}
            <div
              style={{
                position: "absolute",
                left: 16,
                bottom: 16,
                background: "rgba(255,255,255,0.96)",
                borderRadius: 8,
                padding: "10px 14px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              }}
            >
              <Image
                src="/uploads/SKYCERT9001.png"
                alt="ISO 9001:2015 SKYCERT"
                width={96}
                height={64}
                style={{ objectFit: "contain", display: "block" }}
              />
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <div style={{ width: 36, height: 2, background: "#C5895B", borderRadius: 1, marginBottom: 18 }} />
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(15px, 1.4vw, 18px)",
                fontWeight: 300,
                lineHeight: 1.7,
                color: "#335058",
                fontStyle: "italic",
                margin: "0 0 14px",
              }}
            >
              „Proiectăm instalații electrice sigure, eficiente și certificate —
              de la concept la detaliu de execuție."
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                paddingTop: 14,
                borderTop: "1px solid rgba(14,50,61,0.12)",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C5895B",
                }}
              >
                Mayer E-Concept
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  color: "#56707A",
                  letterSpacing: "0.04em",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#C5895B",
                    flexShrink: 0,
                  }}
                />
                Atestat ANRE · Sibiu, Transilvania
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
