"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { authContext } from "@/context/AuthProvider";
import { ChatWithUser, fetchUserChats } from "@/actions/chat";

interface Props {
  chatId?: number;
}

const ChatList = ({ chatId }: Props) => {
  const [chats, setChats] = useState<ChatWithUser[]>([]);
  const user = use(authContext);

  useEffect(() => {
    const loadChats = async () => {
      if (!user) return;
      const userChats = await fetchUserChats(user.id);
      setChats(userChats);
    };

    loadChats();
  }, [user]);

  return (
    <ul>
      {chats.map((chat) => {
        const chatPartner =
          chat.user_1.id === user?.id ? chat.user_2 : chat.user_1;

        return (
          <li key={chat.id}>
            <Link
              href={`/app/chat/${chat.id}`}
              className={`${
                chatId === chat.id ? "bg-white" : "bg-accent"
              } block p-2`}
            >
              {chatPartner.first_name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ChatList;
