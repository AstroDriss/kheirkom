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
}

const AddComment = ({ post_id, user_id, parent_id }: Props) => {
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
    if (res.id) reset({ comment: "" });

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(handlePostComment)} className="space-y-3">
      <Textarea
        {...register("comment", { required: "Comment cannot be empty" })}
        placeholder="Write a comment..."
        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
        disabled={loading}
      />
      {errors.comment && (
        <p className="text-red-500 text-sm">{errors.comment.message}</p>
      )}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Posting..." : "Post Comment"}
      </Button>
    </form>
  );
};

export default AddComment;
