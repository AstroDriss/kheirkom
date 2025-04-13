"use client";
import { useHasUnreadChats } from "@/hooks/useHasUnreadChat";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export const ChatLink = () => {
  const hasUnread = useHasUnreadChats();

  return (
    <Link href="/chats" className="relative">
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">Messages</span>
      {hasUnread && (
        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
      )}
    </Link>
  );
};
