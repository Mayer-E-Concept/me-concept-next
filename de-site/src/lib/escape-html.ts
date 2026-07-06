/**
 * Escapează input-ul utilizatorului înainte de a-l interpola în HTML
 * (corpul emailurilor). Previne HTML/markup injection din câmpurile formularului.
 */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
