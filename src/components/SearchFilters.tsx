"use client";

import Link from "next/link";
import { Filter, ChevronDown, X } from "lucide-react";
import { useState } from "react";

interface Props {
  currentType: "generic" | "brand" | "both";
  currentQuery: string;
}

export function SearchFilters({ currentType, currentQuery }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const filterOptions = [
    { value: "both", label: "All Types" },
    { value: "generic", label: "Generic Names" },
    { value: "brand", label: "Brand Names" },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sticky top-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full mb-4"
      >
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-brand-600 dark:text-brand-400" />
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            Filters
          </span>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-slate-400 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="space-y-4">
          {/* Drug Type Filter */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Drug Name Type
            </h3>
            <div className="space-y-2">
              {filterOptions.map((option) => {
                const isActive = currentType === option.value;
                return (
                  <Link
                    key={option.value}
                    href={`/search?q=${encodeURIComponent(currentQuery)}&type=${option.value}`}
                    className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400"
                        : "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span className="text-sm">{option.label}</span>
                    {isActive && <X className="h-4 w-4" />}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Clear Filters */}
          {currentType !== "both" && (
            <Link
              href={`/search?q=${encodeURIComponent(currentQuery)}`}
              className="flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400 hover:underline"
            >
              <X className="h-4 w-4" />
              Clear filters
            </Link>
          )}
        </div>
      )}

      {!isExpanded && currentType !== "both" && (
        <div className="flex items-center justify-between p-2 bg-brand-50 dark:bg-brand-900/30 rounded-lg">
          <span className="text-sm text-brand-700 dark:text-brand-400">
            {filterOptions.find((o) => o.value === currentType)?.label}
          </span>
          <Link
            href={`/search?q=${encodeURIComponent(currentQuery)}`}
            className="p-1 hover:bg-brand-100 dark:hover:bg-brand-900/50 rounded"
          >
            <X className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          </Link>
        </div>
      )}
    </div>
  );
}
