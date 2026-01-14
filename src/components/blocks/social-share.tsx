"use client";

import { useState } from "react";

import { Copy, Facebook, Linkedin, Share2, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SocialShareProps {
  url: string;
  title: string;
}

export const SocialShare = ({ url, title }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : url;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Failed to copy
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl,
        });
      } catch {
        // User cancelled or error occurred
      }
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground mr-2 text-xs font-medium tracking-tight uppercase">
        Share
      </span>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-md"
          onClick={() => window.open(shareLinks.twitter, "_blank")}
          title="Share on Twitter"
        >
          <Twitter className="text-muted-foreground group-hover:text-foreground size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-md"
          onClick={() => window.open(shareLinks.linkedin, "_blank")}
          title="Share on LinkedIn"
        >
          <Linkedin className="text-muted-foreground group-hover:text-foreground size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-md"
          onClick={() => window.open(shareLinks.facebook, "_blank")}
          title="Share on Facebook"
        >
          <Facebook className="text-muted-foreground group-hover:text-foreground size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-md"
          onClick={handleCopyLink}
          title={copied ? "Copied!" : "Copy Link"}
        >
          <Copy
            className={cn(
              "text-muted-foreground size-4",
              copied && "text-primary",
            )}
          />
        </Button>
        {typeof window !== "undefined" && "share" in navigator && (
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-md"
            onClick={handleNativeShare}
            title="Share"
          >
            <Share2 className="text-muted-foreground size-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
