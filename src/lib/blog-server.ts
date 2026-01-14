// Server-side only utilities for blog posts (uses fs)
import fs from "fs";
import matter from "gray-matter";
import path from "path";

import type { BlogPost } from "@/lib/blog-types";

const postsDirectory = path.join(process.cwd(), "src/data/posts");

export function getAllPostsFromFiles(): BlogPost[] {
  // Check if posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        id: slug,
        slug,
        title: data.title || "",
        excerpt: data.excerpt || "",
        content,
        category: data.category || "",
        date: data.date || "",
        readTime: data.readTime || calculateReadingTime(content),
        image: data.image || "",
        featured: data.featured || false,
        tags: data.tags || [],
        author: data.author || "Eaysin Mia",
        authorImage: data.authorImage || "",
        contentType: data.contentType || "blog",
        externalUrl: data.externalUrl || "",
        platform: data.platform || "",
        relatedPosts: data.relatedPosts || [],
        seo: data.seo || {},
      } as BlogPost;
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlugFromFiles(slug: string): BlogPost | null {
  const posts = getAllPostsFromFiles();
  return posts.find((post) => post.slug === slug) || null;
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
