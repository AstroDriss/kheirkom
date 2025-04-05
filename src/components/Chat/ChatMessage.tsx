interface Props {
  isFromUser: boolean;
  content: string;
}

export const ChatMessage = ({ isFromUser, content }: Props) => {
  return (
    <div
      className={`px-3 py-1.5 max-w-sm rounded-tr-3xl rounded-tl-3xl ${
        isFromUser
          ? "ml-auto rounded-bl-3xl bg-[#c4f1bf]"
          : "mr-auto rounded-br-3xl bg-accent"
      }`}
    >
      {content}
    </div>
  );
};
