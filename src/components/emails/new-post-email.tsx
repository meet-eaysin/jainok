import * as React from "react";

interface NewPostEmailProps {
  postTitle: string;
  postExcerpt: string;
  postUrl: string;
  unsubscribeUrl: string;
}

export function NewPostEmail({
  postTitle,
  postExcerpt,
  postUrl,
  unsubscribeUrl,
}: NewPostEmailProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ color: "#333" }}>New Post: {postTitle}</h1>
      <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#666" }}>
        {postExcerpt}
      </p>
      <div style={{ margin: "30px 0" }}>
        <a
          href={postUrl}
          style={{
            backgroundColor: "#4F46E5",
            color: "#ffffff",
            padding: "12px 24px",
            textDecoration: "none",
            borderRadius: "6px",
            display: "inline-block",
          }}
        >
          Read Full Post
        </a>
      </div>
      <hr
        style={{
          margin: "30px 0",
          border: "none",
          borderTop: "1px solid #eee",
        }}
      />
      <p style={{ fontSize: "12px", color: "#999" }}>
        You're receiving this because you subscribed to Eaysin's Blog.
        <br />
        <a href={unsubscribeUrl} style={{ color: "#999" }}>
          Unsubscribe
        </a>
      </p>
    </div>
  );
}
