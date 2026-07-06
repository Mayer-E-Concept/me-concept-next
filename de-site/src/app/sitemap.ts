import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const DE_BLOG_SLUGS = [
  "elektroplanung-was-sie-wissen-muessen",
  "vorteile-lokaler-elektroingenieur",
  "richtigen-elektroingenieur-finden",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;

  const staticDe: MetadataRoute.Sitemap = [
    { url: `${base}/`,              changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/portofoliu`,   changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/unser-team`,   changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/meine-geschichte`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/blog`,         changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/datenschutzerklaerung`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/impressum`,             changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/agb`,                   changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cookie-richtlinie`,     changeFrequency: "yearly", priority: 0.2 },
  ];

  const blogDe: MetadataRoute.Sitemap = DE_BLOG_SLUGS.map((slug) => ({
    url: `${base}/blog/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticDe, ...blogDe];
}
