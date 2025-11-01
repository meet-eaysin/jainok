import Image from "next/image";
import Link from "next/link";

import { Calendar, Clock, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts as defaultBlogPosts } from "@/data/blog-posts";
import type { BlogPost } from "@/data/blog-posts";

interface BlogProps {
  isPage?: boolean;
  blogPosts?: BlogPost[];
}

export const Blog = ({
  isPage = false,
  blogPosts: propBlogPosts,
}: BlogProps) => {
  // Use prop data if provided, otherwise fall back to default
  const blogPosts = propBlogPosts || defaultBlogPosts;
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <section id="blog" className={isPage ? "" : "py-28 lg:py-32"}>
      <div className="container">
        {/* Header */}
        {!isPage && (
          <div className="mb-16">
            <h2 className="mb-3 font-serif text-4xl leading-tight font-medium md:text-7xl">
              Latest Thoughts & Insights
            </h2>
            <p className="text-muted-foreground text-lg font-light">
              Sharing my experiences, learnings, and insights about software
              development, technology trends, and best practices.
            </p>
          </div>
        )}

        {/* Featured Blog Post */}
        {featuredPost && (
          <div className="mb-16">
            <Card className="from-background to-muted/10 overflow-hidden border-0 bg-gradient-to-br transition-all duration-300 hover:shadow-xl">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="group relative h-64 md:h-full">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
                  <h3 className="hover:text-primary mb-4 text-2xl font-bold transition-colors">
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
                    <span className="text-lg transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Regular Blog Posts */}
        <div className="grid gap-8 md:grid-cols-2">
          {regularPosts.map((post) => (
            <Card
              key={post.id}
              className="from-background to-muted/5 group overflow-hidden border-0 bg-gradient-to-br transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
                <h3 className="group-hover:text-primary mb-3 line-clamp-2 text-xl font-semibold transition-colors">
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
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
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
