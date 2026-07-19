import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sections = [
    "",
    "#craft",
    "#ingredients",
    "#menu",
    "#atmosphere",
    "#reviews",
    "#contact",
  ];

  return sections.map((section) => ({
    url: `${SITE.url}/${section}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: section === "" ? 1 : 0.7,
  }));
}
