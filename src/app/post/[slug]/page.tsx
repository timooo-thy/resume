import { PortableText, PortableTextReactComponents } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  ClockIcon,
  ArrowLeftIcon,
  LinkedinIcon,
  FacebookIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { INDIVIDUAL_POST_QUERYResult } from "../../../lib/sanity.types";
import { TwitterIcon } from "@sanity/icons";
import { INDIVIDUAL_POST_QUERY } from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";
import { estimateReadTime } from "@/lib/utils";
import CodeBlock from "@/components/code-block";

const options = { next: { revalidate: 30 } };

const customComponents: PortableTextReactComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-extrabold mt-16 mb-6">{children}</h1>
    ),

    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-14 mb-6">{children}</h2>
    ),

    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-10 mb-6">{children}</h3>
    ),

    h4: ({ children }) => (
      <h4 className="text-xl font-medium mt-8 mb-4">{children}</h4>
    ),

    normal: ({ children }) => <p className="text-lg mb-2">{children}</p>,
  },
  marks: {
    link: ({ value, children }) => (
      <Link
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline hover:text-blue-700"
      >
        {children}
      </Link>
    ),
  },
  types: {
    image: ({ value }) => (
      <div className="my-4">
        <Image
          src={value?.asset?.url}
          alt={value?.alt || "Image"}
          width={800}
          height={600}
          className="rounded-lg"
        />
      </div>
    ),
    code: ({ value }) => {
      return <CodeBlock value={value} />;
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 mb-4">{children}</ul>
    ),

    number: ({ children }) => (
      <ol className="list-decimal ml-6 mb-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
  hardBreak: () => <br />,
  unknownMark: ({ children }) => <span>{children}</span>,
  unknownType: ({ value }) => <div>Unknown type: {JSON.stringify(value)}</div>,
  unknownBlockStyle: ({ children }) => <div>{children}</div>,
  unknownList: ({ children }) => <ul>{children}</ul>,
  unknownListItem: ({ children }) => <li>{children}</li>,
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const parameters = await params;

  const post = await client.fetch<INDIVIDUAL_POST_QUERYResult>(
    INDIVIDUAL_POST_QUERY,
    parameters,
    options
  );

  const postImageUrl = post?.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(630).url()
    : null;

  const readTime = estimateReadTime(JSON.stringify(post?.body));

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to posts
      </Link>
      {post && (
        <article className="bg-card rounded-lg shadow-lg overflow-hidden">
          {postImageUrl && (
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
              <Image
                src={postImageUrl}
                alt={post?.title || "Post image"}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-6 sm:p-8 md:p-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {post?.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {new Date(post?.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <ClockIcon className="mr-2 h-4 w-4" />
                {readTime} min read
              </div>
            </div>
            <div className="flex items-center justify-between w-full mb-8">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src={
                      post?.author.image
                        ? urlFor(post.author.image)?.width(40).height(40).url()
                        : undefined
                    }
                  />
                  <AvatarFallback>
                    {post?.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{post?.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {post?.author.bio?.[0]?.children?.[0]?.text}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <h2 className="font-semibold mb-2">Share this article</h2>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" size="icon">
                    <TwitterIcon />
                    <span className="sr-only">Share on Twitter</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <LinkedinIcon />
                    <span className="sr-only">Share on LinkedIn</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <FacebookIcon />
                    <span className="sr-only">Share on Facebook</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {post?.categories.map((category) => (
                <Badge key={category.title} variant="secondary">
                  {category.title}
                </Badge>
              ))}
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {Array.isArray(post?.body) && (
                <PortableText value={post.body} components={customComponents} />
              )}
            </div>
          </div>
        </article>
      )}
    </main>
  );
}
