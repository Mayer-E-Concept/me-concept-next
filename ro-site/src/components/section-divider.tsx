/* Ornament decorativ plasat la marginea unei secțiuni, ca marcaj vizual la
   granița dintre secțiuni — linie care se subțiază spre capete, plină și
   conectată în mijloc (fără gol, fără romburi). Wrapper-ul are exact
   înălțimea liniei, fără padding vertical care ar centra linia la distanță
   de marginea reală a secțiunii — trebuie să stea chiar pe granița de
   culoare dintre secțiuni. Se pune ca prim copil într-o secțiune cu
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
        height: 3,
        display: "flex",
        padding: "0 clamp(20px, 5vw, 60px)",
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          flex: 1,
          height: "100%",
          marginRight: -1,
          background: color,
          opacity: 0.5,
          clipPath: "polygon(0% 50%, 100% 0%, 100% 100%)",
        }}
      />
      <div
        style={{
          flex: 1,
          height: "100%",
          background: color,
          opacity: 0.5,
          clipPath: "polygon(100% 50%, 0% 0%, 0% 100%)",
        }}
      />
    </div>
  );
}
