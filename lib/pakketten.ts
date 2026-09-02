export const PAKKETTEN = {
  "officieel-trouwen": "JA! met Anouk · Officieel trouwen",
  "ceremonie-op-maat": "JA! met Anouk · Ceremonie op maat",
  "ja-diner": "JA! & Diner met Anouk",
} as const;

export type PakketSlug = keyof typeof PAKKETTEN;

export function pakketLabel(slug: string): string | null {
  return slug in PAKKETTEN ? PAKKETTEN[slug as PakketSlug] : null;
}
