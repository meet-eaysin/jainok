import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/db";
import EmailSubscriber from "@/models/EmailSubscriber";

// Helper to validate request
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
    const subscribers = await EmailSubscriber.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ subscribers });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 },
    );
  }
}
