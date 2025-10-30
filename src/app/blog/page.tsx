import { Background } from "@/components/background";
import { Blog } from "@/components/blocks/blog";

export default function BlogPage() {
  return (
    <Background className="via-muted to-muted/80">
      <div className="container py-28 lg:py-32">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-4">
            Blog & Insights
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sharing my experiences, learnings, and insights about software development,
            technology trends, and best practices.
          </p>
        </div>
        <Blog isPage={true} />
      </div>
    </Background>
  );
}