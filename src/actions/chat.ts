"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export type ChatWithUser = {
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

export const getChatId = async (user1: string, user2: string) => {
  const supabase = await createClient();

  const { data: chat, error } = await supabase
    .from("chats")
    .select("id")
    .or(
      `and(user_1.eq.${user1},user_2.eq.${user2}),and(user_1.eq.${user2},user_2.eq.${user1})`
    )
    .single();

  console.log(chat, error);
  if (error && error.code !== "PGRST116") return { error: error.message };

  if (chat?.id) redirect(`/app/chat/${chat.id}`);

  const { data: newChat, error: insertionError } = await supabase
    .from("chats")
    .insert({ user_1: user1, user_2: user2 })
    .select("id")
    .single();

  if (insertionError) return { error: insertionError.message };

  redirect(`/app/chat/${newChat.id}`);
};

export const fetchMessages = async (chatId: number, beforeTime?: string) => {
  const supabase = await createClient();

  const query = supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  if (beforeTime) {
    query.lt("created_at", beforeTime);
  }

  const { data, error } = await query;
  if (error) return { error };

  return { data };
};

export const sendMessage = async (
  chat_id: number,
  sender_id: string,
  content: string
) => {
  const supabase = await createClient();

  const { error } = await supabase.from("messages").insert([
    {
      chat_id,
      sender_id,
      content,
    },
  ]);

  if (error) console.error("Error sending message:", error);
};

export const fetchUserChats = async (user_id: string) => {
  "use server";
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("chats")
    .select(
      "id, last_message, last_message_at,user_1:users!user_1(id, first_name, profile_image), user_2:users!user_2(id, first_name, profile_image)"
    )
    .or(`user_1.eq.${user_id},user_2.eq.${user_id}`);

  if (error) return [];
  return data;
};

export const fetchChatById = async (chatId: number) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("chats")
    .select(
      "id, last_message, last_message_at,user_1:users!user_1(id, first_name, profile_image), user_2:users!user_2(id, first_name, profile_image)"
    )
    .eq("id", chatId)
    .single();

  if (error) return null;
  return data;
};
