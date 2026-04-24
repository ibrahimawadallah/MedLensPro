import type { Metadata } from "next";
import Link from "next/link";
import { Pill, Search, BookmarkCheck } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MedLens — Plain-language drug info for patients",
    template: "%s · MedLens",
  },
  description:
    "Search FDA-approved drug labels and read them in plain language. Powered by the NLM DailyMed database.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-[var(--border)] bg-white/70 backdrop-blur sticky top-0 z-20">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold text-brand-700">
              <Pill className="h-5 w-5" aria-hidden />
              MedLens
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link
                href="/search"
                className="flex items-center gap-1 text-slate-700 hover:text-brand-700"
              >
                <Search className="h-4 w-4" aria-hidden /> Search
              </Link>
              <Link
                href="/my-meds"
                className="flex items-center gap-1 text-slate-700 hover:text-brand-700"
              >
                <BookmarkCheck className="h-4 w-4" aria-hidden /> My meds
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[var(--border)] py-8 text-sm text-slate-500">
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
