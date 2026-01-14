"use client";

import { useMemo, useState } from "react";

import { BlogFilterBar } from "@/components/blocks/blog-filter-bar";
import { BlogCard } from "@/components/blog/blog-card";
import type { BlogPost, FilterOptions, SortOption } from "@/lib/blog-types";
import {
  filterPosts,
  sortPosts,
  groupPostsByYear,
  getAllTags,
  getAllCategories,
} from "@/lib/blog-utils";

interface BlogListContentProps {
  initialPosts: BlogPost[];
}

export function BlogListContent({ initialPosts }: BlogListContentProps) {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const categories = useMemo(
    () => getAllCategories(initialPosts),
    [initialPosts],
  );
  const tags = useMemo(() => getAllTags(initialPosts), [initialPosts]);

  const filteredPosts = useMemo(() => {
    const filtered = filterPosts(initialPosts, filters);
    return sortPosts(filtered, sortBy);
  }, [initialPosts, filters, sortBy]);

  const postsByYear = useMemo(
    () => groupPostsByYear(filteredPosts),
    [filteredPosts],
  );
  const years = useMemo(
    () => Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a)),
    [postsByYear],
  );

  return (
    <div className="flex flex-col gap-y-8">
      <BlogFilterBar
        categories={categories}
        tags={tags}
        filters={filters}
        sortBy={sortBy}
        resultsCount={filteredPosts.length}
        onFilterChange={setFilters}
        onSortChange={setSortBy}
      />

      <div className="flex flex-col gap-y-12">
        {years.map((year) => (
          <section key={year} className="flex flex-col gap-y-6">
            <div className="border-b pb-2 text-lg font-medium">{year}</div>
            <ul className="flex flex-col gap-6">
              {postsByYear[year].map((post) => (
                <li key={post.id}>
                  <BlogCard post={post} />
                </li>
              ))}
            </ul>
          </section>
        ))}

        {years.length === 0 && (
          <div className="text-muted-foreground py-20 text-center">
            No posts found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
