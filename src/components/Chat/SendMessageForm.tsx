"use client";
import { sendMessage } from "@/actions/chat";
import { useState } from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { Input } from "../ui/input";

export default function SendMessageForm({
  chatId,
  userId,
}: {
  chatId: number;
  userId: string;
}) {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (message.trim()) {
      await sendMessage(chatId, userId, message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSend} className="flex gap-2 bg-background p-2 ">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1"
        aria-label="type a message"
        placeholder="Type a message..."
      />
      <Button size="icon">
        <Send className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
