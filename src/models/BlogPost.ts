import mongoose, { Schema, Model } from "mongoose";

import type { BlogPost as BlogPostType } from "@/lib/blog-types";

const blogPostSchema = new Schema<BlogPostType>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    date: { type: String, required: true },
    readTime: { type: String, required: true },
    image: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    author: { type: String, required: true },
    authorImage: { type: String, default: "" },
    contentType: {
      type: String,
      enum: ["blog", "case-study", "article", "external"],
      default: "blog",
    },
    externalUrl: { type: String, default: "" },
    platform: { type: String, default: "" },
    views: { type: Number, default: 0 },
    relatedPosts: [{ type: String }],
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
      ogImage: String,
    },
  },
  {
    timestamps: true,
  },
);

blogPostSchema.index({ category: 1 });
blogPostSchema.index({ tags: 1 });
blogPostSchema.index({ contentType: 1 });
blogPostSchema.index({ status: 1 });
blogPostSchema.index({ date: -1 });

const BlogPost: Model<BlogPostType> =
  mongoose.models.BlogPost ||
  mongoose.model<BlogPostType>("BlogPost", blogPostSchema);

export default BlogPost;
