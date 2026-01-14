"use client";

import { useState, useMemo, useEffect } from "react";

import { Background } from "@/components/background";
import { Blog } from "@/components/blocks/blog";
import { BlogFilterBar } from "@/components/blocks/blog-filter-bar";
import { EmailSubscription } from "@/components/blocks/email-subscription";
import type { FilterOptions, SortOption, BlogPost } from "@/lib/blog-types";
import {
  getAllCategories,
  getAllTags,
  filterPosts,
  sortPosts,
} from "@/lib/blog-utils";

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // Fetch posts from API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/blog/posts");
        const data = await response.json();
        setAllPosts(data.posts || []);
      } catch {
        // Error fetching posts
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const categories = useMemo(() => getAllCategories(allPosts), [allPosts]);
  const tags = useMemo(() => getAllTags(allPosts), [allPosts]);

  // Apply filters and sorting
  const filteredAndSortedPosts = useMemo(() => {
    const filtered = filterPosts(allPosts, filters);
    return sortPosts(filtered, sortBy);
  }, [allPosts, filters, sortBy]);

  if (loading) {
    return (
      <Background className="via-muted to-muted/80">
        <div className="container py-28 lg:py-32">
          <div className="text-center">Loading...</div>
        </div>
      </Background>
    );
  }

  return (
    <Background className="via-muted to-muted/80">
      <div className="container py-28 lg:py-32">
        <div className="mb-16">
          <h1 className="font-display mb-3 text-4xl leading-tight font-medium md:text-7xl">
            Blog & Insights
          </h1>
          <p className="text-muted-foreground text-lg font-light">
            Sharing my experiences, learnings, and insights about software
            development, technology trends, and best practices.
          </p>
        </div>

        <BlogFilterBar
          categories={categories}
          tags={tags}
          filters={filters}
          sortBy={sortBy}
          resultsCount={filteredAndSortedPosts.length}
          onFilterChange={setFilters}
          onSortChange={setSortBy}
        />

        {filteredAndSortedPosts.length > 0 ? (
          <Blog isPage={true} blogPosts={filteredAndSortedPosts} />
        ) : (
          <div className="py-20 text-center">
            <p className="text-muted-foreground text-lg">
              No posts found matching your filters.
            </p>
            <button
              onClick={() => setFilters({})}
              className="text-primary hover:text-primary/80 mt-4 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        <EmailSubscription />
      </div>
    </Background>
  );
}
