import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { SectionDivider } from "@/components/section-divider";
import { FeaturedProjectCard } from "@/components/featured-project-card";
import { FEATURED_PROJECTS_DE } from "@/components/featured-projects-data";

/* Referenz-Teaser auf der Startseite — dieselben Karten wie auf der
   Portfolio-Seite, mit Link zum vollständigen Portfolio. */

export function ReferencesSectionDe() {
  return (
    <section
      style={{
        position: "relative",
        background: "#071C26",
        paddingTop: "clamp(72px, 9vw, 110px)",
        paddingBottom: "clamp(72px, 9vw, 110px)",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .refs-featured-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <SectionDivider />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
            marginBottom: "clamp(36px, 4.5vw, 56px)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#C5895B",
                marginBottom: 16,
              }}
            >
              Referenzen — Deutschland
            </div>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(28px, 3.2vw, 44px)",
                fontWeight: 800,
                letterSpacing: "-0.022em",
                lineHeight: 1.1,
                color: "#F4F2EC",
                maxWidth: "24ch",
                margin: 0,
              }}
            >
              Projekte, die für uns sprechen
            </h2>
          </div>
          <Link
            href="/portofoliu"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#C5895B",
              textDecoration: "none",
              paddingBottom: 4,
              borderBottom: "1.5px solid rgba(197,137,91,0.4)",
              whiteSpace: "nowrap",
            }}
          >
            Zum vollständigen Portfolio →
          </Link>
        </div>

        <div
          className="refs-featured-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
          }}
        >
          {FEATURED_PROJECTS_DE.map((p, i) => (
            <FadeIn key={p.id} delay={(i % 4) * 100}>
              <FeaturedProjectCard project={p} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
