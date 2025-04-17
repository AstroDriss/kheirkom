"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const getChatId = async (user1: string, user2: string) => {
  const supabase = await createClient();

  const { data: chat, error } = await supabase
    .from("chats")
    .select("id")
    .or(
      `and(user_1.eq.${user1},user_2.eq.${user2}),and(user_1.eq.${user2},user_2.eq.${user1})`
    )
    .single();

  if (error && error.code !== "PGRST116") return { error: error.message };

  if (chat?.id) return redirect(`/app/chat/${chat.id}`);

  const { data: newChat, error: insertionError } = await supabase
    .from("chats")
    .insert({ user_1: user1, user_2: user2 })
    .select("id")
    .single();

  if (insertionError) return { error: insertionError.message };

  await updateChatReadsForNewChat(newChat.id, [user1, user2]);

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
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("chats")
    .select(
      "id, last_message, last_message_sender_id, last_message_at, chat_reads!left(chat_id, user_id, last_read_at),user_1:users!user_1(id, first_name, profile_image), user_2:users!user_2(id, first_name, profile_image)"
    )
    .or(`user_1.eq.${user_id},user_2.eq.${user_id}`)
    .order("last_message_at", {
      ascending: false,
    })
    .limit(30);

  console.log({ data, error });
  // const from = offset * PAGE_COUNT
  // const to = from + PAGE_COUNT - 1

  if (error) return [];
  return data;
};
export type ChatWithUser = NonNullable<
  Awaited<ReturnType<typeof fetchUserChats>>[0]
>;

export const updateChatReadsForNewChat = async (
  chat_id: number,
  user_ids: [string, string]
) => {
  const supabase = await createClient();
  const { error } = await supabase.from("chat_reads").upsert(
    [
      {
        chat_id,
        user_id: user_ids[0],
      },
      {
        chat_id,
        user_id: user_ids[1],
      },
    ],
    { onConflict: "chat_id,user_id" }
  );

  return error?.message;
};

export const updateChatRead = async (chat_id: number, user_id?: string) => {
  if (!user_id) return;

  const supabase = await createClient();
  const { error } = await supabase.from("chat_reads").upsert({
    chat_id,
    user_id,
  });

  return { error };
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

export type SingleChatWithUser = NonNullable<
  Awaited<ReturnType<typeof fetchChatById>>
>;
