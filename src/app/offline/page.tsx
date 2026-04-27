import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("offline");
  return { title: t("metaTitle") };
}

export default async function OfflinePage() {
  const t = await getTranslations("offline");
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-3">
      <h1 className="text-2xl font-semibold text-slate-900">{t("heading")}</h1>
      <p className="text-slate-600">
        {t.rich("body", {
          link: (chunks) => (
            <a className="text-brand-700 underline" href="/my-meds">
              {chunks}
            </a>
          ),
        })}
      </p>
    </div>
  );
}
