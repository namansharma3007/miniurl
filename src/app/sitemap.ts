import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const pageLastModified = new Date("2026-05-05T00:00:00+00:00");
  
  return [
    {
      url: base,
      lastModified: pageLastModified,
      priority: 1,
    },
    {
      url: `${base}/about`,
      lastModified: pageLastModified,
      priority: 0.8,
    },
    {
      url: `${base}/privacy`,
      lastModified: pageLastModified,
      priority: 0.8,
    },
    {
      url: `${base}/terms`,
      lastModified: pageLastModified,
      priority: 0.8,
    },
  ];
}
