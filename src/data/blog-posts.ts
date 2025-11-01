// Re-export from blog-utils for backward compatibility
export type { BlogPost } from "@/lib/blog-utils";
import { getAllPosts, getPostBySlug, getFeaturedPosts } from "@/lib/blog-utils";
export { getAllPosts, getPostBySlug, getFeaturedPosts };

// For backward compatibility, export blogPosts as a getter function
export const blogPosts = getAllPosts();
