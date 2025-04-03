"use client";
import { addComment } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  post_id: number;
  parent_id: number | null;
  user_id: string | null;
  setReplyingTo?: React.Dispatch<React.SetStateAction<string | null>>;
}

const AddComment = ({ post_id, user_id, parent_id, setReplyingTo }: Props) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ comment: string }>();

  const handlePostComment = async ({ comment }: { comment: string }) => {
    if (!user_id) return;

    setLoading(true);

    const res = await addComment(post_id, user_id, comment, parent_id);

    if (res.error) alert(res.error);
    if (res.id) {
      reset({ comment: "" });
      if (setReplyingTo) setReplyingTo(null);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(handlePostComment)}
      className="rounded-lg p-4 flex items-start gap-2 bg-white"
    >
      <Textarea
        {...register("comment", { required: "Comment cannot be empty" })}
        placeholder="Write a comment..."
        autoFocus
        disabled={loading}
      />
      {errors.comment && (
        <p className="text-red-500 text-sm">{errors.comment.message}</p>
      )}
      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </Button>
    </form>
  );
};

export default AddComment;
