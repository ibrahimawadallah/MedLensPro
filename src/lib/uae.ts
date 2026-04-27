/**
 * UAE Drug Database Integration
 * Local database of UAE drugs with SNOMED and ICD-10 mappings
 */

import { cache } from "./cache";
import fs from 'fs';
import path from 'path';

const UAE_DRUG_JSON_PATH = path.join(process.cwd(), 'data', 'uae_drug_snomed_icd10.json');

export interface UAEDrug {
  "Drug Code": string;
  "Insurance Plan": string;
  "Package Name": string;
  "Generic Code": string;
  "Generic Name": string;
  "Strength": string;
  "Dosage Form": string;
  "Package Size": string;
  "Dispense Mode": string;
  "Package Price to Public": string;
  "Package Price to Pharmacy": string;
  "Unit Price to Public": string;
  "Unit Price to Pharmacy": string;
  "Status": string;
  "Delete Effective Date": string;
  "Last Change Date": string;
  "Agent Name": string;
  "Manufacturer Name": string;
  "Insurance Coverage For Government Funded Program": string;
  "UPP Scope": string;
  "Included in Thiqa/ ABM - other than 1&7- Drug Formulary": string;
  "Included In Basic Drug Formulary": string;
  "Included In ABM 1 Drug Formulary": string;
  "Included In ABM 7 Drug Formulary": string;
  "Unit Markup": string;
  "Package Markup": string;
  "Thiqa Max. Reimbursement Price (Package)": string;
  "Thiqa co-pay amount (package)": string;
  "Basic co-pay amount (package)": string;
  "UPP Effective Date": string;
  "UPP Updated Date": string;
  "UPP Expiry Date": string;
  "normalizedDrugName": string;
  "normalizedIndication": string;
  "snomedDrugId": string;
  "snomedIndicationId": string | null;
  "icd10Code": string | null;
  "mappingConfidence": number;
}

let cachedDrugs: UAEDrug[] | null = null;

/**
 * Load UAE drug database from JSON file
 */
async function loadUAEDrugs(): Promise<UAEDrug[]> {
  if (cachedDrugs) {
    return cachedDrugs;
  }

  try {
    const jsonData = await fs.promises.readFile(UAE_DRUG_JSON_PATH, 'utf8');
    const drugs: UAEDrug[] = JSON.parse(jsonData);
    
    // Filter only active drugs
    const activeDrugs = drugs.filter(drug => drug.Status === 'Active');
    
    cachedDrugs = activeDrugs;
    return activeDrugs;
  } catch (error) {
    console.error('Error loading UAE drug database:', error);
    return [];
  }
}

/**
 * Search UAE drugs by package name
 */
export async function searchUAEDrugsByName(
  drugName: string,
  opts: { pageSize?: number; page?: number } = {}
): Promise<{ data: UAEDrug[]; total: number; page: number; pageSize: number }> {
  const drugs = await loadUAEDrugs();
  const searchTerm = drugName.toLowerCase();
  
  const cacheKey = `uae:name:${drugName}:${opts.pageSize ?? 25}:${opts.page ?? 1}`;
  const cached = cache.get<{ data: UAEDrug[]; total: number; page: number; pageSize: number }>(cacheKey);
  if (cached) return cached;

  const filtered = drugs.filter(drug => 
    drug['Package Name'].toLowerCase().includes(searchTerm) ||
    drug['Generic Name'].toLowerCase().includes(searchTerm)
  );

  const pageSize = opts.pageSize ?? 25;
  const page = opts.page ?? 1;
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  const result = {
    data: paginated,
    total: filtered.length,
    page,
    pageSize
  };

  cache.set(cacheKey, result, 10 * 60 * 1000); // Cache for 10 minutes
  return result;
}

/**
 * Search UAE drugs by generic name
 */
export async function searchUAEDrugsByGeneric(
  genericName: string,
  opts: { pageSize?: number; page?: number } = {}
): Promise<{ data: UAEDrug[]; total: number; page: number; pageSize: number }> {
  const drugs = await loadUAEDrugs();
  const searchTerm = genericName.toLowerCase();
  
  const cacheKey = `uae:generic:${genericName}:${opts.pageSize ?? 25}:${opts.page ?? 1}`;
  const cached = cache.get<{ data: UAEDrug[]; total: number; page: number; pageSize: number }>(cacheKey);
  if (cached) return cached;

  const filtered = drugs.filter(drug => 
    drug['Generic Name'].toLowerCase().includes(searchTerm)
  );

  const pageSize = opts.pageSize ?? 25;
  const page = opts.page ?? 1;
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  const result = {
    data: paginated,
    total: filtered.length,
    page,
    pageSize
  };

  cache.set(cacheKey, result, 10 * 60 * 1000); // Cache for 10 minutes
  return result;
}

