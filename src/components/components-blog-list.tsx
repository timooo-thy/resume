"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { POSTS_CARD_QUERYResult } from "../lib/sanity.types";

type BlogListProps = {
  posts: (POSTS_CARD_QUERYResult["posts"][number] & { url?: string })[];
  currentPage: number;
  totalPosts: number;
  postsPerPage: number;
};

export function BlogList({
  posts,
  currentPage,
  totalPosts,
  postsPerPage,
}: BlogListProps) {
  const router = useRouter();
  const [page, setPage] = useState(currentPage);
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/?page=${newPage}`);
  };

  return (
    <section>
      <div className="min-h-[900px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {posts.map((post) => (
            <Card key={post._id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {post.url && (
                  <Image
                    src={post.url}
                    alt={post.title ?? ""}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                  />
                )}
                <p className="text-sm text-muted-foreground">
                  By {post.author?.name} | {post.publishedAt}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.categories?.map((category) => (
                    <span
                      key={category.title}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/post/${post.slug?.current}`}>
                  <Button variant="outline">Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          variant="outline"
        >
          Previous
        </Button>
        <span className="text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </section>
  );
}
