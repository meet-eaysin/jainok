"use client";

import { useEffect, useState } from "react";

import { Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ContentType, FilterOptions, SortOption } from "@/lib/blog-utils";

interface BlogFilterBarProps {
  categories: string[];
  tags: string[];
  filters: FilterOptions;
  sortBy: SortOption;
  resultsCount: number;
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOption) => void;
}

export const BlogFilterBar = ({
  categories,
  tags,
  filters,
  sortBy,
  resultsCount,
  onFilterChange,
  onSortChange,
}: BlogFilterBarProps) => {
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || "");
  // We use this key to force re-render/reset the Tag Select component after selection
  const [tagSelectKey, setTagSelectKey] = useState(0);

  // Sync internal state with props
  useEffect(() => {
    setSearchQuery(filters.searchQuery || "");
  }, [filters.searchQuery]);

  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...filters,
      category: category === "all" ? undefined : category,
    });
  };

  const handleContentTypeChange = (type: string) => {
    onFilterChange({
      ...filters,
      contentType: type === "all" ? undefined : (type as ContentType),
    });
  };

  const addTag = (tag: string) => {
    const currentTags = filters.tags || [];
    if (!currentTags.includes(tag)) {
      onFilterChange({
        ...filters,
        tags: [...currentTags, tag],
      });
    }
    setTagSelectKey((prev) => prev + 1);
  };

  const removeTag = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.filter((t) => t !== tag);
    onFilterChange({
      ...filters,
      tags: newTags.length > 0 ? newTags : undefined,
    });
  };

  const removeCategory = () => {
    onFilterChange({ ...filters, category: undefined });
  };

  const removeContentType = () => {
    onFilterChange({ ...filters, contentType: undefined });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    const timer = setTimeout(() => {
      onFilterChange({
        ...filters,
        searchQuery: value || undefined,
      });
    }, 300);

    return () => clearTimeout(timer);
  };

  const clearFilters = () => {
    setSearchQuery("");
    onFilterChange({});
  };

  const hasActiveFilters =
    filters.category ||
    (filters.tags && filters.tags.length > 0) ||
    filters.contentType ||
    filters.searchQuery;

  const availableTags = tags.filter((t) => !filters.tags?.includes(t));

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative grow">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="bg-muted/50 h-9 border-none pl-9 shadow-none focus-visible:ring-1"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={filters.category || "all"}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="bg-muted/50 h-9 w-[130px] border-none shadow-none focus:ring-1">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.contentType || "all"}
            onValueChange={handleContentTypeChange}
          >
            <SelectTrigger className="bg-muted/50 h-9 w-[110px] border-none shadow-none focus:ring-1">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="blog">Blog</SelectItem>
              <SelectItem value="case-study">Case Study</SelectItem>
              <SelectItem value="article">Article</SelectItem>
              <SelectItem value="external">External</SelectItem>
            </SelectContent>
          </Select>

          <Select key={tagSelectKey} onValueChange={addTag}>
            <SelectTrigger className="bg-muted/50 h-9 w-[110px] border-none shadow-none focus:ring-1">
              <span className="text-muted-foreground">Tags</span>
            </SelectTrigger>
            <SelectContent>
              {availableTags.length > 0 ? (
                availableTags.slice(0, 20).map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))
              ) : (
                <div className="text-muted-foreground p-2 text-xs">
                  No more tags
                </div>
              )}
            </SelectContent>
          </Select>

          <div className="bg-border hidden h-8 w-px md:block" />

          <Select
            value={sortBy}
            onValueChange={(v) => onSortChange(v as SortOption)}
          >
            <SelectTrigger className="hover:bg-muted/50 h-9 w-[140px] border-none bg-transparent shadow-none focus:ring-1">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="shortest">Shortest Read</SelectItem>
              <SelectItem value="longest">Longest Read</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 px-1">
          <span className="text-muted-foreground text-xs font-medium">
            Active filters:
          </span>

          {filters.category && (
            <Badge
              variant="secondary"
              className="hover:bg-secondary/80 flex items-center gap-1"
            >
              Category: {filters.category}
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-muted/20 h-3 w-3 rounded-full"
                onClick={removeCategory}
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          )}

          {filters.contentType && (
            <Badge
              variant="secondary"
              className="hover:bg-secondary/80 flex items-center gap-1"
            >
              Type: {filters.contentType}
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-muted/20 h-3 w-3 rounded-full"
                onClick={removeContentType}
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          )}

          {filters.tags?.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="hover:bg-secondary/80 flex items-center gap-1"
            >
              #{tag}
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-muted/20 h-3 w-3 rounded-full"
                onClick={() => removeTag(tag)}
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          ))}

          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground ml-auto h-6 px-2 text-xs"
          >
            Clear all
          </Button>

          <div className="text-muted-foreground ml-2 text-xs">
            Showing {resultsCount} result{resultsCount !== 1 ? "s" : ""}
          </div>
        </div>
      )}

      {!hasActiveFilters && (
        <div className="text-muted-foreground px-1 text-xs">
          Showing {resultsCount} result{resultsCount !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
};
