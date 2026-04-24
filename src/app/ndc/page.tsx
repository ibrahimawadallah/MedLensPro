import Link from "next/link";
import { findSplsByNdc } from "@/lib/dailymed";
import { normalizeNdc, labelerAndProduct } from "@/lib/ndc";
import { splitSplTitle } from "@/lib/format";

export const metadata = { title: "Look up by NDC" };

interface Props {
  searchParams: { ndc?: string };
}

export default async function NdcLookupPage({ searchParams }: Props) {
  const raw = (searchParams.ndc ?? "").trim();
  const normalized = raw ? normalizeNdc(raw) : null;

  let hits: Awaited<ReturnType<typeof findSplsByNdc>> | null = null;
  let triedLabeler = false;
  if (normalized) {
    try {
      hits = await findSplsByNdc(normalized);
      if (hits.data.length === 0) {
        // Fall back to labeler-product only
        const short = labelerAndProduct(normalized);
        if (short && short !== normalized) {
          triedLabeler = true;
          hits = await findSplsByNdc(short);
        }
      }
    } catch {
      hits = null;
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">
        Look up a medicine by its NDC code
      </h1>
      <p className="text-sm text-slate-600">
        The National Drug Code (NDC) is printed on most US medication packaging.
        It&apos;s usually three groups of numbers, like{" "}
        <span className="font-mono">0002-4462-30</span>.
      </p>

      <form method="GET" className="flex gap-2">
        <input
          type="text"
          name="ndc"
          defaultValue={raw}
          inputMode="numeric"
          autoComplete="off"
          placeholder="e.g. 0002-4462-30"
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm outline-none focus:ring-2 focus:ring-brand-300"
        />
        <button
          type="submit"
          className="rounded-xl bg-brand-600 px-4 py-3 text-sm font-medium text-white hover:bg-brand-700"
        >
          Look up
        </button>
      </form>

      {raw && !normalized && (
        <p className="text-red-700 text-sm">
          That doesn&apos;t look like a valid NDC. Enter 8–13 digits
          (e.g. <span className="font-mono">0002-4462-30</span>).
        </p>
      )}

      {hits && normalized && (
        <section>
          <p className="text-sm text-slate-500 mb-2">
            {triedLabeler ? "No exact match — showing products from the same labeler:" : "Matches for"}{" "}
            <span className="font-mono text-slate-700">{normalized}</span>
          </p>
          {hits.data.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
              No medicines found for that NDC in DailyMed.
            </div>
          ) : (
            <ul className="space-y-3">
              {hits.data.map((spl) => {
                const parts = splitSplTitle(spl.title);
                return (
                  <li key={spl.setid}>
                    <Link
                      href={`/drug/${spl.setid}`}
                      className="block rounded-2xl border border-slate-200 bg-white p-4 hover:border-brand-300 hover:shadow-sm"
                    >
                      <p className="font-medium text-slate-900">{parts.name}</p>
                      <p className="text-sm text-slate-500">
                        {[parts.dosageForm, parts.manufacturer]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
