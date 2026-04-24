"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { loadMyMeds, removeMyMed, type SavedMed } from "@/lib/storage";
import { splitSplTitle } from "@/lib/format";

export function MyMedsList() {
  const [meds, setMeds] = useState<SavedMed[] | null>(null);

  useEffect(() => {
    setMeds(loadMyMeds());
  }, []);

  if (meds === null) {
    return <p className="text-sm text-slate-500">Loading…</p>;
  }
  if (meds.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
        You haven&apos;t saved any medications yet. Open a drug label and tap
        <span className="mx-1 font-medium">Save to My meds</span>.
      </div>
    );
  }
  return (
    <ul className="space-y-3">
      {meds.map((m) => {
        const parts = splitSplTitle(m.title);
        return (
          <li
            key={m.setid}
            className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between gap-3"
          >
            <Link href={`/drug/${m.setid}`} className="min-w-0 flex-1">
              <p className="font-medium text-slate-900 truncate">
                {m.productName ?? parts.name}
              </p>
              <p className="text-sm text-slate-500 truncate">
                {[parts.dosageForm, m.manufacturer].filter(Boolean).join(" · ")}
              </p>
              {m.ndc && (
                <p className="mt-1 text-xs font-mono text-slate-400">{m.ndc}</p>
              )}
            </Link>
            <button
              type="button"
              aria-label={`Remove ${m.productName ?? parts.name}`}
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
