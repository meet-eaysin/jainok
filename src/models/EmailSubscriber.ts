import mongoose, { Schema, Model, Document } from "mongoose";

export interface IEmailSubscriber extends Document {
  email: string;
  confirmed: boolean;
  confirmationToken: string;
  subscribedAt: Date;
  confirmedAt?: Date;
  unsubscribeToken: string;
}

const emailSubscriberSchema = new Schema<IEmailSubscriber>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    confirmed: { type: Boolean, default: false },
    confirmationToken: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, default: Date.now },
    confirmedAt: Date,
    unsubscribeToken: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

const EmailSubscriber: Model<IEmailSubscriber> =
  mongoose.models.EmailSubscriber ||
  mongoose.model<IEmailSubscriber>("EmailSubscriber", emailSubscriberSchema);

export default EmailSubscriber;
