import Image from "next/image";
import { notFound } from "next/navigation";

import { format } from "date-fns";
import { BookText, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
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
import type { BlogPost } from "@/lib/blog-types";
import { generateTableOfContents } from "@/lib/blog-utils";

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blog/posts/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch {
    return null;
  }
}

async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blog/posts?status=published`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data: { posts: BlogPost[] } = await res.json(); // Apply strict typing here
    return data.posts || [];
  } catch {
    return [];
  }
}

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
  const post = await getPost(id);

  if (!post) return {};

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const { newer, older } = getAdjacentPosts(post.id, allPosts);
  const toc = generateTableOfContents(post.content);

  return (
    <Background>
      <ReadingProgress />

      <div className="container pt-12 pb-20 lg:pt-16 lg:pb-28">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${post.id}` },
          ]}
          className="mb-6"
        />

        <article className="mx-auto">
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="text-xs">
                {post.category}
              </Badge>
              {post.tags?.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="font-display mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <div className="text-muted-foreground mb-6 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              {post.views !== undefined && (
                <div className="flex items-center gap-2">
                  <BookText className="h-4 w-4" />
                  <span>{post.views} views</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.authorImage} alt={post.author} />
                <AvatarFallback>
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">{post.author}</div>
                <div className="text-muted-foreground text-xs">Author</div>
              </div>
            </div>
          </header>

          {post.image && (
            <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-[1fr_250px]">
            <div className="blog-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug]}
                components={{
                  a: ({ href, children, ...props }) => {
                    const isExternal = href?.startsWith("http");
                    return (
                      <a
                        href={href}
                        className="text-primary hover:underline"
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        {...props}
                      >
                        {children}
                      </a>
                    );
                  },
                  code(props) {
                    const { className, children } = props;
                    const match = /language-(\w+)/.exec(className || "");
                    const isInline = !match;

                    if (isInline) {
                      return <code className={className}>{children}</code>;
                    }

                    return (
                      <SyntaxHighlighter
                        style={
                          oneDark as { [key: string]: React.CSSProperties }
                        }
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                {toc.length > 0 && <TableOfContents items={toc} />}
              </div>
            </aside>
          </div>

          <Separator className="my-12" />

          <div className="mb-12">
            <SocialShare title={post.title} url={`/blog/${post.id}`} />
          </div>

          <Separator className="my-12" />

          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <>
              <RelatedPosts currentPost={post} allPosts={allPosts} />
              <Separator className="my-12" />
            </>
          )}

          <PostNavigation newerPost={newer} olderPost={older} />
        </article>
      </div>
    </Background>
  );
}
