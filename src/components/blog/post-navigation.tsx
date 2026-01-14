import Link from "next/link";

import { ArrowLeft, ArrowRight, CornerLeftUp } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import type { BlogPost } from "@/lib/blog-types";
import { cn } from "@/lib/utils";

interface PostNavigationProps {
  newerPost?: BlogPost | null;
  olderPost?: BlogPost | null;
  parentPost?: BlogPost | null; // For future subpost support
}

export function PostNavigation({
  newerPost,
  olderPost,
  parentPost,
}: PostNavigationProps) {
  const isSubpost = !!parentPost;

  return (
    <nav
      className={cn(
        "grid grid-cols-1 gap-4",
        isSubpost ? "sm:grid-cols-3" : "sm:grid-cols-2",
      )}
    >
      {/* Older Post (Previous) */}
      <Link
        href={olderPost ? `/blog/${olderPost.slug}` : "#"}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "group flex size-full h-auto items-center justify-start rounded-lg px-4 py-4",
          !olderPost && "pointer-events-none cursor-not-allowed opacity-50",
        )}
        aria-disabled={!olderPost}
      >
        <ArrowLeft className="mr-2 size-4 shrink-0 transition-transform group-hover:-translate-x-1" />
        <div className="flex flex-col items-start overflow-hidden text-wrap">
          <span className="text-muted-foreground text-left text-xs">
            {isSubpost ? "Previous Subpost" : "Previous Post"}
          </span>
          <span className="line-clamp-2 w-full text-left text-sm font-medium text-balance">
            {olderPost?.title ||
              (isSubpost ? "No older subpost" : "You're at the oldest post")}
          </span>
        </div>
      </Link>

      {/* Parent Post (Middle) - Only if subpost */}
      {isSubpost && (
        <Link
          href={parentPost ? `/blog/${parentPost.slug}` : "#"}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "group flex size-full h-auto items-center justify-center rounded-lg px-4 py-4",
            !parentPost && "pointer-events-none cursor-not-allowed opacity-50",
          )}
        >
          <CornerLeftUp className="mr-2 size-4 shrink-0 transition-transform group-hover:-translate-y-1" />
          <div className="flex flex-col items-center overflow-hidden text-wrap">
            <span className="text-muted-foreground text-center text-xs">
              Parent Post
            </span>
            <span className="line-clamp-2 w-full text-center text-sm font-medium text-balance">
              {parentPost?.title || "No parent post"}
            </span>
          </div>
        </Link>
      )}

      {/* Newer Post (Next) */}
      <Link
        href={newerPost ? `/blog/${newerPost.slug}` : "#"}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "group flex size-full h-auto items-center justify-end rounded-lg px-4 py-4",
          !newerPost && "pointer-events-none cursor-not-allowed opacity-50",
        )}
        aria-disabled={!newerPost}
      >
        <div className="flex flex-col items-end overflow-hidden text-wrap">
          <span className="text-muted-foreground text-right text-xs">
            {isSubpost ? "Next Subpost" : "Next Post"}
          </span>
          <span className="line-clamp-2 w-full text-right text-sm font-medium text-balance">
            {newerPost?.title ||
              (isSubpost ? "No newer subpost" : "You're at the newest post")}
          </span>
        </div>
        <ArrowRight className="ml-2 size-4 shrink-0 transition-transform group-hover:translate-x-1" />
      </Link>
    </nav>
  );
}
