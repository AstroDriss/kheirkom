"use client";
import { CommentWithUser } from "@/actions/post";
import AddComment from "./AddComment";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Reply } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Props {
  comment: CommentWithUser;
  user_id?: string | null;
}

const CommentContent = ({ comment, user_id }: Props) => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const isUsersComment = user_id === comment.user_id;

  return (
    <>
      <div className="rounded-lg bg-white md:p-6 p-4 space-y-4">
        {/* user info */}
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage
              src={comment.user.profile_image || ""}
              alt={comment.user.first_name}
            />
            <AvatarFallback>{comment.user.first_name[0]}</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-semibold">
              <Link href={`/app/profile/${comment.user.id}`}>
                {isUsersComment ? "You" : comment.user.first_name}
              </Link>
            </p>

            <p className="text-gray-400">
              <time dateTime={comment.created_at}>
                {formatDistanceToNow(comment.created_at, {
                  addSuffix: true,
                })}
              </time>
            </p>
          </div>
        </div>

        {/* comment content */}
        <p>{comment.content}</p>

        {/* reply */}
        {!isUsersComment && !replyingTo && (
          <Button
            onClick={() => setReplyingTo(comment.user.first_name)}
            variant="ghost"
            className="cursor-pointer"
          >
            <Reply />
            reply
          </Button>
        )}
      </div>

      {!isUsersComment && replyingTo && user_id && (
        <AddComment
          post_id={comment.post_id}
          user_id={user_id}
          parent_id={comment.id}
          setReplyingTo={setReplyingTo}
        />
      )}
    </>
  );
};

export default CommentContent;
