// Type definitions for blog posts
export type ContentType = "blog" | "case-study" | "article" | "external";

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export interface BlogPost {
  // Core fields
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;

  // Enhanced metadata
  tags: string[];
  author: string;
  authorImage?: string;
  contentType: ContentType;
  externalUrl?: string;
  platform?: string;
  relatedPosts?: string[];

  // SEO metadata
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

export interface FilterOptions {
  category?: string;
  tags?: string[];
  contentType?: ContentType;
  searchQuery?: string;
}

export type SortOption = "newest" | "oldest" | "shortest" | "longest";
