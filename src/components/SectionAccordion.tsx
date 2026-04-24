"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface Props {
  title: string;
  hint?: string;
  badge?: string;
  previewHtml?: string;
  bodyHtml: string;
  defaultOpen?: boolean;
  accent?: "default" | "warning" | "danger";
}

export function SectionAccordion({
  title,
  hint,
  badge,
  previewHtml,
  bodyHtml,
  defaultOpen = false,
  accent = "default",
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section
      className={clsx(
        "rounded-2xl border bg-white overflow-hidden",
        accent === "warning" && "border-amber-300 bg-amber-50/60",
        accent === "danger" && "border-red-300 bg-red-50/60",
        accent === "default" && "border-slate-200",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-3 text-left px-5 py-4"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base md:text-lg font-semibold text-slate-900">
              {title}
            </h2>
            {badge && (
              <span className="text-[11px] uppercase tracking-wide font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                {badge}
              </span>
            )}
          </div>
          {hint && <p className="text-sm text-slate-500 mt-0.5">{hint}</p>}
          {!open && previewHtml && (
            <p className="text-sm text-slate-600 mt-2 line-clamp-3">
              {previewHtml}
            </p>
          )}
        </div>
        <ChevronDown
          className={clsx(
            "mt-1 h-5 w-5 text-slate-400 transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      {open && (
        <div
          className="spl-content px-5 pb-5 text-[15px] text-slate-800"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      )}
    </section>
  );
}
