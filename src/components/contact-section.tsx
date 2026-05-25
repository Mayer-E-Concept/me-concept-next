"use client";
import { useState } from "react";
import Image from "next/image";

export function ContactSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        background: "#051E27",
        paddingTop: "clamp(72px, 9vw, 130px)",
        paddingBottom: "clamp(72px, 9vw, 130px)",
        overflow: "hidden",
        color: "#F4F2EC",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .contact-name-email-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* PCB overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: 'url("/assets/circuit-pattern.svg")',
          backgroundSize: "240px 240px",
          opacity: 0.10,
          filter: "invert(1)",
          pointerEvents: "none",
        }}
      />

      <div
        className="contact-grid"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px, 6vw, 100px)",
          alignItems: "start",
        }}
      >
        {/* Left — info */}
        <div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(28px, 3.4vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              color: "#F4F2EC",
              maxWidth: "20ch",
              marginBottom: 28,
            }}
          >
            Hai să discutăm despre proiectul tău
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.7,
              color: "rgba(244,242,236,0.75)",
              marginBottom: 40,
              maxWidth: "46ch",
            }}
          >
            Trimite-ne un mesaj sau contactează-ne direct. Răspundem în termen
            de 24 de ore în zilele lucrătoare.
          </p>

          {/* Contact details */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
            {[
              { label: "Adresă", value: "Str. Autogarii, nr. 1, Sibiu, Județ: Sibiu" },
              { label: "Telefon", value: "+40 752 129 500", href: "tel:+40752129500" },
              { label: "Email", value: "m.poenar@me-concept.de", href: "mailto:m.poenar@me-concept.de" },
              { label: "Program", value: "Luni–Vineri, 09:00–18:00" },
            ].map(({ label, value, href }) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#1A6F7A",
                    marginBottom: 4,
                  }}
                >
                  {label}
                </div>
                {href ? (
                  <a
                    href={href}
                    style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#F4F2EC", textDecoration: "none" }}
                  >
                    {value}
                  </a>
                ) : (
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#F4F2EC" }}>
                    {value}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Certification badges */}
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <a
              href="https://anpc.ro/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/uploads/images.png"
                alt="ANPC SAL"
                width={80}
                height={50}
                style={{ objectFit: "contain", display: "block" }}
              />
            </a>
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/uploads/SKYCERT9001.png"
                alt="ISO 9001:2015 SKYCERT"
                width={80}
                height={50}
                style={{ objectFit: "contain", display: "block" }}
              />
            </div>
          </div>
        </div>

        {/* Right — form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {/* Name + Email on same row */}
          <div className="contact-name-email-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { name: "name", label: "Nume", type: "text", placeholder: "Numele tău" },
              { name: "email", label: "Email", type: "email", placeholder: "email@exemplu.com" },
            ].map((field) => (
              <div key={field.name} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label
                  htmlFor={field.name}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "11.5px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(244,242,236,0.65)",
                  }}
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.16)",
                    borderRadius: 4,
                    color: "#fff",
                    padding: "14px 16px",
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    outline: "none",
                    transition: "border-color .2s ease, background .2s ease",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#1A6F7A";
                    e.target.style.background = "rgba(255,255,255,0.10)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.16)";
                    e.target.style.background = "rgba(255,255,255,0.06)";
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label
              htmlFor="message"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11.5px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(244,242,236,0.65)",
              }}
            >
              Mesaj
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Descrie pe scurt proiectul sau întrebarea ta..."
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 4,
                color: "#fff",
                padding: "14px 16px",
                fontFamily: "var(--font-body)",
                fontSize: 15,
                outline: "none",
                transition: "border-color .2s ease, background .2s ease",
                resize: "vertical",
                width: "100%",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1A6F7A";
                e.target.style.background = "rgba(255,255,255,0.10)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.16)";
                e.target.style.background = "rgba(255,255,255,0.06)";
              }}
            />
          </div>

          <button
            type="submit"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: 56,
              padding: "0 32px",
              background: hovered ? "#C5895B" : "#0E323D",
              color: "#ffffff",
              border: `1.5px solid ${hovered ? "#C5895B" : "#0E323D"}`,
              borderRadius: 4,
              fontFamily: "var(--font-sans)",
              fontSize: "12.5px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background .2s ease, border-color .2s ease, transform .2s ease",
              transform: hovered ? "translateY(-2px)" : "translateY(0)",
              alignSelf: "flex-start",
              minWidth: 200,
            }}
          >
            ÎNAINTEAZĂ
          </button>
        </form>
      </div>
    </section>
  );
}
