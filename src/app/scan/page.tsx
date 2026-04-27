import { getTranslations } from "next-intl/server";
import { BarcodeScanner } from "./BarcodeScanner";

export async function generateMetadata() {
  const t = await getTranslations("scan");
  return { title: t("metaTitle") };
}

export default async function ScanPage() {
  const t = await getTranslations("scan");
  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900">{t("heading")}</h1>
      <p className="text-sm text-slate-600">{t("intro")}</p>
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <BarcodeScanner />
      </div>
      <p className="text-xs text-slate-500">{t("privacyNote")}</p>
    </div>
  );
}
