"use client";
import { ChatWithUser, fetchChatById } from "@/actions/chat";
import { authContext } from "@/context/AuthProvider";
import { use, useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  chatId?: number;
}

const ChatInfo = ({ chatId }: Props) => {
  const user = use(authContext);
  const [chat, setChat] = useState<ChatWithUser | null>(null);

  useEffect(() => {
    const fetchChat = async () => {
      if (!chatId) return;
      const data = await fetchChatById(chatId);
      if (data) setChat(data);
    };
    fetchChat();
  }, []);

  if (!chat) return;
  const chatPartner = chat.user_1.id === user?.id ? chat.user_2 : chat.user_1;

  return (
    <div className="bg-background p-3 flex gap-3 items-center border-b">
      <Button asChild variant="ghost" className="md:hidden">
        <Link href="/app/chat">
          <ChevronLeft />
          Chat
        </Link>
      </Button>

      <Avatar>
        <AvatarImage src={chatPartner.profile_image || ""} alt="Profile" />
        <AvatarFallback>{chatPartner.first_name.charAt(0)}</AvatarFallback>
      </Avatar>
      <h2>
        <Link
          href={`/app/profile/${chatPartner.id}`}
          className="text-2xl font-semibold"
        >
          {chatPartner.first_name}
        </Link>
      </h2>
    </div>
  );
};

export default ChatInfo;
