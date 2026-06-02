/**
 * Sursă unică pentru URL-ul canonic al site-ului.
 * La lansarea pe domeniul real, schimbă DOAR această linie
 * (ex. "https://me-concept.ro") — `metadataBase` + toate canonical-urile
 * relative se actualizează automat.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://me-concept-next.vercel.app";

/**
 * URL-ul paginii publice Microsoft Bookings (Bookings → Booking page → Publish → "Share").
 * Gol = se afișează calendarul custom existent (fallback, nu se strică nimic).
 * Pune URL-ul aici ca să se activeze embed-ul Bookings în secțiunea de contact.
 */
export const BOOKINGS_URL: string = "https://outlook.office365.com/owa/calendar/MayerEConcept@me-concept.de/bookings/";
