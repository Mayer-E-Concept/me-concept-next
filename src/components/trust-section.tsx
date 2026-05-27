"use client";
import Image from "next/image";

export function TrustSection() {
  return (
    <section
      style={{
        background: "#0E323D",
        paddingTop: "clamp(72px, 9vw, 130px)",
        paddingBottom: "clamp(72px, 9vw, 130px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .trust-top-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .trust-bottom-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>

      {/* Subtle circuit overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: 'url("/assets/circuit-pattern.svg")',
          backgroundSize: "260px 260px",
          filter: "invert(1)",
          opacity: 0.03,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
          position: "relative",
          zIndex: 1,
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
            marginBottom: "clamp(48px, 6vw, 80px)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C5895B",
                marginBottom: 18,
              }}
            >
              Despre noi
            </div>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(28px, 3.4vw, 44px)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                color: "#F4F2EC",
                marginBottom: 0,
              }}
            >
              Încredere și Calitate în Proiectarea Instalațiilor Electrice
            </h2>
          </div>
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(14px, 1.1vw, 16px)",
                lineHeight: 1.75,
                color: "rgba(244,242,236,0.65)",
                marginBottom: 32,
              }}
            >
              Dacă sunteți în căutarea unei firme de proiectare electrică cu adevărat pricepute,
              capabile să transforme complexitatea instalațiilor într-o soluție sigură și eficientă,
              suntem partenerul de care aveți nevoie. Cu o experiență vastă în spate și o echipă
              dedicată excelenței, oferim servicii de proiectare electrică personalizate, la cele mai
              înalte standarde, orientate către succesul proiectului dumneavoastră.
            </p>
            <a
              href="/#despre"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 52,
                padding: "0 28px",
                background: "#C5895B",
                color: "#fff",
                border: "1.5px solid #C5895B",
                borderRadius: 4,
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background .2s ease, transform .2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#b37a50";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#C5895B";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              Despre Mayer E-Concept
            </a>
          </div>
        </div>

        {/* Bottom — two images */}
        <div
          className="trust-bottom-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(12px, 2vw, 24px)",
          }}
        >
          <div
            style={{
              borderRadius: 10,
              overflow: "hidden",
              aspectRatio: "4/3",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Image
              src="/uploads/me-concept-proiectare-instalatii-electrice-romania.jpg"
              alt="Mayer E-Concept — echipa"
              width={600}
              height={450}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          <div
            style={{
              position: "relative",
              borderRadius: 10,
              overflow: "hidden",
              aspectRatio: "4/3",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
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
                bottom: 14,
                right: 14,
                background: "rgba(255,255,255,0.95)",
                borderRadius: 8,
                padding: "8px 12px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
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
