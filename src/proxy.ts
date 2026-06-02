import { NextResponse, type NextRequest } from "next/server";

/**
 * Next 16: `middleware` a fost redenumit `proxy` (rulează pe runtime-ul nodejs).
 * Detectează limba din pathname (`/de` => "de", restul => "ro") și o expune
 * ca header de request `x-locale`, citit de root layout pentru a seta corect
 * `<html lang>` pe fiecare pagină (RO vs DE).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDe = pathname === "/de" || pathname.startsWith("/de/");
  const locale = isDe ? "de" : "ro";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Rulează doar pe rutele de pagină; exclude /api, asset-urile _next și fișierele cu extensie.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
