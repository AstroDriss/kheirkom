"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { authContext } from "@/context/AuthProvider";
import { ChatWithUser, fetchUserChats } from "@/actions/chat";
import { formatDistanceToNow } from "date-fns";

interface Props {
  chatId?: number;
}

const ChatList = ({ chatId }: Props) => {
  const [chats, setChats] = useState<ChatWithUser[]>([]);
  const auth = use(authContext);
  const user = auth?.user;

  useEffect(() => {
    const loadChats = async () => {
      if (!user) return;
      const userChats = await fetchUserChats(user.id);
      setChats(userChats);
    };

    loadChats();
  }, [user]);

  return (
    <>
      <div className="p-4 bg-muted/50 border-b">
        <h2 className="text-lg font-semibold">Messages</h2>
      </div>
      <ul className="p-2 space-y-2">
        {chats.map((chat) => {
          const chatPartner =
            chat.user_1.id === user?.id ? chat.user_2 : chat.user_1;

          return (
            <li key={chat.id}>
              <Link
                href={`/app/chat/${chat.id}`}
                prefetch={false}
                className={`${
                  chatId === chat.id ? "bg-muted" : "bg-background"
                } block py-2 px-3 rounded-md`}
              >
                <h3 className="font-medium truncate">
                  {chatPartner.first_name}
                </h3>

                <p className="flex items-center justify-between">
                  <span className="text-muted-foreground truncate">
                    {chat.last_message}
                  </span>
                  {chat.last_message_at && (
                    <span className="text-xs text-muted-foreground shrink-0">
                      {formatDistanceToNow(chat.last_message_at, {
                        addSuffix: true,
                      })}
                    </span>
                  )}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ChatList;
