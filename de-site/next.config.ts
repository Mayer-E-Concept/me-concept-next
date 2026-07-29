import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    // CSP: permite iframe Cal.com + Three.js WebGL + Google Fonts + Resend pixel
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.cal.eu",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://api.resend.com",
      "frame-src https://cal.eu https://app.cal.eu https://outlook.office365.com",
      "worker-src 'self' blob:",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Permite testarea pe alt dispozitiv din rețeaua locală (ex. telefon) în timpul
  // `next dev` — implicit Next.js respinge cererile pentru asset-urile de dev
  // (chunk-uri JS, HMR) venite de pe alt origin decât localhost, ceea ce lasă
  // pagina blocată înainte de hidratare (fără 3D, fără linii, fără animații).
  allowedDevOrigins: ["192.168.1.77"],
  async redirects() {
    return [
      {
        source: "/me-tools",
        destination: "/electrix",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
