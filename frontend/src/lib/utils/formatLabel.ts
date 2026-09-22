export function formatLabel(value: string | number | null | undefined) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}