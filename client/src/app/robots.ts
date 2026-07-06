import type { MetadataRoute } from "next";
import config from "@/config/env.config";
const { url: publicUrl } = config.options;

export const dynamic = "force-static";
export const runtime = "edge";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${publicUrl}/sitemap.xml`,
  };
}
