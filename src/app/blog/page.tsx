import { Background } from "@/components/background";
import { Blog } from "@/components/blocks/blog";

export default function BlogPage() {
  return (
    <Background className="via-muted to-muted/80">
      <div className="container py-28 lg:py-32">
        {/* Page Header */}
        <div className="mb-16">
          <h2 className="mb-3 font-serif text-4xl font-medium leading-tight md:text-7xl">
            Blog & Insights
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            Sharing my experiences, learnings, and insights about software development,
            technology trends, and best practices.
          </p>
        </div>
        <Blog isPage={true} />
      </div>
    </Background>
  );
}