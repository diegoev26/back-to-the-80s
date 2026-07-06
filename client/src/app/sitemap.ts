import type { MetadataRoute } from "next";
import config from "@/config/env.config";
const { url: publicUrl } = config.options;

export const dynamic = "force-static";
export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = publicUrl;

  const staticRoutes = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...staticRoutes];
}
