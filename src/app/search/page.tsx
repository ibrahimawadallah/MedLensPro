import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { searchSpls } from "@/lib/dailymed";
import { SearchBar } from "@/components/SearchBar";
import { splitSplTitle } from "@/lib/format";
import { Search, Filter, Clock, TrendingUp, Pill, Package } from "lucide-react";
import { SearchFilters } from "@/components/SearchFilters";
import { getRecentSearches } from "@/lib/storage";

function hasPage(v: number | "null" | null | undefined): v is number {
  return typeof v === "number" && v > 0;
}

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { q?: string; page?: string; type?: string };
}

export async function generateMetadata({ searchParams }: Props) {
  const t = await getTranslations("search");
  const q = searchParams.q?.trim();
  return { title: q ? t("metaTitleWithQuery", { q }) : t("metaTitle") };
}

export default async function SearchPage({ searchParams }: Props) {
  const t = await getTranslations("search");
  const q = searchParams.q?.trim() ?? "";
  const page = Math.max(1, Number(searchParams.page ?? "1") || 1);
  const nameType =
    searchParams.type === "generic" || searchParams.type === "brand"
      ? (searchParams.type as "generic" | "brand")
      : "both";

  const recentSearches = getRecentSearches();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-brand-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-brand-600 dark:bg-brand-500">
              <Search className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Drug Search
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Find medications, learn about side effects, and more
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
            <SearchBar defaultValue={q} autoFocus={!q} />
          </div>
        </div>

        {!q ? (
          <NoResultsState recentSearches={recentSearches} />
        ) : (
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <SearchFilters currentType={nameType} currentQuery={q} />
            </aside>

            {/* Main Results */}
            <main className="lg:col-span-3">
              <SearchResults q={q} page={page} nameType={nameType} />
            </main>
          </div>
        )}
      </div>
    </div>
  );
}

function NoResultsState({ recentSearches }: { recentSearches: string[] }) {
  return (
    <div className="space-y-6">
      {/* Popular Searches */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-brand-600 dark:text-brand-400" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Popular Searches
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {["ibuprofen", "acetaminophen", "amoxicillin", "lisinopril", "metformin"].map((drug) => (
            <Link
              key={drug}
              href={`/search?q=${encodeURIComponent(drug)}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-700 dark:hover:text-brand-400 transition-colors"
            >
              <Search className="h-4 w-4" />
              {drug}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Recent Searches
            </h2>
          </div>
          <div className="space-y-2">
            {recentSearches.slice(0, 5).map((search) => (
              <Link
                key={search}
                href={`/search?q=${encodeURIComponent(search)}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <Clock className="h-4 w-4 text-slate-400" />
                <span className="text-slate-700 dark:text-slate-300">{search}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick Categories */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Pill className="h-5 w-5 text-brand-600 dark:text-brand-400" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Browse by Category
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { name: "Pain Relief", icon: Package, query: "pain relief" },
            { name: "Antibiotics", icon: Pill, query: "antibiotic" },
            { name: "Heart Health", icon: Package, query: "blood pressure" },
            { name: "Diabetes", icon: Pill, query: "diabetes" },
            { name: "Allergy", icon: Package, query: "allergy" },
            { name: "Vitamins", icon: Pill, query: "vitamin" },
          ].map((category) => (
            <Link
              key={category.name}
              href={`/search?q=${encodeURIComponent(category.query)}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-700 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors"
            >
              <category.icon className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 text-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

async function SearchResults({
  q,
  page,
  nameType,
}: {
  q: string;
  page: number;
  nameType: "generic" | "brand" | "both";
}) {
  const t = await getTranslations("search");
  let data;
  try {
    data = await searchSpls(q, { page, nameType, pageSize: 12 });
  } catch (e) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 text-center">
        <p className="text-red-700 dark:text-red-400">
          {t("error", { message: (e as Error).message })}
        </p>
      </div>
    );
  }

  if (data.data.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 text-center">
        <Search className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
          No results found
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          {t.rich("empty", {
            q,
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition-colors"
        >
          <Search className="h-4 w-4" />
          Try a different search
        </Link>
      </div>
    );
  }

  const meta = data.metadata;

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t.rich("meta", {
              count: meta.total_elements,
              q,
              page: meta.current_page,
              total: meta.total_pages,
              strong: (chunks) => (
                <strong className="text-slate-700 dark:text-slate-300">{chunks}</strong>
              ),
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Page {meta.current_page} of {meta.total_pages}
          </span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {data.data.map((spl) => {
          const parts = splitSplTitle(spl.title);
          return (
            <Link
              key={spl.setid}
              href={`/drug/${spl.setid}`}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-lg border border-slate-200 dark:border-slate-700 p-5 transition-all hover:border-brand-300 dark:hover:border-brand-600 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center group-hover:bg-brand-200 dark:group-hover:bg-brand-900/50 transition-colors">
                  <Pill className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {parts.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 line-clamp-1">
                    {[parts.dosageForm, parts.manufacturer]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="h-3 w-3" />
                    <span>{spl.published_date}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Enhanced Pagination */}
      <nav className="flex items-center justify-center gap-2">
        {hasPage(meta.previous_page) && (
          <Link
            href={`/search?q=${encodeURIComponent(q)}&page=${meta.previous_page}&type=${nameType}`}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Previous
          </Link>
        )}

        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, meta.total_pages) }, (_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === meta.current_page;
            return (
              <Link
                key={pageNum}
                href={`/search?q=${encodeURIComponent(q)}&page=${pageNum}&type=${nameType}`}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-600 text-white"
                    : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                {pageNum}
              </Link>
            );
          })}
        </div>

        {hasPage(meta.next_page) && (
          <Link
            href={`/search?q=${encodeURIComponent(q)}&page=${meta.next_page}&type=${nameType}`}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  );
}
