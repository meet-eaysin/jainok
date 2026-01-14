"use client";

import { useEffect, useState } from "react";

import {
  Heart,
  Lightbulb,
  PartyPopper,
  Sparkles,
  ThumbsUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogReactionsProps {
  postId: string;
}

export const BlogReactions = ({ postId }: BlogReactionsProps) => {
  const [reactions, setReactions] = useState<
    { id: string; label: string; count: number }[]
  >([
    { id: "like", label: "Like", count: 0 },
    { id: "love", label: "Love", count: 0 },
    { id: "insightful", label: "Insightful", count: 0 },
    { id: "amazing", label: "Amazing", count: 0 },
    { id: "celebrate", label: "Celebrate", count: 0 },
  ]);

  const [userReactions, setUserReactions] = useState<Set<string>>(new Set());

  const reactionIcons: Record<string, typeof ThumbsUp> = {
    like: ThumbsUp,
    love: Heart,
    insightful: Lightbulb,
    amazing: Sparkles,
    celebrate: PartyPopper,
  };

  useEffect(() => {
    const savedReactions = localStorage.getItem(`reactions-${postId}`);
    const savedUserReactions = localStorage.getItem(`user-reactions-${postId}`);

    if (savedReactions) {
      try {
        const parsed = JSON.parse(savedReactions);
        if (Array.isArray(parsed) && parsed.length > 0 && "id" in parsed[0]) {
          setReactions(parsed);
        } else {
          localStorage.removeItem(`reactions-${postId}`);
        }
      } catch {
        localStorage.removeItem(`reactions-${postId}`);
      }
    }

    if (savedUserReactions) {
      try {
        setUserReactions(new Set(JSON.parse(savedUserReactions)));
      } catch {
        localStorage.removeItem(`user-reactions-${postId}`);
      }
    }
  }, [postId]);

  const handleReaction = (id: string) => {
    const newReactions = reactions.map((reaction) => {
      if (reaction.id === id) {
        const hasReacted = userReactions.has(id);
        return {
          ...reaction,
          count: hasReacted ? reaction.count - 1 : reaction.count + 1,
        };
      }
      return reaction;
    });

    const newUserReactions = new Set(userReactions);
    if (newUserReactions.has(id)) {
      newUserReactions.delete(id);
    } else {
      newUserReactions.add(id);
    }

    setReactions(newReactions);
    setUserReactions(newUserReactions);

    localStorage.setItem(`reactions-${postId}`, JSON.stringify(newReactions));
    localStorage.setItem(
      `user-reactions-${postId}`,
      JSON.stringify(Array.from(newUserReactions)),
    );
  };

  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-muted-foreground text-sm font-medium">
        How did you find this post?
      </p>
      <div className="flex flex-wrap gap-2">
        {reactions.map((reaction) => {
          const Icon = reactionIcons[reaction.id];
          const isActive = userReactions.has(reaction.id);

          return (
            <Button
              key={reaction.id}
              variant="outline"
              size="sm"
              onClick={() => handleReaction(reaction.id)}
              className={cn(
                "hover:bg-muted group flex items-center gap-2 rounded-full transition-all",
                isActive &&
                  "border-primary bg-primary/5 text-primary hover:bg-primary/10",
              )}
            >
              <Icon
                className={cn(
                  "size-4 transition-transform group-hover:scale-110",
                  isActive && "fill-current",
                )}
              />
              {reaction.count > 0 && (
                <span className="text-xs font-semibold">{reaction.count}</span>
              )}
              <span className="sr-only">{reaction.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
