import Link from "next/link";
import { notFound } from "next/navigation";
import {
  dailymedDrugPageUrl,
  dailymedPdfUrl,
  dailymedZipUrl,
  getSplMedia,
  getSplNdcs,
  getSplXml,
} from "@/lib/dailymed";
import { parseSplXml } from "@/lib/spl";
import { splitSplTitle } from "@/lib/format";
import { SectionAccordion } from "@/components/SectionAccordion";
import { MediaGallery } from "@/components/MediaGallery";
import { AddToMyMedsButton } from "@/components/AddToMyMedsButton";
import { ExternalLink, FileText, Archive } from "lucide-react";

export const revalidate = 86400;

interface Props {
  params: { setid: string };
}

export async function generateMetadata({ params }: Props) {
  try {
    const xml = await getSplXml(params.setid);
    const parsed = parseSplXml(xml, params.setid);
    const name = parsed.productName ?? parsed.title ?? "Medication";
    return { title: name };
  } catch {
    return { title: "Medication" };
  }
}

export default async function DrugPage({ params }: Props) {
  const { setid } = params;
  let xml: string;
  try {
    xml = await getSplXml(setid);
  } catch {
    notFound();
  }
  const parsed = parseSplXml(xml, setid);
  const [media, ndcs] = await Promise.all([
    getSplMedia(setid).catch(() => []),
    getSplNdcs(setid).catch(() => []),
  ]);

  const parts = splitSplTitle(parsed.title ?? "");
  const displayName = parsed.productName ?? parts.name;
  const dosageForm = parts.dosageForm;
  const manufacturer = parsed.manufacturer ?? parts.manufacturer;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <header className="space-y-2">
        <Link
          href="/search"
          className="text-sm text-brand-700 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
        >
          ← Back to search
        </Link>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {displayName}
        </h1>
        {parsed.genericName && parsed.genericName !== displayName && (
          <p className="text-slate-600 dark:text-slate-400">
            Generic name:{" "}
            <span className="font-medium text-slate-900 dark:text-slate-200">{parsed.genericName}</span>
          </p>
        )}
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {[dosageForm, manufacturer].filter(Boolean).join(" · ")}
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <AddToMyMedsButton
          med={{
            setid,
            title: parsed.title ?? displayName,
            productName: displayName,
            genericName: parsed.genericName,
            manufacturer,
            ndc: ndcs[0] ?? null,
          }}
        />
        <a
          href={dailymedDrugPageUrl(setid)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          <ExternalLink className="h-4 w-4" aria-hidden /> Full label on DailyMed
        </a>
        <a
          href={dailymedPdfUrl(setid)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          <FileText className="h-4 w-4" aria-hidden /> PDF
        </a>
        <a
          href={dailymedZipUrl(setid)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          <Archive className="h-4 w-4" aria-hidden /> Full label (ZIP)
        </a>
      </div>

      {parsed.activeIngredients.length > 0 && (
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
          <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100">
            Active ingredient{parsed.activeIngredients.length > 1 ? "s" : ""}
          </h2>
          <ul className="mt-2 divide-y divide-slate-100 dark:divide-slate-700">
            {parsed.activeIngredients.map((ing, i) => (
              <li
                key={`${ing.name}-${i}`}
                className="flex items-center justify-between py-2 text-sm"
              >
                <span className="font-medium text-slate-800 dark:text-slate-200">{ing.name}</span>
                {ing.strength && (
                  <span className="text-slate-500 dark:text-slate-400">{ing.strength}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {parsed.patientSections.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 text-slate-600 dark:text-slate-400">
          We couldn&apos;t extract patient-friendly sections from this label.
          You can still read the full label on DailyMed using the link above.
        </div>
      ) : (
        <div className="space-y-3">
          {parsed.patientSections.map((section, idx) => (
            <SectionAccordion
              key={`${section.code ?? "s"}-${idx}`}
              title={section.patientTitle}
              hint={section.hint}
              badge={section.code === "34066-1" ? "Boxed warning" : undefined}
              accent={
                section.code === "34066-1"
                  ? "danger"
                  : section.code === "43685-7" ||
                      section.code === "34070-3" ||
                      section.code === "34084-4"
                    ? "warning"
                    : "default"
              }
              previewHtml={section.preview}
              bodyHtml={section.html}
              defaultOpen={idx < 2 || section.code === "34066-1"}
            />
          ))}
        </div>
      )}

      <MediaGallery media={media} />

      {ndcs.length > 0 && (
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
          <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100">
            Package codes (NDC)
          </h2>
          <ul className="mt-2 flex flex-wrap gap-2 text-sm">
            {ndcs.map((ndc) => (
              <li
                key={ndc}
                className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-2.5 py-1 font-mono text-xs text-slate-700 dark:text-slate-300"
              >
                {ndc}
              </li>
            ))}
          </ul>
        </section>
      )}

      {parsed.providerSections.length > 0 && (
        <details className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
          <summary className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">
            Full prescribing information (for healthcare professionals)
          </summary>
          <div className="mt-4 space-y-5">
            {parsed.providerSections.map((section, idx) => (
              <div
                key={`${section.code ?? "p"}-${idx}`}
                className="border-t border-slate-100 dark:border-slate-700 pt-4"
              >
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                  {section.title ?? section.displayName ?? "Section"}
                </h3>
                <div
                  className="spl-content text-[14px] text-slate-700 dark:text-slate-300"
                  dangerouslySetInnerHTML={{ __html: section.html }}
                />
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
