'use client'

import { PortableText, type SanityDocument } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { client } from "@/sanity/lib/client"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ClockIcon, ArrowLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  ...,
  author->,
  categories[]->
}`

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

const options = { next: { revalidate: 30 } }

export async function BlockPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, params, options)
  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(630).url()
    : null

  // Function to estimate read time
  const estimateReadTime = (text: string) => {
    const wordsPerMinute = 200
    const words = text.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  const readTime = estimateReadTime(JSON.stringify(post.body))

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to posts
      </Link>
      <article className="bg-card rounded-lg shadow-lg overflow-hidden">
        {postImageUrl && (
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
            <Image
              src={postImageUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6 sm:p-8 md:p-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <ClockIcon className="mr-2 h-4 w-4" />
              {readTime} min read
            </div>
          </div>
          <div className="flex items-center gap-4 mb-8">
            <Avatar>
              <AvatarImage src={post.author.image ? urlFor(post.author.image).width(40).height(40).url() : undefined} />
              <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">{post.author.bio}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {post.categories.map((category: { title: string }) => (
              <Badge key={category.title} variant="secondary">
                {category.title}
              </Badge>
            ))}
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {Array.isArray(post.body) && <PortableText value={post.body} />}
          </div>
        </div>
      </article>
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Share this article</h2>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            <span className="sr-only">Share on Twitter</span>
          </Button>
          <Button variant="outline" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            <span className="sr-only">Share on LinkedIn</span>
          </Button>
          <Button variant="outline" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            <span className="sr-only">Share on Facebook</span>
          </Button>
        </div>
      </div>
    </main>
  )
}