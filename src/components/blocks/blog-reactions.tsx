"use client";

import { useEffect, useState } from "react";

interface Reaction {
  emoji: string;
  label: string;
  count: number;
}

interface BlogReactionsProps {
  postId: string;
}

export const BlogReactions = ({ postId }: BlogReactionsProps) => {
  const [reactions, setReactions] = useState<Reaction[]>([
    { emoji: "👍", label: "Like", count: 0 },
    { emoji: "❤️", label: "Love", count: 0 },
    { emoji: "🔥", label: "Fire", count: 0 },
    { emoji: "💡", label: "Insightful", count: 0 },
    { emoji: "🎉", label: "Celebrate", count: 0 },
  ]);

  const [userReactions, setUserReactions] = useState<Set<string>>(new Set());

  // Load reactions from localStorage on mount
  useEffect(() => {
    const savedReactions = localStorage.getItem(`reactions-${postId}`);
    const savedUserReactions = localStorage.getItem(`user-reactions-${postId}`);

    if (savedReactions) {
      setReactions(JSON.parse(savedReactions));
    }

    if (savedUserReactions) {
      setUserReactions(new Set(JSON.parse(savedUserReactions)));
    }
  }, [postId]);

  const handleReaction = (emoji: string) => {
    const newReactions = reactions.map((reaction) => {
      if (reaction.emoji === emoji) {
        const hasReacted = userReactions.has(emoji);
        return {
          ...reaction,
          count: hasReacted ? reaction.count - 1 : reaction.count + 1,
        };
      }
      return reaction;
    });

    const newUserReactions = new Set(userReactions);
    if (newUserReactions.has(emoji)) {
      newUserReactions.delete(emoji);
    } else {
      newUserReactions.add(emoji);
    }

    setReactions(newReactions);
    setUserReactions(newUserReactions);

    // Save to localStorage
    localStorage.setItem(`reactions-${postId}`, JSON.stringify(newReactions));
    localStorage.setItem(
      `user-reactions-${postId}`,
      JSON.stringify(Array.from(newUserReactions)),
    );
  };

  return (
    <div className="border-border my-12 border-y py-6">
      <p className="text-muted-foreground mb-4 text-sm font-medium">
        How did you find this post?
      </p>
      <div className="flex flex-wrap gap-3">
        {reactions.map((reaction) => (
          <button
            key={reaction.emoji}
            onClick={() => handleReaction(reaction.emoji)}
            className={`hover:bg-muted flex items-center gap-2 rounded-full border px-4 py-2 transition-all ${
              userReactions.has(reaction.emoji)
                ? "border-primary bg-primary/10"
                : "border-border"
            }`}
            title={reaction.label}
          >
            <span className="text-xl">{reaction.emoji}</span>
            {reaction.count > 0 && (
              <span className="text-muted-foreground text-sm">
                {reaction.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
