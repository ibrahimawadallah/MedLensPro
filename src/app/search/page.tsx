import Link from "next/link";
import { searchSpls } from "@/lib/dailymed";
import { SearchBar } from "@/components/SearchBar";
import { splitSplTitle } from "@/lib/format";

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
        <p className="text-slate-600">Type a medicine name above to begin.</p>
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
      <p className="text-red-700">
        Unable to reach DailyMed. {(e as Error).message}
      </p>
    );
  }

  if (data.data.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
        No medicines matched <strong>{q}</strong>. Check the spelling, or try a
        generic or brand name.
      </div>
    );
  }

  const meta = data.metadata;

  return (
    <div>
      <p className="text-sm text-slate-500 mb-4">
        {meta.total_elements.toLocaleString()} results for{" "}
        <strong className="text-slate-700">{q}</strong> · page {meta.current_page}{" "}
        of {meta.total_pages}
      </p>
      <ul className="space-y-3">
        {data.data.map((spl) => {
          const parts = splitSplTitle(spl.title);
          return (
            <li key={spl.setid}>
              <Link
                href={`/drug/${spl.setid}`}
                className="block rounded-2xl border border-slate-200 bg-white p-4 hover:border-brand-300 hover:shadow-sm transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900 truncate">
                      {parts.name}
                    </p>
                    <p className="text-sm text-slate-500 truncate">
                      {[parts.dosageForm, parts.manufacturer]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {spl.published_date}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <nav className="mt-6 flex items-center justify-between">
        {meta.previous_page !== "null" ? (
          <Link
            href={`/search?q=${encodeURIComponent(q)}&page=${
              meta.previous_page
            }&type=${nameType}`}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50"
          >
            ← Previous
          </Link>
        ) : (
          <span />
        )}
        {meta.next_page !== "null" ? (
          <Link
            href={`/search?q=${encodeURIComponent(q)}&page=${
              meta.next_page
            }&type=${nameType}`}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50"
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
