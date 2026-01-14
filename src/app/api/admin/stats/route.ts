import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import EmailSubscriber from "@/models/EmailSubscriber";
import Reaction from "@/models/Reaction";

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

    const [postsCount, subscribersCount, reactionsCount, viewsData] =
      await Promise.all([
        BlogPost.countDocuments(),
        EmailSubscriber.countDocuments(),
        Reaction.countDocuments(),
        BlogPost.aggregate([
          { $group: { _id: null, totalViews: { $sum: "$views" } } },
        ]),
      ]);

    const totalViews = viewsData.length > 0 ? viewsData[0].totalViews : 0;

    return NextResponse.json({
      posts: postsCount,
      subscribers: subscribersCount,
      reactions: reactionsCount,
      views: totalViews,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
