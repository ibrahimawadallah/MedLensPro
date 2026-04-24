import { getTranslations } from "next-intl/server";
import { MyMedsList } from "./MyMedsList";

export async function generateMetadata() {
  const t = await getTranslations("myMeds");
  return { title: t("metaTitle") };
}

export default async function MyMedsPage() {
  const t = await getTranslations("myMeds");
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900">{t("heading")}</h1>
      <p className="text-sm text-slate-600">{t("intro")}</p>
      <MyMedsList />
    </div>
  );
}
