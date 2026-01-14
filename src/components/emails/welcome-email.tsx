import * as React from "react";

interface WelcomeEmailProps {
  confirmationUrl: string;
}

export function WelcomeEmail({ confirmationUrl }: WelcomeEmailProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ color: "#333" }}>Welcome to Eaysin's Blog!</h1>
      <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#666" }}>
        Thank you for subscribing to my blog. I'm excited to share my thoughts,
        experiences, and insights with you.
      </p>
      <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#666" }}>
        To complete your subscription, please confirm your email address by
        clicking the button below:
      </p>
      <div style={{ margin: "30px 0" }}>
        <a
          href={confirmationUrl}
          style={{
            backgroundColor: "#4F46E5",
            color: "#ffffff",
            padding: "12px 24px",
            textDecoration: "none",
            borderRadius: "6px",
            display: "inline-block",
          }}
        >
          Confirm Subscription
        </a>
      </div>
      <p style={{ fontSize: "14px", color: "#999" }}>
        If you didn't subscribe to this blog, you can safely ignore this email.
      </p>
      <hr
        style={{
          margin: "30px 0",
          border: "none",
          borderTop: "1px solid #eee",
        }}
      />
      <p style={{ fontSize: "12px", color: "#999" }}>
        © 2024 Eaysin Mia. All rights reserved.
      </p>
    </div>
  );
}
