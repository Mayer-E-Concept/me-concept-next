/**
 * Sursă unică pentru URL-ul canonic al site-ului.
 * La lansarea pe domeniul real, schimbă DOAR această linie
 * (ex. "https://me-concept.de") — `metadataBase` + toate canonical-urile
 * relative se actualizează automat.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://me-concept.de";
