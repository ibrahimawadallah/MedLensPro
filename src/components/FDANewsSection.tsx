"use client";

import { useEffect, useState } from "react";
import { ShieldAlert, ExternalLink, Clock, AlertTriangle, Newspaper } from "lucide-react";
import { getFDADrugSafetyNews, formatFDADate, type FDANewsItem } from "@/lib/fda";

export function FDANewsSection() {
  const [newsItems, setNewsItems] = useState<FDANewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const items = await getFDADrugSafetyNews(3);
        setNewsItems(items);
      } catch (err) {
        setError("Failed to load FDA updates");
        console.error("Error fetching FDA news:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="inline-block h-8 w-8 border-2 border-brand-200 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  if (error || newsItems.length === 0) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-brand-100 dark:bg-brand-900/30">
            <Newspaper className="h-6 w-6 text-brand-600 dark:text-brand-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              FDA Official Updates
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Latest drug safety communications from the U.S. Food and Drug Administration
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
          <Newspaper className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Unable to load FDA updates at this time.
          </p>
          <a
            href="https://www.fda.gov/drugs/drug-safety-and-availability"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
          >
            Visit FDA Drug Safety Page
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-xl bg-brand-100 dark:bg-brand-900/30">
          <Newspaper className="h-6 w-6 text-brand-600 dark:text-brand-400" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            FDA Official Updates
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Latest drug safety communications from the U.S. Food and Drug Administration
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="bg-gradient-to-r from-brand-50 to-blue-50 dark:from-brand-900/20 dark:to-blue-900/20 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <ShieldAlert className="h-4 w-4" />
            <span className="font-medium">Official FDA Source</span>
          </div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {newsItems.map((item, index) => (
            <article key={index} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {item.category?.toLowerCase().includes('warning') || item.category?.toLowerCase().includes('alert') ? (
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  ) : (
                    <Newspaper className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatFDADate(item.pubDate)}</span>
                    </div>
                    {item.category && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                        {item.category}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="hidden sm:inline">Read More</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 px-6 py-4 border-t border-slate-200 dark:border-slate-700">
          <a
            href="https://www.fda.gov/drugs/drug-safety-and-availability"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400"
          >
            View All FDA Updates
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
