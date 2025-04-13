"use client";
import { createClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function useHasUnreadChats() {
  const [hasUnread, setHasUnread] = useState(false);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    const supabaseClient = createClient();
    setSupabase(supabaseClient);
  }, []);

  useEffect(() => {
    if (!supabase) return;

    const fetchUnread = async () => {
      if (!supabase) return;
      const { data, error } = await supabase.rpc("get_unread_chats");

      if (error) {
        console.error("Error fetching unread chats:", error);
        return;
      }

      setHasUnread((data?.length ?? 0) > 0);
    };

    fetchUnread();

    const channel = supabase
      .channel("chat-global")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        fetchUnread
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return hasUnread;
}
