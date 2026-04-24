/**
 * NDC helpers. The FDA National Drug Code is commonly written as:
 *   - 4-4-2, 5-3-2, 5-4-1, or 5-4-2 (labeler-product-package)
 *   - An 11-digit "HIPAA" form: 5-4-2 padded with leading zeros per segment.
 *
 * The DailyMed API accepts the dashed 3-segment form OR the labeler+product
 * (first two segments). We normalize user input into its dashed form.
 */

const DIGIT_ONLY = /[^0-9]/g;

export function digitsOnly(raw: string): string {
  return (raw ?? "").replace(DIGIT_ONLY, "");
}

/**
 * Accept a variety of user-entered formats and try to produce a well-formed
 * dashed NDC (labeler-product or labeler-product-package). Returns null when
 * the input clearly isn't an NDC.
 */
export function normalizeNdc(raw: string): string | null {
  const trimmed = (raw ?? "").trim();
  if (!trimmed) return null;

  // If user already typed dashes and it vaguely looks like an NDC, keep it.
  if (/^\d{4,5}-\d{3,4}(?:-\d{1,2})?$/.test(trimmed)) {
    return trimmed;
  }

  const digits = digitsOnly(trimmed);
  if (digits.length < 8) return null;

  // 8-digit (4-4) labeler+product, no package segment
  if (digits.length === 8) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }
  // 9-digit (5-4) labeler+product, no package segment
  if (digits.length === 9) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  }
  // 10-digit NDC: try 5-4-1, 5-3-2, 4-4-2
  if (digits.length === 10) {
    // Default to 5-4-1 which is the most common
    return `${digits.slice(0, 5)}-${digits.slice(5, 9)}-${digits.slice(9)}`;
  }
  // 11-digit HIPAA NDC: 5-4-2
  if (digits.length === 11) {
    return `${digits.slice(0, 5)}-${digits.slice(5, 9)}-${digits.slice(9)}`;
  }
  // UPC/EAN-13 from drug barcode: first 1-2 digits are system, NDC embedded
  // For patient use we don't try to decode — we pass through digits as hint.
  if (digits.length === 12 || digits.length === 13) {
    // Linear NDC is usually positions 2..11 of UPC-A. Attempt 5-4-1.
    const core = digits.slice(digits.length - 11, digits.length - 1);
    if (core.length === 10) {
      return `${core.slice(0, 5)}-${core.slice(5, 9)}-${core.slice(9)}`;
    }
  }

  return null;
}

export function labelerAndProduct(ndc: string): string {
  // Return just the first two segments for /spls?ndc= lookups that fail with
  // the full package code.
  const parts = ndc.split("-");
  return parts.slice(0, 2).join("-");
}
