import type { MetadataRoute } from "next";

const baseUrl = "https://aurapalm.com";

const pages = [
  { path: "", priority: 1.0, changeFreq: "weekly" },
  { path: "/palm-reading", priority: 0.9, changeFreq: "weekly" },
  { path: "/palm-reading/upload", priority: 0.8, changeFreq: "monthly" },
  { path: "/face-reading", priority: 0.9, changeFreq: "weekly" },
  { path: "/face-reading/upload", priority: 0.8, changeFreq: "monthly" },
  { path: "/pricing", priority: 0.7, changeFreq: "monthly" },
  { path: "/how-it-works", priority: 0.6, changeFreq: "monthly" },
  { path: "/learn", priority: 0.7, changeFreq: "weekly" },
  { path: "/about", priority: 0.5, changeFreq: "monthly" },
  { path: "/gift", priority: 0.6, changeFreq: "monthly" },
  { path: "/privacy", priority: 0.3, changeFreq: "yearly" },
  { path: "/terms", priority: 0.3, changeFreq: "yearly" },
  { path: "/disclaimer", priority: 0.3, changeFreq: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq as
      | "weekly"
      | "monthly"
      | "yearly"
      | "daily"
      | "always"
      | "hourly"
      | "never",
    priority,
  }));
}
