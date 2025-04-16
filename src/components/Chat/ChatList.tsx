"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { authContext } from "@/context/AuthProvider";
import { ChatWithUser, fetchUserChats } from "@/actions/chat";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "../ui/skeleton";

interface Props {
  chatId?: number;
}

const ChatList = ({ chatId }: Props) => {
  const [chats, setChats] = useState<ChatWithUser[]>([]);
  const auth = use(authContext);
  const user = auth?.user;
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadChats = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const userChats = await fetchUserChats(user.id);
        setChats(userChats);
      } catch {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, [user]);

  return (
    <>
      <div className="p-4 bg-muted/50 border-b">
        <h2 className="text-lg font-semibold">Messages</h2>
      </div>

      {isError && <p>Error Loading the Chat</p>}

      {!isError && chats.length === 0 && !loading && (
        <p>You Haven&apos;t Started Any conversation</p>
      )}

      {loading && <SkeletonChatList />}

      <ul className="p-2 space-y-2">
        {chats.map((chat) => {
          const chatPartner =
            chat.user_1.id === user?.id ? chat.user_2 : chat.user_1;

          const read = chat.chat_reads?.find((r) => r.user_id === user?.id);

          const has_unread =
            (!read ||
              !chat.last_message_at ||
              new Date(chat.last_message_at) > new Date(read.last_read_at)) &&
            chat.last_message_sender_id !== user?.id;

          return (
            <li key={chat.id}>
              <Link
                href={`/app/chat/${chat.id}`}
                prefetch={false}
                className={`${
                  chatId === chat.id ? "bg-muted" : "bg-background"
                } block py-2 px-3 rounded-md`}
              >
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="font-medium truncate">
                    {chatPartner.first_name}
                  </h3>

                  {has_unread && chatId !== chat.id && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>

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
      {chats.length === 30 && (
        <p className="text-muted-foreground text-center text-sm mt-4">
          Only 30 chats are shown
        </p>
      )}
    </>
  );
};

function SkeletonChatList({ count = 10 }) {
  return (
    <ul className="p-2 space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <div className="block py-2 px-3 rounded-md bg-background">
            <div className="flex items-center justify-between gap-2 mb-1">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="w-2 h-2 rounded-full" />
            </div>
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ChatList;
