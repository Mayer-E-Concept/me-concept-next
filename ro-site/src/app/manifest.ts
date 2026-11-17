import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mayer E-Concept",
    short_name: "ME-Concept",
    description: "Proiectare instalații electrice — Sibiu & Germania",
    start_url: "/",
    display: "browser",
    background_color: "#0C4244",
    theme_color: "#0C4244",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
