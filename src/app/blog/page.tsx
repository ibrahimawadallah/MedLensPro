import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    slug: "how-to-read-drug-labels-arabic",
    title: "How to Read Drug Labels in Arabic",
    description: "A comprehensive guide to understanding medication information in Arabic for better health outcomes.",
    date: "2024-04-24",
    readTime: "5 min read",
    category: "Patient Education",
  },
  {
    slug: "common-medication-mistakes",
    title: "Common Medication Mistakes to Avoid",
    description: "Learn about the most common errors patients make when taking medications and how to prevent them.",
    date: "2024-04-23",
    readTime: "4 min read",
    category: "Safety",
  },
  {
    slug: "understanding-drug-interactions",
    title: "Understanding Drug Interactions",
    description: "Essential information about how different medications can interact with each other and with food.",
    date: "2024-04-22",
    readTime: "6 min read",
    category: "Safety",
  },
  {
    slug: "medication-safety-elderly",
    title: "Medication Safety for Elderly Patients",
    description: "Special considerations and tips for safe medication use in older adults.",
    date: "2024-04-21",
    readTime: "5 min read",
    category: "Patient Education",
  },
  {
    slug: "pregnancy-medication-guide",
    title: "Pregnancy and Medication Safety Guide",
    description: "What you need to know about taking medications during pregnancy for you and your baby's health.",
    date: "2024-04-20",
    readTime: "7 min read",
    category: "Women's Health",
  },
];

export default async function BlogPage() {

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Health Education Blog
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Expert insights on medication safety, patient education, and health tips
        </p>
      </div>

      <div className="space-y-6">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{post.description}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                >
                  Read more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
