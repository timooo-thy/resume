import Image from "next/image";
import Link from "next/link";
import { POSTS_CARD_QUERYResult } from "@/lib/sanity.types";
import Pagination from "./pagination";
import { Button } from "./ui/button";

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
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-12 md:gap-20 mb-20">
        {posts.map((post) => (
          <article 
            key={post._id} 
            className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
          >
            <div className="relative aspect-[16/10] bg-muted overflow-hidden rounded-md border border-border/40">
              {post.url ? (
                <Image
                  src={post.url}
                  alt={post.title ?? ""}
                  width={2400}
                  height={1000}
                  quality={100}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-muted/50" />
              )}
            </div>

            <div className="flex flex-col h-full justify-center">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories?.map((category) => (
                  <span
                    key={category.title}
                    className="text-xs font-medium uppercase tracking-widest text-muted-foreground border border-border/50 rounded-full px-3 py-1"
                  >
                    {category.title}
                  </span>
                ))}
              </div>

              <Link href={`/blog/post/${post.slug?.current}`} className="group-hover:text-primary transition-colors">
                 <h2 className="text-3xl md:text-4xl font-display leading-tight mb-4">
                  {post.title}
                </h2>
              </Link>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                 <span>{post.publishedAt}</span>
                 <span>•</span>
                 <span>By {post.author?.name}</span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                 {/* Fallback description if we don't have excerpts */}
                 Read the full article to learn more about this topic.
              </p>

              <div className="mt-auto">
                <Button asChild variant="link" className="p-0 h-auto font-medium text-foreground underline-offset-4 hover:text-primary">
                  <Link href={`/blog/post/${post.slug?.current}`}>
                    Read Article
                  </Link>
                </Button>
              </div>
            </div>
          </article>
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
