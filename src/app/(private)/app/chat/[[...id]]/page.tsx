import ChatList from "@/components/Chat/ChatList";
import ChatWindow from "@/components/Chat/ChatWindow";

const ChatApp = async ({ params }: { params: Promise<{ id: string[] }> }) => {
  const { id } = await params;
  const chatId = Number(id?.[0]);

  return (
    <div className="grid md:grid-cols-[200px_1fr] gap-3">
      <aside className="h-full border-r border-r-gray-400">
        <ChatList chatId={chatId} />
      </aside>

      <div className="h-full">
        <ChatWindow chatId={chatId} />
      </div>
    </div>
  );
};

export default ChatApp;
