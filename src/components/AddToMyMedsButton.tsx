"use client";

import { useEffect, useState } from "react";
import { BookmarkCheck, BookmarkPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { addMyMed, isMyMed, removeMyMed, type SavedMed } from "@/lib/storage";
import { trackEvent, analyticsEvents } from "@/lib/analytics";

interface Props {
  med: Omit<SavedMed, "savedAt">;
}

export function AddToMyMedsButton({ med }: Props) {
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("drug");

  useEffect(() => {
    setMounted(true);
    setSaved(isMyMed(med.setid));
  }, [med.setid]);

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500"
      >
        <BookmarkPlus className="h-4 w-4" aria-hidden />
        {t("save")}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (saved) {
          removeMyMed(med.setid);
          setSaved(false);
          trackEvent(analyticsEvents.drug.removed(med.setid, med.title));
        } else {
          addMyMed({ ...med, savedAt: new Date().toISOString() });
          setSaved(true);
          trackEvent(analyticsEvents.drug.saved(med.setid, med.title));
        }
      }}
      aria-pressed={saved}
      aria-label={saved ? t("saved") : t("save")}
      className={
        "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 " +
        (saved
          ? "bg-brand-50 text-brand-700 border border-brand-200"
          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50")
      }
    >
      {saved ? (
        <>
          <BookmarkCheck className="h-4 w-4" aria-hidden />
          {t("saved")}
        </>
      ) : (
        <>
          <BookmarkPlus className="h-4 w-4" aria-hidden />
          {t("save")}
        </>
      )}
    </button>
  );
}
