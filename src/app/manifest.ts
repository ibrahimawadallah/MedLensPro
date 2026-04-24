import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MedLens — Plain-language drug info",
    short_name: "MedLens",
    description:
      "Patient-friendly reader for FDA drug labels, powered by the NLM DailyMed API.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f9fc",
    theme_color: "#1b64eb",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    categories: ["health", "medical", "reference"],
  };
}
