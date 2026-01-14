import { Metadata } from "next";

import { BlogListContent } from "@/components/blog/blog-list-content";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getAllPostsFromFiles } from "@/lib/blog-server";

export const metadata: Metadata = {
  title: "Blog | Jainok",
  description: "Experiences and insights about web development.",
};

export default async function BlogPage() {
  // Fetch posts directly from server (filesystem)
  const posts = await getAllPostsFromFiles();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="sr-only">Blog</h1>
        <Breadcrumbs
          items={[{ label: "Blog", href: "/blog" }]}
          className="mb-4"
        />
      </div>

      <BlogListContent initialPosts={posts} />
    </div>
  );
}
