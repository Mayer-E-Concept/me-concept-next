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
      <div
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
        {/* Left — text */}
        <div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(28px, 3.4vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              color: "#0E323D",
              maxWidth: "18ch",
              marginBottom: 28,
            }}
          >
            Încredere și Calitate
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.7,
              color: "#335058",
              marginBottom: 24,
              maxWidth: "52ch",
            }}
          >
            Mayer E-Concept operează cu un sistem de management al calității
            certificat ISO 9001:2015 de SKYCERT. Fiecare proiect urmează
            procese documentate, cu trasabilitate completă de la documentație
            la recepție finală.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.7,
              color: "#335058",
              maxWidth: "52ch",
            }}
          >
            Respectăm standardele HOAI, DIN și VDE, asigurând compatibilitatea
            documentației cu cerințele clienților din Germania, Austria și
            România. Comunicăm fluent în română și germană pe tot parcursul
            colaborării.
          </p>
        </div>

        {/* Right — certification badges */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #D8DCDE",
              borderRadius: 12,
              padding: "32px 40px",
              display: "flex",
              alignItems: "center",
              gap: 24,
              width: "100%",
              maxWidth: 420,
            }}
          >
            <Image
              src="/uploads/SKYCERT9001.png"
              alt="ISO 9001:2015 SKYCERT"
              width={120}
              height={80}
              style={{ objectFit: "contain", maxHeight: 80, width: "auto" }}
            />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#1A6F7A",
                  marginBottom: 6,
                }}
              >
                Certificat
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#0E323D",
                  letterSpacing: "-0.01em",
                }}
              >
                ISO 9001:2015
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "#5E6B70",
                  marginTop: 4,
                }}
              >
                Management al Calității · SKYCERT
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[
              { value: "20+", label: "Ani experiență" },
              { value: "80+", label: "Proiecte finalizate" },
              { value: "4+", label: "Angajați specialiști" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(28px, 3vw, 38px)",
                    fontWeight: 800,
                    color: "#1A6F7A",
                    lineHeight: 1,
                    marginBottom: 6,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#5E6B70",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
