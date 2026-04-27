"use client";

import { useId, useState } from "react";
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
  const bodyId = useId();
  return (
    <section
      className={clsx(
        "rounded-2xl border bg-white overflow-hidden",
        accent === "warning" && "border-amber-300 bg-amber-50/60",
        accent === "danger" && "border-red-300 bg-red-50/60",
        accent === "default" && "border-slate-200",
      )}
      aria-labelledby={bodyId + "-title"}
    >
      <h2 className="m-0">
        <button
          type="button"
          id={bodyId + "-title"}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={bodyId}
          className="w-full flex items-start justify-between gap-3 text-left px-5 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          <span className="flex-1">
            <span className="flex items-center gap-2 flex-wrap">
              <span className="text-base md:text-lg font-semibold text-slate-900">
                {title}
              </span>
              {badge && (
                <span className="text-[11px] uppercase tracking-wide font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </span>
            {hint && (
              <span className="block text-sm font-normal text-slate-600 mt-0.5">
                {hint}
              </span>
            )}
            {!open && previewHtml && (
              <span className="block text-sm font-normal text-slate-600 mt-2 line-clamp-3">
                {previewHtml}
              </span>
            )}
          </span>
          <ChevronDown
            className={clsx(
              "mt-1 h-5 w-5 text-slate-500 transition-transform shrink-0",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </button>
      </h2>
      <div
        id={bodyId}
        hidden={!open}
        className="spl-content px-5 pb-5 text-[15px] text-slate-800"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
    </section>
  );
}
