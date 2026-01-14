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
    <div className="flex flex-col gap-y-4">
      <p className="text-muted-foreground text-sm font-medium">
        Share this post
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => window.open(shareLinks.twitter, "_blank")}
          title="Share on Twitter"
        >
          <Twitter className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => window.open(shareLinks.linkedin, "_blank")}
          title="Share on LinkedIn"
        >
          <Linkedin className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => window.open(shareLinks.facebook, "_blank")}
          title="Share on Facebook"
        >
          <Facebook className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handleCopyLink}
          title={copied ? "Copied!" : "Copy Link"}
        >
          <Copy className={cn("size-4", copied && "text-primary")} />
        </Button>
        {typeof window !== "undefined" && "share" in navigator && (
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={handleNativeShare}
            title="Share"
          >
            <Share2 className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
