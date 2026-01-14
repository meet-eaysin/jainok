"use client";

import { useState } from "react";

import { Search, SlidersHorizontal, X } from "lucide-react";

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
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryClick = (category: string) => {
    onFilterChange({
      ...filters,
      category: category === "all" ? undefined : category,
    });
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];

    onFilterChange({
      ...filters,
      tags: newTags.length > 0 ? newTags : undefined,
    });
  };

  const handleContentTypeChange = (type: string) => {
    onFilterChange({
      ...filters,
      contentType: type === "all" ? undefined : (type as ContentType),
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // Debounce search
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

  return (
    <div className="mb-12 space-y-4">
      {/* Search and Sort Row */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sort Dropdown */}
        <Select
          value={sortBy}
          onValueChange={(v) => onSortChange(v as SortOption)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="shortest">Shortest Read</SelectItem>
            <SelectItem value="longest">Longest Read</SelectItem>
          </SelectContent>
        </Select>

        {/* Toggle Filters Button (Mobile) */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Filters Section */}
      <div className={`space-y-4 ${showFilters ? "block" : "hidden sm:block"}`}>
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground text-sm font-medium">
            Category:
          </span>
          <Badge
            variant={!filters.category ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleCategoryClick("all")}
          >
            All
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={filters.category === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Content Type Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground text-sm font-medium">
            Type:
          </span>
          <Badge
            variant={!filters.contentType ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleContentTypeChange("all")}
          >
            All
          </Badge>
          <Badge
            variant={filters.contentType === "blog" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleContentTypeChange("blog")}
          >
            Blog
          </Badge>
          <Badge
            variant={
              filters.contentType === "case-study" ? "default" : "outline"
            }
            className="cursor-pointer"
            onClick={() => handleContentTypeChange("case-study")}
          >
            Case Study
          </Badge>
          <Badge
            variant={filters.contentType === "article" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleContentTypeChange("article")}
          >
            Article
          </Badge>
          <Badge
            variant={filters.contentType === "external" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleContentTypeChange("external")}
          >
            External
          </Badge>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground text-sm font-medium">
              Tags:
            </span>
            {tags.slice(0, 10).map((tag) => (
              <Badge
                key={tag}
                variant={filters.tags?.includes(tag) ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => handleTagToggle(tag)}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Active Filters & Results Count */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">
            Showing {resultsCount} {resultsCount === 1 ? "post" : "posts"}
          </span>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-auto p-1 text-xs"
            >
              <X className="mr-1 h-3 w-3" />
              Clear filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
