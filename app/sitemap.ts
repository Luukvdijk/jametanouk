import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.jametanouk.nl";
  return [
    { url: base, priority: 1 },
    { url: `${base}/over-mij`, priority: 0.8 },
    { url: `${base}/contact`, priority: 0.8 },
    { url: `${base}/privacy`, priority: 0.3 },
    { url: `${base}/voorwaarden`, priority: 0.3 },
  ];
}
