import { BlogMiniCard } from "./blog-mini-card";

import type { BlogPost } from "@/lib/blog-types";
import { getRelatedPosts } from "@/lib/blog-utils";

interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

export function RelatedPosts({ currentPost, allPosts }: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(currentPost, allPosts, 4);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="text-muted-foreground/80 text-xs font-bold tracking-widest uppercase">
          Related Reading
        </h2>
        <div className="bg-border/40 h-px grow" />
      </div>
      <div className="grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-2">
        {relatedPosts.map((post) => (
          <BlogMiniCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
