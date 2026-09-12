import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const sitemapLastModified = new Date("2026-09-12T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: sitemapLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/politica-de-privacidade"),
      lastModified: sitemapLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
