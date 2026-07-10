import { MATERIAL_LABELS } from "@/lib/materialLabels";
import type { DropOffPoint } from "@/types/dropoffPoint";

const DIACRITICS_REGEX = new RegExp("[\\u0300-\\u036f]", "g");

export function normalizeForSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "")
    .toLowerCase()
    .trim();
}

export function matchesCentreSearch(centre: DropOffPoint, query: string): boolean {
  const normalizedQuery = normalizeForSearch(query);
  if (!normalizedQuery) return true;

  const materialLabels = (centre.materials ?? []).map(
    (materialType) => MATERIAL_LABELS[materialType]?.label ?? materialType
  );

  const haystack = [centre.name, centre.address, centre.locality, ...materialLabels];

  return haystack.some((field) => normalizeForSearch(field).includes(normalizedQuery));
}
