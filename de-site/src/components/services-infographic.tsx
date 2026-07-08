/* Deutsche Version der Infografik — überlagert deutsche Texte direkt auf dem
   Original-PNG (dasselbe Bild wie auf der rumänischen Seite: ce-oferim.png),
   statt die ganze Grafik als separates SVG neu zu zeichnen. So bleibt der
   visuelle Stil (Farben, Icons, Layout) 1:1 identisch zur RO-Version — nur
   der Text ändert sich. */
export function ServicesInfographicDe() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 940 585"
      style={{ width: "100%", height: "auto", display: "block", borderRadius: 10 }}
      aria-label="Allgemeine Übersicht der Elektrodienstleistungen"
    >
      {/* Original-PNG — unverändert */}
      <image href="/uploads/ce-oferim.png" x="0" y="0" width="940" height="585" />

      {/* ── Titel überdecken ── */}
      <rect x="110" y="4" width="720" height="42" fill="white" />
      <text x="470" y="34" textAnchor="middle" fontSize="23" fontWeight="500" fill="#333" fontFamily="'Segoe UI',system-ui,sans-serif">
        Allgemeine Übersicht der Elektrodienstleistungen
      </text>

      {/* ── Links 1: Individuelle Beratung ── */}
      <rect x="0" y="104" width="258" height="78" fill="white" />
      <text x="252" y="131" textAnchor="end" fontSize="24" fill="#333" fontFamily="'Segoe UI',system-ui,sans-serif">Individuelle</text>
      <text x="252" y="159" textAnchor="end" fontSize="24" fill="#333" fontFamily="'Segoe UI',system-ui,sans-serif">Beratung</text>

      {/* ── Links 2: Beleuchtungslösungen ── */}
      <rect x="0" y="216" width="258" height="100" fill="white" />
      <text x="252" y="258" textAnchor="end" fontSize="22" fill="#333" fontFamily="'Segoe UI',system-ui,sans-serif">Beleuchtungslösungen</text>

      {/* ── Links 3: Stromzähler ── */}
      <rect x="0" y="340" width="258" height="118" fill="white" />
      <text x="252" y="408" textAnchor="end" fontSize="24" fill="#333" fontFamily="'Segoe UI',system-ui,sans-serif">Stromzähler</text>

      {/* ── Links 4: Temperatursteuerung ── */}
      <rect x="0" y="460" width="258" height="125" fill="white" />
      <text x="252" y="500" textAnchor="end" fontSize="24" fill="#333" fontFamily="'Segoe UI',system-ui,sans-serif">Temperatur-</text>
      <text x="252" y="528" textAnchor="end" fontSize="24" fill="#333" fontFamily="'Segoe UI',system-ui,sans-serif">steuerung</text>

      {/* ── Rechts 1: Planung von Steckdosen und Schaltern ── */}
      <rect x="684" y="80" width="256" height="150" fill="white" />
      <text x="690" y="114" textAnchor="start" fontSize="24" fill="#333" fontFamily="'Segoe UI',system-ui,sans-serif">Planung von</text>
      <text x="690" y="142" textAnchor="start" fontSize="24" fill="#333" fontFamily="'Segoe UI',system-ui,sans-serif">Steckdosen und</text>
      <text x="690" y="170" textAnchor="start" fontSize="24" fill="#333" fontFamily="'Segoe UI',system-ui,sans-serif">Schaltern</text>

      {/* ── Rechts 2: Badlüftung ── */}
      <rect x="684" y="214" width="256" height="100" fill="white" />
      <text x="690" y="258" textAnchor="start" fontSize="24" fill="#333" fontFamily="'Segoe UI',system-ui,sans-serif">Badlüftung</text>

      {/* ── Rechts 3: Hausanschluss ── */}
      <rect x="684" y="334" width="256" height="118" fill="white" />
      <text x="690" y="400" textAnchor="start" fontSize="24" fill="#333" fontFamily="'Segoe UI',system-ui,sans-serif">Hausanschluss</text>

      {/* ── Rechts 4: Smart-Home-Automation ── */}
      <rect x="684" y="458" width="256" height="127" fill="white" />
      <text x="690" y="498" textAnchor="start" fontSize="24" fill="#333" fontFamily="'Segoe UI',system-ui,sans-serif">Smart-Home-</text>
      <text x="690" y="526" textAnchor="start" fontSize="24" fill="#333" fontFamily="'Segoe UI',system-ui,sans-serif">Automation</text>
    </svg>
  );
}
