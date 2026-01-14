import mongoose, { Schema, Model, Document } from "mongoose";

export interface IReaction extends Document {
  postId: string;
  emoji: string;
  sessionId: string;
  createdAt: Date;
}

const reactionSchema = new Schema<IReaction>(
  {
    postId: { type: String, required: true, index: true },
    emoji: { type: String, required: true },
    sessionId: { type: String, required: true, index: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: false,
  },
);

reactionSchema.index({ postId: 1, sessionId: 1 });

const Reaction: Model<IReaction> =
  mongoose.models.Reaction ||
  mongoose.model<IReaction>("Reaction", reactionSchema);

export default Reaction;
