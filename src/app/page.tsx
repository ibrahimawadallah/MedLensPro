import Link from "next/link";
import { ScanLine, Hash, ShieldCheck, BookmarkCheck } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { RecentSearches } from "@/components/RecentSearches";

const POPULAR = [
  "ibuprofen",
  "acetaminophen",
  "aspirin",
  "amoxicillin",
  "lisinopril",
  "metformin",
  "atorvastatin",
  "omeprazole",
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <div className="max-w-3xl mx-auto px-4 pt-12 pb-10 md:pt-20 md:pb-14 text-center">
          <p className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-brand-700 dark:text-brand-400 bg-brand-100 dark:bg-brand-900/30 rounded-full px-3 py-1">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> FDA-approved
            labels, in plain language
          </p>
          <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
            Understand your medicine in a few clear sections.
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 md:text-lg">
            MedLens turns the official FDA drug label into patient-friendly
            sections: what it&apos;s for, how to take it, warnings, side
            effects, and more.
          </p>
          <div className="mt-8">
            <SearchBar autoFocus />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/ndc"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <Hash className="h-4 w-4" aria-hidden /> Look up by NDC
            </Link>
            <Link
              href="/scan"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <ScanLine className="h-4 w-4" aria-hidden /> Scan a barcode
            </Link>
            <Link
              href="/my-meds"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <BookmarkCheck className="h-4 w-4" aria-hidden /> My meds
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-8" aria-labelledby="popular-heading">
        <h2
          id="popular-heading"
          className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400"
        >
          Popular searches
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {POPULAR.map((name) => (
            <li key={name}>
              <Link
                href={`/search?q=${encodeURIComponent(name)}`}
                className="inline-block rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:border-brand-300 hover:text-brand-700 dark:hover:border-brand-500 dark:hover:text-brand-400"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-8">
        <RecentSearches />
      </section>

      <section
        className="max-w-3xl mx-auto px-4 pb-16 grid gap-4 md:grid-cols-3"
        aria-labelledby="features-heading"
      >
        <h2 id="features-heading" className="sr-only">
          Why MedLens
        </h2>
        <Feature
          title="Plain-language"
          body="Labels are rewritten with patient-friendly headings (e.g. ‘How to take it’ instead of ‘Dosage and administration’)."
        />
        <Feature
          title="Private by design"
          body="Your saved medications stay on this device. Nothing is sent to any server besides the FDA’s DailyMed service."
        />
        <Feature
          title="Always current"
          body="Data comes live from DailyMed v2 and reflects the latest FDA-approved label for every product."
        />
      </section>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
      <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{body}</p>
    </div>
  );
}
