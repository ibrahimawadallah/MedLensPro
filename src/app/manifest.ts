import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MedLens Pro — Drug Information",
    short_name: "MedLens",
    description:
      "Patient-friendly drug information platform with FDA-approved data. Search medications, read labels in plain language, and manage your prescriptions safely.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#ffffff",
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
    categories: ["health", "medical", "education"],
    shortcuts: [
      {
        name: "Search medications",
        short_name: "Search",
        description: "Find drug information quickly",
        url: "/search",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "My medications",
        short_name: "My meds",
        description: "View your saved medications",
        url: "/my-meds",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Scan a barcode",
        short_name: "Scan",
        description: "Scan medication barcode",
        url: "/scan",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
