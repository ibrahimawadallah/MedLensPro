import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MedLens — Plain-language drug info",
    short_name: "MedLens",
    description:
      "Patient-friendly reader for FDA drug labels, powered by the NLM DailyMed API.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f7f9fc",
    theme_color: "#1b64eb",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["health", "medical", "reference"],
    shortcuts: [
      {
        name: "Search medications",
        short_name: "Search",
        url: "/search",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "My medications",
        short_name: "My meds",
        url: "/my-meds",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Scan a barcode",
        short_name: "Scan",
        url: "/scan",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
