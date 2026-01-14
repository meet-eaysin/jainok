import Image from "next/image";
import Link from "next/link";

import type { BlogPost } from "@/lib/blog-types";
import { cn } from "@/lib/utils";

interface BlogMiniCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogMiniCard({ post, className }: BlogMiniCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group hover:bg-muted/50 hover:border-border flex items-center gap-4 rounded-xl border border-transparent p-1 transition-all",
        className,
      )}
    >
      {post.image && (
        <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg sm:w-24">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-col gap-1 overflow-hidden">
        <h4 className="group-hover:text-primary line-clamp-2 text-sm leading-snug font-bold transition-colors">
          {post.title}
        </h4>
        <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-medium tracking-tight uppercase">
          <span className="text-primary/70">{post.category}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
