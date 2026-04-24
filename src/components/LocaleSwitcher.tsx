"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { Languages } from "lucide-react";
import { LOCALE_LABELS, locales, type Locale } from "@/i18n/config";

export function LocaleSwitcher() {
  const router = useRouter();
  const current = useLocale() as Locale;
  const t = useTranslations("common");
  const [pending, start] = useTransition();

  function change(next: Locale) {
    if (next === current || pending) return;
    start(async () => {
      await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: next }),
      });
      router.refresh();
    });
  }

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-0.5 text-xs"
      role="group"
      aria-label={t("language")}
    >
      <Languages
        className="h-3.5 w-3.5 text-slate-400 ms-1.5"
        aria-hidden
      />
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => change(loc)}
          aria-pressed={loc === current}
          disabled={pending}
          className={
            "rounded-full px-2 py-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 " +
            (loc === current
              ? "bg-brand-600 text-white"
              : "text-slate-700 hover:bg-slate-100")
          }
        >
          {LOCALE_LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
