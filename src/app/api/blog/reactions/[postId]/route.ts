import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Reaction from "@/models/Reaction";

interface RouteParams {
  params: Promise<{
    postId: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { postId } = await params;

    // Aggregate reactions by emoji
    const reactions = await Reaction.aggregate([
      { $match: { postId } },
      {
        $group: {
          _id: "$emoji",
          count: { $sum: 1 },
        },
      },
    ]);

    // Convert to object format
    const reactionsObj: Record<string, number> = {};
    reactions.forEach((r) => {
      reactionsObj[r._id] = r.count;
    });

    return NextResponse.json({ reactions: reactionsObj });
  } catch (error) {
    console.error("Error fetching reactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch reactions" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { postId } = await params;
    const { emoji, action, sessionId } = await request.json();

    if (!emoji || !action || !sessionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (action === "add") {
      // Check if already reacted
      const existing = await Reaction.findOne({ postId, emoji, sessionId });
      if (existing) {
        return NextResponse.json({ error: "Already reacted" }, { status: 400 });
      }

      await Reaction.create({ postId, emoji, sessionId });
    } else if (action === "remove") {
      await Reaction.deleteOne({ postId, emoji, sessionId });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    // Return updated counts
    const reactions = await Reaction.aggregate([
      { $match: { postId } },
      {
        $group: {
          _id: "$emoji",
          count: { $sum: 1 },
        },
      },
    ]);

    const reactionsObj: Record<string, number> = {};
    reactions.forEach((r) => {
      reactionsObj[r._id] = r.count;
    });

    return NextResponse.json({ reactions: reactionsObj });
  } catch (error) {
    console.error("Error updating reaction:", error);
    return NextResponse.json(
      { error: "Failed to update reaction" },
      { status: 500 },
    );
  }
}
