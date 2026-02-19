import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_URL || "https://timooothy.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio/", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
