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

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
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
      excerpt,
      content,
      image,
      author = "Eaysin Mia",
    } = body;

    if (!title || !newSlug || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const oldFilePath = path.join(
      process.cwd(),
      "src/data/posts",
      `${oldSlug}.md`,
    );
    const newFilePath = path.join(
      process.cwd(),
      "src/data/posts",
      `${newSlug}.md`,
    );

    if (oldSlug !== newSlug) {
      if (fs.existsSync(newFilePath)) {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 409 },
        );
      }
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    const fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date || new Date().toISOString().split("T")[0]}"
category: "${category || "Uncategorized"}"
tags: [${(tags || []).map((t: string) => `"${t}"`).join(", ")}]
featured: ${featured || false}
excerpt: "${(excerpt || "").replace(/"/g, '\\"')}"
image: "${image || "/images/blog/placeholder.jpg"}"
author: "${author}"
---

${content}
`;

    const dir = path.dirname(newFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(newFilePath, fileContent, "utf8");

    return NextResponse.json({
      message: "Post updated successfully",
      slug: newSlug,
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
