/**
 * Mapping of SPL section LOINC codes to patient-friendly priority.
 * Human-readable titles/hints live in the i18n message files under
 * `sections.<code>.{title,hint}` — this file is language-agnostic.
 * Codes taken from the HL7 SPL Implementation Guide / FDA SPL R4.
 */

export interface PatientSection {
  /** LOINC code (e.g. "34067-9"). */
  code: string;
  /** Lower number = higher in the list. */
  priority: number;
}

export const PATIENT_SECTIONS: PatientSection[] = [
  // Highest priority: serious / boxed warnings always first
  { code: "34066-1", priority: 0 },
  // What the drug is for
  { code: "34067-9", priority: 1 },
  { code: "50567-7", priority: 1 },
  // How to take it
  { code: "34068-7", priority: 2 },
  { code: "50580-0", priority: 2 },
  { code: "43678-2", priority: 3 },
  // Before using
  { code: "34070-3", priority: 4 },
  { code: "50565-1", priority: 4 },
  { code: "50566-9", priority: 5 },
  { code: "50568-5", priority: 6 },
  { code: "34073-7", priority: 7 },
  { code: "43685-7", priority: 8 },
  // Side effects
  { code: "34084-4", priority: 9 },
  { code: "50570-1", priority: 10 },
  // Special situations
  { code: "42228-7", priority: 11 },
  { code: "34080-2", priority: 12 },
  { code: "34081-0", priority: 13 },
  { code: "34082-8", priority: 14 },
  { code: "43684-0", priority: 15 },
  // Emergency
  { code: "34088-5", priority: 16 },
  // Storage / misc
  { code: "44425-7", priority: 17 },
  { code: "34076-0", priority: 18 },
  { code: "42231-1", priority: 19 },
  { code: "68498-5", priority: 19 },
  { code: "69719-3", priority: 20 },
  { code: "34089-3", priority: 21 },
  { code: "51945-4", priority: 22 },
  { code: "34069-5", priority: 23 },
];

/**
 * Sections we deliberately hide from the main patient view because they are
 * highly technical or for healthcare providers. They are still accessible via
 * the "Full prescribing information" link to DailyMed.
 */
export const PROVIDER_ONLY_CODES = new Set([
  "34090-1", // Clinical pharmacology
  "34092-7", // Clinical studies
  "43679-0", // Mechanism of action
  "43680-8", // Nonclinical toxicology
  "43681-6", // Pharmacodynamics
  "43682-4", // Pharmacokinetics
  "34083-6", // Carcinogenesis, mutagenesis
  "34079-4", // Labor & delivery
  "48780-1", // SPL listing data elements
  "42229-5", // SPL unclassified
]);

const BY_CODE = new Map(PATIENT_SECTIONS.map((s) => [s.code, s]));

export function mapSection(
  code: string | undefined | null,
): { code: string; priority: number; provider?: boolean } | null {
  if (!code) return null;
  const hit = BY_CODE.get(code);
  if (hit) return hit;
  if (PROVIDER_ONLY_CODES.has(code)) {
    return { code, priority: 100, provider: true };
  }
  return null;
}
