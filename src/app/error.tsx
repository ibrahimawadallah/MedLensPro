"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();

  useEffect(() => {
    if (typeof console !== "undefined") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900">
        {t("errors.heading")}
      </h1>
      <p className="text-slate-600">{t("errors.body")}</p>
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          {t("common.tryAgain")}
        </button>
        <Link
          href="/"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          {t("common.backToHome")}
        </Link>
      </div>
      {error.digest && (
        <p className="text-xs text-slate-400">
          {t("common.reference", { digest: error.digest })}
        </p>
      )}
    </div>
  );
}
