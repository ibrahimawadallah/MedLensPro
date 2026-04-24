/**
 * Parser that converts a DailyMed SPL XML document into a structured,
 * patient-friendly shape. We use fast-xml-parser and then walk the tree
 * ourselves to render a safe subset of SPL markup back into HTML.
 */

import { XMLParser } from "fast-xml-parser";
import { mapSection, PATIENT_SECTIONS } from "./sections";

export interface ParsedSection {
  code: string | null;
  displayName: string | null;
  title: string | null;
  /** Rendered HTML (sanitized subset). */
  html: string;
  /** Plain text preview (first ~200 chars). */
  preview: string;
}

export interface ParsedSpl {
  setid: string;
  documentVersion: string | null;
  title: string | null;
  effectiveTime: string | null;
  productName: string | null;
  genericName: string | null;
  manufacturer: string | null;
  activeIngredients: Array<{ name: string; strength: string | null }>;
  sections: ParsedSection[];
  /** Sections grouped by priority for patient-friendly display. */
  patientSections: Array<ParsedSection & { patientTitle: string; hint?: string; priority: number }>;
  providerSections: ParsedSection[];
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  preserveOrder: true,
  trimValues: false,
});

type Node = Record<string, unknown> & { ":@"?: Record<string, string> };

function attrs(node: Node): Record<string, string> {
  return (node[":@"] ?? {}) as Record<string, string>;
}

function childKey(node: Node): string | null {
  for (const key of Object.keys(node)) {
    if (key !== ":@") return key;
  }
  return null;
}

/** Walk a preserveOrder subtree and return all descendants matching `name`. */
function findAll(list: Node[] | undefined, name: string): Node[] {
  if (!list) return [];
  const out: Node[] = [];
  for (const entry of list) {
    const key = childKey(entry);
    if (!key) continue;
    if (key === name) {
      out.push(entry);
    }
    const inner = entry[key];
    if (Array.isArray(inner)) out.push(...findAll(inner as Node[], name));
  }
  return out;
}

function directChildren(list: Node[] | undefined, name: string): Node[] {
  if (!list) return [];
  const out: Node[] = [];
  for (const entry of list) {
    const key = childKey(entry);
    if (key === name) out.push(entry);
  }
  return out;
}

