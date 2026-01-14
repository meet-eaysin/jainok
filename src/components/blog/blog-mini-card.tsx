import Image from "next/image";
import Link from "next/link";

import { Clock } from "lucide-react";

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
        "group hover:bg-muted/50 flex flex-col gap-3 rounded-xl border p-3 transition-all",
        className,
      )}
    >
      {post.image && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h4 className="group-hover:text-primary line-clamp-2 text-sm leading-snug font-semibold transition-colors">
          {post.title}
        </h4>
        <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-medium tracking-wider uppercase">
          <Clock className="size-3" />
          <span>{post.readTime}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>
      </div>
    </Link>
  );
}
