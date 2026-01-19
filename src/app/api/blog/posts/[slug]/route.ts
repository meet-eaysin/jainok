import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/db";
import BlogPost from "@/models/BlogPost";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { slug } = await params;
    const post = await BlogPost.findOne({ slug }).lean();

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Increment view count
    await BlogPost.findOneAndUpdate({ slug }, { $inc: { views: 1 } });

    return NextResponse.json(post);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { slug: oldSlug } = await params;
    const body = await request.json();

    const apiKey = request.headers.get("x-api-key");
    const adminKey = process.env.ADMIN_API_KEY;

    if (adminKey && apiKey !== adminKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      title,
      slug: newSlug,
      date,
      category,
      tags,
      featured,
      status,
      excerpt,
      content,
      image,
      author,
    } = body;

    if (!title || !newSlug || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if post exists
    const existingPost = await BlogPost.findOne({ slug: oldSlug });
    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // If slug changed, check if new slug is available
    if (oldSlug !== newSlug) {
      const slugExists = await BlogPost.findOne({ slug: newSlug });
      if (slugExists) {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 409 },
        );
      }
    }

    // Calculate read time
    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.ceil(wordCount / 200)} min read`;

    // Update post
    const updatedPost = await BlogPost.findOneAndUpdate(
      { slug: oldSlug },
      {
        id: newSlug,
        slug: newSlug,
        title,
        excerpt: excerpt || "",
        content,
        category: category || "Uncategorized",
        tags: tags || [],
        date: date || existingPost.date,
        readTime,
        image: image || existingPost.image,
        featured: featured !== undefined ? featured : existingPost.featured,
        status: status || existingPost.status,
        author: author || existingPost.author,
      },
      { new: true },
    );

    return NextResponse.json({
      message: "Post updated successfully",
      slug: newSlug,
      post: updatedPost,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { slug } = await params;

    const apiKey = request.headers.get("x-api-key");
    const adminKey = process.env.ADMIN_API_KEY;

    if (adminKey && apiKey !== adminKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deletedPost = await BlogPost.findOneAndDelete({ slug });

    if (!deletedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 },
    );
  }
}
