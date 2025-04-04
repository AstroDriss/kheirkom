interface Props {
  isFromUser: boolean;
  content: string;
}

export const ChatMessage = ({ isFromUser, content }: Props) => {
  return (
    <div
      className={`px-3 py-1.5 max-w-sm bg-white rounded-tr-3xl rounded-tl-3xl ${
        isFromUser ? "ml-auto rounded-bl-3xl" : "mr-auto rounded-br-3xl"
      }`}
    >
      {content}
    </div>
  );
};
