import Image from "next/image";
import Link from "next/link";

import { Clock, Tag } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { BlogPost } from "@/lib/blog-types";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <div
      className={cn(
        "group hover:bg-muted/50 rounded-xl border p-4 transition-colors duration-300 ease-in-out",
        className,
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="flex flex-col gap-4 sm:flex-row"
      >
        {post.image && (
          <div className="w-full sm:w-48 sm:shrink-0">
            <div className="relative aspect-video w-full overflow-hidden rounded-md sm:aspect-[4/3]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        )}

        <div className="grow">
          <h3 className="group-hover:text-primary mb-1 text-lg font-medium transition-colors">
            {post.title}
          </h3>
          <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
            {post.excerpt}
          </p>

          <div className="text-muted-foreground mb-3 flex flex-wrap items-center gap-x-2 text-xs">
            {/* Author */}
            <div className="flex items-center gap-x-1.5">
              <Avatar className="size-5">
                <AvatarImage src={post.authorImage} alt={post.author} />
                <AvatarFallback className="text-[10px]">
                  {post.author[0]}
                </AvatarFallback>
              </Avatar>
              <span>{post.author}</span>
            </div>

            <Separator orientation="vertical" className="h-4" />

            {/* Date */}
            <span>{post.date}</span>

            <Separator orientation="vertical" className="h-4" />

            {/* Read Time */}
            <div className="flex items-center gap-1">
              <Clock className="size-3" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-x-1 text-xs font-normal"
                >
                  <Tag className="size-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
