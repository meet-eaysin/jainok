import { NextRequest, NextResponse } from "next/server";

import fs from "fs";
import path from "path";

import { getPostBySlugFromFiles } from "@/lib/blog-server";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const post = getPostBySlugFromFiles(slug);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    const apiKey = request.headers.get("x-api-key");
    const adminKey = process.env.ADMIN_API_KEY;

    if (adminKey && apiKey !== adminKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const filePath = path.join(process.cwd(), "src/data/posts", `${slug}.md`);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ message: "Post deleted successfully" });
    } else {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 },
    );
  }
}
