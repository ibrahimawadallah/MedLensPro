import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { searchUAEDrugsByName, searchUAEDrugsByGeneric } from "@/lib/uae";
import type { UAEDrug } from "@/lib/uae";

export async function generateMetadata() {
  const t = await getTranslations("uae");
  return { title: t("metaTitle") };
}

interface Props {
  searchParams: { query?: string; searchType?: 'name' | 'generic' };
}

export default async function UAEDrugLookupPage({ searchParams }: Props) {
  const t = await getTranslations("uae");
  const query = (searchParams.query ?? "").trim();
  const searchType = searchParams.searchType ?? 'name';

  let results: Awaited<ReturnType<typeof searchUAEDrugsByName | typeof searchUAEDrugsByGeneric>> | null = null;
  if (query) {
    try {
      if (searchType === 'name') {
        results = await searchUAEDrugsByName(query, { pageSize: 25, page: 1 });
      } else {
        results = await searchUAEDrugsByGeneric(query, { pageSize: 25, page: 1 });
      }
    } catch {
      results = null;
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">{t("heading")}</h1>
      <p className="text-sm text-slate-600">
        {t.rich("intro", {
          code: (chunks) => <span className="font-mono">{chunks}</span>,
        })}
      </p>

      <form method="GET" className="space-y-4" aria-label={t("formLabel")}>
        <div className="flex gap-2">
          <label htmlFor="search-type" className="sr-only">
            {t("searchTypeLabel")}
          </label>
          <select
            id="search-type"
            name="searchType"
            defaultValue={searchType}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-300"
          >
            <option value="name">{t("searchByName")}</option>
            <option value="generic">{t("searchByGeneric")}</option>
          </select>
        </div>
        <div className="flex gap-2">
          <label htmlFor="query-input" className="sr-only">
            {t("inputLabel")}
          </label>
          <input
            id="query-input"
            type="text"
            name="query"
            defaultValue={query}
            autoComplete="off"
            placeholder={searchType === 'name' ? t("placeholderName") : t("placeholderGeneric")}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-300"
          />
          <button
            type="submit"
            className="rounded-xl bg-brand-600 px-4 py-3 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            {t("submit")}
          </button>
        </div>
      </form>

      {results && query && (
        <section>
          <p className="text-sm text-slate-500 mb-2">
            {t("results")} <span className="font-mono text-slate-700">{query}</span> ({results.total} {t("found")})
          </p>
          {results.data.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
              {t("empty")}
            </div>
          ) : (
            <ul className="space-y-3">
              {results.data.map((drug: UAEDrug) => (
                <li key={drug['Drug Code']}>
                  <Link
                    href={`/uae-drug/${drug['Drug Code']}`}
                    className="block rounded-2xl border border-slate-200 bg-white p-4 hover:border-brand-300 hover:shadow-sm"
                  >
                    <p className="font-medium text-slate-900">{drug['Package Name']}</p>
                    <p className="text-sm text-slate-500">
                      {drug['Generic Name']} · {drug['Strength']} · {drug['Dosage Form']}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {drug['Manufacturer Name']} · {drug['Drug Code']}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}