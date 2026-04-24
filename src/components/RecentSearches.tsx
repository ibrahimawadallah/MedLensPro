"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { getRecentSearches } from "@/lib/storage";

export function RecentSearches() {
  const [recent, setRecent] = useState<string[] | null>(null);

  useEffect(() => {
    setRecent(getRecentSearches());
  }, []);

  if (!recent || recent.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-slate-400 dark:text-slate-500" aria-hidden />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Recent searches
        </h2>
      </div>
      <ul className="flex flex-wrap gap-2">
        {recent.map((query) => (
          <li key={query}>
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              className="inline-block rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:border-brand-300 hover:text-brand-700 dark:hover:border-brand-500 dark:hover:text-brand-400"
            >
              {query}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
