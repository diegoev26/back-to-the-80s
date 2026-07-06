import type { MetadataRoute } from "next";
import config from "@/config/env.config";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${config?.options?.url || "http://localhost"}/sitemap.xml`,
  };
}
