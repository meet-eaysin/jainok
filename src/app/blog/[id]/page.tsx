import Image from "next/image";
import { notFound } from "next/navigation";

import { format } from "date-fns";
import { BookText, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { Background } from "@/components/background";
import { ReadingProgress } from "@/components/blocks/reading-progress";
import { SocialShare } from "@/components/blocks/social-share";
import { PostNavigation } from "@/components/blog/post-navigation";
import { RelatedPosts } from "@/components/blog/related-posts";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import {
  getPostBySlugFromFiles,
  getAllPostsFromFiles,
} from "@/lib/blog-server";
import type { BlogPost } from "@/lib/blog-types";
import { generateTableOfContents } from "@/lib/blog-utils";
import { cn } from "@/lib/utils";

// Helper to get adjacent posts
function getAdjacentPosts(currentId: string, allPosts: BlogPost[]) {
  const index = allPosts.findIndex((p) => p.id === currentId);
  if (index === -1) return { newer: null, older: null };
  const newer = index > 0 ? allPosts[index - 1] : null;
  const older = index < allPosts.length - 1 ? allPosts[index + 1] : null;
  return { newer, older };
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getPostBySlugFromFiles(id);

  if (!post) return {};

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords || post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = getPostBySlugFromFiles(id);

  if (!post) notFound();

  const allPosts = getAllPostsFromFiles();
  const { newer, older } = getAdjacentPosts(post.id, allPosts);
  const toc = generateTableOfContents(post.content);

  return (
    <Background>
      <ReadingProgress />
      <div className="container px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_1fr]">
          {/* Left Sidebar: TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={toc} />
            </div>
          </aside>

          {/* Main Content Column */}
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-6 lg:mx-0">
            {/* Breadcrumbs */}
            <Breadcrumbs
              items={[
                { label: "Blog", href: "/blog", icon: BookText },
                { label: post.title, href: `/blog/${post.slug}` },
              ]}
            />

            {/* Hero Image */}
            {post.image && (
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <header className="flex flex-col gap-y-4">
              <h1 className="text-3xl leading-tight font-medium sm:text-4xl">
                {post.title}
              </h1>

              <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={post.authorImage} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-foreground">{post.author}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="size-4" />
                  <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
                </div>

                <Separator
                  orientation="vertical"
                  className="hidden h-4 sm:block"
                />

                <div className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {post.tags && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="font-normal"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            <Separator />

            <article className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug]}
                components={{
                  img: ({ ...props }) => (
                    <div className="my-8 flex flex-col items-center gap-2">
                      <div className="relative aspect-video w-full overflow-hidden rounded-xl border shadow-sm">
                        <Image
                          src={(props.src as string) || ""}
                          alt={props.alt || ""}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {props.alt && (
                        <span className="text-muted-foreground text-center text-sm italic">
                          {props.alt}
                        </span>
                      )}
                    </div>
                  ),
                  code: ({ className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    const isInline = !match;
                    return isInline ? (
                      <code
                        className={cn(
                          "bg-muted/50 rounded-md px-1.5 py-0.5 font-mono text-sm font-medium",
                          className,
                        )}
                        {...props}
                      >
                        {children}
                      </code>
                    ) : (
                      <div className="group relative my-6">
                        <div className="bg-muted absolute top-0 right-0 flex items-center rounded-tr-lg rounded-bl-lg px-3 py-1 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                          {match[1]}
                        </div>
                        <pre
                          className={cn(
                            "bg-muted/30 max-h-[600px] overflow-auto rounded-lg border p-4 font-mono text-sm leading-relaxed",
                            className,
                          )}
                        >
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>

            <div className="mt-8 flex flex-col gap-6 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
              <SocialShare url={`/blog/${post.slug}`} title={post.title} />
            </div>

            <PostNavigation newerPost={newer} olderPost={older} />

            <RelatedPosts currentPost={post} allPosts={allPosts} />
          </div>
        </div>
      </div>
    </Background>
  );
}

// Static Params
export async function generateStaticParams() {
  const posts = getAllPostsFromFiles();
  return posts.map((post) => ({
    id: post.id,
  }));
}
