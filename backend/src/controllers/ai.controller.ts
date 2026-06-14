// controllers/ai.controller.ts
import { Request, Response } from "express";
import Groq from "groq-sdk";
import { AIMessage } from "../models/aiMessages.model";
import { Env } from "../config/env.config";
import {
  emitAIStreamToken,
  emitAIStreamDone,
  emitAIStreamError,
  emitAIMessage,
} from "../lib/socket";

const groq = new Groq({ apiKey: Env.ANTHROPIC_API_KEY });

interface ConversationMessage {
  senderId: string;
  content: string;
}

export const streamAIResponse = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { messages, roomId, conversationHistory = [] } = req.body as {
    messages: string;
    roomId: string;
    conversationHistory: ConversationMessage[];
  };

  if (!messages?.trim() || !roomId) {
    res.status(400).json({ error: "messages and roomId are required" });
    return;
  }

  const history = conversationHistory.map((msg) => ({
    role: (msg.senderId === "ai" ? "assistant" : "user") as
      | "user"
      | "assistant",
    content: msg.content,
  }));

  res.status(200).json({ status: "streaming" });

  let fullResponse = "";

  try {
    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are AIde, a helpful assistant inside a real-time messenger app. Be concise, friendly, and conversational.",
        },
        ...history,
        { role: "user", content: messages },
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const token = chunk.choices[0]?.delta?.content || "";
      if (token) {
        fullResponse += token;
        emitAIStreamToken(roomId, token);
      }
    }

    emitAIStreamDone(roomId);

    const aiMessage = await AIMessage.create({
      roomId,
      senderId: "ai",
      senderName: "AIde",
      content: fullResponse,
      type: "ai",
    });

    emitAIMessage(roomId, aiMessage);
  } catch (error) {
    console.error("AI stream error:", error);
    emitAIStreamError(roomId, "AIde failed to respond. Please try again.");
  }
};