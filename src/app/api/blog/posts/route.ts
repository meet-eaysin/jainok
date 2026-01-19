import { NextRequest, NextResponse } from "next/server";

import fs from "fs";
import path from "path";

import { getAllPostsFromFiles } from "@/lib/blog-server";
import type { SortOption, ContentType } from "@/lib/blog-types";
import { filterPosts, sortPosts } from "@/lib/blog-utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const tags = searchParams.get("tags")?.split(",").filter(Boolean);
    const contentType = searchParams.get("contentType");
    const searchQuery = searchParams.get("search");
    const sortBy = (searchParams.get("sortBy") as SortOption) || "newest";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const allPosts = getAllPostsFromFiles();

    let filteredPosts = filterPosts(allPosts, {
      category: category || undefined,
      tags: tags || undefined,
      contentType: (contentType as ContentType) || undefined,
      searchQuery: searchQuery || undefined,
    });

    filteredPosts = sortPosts(filteredPosts, sortBy);

    const total = filteredPosts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      posts: paginatedPosts,
      total,
      page,
      totalPages,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const apiKey = request.headers.get("x-api-key");
    const adminKey = process.env.ADMIN_API_KEY;

    if (adminKey && apiKey !== adminKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      title,
      slug,
      date,
      category,
      excerpt,
      content,
      image,
      author = "Eaysin Mia",
    } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const fileContent = `---
      title: "${title.replace(/"/g, '\\"')}"
      date: "${date || new Date().toISOString().split("T")[0]}"
      category: "${category || "Uncategorized"}"
      excerpt: "${(excerpt || "").replace(/"/g, '\\"')}"
      image: "${image || "/images/blog/placeholder.jpg"}"
      author: "${author}"
      ---

      ${content}
    `;

    const filePath = path.join(process.cwd(), "src/data/posts", `${slug}.md`);

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, fileContent, "utf8");

    return NextResponse.json(
      { message: "Post created successfully", slug },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    );
  }
}
