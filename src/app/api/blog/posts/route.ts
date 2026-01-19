import { NextRequest, NextResponse } from "next/server";

import type { ContentType, SortOption } from "@/lib/blog-types";
import connectDB from "@/lib/db";
import BlogPost from "@/models/BlogPost";

interface BlogPostQuery {
  status?: string;
  category?: string;
  tags?: { $in: string[] };
  contentType?: ContentType;
  $or?: Array<{
    title?: { $regex: string; $options: string };
    excerpt?: { $regex: string; $options: string };
    content?: { $regex: string; $options: string };
  }>;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const tags = searchParams.get("tags")?.split(",").filter(Boolean);
    const contentType = searchParams.get("contentType") as ContentType | null;
    const searchQuery = searchParams.get("search");
    const sortBy = (searchParams.get("sortBy") as SortOption) || "newest";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status") || "published";

    const query: BlogPostQuery = { status };

    if (category) {
      query.category = category;
    }

    if (tags && tags.length > 0) {
      query.tags = { $in: tags };
    }

    if (contentType) {
      query.contentType = contentType;
    }

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { excerpt: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ];
    }

    let sortConfig: Record<string, 1 | -1> = { date: -1 };

    switch (sortBy) {
      case "newest":
        sortConfig = { date: -1 };
        break;
      case "oldest":
        sortConfig = { date: 1 };
        break;
      case "shortest":
        sortConfig = { readTime: 1 };
        break;
      case "longest":
        sortConfig = { readTime: -1 };
        break;
    }

    const total = await BlogPost.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    const posts = await BlogPost.find(query)
      .sort(sortConfig)
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      posts,
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
    await connectDB();

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
      tags,
      featured,
      status,
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

    const existingPost = await BlogPost.findOne({ slug });
    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 },
      );
    }

    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.ceil(wordCount / 200)} min read`;

    const newPost = await BlogPost.create({
      id: slug,
      slug,
      title,
      excerpt: excerpt || "",
      content,
      category: category || "Uncategorized",
      tags: tags || [],
      date: date || new Date().toISOString().split("T")[0],
      readTime,
      image: image || "/images/blog/placeholder.jpg",
      featured: featured || false,
      status: status || "draft",
      author,
      authorImage: "",
      contentType: "blog",
      views: 0,
    });

    return NextResponse.json(
      { message: "Post created successfully", slug, post: newPost },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    );
  }
}
