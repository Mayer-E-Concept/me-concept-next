import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { SectionDivider } from "@/components/section-divider";

/* Previzualizare cu carduri care duc la pagini separate (execuție, aplicații).
   Același stil de card ca în secțiunea de expertiză, dar fiecare card este un link. */

export type PreviewCard = {
  title: string;
  desc: string;
  img: string;
  alt: string;
  href: string;
  tag?: string;
  imgPos?: string;
};

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  cta: string;
  cards: PreviewCard[];
  background?: string;
};

export function PreviewCardsSection({ id, eyebrow, title, lead, cta, cards, background }: Props) {
  return (
    <section
      id={id}
      style={{
        position: "relative",
        background,
        paddingTop: "clamp(72px, 9vw, 120px)",
        paddingBottom: "clamp(72px, 9vw, 120px)",
        scrollMarginTop: "72px",
      }}
    >
      <SectionDivider />
      <style>{`
        .preview-card { transition: border-color .2s ease, transform .2s ease; }
        .preview-card:hover { border-color: rgba(143,224,232,0.45) !important; transform: translateY(-3px); }
        .preview-card:hover .preview-card-cta { color: #F2FBFC !important; }
        @media (max-width: 767px) {
          .preview-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
        }
      `}</style>
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
        <div style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
          <div
            style={{
              fontFamily: "var(--font-plex-mono)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#8FE0E8",
              marginBottom: 14,
              paddingBottom: 14,
              borderBottom: "1px solid rgba(143,224,232,0.12)",
              display: "inline-block",
            }}
          >
            {eyebrow}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "clamp(28px, 3.2vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              color: "#F2FBFC",
              maxWidth: "28ch",
            }}
          >
            {title}
          </h2>
          {lead && (
            <p
              style={{
                fontFamily: "var(--font-barlow)",
                fontSize: "clamp(15px, 1.2vw, 17px)",
                lineHeight: 1.7,
                color: "#A9C9CC",
                maxWidth: "68ch",
                margin: "20px 0 0",
              }}
            >
              {lead}
            </p>
          )}
        </div>

        <div
          className="preview-grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cards.length}, minmax(0, 1fr))`,
            gap: 24,
          }}
        >
          {cards.map((c, i) => (
            <FadeIn key={c.title} delay={(i % 4) * 100}>
              <Link
                href={c.href}
                className="preview-card"
                style={{
                  background: "#0B373D",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid rgba(143,224,232,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  textDecoration: "none",
                }}
              >
                <div style={{ aspectRatio: "16/9", overflow: "hidden", position: "relative" }}>
                  <Image
                    src={c.img}
                    alt={c.alt}
                    width={800}
                    height={450}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: c.imgPos ?? "center", display: "block" }}
                  />
                  {c.tag && (
                    <span
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        fontFamily: "var(--font-plex-mono)",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#072327",
                        background: "#8FE0E8",
                        padding: "5px 9px",
                        borderRadius: 4,
                      }}
                    >
                      {c.tag}
                    </span>
                  )}
                </div>
                <div style={{ padding: "24px 24px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-barlow)",
                      fontSize: 19,
                      fontWeight: 700,
                      color: "#F2FBFC",
                      letterSpacing: "-0.01em",
                      marginBottom: 10,
                      lineHeight: 1.3,
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-barlow)",
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: "#A9C9CC",
                      margin: "0 0 20px",
                    }}
                  >
                    {c.desc}
                  </p>
                  <span
                    className="preview-card-cta"
                    style={{
                      marginTop: "auto",
                      fontFamily: "var(--font-plex-mono)",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#8FE0E8",
                      transition: "color .2s ease",
                    }}
                  >
                    {cta} →
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
