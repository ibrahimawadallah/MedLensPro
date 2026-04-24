/**
 * Small formatting helpers used across patient-facing views.
 */

export function titleCaseDrug(s: string): string {
  const lower = s.toLowerCase();
  return lower.replace(/\b[a-z]/g, (m) => m.toUpperCase());
}

/** "[TADALAFIL] TABLET, FILM COATED [ELI LILLY AND COMPANY]" → nice parts. */
export function splitSplTitle(title: string): {
  name: string;
  dosageForm: string | null;
  manufacturer: string | null;
} {
  const m = title.match(/^(.*?)\s*\[([^\]]+)\]\s*$/);
  const manufacturer = m?.[2] ?? null;
  const rest = (m?.[1] ?? title).trim();
  const parts = rest.split(/\s+(?=TABLET|CAPSULE|SYRUP|SOLUTION|INJECTION|CREAM|OINTMENT|LIQUID|SUSPENSION|LOTION|GEL|POWDER|SPRAY|PATCH|DROPS)/i);
  const name = parts[0]?.trim() ?? rest;
  const dosageForm = parts.slice(1).join(" ").trim() || null;
  return { name, dosageForm, manufacturer };
}

export function formatNdc(ndc: string): string {
  return ndc.trim();
}

/** Convert "20260415" or similar into "Apr 15, 2026". */
export function formatSplDate(raw: string | null): string | null {
  if (!raw) return null;
  const cleaned = raw.replace(/[^0-9]/g, "");
  if (cleaned.length < 8) return raw;
  const y = cleaned.slice(0, 4);
  const m = cleaned.slice(4, 6);
  const d = cleaned.slice(6, 8);
  const date = new Date(`${y}-${m}-${d}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return raw;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
