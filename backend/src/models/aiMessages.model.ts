import mongoose, { Document } from "mongoose";

export interface IAIMessage extends Document {
  roomId: mongoose.Types.ObjectId;
  senderId: string;
  senderName: string;
  content: string;
  type: "ai";
  isAIChat: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const aiMessageSchema = new mongoose.Schema<IAIMessage>(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
      index: true, // faster queries by room
    },
    senderId: {
      type: String,
      default: "ai",
    },
    senderName: {
      type: String,
      default: "AIde",
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "ai",
      enum: ["ai"],
    },

    isAIChat: {
       type: Boolean,
       default: false,
    },
  },
  {
    timestamps: true,
    collection: "messages", // ✅ store in same collection as regular messages
  }
);

export const AIMessage = mongoose.model<IAIMessage>(
  "AIMessage",
  aiMessageSchema
);