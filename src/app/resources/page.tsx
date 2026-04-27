import { BookOpen, FileText, ExternalLink, Download } from "lucide-react";
import Link from "next/link";

const resources = [
  {
    title: "Understanding Drug Labels",
    description: "A comprehensive guide to reading and understanding medication labels",
    type: "guide",
    icon: BookOpen,
    link: "/blog/how-to-read-drug-labels-arabic",
    external: false,
  },
  {
    title: "FDA DailyMed Official Site",
    description: "The official source for FDA-approved drug labeling information",
    type: "external",
    icon: ExternalLink,
    link: "https://dailymed.nlm.nih.gov/",
    external: true,
  },
  {
    title: "Medication Safety Checklist",
    description: "Download our printable medication safety checklist",
    type: "download",
    icon: Download,
    link: "#",
    external: false,
  },
  {
    title: "Drug Interaction Checker",
    description: "Learn about potential drug interactions and how to avoid them",
    type: "guide",
    icon: FileText,
    link: "/blog/understanding-drug-interactions",
    external: false,
  },
  {
    title: "FDA Medication Guide Repository",
    description: "Official FDA medication guides for patient education",
    type: "external",
    icon: ExternalLink,
    link: "https://www.fda.gov/drugs/drug-safety-and-availability/medication-guides",
    external: true,
  },
  {
    title: "Pregnancy and Medication Safety",
    description: "Important information about medication use during pregnancy",
    type: "guide",
    icon: BookOpen,
    link: "/blog/pregnancy-medication-guide",
    external: false,
  },
  {
    title: "Elderly Medication Safety",
    description: "Special considerations for medication use in older adults",
    type: "guide",
    icon: BookOpen,
    link: "/blog/medication-safety-elderly",
    external: false,
  },
  {
    title: "Common Medication Mistakes",
    description: "Learn about common errors and how to avoid them",
    type: "guide",
    icon: FileText,
    link: "/blog/common-medication-mistakes",
    external: false,
  },
];

const categories = [
  { name: "All Resources", count: resources.length },
  { name: "Guides", count: resources.filter((r) => r.type === "guide").length },
  { name: "External Links", count: resources.filter((r) => r.type === "external").length },
  { name: "Downloads", count: resources.filter((r) => r.type === "download").length },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Resource Library
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Educational materials, guides, and external resources for medication safety
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.name}
            className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          const content = (
            <>
              <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {resource.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {resource.description}
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400">
                {resource.external ? (
                  <>
                    <span>Visit site</span>
                    <ExternalLink className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>View resource</span>
                    <ExternalLink className="h-4 w-4" />
                  </>
                )}
              </div>
            </>
          );

          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all"
            >
              {resource.external ? (
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {content}
                </a>
              ) : (
                <Link href={resource.link} className="block h-full">
                  {content}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Looking for something specific?
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Can&apos;t find the resource you&apos;re looking for? Let us know and we&apos;ll add it to our library.
        </p>
        <a
          href="mailto:support@medlens.app?subject=Resource Request"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 dark:bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 dark:hover:bg-brand-600 transition-colors"
        >
          Request a Resource
        </a>
      </div>
    </div>
  );
}
