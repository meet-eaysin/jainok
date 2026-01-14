import mongoose, { Schema, Model, Document, Types } from "mongoose";

export interface IComment extends Document {
  postId: string;
  author: string;
  email: string;
  content: string;
  parentId?: Types.ObjectId;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    postId: { type: String, required: true, index: true },
    author: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    content: { type: String, required: true },
    parentId: { type: Schema.Types.ObjectId, ref: "Comment" },
    approved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

commentSchema.index({ postId: 1, approved: 1 });
commentSchema.index({ parentId: 1 });

const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
