"use client";
import { CommentWithUser } from "@/actions/post";
import AddComment from "./AddComment";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { formatRelativeTime } from "@/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
                {formatRelativeTime(comment.created_at)}
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
            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                fill="currentColor"
              />
            </svg>
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
