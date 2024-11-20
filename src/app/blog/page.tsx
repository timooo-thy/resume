import { client } from "@/sanity/lib/client";
import { BlogList } from "@/components/components-blog-list";
import { POSTS_CARD_QUERYResult } from "@/lib/sanity.types";
import { POSTS_CARD_QUERY } from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";
import { Suspense } from "react";
import AllPostSkeleton from "@/components/all-post-skeleton";

const POSTS_PER_PAGE = 4;

async function BlogPosts({ page }: { page: string }) {
  const currentPage = Number(page);
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
    <BlogList
      posts={postsWithUrls}
      currentPage={currentPage}
      totalPosts={total}
      postsPerPage={POSTS_PER_PAGE}
    />
  );
}

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  return (
    <main className="py-10">
      <h1 className="text-4xl font-semibold mb-10 text-center">Latest</h1>
      <Suspense fallback={<AllPostSkeleton />}>
        <BlogPosts page={page ?? "1"} />
      </Suspense>
    </main>
  );
}
