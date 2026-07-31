/* Ornament decorativ plasat la marginea unei secțiuni, ca marcaj vizual la
   granița dintre secțiuni — aceeași linie subțiată-spre-capete, luminoasă
   spre centru, folosită sub bara de navigare (site-header.tsx). Wrapper-ul
   are exact înălțimea liniei, fără padding vertical care ar centra linia
   la distanță de marginea reală a secțiunii — trebuie să stea chiar pe
   granița de culoare dintre secțiuni. Se pune ca prim copil într-o secțiune
   cu position: relative.

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
          background: `linear-gradient(to right, transparent, ${color})`,
          opacity: 0.5,
        }}
      />
      <div
        style={{
          flex: 1,
          height: "100%",
          background: `linear-gradient(to left, transparent, ${color})`,
          opacity: 0.5,
        }}
      />
    </div>
  );
}
