"use client";
import { fetchMessages, updateChatRead } from "@/actions/chat";
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
  const auth = use(authContext);
  const user = auth?.user;
  const realTimeMessages = useChatMessages(chatId, user?.id);
  const [initialMessages, setInitialMessages] = useState<Tables<"messages">[]>(
    []
  );

  useEffect(() => {
    if (!chatId) return;

    const getMessages = async () => {
      const { data: messages, error } = await fetchMessages(chatId);

      if (error) return notFound();
      await updateChatRead(chatId, user?.id);

      setInitialMessages(messages);
    };
    getMessages();
  }, [chatId]);

  const allMessages = [...initialMessages, ...realTimeMessages];

  if (!chatId)
    return (
      <div className="h-full flex items-center justify-center">
        No Chat Selected
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
            message={msg}
          />
        ))}

        <AlwaysScrollIntoView />
      </div>

      {user && <SendMessageForm chatId={chatId} userId={user.id} />}
    </>
  );
}
