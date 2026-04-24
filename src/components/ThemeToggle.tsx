"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("common");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1.5 text-slate-500 dark:text-slate-400"
        aria-label={t("toggleTheme")}
      >
        <Sun className="h-3.5 w-3.5" aria-hidden />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
      aria-label={isDark ? t("switchToLight") : t("switchToDark")}
    >
      {isDark ? (
        <Sun className="h-3.5 w-3.5" aria-hidden />
      ) : (
        <Moon className="h-3.5 w-3.5" aria-hidden />
      )}
    </button>
  );
}
