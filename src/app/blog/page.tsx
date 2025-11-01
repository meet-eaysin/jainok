import { Background } from "@/components/background";
import { Blog } from "@/components/blocks/blog";
import { getAllPosts } from "@/data/blog-posts";

export default function BlogPage() {
  const blogPosts = getAllPosts();

  return (
    <Background className="via-muted to-muted/80">
      <div className="container py-28 lg:py-32">
        {/* Page Header */}
        <div className="mb-16">
          <h2 className="mb-3 font-serif text-4xl leading-tight font-medium md:text-7xl">
            Blog & Insights
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            Sharing my experiences, learnings, and insights about software
            development, technology trends, and best practices.
          </p>
        </div>
        <Blog isPage={true} blogPosts={blogPosts} />
      </div>
    </Background>
  );
}
