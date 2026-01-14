import { NextRequest, NextResponse } from "next/server";

import type { SortOption, ContentType } from "@/lib/blog-types";
import { filterPosts, sortPosts } from "@/lib/blog-utils";
import connectDB from "@/lib/db";
import BlogPost from "@/models/BlogPost";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const tags = searchParams.get("tags")?.split(",").filter(Boolean);
    const contentType = searchParams.get("contentType");
    const searchQuery = searchParams.get("search");
    const sortBy = (searchParams.get("sortBy") as SortOption) || "newest";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Fetch all posts from database
    const allPosts = await BlogPost.find({}).lean();

    // Apply filters using existing utility functions
    let filteredPosts = filterPosts(allPosts, {
      category: category || undefined,
      tags: tags || undefined,
      contentType: (contentType as ContentType) || undefined,
      searchQuery: searchQuery || undefined,
    });

    // Apply sorting
    filteredPosts = sortPosts(filteredPosts, sortBy);

    // Apply pagination
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
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Check for API Key in headers for basic security
    const apiKey = request.headers.get("x-api-key");
    const adminKey = process.env.ADMIN_API_KEY;

    // Only enforce if ADMIN_API_KEY is set in env
    if (adminKey && apiKey !== adminKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await BlogPost.create(body);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    );
  }
}
