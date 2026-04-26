import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function BlogPostPage() {

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>

      <article className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-2 py-1 rounded-full">
            Patient Education
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            April 21, 2024
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            5 min read
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Medication Safety for Elderly Patients
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
            Older adults often take multiple medications, which increases the risk of adverse drug reactions. Special precautions are needed to ensure medication safety in elderly patients.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            Unique Challenges for Elderly Patients
          </h2>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
            <li>Multiple chronic conditions requiring several medications</li>
            <li>Changes in metabolism affecting drug processing</li>
            <li>Increased sensitivity to side effects</li>
            <li>Cognitive issues affecting medication management</li>
            <li>Physical limitations (vision, dexterity) affecting pill handling</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            Key Safety Strategies
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
            1. Medication Review
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Schedule regular medication reviews with healthcare providers. Bring all medications, including over-the-counter drugs and supplements.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
            2. Simplify Regimens
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Ask about combination medications or extended-release formulations to reduce the number of daily doses.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
            3. Use Pill Organizers
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Weekly pill organizers with compartments for each dose time help prevent missed or duplicate doses.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
            4. Large Print Labels
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Request large-print labels from pharmacies or use magnifying devices to read medication information.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            Medications to Use with Caution
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Some medications require extra monitoring in elderly patients:
          </p>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
            <li>Anticholinergics (can cause confusion)</li>
            <li>Benzodiazepines (fall risk)</li>
            <li>NSAIDs (kidney issues, bleeding)</li>
            <li>Multiple blood pressure medications</li>
            <li>Anticoagulants (bleeding risk)</li>
          </ul>

          <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-600 dark:border-brand-400 p-4 my-6">
            <p className="text-sm font-medium text-brand-900 dark:text-brand-100">
              💡 Caregiver tip: Use MedLens to track medications for elderly family members and receive alerts for potential interactions.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            Warning Signs to Watch For
          </h2>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
            <li>Sudden confusion or memory problems</li>
            <li>Unexplained falls or dizziness</li>
            <li>Changes in sleep patterns</li>
            <li>Digestive issues</li>
            <li>Mood or behavior changes</li>
          </ul>

          <p className="text-slate-600 dark:text-slate-400 mb-4">
            These could indicate medication side effects. Report them to healthcare providers promptly.
          </p>
        </div>
      </article>
    </div>
  );
}
