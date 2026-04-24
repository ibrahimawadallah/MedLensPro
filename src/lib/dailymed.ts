/**
 * Thin client for the NLM DailyMed RESTful web service (API v2).
 * Docs: https://dailymed.nlm.nih.gov/dailymed/app-support-web-services.cfm
 */

export const DAILYMED_BASE = "https://dailymed.nlm.nih.gov/dailymed";
export const DAILYMED_API = `${DAILYMED_BASE}/services/v2`;

export type NameType = "generic" | "brand" | "both";

export interface DrugNameHit {
  name_type: "G" | "B";
  drug_name: string;
}

export interface SplHit {
  setid: string;
  title: string;
  spl_version: number;
  published_date: string;
}

export interface MediaItem {
  name: string;
  url: string;
  mime_type: string;
}

export interface Paged<T> {
  data: T[];
  metadata: {
    total_elements: number;
    total_pages: number;
    current_page: number;
    elements_per_page: number;
    next_page: number | "null";
    previous_page: number | "null";
    next_page_url: string | "null";
    previous_page_url: string | "null";
    current_url: string;
    db_published_date: string;
  };
}

interface FetchOpts {
  revalidate?: number;
  signal?: AbortSignal;
}

async function getJson<T>(url: string, opts: FetchOpts = {}): Promise<T> {
  const res = await fetch(url, {
    signal: opts.signal,
    headers: { Accept: "application/json" },
    next: { revalidate: opts.revalidate ?? 60 * 60 },
  });
  if (!res.ok) {
    throw new Error(`DailyMed request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

async function getText(url: string, opts: FetchOpts = {}): Promise<string> {
  const res = await fetch(url, {
    signal: opts.signal,
    next: { revalidate: opts.revalidate ?? 60 * 60 * 24 },
  });
  if (!res.ok) {
    throw new Error(`DailyMed request failed: ${res.status} ${res.statusText}`);
  }
  return await res.text();
}

function qs(params: Record<string, string | number | undefined>): string {
  const parts: string[] = [];
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    parts.push(`${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
  }
  return parts.length ? `?${parts.join("&")}` : "";
}

export async function searchDrugNames(
  drugName: string,
  opts: { nameType?: NameType; pageSize?: number; page?: number } = {},
): Promise<Paged<DrugNameHit>> {
  const url = `${DAILYMED_API}/drugnames.json${qs({
    drug_name: drugName,
    name_type: opts.nameType ?? "both",
    pagesize: opts.pageSize ?? 25,
    page: opts.page ?? 1,
  })}`;
  return getJson<Paged<DrugNameHit>>(url, { revalidate: 60 * 10 });
}

export async function searchSpls(
  drugName: string,
  opts: {
    nameType?: NameType;
    pageSize?: number;
    page?: number;
    manufacturer?: string;
  } = {},
): Promise<Paged<SplHit>> {
  const url = `${DAILYMED_API}/spls.json${qs({
    drug_name: drugName,
    name_type: opts.nameType ?? "both",
    pagesize: opts.pageSize ?? 25,
    page: opts.page ?? 1,
    manufacturer: opts.manufacturer,
  })}`;
  return getJson<Paged<SplHit>>(url, { revalidate: 60 * 10 });
}

export async function findSplsByNdc(
  ndc: string,
  opts: { pageSize?: number; page?: number } = {},
): Promise<Paged<SplHit>> {
  const url = `${DAILYMED_API}/spls.json${qs({
    ndc,
    pagesize: opts.pageSize ?? 10,
    page: opts.page ?? 1,
  })}`;
  return getJson<Paged<SplHit>>(url, { revalidate: 60 * 10 });
}

export async function getSplNdcs(setid: string): Promise<string[]> {
  const url = `${DAILYMED_API}/spls/${encodeURIComponent(setid)}/ndcs.json`;
  interface NdcResp {
    data: { ndcs?: Array<{ ndc: string } | string> };
  }
  const body = await getJson<NdcResp>(url, { revalidate: 60 * 60 * 24 });
  const rows = body?.data?.ndcs ?? [];
  return rows
    .map((row) =>
      typeof row === "string" ? row : row && typeof row === "object" && "ndc" in row ? row.ndc : null,
    )
    .filter((x): x is string => Boolean(x));
}

export async function getSplMedia(setid: string): Promise<MediaItem[]> {
  const url = `${DAILYMED_API}/spls/${encodeURIComponent(setid)}/media.json`;
  interface MediaResp {
    data: { media?: MediaItem[] };
  }
  const body = await getJson<MediaResp>(url, { revalidate: 60 * 60 * 24 });
  return body?.data?.media ?? [];
}

export async function getSplXml(setid: string): Promise<string> {
  const url = `${DAILYMED_API}/spls/${encodeURIComponent(setid)}.xml`;
  return getText(url, { revalidate: 60 * 60 * 24 });
}

export function dailymedDrugPageUrl(setid: string): string {
  return `${DAILYMED_BASE}/drugInfo.cfm?setid=${encodeURIComponent(setid)}`;
}

export function dailymedPdfUrl(setid: string): string {
  return `${DAILYMED_BASE}/downloadpdffile.cfm?setId=${encodeURIComponent(setid)}`;
}

export function dailymedZipUrl(setid: string): string {
  return `${DAILYMED_BASE}/downloadzipfile.cfm?setId=${encodeURIComponent(setid)}`;
}
