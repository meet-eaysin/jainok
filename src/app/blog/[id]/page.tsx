import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Background } from "@/components/background";
import { BlogReactions } from "@/components/blocks/blog-reactions";
import { ReadingProgress } from "@/components/blocks/reading-progress";
import { SocialShare } from "@/components/blocks/social-share";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost } from "@/lib/blog-types";
import { getRelatedPosts } from "@/lib/blog-utils";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  // Fetch post from API
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/blog/posts/${id}`,
  );
  if (!response.ok) return {};

  const post: BlogPost = await response.json();

  if (!post) return {};

  const siteUrl = "https://eaysinmia.dev";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords || post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.seo?.ogImage || post.image || `${siteUrl}/og-image.jpg`],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      url: postUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.seo?.ogImage || post.image || `${siteUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch post from API
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/blog/posts/${id}`,
    {
      cache: "no-store",
    },
  );
  if (!response.ok) notFound();

  const post: BlogPost = await response.json();

  // Fetch all posts for related posts
  const allPostsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/blog/posts`,
  );
  const allPostsData = await allPostsResponse.json();
  const allPosts: BlogPost[] = allPostsData.posts || [];

  const relatedPosts = getRelatedPosts(post, allPosts, 3);

  return (
    <>
      <ReadingProgress />
      <Background className="via-muted to-muted/80">
        <div className="container py-28 lg:py-32">
          <div className="mx-auto max-w-4xl">
            {/* Back Button */}
            <div className="mb-8">
              <Link href="/blog">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
            </div>

            {/* Blog Post Header */}
            <div className="mb-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {post.category}
                </Badge>
                <div className="text-muted-foreground flex items-center gap-1 text-sm">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="text-muted-foreground flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
                <div className="text-muted-foreground flex items-center gap-1 text-sm">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
              </div>
              <h1 className="font-display mb-6 text-4xl leading-tight font-bold md:text-6xl">
                {post.title}
              </h1>
              <p className="text-muted-foreground text-xl leading-relaxed">
                {post.excerpt}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Image */}
            {post.image && (
              <div className="mb-8">
                <div className="relative h-64 overflow-hidden rounded-lg md:h-96">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Blog Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Reactions */}
            <BlogReactions postId={post.id} />

            {/* Social Share */}
            <SocialShare url={`/blog/${post.slug}`} title={post.title} />

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="border-border mt-12 border-t pt-12">
                <h2 className="font-display mb-6 text-2xl font-bold">
                  Related Posts
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                      <Card className="group h-full transition-all duration-300 hover:shadow-md">
                        {relatedPost.image && (
                          <div className="relative aspect-video overflow-hidden">
                            <Image
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <CardContent className="p-4">
                          <Badge variant="secondary" className="mb-2 text-xs">
                            {relatedPost.category}
                          </Badge>
                          <h3 className="group-hover:text-primary font-display mb-2 line-clamp-2 text-base font-bold transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-2 text-sm">
                            {relatedPost.excerpt}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Background>
    </>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  // Use server-side function during build (no API call needed)
  const { getAllPostsFromFiles } = await import("@/lib/blog-server");
  const blogPosts = getAllPostsFromFiles();
  return blogPosts.map((post: BlogPost) => ({
    id: post.id,
  }));
}
