import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { POSTS_CARD_QUERYResult } from "@/lib/sanity.types";
import Pagination from "./pagination";

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
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {posts.map((post) => (
          <Card key={post._id}>
            <CardHeader>
              <CardTitle className="text-lg">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {post.url && (
                <Image
                  src={post.url}
                  alt={post.title ?? ""}
                  width={2400}
                  height={1000}
                  quality={100}
                  className="w-full h-36 object-cover mb-4 rounded-lg"
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
              <Link href={`/blog/post/${post.slug?.current}`}>
                <Button variant="outline">Read More</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
      />
    </div>
  );
}
