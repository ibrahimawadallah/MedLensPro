/**
 * Local-only persistence for the patient's saved medications and recent
 * searches. No data ever leaves the browser — this is intentional so the app
 * does not handle PHI on any server.
 */

const KEY_MY_MEDS = "medlens.myMeds.v1";
const KEY_RECENT = "medlens.recentSearches.v1";

export interface SavedMed {
  setid: string;
  title: string;
  genericName: string | null;
  productName: string | null;
  manufacturer: string | null;
  ndc: string | null;
  savedAt: string;
}

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function loadMyMeds(): SavedMed[] {
  const s = getStorage();
  if (!s) return [];
  try {
    const raw = s.getItem(KEY_MY_MEDS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as SavedMed[];
  } catch {
    return [];
  }
}

export function saveMyMeds(list: SavedMed[]): void {
  const s = getStorage();
  if (!s) return;
  s.setItem(KEY_MY_MEDS, JSON.stringify(list));
}

export function addMyMed(med: SavedMed): SavedMed[] {
  const list = loadMyMeds();
  const filtered = list.filter((m) => m.setid !== med.setid);
  const next = [med, ...filtered].slice(0, 200);
  saveMyMeds(next);
  return next;
}

export function removeMyMed(setid: string): SavedMed[] {
  const next = loadMyMeds().filter((m) => m.setid !== setid);
  saveMyMeds(next);
  return next;
}

export function isMyMed(setid: string): boolean {
  return loadMyMeds().some((m) => m.setid === setid);
}

export function pushRecentSearch(query: string): void {
  const s = getStorage();
  if (!s) return;
  const trimmed = query.trim();
  if (!trimmed) return;
  try {
    const raw = s.getItem(KEY_RECENT);
    const arr = raw ? (JSON.parse(raw) as string[]) : [];
    const next = [trimmed, ...arr.filter((q) => q !== trimmed)].slice(0, 8);
    s.setItem(KEY_RECENT, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function getRecentSearches(): string[] {
  const s = getStorage();
  if (!s) return [];
  try {
    const raw = s.getItem(KEY_RECENT);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? (arr as string[]) : [];
  } catch {
    return [];
  }
}
