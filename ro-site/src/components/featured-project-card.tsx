import Image from "next/image";

/* Shared rich project card — used by both the homepage references teaser
   and the portfolio page's featured section, so the two always stay
   visually identical. */

export type FeaturedProjectSpec = { label: string; value: string };

export type FeaturedProject = {
  id: string;
  category: string;
  title: string;
  desc: string;
  img: string;
  /** Percent-based box hiding a client logo baked into the render. */
  blurRegion?: { left: number; top: number; width: number; height: number };
  specs: FeaturedProjectSpec[];
  award: string | null;
};

export function FeaturedProjectCard({ project: p }: { project: FeaturedProject }) {
  return (
    <div
      style={{
        background: "#0A2430",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Image with overlay */}
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
        <Image
          src={p.img}
          alt={p.title}
          width={620}
          height={349}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "brightness(0.65) saturate(0.8)",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, #0A2430 0%, transparent 55%)",
          }}
        />
        {p.blurRegion && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: `${p.blurRegion.left}%`,
              top: `${p.blurRegion.top}%`,
              width: `${p.blurRegion.width}%`,
              height: `${p.blurRegion.height}%`,
              backdropFilter: "blur(10px)",
              background: "rgba(10,36,48,0.10)",
            }}
          />
        )}
        {p.award && (
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              background: "#C5895B",
              color: "#051E27",
              fontFamily: "var(--font-sans)",
              fontSize: "9px",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "5px 10px",
              borderRadius: 6,
              whiteSpace: "nowrap",
            }}
          >
            {p.award}
          </div>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: "24px 28px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
          position: "relative",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 3,
            background: "linear-gradient(180deg, #C5895B 0%, rgba(197,137,91,0.08) 100%)",
          }}
        />
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#C5895B",
          }}
        >
          {p.category}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(17px, 1.8vw, 22px)",
            fontWeight: 800,
            color: "#F4F2EC",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {p.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13.5,
            lineHeight: 1.65,
            color: "rgba(244,242,236,0.52)",
            margin: 0,
            flex: 1,
          }}
        >
          {p.desc}
        </p>
        {/* Spec chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
          {p.specs.map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 6,
                padding: "4px 10px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(244,242,236,0.38)",
                }}
              >
                {s.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#F4F2EC",
                }}
              >
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
