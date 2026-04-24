import Link from "next/link";
import { searchSpls } from "@/lib/dailymed";
import { SearchBar } from "@/components/SearchBar";
import { splitSplTitle } from "@/lib/format";
import { RecentSearches } from "@/components/RecentSearches";

function hasPage(v: number | "null" | null | undefined): v is number {
  return typeof v === "number" && v > 0;
}

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { q?: string; page?: string; type?: string };
}

export async function generateMetadata({ searchParams }: Props) {
  const q = searchParams.q?.trim();
  return { title: q ? `Search: ${q}` : "Search medications" };
}

export default async function SearchPage({ searchParams }: Props) {
  const q = searchParams.q?.trim() ?? "";
  const page = Math.max(1, Number(searchParams.page ?? "1") || 1);
  const nameType =
    searchParams.type === "generic" || searchParams.type === "brand"
      ? (searchParams.type as "generic" | "brand")
      : "both";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <SearchBar defaultValue={q} />
      </div>

      {!q ? (
        <div className="space-y-6">
          <p className="text-slate-600 dark:text-slate-400">Type a medicine name above to begin.</p>
          <RecentSearches />
        </div>
      ) : (
        <SearchResults q={q} page={page} nameType={nameType} />
      )}
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
  let data;
  try {
    data = await searchSpls(q, { page, nameType, pageSize: 20 });
  } catch (e) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 dark:bg-red-900/20 p-6">
        <p className="text-red-700 dark:text-red-400 font-medium">
          Unable to reach DailyMed
        </p>
        <p className="text-sm text-red-600 dark:text-red-500 mt-1">
          {(e as Error).message}
        </p>
        <p className="text-sm text-red-600 dark:text-red-500 mt-2">
          Please check your connection and try again.
        </p>
      </div>
    );
  }

  if (data.data.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 text-slate-600 dark:text-slate-400">
        No medicines matched <strong className="text-slate-900 dark:text-slate-200">{q}</strong>. Check the spelling, or try a
        generic or brand name.
      </div>
    );
  }

  const meta = data.metadata;

  return (
    <div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        {meta.total_elements.toLocaleString()} results for{" "}
        <strong className="text-slate-700 dark:text-slate-300">{q}</strong> · page {meta.current_page}{" "}
        of {meta.total_pages}
      </p>
      <ul className="space-y-3">
        {data.data.map((spl) => {
          const parts = splitSplTitle(spl.title);
          return (
            <li key={spl.setid}>
              <Link
                href={`/drug/${spl.setid}`}
                className="block rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-sm transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900 dark:text-slate-100 truncate">
                      {parts.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {[parts.dosageForm, parts.manufacturer]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
                    {spl.published_date}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <nav className="mt-6 flex items-center justify-between">
        {hasPage(meta.previous_page) ? (
          <Link
            href={`/search?q=${encodeURIComponent(q)}&page=${
              meta.previous_page
            }&type=${nameType}`}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            ← Previous
          </Link>
        ) : (
          <span />
        )}
        {hasPage(meta.next_page) ? (
          <Link
            href={`/search?q=${encodeURIComponent(q)}&page=${
              meta.next_page
            }&type=${nameType}`}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            Next →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
