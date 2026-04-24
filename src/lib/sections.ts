/**
 * Mapping of SPL section LOINC codes to patient-friendly headings and priority.
 * Codes taken from the HL7 SPL Implementation Guide / FDA SPL R4.
 */

export interface PatientSection {
  /** LOINC code (e.g. "34067-9"). */
  code: string;
  /** Short, patient-friendly title. */
  title: string;
  /** Lower number = higher in the list. */
  priority: number;
  /** Optional short helper shown under the title. */
  hint?: string;
}

export const PATIENT_SECTIONS: PatientSection[] = [
  // Highest priority: what the drug is for
  { code: "34067-9", title: "What this medicine is for", priority: 1, hint: "The uses this medicine is approved for." },
  { code: "50567-7", title: "What this medicine is for", priority: 1, hint: "Over-the-counter use." }, // OTC "USES"

  // How to take it
  { code: "34068-7", title: "How to take it", priority: 2, hint: "Dosage and administration instructions." },
  { code: "50580-0", title: "How to take it", priority: 2 }, // OTC directions
  { code: "43678-2", title: "Available doses and forms", priority: 3 },

  // Before using
  { code: "34070-3", title: "Do not use if…", priority: 4, hint: "Contraindications." },
  { code: "50565-1", title: "Do not use if…", priority: 4 }, // OTC do not use
  { code: "50566-9", title: "Ask a doctor before use if…", priority: 5 },
  { code: "50568-5", title: "Ask a doctor or pharmacist before use if…", priority: 6 },
  { code: "34073-7", title: "Drug interactions", priority: 7 },
  { code: "43685-7", title: "Important warnings and precautions", priority: 8 },
  { code: "34066-1", title: "Serious warning (boxed)", priority: 0, hint: "The FDA's most prominent safety warning." },

  // Side effects
  { code: "34084-4", title: "Possible side effects", priority: 9 },
  { code: "50570-1", title: "Stop use and talk to a doctor if…", priority: 10 }, // OTC stop use

  // Special situations
  { code: "42228-7", title: "Use during pregnancy", priority: 11 },
  { code: "34080-2", title: "Use while breastfeeding", priority: 12 },
  { code: "34081-0", title: "Use in children", priority: 13 },
  { code: "34082-8", title: "Use in older adults", priority: 14 },
  { code: "43684-0", title: "Use in specific groups", priority: 15 },

  // Emergency
  { code: "34088-5", title: "If you take too much (overdose)", priority: 16 },

  // Storage / misc
  { code: "44425-7", title: "Storage and handling", priority: 17 },
  { code: "34076-0", title: "Patient information", priority: 18 },
  { code: "42231-1", title: "Medication Guide", priority: 19 },
  { code: "68498-5", title: "Medication Guide", priority: 19 },
  { code: "69719-3", title: "Patient package insert", priority: 20 },
  { code: "34089-3", title: "What's in this medicine", priority: 21 },
  { code: "51945-4", title: "Package label", priority: 22 },
  { code: "34069-5", title: "How it's supplied", priority: 23 },
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

export function mapSection(code: string | undefined | null):
  | (PatientSection & { provider?: boolean })
  | null {
  if (!code) return null;
  const hit = BY_CODE.get(code);
  if (hit) return hit;
  if (PROVIDER_ONLY_CODES.has(code)) {
    return {
      code,
      title: "Additional prescribing information",
      priority: 100,
      provider: true,
    };
  }
  return null;
}
