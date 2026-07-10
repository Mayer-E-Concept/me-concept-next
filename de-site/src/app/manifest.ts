import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mayer E-Concept",
    short_name: "ME-Concept",
    description: "Elektroplanung — Sibiu & Deutschland",
    start_url: "/",
    display: "browser",
    background_color: "#051E27",
    theme_color: "#051E27",
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
