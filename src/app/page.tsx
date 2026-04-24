import Link from "next/link";
import { ScanLine, Hash, ShieldCheck, BookmarkCheck, Heart, Lock, Zap, Globe, Smartphone, Users } from "lucide-react";
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
  "panadol",
  "brufen",
  "augmentin",
  "glucophage",
  "lipitor",
  "losartan",
  "paracetamol",
  "amoxil",
];

export default async function HomePage() {
  const t = await getTranslations();
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-50 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-transparent dark:from-brand-500/5"></div>
        <div className="max-w-4xl mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-16 text-center relative">
          <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <ShieldCheck className="h-4 w-4" aria-hidden />
            {t("home.eyebrow")}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance mb-6">
            {t("home.title")}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            {t("home.subtitle")}
          </p>
          <div className="max-w-xl mx-auto mb-8">
            <SearchBar autoFocus />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/ndc"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            >
              <Hash className="h-4 w-4" aria-hidden /> {t("home.lookupByNdc")}
            </Link>
            <Link
              href="/scan"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            >
              <ScanLine className="h-4 w-4" aria-hidden /> {t("home.scanBarcode")}
            </Link>
            <Link
              href="/my-meds"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            >
              <BookmarkCheck className="h-4 w-4" aria-hidden /> {t("common.myMeds")}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-600 dark:text-brand-400">100K+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Drug Labels</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-600 dark:text-brand-400">24/7</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Available</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-600 dark:text-brand-400">Free</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Forever</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-600 dark:text-brand-400">100%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Private</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Searches */}
      <section className="max-w-3xl mx-auto px-4 py-12" aria-labelledby="popular-heading">
        <h2 id="popular-heading" className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-4">
          {t("home.popularHeading")}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {POPULAR.map((name) => (
            <li key={name}>
              <Link
                href={`/search?q=${encodeURIComponent(name)}`}
                className="inline-block rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:border-brand-300 dark:hover:border-brand-500 hover:text-brand-700 dark:hover:text-brand-400 transition-all"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Why Choose MedLens?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Designed for patients, built for clarity, trusted for accuracy.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Heart className="h-6 w-6" />}
            title={t("home.features.plain.title")}
            body={t("home.features.plain.body")}
          />
          <FeatureCard
            icon={<Lock className="h-6 w-6" />}
            title={t("home.features.private.title")}
            body={t("home.features.private.body")}
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6" />}
            title={t("home.features.current.title")}
            body={t("home.features.current.body")}
          />
          <FeatureCard
            icon={<Globe className="h-6 w-6" />}
            title="FDA Approved Data"
            body="All information comes directly from the U.S. National Library of Medicine's official DailyMed database."
          />
          <FeatureCard
            icon={<Smartphone className="h-6 w-6" />}
            title="Mobile First Design"
            body="Optimized for smartphones with touch-friendly interface and barcode scanning capabilities."
          />
          <FeatureCard
            icon={<Users className="h-6 w-6" />}
            title="Patient Focused"
            body="Every feature is designed with patients in mind, from simplified language to intuitive navigation."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 dark:bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              How It Works
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number={1}
              title="Search Your Medicine"
              description="Type the drug name, scan the barcode, or enter the NDC code to find your medication."
            />
            <StepCard
              number={2}
              title="Read in Plain Language"
              description="View patient-friendly sections organized by priority: what it's for, how to take it, warnings, and more."
            />
            <StepCard
              number={3}
              title="Save for Quick Access"
              description="Add medications to your personal list for instant access anytime, stored locally on your device."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-600 to-brand-700 dark:from-brand-700 dark:to-brand-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Understanding Your Medications Today
          </h2>
          <p className="text-brand-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust MedLens for clear, accurate drug information.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-brand-700 px-6 py-3 text-sm font-medium hover:bg-brand-50 transition-all"
            >
              <Hash className="h-4 w-4" aria-hidden /> {t("common.search")}
            </Link>
            <Link
              href="/scan"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white text-white px-6 py-3 text-sm font-medium hover:bg-white/10 transition-all"
            >
              <ScanLine className="h-4 w-4" aria-hidden /> {t("home.scanBarcode")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:shadow-lg transition-all">
      <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{body}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-brand-600 dark:bg-brand-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}
