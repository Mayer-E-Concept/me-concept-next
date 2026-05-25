"use client";
import Image from "next/image";

export function TrustSection() {
  return (
    <section
      style={{
        background: "#F6F7F7",
        paddingTop: "clamp(72px, 9vw, 130px)",
        paddingBottom: "clamp(72px, 9vw, 130px)",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .trust-top-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .trust-bottom-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>

      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
        }}
      >
        {/* Top — heading + text + button */}
        <div
          className="trust-top-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 6vw, 100px)",
            alignItems: "start",
            marginBottom: "clamp(40px, 5vw, 64px)",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(28px, 3.4vw, 42px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.12,
                color: "#0E323D",
                marginBottom: 28,
              }}
            >
              Încredere și Calitate în Proiectarea Instalațiilor Electrice!
            </h2>
          </div>
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.7,
                color: "#335058",
                marginBottom: 28,
              }}
            >
              Dacă sunteți în căutarea unei firme de proiectare electrică cu adevărat pricepută,
              capabilă să transforme complexitatea instalațiilor într-o soluție sigură și eficientă,
              suntem partenerul de care aveți nevoie. Cu o experiența vastă în spate și o echipă
              dedicată excelenței, oferim servicii de proiectare electrică personalizate, la cele mai
              înalte standarde, orientate către succesul proiectului dumneavoastră.
            </p>
            <a
              href="#despre"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 56,
                padding: "0 30px",
                background: "#0E323D",
                color: "#ffffff",
                border: "1.5px solid #0E323D",
                borderRadius: 4,
                fontFamily: "var(--font-sans)",
                fontSize: "12.5px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background .2s ease, border-color .2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#C5895B";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#C5895B";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#0E323D";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#0E323D";
              }}
            >
              Despre Mayer E-Concept
            </a>
          </div>
        </div>

        {/* Bottom — two images side by side */}
        <div
          className="trust-bottom-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(16px, 3vw, 32px)",
          }}
        >
          <div style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "4/3" }}>
            <Image
              src="/uploads/me-concept-proiectare-instalatii-electrice-romania.jpg"
              alt="Mayer E-Concept — echipa"
              width={600}
              height={450}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", aspectRatio: "4/3" }}>
            <Image
              src="/uploads/Plan-Exemplu-2.png"
              alt="Plan instalații electrice"
              width={600}
              height={450}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 16,
                right: 16,
                background: "rgba(255,255,255,0.92)",
                borderRadius: 8,
                padding: "8px 12px",
                boxShadow: "0 4px 16px rgba(14,50,61,0.12)",
              }}
            >
              <Image
                src="/uploads/SKYCERT9001.png"
                alt="ISO 9001:2015 SKYCERT"
                width={90}
                height={60}
                style={{ objectFit: "contain", display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
