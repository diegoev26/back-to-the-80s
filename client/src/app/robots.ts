import { MetadataRoute } from "next";
import config from "@/config/env.config";
const { publicUrl } = config;
export const dynamic = "force-static";

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
