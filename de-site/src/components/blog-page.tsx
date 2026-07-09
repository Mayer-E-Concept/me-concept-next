"use client";
import Image from "next/image";
import Link from "next/link";
import { SectionDivider } from "@/components/section-divider";

export const DE_POSTS = [
  {
    slug: "elektroplanung-was-sie-wissen-muessen",
    title: "Elektroplanung – Was Sie wissen müssen",
    date: "18. Oktober 2024",
    category: "Blog",
    excerpt:
      "Warum ist ein zertifizierter Elektroingenieur so wichtig? Die Baugesetzgebung schreibt strenge Normen vor. Erfahren Sie die wesentlichen Schritte und was ein professionelles Elektroprojekt auszeichnet.",
    img: "/uploads/blog-general.jpg",
    readMin: 6,
  },
  {
    slug: "vorteile-lokaler-elektroingenieur",
    title: "Vorteile der Zusammenarbeit mit einem lokalen Elektroingenieur",
    date: "9. Dezember 2024",
    category: "Ratgeber",
    excerpt:
      "Ein lokaler Elektroingenieur kennt die regionalen Besonderheiten, lokale Lieferanten und die spezifischen Ausführungsbedingungen. Das spart Zeit, Kosten und verhindert Missverständnisse.",
    img: "/uploads/blog-sfaturi.jpg",
    readMin: 5,
  },
  {
    slug: "richtigen-elektroingenieur-finden",
    title: "Wie finden Sie den richtigen Elektroingenieur?",
    date: "9. Dezember 2024",
    category: "Leitfaden",
    excerpt:
      "Die Wahl eines zertifizierten Ingenieurs ist entscheidend. In Deutschland schreiben HOAI und DIN VDE strenge Standards vor. Ein qualifizierter Planer garantiert Normkonformität, Sicherheit und Energieeffizienz.",
    img: "/uploads/blog-ghid.jpg",
    readMin: 7,
  },
];

export function BlogPageDe() {
  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .blog-grid-de { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .blog-hero-inner-de { padding-top: 120px !important; padding-bottom: 60px !important; }
          .blog-card-body-de { padding: 14px 14px 16px !important; }
          .blog-card-title-de { font-size: 14px !important; margin-bottom: 6px !important; }
          .blog-card-excerpt-de {
            font-size: 12px !important;
            line-height: 1.45 !important;
            margin: 0 0 10px !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 3 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }
        }
      `}</style>

      {/* Page Hero */}
      <section style={{ position: "relative", background: "#051E27", overflow: "hidden" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: 'url("/assets/circuit-pattern.svg")',
            backgroundSize: "240px 240px",
            opacity: 0.08,
            filter: "invert(1)",
            pointerEvents: "none",
          }}
        />
        <div
          className="blog-hero-inner-de"
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 60px)",
            paddingTop: "clamp(130px, 16vh, 200px)",
            paddingBottom: "clamp(72px, 9vw, 110px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-plex-mono)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(169,201,204,0.45)",
                textDecoration: "none",
              }}
            >
              Startseite
            </Link>
            <span style={{ color: "rgba(169,201,204,0.3)", fontSize: 12 }}>›</span>
            <span
              style={{
                fontFamily: "var(--font-plex-mono)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#8FE0E8",
              }}
            >
              Blog
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              color: "#F2FBFC",
              maxWidth: "18ch",
              marginBottom: 20,
            }}
          >
            Artikel und nützliche Ressourcen
          </h1>
          <p
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "clamp(15px, 1.3vw, 18px)",
              lineHeight: 1.65,
              color: "#A9C9CC",
              maxWidth: "52ch",
            }}
          >
            Praxistipps, Leitfäden und Neuigkeiten aus dem Bereich der
            Elektroplanung.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section
        style={{
          position: "relative",
          paddingTop: "clamp(72px, 9vw, 120px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
        }}
      >
        <SectionDivider />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
          <div
            className="blog-grid-de"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 28,
            }}
          >
            {DE_POSTS.map((post) => (
              <article
                key={post.slug}
                style={{
                  background: "#0B373D",
                  border: "1px solid rgba(143,224,232,0.12)",
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 2px 16px rgba(143,224,232,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform .25s ease, box-shadow .25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(143,224,232,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(143,224,232,0.08)";
                }}
              >
                <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                  <Image
                    src={post.img}
                    alt={post.title}
                    width={600}
                    height={340}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div className="blog-card-body-de" style={{ padding: "28px 28px 32px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-plex-mono)",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#8FE0E8",
                        background: "rgba(143,224,232,0.10)",
                        borderRadius: 4,
                        padding: "4px 10px",
                      }}
                    >
                      {post.category}
                    </span>
                    <span style={{ fontFamily: "var(--font-plex-mono)", fontSize: 12, color: "#7FA2A6" }}>
                      {post.date}
                    </span>
                  </div>
                  <h2
                    className="blog-card-title-de"
                    style={{
                      fontFamily: "var(--font-barlow)",
                      fontSize: "clamp(17px, 1.4vw, 20px)",
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      color: "#F2FBFC",
                      lineHeight: 1.3,
                      marginBottom: 12,
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className="blog-card-excerpt-de"
                    style={{
                      fontFamily: "var(--font-barlow)",
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: "#A9C9CC",
                      margin: "0 0 24px",
                      flex: 1,
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontFamily: "var(--font-plex-mono)",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#8FE0E8",
                      textDecoration: "none",
                      alignSelf: "flex-start",
                    }}
                  >
                    Artikel lesen
                    <span style={{ fontSize: 14 }}>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
