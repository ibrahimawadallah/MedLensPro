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
            Women&apos;s Health
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            April 20, 2024
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            7 min read
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Pregnancy and Medication Safety Guide
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
            Taking medications during pregnancy requires careful consideration. This guide helps you understand how to make safe choices for you and your baby.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            General Principles
          </h2>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
            <li>Less is often better during pregnancy</li>
            <li>Never stop prescribed medications without consulting your doctor</li>
            <li>Some conditions require treatment even during pregnancy</li>
            <li>The first trimester is the most critical for fetal development</li>
            <li>Benefits must outweigh potential risks</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            FDA Pregnancy Categories
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Medications are categorized by their potential risk during pregnancy:
          </p>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
            <li><strong>Category A:</strong> No risk in human studies (rare)</li>
            <li><strong>Category B:</strong> No evidence of risk in humans</li>
            <li><strong>Category C:</strong> Risk cannot be ruled out</li>
            <li><strong>Category D:</strong> Positive evidence of risk</li>
            <li><strong>Category X:</strong> Contraindicated in pregnancy</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            Generally Safe Medications
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Some medications are generally considered safe when used as directed:
          </p>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
            <li>Prenatal vitamins</li>
            <li>Acetaminophen (Tylenol) for pain/fever</li>
            <li>Certain antibiotics (penicillin, amoxicillin)</li>
            <li>Some antihistamines (check with doctor)</li>
            <li>Antacids for heartburn</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            Medications to Avoid
          </h2>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
            <li>ACE inhibitors and ARBs (blood pressure)</li>
            <li>Isotretinoin (acne)</li>
            <li>Warfarin (blood thinner)</li>
            <li>Valproic acid (seizures)</li>
            <li>NSAIDs (especially in third trimester)</li>
            <li>Many herbal supplements</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            Chronic Conditions Management
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            If you have chronic conditions, work with your healthcare provider to:
          </p>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
            <li>Review all medications before pregnancy</li>
            <li>Adjust dosages if needed</li>
            <li>Switch to safer alternatives when possible</li>
            <li>Monitor both mother and baby closely</li>
          </ul>

          <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-600 dark:border-brand-400 p-4 my-6">
            <p className="text-sm font-medium text-brand-900 dark:text-brand-100">
              💡 Important: Always consult your healthcare provider before taking any medication during pregnancy, including over-the-counter drugs and supplements.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            When to Seek Immediate Help
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Contact your healthcare provider immediately if you experience unusual symptoms after taking medication, or if you accidentally took a medication that might be harmful.
          </p>
        </div>
      </article>
    </div>
  );
}
