import { PortableText, PortableTextReactComponents } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, ArrowLeftIcon } from "lucide-react";
import {
  INDIVIDUAL_POST_QUERYResult,
  POSTS_LIST_SLUG_QUERYResult,
} from "../../../../lib/sanity.types";
import {
  INDIVIDUAL_POST_QUERY,
  POSTS_LIST_SLUG_QUERY,
} from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";
import { estimateReadTime } from "@/lib/utils";
import CodeBlock from "@/components/code-block";
import { notFound } from "next/navigation";
import ShareButton from "@/components/share-button";
import { cache, Suspense } from "react";
import ViewCount from "@/components/view-count";
import { Skeleton } from "@/components/ui/skeleton";
import ScrollToTop from "@/components/scroll-to-top";

export const experimental_ppr = true;

const customComponents: PortableTextReactComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-12 mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold my-4">
        {children}
        <hr className="border-t border-gray-300 mt-1" />
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>
    ),
    normal: ({ children }) => <p className="text-base mb-1">{children}</p>,
  },

  marks: {
    link: ({ value, children }) => (
      <Link
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline hover:text-primary/80 transition-colors"
      >
        {children}
      </Link>
    ),
  },

  types: {
    image: ({ value }) => (
      <div className="my-8">
        <Image
          src={value?.asset?.url}
          alt={value?.alt || "Image"}
          width={800}
          height={600}
          className="rounded-lg mx-auto"
        />
      </div>
    ),
    code: ({ value }) => (
      <div className="my-2">
        <CodeBlock value={value} />
      </div>
    ),
    table: ({ value }) => {
      if (!value?.rows) return null;

      const headerRow = value.rows[0];
      const bodyRows = value.rows.slice(1);

      return (
        <div className="my-4 overflow-x-auto">
          <table className="w-full border border-muted/30 rounded-2xl overflow-hidden text-sm bg-muted/40 divide-y divide-muted/40">
            <thead className="bg-muted/100">
              <tr>
                {headerRow?.cells.map((cell: string, i: number) => (
                  <th key={i} className="text-left px-4 py-3 font-bold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map(
                (
                  row: {
                    cells: string[];
                  },
                  rowIndex: number
                ) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-muted/60 transition-colors"
                  >
                    {row.cells.map((cell: string, cellIndex: number) => (
                      <td
                        key={cellIndex}
                        className="px-4 py-3 border-r last:border-r-0 border-muted/40"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      );
    },
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 text-base space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 text-base space-y-2">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },

  hardBreak: () => <br />,
  unknownMark: ({ children }) => <span>{children}</span>,
  unknownType: ({ value }) => (
    <div className="p-4 border border-yellow-300 bg-yellow-50 rounded my-4">
      Unknown content type: {JSON.stringify(value)}
    </div>
  ),
  unknownBlockStyle: ({ children }) => <div className="my-4">{children}</div>,
  unknownList: ({ children }) => <ul className="pl-6 my-4">{children}</ul>,
  unknownListItem: ({ children }) => <li className="mb-2">{children}</li>,
};

const getPost = cache(async (params: { slug: string }) => {
  return await client.fetch<INDIVIDUAL_POST_QUERYResult>(
    INDIVIDUAL_POST_QUERY,
    params
  );
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const parameters = await params;
  const post = await getPost(parameters);

  const postImageUrl = post?.mainImage
    ? urlFor(post.mainImage)?.width(600).height(300).quality(100).url()
    : null;

  return {
    title: post?.title || "Timothy's Blog",
    description:
      "A blog about web development, software engineering, and other tech-related topics.",
    openGraph: {
      title: post?.title,
      description:
        "A blog about web development, software engineering, and other tech-related topics.",
      url: `${process.env.NEXT_PUBLIC_URL}/blog/post/${parameters.slug}`,
      images: [postImageUrl],
    },
  };
}

export async function generateStaticParams() {
  const posts = await client.fetch<POSTS_LIST_SLUG_QUERYResult>(
    POSTS_LIST_SLUG_QUERY
  );

  return posts.map((post) => ({
    slug: String(post.slug.current),
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await getPost(await params);

  const postImageUrl = post?.mainImage
    ? urlFor(post.mainImage)?.width(2400).height(1000).quality(100).url()
    : null;

  const readTime = estimateReadTime(JSON.stringify(post?.body));

  if (!post) {
    return notFound();
  }

  return (
    <main className="container mx-auto pb-8 px-2 lg:w-3/4 xl:w-3/5 bg-background">
      <Link
        href="/blog"
        className="inline-flex items-center text-muted-foreground hover:text-black my-4 font-semibold"
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back
      </Link>
      {post && (
        <article className="bg-card rounded-lg shadow-lg overflow-hidden">
          {postImageUrl && (
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
              <Image
                src={postImageUrl}
                alt={post.title || "Post image"}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-6 sm:p-8 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center text-sm md:text-base">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm md:text-base">
                <ClockIcon className="mr-2 h-4 w-4" />
                {readTime} min read
              </div>
              <Suspense
                fallback={<Skeleton className="w-20 h-6 bg-gray-200" />}
              >
                <ViewCount slug={post.slug.current} readTime={readTime} />
              </Suspense>
            </div>
            <div className="flex items-center justify-between w-full mb-8">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src={
                      post.author.image
                        ? urlFor(post.author.image)
                            .width(800)
                            .height(800)
                            .quality(100)
                            .url()
                        : undefined
                    }
                  />
                  <AvatarFallback>
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold md:text-lg">{post.author.name}</p>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {post.author.bio?.[0]?.children?.[0]?.text}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="flex justify-center gap-4 ml-3">
                  <ShareButton title={post.title} url={post.slug.current} />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Badge key={category.title} variant="secondary">
                  {category.title}
                </Badge>
              ))}
            </div>
            <div>
              {Array.isArray(post.body) && (
                <PortableText value={post.body} components={customComponents} />
              )}
            </div>
          </div>
        </article>
      )}
      <ScrollToTop />
    </main>
  );
}
