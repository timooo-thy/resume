import { client } from "@/sanity/lib/client";
import { BlogList } from "@/components/components-blog-list";
import {
  POSTS_CARD_QUERYResult,
  POSTS_LIST_SLUG_QUERYResult,
} from "../lib/sanity.types";
import { POSTS_CARD_QUERY, POSTS_LIST_SLUG_QUERY } from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";

const POSTS_PER_PAGE = 4;

export async function generateStaticParams() {
  const posts = await client.fetch<POSTS_LIST_SLUG_QUERYResult>(
    POSTS_LIST_SLUG_QUERY
  );

  return posts.map((post) => ({
    id: String(post.slug.current),
  }));
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page ?? "1");
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const { posts, total } = await client.fetch<POSTS_CARD_QUERYResult>(
    POSTS_CARD_QUERY,
    { start, end }
  );

  const postsWithUrls = posts.map((post) => ({
    ...post,
    url: post.mainImage
      ? urlFor(post.mainImage)?.width(2400).height(1000).quality(100).url()
      : undefined,
    publishedAt: new Date(
      post.publishedAt ? post.publishedAt : "Unknown date"
    ).toLocaleDateString(),
  }));

  return (
    <main className="container mx-auto px-4 py-8 min-h-dvh">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <BlogList
        posts={postsWithUrls}
        currentPage={currentPage}
        totalPosts={total}
        postsPerPage={POSTS_PER_PAGE}
      />
    </main>
  );
}
