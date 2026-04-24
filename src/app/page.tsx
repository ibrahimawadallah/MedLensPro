import Link from "next/link";
import { ScanLine, Hash, ShieldCheck, BookmarkCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SearchBar } from "@/components/SearchBar";

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

export default async function HomePage() {
  const t = await getTranslations();
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="max-w-3xl mx-auto px-4 pt-12 pb-10 md:pt-20 md:pb-14 text-center">
          <p className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-brand-700 bg-brand-100 rounded-full px-3 py-1">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> {t("home.eyebrow")}
          </p>
          <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 text-balance">
            {t("home.title")}
          </h1>
          <p className="mt-4 text-slate-600 md:text-lg">{t("home.subtitle")}</p>
          <div className="mt-8">
            <SearchBar autoFocus />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/ndc"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Hash className="h-4 w-4" aria-hidden /> {t("home.lookupByNdc")}
            </Link>
            <Link
              href="/scan"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <ScanLine className="h-4 w-4" aria-hidden /> {t("home.scanBarcode")}
            </Link>
            <Link
              href="/my-meds"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <BookmarkCheck className="h-4 w-4" aria-hidden /> {t("common.myMeds")}
            </Link>
          </div>
        </div>
      </section>

      <section
        className="max-w-3xl mx-auto px-4 py-8"
        aria-labelledby="popular-heading"
      >
        <h2
          id="popular-heading"
          className="text-sm font-semibold uppercase tracking-wider text-slate-600"
        >
          {t("home.popularHeading")}
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {POPULAR.map((name) => (
            <li key={name}>
              <Link
                href={`/search?q=${encodeURIComponent(name)}`}
                className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:border-brand-300 hover:text-brand-700"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="max-w-3xl mx-auto px-4 pb-16 grid gap-4 md:grid-cols-3"
        aria-labelledby="features-heading"
      >
        <h2 id="features-heading" className="sr-only">
          {t("home.featuresHeading")}
        </h2>
        <Feature
          title={t("home.features.plain.title")}
          body={t("home.features.plain.body")}
        />
        <Feature
          title={t("home.features.private.title")}
          body={t("home.features.private.body")}
        />
        <Feature
          title={t("home.features.current.title")}
          body={t("home.features.current.body")}
        />
      </section>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{body}</p>
    </div>
  );
}
