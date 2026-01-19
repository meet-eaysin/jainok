import { NextRequest, NextResponse } from "next/server";

import { getAllPostsFromFiles } from "@/lib/blog-server";
import connectDB from "@/lib/db";
import EmailSubscriber from "@/models/EmailSubscriber";

function isAuthenticated(request: NextRequest) {
  const authHeader = request.headers.get("x-api-key");
  return authHeader === process.env.ADMIN_API_KEY;
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const postsCount = getAllPostsFromFiles().length;
    const subscribersCount = await EmailSubscriber.countDocuments();

    const totalViews = 0;

    return NextResponse.json({
      posts: postsCount,
      subscribers: subscribersCount,
      views: totalViews,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
