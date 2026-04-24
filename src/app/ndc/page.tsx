import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { findSplsByNdc } from "@/lib/dailymed";
import { normalizeNdc, labelerAndProduct } from "@/lib/ndc";
import { splitSplTitle } from "@/lib/format";

export async function generateMetadata() {
  const t = await getTranslations("ndc");
  return { title: t("metaTitle") };
}

interface Props {
  searchParams: { ndc?: string };
}

export default async function NdcLookupPage({ searchParams }: Props) {
  const t = await getTranslations("ndc");
  const raw = (searchParams.ndc ?? "").trim();
  const normalized = raw ? normalizeNdc(raw) : null;

  let hits: Awaited<ReturnType<typeof findSplsByNdc>> | null = null;
  let triedLabeler = false;
  if (normalized) {
    try {
      hits = await findSplsByNdc(normalized);
      if (hits.data.length === 0) {
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
      <h1 className="text-2xl font-semibold text-slate-900">{t("heading")}</h1>
      <p className="text-sm text-slate-600">
        {t.rich("intro", {
          code: (chunks) => <span className="font-mono">{chunks}</span>,
        })}
      </p>

      <form method="GET" className="flex gap-2" aria-label={t("formLabel")}>
        <label htmlFor="ndc-input" className="sr-only">
          {t("inputLabel")}
        </label>
        <input
          id="ndc-input"
          type="text"
          name="ndc"
          defaultValue={raw}
          inputMode="numeric"
          autoComplete="off"
          placeholder={t("placeholder")}
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm outline-none focus:ring-2 focus:ring-brand-300"
        />
        <button
          type="submit"
          className="rounded-xl bg-brand-600 px-4 py-3 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          {t("submit")}
        </button>
      </form>

      {raw && !normalized && (
        <p className="text-red-700 text-sm">
          {t.rich("invalid", {
            code: (chunks) => <span className="font-mono">{chunks}</span>,
          })}
        </p>
      )}

      {hits && normalized && (
        <section>
          <p className="text-sm text-slate-500 mb-2">
            {triedLabeler ? t("labelerMatch") : t("exactMatch")}{" "}
            <span className="font-mono text-slate-700">{normalized}</span>
          </p>
          {hits.data.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
              {t("empty")}
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
