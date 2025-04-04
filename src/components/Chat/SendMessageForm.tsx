"use client";
import { sendMessage } from "@/actions/chat";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

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
    <div className="flex gap-2 bg-white">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1"
        placeholder="Type a message..."
      />
      <Button onClick={handleSend}>
        <Send />
        Send
      </Button>
    </div>
  );
}
