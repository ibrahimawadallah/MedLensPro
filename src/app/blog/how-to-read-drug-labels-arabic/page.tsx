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
            April 24, 2024
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            5 min read
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          How to Read Drug Labels in Arabic
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
            Understanding medication information in Arabic is essential for Arabic-speaking patients to ensure safe and effective use of medicines. This comprehensive guide will help you navigate drug labels and make informed decisions about your health.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            Why Reading Drug Labels Matters
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Drug labels contain critical information about your medication, including:
          </p>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
            <li>Active ingredients and their purpose</li>
            <li>Proper dosage and administration</li>
            <li>Potential side effects and warnings</li>
            <li>Drug interactions to avoid</li>
            <li>Storage requirements</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            Key Sections of Arabic Drug Labels
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            When reading Arabic drug labels, pay special attention to these sections:
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
            1. اسم الدواء (Drug Name)
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            This section lists both the generic name (الاسم العلمي) and brand name (الاسم التجاري) of the medication.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
            2. المادة الفعالة (Active Ingredient)
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Identifies the active pharmaceutical ingredient that provides the therapeutic effect.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
            3. الجرعة وطريقة الاستخدام (Dosage and Administration)
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Provides crucial information about how much to take, when to take it, and how to administer the medication properly.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
            4. التحذيرات والاحتياطات (Warnings and Precautions)
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Lists important safety information, including contraindications, side effects, and special precautions.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            Tips for Arabic-Speaking Patients
          </h2>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
            <li>Always read the complete label before taking any medication</li>
            <li>Ask your pharmacist to explain any unclear sections</li>
            <li>Keep a list of your medications in both Arabic and English</li>
            <li>Use translation tools if needed, but verify with healthcare professionals</li>
            <li>Store medications according to the label instructions</li>
          </ul>

          <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-600 dark:border-brand-400 p-4 my-6">
            <p className="text-sm font-medium text-brand-900 dark:text-brand-100">
              💡 Remember: MedLens provides patient-friendly drug information in both English and Arabic to help you understand your medications better.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">
            When to Seek Help
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            If you have questions about your medication or experience unusual symptoms, contact your healthcare provider immediately. Do not hesitate to ask for clarification on any part of your drug label.
          </p>

          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Your health and safety are paramount. Taking the time to understand your medication labels in Arabic (and English) can help prevent medication errors and ensure you get the full benefit of your treatment.
          </p>
        </div>
      </article>
    </div>
  );
}
