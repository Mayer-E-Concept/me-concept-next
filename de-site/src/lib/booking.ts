// Shared between the client-side calendar (appointment-calendar.tsx) and the
// booking API route — the API must validate `time` against the same list the
// UI offers, otherwise a direct POST could confirm a nonsensical slot.
export const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
] as const;

export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// `date` is a local calendar day (YYYY-MM-DD), fixed to UTC midnight so the
// weekday/past checks are independent of the runtime's timezone (Vercel runs
// in UTC — see also the comment in book-appointment/route.ts).
export function isValidBookingDate(date: string): boolean {
  if (!DATE_RE.test(date)) return false;
  const d = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return false;
  // Reject dates whose components don't round-trip (e.g. 2025-13-40).
  const [y, m, day] = date.split("-").map(Number);
  if (d.getUTCFullYear() !== y || d.getUTCMonth() + 1 !== m || d.getUTCDate() !== day) return false;

  const todayUTC = new Date();
  todayUTC.setUTCHours(0, 0, 0, 0);
  if (d < todayUTC) return false;

  const day0to6 = d.getUTCDay();
  if (day0to6 === 0 || day0to6 === 6) return false;

  return true;
}
