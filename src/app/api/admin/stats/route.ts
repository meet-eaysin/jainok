import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import EmailSubscriber from "@/models/EmailSubscriber";

interface StatsResponse {
  totalPosts: number;
  totalSubscribers: number;
  totalViews: number;
  publishedPosts: number;
  draftPosts: number;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const apiKey = request.headers.get("x-api-key");
    const adminKey = process.env.ADMIN_API_KEY;

    if (adminKey && apiKey !== adminKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [totalPosts, totalSubscribers, publishedPosts, draftPosts, viewsAgg] =
      await Promise.all([
        BlogPost.countDocuments(),
        EmailSubscriber.countDocuments(),
        BlogPost.countDocuments({ status: "published" }),
        BlogPost.countDocuments({ status: "draft" }),
        BlogPost.aggregate([
          { $group: { _id: null, totalViews: { $sum: "$views" } } },
        ]),
      ]);

    const totalViews = viewsAgg[0]?.totalViews || 0;

    const stats: StatsResponse = {
      totalPosts,
      totalSubscribers,
      totalViews,
      publishedPosts,
      draftPosts,
    };

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
