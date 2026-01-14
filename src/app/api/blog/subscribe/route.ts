import { NextRequest, NextResponse } from "next/server";

import crypto from "crypto";
import { Resend } from "resend";

import { WelcomeEmail } from "@/components/emails/welcome-email";
import connectDB from "@/lib/db";
import EmailSubscriber from "@/models/EmailSubscriber";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const existing = await EmailSubscriber.findOne({ email });
    if (existing) {
      if (existing.confirmed) {
        return NextResponse.json(
          { error: "Email already subscribed" },
          { status: 400 },
        );
      }
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      const confirmationUrl = `${siteUrl}/blog/confirm?token=${existing.confirmationToken}`;

      await resend.emails.send({
        from: "Eaysin's Blog <onboarding@resend.dev>",
        to: [email],
        subject: "Confirm your subscription to Eaysin's Blog",
        react: WelcomeEmail({ confirmationUrl }),
      });

      return NextResponse.json({
        success: true,
        message: "Confirmation email resent. Please check your inbox.",
      });
    }

    const confirmationToken = crypto.randomBytes(32).toString("hex");
    const unsubscribeToken = crypto.randomBytes(32).toString("hex");

    await EmailSubscriber.create({
      email,
      confirmationToken,
      unsubscribeToken,
      confirmed: false,
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const confirmationUrl = `${siteUrl}/blog/confirm?token=${confirmationToken}`;

    await resend.emails.send({
      from: "Eaysin's Blog <onboarding@resend.dev>",
      to: [email],
      subject: "Confirm your subscription to Eaysin's Blog",
      react: WelcomeEmail({ confirmationUrl }),
    });

    return NextResponse.json({
      success: true,
      message: "Subscription successful. Please check your email to confirm.",
    });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
