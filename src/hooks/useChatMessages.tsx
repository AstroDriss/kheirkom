"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Tables } from "../../database.types";
import { updateChatRead } from "@/actions/chat";

const supabase = createClient();

export function useChatMessages(chatId: number | null, userId?: string) {
  const [messages, setMessages] = useState<Tables<"messages">[]>([]);

  useEffect(() => {
    if (!chatId) return;

    const channel = supabase
      .channel(`chat:${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          const messages = payload.new as Tables<"messages">;
          setMessages((prev) => [...prev, messages]);

          if (messages.sender_id !== userId) {
            updateChatRead(chatId, userId);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId, userId]);

  return messages;
}
