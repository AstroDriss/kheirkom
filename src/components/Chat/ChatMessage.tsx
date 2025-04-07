import { format } from "date-fns/format";
import { Tables } from "../../../database.types";
import { cn } from "@/lib/utils";

interface Props {
  isFromUser: boolean;
  message: Tables<"messages">;
}

export const ChatMessage = ({ isFromUser, message }: Props) => {
  return (
    <div className={`${isFromUser ? "ml-auto" : "mr-auto"}`}>
      <p
        className={`px-3 py-1.5 max-w-sm rounded-tr-3xl rounded-tl-3xl ${
          isFromUser
            ? "rounded-bl-3xl bg-[#c4f1bf]"
            : "rounded-br-3xl bg-accent"
        }`}
      >
        {message.content}
      </p>
      <span
        className={cn(
          "text-xs text-muted-foreground mt-1",
          isFromUser ? "text-right" : "text-left"
        )}
      >
        {format(message.created_at, "h:mm a")}
      </span>
    </div>
  );
};
