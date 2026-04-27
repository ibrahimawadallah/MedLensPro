"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What is MedLens?",
    answer: "MedLens is a patient-friendly drug information platform that transforms complex FDA drug labels into easy-to-understand sections. We use official data from the U.S. National Library of Medicine's DailyMed database to provide accurate, up-to-date medication information in both English and Arabic.",
    category: "General",
  },
  {
    question: "Is MedLens free to use?",
    answer: "Yes, MedLens is completely free to use. We believe everyone deserves access to clear, accurate medication information. Our service is supported by our commitment to patient education and safety.",
    category: "General",
  },
  {
    question: "Where does the drug information come from?",
    answer: "All drug information comes directly from the U.S. National Library of Medicine's official DailyMed database (API v2). This ensures you're getting FDA-approved, current information for every medication you look up.",
    category: "Data Source",
  },
  {
    question: "Is my personal information stored?",
    answer: "No, we don't store your personal information. Your search history and saved medications are stored locally on your device using localStorage. Nothing is sent to our servers except the necessary API calls to fetch drug information from DailyMed.",
    category: "Privacy",
  },
  {
    question: "Can I trust the information on MedLens?",
    answer: "Yes, all information on MedLens comes from official FDA sources. We don't modify the medical content - we only organize it in a more patient-friendly format. For medical decisions, always consult with your healthcare provider.",
    category: "Accuracy",
  },
  {
    question: "How do I search for a medication?",
    answer: "You can search for medications by drug name (generic or brand), scan the barcode using your camera, or enter the NDC code from the medication packaging. Our search supports both English and Arabic drug names.",
    category: "Using MedLens",
  },
  {
    question: "What is an NDC code?",
    answer: "The National Drug Code (NDC) is a unique 10-digit or 11-digit number assigned to each medication. It's printed on most medication packaging and can be used to look up specific drug products.",
    category: "Using MedLens",
  },
  {
    question: "How does barcode scanning work?",
    answer: "Point your camera at the barcode on your medication packaging. Our system will extract the NDC code and automatically look up the medication information. This feature works best on modern browsers with camera support.",
    category: "Using MedLens",
  },
  {
    question: "Can I save medications for quick access?",
    answer: "Yes, you can save medications to your 'My Meds' list by clicking the 'Save to My Meds' button on any drug page. Your saved medications are stored locally on your device for quick access.",
    category: "Using MedLens",
  },
  {
    question: "Does MedLens work offline?",
    answer: "MedLens requires an internet connection to fetch the latest drug information from DailyMed. However, your saved medications in 'My Meds' remain available even when you're offline.",
    category: "Technical",
  },
  {
    question: "Is MedLens available in Arabic?",
    answer: "Yes, MedLens is fully bilingual with support for both English and Arabic. You can switch languages using the language selector in the navigation bar. The interface and content are optimized for Arabic-speaking users.",
    category: "Language",
  },
  {
    question: "Can I use MedLens on my mobile device?",
    answer: "Yes, MedLens is designed to work seamlessly on mobile devices. Our responsive design ensures a great experience on smartphones and tablets, with touch-friendly interfaces and mobile-optimized features.",
    category: "Technical",
  },
  {
    question: "Should I use MedLens instead of talking to my doctor?",
    answer: "No, MedLens is designed to complement, not replace, professional medical advice. Always consult your healthcare provider before making decisions about your medications. MedLens helps you understand your medications better so you can have more informed conversations with your doctor.",
    category: "Medical Advice",
  },
  {
    question: "How often is the drug information updated?",
    answer: "Drug information is fetched in real-time from DailyMed, which means you always have access to the most current FDA-approved labels. We also implement caching to improve performance while ensuring data freshness.",
    category: "Data Source",
  },
  {
    question: "Can I share drug information with my doctor?",
    answer: "Yes, you can share the link to any drug page with your healthcare provider. Each drug page includes a link to the full official label on DailyMed for complete information.",
    category: "Using MedLens",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Find answers to common questions about MedLens
        </p>
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            {category}
          </h2>
          <div className="space-y-3">
            {faqs
              .filter((faq) => faq.category === category)
              .map((faq) => {
                const faqIndex = faqs.indexOf(faq);
                return (
                  <div
                    key={faqIndex}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === faqIndex ? null : faqIndex)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      aria-expanded={openIndex === faqIndex}
                    >
                      <span className="font-medium text-slate-900 dark:text-slate-100 pr-4">
                        {faq.question}
                      </span>
                      {openIndex === faqIndex ? (
                        <ChevronUp className="h-5 w-5 text-slate-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-500 flex-shrink-0" />
                      )}
                    </button>
                    {openIndex === faqIndex && (
                      <div className="px-4 pb-4 pt-0">
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      ))}

      <div className="mt-8 p-6 bg-brand-50 dark:bg-brand-900/20 rounded-xl border border-brand-200 dark:border-brand-800">
        <h3 className="font-semibold text-brand-900 dark:text-brand-100 mb-2">
          Still have questions?
        </h3>
        <p className="text-brand-800 dark:text-brand-200 mb-4">
          Can&apos;t find the answer you&apos;re looking for? Please reach out to us and we&apos;ll be happy to help.
        </p>
        <a
          href="mailto:support@medlens.app"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 dark:bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 dark:hover:bg-brand-600 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
