/** Fold Turkish and accented text so sheet names and addresses compare stably. */
export function fold(value: string): string {
  return value
    .replaceAll("İ", "i")
    .replaceAll("I", "i")
    .replaceAll("ı", "i")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

/** Key for the reviewed coordinate file. Punctuation and spacing are ignored. */
export function addressKey(value: string): string {
  return fold(value)
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Name keys tried when an address is not in the reviewed file and live
 * geocoding did not return a point. The first line and a copy with
 * parenthetical notes removed are included, so "Taksim 360 (ABB牌)" still
 * matches the earlier "taksim 360" pin.
 */
export function nameKeys(value: string): string[] {
  const full = fold(value).trim();
  const first = fold(value.split("\n")[0] ?? "").trim();
  const stripped = fold(value.replace(/\([^)]*\)/g, " "))
    .replace(/\s+/g, " ")
    .trim();
  return [...new Set([full, first, stripped].filter(Boolean))];
}
