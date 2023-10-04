export function uriTemplate(
  template: string,
  replacements: Record<string, string | number>,
): string {
  let result = template;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(`{{${key}}}`, String(value));
  }
  return result;
}
// src/utils/uri-template.ts
