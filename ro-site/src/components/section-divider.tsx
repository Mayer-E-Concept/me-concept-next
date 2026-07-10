/* Ornament decorativ plasat la marginea unei secțiuni, ca marcaj vizual la
   granița dintre secțiuni — linie care se subțiază spre capete, cu un mic
   model de romburi în centru. Wrapper-ul are exact înălțimea liniei, fără
   padding vertical care ar centra linia la distanță de marginea reală a
   secțiunii — trebuie să stea chiar pe granița de culoare dintre secțiuni.
   Se pune ca prim copil într-o secțiune cu position: relative.

   Subțierea se face printr-un fade de opacitate (linear-gradient spre
   transparent), NU prin clip-path pe înălțime — un taper geometric de 4px
   la 0px pe o distanță mare devine sub-pixel foarte repede și se vede ca
   o linie care se oprește brusc ("cut off"), în loc să se estompeze lin. */

export function SectionDivider({ position = "top", color = "#5AC9D4" }: { position?: "top" | "bottom"; color?: string }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        [position]: 0,
        left: 0,
        right: 0,
        height: 10,
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
          height: 1.5,
          background: `linear-gradient(to right, transparent, ${color})`,
          opacity: 0.6,
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
          height: 1.5,
          background: `linear-gradient(to left, transparent, ${color})`,
          opacity: 0.6,
        }}
      />
    </div>
  );
}
