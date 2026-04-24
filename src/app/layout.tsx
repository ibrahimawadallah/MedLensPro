import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Pill, Search, BookmarkCheck } from "lucide-react";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://medlens.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MedLens — Plain-language drug info for patients",
    template: "%s · MedLens",
  },
  description:
    "Search FDA-approved drug labels and read them in plain language. Powered by the U.S. National Library of Medicine DailyMed database.",
  applicationName: "MedLens",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MedLens",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: "MedLens",
    title: "MedLens — Plain-language drug info for patients",
    description:
      "Read FDA-approved drug labels in plain language. Free, private, no account needed.",
    url: "/",
    images: [{ url: "/icon-512.png", width: 512, height: 512, alt: "MedLens" }],
  },
  twitter: {
    card: "summary",
    title: "MedLens — Plain-language drug info for patients",
    description:
      "Read FDA-approved drug labels in plain language. Free, private, no account needed.",
    images: ["/icon-512.png"],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1b64eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1b64eb" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-brand-700 focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <header
          className="border-b border-[var(--border)] bg-white/80 backdrop-blur sticky top-0 z-20"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-brand-700 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              <Pill className="h-5 w-5" aria-hidden />
              MedLens
            </Link>
            <nav aria-label="Primary" className="flex items-center gap-4 text-sm">
              <Link
                href="/search"
                className="flex items-center gap-1 text-slate-700 hover:text-brand-700 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                <Search className="h-4 w-4" aria-hidden /> Search
              </Link>
              <Link
                href="/my-meds"
                className="flex items-center gap-1 text-slate-700 hover:text-brand-700 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                <BookmarkCheck className="h-4 w-4" aria-hidden /> My meds
              </Link>
            </nav>
          </div>
        </header>
        <main id="main" className="flex-1">
          {children}
        </main>
        <ServiceWorkerRegister />
        <footer
          className="border-t border-[var(--border)] py-8 text-sm text-slate-600"
          style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom))" }}
        >
          <div className="max-w-5xl mx-auto px-4 space-y-2">
            <p>
              MedLens is an independent, patient-friendly reader for FDA drug
              labels. Label data is provided by the U.S. National Library of
              Medicine{" "}
              <a
                className="text-brand-700 underline"
                href="https://dailymed.nlm.nih.gov/"
                target="_blank"
                rel="noreferrer"
              >
                DailyMed
              </a>{" "}
              service.
            </p>
            <p className="text-xs">
              This information is for educational purposes only and is not a
              substitute for the advice of a healthcare professional. Always
              read the full label and talk to your doctor or pharmacist before
              taking any medication.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
