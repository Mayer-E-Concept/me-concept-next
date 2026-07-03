import type { ReactNode } from "react";
import { SectionDivider } from "@/components/section-divider";

interface Step {
  title: string;
  desc: string;
  icon: ReactNode;
}

function IconConsult() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C5895B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconDesign() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C5895B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}

function IconVerify() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C5895B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function IconDeliver() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C5895B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

const STEPS: Step[] = [
  {
    title: "Consultanță inițială",
    desc: "Discutăm cerințele, termenele și specificațiile tehnice. Fără obligații, fără costuri ascunse.",
    icon: <IconConsult />,
  },
  {
    title: "Proiectare tehnică",
    desc: "Documentație completă BIM Revit, conform normativelor NP-I7 și PE 132 în vigoare.",
    icon: <IconDesign />,
  },
  {
    title: "Verificare și avizare",
    desc: "Proiect verificat de verificator atestat, pregătit pentru autorizare și execuție.",
    icon: <IconVerify />,
  },
  {
    title: "Predare documentație",
    desc: "Set complet de planșe, memorii tehnice și calcule, structurat pentru antreprenor.",
    icon: <IconDeliver />,
  },
];

export function ProcessSection() {
  return (
    <section
      style={{
        position: "relative",
        background: "#051E27",
        paddingTop: "clamp(72px, 9vw, 130px)",
        paddingBottom: "clamp(72px, 9vw, 130px)",
      }}
    >
      <SectionDivider />

      <style>{`
        .process-steps-inner { display: flex; gap: 0; }
        .process-step {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 clamp(10px, 2vw, 24px);
          position: relative;
          z-index: 1;
        }
        .process-icon-circle {
          width: 54px; height: 54px;
          border-radius: 50%;
          background: #051E27;
          border: 1px solid rgba(197,137,91,0.35);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 22px;
          flex-shrink: 0;
        }
        @media (max-width: 767px) {
          .process-steps-inner { flex-direction: column; gap: 32px; }
          .process-connector  { display: none !important; }
          .process-step {
            flex-direction: row;
            align-items: flex-start;
            text-align: left;
            padding: 0;
            gap: 18px;
          }
          .process-icon-circle { margin-bottom: 0; }
          .process-step-text  { text-align: left; }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 72px)" }}>
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
            Mayer E-Concept
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(30px, 3.4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "#F4F2EC",
              margin: "0 auto 16px",
              maxWidth: "20ch",
            }}
          >
            Cum lucrăm
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 1.1vw, 16px)",
              color: "rgba(244,242,236,0.50)",
              margin: "0 auto",
              maxWidth: "50ch",
              lineHeight: 1.65,
            }}
          >
            De la prima discuție la documentația finalizată — un proces transparent, fără surprize.
          </p>
        </div>

        {/* Steps */}
        <div style={{ position: "relative" }}>
          {/* Connector line — sits behind icon circles */}
          <div
            className="process-connector"
            style={{
              position: "absolute",
              top: "26px",
              left: "12.5%",
              right: "12.5%",
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(197,137,91,0.06) 0%, rgba(197,137,91,0.28) 25%, rgba(197,137,91,0.28) 75%, rgba(197,137,91,0.06) 100%)",
              zIndex: 0,
            }}
          />

          <div className="process-steps-inner">
            {STEPS.map((step, i) => (
              <div key={i} className="process-step">
                <div className="process-icon-circle">
                  {step.icon}
                </div>
                <div className="process-step-text">
                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(14px, 1.05vw, 16px)",
                      fontWeight: 700,
                      color: "#F4F2EC",
                      marginBottom: 8,
                      lineHeight: 1.3,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      lineHeight: 1.65,
                      color: "rgba(244,242,236,0.45)",
                      margin: 0,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "clamp(48px, 5vw, 64px)" }}>
          <a
            href="#contact"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#C5895B",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              opacity: 0.85,
            }}
          >
            Solicită o consultanță gratuită
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
