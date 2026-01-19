import { Metadata } from "next";

import { Background } from "@/components/background";
import { BlogListContent } from "@/components/blog/blog-list-content";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Blog | Jainok",
  description: "Experiences and insights about web development.",
};

async function getPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blog/posts?status=published`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data.posts || [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <Background>
      <div className="container pt-12 pb-20 lg:pt-16 lg:pb-28">
        <Breadcrumbs
          items={[{ label: "Blog", href: "/blog" }]}
          className="mb-6"
        />

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
