import { BlogCard } from "./blog-card";

import type { BlogPost } from "@/lib/blog-types";
import { getRelatedPosts } from "@/lib/blog-utils";

interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

export function RelatedPosts({ currentPost, allPosts }: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(currentPost, allPosts, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Related Posts</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <BlogCard key={post.id} post={post} className="h-full" />
        ))}
      </div>
    </section>
  );
}
