import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("common");
  return (
    <div
      role="status"
      aria-live="polite"
      className="max-w-3xl mx-auto px-4 py-12 space-y-4"
    >
      <span className="sr-only">{t("loading")}</span>
      <div className="h-8 w-2/3 rounded-lg bg-slate-200 animate-pulse" />
      <div className="h-4 w-1/3 rounded-lg bg-slate-200 animate-pulse" />
      <div className="space-y-3 pt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-20 w-full rounded-2xl bg-slate-100 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
