import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const RO_BLOG_SLUGS = [
  "proiectare-instalatii-electrice",
  "avantajele-colaborarii-cu-un-proiectant-local",
  "cum-sa-gasesti-un-proiectant-de-instalatii-electrice-potrivit",
];

const DE_BLOG_SLUGS = [
  "elektroplanung-was-sie-wissen-muessen",
  "vorteile-lokaler-elektroingenieur",
  "richtigen-elektroingenieur-finden",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;

  const staticRo: MetadataRoute.Sitemap = [
    { url: `${base}/`,             changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/portofoliu`,   changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/echipa-noastra`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/povestea-mea`, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${base}/blog`,         changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/politica-de-confidentialitate`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/termeni-si-conditii`,           changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/politica-cookie-uri-ue`,        changeFrequency: "yearly", priority: 0.2 },
  ];

  const staticDe: MetadataRoute.Sitemap = [
    { url: `${base}/de`,              changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/de/portofoliu`,   changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/de/unser-team`,   changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/de/meine-geschichte`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/de/blog`,         changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/de/datenschutzerklaerung`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/de/impressum`,             changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/de/agb`,                   changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/de/cookie-richtlinie`,     changeFrequency: "yearly", priority: 0.2 },
  ];

  const blogRo: MetadataRoute.Sitemap = RO_BLOG_SLUGS.map((slug) => ({
    url: `${base}/blog/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogDe: MetadataRoute.Sitemap = DE_BLOG_SLUGS.map((slug) => ({
    url: `${base}/de/blog/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRo, ...staticDe, ...blogRo, ...blogDe];
}
