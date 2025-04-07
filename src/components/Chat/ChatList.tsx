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
                    <span className="text-xs text-muted-foreground">
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

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { formatDistanceToNow } from "date-fns"

// interface ChatContact {
//   id: string
//   name: string
//   avatar: string
//   lastMessage: string
//   timestamp: Date
//   unreadCount: number
//   isOnline: boolean
// }

// interface ChatListProps {
//   contacts: ChatContact[]
//   onSelectContact: (contactId: string) => void
//   selectedContactId?: string
// }

// export function ChatList({ contacts, onSelectContact, selectedContactId }: ChatListProps) {
//   return (
//     <div className="w-full h-full border rounded-lg overflow-hidden">
//       <div className="p-4 border-b bg-muted/30">
//         <h2 className="text-lg font-semibold">Messages</h2>
//       </div>

//       <ScrollArea className="h-[calc(100%-60px)]">
//         <div className="p-2">
//           {contacts.map((contact) => (
//             <div
//               key={contact.id}
//               className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
//                 selectedContactId === contact.id ? "bg-muted" : "hover:bg-muted/50"
//               }`}
//               onClick={() => onSelectContact(contact.id)}
//             >
//               <div className="relative">
//                 <Avatar>
//                   <AvatarImage src={contact.avatar} alt={contact.name} />
//                   <AvatarFallback>{contact.name.slice(0, 2).toUpperCase()}</AvatarFallback>
//                 </Avatar>
//                 {contact.isOnline && (
//                   <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
//                 )}
//               </div>

//               <div className="flex-1 min-w-0">
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-medium truncate">{contact.name}</h3>
//                   <span className="text-xs text-muted-foreground">
//                     {formatDistanceToNow(contact.timestamp, { addSuffix: true })}
//                   </span>
//                 </div>
//                 <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
//               </div>

//               {contact.unreadCount > 0 && (
//                 <Badge variant="default" className="rounded-full px-2 py-0.5">
//                   {contact.unreadCount}
//                 </Badge>
//               )}
//             </div>
//           ))}
//         </div>
//       </ScrollArea>
//     </div>
//   )
// }
