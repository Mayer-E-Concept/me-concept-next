import Image from "next/image";

const SERVICES = [
  {
    num: "01",
    title: "Construcții Civile",
    desc: "Proiectarea și echiparea electrică realizate de un expert pot îmbunătăți eficiența energetică a unei clădiri, reducând semnificativ consumul de energie și costurile pe termen lung.",
    img: "/uploads/electrician_22.jpg",
  },
  {
    num: "02",
    title: "Spații Comerciale",
    desc: "Proiectăm un sistem electric adaptat nevoilor specifice, fie că este vorba de o unitate comercială, showroom sau centru logistic. Soluții personalizate pentru optimizarea fluxurilor de lucru.",
    img: "/uploads/spati-comerciale-2.jpg",
  },
  {
    num: "03",
    title: "Iluminat Tehnic",
    desc: "Proiectăm soluții de iluminat tehnic adaptate fiecărui spațiu — hale industriale, birouri, spații comerciale — cu focus pe eficiență energetică, confort vizual și durabilitate.",
    img: "/uploads/electrician_31.jpg",
  },
  {
    num: "04",
    title: "Iluminat Arhitectural",
    desc: "Dăm viață clădirilor și spațiilor exterioare prin proiectarea unui iluminat arhitectural impresionant. Punem în valoare detaliile arhitecturale și creăm atmosferă unică.",
    img: "/uploads/Iluminat-Arhitctural.jpg",
  },
  {
    num: "05",
    title: "Sisteme de Alimentare și Distribuție Electrică",
    desc: "Proiectăm sisteme de alimentare și distribuție electrică pentru clădiri rezidențiale, comerciale și industriale. Soluțiile noastre garantează un flux electric stabil și sigur.",
    img: "/uploads/iStock-1192061868.jpg",
  },
  {
    num: "06",
    title: "Sisteme de Automatizare și Control",
    desc: "Automatizăm procesele și optimizăm consumul de energie. Proiectăm sisteme inteligente KNX care fac managementul clădirilor mai simplu și mai eficient.",
    img: "/uploads/Automatizare.jpg",
  },
  {
    num: "07",
    title: "Sisteme de Paratrăsnet și Împământare",
    desc: "Protejarea clădirilor împotriva descărcărilor atmosferice este esențială. Proiectăm sisteme de paratrăsnet și împământare care oferă siguranță completă.",
    img: "/uploads/proiectare-instalatii-electrice-sibiu-2.jpg",
  },
  {
    num: "08",
    title: "Sisteme de Iluminat de Urgență",
    desc: "Asigurăm continuitatea vizibilității și siguranța în situații de urgență prin proiectarea sistemelor de iluminat de siguranță și evacuare, conforme cu toate reglementările.",
    img: "/uploads/electrician_35.jpg",
  },
];

export function ExpertiseSection() {
  return (
    <section
      id="servicii"
      style={{
        background: "#0E323D",
        paddingTop: "clamp(72px, 9vw, 120px)",
        paddingBottom: "clamp(72px, 9vw, 120px)",
        scrollMarginTop: "72px",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .expertise-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
        <div style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C5895B",
              marginBottom: 14,
              paddingBottom: 14,
              borderBottom: "1px solid rgba(255,255,255,0.12)",
              display: "inline-block",
            }}
          >
            Domenii de expertiză
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(28px, 3.2vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              color: "#F4F2EC",
              maxWidth: "28ch",
            }}
          >
            Proiectare electrică pentru orice tip de construcție
          </h2>
        </div>

        <div
          className="expertise-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {SERVICES.map((s) => (
            <div
              key={s.num}
              style={{
                background: "#FFFFFF",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.10)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                <Image
                  src={s.img}
                  alt={s.title}
                  width={560}
                  height={315}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ padding: "24px 24px 28px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#0E323D",
                    letterSpacing: "-0.01em",
                    marginBottom: 10,
                    lineHeight: 1.3,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "#335058",
                    margin: 0,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
