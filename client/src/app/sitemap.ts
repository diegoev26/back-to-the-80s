import type { MetadataRoute } from "next";
import config from "@/config/env.config";

export const dynamic = "force-static";
export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = config?.options?.url || "http://localhost";

  const staticRoutes = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...staticRoutes];
}
