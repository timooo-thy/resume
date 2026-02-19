import { client } from "@/sanity/lib/client";
import { BlogList } from "@/components/components-blog-list";
import { POSTS_CARD_QUERY_RESULT } from "@/lib/sanity.types";
import { POSTS_CARD_QUERY } from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";
import { Suspense, cache } from "react";
import AllPostSkeleton from "@/components/all-post-skeleton";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_URL || "https://timooothy.dev";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read Timothy Lee's thoughts on software engineering, machine learning, AI, and technology. Insights from an ML Engineer and Software Developer.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Blog | Timothy Lee",
    description:
      "Read Timothy Lee's thoughts on software engineering, machine learning, AI, and technology.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

const POSTS_PER_PAGE = 4;

const getBlogPosts = cache(async (start: number, end: number) => {
    return await client.fetch<POSTS_CARD_QUERY_RESULT>(
    POSTS_CARD_QUERY,
    { start, end },
    { next: { revalidate: 60 } }
  );
});

async function BlogPosts({ page }: { page: string }) {
  const currentPage = Number(page);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const { posts, total } = await getBlogPosts(start, end);

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

async function BlogContent({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  return <BlogPosts page={page ?? "1"} />;
}

export default function Blog({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <main className="py-20 md:py-32 container mx-auto px-4 md:px-8 max-w-7xl">
      <div className="max-w-3xl mx-auto mb-20 text-center">
        <h1 className="text-6xl md:text-8xl font-display mb-6 tracking-tight">
          {" "}
          Journal
        </h1>
        <p className="text-xl text-muted-foreground">
          Thoughts on software engineering, machine learning, and technology.
        </p>
      </div>

      <Suspense fallback={<AllPostSkeleton />}>
        <BlogContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
