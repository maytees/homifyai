import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/*", "/api/*", "/ingest/*"],
      },
    ],
    sitemap: "https://www.spacemintai.com/sitemap.xml",
  };
}
