import { client } from "@/sanity/lib/client";
import { BlogList } from "@/components/components-blog-list";
import { POSTS_CARD_QUERYResult } from "../../sanity.types";
import { POSTS_CARD_QUERY } from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";

const POSTS_PER_PAGE = 4;
export const revalidate = 60;

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams["page"] ?? "1");
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const { posts, total } = await client.fetch<POSTS_CARD_QUERYResult>(
    POSTS_CARD_QUERY,
    { start, end }
  );

  const postsWithUrls = posts.map((post) => ({
    ...post,
    url: post.mainImage
      ? urlFor(post.mainImage)?.width(550)?.height(310)?.url()
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
        currentPage={page}
        totalPosts={total}
        postsPerPage={POSTS_PER_PAGE}
      />
    </main>
  );
}
