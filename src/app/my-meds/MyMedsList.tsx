"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { loadMyMeds, removeMyMed, type SavedMed } from "@/lib/storage";
import { splitSplTitle } from "@/lib/format";

export function MyMedsList() {
  const [meds, setMeds] = useState<SavedMed[] | null>(null);
  const t = useTranslations("myMeds");
  const tCommon = useTranslations("common");

  useEffect(() => {
    setMeds(loadMyMeds());
  }, []);

  if (meds === null) {
    return <p className="text-sm text-slate-500">{tCommon("loading")}</p>;
  }
  if (meds.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
        {t.rich("empty", {
          strong: (chunks) => <strong>{chunks}</strong>,
        })}
      </div>
    );
  }
  return (
    <ul className="space-y-3">
      {meds.map((m) => {
        const parts = splitSplTitle(m.title);
        const name = m.productName ?? parts.name;
        return (
          <li
            key={m.setid}
            className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between gap-3"
          >
            <Link href={`/drug/${m.setid}`} className="min-w-0 flex-1">
              <p className="font-medium text-slate-900 truncate">{name}</p>
              <p className="text-sm text-slate-500 truncate">
                {[parts.dosageForm, m.manufacturer].filter(Boolean).join(" · ")}
              </p>
              {m.ndc && (
                <p className="mt-1 text-xs font-mono text-slate-400">{m.ndc}</p>
              )}
            </Link>
            <button
              type="button"
              aria-label={t("remove", { name })}
              onClick={() => setMeds(removeMyMed(m.setid))}
              className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" aria-hidden />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
