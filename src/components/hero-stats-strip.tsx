export function HeroStatsStrip() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 10,
        marginTop: "clamp(36px, 5vw, 64px)",
        paddingTop: 22,
        borderTop: "1px solid rgba(255,255,255,0.12)",
        fontFamily: "var(--font-sans)",
        fontSize: "11.5px",
        fontWeight: 600,
        letterSpacing: "0.20em",
        color: "rgba(255,255,255,0.45)",
        maxWidth: 360,
        lineHeight: 1.4,
      }}
    >
      <span>
        <strong style={{ color: "#C5895B", fontWeight: 800, marginRight: 6, display: "inline-block", minWidth: "1.5em" }}>
          20+
        </strong>
        ANI EXPERIENȚĂ
      </span>
      <span>ISO 9001:2015</span>
      <span>PROIECTE REZIDENȚIALE &amp; COMERCIALE</span>
    </div>
  );
}
