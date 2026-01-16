import { Metadata } from "next";

import { Background } from "@/components/background";
import { BlogListContent } from "@/components/blog/blog-list-content";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getAllPostsFromFiles } from "@/lib/blog-server";

export const metadata: Metadata = {
  title: "Blog | Jainok",
  description: "Experiences and insights about web development.",
};

export default async function BlogPage() {
  const posts = await getAllPostsFromFiles();

  return (
    <Background>
      <div className="container pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[{ label: "Blog", href: "/blog" }]}
          className="mb-6"
        />

        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display mb-3 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
            Latest Thoughts
          </h1>
          <p className="text-muted-foreground max-w-2xl text-base font-light sm:text-lg">
            Sharing my experiences, learnings, and insights about software
            development, technology trends, and best practices.
          </p>
        </div>

        <BlogListContent initialPosts={posts} />
      </div>
    </Background>
  );
}
