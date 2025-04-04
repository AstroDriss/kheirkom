import ChatInfo from "@/components/Chat/ChatInfo";
import ChatList from "@/components/Chat/ChatList";
import ChatWindow from "@/components/Chat/ChatWindow";

const ChatApp = async ({ params }: { params: Promise<{ id: string[] }> }) => {
  const { id } = await params;
  const chatId = Number(id?.[0]);

  return (
    <div className="grid md:grid-cols-[200px_1fr] wrapper h-full">
      <aside className={`h-full ${chatId ? "hidden md:block" : ""}`}>
        <ChatList chatId={chatId} />
      </aside>

      <div className={`h-full ${chatId ? "block" : "hidden md:block"}`}>
        <ChatInfo chatId={chatId} />
        <ChatWindow chatId={chatId} />
      </div>
    </div>
  );
};

export default ChatApp;
