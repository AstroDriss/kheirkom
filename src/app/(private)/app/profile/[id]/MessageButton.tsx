"use client";
import { getChatId } from "@/actions/chat";
import { Button } from "@/components/ui/button";
import { authContext } from "@/context/AuthProvider";
import { MessageCircle } from "lucide-react";
import { use } from "react";
import { useFormStatus } from "react-dom";

interface Props {
  user_id: string;
}

function Submit() {
  const { pending } = useFormStatus();

  return (
    <Button className="cursor-pointer" variant="secondary" disabled={pending}>
      <MessageCircle />
      {pending ? "Loading..." : "Message"}
    </Button>
  );
}

const MessageButton = ({ user_id }: Props) => {
  const auth = use(authContext);
  const user = auth?.user;

  if (!user) return null;
  if (user.id === user_id) return null;

  async function redirectToChat() {
    if (!user) return;
    const { error } = await getChatId(user_id, user.id);
    if (error) alert(error);
  }

  return (
    <form action={redirectToChat}>
      <Submit />
    </form>
  );
};

export default MessageButton;
