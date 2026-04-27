import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getUAEDrugByCode } from "@/lib/uae";
import { ChevronLeft, Pill, Package, DollarSign, Shield, Building } from "lucide-react";

export const revalidate = 86400;

interface Props {
  params: { drugCode: string };
}

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations("uae-drug");
  try {
    const drug = await getUAEDrugByCode(params.drugCode);
    const name = drug?.['Package Name'] ?? t("fallbackName");
    return { title: name };
  } catch {
    return { title: t("fallbackName") };
  }
}

export default async function UAEDrugPage({ params }: Props) {
  const { drugCode } = params;
  const t = await getTranslations("uae-drug");
  const tCommon = await getTranslations("common");

  let drug: Awaited<ReturnType<typeof getUAEDrugByCode>>;
  try {
    drug = await getUAEDrugByCode(drugCode);
  } catch {
    notFound();
  }

  if (!drug) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <header className="space-y-2">
        <Link
          href="/uae"
          className="text-sm text-brand-700 hover:underline inline-flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" aria-hidden />
          {tCommon("backToSearch")}
        </Link>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
          {drug['Package Name']}
        </h1>
        <p className="text-slate-600">
          {t("genericName", { name: drug['Generic Name'] })}
        </p>
        <p className="text-sm text-slate-600">
          {drug['Strength']} · {drug['Dosage Form']}
        </p>
      </header>

      {/* Basic Information */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-brand-100 dark:bg-brand-900/30">
              <Pill className="h-6 w-6 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Dosage Form</p>
              <p className="font-medium text-slate-900">{drug['Dosage Form']}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-brand-100 dark:bg-brand-900/30">
              <Package className="h-6 w-6 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Package Size</p>
              <p className="font-medium text-slate-900">{drug['Package Size']}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-brand-100 dark:bg-brand-900/30">
              <Building className="h-6 w-6 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Manufacturer</p>
              <p className="font-medium text-slate-900">{drug['Manufacturer Name']}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-brand-100 dark:bg-brand-900/30">
              <DollarSign className="h-6 w-6 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Price to Public</p>
              <p className="font-medium text-slate-900">{drug['Package Price to Public']}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Information */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-base md:text-lg font-semibold text-slate-900 mb-4">
          {t("pricing")}
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-sm text-slate-600">{t("packagePricePublic")}</span>
            <span className="font-medium text-slate-900">{drug['Package Price to Public']}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-sm text-slate-600">{t("packagePricePharmacy")}</span>
            <span className="font-medium text-slate-900">{drug['Package Price to Pharmacy']}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-sm text-slate-600">{t("unitPricePublic")}</span>
            <span className="font-medium text-slate-900">{drug['Unit Price to Public']}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-slate-600">{t("unitPricePharmacy")}</span>
            <span className="font-medium text-slate-900">{drug['Unit Price to Pharmacy']}</span>
          </div>
        </div>
      </section>

      {/* Insurance Coverage */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-base md:text-lg font-semibold text-slate-900 mb-4">
          {t("insuranceCoverage")}
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-brand-600" />
            <div>
              <p className="text-sm text-slate-600">{t("thiqaCoverage")}</p>
              <p className="font-medium text-slate-900">
                {drug['Included in Thiqa/ ABM - other than 1&7- Drug Formulary']}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-brand-600" />
            <div>
              <p className="text-sm text-slate-600">{t("basicCoverage")}</p>
              <p className="font-medium text-slate-900">
                {drug['Included In Basic Drug Formulary']}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-brand-600" />
            <div>
              <p className="text-sm text-slate-600">{t("abm1Coverage")}</p>
              <p className="font-medium text-slate-900">
                {drug['Included In ABM 1 Drug Formulary']}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-brand-600" />
            <div>
              <p className="text-sm text-slate-600">{t("abm7Coverage")}</p>
              <p className="font-medium text-slate-900">
                {drug['Included In ABM 7 Drug Formulary']}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Mappings */}
      {(drug.snomedDrugId || drug.snomedIndicationId || drug.icd10Code) && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-base md:text-lg font-semibold text-slate-900 mb-4">
            {t("clinicalMappings")}
          </h2>
          <div className="space-y-3">
            {drug.snomedDrugId && (
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">{t("snomedDrugId")}</span>
                <span className="font-medium text-slate-900 font-mono">{drug.snomedDrugId}</span>
              </div>
            )}
            {drug.snomedIndicationId && (
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">{t("snomedIndicationId")}</span>
                <span className="font-medium text-slate-900 font-mono">{drug.snomedIndicationId}</span>
              </div>
            )}
            {drug.icd10Code && (
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-slate-600">{t("icd10Code")}</span>
                <span className="font-medium text-slate-900 font-mono">{drug.icd10Code}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Additional Information */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-base md:text-lg font-semibold text-slate-900 mb-4">
          {t("additionalInfo")}
        </h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-1">
            <span className="text-slate-600">{t("drugCode")}</span>
            <span className="font-mono text-slate-900">{drug['Drug Code']}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-600">{t("genericCode")}</span>
            <span className="font-mono text-slate-900">{drug['Generic Code']}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-600">{t("dispenseMode")}</span>
            <span className="text-slate-900">{drug['Dispense Mode']}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-600">{t("status")}</span>
            <span className={`font-medium ${drug.Status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
              {drug.Status}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-600">{t("lastChangeDate")}</span>
            <span className="text-slate-900">{drug['Last Change Date']}</span>
          </div>
        </div>
      </section>
    </div>
  );
}