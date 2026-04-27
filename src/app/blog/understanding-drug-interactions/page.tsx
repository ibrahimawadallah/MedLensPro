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
            April 22, 2024
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            6 min read
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Understanding Drug Interactions
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
            Drug interactions can change how your medications work, potentially making them less effective or causing dangerous side effects. Understanding these interactions is crucial for your safety.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            Types of Drug Interactions
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
            1. Drug-Drug Interactions
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            When two or more medications interact with each other. This can happen with prescription drugs, over-the-counter medicines, and supplements.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
            2. Drug-Food Interactions
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Certain foods can affect how your body processes medications. Grapefruit, dairy products, and alcohol are common culprits.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
            3. Drug-Condition Interactions
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Some medications can worsen existing health conditions. For example, certain drugs can be dangerous for people with kidney or liver disease.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            Common Interactions to Watch For
          </h2>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
            <li>Blood thinners with NSAIDs (increased bleeding risk)</li>
            <li>Antidepressants with certain pain medications</li>
            <li>Statins with grapefruit juice</li>
            <li>Antibiotics with dairy products</li>
            <li>Diuretics with potassium supplements</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            How to Prevent Interactions
          </h2>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
            <li>Keep a complete list of all medications you take</li>
            <li>Include over-the-counter drugs and supplements</li>
            <li>Inform all healthcare providers about your medications</li>
            <li>Use one pharmacy for all prescriptions</li>
            <li>Read medication labels carefully</li>
            <li>Ask about potential interactions before starting new medications</li>
          </ul>

          <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-600 dark:border-brand-400 p-4 my-6">
            <p className="text-sm font-medium text-brand-900 dark:text-brand-100">
              💡 Use MedLens to check for potential drug interactions before starting new medications.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            Signs of Drug Interactions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Watch for unusual symptoms after starting a new medication: dizziness, confusion, changes in heart rate, or unexpected side effects. Contact your healthcare provider if you experience these.
          </p>
        </div>
      </article>
    </div>
  );
}
