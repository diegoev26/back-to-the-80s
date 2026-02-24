import { MetadataRoute } from "next";
import config from "@/config/config";
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `http://localhost/sitemap.xml`,
  };
}
