/* Ornament decorativ plasat în vârful unei secțiuni, ca marcaj vizual la
   granița dintre secțiuni — linie care se subțiază spre capete, cu un mic
   model de romburi în centru. Se pune ca prim copil într-o secțiune cu
   position: relative. */

export function SectionDivider({ position = "top", color = "#5AC9D4" }: { position?: "top" | "bottom"; color?: string }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        [position]: 0,
        left: 0,
        right: 0,
        height: 24,
        display: "flex",
        alignItems: "center",
        padding: "0 clamp(20px, 5vw, 60px)",
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          flex: 1,
          height: 4,
          background: color,
          opacity: 0.6,
          clipPath: "polygon(0% 50%, 100% 0%, 100% 100%)",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 5, margin: "0 10px", flexShrink: 0 }}>
        <span style={{ width: 7, height: 7, background: color, opacity: 0.7, transform: "rotate(45deg)", display: "block" }} />
        <span style={{ width: 10, height: 10, background: color, opacity: 0.9, transform: "rotate(45deg)", display: "block" }} />
        <span style={{ width: 7, height: 7, background: color, opacity: 0.7, transform: "rotate(45deg)", display: "block" }} />
      </div>
      <div
        style={{
          flex: 1,
          height: 4,
          background: color,
          opacity: 0.6,
          clipPath: "polygon(100% 50%, 0% 0%, 0% 100%)",
        }}
      />
    </div>
  );
}
