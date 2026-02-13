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
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FadeIn, ScaleIn } from "@/components/blog-post-animation";

const customComponents: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => <h1 className="text-4xl md:text-5xl font-display font-medium mt-16 mb-8 leading-tight text-foreground">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl md:text-4xl font-display font-medium mt-14 mb-6 leading-tight text-foreground">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl md:text-3xl font-display font-medium mt-10 mb-4 leading-tight text-foreground">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl md:text-2xl font-display font-medium mt-8 mb-4 leading-tight text-foreground">{children}</h4>,
    normal: ({ children }) => <p className="text-lg leading-relaxed mb-8 text-foreground/90 font-sans">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="relative border-l-4 border-primary/30 pl-8 my-12 italic text-xl md:text-2xl text-muted-foreground font-display leading-relaxed bg-muted/10 py-4 pr-4 rounded-lg">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic text-foreground/90">{children}</em>,
    code: ({ children }) => <code className="bg-muted/50 text-foreground px-1.5 py-0.5 rounded-md font-mono text-[0.9em] border border-border/50 align-middle">{children}</code>,
    link: ({ value, children }) => (
      <Link href={value?.href || "#"} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all duration-300 font-medium">{children}</Link>
    ),
  },
  types: {
    image: ({ value }) => (
      <div className="my-12 group">
        <div className="relative rounded-lg overflow-hidden border border-border/50 shadow-sm transition-shadow hover:shadow-md">
          <Image src={value?.asset?.url} alt={value?.alt || "Image"} width={1000} height={600} className="w-full h-auto object-cover" />
        </div>
        {value?.caption && <p className="text-center text-sm text-muted-foreground mt-4 italic font-medium">{value.caption}</p>}
      </div>
    ),
    code: ({ value }) => <div className="my-10 rounded-xl overflow-hidden border border-border/50 shadow-sm"><CodeBlock value={value} /></div>,
  },
};

// --- DATA FETCHING ---
const getPost = cache(async (params: { slug: string }) => {
  return await client.fetch<INDIVIDUAL_POST_QUERYResult>(
    INDIVIDUAL_POST_QUERY,
    params,
    {
      next: { 
        revalidate: 60,
        tags: [`post:${params.slug}`] 
      }
    }
  );
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const parameters = await params;
  const post = await getPost(parameters);
  const postImageUrl = post?.mainImage ? urlFor(post.mainImage)?.width(1200).height(630).quality(100).url() : null;

  return {
    title: post?.title || "Timothy's Blog",
    description: "A blog about web development, software engineering, and other tech-related topics.",
    openGraph: {
      title: post?.title,
      description: "A blog about web development, software engineering, and other tech-related topics.",
      url: `${process.env.NEXT_PUBLIC_URL}/blog/post/${parameters.slug}`,
      images: postImageUrl ? [postImageUrl] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await client.fetch<POSTS_LIST_SLUG_QUERYResult>(POSTS_LIST_SLUG_QUERY);
  return posts.map((post) => ({ slug: String(post.slug.current) }));
}

// DYNAMIC CONTENT
async function PostContent({ slug }: { slug: string }) {
  const post = await getPost({ slug });

  if (!post) return notFound();

  const postImageUrl = post?.mainImage ? urlFor(post.mainImage)?.width(2400).height(1200).quality(100).url() : null;
  const readTime = estimateReadTime(JSON.stringify(post?.body));

  return (
    <article>
      <FadeIn>
        <header className="mb-12 text-center max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {post.categories.map((category) => (
              <Badge key={category.title} variant="secondary" className="bg-transparent border border-border/50 text-muted-foreground hover:bg-muted/50 rounded-full px-4 font-normal">
                {category.title}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-8 leading-tight">{post.title}</h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm uppercase tracking-wider font-medium">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
            </div>
            <div className="flex items-center">
              <ClockIcon className="mr-2 h-4 w-4" />
              {readTime} min read
            </div>
            <div className="flex items-center">
              <Suspense fallback={<Skeleton className="w-16 h-4 bg-muted" />}>
                <ViewCount slug={post.slug.current} readTime={readTime} />
              </Suspense>
            </div>
          </div>
        </header>
      </FadeIn>

      {postImageUrl && (
        <ScaleIn className="relative aspect-[2/1] w-full mb-16 rounded-xl overflow-hidden shadow-sm border border-border/40">
          <Image src={postImageUrl} alt={post.title || "Post image"} fill className="object-cover" priority />
        </ScaleIn>
      )}

      <FadeIn delay={0.2} className="max-w-prose mx-auto">
        <div className="mb-12 flex items-center justify-between border-b border-border/40 pb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10 border border-border/50">
              <AvatarImage src={post.author.image ? urlFor(post.author.image).width(200).height(200).quality(100).url() : undefined} />
              <AvatarFallback>{post.author.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{post.author.name}</p>
              <p className="text-muted-foreground text-xs">{post.author.bio?.[0]?.children?.[0]?.text}</p>
            </div>
          </div>
          <ShareButton title={post.title} url={post.slug.current} />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none font-sans">
          {Array.isArray(post.body) && <PortableText value={post.body} components={customComponents} />}
        </div>

        <Separator className="my-16" />

        <div className="flex justify-center">
          <Button asChild variant="outline" className="rounded-full px-8">
            <Link href="/blog">Read More Articles</Link>
          </Button>
        </div>
      </FadeIn>
    </article>
  );
}

// LOADING SKELETON
function PostSkeleton() {
  return (
    <div className="w-full space-y-8 animate-pulse">
      <div className="h-12 w-3/4 bg-muted mx-auto rounded-md" />
      <div className="h-6 w-1/4 bg-muted mx-auto rounded-md" />
      <div className="h-[400px] w-full bg-muted rounded-xl" />
      <div className="h-4 w-full bg-muted rounded-md" />
      <div className="h-4 w-5/6 bg-muted rounded-md" />
    </div>
  );
}

// MAIN PAGE
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <main className="container mx-auto pb-20 px-4 md:px-8 max-w-4xl bg-background">
      <div className="mt-14">
        <Link
          href="/blog"
          className="inline-flex items-center text-muted-foreground hover:text-foreground my-8 md:my-12 text-sm uppercase tracking-widest font-medium transition-colors"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Journal
        </Link>
      </div>

      <Suspense fallback={<PostSkeleton />}>
        <PostContent slug={slug} />
      </Suspense>

      <ScrollToTop />
    </main>
  );
}