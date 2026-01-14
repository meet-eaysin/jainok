// Client-safe blog utilities (no fs usage)
import type {
  BlogPost,
  FilterOptions,
  SortOption,
  TOCItem,
  ContentType,
} from "./blog-types";

export type { BlogPost, FilterOptions, SortOption, TOCItem, ContentType };

// Filter posts based on multiple criteria
export function filterPosts(
  posts: BlogPost[],
  filters: FilterOptions,
): BlogPost[] {
  let filtered = [...posts];

  // Filter by category
  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter(
      (post) => post.category.toLowerCase() === filters.category?.toLowerCase(),
    );
  }

  // Filter by tags
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter((post) =>
      filters.tags?.some((tag) =>
        post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()),
      ),
    );
  }

  // Filter by content type
  if (filters.contentType) {
    filtered = filtered.filter(
      (post) => post.contentType === filters.contentType,
    );
  }

  // Filter by search query
  if (filters.searchQuery && filters.searchQuery.trim() !== "") {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }

  return filtered;
}

// Sort posts by different criteria
export function sortPosts(posts: BlogPost[], sortBy: SortOption): BlogPost[] {
  const sorted = [...posts];

  switch (sortBy) {
    case "newest":
      return sorted.sort((a, b) => (a.date < b.date ? 1 : -1));
    case "oldest":
      return sorted.sort((a, b) => (a.date > b.date ? 1 : -1));
    case "shortest":
      return sorted.sort((a, b) => {
        const aMinutes = parseInt(a.readTime) || 0;
        const bMinutes = parseInt(b.readTime) || 0;
        return aMinutes - bMinutes;
      });
    case "longest":
      return sorted.sort((a, b) => {
        const aMinutes = parseInt(a.readTime) || 0;
        const bMinutes = parseInt(b.readTime) || 0;
        return bMinutes - aMinutes;
      });
    default:
      return sorted;
  }
}

// Get related posts based on tags and category
export function getRelatedPosts(
  post: BlogPost,
  allPosts: BlogPost[],
  limit = 3,
): BlogPost[] {
  // First check if post has explicit related posts
  if (post.relatedPosts && post.relatedPosts.length > 0) {
    return allPosts
      .filter((p) => post.relatedPosts?.includes(p.id))
      .slice(0, limit);
  }

  // Otherwise, find posts with matching tags or category
  const related = allPosts
    .filter((p) => p.id !== post.id)
    .map((p) => {
      let score = 0;
      // Same category gets 1 point
      if (p.category === post.category) score += 1;
      // Each matching tag gets 2 points
      const matchingTags = p.tags.filter((tag) => post.tags.includes(tag));
      score += matchingTags.length * 2;
      return { post: p, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);

  return related;
}

// Helper to slugify text like github-slugger
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars (except spaces and hyphens)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim();
}

// Generate table of contents from markdown content
export function generateTableOfContents(content: string): TOCItem[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const toc: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = slugify(title);

    toc.push({ id, title, level });
  }

  return toc;
}

// Calculate reading time from content
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// Get all unique tags across all posts
export function getAllTags(posts: BlogPost[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

// Get all unique categories
export function getAllCategories(posts: BlogPost[]): string[] {
  const categorySet = new Set<string>();
  posts.forEach((post) => {
    if (post.category) categorySet.add(post.category);
  });
  return Array.from(categorySet).sort();
}

// Get posts by specific tag
export function getPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return posts.filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()),
  );
}

// Get posts by category
export function getPostsByCategory(
  posts: BlogPost[],
  category: string,
): BlogPost[] {
  return posts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase(),
  );
}

// Group posts by year
export function groupPostsByYear(
  posts: BlogPost[],
): Record<string, BlogPost[]> {
  const grouped: Record<string, BlogPost[]> = {};

  posts.forEach((post) => {
    // Assuming date is in a format parseable by Date, or stick to simple string check if strict
    // We'll trust new Date(post.date) works as the existing code uses it.
    const d = new Date(post.date);
    const year = isNaN(d.getFullYear())
      ? "Unknown"
      : d.getFullYear().toString();

    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(post);
  });

  return grouped;
}
