import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { POSTS_SITEMAP_QUERY_RESULT } from "@/lib/sanity.types";
import { POSTS_SITEMAP_QUERY } from "@/lib/sanity.queries";

const SITE_URL = process.env.NEXT_PUBLIC_URL || "https://timooothy.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch<POSTS_SITEMAP_QUERY_RESULT>(
    POSTS_SITEMAP_QUERY
  );

  const blogPosts = posts.map((post) => ({
    url: `${SITE_URL}/blog/post/${post.slug.current}`,
    lastModified: new Date(post.publishedAt || Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...blogPosts,
  ];
}
