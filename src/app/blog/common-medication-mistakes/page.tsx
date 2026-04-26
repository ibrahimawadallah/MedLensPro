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
            Safety
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            April 23, 2024
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            4 min read
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Common Medication Mistakes to Avoid
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
            Medication errors are more common than you might think. Understanding these mistakes and how to avoid them can help ensure your treatment is safe and effective.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            Top Medication Mistakes
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
            1. Missing Doses
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Skipping doses or not taking medication as prescribed can reduce effectiveness and lead to treatment failure. Set up reminders and establish a routine.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
            2. Double Dosing
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Taking extra doses to "catch up" can be dangerous. If you miss a dose, follow your healthcare provider's instructions or consult your pharmacist.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
            3. Wrong Timing
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Some medications need to be taken with food, others on an empty stomach. Timing affects absorption and effectiveness.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
            4. Stopping Early
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Stopping antibiotics when you "feel better" can lead to antibiotic resistance. Always complete the full course unless directed otherwise.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
            5. Mixing with Alcohol
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Alcohol can interact dangerously with many medications. Check with your pharmacist about potential interactions.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            How to Avoid These Mistakes
          </h2>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
            <li>Use pill organizers and medication apps</li>
            <li>Set phone reminders for dose times</li>
            <li>Keep a medication log</li>
            <li>Read labels carefully every time</li>
            <li>Ask questions when unsure</li>
            <li>Review medications regularly with your doctor</li>
          </ul>

          <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-600 dark:border-brand-400 p-4 my-6">
            <p className="text-sm font-medium text-brand-900 dark:text-brand-100">
              💡 Pro tip: Use MedLens to track your medications and receive timely reminders to avoid dosing errors.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            When to Seek Help
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            If you suspect you've made a medication error, contact your healthcare provider or poison control center immediately. Don't wait for symptoms to appear.
          </p>
        </div>
      </article>
    </div>
  );
}