/**
 * Get UAE drug by drug code
 */
export async function getUAEDrugByCode(drugCode: string): Promise<UAEDrug | null> {
  const drugs = await loadUAEDrugs();
  
  const cacheKey = `uae:code:${drugCode}`;
  const cached = cache.get<UAEDrug>(cacheKey);
  if (cached) return cached;

  const drug = drugs.find(d => d['Drug Code'] === drugCode);
  
  if (drug) {
    cache.set(cacheKey, drug, 60 * 60 * 1000); // Cache for 1 hour
  }
  
  return drug || null;
}

/**
 * Get UAE drugs by Thiqa coverage
 */
export async function getUAEDrugsByThiqaCoverage(
  thiqaCoverage: boolean = true,
  opts: { pageSize?: number; page?: number } = {}
): Promise<{ data: UAEDrug[]; total: number; page: number; pageSize: number }> {
  const drugs = await loadUAEDrugs();
  
  const cacheKey = `uae:thiqa:${thiqaCoverage}:${opts.pageSize ?? 25}:${opts.page ?? 1}`;
  const cached = cache.get<{ data: UAEDrug[]; total: number; page: number; pageSize: number }>(cacheKey);
  if (cached) return cached;

  const filtered = drugs.filter(drug => {
    const coverage = drug['Included in Thiqa/ ABM - other than 1&7- Drug Formulary'] === 'Yes';
    return thiqaCoverage ? coverage : !coverage;
  });

  const pageSize = opts.pageSize ?? 25;
  const page = opts.page ?? 1;
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  const result = {
    data: paginated,
    total: filtered.length,
    page,
    pageSize
  };

  cache.set(cacheKey, result, 10 * 60 * 1000); // Cache for 10 minutes
  return result;
}

/**
 * Get UAE drugs by ICD-10 code
 */
export async function getUAEDrugsByICD10(
  icd10Code: string,
  opts: { pageSize?: number; page?: number } = {}
): Promise<{ data: UAEDrug[]; total: number; page: number; pageSize: number }> {
  const drugs = await loadUAEDrugs();
  
  const cacheKey = `uae:icd10:${icd10Code}:${opts.pageSize ?? 25}:${opts.page ?? 1}`;
  const cached = cache.get<{ data: UAEDrug[]; total: number; page: number; pageSize: number }>(cacheKey);
  if (cached) return cached;

  const filtered = drugs.filter(drug => drug.icd10Code === icd10Code);

  const pageSize = opts.pageSize ?? 25;
  const page = opts.page ?? 1;
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  const result = {
    data: paginated,
    total: filtered.length,
    page,
    pageSize
  };

  cache.set(cacheKey, result, 10 * 60 * 1000); // Cache for 10 minutes
  return result;
}

/**
 * Get UAE drugs by manufacturer
 */
export async function getUAEDrugsByManufacturer(
  manufacturer: string,
  opts: { pageSize?: number; page?: number } = {}
): Promise<{ data: UAEDrug[]; total: number; page: number; pageSize: number }> {
  const drugs = await loadUAEDrugs();
  
  const cacheKey = `uae:manufacturer:${manufacturer}:${opts.pageSize ?? 25}:${opts.page ?? 1}`;
  const cached = cache.get<{ data: UAEDrug[]; total: number; page: number; pageSize: number }>(cacheKey);
  if (cached) return cached;

  const filtered = drugs.filter(drug => 
    drug['Manufacturer Name'].toLowerCase().includes(manufacturer.toLowerCase())
  );

  const pageSize = opts.pageSize ?? 25;
  const page = opts.page ?? 1;
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  const result = {
    data: paginated,
    total: filtered.length,
    page,
    pageSize
  };

  cache.set(cacheKey, result, 10 * 60 * 1000); // Cache for 10 minutes
  return result;
}

/**
 * Get total count of UAE drugs
 */
export async function getUAEDrugCount(): Promise<number> {
  const drugs = await loadUAEDrugs();
  return drugs.length;
}

/**
 * Clear UAE drug cache
 */
export function clearUAECache() {
  cachedDrugs = null;
}