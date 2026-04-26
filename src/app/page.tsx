import Link from "next/link";
import { ScanLine, Hash, Heart, Lock, Zap, Globe, Smartphone, Users, Sparkles, ArrowRight, ChevronDown, CheckCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SearchBar } from "@/components/SearchBar";
import { HeroCTAButtons } from "@/components/HeroCTAButtons";
import { FDANewsSection } from "@/components/FDANewsSection";

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
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-brand-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-4 pt-24 pb-12 md:pt-32 md:pb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-brand-700 dark:text-brand-400 rounded-full px-4 py-2 text-sm font-medium mb-8 shadow-lg">
            <Sparkles className="h-4 w-4" aria-hidden />
            {t("home.eyebrow")}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance mb-6">
            {t("home.title")}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-4">
            {t("home.subtitle")}
          </p>

          {/* Value Proposition */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Free to search</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Sign up for full details</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Save your medications</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <SearchBar autoFocus />
          </div>

          {/* Action Buttons */}
          <HeroCTAButtons />

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-50">
            <ChevronDown className="h-6 w-6 text-slate-400" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-600 dark:text-brand-400 mb-2">
                100K+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Drug Labels
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-600 dark:text-brand-400 mb-2">
                24/7
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Available
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-600 dark:text-brand-400 mb-2">
                Free
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Forever
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-600 dark:text-brand-400 mb-2">
                100%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Private
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Searches */}
      <section className="max-w-3xl mx-auto px-4 py-16" aria-labelledby="popular-heading">
        <h2 id="popular-heading" className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-6 text-center">
          {t("home.popularHeading")}
        </h2>
        <ul className="flex flex-wrap gap-3 justify-center">
          {POPULAR.map((name) => (
            <li key={name}>
              <Link
                href={`/search?q=${encodeURIComponent(name)}`}
                className="inline-block rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:border-brand-300 dark:hover:border-brand-500 hover:text-brand-700 dark:hover:text-brand-400 hover:shadow-lg transition-all"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Why Choose MedLens?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Designed for patients, built for clarity, trusted for accuracy.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* FDA Official Updates */}
      <FDANewsSection />

      {/* How It Works */}
      <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
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
              description="View patient-friendly sections organized by priority: what it&apos;s for, how to take it, warnings, and more."
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
      <section className="py-24 bg-gradient-to-r from-brand-600 via-brand-700 to-blue-600 dark:from-brand-700 dark:via-brand-800 dark:to-blue-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Understanding Your Medications Today
          </h2>
          <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto">
            Join thousands of patients who trust MedLens for clear, accurate drug information.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/search"
              className="group inline-flex items-center gap-2 rounded-xl bg-white text-brand-700 px-8 py-4 text-base font-semibold hover:bg-brand-50 transition-all"
            >
              <Hash className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden /> {t("common.search")}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/scan"
              className="group inline-flex items-center gap-2 rounded-xl border-2 border-white text-white px-8 py-4 text-base font-semibold hover:bg-white/10 transition-all"
            >
              <ScanLine className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden /> {t("home.scanBarcode")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 hover:shadow-lg transition-all">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-5">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 text-lg">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{body}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 dark:from-brand-600 dark:to-brand-700 text-white text-3xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg">
        {number}
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 text-lg">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
