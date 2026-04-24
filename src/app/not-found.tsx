import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold text-slate-900">
        {t("errors.notFoundHeading")}
      </h1>
      <p className="mt-2 text-slate-600">{t("errors.notFoundBody")}</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
      >
        {t("common.backToSearch")}
      </Link>
    </div>
  );
}