function textOf(list: Node[] | undefined): string {
  if (!list) return "";
  let out = "";
  for (const entry of list) {
    const key = childKey(entry);
    if (!key) continue;
    if (key === "#text") {
      out += String(entry[key] ?? "");
    } else {
      const inner = entry[key];
      if (Array.isArray(inner)) out += textOf(inner as Node[]);
    }
  }
  return out;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Render a safe subset of SPL narrative markup back into HTML. */
function renderNarrative(list: Node[] | undefined): string {
  if (!list) return "";
  let out = "";
  for (const entry of list) {
    const key = childKey(entry);
    if (!key) continue;
    if (key === "#text") {
      out += escapeHtml(String(entry[key] ?? ""));
      continue;
    }
    const inner = entry[key] as Node[] | undefined;
    const a = attrs(entry);
    switch (key) {
      case "paragraph":
        out += `<p>${renderNarrative(inner)}</p>`;
        break;
      case "br":
        out += "<br/>";
        break;
      case "list": {
        const style = a["listType"] === "ordered" ? "ol" : "ul";
        out += `<${style}>${renderNarrative(inner)}</${style}>`;
        break;
      }
      case "item":
        out += `<li>${renderNarrative(inner)}</li>`;
        break;
      case "caption":
        out += `<p class="font-medium text-slate-700">${renderNarrative(inner)}</p>`;
        break;
      case "title":
        out += `<h3>${renderNarrative(inner)}</h3>`;
        break;
      case "content": {
        const sv = a["styleCode"] ?? "";
        if (/bold/i.test(sv)) out += `<strong>${renderNarrative(inner)}</strong>`;
        else if (/italics?/i.test(sv)) out += `<em>${renderNarrative(inner)}</em>`;
        else if (/underline/i.test(sv)) out += `<u>${renderNarrative(inner)}</u>`;
        else out += renderNarrative(inner);
        break;
      }
      case "linkHtml": {
        const href = a["href"] ?? "#";
        const safeHref = /^(https?:\/\/|mailto:|#|\/(?!\/))/i.test(href) ? href : "#";
        out += `<a href="${escapeHtml(safeHref)}" target="_blank" rel="noreferrer">${renderNarrative(inner)}</a>`;
        break;
      }
      case "sub":
      case "sup":
        out += `<${key}>${renderNarrative(inner)}</${key}>`;
        break;
      case "table":
        out += `<table>${renderNarrative(inner)}</table>`;
        break;
      case "thead":
      case "tbody":
      case "tfoot":
        out += `<${key}>${renderNarrative(inner)}</${key}>`;
        break;
      case "tr":
        out += `<tr>${renderNarrative(inner)}</tr>`;
        break;
      case "th":
      case "td":
        out += `<${key}>${renderNarrative(inner)}</${key}>`;
        break;
      case "renderMultiMedia": {
        const ref = a["referencedObject"];
        if (ref) {
          out += `<span class="text-xs text-slate-500">[image: ${escapeHtml(ref)}]</span>`;
        }
        break;
      }
      case "footnote":
      case "footnoteRef":
        // skip footnote content in narrative; rarely patient-relevant
        break;
      default:
        // unknown tag — render text content inline to avoid data loss
        if (inner) out += renderNarrative(inner);
    }
  }
  return out;
}

function previewOf(list: Node[] | undefined, max = 220): string {
  const text = textOf(list).replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

function parseSection(section: Node): ParsedSection | null {
  const children = (section["section"] as Node[]) ?? [];
  const codeNode = directChildren(children, "code")[0];
  const code = codeNode ? attrs(codeNode)["code"] ?? null : null;
  const displayName = codeNode ? attrs(codeNode)["displayName"] ?? null : null;
  const titleNode = directChildren(children, "title")[0];
  const title = titleNode ? textOf((titleNode["title"] as Node[]) ?? []).trim() || null : null;
  const textNode = directChildren(children, "text")[0];
  const textList = textNode ? ((textNode["text"] as Node[]) ?? []) : [];
  const html = renderNarrative(textList);
  const preview = previewOf(textList);
  // Drop completely empty sections
  if (!html && !title) return null;
  return { code, displayName, title, html, preview };
}

export function parseSplXml(xml: string, setid: string): ParsedSpl {
  const parsed = parser.parse(xml) as Node[];
  const doc = findAll(parsed, "document")[0];
  const docChildren = (doc?.["document"] as Node[]) ?? [];

  const idNode = directChildren(docChildren, "id")[0];
  const documentVersion = idNode ? attrs(idNode)["extension"] ?? null : null;

  const titleNode = directChildren(docChildren, "title")[0];
  const title = titleNode ? textOf((titleNode["title"] as Node[]) ?? []).trim() : null;

  const effectiveTimeNode = directChildren(docChildren, "effectiveTime")[0];
  const effectiveTime = effectiveTimeNode ? attrs(effectiveTimeNode)["value"] ?? null : null;

  // Structured body → organizer → components → section
  const structuredBody = findAll(parsed, "structuredBody")[0];
  const sbChildren = (structuredBody?.["structuredBody"] as Node[]) ?? [];
  const componentNodes = directChildren(sbChildren, "component");
  const topSections: Node[] = [];
  for (const comp of componentNodes) {
    const compChildren = (comp["component"] as Node[]) ?? [];
    for (const inner of compChildren) {
      const key = childKey(inner);
      if (key === "section") topSections.push(inner);
    }
  }

  // Recursively flatten sections (sections can contain sub-sections via <component><section>)
  const allSections: ParsedSection[] = [];
  const visit = (section: Node) => {
    const result = parseSection(section);
    if (result) allSections.push(result);
    const childNodes = (section["section"] as Node[]) ?? [];
    const subComponents = directChildren(childNodes, "component");
    for (const sub of subComponents) {
      const subChildren = (sub["component"] as Node[]) ?? [];
      for (const n of subChildren) {
        if (childKey(n) === "section") visit(n);
      }
    }
  };
  topSections.forEach(visit);

  // --- Product metadata (name, generic, manufacturer, ingredients) ---
  const manufacturedProductNodes = findAll(parsed, "manufacturedProduct");
  let productName: string | null = null;
  let genericName: string | null = null;
  let manufacturer: string | null = null;
  const ingredients: Array<{ name: string; strength: string | null }> = [];

  const firstProduct = manufacturedProductNodes[0];
  if (firstProduct) {
    const mpChildren = (firstProduct["manufacturedProduct"] as Node[]) ?? [];
    const innerMp = directChildren(mpChildren, "manufacturedProduct")[0];
    const productRoot = innerMp ? (innerMp["manufacturedProduct"] as Node[]) ?? [] : mpChildren;

    const nameNode = directChildren(productRoot, "name")[0];
    if (nameNode) {
      productName = textOf((nameNode["name"] as Node[]) ?? []).trim() || null;
    }
    const asEntity = directChildren(productRoot, "asEntityWithGeneric")[0];
    if (asEntity) {
      const asChildren = (asEntity["asEntityWithGeneric"] as Node[]) ?? [];
      const genericMedicine = directChildren(asChildren, "genericMedicine")[0];
      if (genericMedicine) {
        const gm = (genericMedicine["genericMedicine"] as Node[]) ?? [];
        const gn = directChildren(gm, "name")[0];
        if (gn) genericName = textOf((gn["name"] as Node[]) ?? []).trim() || null;
      }
    }
    const ingredientNodes = directChildren(productRoot, "ingredient");
    for (const ing of ingredientNodes) {
      const a = attrs(ing);
      if (a["classCode"] !== "ACTIB" && a["classCode"] !== "ACTIM" && a["classCode"] !== "ACTI") continue;
      const ingChildren = (ing["ingredient"] as Node[]) ?? [];
      const substance = directChildren(ingChildren, "ingredientSubstance")[0];
      const qty = directChildren(ingChildren, "quantity")[0];
      if (!substance) continue;
      const sChildren = (substance["ingredientSubstance"] as Node[]) ?? [];
      const sn = directChildren(sChildren, "name")[0];
      const name = sn ? textOf((sn["name"] as Node[]) ?? []).trim() : "";
      let strength: string | null = null;
      if (qty) {
        const qc = (qty["quantity"] as Node[]) ?? [];
        const num = directChildren(qc, "numerator")[0];
        const den = directChildren(qc, "denominator")[0];
        const numA = num ? attrs(num) : {};
        const denA = den ? attrs(den) : {};
        if (numA["value"]) {
          strength = `${numA["value"]} ${numA["unit"] ?? ""}`.trim();
          if (denA["value"] && denA["value"] !== "1") {
            strength += " / " + `${denA["value"]} ${denA["unit"] ?? ""}`.trim();
          }
        }
      }
      if (name) ingredients.push({ name, strength });
    }
  }

  // Manufacturer (author/assignedEntity/representedOrganization/name)
  const authorNodes = directChildren(docChildren, "author");
  if (authorNodes.length) {
    const ao = findAll([authorNodes[0]], "representedOrganization");
    if (ao[0]) {
      const roChildren = (ao[0]["representedOrganization"] as Node[]) ?? [];
      const nm = directChildren(roChildren, "name")[0];
      if (nm) manufacturer = textOf((nm["name"] as Node[]) ?? []).trim() || null;
    }
  }

  // Group for patient-friendly display
  const patientSections: ParsedSpl["patientSections"] = [];
  const providerSections: ParsedSection[] = [];
  for (const s of allSections) {
    const mapped = mapSection(s.code);
    if (!mapped) continue;
    if (mapped.provider) {
      providerSections.push(s);
    } else {
      patientSections.push({
        ...s,
        patientTitle: mapped.title,
        hint: mapped.hint,
        priority: mapped.priority,
      });
    }
  }
  patientSections.sort((a, b) => a.priority - b.priority);

  // Dedupe by patientTitle + content to keep the list clean
  const seen = new Set<string>();
  const dedupedPatientSections = patientSections.filter((s) => {
    const key = `${s.patientTitle}::${s.preview}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return {
    setid,
    documentVersion,
    title,
    effectiveTime,
    productName,
    genericName,
    manufacturer,
    activeIngredients: ingredients,
    sections: allSections,
    patientSections: dedupedPatientSections,
    providerSections,
  };
}

export function patientSectionOrder(): string[] {
  return PATIENT_SECTIONS.map((s) => s.title);
}
