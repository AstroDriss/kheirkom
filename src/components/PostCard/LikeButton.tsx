"use client";

import { toggleLike } from "@/actions/post";
import { Button } from "../ui/button";

import { useOptimistic, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";

interface Props {
  user_id: string | null;
  post: {
    id: number;
    post_analytics: { likes_count: number } | null;
    user_liked?: { user_id: string | null }[];
  };
}

const LikeButton = ({ post, user_id }: Props) => {
  const [likes, setLikes] = useState({
    liked: post.user_liked && post.user_liked.length > 0 ? true : false,
    likes: post.post_analytics ? post.post_analytics.likes_count : 0,
  });
  const [optimisticLikes, addOptimisticLikes] = useOptimistic(
    likes,
    (_, optimisticLikes: { likes: number; liked: boolean }) => {
      return {
        liked: optimisticLikes.liked,
        likes: optimisticLikes.likes,
      };
    }
  );

  const formAction = async () => {
    if (!user_id) {
      toast.error("You must be logged in to like a post");
      return;
    }
    addOptimisticLikes({
      likes: optimisticLikes.likes + (optimisticLikes.liked ? -1 : 1),
      liked: !optimisticLikes.liked,
    });
    const { liked } = await toggleLike(post.id, user_id);
    setLikes((prev) => ({
      liked,
      likes: prev.likes + (liked ? 1 : -1),
    }));
  };

  return (
    <form action={formAction}>
      <Button type="submit" className="w-full" variant="ghost">
        <Heart
          className={`${
            optimisticLikes.liked ? "fill-red-500 text-red-500" : ""
          }`}
        />
        {optimisticLikes.likes > 0 && optimisticLikes.likes}
        <span className="sr-only">
          {optimisticLikes.likes === 1 ? "like" : "likes"}
        </span>
      </Button>
    </form>
  );
};

export default LikeButton;
