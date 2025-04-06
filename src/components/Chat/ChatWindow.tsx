"use client";
import { fetchMessages } from "@/actions/chat";
import { useChatMessages } from "@/hooks/useChatMessages";
import { use, useEffect, useState } from "react";
import SendMessageForm from "./SendMessageForm";
import { authContext } from "@/context/AuthProvider";
import { Tables } from "../../../database.types";
import { notFound } from "next/navigation";
import { ChatMessage } from "./ChatMessage";
import AlwaysScrollIntoView from "../AlwaysScrollIntoView";

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
      <div className="h-full flex items-center justify-center">
        No Chat selected
      </div>
    );

  return (
    <>
      <div className="overflow-y-auto flex flex-col gap-3 p-3 bg-background">
        <div className="mt-auto" />

        {allMessages.map((msg) => (
          <ChatMessage
            key={msg.id}
            isFromUser={user?.id === msg.sender_id}
            content={msg.content}
          />
        ))}

        <AlwaysScrollIntoView />
      </div>

      {user && <SendMessageForm chatId={chatId} userId={user.id} />}
    </>
  );
}
