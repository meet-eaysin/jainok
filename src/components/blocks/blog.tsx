import Image from "next/image";
import Link from "next/link";

import { Calendar, Clock, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Why Redis is Efficient and Memory-Friendly",
    excerpt: "Exploring Redis internals and understanding how SDS (Simple Dynamic String) and smart memory management make Redis so efficient.",
    category: "Technology",
    date: "2024-12-01",
    readTime: "5 min read",
    image: "/blog/redis-efficiency.webp",
    featured: true,
  },
  {
    id: "2",
    title: "Building Scalable React Applications",
    excerpt: "Best practices for creating maintainable and performant React applications with modern patterns and state management.",
    category: "React",
    date: "2024-11-15",
    readTime: "8 min read",
    image: "/blog/react-scalable.webp",
  },
  {
    id: "3",
    title: "Node.js Performance Optimization",
    excerpt: "Techniques and strategies for optimizing Node.js applications for better performance and scalability.",
    category: "Node.js",
    date: "2024-10-28",
    readTime: "6 min read",
    image: "/blog/nodejs-performance.webp",
  },
];

export const Blog = () => {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section id="blog" className="py-28 lg:py-32">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl mb-4">
            Latest Thoughts & Insights
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sharing my experiences, learnings, and insights about software development,
            technology trends, and best practices.
          </p>
        </div>

        {/* Featured Blog Post */}
        {featuredPost && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-center">Featured Post</h3>
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary">{featuredPost.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                  <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Regular Blog Posts */}
        <div className="grid md:grid-cols-2 gap-8">
          {regularPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <Badge variant="outline" className="text-xs">
                    <Tag className="w-3 h-3 mr-1" />
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  Read More →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
          >
            View All Posts
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};