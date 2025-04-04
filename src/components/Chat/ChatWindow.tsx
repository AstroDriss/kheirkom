"use client";
import { fetchMessages } from "@/actions/chat";
import { useChatMessages } from "@/hooks/useChatMessages";
import { use, useEffect, useState } from "react";
import SendMessageForm from "./SendMessageForm";
import { authContext } from "@/context/AuthProvider";
import { Tables } from "../../../database.types";
import { notFound } from "next/navigation";
import { ChatMessage } from "./ChatMessage";

interface Props {
  chatId: number | null;
}

export default function ChatWindow({ chatId }: Props) {
  const realTimeMessages = useChatMessages(chatId);
  const [initialMessages, setInitialMessages] = useState<Tables<"messages">[]>(
    []
  );
  const user = use(authContext);

  useEffect(() => {
    if (!chatId) return;

    const getMessages = async () => {
      const { data: messages, error } = await fetchMessages(chatId);

      if (error) return notFound();

      setInitialMessages(messages);
    };
    getMessages();
  }, [chatId]);

  const allMessages = [...initialMessages, ...realTimeMessages];

  if (!chatId)
    return (
      <div className="h-[89vh] flex items-center justify-center">
        No Chat selected
      </div>
    );

  return (
    <div className="h-[89vh] flex flex-col p-3">
      <div className="overflow-y-auto gap-3 py-3 px-1 flex-1 flex flex-col">
        <div className="mt-auto" />

        {allMessages.map((msg) => (
          <ChatMessage
            key={msg.id}
            isFromUser={user?.id === msg.sender_id}
            content={msg.content}
          />
        ))}
      </div>
      {user && <SendMessageForm chatId={chatId} userId={user.id} />}
    </div>
  );
}
