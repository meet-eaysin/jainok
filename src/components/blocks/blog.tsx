import Image from "next/image";
import Link from "next/link";

import { Calendar, Clock, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost } from "@/lib/blog-types";

interface BlogProps {
  isPage?: boolean;
  blogPosts?: BlogPost[];
}

export const Blog = ({
  isPage = false,
  blogPosts: propBlogPosts,
}: BlogProps) => {
  // Blog posts must be provided as props (from API or server component)
  const blogPosts = propBlogPosts || [];
  const featuredPost = blogPosts.find((post: BlogPost) => post.featured);
  const regularPosts = blogPosts.filter((post: BlogPost) => !post.featured);

  return (
    <section id="blog" className={isPage ? "" : "py-28 lg:py-32"}>
      <div className="container">
        {/* Header */}
        {!isPage && (
          <div className="mb-20">
            <h2 className="font-display mb-4 text-4xl leading-tight font-bold md:text-6xl lg:text-7xl">
              Latest Thoughts
            </h2>
            <p className="text-muted-foreground text-lg font-light">
              Sharing my experiences, learnings, and insights about software
              development, technology trends, and best practices.
            </p>
          </div>
        )}

        {/* Featured Blog Post */}
        {featuredPost && (
          <div className="mb-20">
            <Card className="group bg-muted/10 overflow-hidden border transition-all duration-300 hover:shadow-md">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="group relative aspect-video md:aspect-auto md:h-full">
                    {featuredPost?.image ? (
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                </div>
                <div className="p-8 md:w-1/2">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                    >
                      {featuredPost.category}
                    </Badge>
                    <div className="text-muted-foreground flex items-center gap-1 text-sm">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1 text-sm">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <h3 className="hover:text-primary font-display mb-4 text-2xl font-bold transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="text-primary hover:text-primary/80 inline-flex items-center gap-2 font-medium transition-colors"
                  >
                    Read More
                    <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="grid gap-10 md:grid-cols-2">
          {regularPosts.map((post: BlogPost) => (
            <Card
              key={post.id}
              className="group bg-muted/5 flex flex-col overflow-hidden border transition-all duration-300 hover:shadow-md"
            >
              <div className="relative aspect-video overflow-hidden">
                {post?.image !== "" ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                ) : null}
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    className="border-0 bg-white/90 text-gray-800 backdrop-blur-sm"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {post.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="text-muted-foreground mb-3 flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>
                <h3 className="group-hover:text-primary font-display mb-3 line-clamp-2 text-xl font-bold transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-primary hover:text-primary/80 inline-flex items-center gap-2 text-sm font-medium transition-colors"
                >
                  Read More
                  <span className="">→</span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Link */}
        {!isPage && (
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="text-primary hover:text-primary/80 inline-flex items-center gap-2 font-medium"
            >
              View All Posts
              <span className="text-lg">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
