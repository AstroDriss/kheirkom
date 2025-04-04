"use client";
import { use, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { authContext } from "@/context/AuthProvider";
import { fetchUserChats } from "@/actions/chat";

interface Props {
  chatId?: number;
}

type ChatWithUser = {
  id: number;
  last_message: string | null;
  last_message_at: string | null;
  user_1: {
    id: string;
    first_name: string;
    profile_image: string | null;
  };
  user_2: {
    id: string;
    first_name: string;
    profile_image: string | null;
  };
};

const ChatList = ({ chatId }: Props) => {
  const [chats, setChats] = useState<ChatWithUser[]>([]);
  const user = use(authContext);

  useEffect(() => {
    const loadChats = async () => {
      if (!user) return;
      const userChats = await fetchUserChats(user.id);
      console.log(userChats);
      setChats(userChats);
    };

    loadChats();
  }, [user]);

  console.log(chats);

  return (
    <ul>
      {chats.map((chat) => {
        const chatPartner =
          chat.user_1.id === user?.id ? chat.user_2 : chat.user_1;

        return (
          <li key={chat.id}>
            <Button variant="ghost" asChild>
              <Link
                href={`/app/chat/${chat.id}`}
                className={`${chatId === chat.id ? "bg-gray-200" : ""} w-full`}
              >
                {chatPartner.first_name}
              </Link>
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default ChatList;
